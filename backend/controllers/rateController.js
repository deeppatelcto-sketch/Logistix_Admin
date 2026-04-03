
// const express = require('express');
// const XLSX = require('xlsx');
// const File = require('../models/fileModel');

// const router = express.Router();

// // ----------- 🔍 Helpers -----------

// const getZoneFromPincode = (workbook, pincode) => {
//   const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['Pincode List (25)']);
//   const row = sheet.find(r => String(r.Pincode).trim() === String(pincode).trim());
//   return row
//     ? { zone: row.Zone, state: row.State, odaType: row.ODA_TYPE?.toString().trim() || null }
//     : null;
// };

// const getODACharge = (workbook, pincode, weight) => {
//   const pincodeSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Pincode List (25)'], { defval: null });
//   const odaRow = pincodeSheet.find(r => String(r.PINCODE).trim() === String(pincode).trim());

//   const odaType = odaRow?.ODA_TYPE?.toString().trim();
//   if (!odaType) return { isODA: false, charge: 0 };

//   const odaSheet = XLSX.utils.sheet_to_json(workbook.Sheets['ODA_TABLE'], { defval: null });
//   const headers = Object.keys(odaSheet[0]).map(h => h.trim());

//   const weightHeader = headers.filter(h => h !== 'ODA CAT.');

//   const odaRowData = odaSheet.find(row => {
//     const cat = row['ODA CAT.'] || row['ODA CAT'] || row['ODACAT'] || '';
//     return cat.toString().trim().toLowerCase() === odaType.toLowerCase();
//   });

//   if (!odaRowData) return { isODA: true, charge: null };

//   for (let col of weightHeader) {
//     const colName = col.trim();

//     if (colName.toLowerCase().includes('rate/kg')) {
//       const match = colName.match(/>(\d+)/);
//       if (match) {
//         const min = parseInt(match[1]);
//         if (weight > min) {
//           const rate = parseFloat(odaRowData[col]);
//           if (!isNaN(rate)) return { isODA: true, charge: rate * weight };
//         }
//       }
//     } else {
//       const rangeMatch = colName.match(/(\d+)\s*-\s*(\d+)/);
//       if (rangeMatch) {
//         const min = parseInt(rangeMatch[1]);
//         const max = parseInt(rangeMatch[2]);
//         if (weight >= min && weight <= max) {
//           const fixedCharge = parseFloat(odaRowData[col]);
//           if (!isNaN(fixedCharge)) return { isODA: true, charge: fixedCharge };
//         }
//       }
//     }
//   }

//   return { isODA: true, charge: null };
// };

// const getRatePerKg = (workbook, state) => {
//   const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['CALCULATE SHEET']);
//   const row = sheet.find(r => r.States && r.States.toLowerCase().trim() === state.toLowerCase().trim());
//   if (!row) return null;

//   const rateKey = Object.keys(row).find(k => k.toLowerCase().includes('rate') && k.toLowerCase().includes('kg'));
//   return rateKey ? parseFloat(row[rateKey]) : null;
// };

// const getFixedCharges = () => ({
//   DWB: 100,
//   NGT: 0
// });

// // ----------- 🚚 API -----------

// router.post('/calculate', async (req, res) => {
//   const { pincode, state, weight, invoiceValue } = req.body;

//   if (!pincode || !state || !weight || !invoiceValue) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const files = await File.find({});
//     if (!files.length) {
//       return res.status(404).json({ error: 'No uploaded files found' });
//     }

//     const results = [];

//     for (let file of files) {
//       const workbook = XLSX.readFile(file.filePath);

//       const pincodeInfo = getZoneFromPincode(workbook, pincode);
//       const odaType = pincodeInfo?.odaType;

//       const rateSheet = XLSX.utils.sheet_to_json(workbook.Sheets['CALCULATE SHEET']);
//       const rateRow = rateSheet.find(r => r.States && r.States.toLowerCase().trim() === state.toLowerCase().trim());
//       const zone = rateRow?.Zone || 'Unknown';

