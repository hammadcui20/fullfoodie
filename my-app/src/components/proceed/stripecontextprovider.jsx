// stripecontextprovider.jsx
import axios from 'axios';

const sendPaymentDetails = async (token, product) => {
  try {
    const api=import.meta.env.VITE_APP_URL;
    const response = await axios.post(`${api}/stripepayment`, {
      token,
      product,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Stripe order:', error);
    throw new Error(error.response?.data?.message || 'Failed to create Stripe order');
  }
};

export default sendPaymentDetails;
