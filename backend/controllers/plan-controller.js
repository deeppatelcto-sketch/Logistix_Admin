const Plan = require('../models/planSchema.js');

// Create a new plan
const planCreate = async (req, res) => {
  try {
    const {
      name,
      price,
      baseRate,
      docketCharge,
      fuelCharge,
      minCharge,
      odaCharge,
      appointmentDeliveries,
      integrations,
      whatsappUpdates,
      prioritySupport,
      ndrCallSetup,
      additionalUsers,
      usageLimit,
    } = req.body;

    // Duplicate name check (case-insensitive)
    const existingPlan = await Plan.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (existingPlan) {
      return res.status(400).json({ message: "Plan with this name already exists." });
    }

    const newPlan = new Plan({
      name,
      price,
      baseRate,
      docketCharge,
      fuelCharge,
      minCharge,
      odaCharge,
      appointmentDeliveries,
      integrations,
      whatsappUpdates,
      prioritySupport,
      ndrCallSetup,
      additionalUsers,
      usageLimit,
    });

    const result = await newPlan.save();
    res.status(201).send(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors[0] });
    }

    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({
        message: "Plan name must be unique. A plan with this name already exists.",
      });
    }

    res.status(500).json({ message: "Error creating plan", error: err.message });
  }
};

// Get all plans
const planList = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).send(plans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plans", error: err.message });
  }
};

// Update a plan by ID
const updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    if (req.body.name) {
      const existingPlan = await Plan.findOne({
        name: { $regex: `^${req.body.name}$`, $options: 'i' },
        _id: { $ne: planId }
      });

      if (existingPlan) {
        return res.status(400).json({
          message: "Plan with this name already exists. Please choose a different name."
        });
      }
    }

    const updatedPlan = await Plan.findByIdAndUpdate(planId, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).send(updatedPlan);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors[0] });
    }

    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({
        message: "Plan name must be unique. A plan with this name already exists."
      });
    }

    res.status(500).json({ message: "Error updating plan", error: err.message });
  }
};

// Delete single plan
const deletePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const result = await Plan.findByIdAndDelete(planId);

    if (!result) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error: error.message });
  }
};

// Delete all plans
const deletePlans = async (req, res) => {
  try {
    const result = await Plan.deleteMany();
    res.status(200).json({ message: "All plans deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plans", error: error.message });
  }
};

module.exports = {
  planCreate,
  planList,
  updatePlan,
  deletePlan,
  deletePlans
};
