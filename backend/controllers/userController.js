const jwt = require("jsonwebtoken");

const User = require("../models/User");
// const jwt = require("jsonwebtoken");

const getOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = "123456";

    let user = await User.findOne({ phoneNumber });
    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      user = await User.create({ phoneNumber, otp });
    }
    console.log(user);
    console.log(otp);

    res.status(200).json({ message: "OTP sent successfully", otp }); // remove OTP in prod
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// const verifyOtp = async (req, res) => {
//   try {
//     const { phoneNumber, otp } = req.body;
//     const user = await User.findOne({ phoneNumber, otp });

//     if (!user) return res.status(400).json({ message: "Invalid OTP" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.status(200).json({ message: "OTP verified successfully", token, user });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Find user
    let user = await User.findOne({ phoneNumber, otp });
    if (!user) return res.status(400).json({ message: "Invalid OTP" });

    // ✅ JWT Token
    const token = jwt.sign(
      { userId: user._id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Check if profile is completed
    const isProfileComplete = Boolean(
      user.firstName &&
      user.lastName &&
      user.gender &&
      user.birthDate &&
      user.email
    );

    // ✅ Clear OTP after use (optional for security)
    user.otp = null;
    await user.save();

    // Respond to frontend
    res.status(200).json({
      message: "OTP verified successfully",
      token,
      user,
      isProfileComplete,
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const completeProfile = async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName, gender, birthDate, email, phoneNumber } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender;
    user.birthDate = birthDate;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({ message: "Profile completed successfully", user });
  } catch (error) {
    console.error("Error completing profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDashboard = (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to dashboard", user: req.user });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//CRUD Operation

// ✅ Create a new customer
const custCreate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      phoneNumber,
      otp,
    } = req.body;

    // Validate phone number length
    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
    }

    // Check for duplicate phone number or email
    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (existingUser) {
      if (existingUser.phoneNumber === phoneNumber && existingUser.email === email) {
        return res.status(400).json({ message: "User already exists with this phone number and email" });
      } else if (existingUser.phoneNumber === phoneNumber) {
        return res.status(400).json({ message: "User already exists with this phone number" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
    }

    const user = new User({
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      phoneNumber,
      otp,
    });

    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error creating customer", error: err.message });
  }
};


// ✅ Get all customers
const custList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers", error: err.message });
  }
};

// ✅ Update a specific customer
const updateCust = async (req, res) => {
  try {
    const id = req.params.id;
    const { phoneNumber, email } = req.body;

    // Optional: Validate phone number format
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
    }

    // Check for duplicate phone number or email (excluding current user)
    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { email }],
      _id: { $ne: id }  // exclude current user
    });

    if (existingUser) {
      if (existingUser.phoneNumber === phoneNumber && existingUser.email === email) {
        return res.status(400).json({ message: "Another user exists with this phone number and email" });
      } else if (existingUser.phoneNumber === phoneNumber) {
        return res.status(400).json({ message: "Phone number already in use by another user" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already in use by another user" });
      }
    }

    // Proceed to update
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating customer", error: err.message });
  }
};


// ✅ Delete a specific customer
const deleteCust = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);

    if (deleted) {
      res.status(200).json({ message: "Customer deleted successfully", deleted });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer", error: err.message });
  }
};

// ✅ Delete all customers
const deleteCusts = async (req, res) => {
  try {
    const result = await User.deleteMany();
    res.status(200).json({ message: "All customers deleted successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error deleting all customers", error: err.message });
  }
};



module.exports = {
  getOtp,
  verifyOtp,
  completeProfile,
  getDashboard,
  custCreate,
  custList,
  deleteCusts,
  deleteCust,
  updateCust,
};






