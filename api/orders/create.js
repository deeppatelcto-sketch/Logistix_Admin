// Create order endpoint for Vercel
const { createOrder } = require('../../backend/controllers/order-controller.js');
const verifyToken = require('../../backend/middleware/authMiddleware.js');

module.exports = async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method === 'POST') {
      await createOrder(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in create order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
