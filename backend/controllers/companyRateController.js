const CompanyRate = require('../models/companyRateModel');
const fs = require('fs');
const csvParser = require('csv-parser');
const ExcelJS = require('exceljs');

exports.uploadCompanyRates = async (req, res) => {
  try {
    if (!req.body.companyName || !req.files || !req.files.logo || !req.files.csvFile) {
      return res.status(400).json({ error: 'Company name, logo, and CSV/XLSX file are required!' });
    }

    const logoFile = req.files.logo[0];
    const csvFile = req.files.csvFile[0];

    const baseURL = 'http://localhost:8000';
    const company = await CompanyRate.create({
      companyName: req.body.companyName,
      logoPath: `${baseURL}/${logoFile.path.replace(/\\/g, '/')}`,
      csvFileName: csvFile.originalname,
      csvFilePath: `/uploads/csv/${csvFile.filename}`,
      csvFileType: csvFile.mimetype
    });

    return res.status(201).json({ message: 'Company and rates uploaded successfully', company });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error uploading company rates' });
  }
};


// List companies
exports.listCompanies = async (req, res) => {
  try {
    const companies = await CompanyRate.find().sort({ createdAt: -1 });
    return res.json({ companies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching company list' });
  }
};

const path = require('path');

exports.viewRates = async (req, res) => {
  try {
    const company = await CompanyRate.findById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    // Convert to absolute path
    const filePath = path.join(__dirname, '..', company.csvFilePath); 

    const results = [];

    if (filePath.endsWith('.csv')) {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => results.push(row))
        .on('end', () => res.json({ company, rates: results }))
        .on('error', (err) => {
          console.error(err);
          res.status(500).json({ error: 'Error reading CSV file' });
        });
    } else if (filePath.endsWith('.xlsx')) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      workbook.eachSheet((worksheet) => {
        worksheet.eachRow((row) => {
          results.push(row.values.slice(1)); // ignore dummy first index
        });
      });
      return res.json({ company, rates: results });
    } else {
      return res.status(400).json({ error: 'Unsupported file format. Upload CSV or XLSX.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error reading file' });
  }
};