//       const { isODA, charge: ODACharge } = getODACharge(workbook, pincode, weight);
//       const ratePerKg = getRatePerKg(workbook, state);
//       const { DWB, NGT } = getFixedCharges();

//       if (!ratePerKg) {
//         results.push({ fileName: file.fileName, error: 'Rate per kg not found for state' });
//         continue;
//       }

//       const ODA = ODACharge !== null ? ODACharge : 0;
//       const freight = weight * ratePerKg;
//       const FOV = invoiceValue * 0.001;
//       const totalWithoutFSC = freight + DWB + FOV + NGT + ODA;
//       const FSC = totalWithoutFSC * 0.10;
//       const subtotal = totalWithoutFSC + FSC;
//       const GST = subtotal * 0.18;
//       const total = subtotal + GST;

//       results.push({
//         fileName: file.fileName,
//         state,
//         pincode,
//         zone,
//         isODA,
//         odaType: odaType || null,
//         weight,
//         ratePerKg,
//         freight,
//         DWB,
//         FOV,
//         NGT,
//         ODA,
//         totalWithoutFSC,
//         FSC,
//         subtotal,
//         GST,
//         total: parseFloat(total.toFixed(2))
//       });
//     }

//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error while processing files' });
//   }
// });

// module.exports = router;




// const XLSX = require('xlsx');
// const File = require('../models/fileModel');

// // ----------- 🔍 Helpers -----------

// const getZoneFromPincode = (workbook, pincode) => {
//   const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['Pincode List (25)']);
//   const row = sheet.find(r => String(r.Pincode).trim() === String(pincode).trim());
//   return row
//     ? { zone: row.Zone, state: row.State, odaType: row.ODA_TYPE?.toString().trim() || null }
//     : null;
// };

// const getODACharge = (workbook, pincode, weight) => {
//   const pincodeSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Pincode List (25)'], { defval: null });
//   const odaRow = pincodeSheet.find(r => String(r.PINCODE).trim() === String(pincode).trim());

//   const odaType = odaRow?.ODA_TYPE?.toString().trim();
//   if (!odaType) return { isODA: false, charge: 0 };

//   const odaSheet = XLSX.utils.sheet_to_json(workbook.Sheets['ODA_TABLE'], { defval: null });
//   const headers = Object.keys(odaSheet[0]).map(h => h.trim());
//   const weightHeader = headers.filter(h => h !== 'ODA CAT.');

//   const odaRowData = odaSheet.find(row => {
//     const cat = row['ODA CAT.'] || row['ODA CAT'] || row['ODACAT'] || '';
//     return cat.toString().trim().toLowerCase() === odaType.toLowerCase();
//   });

//   if (!odaRowData) return { isODA: true, charge: null };

//   for (let col of weightHeader) {
//     const colName = col.trim();

//     if (colName.toLowerCase().includes('rate/kg')) {
//       const match = colName.match(/>(\d+)/);
//       if (match) {
//         const min = parseInt(match[1]);
//         if (weight > min) {
//           const rate = parseFloat(odaRowData[col]);
//           if (!isNaN(rate)) return { isODA: true, charge: rate * weight };
//         }
//       }
//     } else {
//       const rangeMatch = colName.match(/(\d+)\s*-\s*(\d+)/);
//       if (rangeMatch) {
//         const min = parseInt(rangeMatch[1]);
//         const max = parseInt(rangeMatch[2]);
//         if (weight >= min && weight <= max) {
//           const fixedCharge = parseFloat(odaRowData[col]);
//           if (!isNaN(fixedCharge)) return { isODA: true, charge: fixedCharge };
//         }
//       }
//     }
//   }

//   return { isODA: true, charge: null };
// };

