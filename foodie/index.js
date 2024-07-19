import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

import userRoutes from "./routes/user.routes.js";
import reviewsRoutes from "./routes/reviews.route.js";
import ordersRoutes from "./routes/orders.route.js";
import deliveriesRoutes from "./routes/deliveries.route.js";
import menuRoutes from "./routes/menu.route.js";
import paymentsRoutes from "./routes/payments.route.js";
import dealsRoutes from "./routes/deal.route.js";
import "./db/dbconnect.db.js";
import stripe from "stripe";

dotenv.config();
const Stripe = stripe(process.env.STRIPE_ID);

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static('public'));

app.use("/deals", dealsRoutes);
app.use("/review", reviewsRoutes);
app.use("/orders", ordersRoutes);
app.use("/payments", paymentsRoutes);
app.use("/menu", menuRoutes);
app.use("/delivery", deliveriesRoutes);
app.use("/user", userRoutes);

app.post('/stripepayment', async (req, res) => {
  const { product, token } = req.body;
  console.log('Received token:', token);
  console.log('Received product:', product);

  try {
    let customer;
    if (product.type === 'bank_account') {
      customer = await Stripe.customers.create({
        email: token.email,
        source: {
          object: 'bank_account',
          account_number: product.accountNumber,
          country: 'US',
          currency: 'usd',
          account_holder_name: product.accountHolderName,
          account_holder_type: 'individual',
          routing_number: '110000000',
        },
        description: product.name,
      });
    } else if (product.type === 'debit_card') {
      const cardToken = await Stripe.tokens.create({
        card: {
          number: product.card.number,
          exp_month: product.card.exp_month,
          exp_year: product.card.exp_year,
          cvc: product.card.cvc,
        },
      });
      customer = await Stripe.customers.create({
        email: token.email,
        source: cardToken.id,
        description: product.name,
      });
    } else {
      throw new Error('Invalid payment method type');
    }

    const charge = await Stripe.charges.create({
      amount: product.price * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: product.name,
    });

    console.log('Customer created:', customer);
    console.log('Charge created:', charge);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ status: 'failure', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
