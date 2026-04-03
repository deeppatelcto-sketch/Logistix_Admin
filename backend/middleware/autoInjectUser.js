// middleware/autoInjectUser.js
const jwt = require("jsonwebtoken");

const autoInjectUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(); // Skip if no token, maybe admin panel
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded in request
    req.user = {
      id: decoded.id,
      role: decoded.role, // 'customer' or 'courier' or 'admin'
    };

    next();
  } catch (err) {
    console.warn("Invalid token in autoInjectUser:", err.message);
    next(); // Even if error, proceed without injecting
  }
};

module.exports = autoInjectUser;
