import transporter from "../config/nodemailer.js";
import Shop from "../models/ShopModel.js";
import WithdrawReq from "../models/WithdrawModel.js";

export async function createWithdrawRequest(req, res) {
  try {
    const { amount } = req.body;
    const data = {
      seller: req.seller,
      amount,
    };
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.seller?.email,
      subject: "Withdraw Request",
      html: `<p>Hi ${req.seller?.name},</p>
             <p>Your withdraw request for $${amount} has been received! It will take 2 to 3 business days for processing!</p>`,
    };
    await transporter.sendMail(mailOptions);
    const withdraw = await WithdrawReq.create(data);
    const shop = await Shop.findById(req.seller._id);
    shop.availableBalance -= amount;
    await shop.save();
    res.status(201).json({ success: true, withdraw });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllWithdraws(req, res) {
  try {
    const withdraws = await WithdrawReq.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, withdraws });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateWithdrawStatus(req, res) {
  try {
    const { sellerId } = req.body;
    const withdraw = await WithdrawReq.findByIdAndUpdate(
      req.params.id,
      {
        status: "Succeed",
        updatedAt: Date.now(),
      },
      { new: true }
    );
    const seller = await Shop.findById(sellerId);
    const transactions = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };
    seller.transactions = [...seller.transactions, transactions];
    await seller.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: seller?.email,
      subject: "Payment Confirmation",
      html: `<p>Hey <strong>${seller?.name}</strong>,</p>
             <p>Your withdraw request for $${withdraw?.amount} has been processed!</p>`,
    };
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({
        success: true,
        message: "Status Updated!",
        withdraw: [withdraw],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