// const getRatePerKg = (workbook, state) => {
//   const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['CALCULATE SHEET']);
//   const row = sheet.find(r => r.States && r.States.toLowerCase().trim() === state.toLowerCase().trim());
//   if (!row) return null;

//   const rateKey = Object.keys(row).find(k => k.toLowerCase().includes('rate') && k.toLowerCase().includes('kg'));
//   return rateKey ? parseFloat(row[rateKey]) : null;
// };

// const getFixedCharges = () => ({
//   DWB: 100,
//   NGT: 0
// });

// // ----------- 🚚 Controller Function -----------

// const calculateRate = async (req, res) => {
//   const { pincode, state, weight, invoiceValue } = req.body;

//   if (!pincode || !state || !weight || !invoiceValue) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const files = await File.find({});
//     if (!files.length) {
//       return res.status(404).json({ error: 'No uploaded files found' });
//     }

//     const results = [];

//     for (let file of files) {
//       const workbook = XLSX.readFile(file.filePath);

//       const pincodeInfo = getZoneFromPincode(workbook, pincode);
//       const odaType = pincodeInfo?.odaType;

//       const rateSheet = XLSX.utils.sheet_to_json(workbook.Sheets['CALCULATE SHEET']);
//       const rateRow = rateSheet.find(r => r.States && r.States.toLowerCase().trim() === state.toLowerCase().trim());
//       const zone = rateRow?.Zone || 'Unknown';

//       const { isODA, charge: ODACharge } = getODACharge(workbook, pincode, weight);
//       const ratePerKg = getRatePerKg(workbook, state);
//       const { DWB, NGT } = getFixedCharges();

//       if (!ratePerKg) {
//         results.push({ fileName: file.fileName, error: 'Rate per kg not found for state' });
//         continue;
//       }

//       const ODA = ODACharge !== null ? ODACharge : 0;
//       const freight = weight * ratePerKg;
//       const FOV = invoiceValue * 0.001;
//       const totalWithoutFSC = freight + DWB + FOV + NGT + ODA;
//       const FSC = totalWithoutFSC * 0.10;
//       const subtotal = totalWithoutFSC + FSC;
//       const GST = subtotal * 0.18;
//       const total = subtotal + GST;

//       results.push({
//         fileName: file.fileName,
//         state,
//         pincode,
//         zone,
//         isODA,
//         odaType: odaType || null,
//         weight,
//         ratePerKg,
//         freight,
//         DWB,
//         FOV,
//         NGT,
//         ODA,
//         totalWithoutFSC,
//         FSC,
//         subtotal,
//         GST,
//         total: parseFloat(total.toFixed(2))
//       });
//     }

//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error while processing files' });
//   }
// };

// module.exports = { calculateRate };



const XLSX = require('xlsx');
const File = require('../models/fileModel');
const Calculation = require('../models/calculationModel');  

// ----------- Helpers (same as before) -----------
const getZoneFromPincode = (workbook, pincode) => {
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['Pincode List (25)']);
  const row = sheet.find(r => String(r.Pincode).trim() === String(pincode).trim());
  return row
    ? { zone: row.Zone, state: row.State, odaType: row.ODA_TYPE?.toString().trim() || null }
    : null;
};

