// Login endpoint for Vercel
const { studentLogIn, teacherLogIn, adminLogIn } = require('../../backend/controllers/student_controller.js');
const { adminLogIn: adminLogin } = require('../../backend/controllers/admin-controller.js');

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
      const { userType } = req.body;
      
      switch (userType) {
        case 'student':
          await studentLogIn(req, res);
          break;
        case 'teacher':
          await teacherLogIn(req, res);
          break;
        case 'admin':
          await adminLogin(req, res);
          break;
        default:
          res.status(400).json({ error: 'Invalid user type' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
