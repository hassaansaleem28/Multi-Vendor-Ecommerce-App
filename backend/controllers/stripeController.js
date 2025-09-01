import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function processStripePayment(req, res) {
  try {
    const myPayment = await stripe?.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "HS Enterprises",
      },
    });
    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getStripeApiKey(req, res) {
  try {
    res.status(200).json({
      success: true,
      stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
