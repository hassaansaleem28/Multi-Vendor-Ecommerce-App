import coupon from "../models/couponModel.js";

export async function createCounponCode(req, res) {
  try {
    const coupnCode = await coupon.find({ name: req.body.name });
    if (coupnCode.length !== 0)
      return res
        .status(404)
        .json({ success: false, message: "Coupon Code already exists!" });
    const couponCode = await coupon.create(req.body);
    res.status(201).json({ success: true, couponCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function getAllCoupons(req, res) {
  try {
    const couponCodes = await coupon.find({
      shopId: req.seller.id,
    });
    res.status(201).json({ success: true, couponCodes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INternal Server Error!" });
  }
}

export async function deleteCoupon(req, res) {
  try {
    const couponId = await coupon.findByIdAndDelete(req.params.id);
    if (!couponId)
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found!" });

    res
      .status(201)
      .json({ success: true, message: "Coupon deleted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
