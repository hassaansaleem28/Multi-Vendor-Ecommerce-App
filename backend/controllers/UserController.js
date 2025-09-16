import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { sendToken } from "../config/jwtToken.js";
import cloudinary from "../config/cloudinary.js";

export async function createUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      if (req.file?.filename) {
        const publicId = req.file.filename.split(".")[0];
        await cloudinary.uploader.destroy(`ecommerce_uploads/${publicId}`);
      }
      return res.status(400).json({ message: "User already exists" });
    }
    if (!req.file?.path || !req.file?.filename) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an avatar!" });
    }
    const user = {
      fullName,
      email,
      password,
      avatar: {
        public_id: req.file.filename.split(".")[0],
        url: req.file.path,
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

export async function updateUser(req, res) {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.json({ success: false, message: "User doesn't exist!" });
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
      return res
        .status(400)
        .json({ success: false, message: "Invaild Credentails!" });
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function updateAvatar(req, res) {
  try {
    const existUser = await User.findById(req.user.id);
    const oldPublicId = existUser?.avatar?.public_id;
    if (oldPublicId) {
      await cloudinary.uploader.destroy(`ecommerce_uploads/${oldPublicId}`);
    }
    const newPublicId = req.file.filename.split(".")[0];
    const newUrl = req.file.path;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: {
          public_id: newPublicId,
          url: newUrl,
        },
      },
      { new: true }
    );
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

// update user addresses

export async function updateAddresses(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const sameTypeAddress = user.addresses.find(
      address => address.addressType === req.body.addressType
    );
    if (sameTypeAddress)
      return res.json({
        success: false,
        message: `${req.body.addressType} address already exists!`,
      });
    const existsAddress = user.addresses.find(
      address => address._id === req.body._id
    );
    if (existsAddress) Object.assign(existsAddress, req.body);
    else user.addresses.push(req.body); // Adding new address to the array
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export async function deleteUserAddress(req, res) {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateUserPassword(req, res) {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched)
      return res.status(400).json({
        success: false,
        message: "Old Password is incorrect!",
      });
    if (req.body.newPassword !== req.body.confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Password doesn' t match with eachother!",
      });
    user.password = req.body.newPassword;

    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Password Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getUser4Id(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(201).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function deleteUserFromAdmin(req, res) {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    await User.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "User Deleted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
