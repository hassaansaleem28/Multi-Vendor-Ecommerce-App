import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Shop from "../models/ShopModel.js";

export async function isAuthenticated(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Login Required!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function isSeller(req, res, next) {
  try {
    const { seller_token } = req.cookies;
    if (!seller_token) {
      return res.status(401).json({ message: "Unauthorized. Login Required!" });
    }
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);
    req.seller = await Shop.findById(decoded.id);
    if (!req.seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function isAdmin(...roles) {
  try {
    return function (req, res, next) {
      if (!roles.includes(req.user?.role)) {
        console.error(
          `${req.user?.role} don't have access to these resources!`
        );
        return res
          .status(400)
          .json({ success: false, message: "Can't access this resources!" });
      }
      next();
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
