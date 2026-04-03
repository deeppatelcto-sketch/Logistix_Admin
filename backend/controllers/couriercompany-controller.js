
const CourierCompany = require('../models/couriercompanySchema');
const fs = require('fs');
const path = require('path');
const Plan = require('../models/planSchema');


const generateUserId = async () => {
  const lastEntry = await CourierCompany.findOne().sort({ createdAt: -1 });
  if (!lastEntry || !lastEntry.userId) return 'ML00001';

  const lastNumber = parseInt(lastEntry.userId.replace('ML', ''), 10);
  const nextNumber = (lastNumber + 1).toString().padStart(5, '0');
  return `ML${nextNumber}`;
};

// 📌 Create new courier company
const createCourierCompany = async (req, res) => {
  try {
    const {
      name,
      contactNo,
      companyName,
      gstNo,
      panCardNo,
      aadharNo,
      address,
      city,
      state,
      pincode,
      remittancePreference,
      codPlan,
      shippingPlan,
      bankHolderName,
      bankName,
      accountNumber,
      ifscCode,
    } = req.body;

    const companyLogo = req.files?.companyLogo?.[0]?.filename;
    const idProof = req.files?.idProof?.[0]?.filename;
    const cancelledChequeImage = req.files?.cancelledChequeImage?.[0]?.filename;

    if (!companyLogo || !idProof || !cancelledChequeImage) {
      return res.status(400).json({
        success: false,
        message: "All three files (logo, ID proof, cheque) must be uploaded.",
        errors: {
          companyLogo: !companyLogo ? "Company logo is required." : undefined,
          idProof: !idProof ? "ID proof is required." : undefined,
          cancelledChequeImage: !cancelledChequeImage ? "Cancelled cheque image is required." : undefined,
        }
      });
    }

    const userId = await generateUserId();

    // ✅ Get the shipping plan, or default to Basic Plan
    let selectedPlan;
    if (shippingPlan) {
      selectedPlan = await Plan.findById(shippingPlan);
      if (!selectedPlan) {
        return res.status(400).json({ success: false, message: "Selected shipping plan not found." });
      }
    } else {
      selectedPlan = await Plan.findOne({ name: "Basic Plan" });
      if (!selectedPlan) {
        return res.status(400).json({ success: false, message: "Default Basic Plan not found." });
      }
    }

    const newCompany = new CourierCompany({
      userId,
      name,
      contactNo,
      companyName,
      gstNo,
      panCardNo,
      aadharNo,
      address,
      city,
      state,
      pincode,
      remittancePreference,
      codPlan,
      shippingPlan: selectedPlan._id,
      bankHolderName,
      bankName,
      accountNumber,
      ifscCode,
      companyLogo: `uploads/${companyLogo}`,
      idProof: `uploads/${idProof}`,
      cancelledChequeImage: `uploads/${cancelledChequeImage}`,
    });

    await newCompany.save();

    res.status(201).json({
      success: true,
      message: 'Courier company created successfully',
      data: newCompany,
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.values(error.errors).forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        success: false,
        message: "Duplicate entry",
        errors: { [field]: `${field} "${value}" already exists.` },
      });
    }

    console.error('Unexpected server error:', error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred",
      errors: { general: error.message },
    });
  }
};

// 📌 Get all courier companies
const couriercompanyList = async (req, res) => {
  try {
    const companies = await CourierCompany.find()
      .sort({ createdAt: -1 })
      .populate("shippingPlan", "name"); 

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📌 Get single courier company by ID
const getCourierCompanyById = async (req, res) => {
  try {
    const company = await CourierCompany.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Courier company not found.' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Update courier company
const updateCourierCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedFields = { ...req.body };

    const company = await CourierCompany.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Courier company not found." });
    }

    const uploadPath = path.join(__dirname, "..", "uploads");

    const handleFileUpdate = (fieldName) => {
      if (req.files && req.files[fieldName]) {
        const newFile = `uploads/${req.files[fieldName][0].filename}`;
        const oldFile = company[fieldName];
        if (oldFile && fs.existsSync(path.join(uploadPath, oldFile))) {
          fs.unlinkSync(path.join(uploadPath, oldFile));
        }
        updatedFields[fieldName] = newFile;
      }
    };

    handleFileUpdate("companyLogo");
    handleFileUpdate("idProof");
    handleFileUpdate("cancelledChequeImage");

    Object.assign(company, updatedFields);

    await company.validate(); // Run mongoose validation

    const updatedCompany = await company.save();

    res.status(200).json({
      success: true,
      message: "Courier company updated successfully.",
      data: updatedCompany,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      Object.values(error.errors).forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        success: false,
        message: "Duplicate entry",
        errors: { [field]: `${field} "${value}" already exists.` },
      });
    }

    console.error("Error updating courier company:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred",
      errors: { general: error.message },
    });
  }
};

// 📌 Delete courier company
const deleteCourierCompany = async (req, res) => {
  try {
    const company = await CourierCompany.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Courier company not found.' });
    }

    [company.companyLogo, company.idProof, company.cancelledChequeImage].forEach(filePath => {
      if (filePath && fs.existsSync(path.join(__dirname, '..', filePath))) {
        fs.unlinkSync(path.join(__dirname, '..', filePath));
      }
    });

    await company.deleteOne();
    res.status(200).json({ message: 'Courier company deleted successfully.' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export all functions
module.exports = {
  createCourierCompany,
  couriercompanyList,
  getCourierCompanyById,
  updateCourierCompany,
  deleteCourierCompany,
};

