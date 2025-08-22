import { sendShopToken } from "../config/jwtToken.js";
import Shop from "../models/ShopModel.js";
import path from "path";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import fs from "fs";

export async function createShop(req, res) {
  try {
    const { name, phoneNumber, address, zipCode, email, password } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const fileName = req.file?.filename;
      const filePath = `uploads/${fileName}`;
      fs.unlink(filePath, err => {
        if (err) {
          console.error("Error deleting file:", err);
          res.status(500).json({ message: "Error Deleting File!" });
        }
      });

      return res.status(400).json({ message: "User already exists" });
    }
    const fileName = req.file?.filename;
    const fileUrl = path?.join(fileName);
    const seller = {
      name,
      phoneNumber,
      email,
      password,
      address,
      zipCode,
      avatar: {
        public_id: "325183974108470123hn1mbf3",
        url: fileUrl,
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
      return res.status(401).json({ message: "Invalid credentials" });
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
