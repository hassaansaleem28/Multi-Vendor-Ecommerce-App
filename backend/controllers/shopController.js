import { sendShopToken } from "../config/jwtToken.js";
import Shop from "../models/ShopModel.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import cloudinary from "../config/cloudinary.js";

export async function createShop(req, res) {
  try {
    const { name, phoneNumber, address, zipCode, email, password } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      if (req.file.filename) {
        const publicId = req.file.filename.split(".")[0];
        await cloudinary.uploader.destroy(`ecommerce_uploads/${publicId}`);
      }
      return res.status(400).json({ message: "User already exists!" });
    }
    if (!req.file?.path || !req.file?.filename) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an avatar!" });
    }
    const seller = {
      name,
      phoneNumber,
      email,
      password,
      address,
      zipCode,
      avatar: {
        public_id: req.file.filename.split(".")[0],
        url: req.file.path,
      },
    };
    const activationToken = createActivationToken(seller);
    const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Seller Account Activation",
      html: `<p>Hi ${name} owner,</p>
                 <p>Thank you for registering the seller account. Please click the link below to activate your seller account:</p>
                 <a href="${activationUrl}">Activate Seller Account</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      success: true,
      message: `Please check your shop email:-  ${seller.email} to activate your seller account!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
}
function createActivationToken(seller) {
  return jwt.sign(seller, process.env.JWT_SECRET, { expiresIn: "5m" });
}

export async function activateSeller(req, res) {
  try {
    const { url } = req.body;
    const seller = jwt.verify(url, process.env.JWT_SECRET);
    if (!seller) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      seller;
    let Seller = await Shop.findOne({ email });
    if (Seller) {
      return res.status(400).json({ message: "Seller account already exists" });
    }
    Seller = await Shop.create({
      name,
      email,
      password,
      avatar,
      zipCode,
      address,
      phoneNumber,
    });
    sendShopToken(Seller, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginSeller(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const seller = await Shop.findOne({ email }).select("+password");
    if (!seller) {
      return res
        .status(401)
        .json({ message: "This Seller account doesn't exist!" });
    }
    const isPasswordMatched = await seller.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    sendShopToken(seller, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loadSeller(req, res) {
  try {
    const seller = await Shop.findById(req.seller.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logoutSeller(req, res) {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({ success: true, message: "Logout Successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getShopInfo(req, res) {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({ success: true, shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateShopAvatar(req, res) {
  try {
    const existSeller = await Shop.findById(req.seller._id);
    const oldPublicId = existSeller?.avatar?.public_id;
    if (oldPublicId)
      await cloudinary.uploader.destroy(`ecommerce_uploads/${oldPublicId}`);
    const newPublicId = req.file.filename.split(".")[0];
    const newUrl = req.file.path;
    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      avatar: {
        public_id: newPublicId,
        url: newUrl,
      },
    });
    res.status(200).json({ success: true, seller });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateShopProfile(req, res) {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;
    const shop = await Shop.findOne(req.seller._id);
    if (!shop)
      return res.json({ success: false, message: "Shop doesn't exist!" });

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    shop.zipCode = zipCode;

    await shop.save();
    res.status(201).json({ success: true, shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function getAllSellers(req, res) {
  try {
    const sellers = await Shop.find().sort({ createdAt: -1 });
    return res.status(201).json({ success: true, sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function deleteSellerFromAdmin(req, res) {
  try {
    const sellerToDelete = await Shop.findById(req.params.id);
    if (!sellerToDelete)
      return res
        .status(404)
        .json({ success: false, message: "Seller not found!" });
    await Shop.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "Seller Deleted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateWithdrawMethods(req, res) {
  try {
    const { withdrawMethod } = req.body;
    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      withdrawMethod,
    });
    res.status(201).json({ success: true, seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function deleteWithdrawMethod(req, res) {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller)
      return res
        .status(404)
        .json({ success: false, message: "Seller not found!" });
    seller.withdrawMethod = null;
    await seller.save();
    res.status(201).json({ success: true, seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
