const B2BCourierRate = require('../models/b2bcourierrateSchema');

// Create
exports.createB2BCourierRate = async (req, res) => {
  try {
    const newRate = new B2BCourierRate(req.body);
    await newRate.save();
    res.status(201).json({ message: 'B2B Courier Rate Added', data: newRate });
  } catch (err) {
    res.status(500).json({ message: 'Error creating rate', error: err.message });
  }
};

// Get All
exports.getAllB2BCourierRates = async (req, res) => {
  try {
    const rates = await B2BCourierRate.find();
    res.status(200).json(rates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rates', error: err.message });
  }
};

// Get by Courier Name
exports.getB2BCourierRateByCourier = async (req, res) => {
  try {
    const courierName = req.params.name;
    const rate = await B2BCourierRate.findOne({ courierName });
    if (!rate) return res.status(404).json({ message: 'Courier not found' });
    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

// Update
exports.updateB2BCourierRate = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRate = await B2BCourierRate.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Rate Updated', data: updatedRate });
  } catch (err) {
    res.status(500).json({ message: 'error while updating rate', error: err.message });
  }
};

// Delete
exports.deleteB2BCourierRate = async (req, res) => {
  try {
    const id = req.params.id;
    await B2BCourierRate.findByIdAndDelete(id);
    res.status(200).json({ message: 'Rate Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting rate', error: err.message });
  }
};
