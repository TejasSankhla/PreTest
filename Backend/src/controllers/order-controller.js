import { razorpay } from "../config/payment-gateway.js";
const createOrder = async (req, res) => {
  try {
    console.log(req.body);

    const options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

export { createOrder };
