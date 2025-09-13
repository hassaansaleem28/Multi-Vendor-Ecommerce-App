import order from "../models/orderModel.js";
import Product from "../models/ProductModel.js";
import Shop from "../models/ShopModel.js";

export async function createOrder(req, res) {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    // Finding and grouping the cart items by using Shop Id (product jis shop ka ha)
    const shopItemsMap = new Map();
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // CREATING THE ORDER FOR THE RESPECTIVE SHOP
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const orderr = await order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(orderr);
    }

    res.status(201).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

// Get all orders of the user

export async function getAllOrders(req, res) {
  try {
    const orders = await order
      .find({ "user._id": req.params.userId })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

// get all orders of the seller shop

export async function getAllOrderShop(req, res) {
  try {
    const orders = await order
      .find({ "cart.shopId": req.params.shopId })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SEREVR ERROR!" });
  }
}

// Order update status by seller

export async function updateOrderStatus(req, res) {
  try {
    const orderr = await order.findById(req.params.id);
    if (!orderr)
      return res.json({ success: false, message: "User not found!" });
    if (req.body.status === "Transferred to delivery partner") {
      orderr?.cart?.forEach(
        async item => await updateOrder(item._id, item.qty)
      );
    }
    orderr.status = req.body?.status;
    if (req.body?.status === "Delivered") {
      orderr.deliveredAt = Date.now();
      orderr.paymentInfo.status = "Succeeded";
      const serviceCharges = orderr.totalPrice * 0.1;
      await updateSellerInfo(orderr.totalPrice - serviceCharges);
    }
    await orderr.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, orderr });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      if (product) {
        product.stock -= qty;
        product.sold_out += qty;
      }

      await product?.save({ validateBeforeSave: false });
    }
    async function updateSellerInfo(amount) {
      try {
        const seller = await Shop.findById(req.seller.id);
        seller.availableBalance += amount;
        await seller.save();
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function giveOrderRefund(req, res) {
  try {
    const orderr = await order.findById(req.params.id);
    if (!orderr)
      return res.json({ success: false, message: "User not found!" });
    orderr.status = req.body?.status;
    await orderr.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      orderr,
      message: "Order refund request successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

// For seller
export async function acceptOrderRefund(req, res) {
  try {
    const orderr = await order.findById(req.params.id);
    if (!orderr)
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    orderr.status = req.body.status;

    await orderr.save();
    res
      .status(200)
      .json({ success: true, message: "Order refund successful!" });
    if (req.body.status === "Refund Success") {
      orderr?.cart?.forEach(async item => {
        await updateOrder(item._id, item.qty);
      });
    }
    async function updateOrder(id, qty) {
      const product = await Product.findById(id);
      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllOrdersAdmin(req, res) {
  try {
    const orders = await order.find().sort({ deliveredAt: -1, createdAt: -1 });
    res.status(201).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
