import Shop from "../models/ShopModel.js";
import order from "../models/orderModel.js";
import Product from "../models/ProductModel.js";
import cloudinary from "../config/cloudinary.js";

export async function createProduct(req, res) {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(400).json({ message: "ShopId is invalid!" });
    else {
      const files = req.files;
      const imgData = files.map(file => ({
        public_id: file.filename.split(".")[0],
        url: file.path,
      }));
      const productData = {
        ...req.body,
        images: imgData,
        shop,
      };
      const product = await Product.create(productData);
      res.status(201).json({ success: true, product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getAllProductsShop(req, res) {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const productData = await Product.findById(productId);
    if (!productData) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found with this id!" });
    }
    const deletionPromises = productData.images.map(img => {
      const publicId = img.public_id;
      return cloudinary.uploader.destroy(`ecommerce_uploads/${publicId}`);
    });

    await Promise.all(deletionPromises);
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function createReviewForProduct(req, res) {
  try {
    const { user, comment, rating, productId, orderId } = req.body;
    const product = await Product.findById(productId);
    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product?.reviews?.find(
      review => review.user._id === req.user._id
    );
    if (isReviewed) {
      product?.reviews?.forEach(review => {
        if (review.user._id === req.user._id) {
          (review.rating = rating),
            (review.comment = comment),
            (review.user = user);
        }
      });
    } else {
      product?.reviews?.push(review);
    }

    let avg = 0;
    product?.reviews?.forEach(review => (avg += review.rating));
    product.ratings = avg / product?.reviews?.length;

    await product.save({ validateBeforeSave: false });

    await order.findByIdAndUpdate(
      orderId,
      {
        $set: { "cart.$[elem].isReviewed": true },
      },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );
    await res
      .status(200)
      .json({ success: true, message: "Reviewed Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllProductsAdmin(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(201).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
