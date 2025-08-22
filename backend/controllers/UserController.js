import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { sendToken } from "../config/jwtToken.js";

export async function createUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
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
    const user = {
      fullName,
      email,
      password,
      avatar: {
        public_id: "325183974108470123hn1mbf3",
        url: fileUrl,
      },
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account Activation",
      html: `<p>Hi ${fullName},</p>
             <p>Thank you for registering. Please click the link below to activate your account:</p>
             <a href="${activationUrl}">Activate Account</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      success: true,
      message: `Please check your email:-  ${user.email} to activate your account!`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
function createActivationToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "5m" });
}

export async function activateUser(req, res) {
  try {
    const { url } = req.body;
    const user = jwt.verify(url, process.env.JWT_SECRET);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const { fullName, email, password, avatar } = user;
    let Userr = await User.findOne({ email });
    if (Userr) {
      return res.status(400).json({ message: "User already exists" });
    }
    Userr = await User.create({
      fullName,
      email,
      password,
      avatar,
    });
    sendToken(Userr, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function logoutUser(req, res) {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({ success: true, message: "Logout Successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loadUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
