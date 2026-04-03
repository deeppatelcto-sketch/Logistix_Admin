
const CourierRate = require('../models/courierrateSchema');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { Parser } = require('json2csv');

// 📌 Create new courier rate entry
const createCourierRate = async (req, res) => {
  try {
    const {
      companyName,
      serviceType,
      mode,
      minWeight,
      zoneA_upto,
      zoneA_additional,
      zoneB_upto,
      zoneB_additional,
      zoneC1_upto,
      zoneC1_additional,
      zoneC2_upto,
      zoneC2_additional,
      zoneD1_upto,
      zoneD1_additional,
      zoneD2_upto,
      zoneD2_additional,
      zoneE_upto,
      zoneE_additional,
      zoneF_upto,
      zoneF_additional,
      codCharge_charge,
      codCharge_percentage,
      fuelSurcharge,
    } = req.body;

    // Handle file upload
    const companiesLogo = req.files['companiesLogo']?.[0]?.filename;

    if (!companiesLogo) {
      return res.status(400).json({ message: 'Company logo is required.' });
    }

    const newRate = new CourierRate({
      companyName,
      companiesLogo: `uploads/companylogos/${companiesLogo}`,
      serviceType,
      mode,
      minWeight,
      zoneA_upto,
      zoneA_additional,
      zoneB_upto,
      zoneB_additional,
      zoneC1_upto,
      zoneC1_additional,
      zoneC2_upto,
      zoneC2_additional,
      zoneD1_upto,
      zoneD1_additional,
      zoneD2_upto,
      zoneD2_additional,
      zoneE_upto,
      zoneE_additional,
      zoneF_upto,
      zoneF_additional,
      codCharge_charge,
      codCharge_percentage,
      fuelSurcharge,
    });

    await newRate.save();
    res.status(201).json(newRate);
  } catch (error) {
    console.error('Error creating courier rate:', error);
    res.status(500).json({ message: error.message });
  }
};

// 📌 List all courier rates
const courierRateList = async (req, res) => {
  try {
const rates = await CourierRate.find();   
 res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourierRate = async (req, res) => {
  try {
    const updatedFields = { ...req.body };  

    const rate = await CourierRate.findById(req.params.id);  
    if (!rate) {
      return res.status(404).json({ message: 'Courier rate not found.' });
    }

    const uploadPath = path.join(__dirname, '..', 'uploads');

    // Handle the file upload if a new logo is being uploaded.
    if (req.files && req.files['companiesLogo']) {
      // If a previous logo exists, delete it from the filesystem.
      if (rate.companiesLogo && fs.existsSync(path.join(uploadPath, rate.companiesLogo))) {
        fs.unlinkSync(path.join(uploadPath, rate.companiesLogo));
      }
      // Update the logo with the new file path.
      updatedFields.companiesLogo = `uploads/companylogos/${req.files['companiesLogo'][0].filename}`;
    }

    // Update the courier rate document in the database.
    const updatedRate = await CourierRate.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.status(200).json(updatedRate);  
  } catch (error) {
    console.error('Error updating courier rate:', error);
    res.status(500).json({ message: 'An error occurred while updating the courier rate.' });
  }
};


// 📌 Delete courier rate
const deleteCourierRate = async (req, res) => {
  try {
    const rate = await CourierRate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ message: 'Courier rate not found.' });
    }

    if (rate.companiesLogo && fs.existsSync(path.join(__dirname, '..', rate.companiesLogo))) {
      fs.unlinkSync(path.join(__dirname, '..', rate.companiesLogo));
    }

    await rate.deleteOne();
    res.status(200).json({ message: 'Courier rate deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Upload courier rates via CSV
const uploadCourierRatesCSV = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'CSV file is required.' });
    }

    console.log('Uploaded file:', file); 

    const filePath = file.path; 
    if (!filePath) {
      return res.status(400).json({ message: 'File path not found.' });
    }

    const courierRates = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        console.error('CSV parse error:', error);
        return res.status(500).json({ message: 'CSV parsing failed.' });
      })
      .on('data', (row) => {
        courierRates.push({
          ...row,
          companiesLogo: row.companiesLogo || '',
        });
      })
      .on('end', async () => {
        try {
          const result = await CourierRate.insertMany(courierRates);
          fs.unlinkSync(filePath); 
          res.status(201).json({
            message: 'CSV data uploaded successfully.',
            insertedCount: result.length
          });
        } catch (err) {
          console.error('InsertMany error:', err);
          res.status(500).json({ message: 'Database insert failed.' });
        }
      });

  } catch (error) {
    console.error('Error uploading CSV:', error);
    res.status(500).json({ message: error.message });
  }
};


// 📌 Download all courier rates as CSV
const downloadCourierRatesCSV = async (req, res) => {
  try {
    const rates = await CourierRate.find();

    if (!rates.length) {
      return res.status(404).json({ message: 'No data available to export.' });
    }

    const fields = Object.keys(rates[0].toObject());
    const parser = new Parser({ fields });
    const csvData = parser.parse(rates.map(rate => rate.toObject()));

    res.header('Content-Type', 'text/csv');
    res.attachment('courier_rates.csv');
    return res.send(csvData);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export all controller functions
module.exports = {
  createCourierRate,
  courierRateList,
  updateCourierRate,
  deleteCourierRate,
  uploadCourierRatesCSV,
  downloadCourierRatesCSV,
};
