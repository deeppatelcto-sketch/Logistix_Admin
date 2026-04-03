const express = require("express");
const router = express.Router();
const {
  getOtp,
  verifyOtp,
  completeProfile,
  getDashboard,
  custCreate,
  custList,
  deleteCusts,
  deleteCust,
  updateCust,
} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/get-otp", getOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-profile", verifyToken, completeProfile);
router.get("/dashboard", verifyToken, getDashboard);

// CRUD routes (unprotected - you can add verifyToken if needed)
router.post("/CustCreate", custCreate);
router.get("/CustList/:id", custList);
router.put("/Custs/:id", updateCust);
router.delete("/Cust/:id", deleteCust);
router.delete("/Custs/:id", deleteCusts);



module.exports = router;