const getODACharge = (workbook, pincode, weight) => {
  const pincodeSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Pincode List (25)'], { defval: null });
  const odaRow = pincodeSheet.find(r => String(r.PINCODE).trim() === String(pincode).trim());

  const odaType = odaRow?.ODA_TYPE?.toString().trim();
  if (!odaType) return { isODA: false, charge: 0 };

  const odaSheet = XLSX.utils.sheet_to_json(workbook.Sheets['ODA_TABLE'], { defval: null });
  const headers = Object.keys(odaSheet[0]).map(h => h.trim());
  const weightHeader = headers.filter(h => h !== 'ODA CAT.');

  const odaRowData = odaSheet.find(row => {
    const cat = row['ODA CAT.'] || row['ODA CAT'] || row['ODACAT'] || '';
    return cat.toString().trim().toLowerCase() === odaType.toLowerCase();
  });

  if (!odaRowData) return { isODA: true, charge: null };

  for (let col of weightHeader) {
    const colName = col.trim();

    if (colName.toLowerCase().includes('rate/kg')) {
      const match = colName.match(/>(\d+)/);
      if (match) {
        const min = parseInt(match[1]);
        if (weight > min) {
          const rate = parseFloat(odaRowData[col]);
          if (!isNaN(rate)) return { isODA: true, charge: rate * weight };
        }
      }
    } else {
      const rangeMatch = colName.match(/(\d+)\s*-\s*(\d+)/);
      if (rangeMatch) {
        const min = parseInt(rangeMatch[1]);
        const max = parseInt(rangeMatch[2]);
        if (weight >= min && weight <= max) {
          const fixedCharge = parseFloat(odaRowData[col]);
          if (!isNaN(fixedCharge)) return { isODA: true, charge: fixedCharge };
        }
      }
    }
  }

  return { isODA: true, charge: null };
};

const getRatePerKg = (workbook, state) => {
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets['CALCULATE SHEET']);
  const row = sheet.find(r => r.States && r.States.toLowerCase().trim() === state.toLowerCase().trim());
  if (!row) return null;

  const rateKey = Object.keys(row).find(k => k.toLowerCase().includes('rate') && k.toLowerCase().includes('kg'));
  return rateKey ? parseFloat(row[rateKey]) : null;
};

const getFixedCharges = () => ({
  DWB: 100,
  NGT: 0
});

// ----------- 🚚 Controller Function -----------
const calculateRate = async (req, res) => {
  const { userId, pincode, state, weight, invoiceValue } = req.body;

  if (!userId || !pincode || !state || !weight || !invoiceValue) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const files = await File.find({});
    if (!files.length) {
      return res.status(404).json({ error: 'No uploaded files found' });
    }

    const results = [];

    for (let file of files) {
      const workbook = XLSX.readFile(file.filePath);

      const pincodeInfo = getZoneFromPincode(workbook, pincode);
      const odaType = pincodeInfo?.odaType;

      const rateSheet = XLSX.utils.sheet_to_json(workbook.Sheets['CALCULATE SHEET']);
      const rateRow = rateSheet.find(r => r.States && r.States.toLowerCase().trim() === state.toLowerCase().trim());
      const zone = rateRow?.Zone || 'Unknown';

      const { isODA, charge: ODACharge } = getODACharge(workbook, pincode, weight);
      const ratePerKg = getRatePerKg(workbook, state);
      const { DWB, NGT } = getFixedCharges();

      if (!ratePerKg) {
        results.push({ fileName: file.fileName, error: 'Rate per kg not found for state' });
        continue;
      }

      const ODA = ODACharge !== null ? ODACharge : 0;
      const freight = weight * ratePerKg;
      const FOV = invoiceValue * 0.001;
      const totalWithoutFSC = freight + DWB + FOV + NGT + ODA;
      const FSC = totalWithoutFSC * 0.10;
      const subtotal = totalWithoutFSC + FSC;
      const GST = subtotal * 0.18;
      const total = subtotal + GST;

      // ✅ Save to DB
      const calculationDoc = new Calculation({
        user: userId,
        fileName: file.fileName,
        state,
        pincode,
        zone,
        isODA,
        odaType: odaType || null,
        weight,
        ratePerKg,
        freight,
        DWB,
        FOV,
        NGT,
        ODA,
        totalWithoutFSC,
        FSC,
        subtotal,
        GST,
        total: parseFloat(total.toFixed(2))
      });

      await calculationDoc.save();

      results.push(calculationDoc); // DB se jo _id generate hua wahi response me bhejenge
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while processing files' });
  }
};

module.exports = { calculateRate };
