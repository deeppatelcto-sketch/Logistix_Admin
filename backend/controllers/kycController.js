const KYC = require('../models/kycSchema');

// ✅ Document types per organization (from your image)
const orgDocMap = {
  "Individual": [
    "Passport",
    "PAN Card",
    "Voter ID",
    "Driving Licence",
    "Bank Acc Statement",
    "Ration Card",
    "Aadhaar Card"
  ],
  "Company": [
    "Certificate of Incorporation",
    "Memorandum of Association",
    "Article of Association",
    "Power of Attorney",
    "PAN Card",
    "Letter Head",
    "Telephone Bill",
    "IEC Copy",
    "CST Certificate"
  ],
  "Partnership firm": [
    "Registration Certificate",
    "Partnership Deed",
    "Power of Attorney",
    "Telephone Bill",
    "Other Documents"
  ],
  "Trusts, Foundations": [
    "Certificate of Registration",
    "Power of Attorney",
    "Resolution of Entity",
    "Telephone Bill",
    "Other Documents"
  ]
};

// ✅ Create KYC Entry
exports.createKYC = async (req, res) => {
  try {
    const {
      consignerMobileNo,
      organizationType,
      documentOneType,
      documentTwoType
    } = req.body;

    // ✅ Check uploaded files
    if (!req.files || !req.files['documentOne'] || !req.files['documentTwo']) {
      return res.status(400).json({ message: 'Both document files are required.' });
    }

    // ✅ Check organization type
    if (!orgDocMap[organizationType]) {
      return res.status(400).json({ message: 'Invalid organization type' });
    }

    // ✅ Same document selected twice
    if (documentOneType === documentTwoType) {
      return res.status(400).json({ message: 'Document 1 and Document 2 cannot be the same.' });
    }

    // ✅ Check if selected documents are valid for selected organization
    const allowedDocs = orgDocMap[organizationType];
    if (
      !allowedDocs.includes(documentOneType) ||
      !allowedDocs.includes(documentTwoType)
    ) {
      return res.status(400).json({
        message: `Invalid document type(s) for ${organizationType}. Allowed types are: ${allowedDocs.join(', ')}`
      });
    }

    // ✅ Check duplicate entry
    const existingKYC = await KYC.findOne({
      consignerMobileNo,
      organizationType,
      status: { $ne: 'Rejected' }
    });
    if (existingKYC) {
      return res.status(409).json({ message: 'KYC already submitted for this user and organization type' });
    }

    // ✅ Save new KYC
    const newKYC = new KYC({
      consignerMobileNo,
      organizationType,
      documentOne: {
        documentType: documentOneType,
        filePath: `uploads/${req.files['documentOne'][0].filename}`
      },
      documentTwo: {
        documentType: documentTwoType,
        filePath: `uploads/${req.files['documentTwo'][0].filename}`
      }
    });

    await newKYC.save();
    res.status(201).json({ message: 'KYC submitted successfully!', data: newKYC });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating KYC record' });
  }
};

// ✅ Get All KYC Entries
exports.getAllKYC = async (req, res) => {
  try {
    const allKycEntries = await KYC.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'All KYC records fetched', data: allKycEntries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching KYC records' });
  }
};

// ✅ Update KYC Status
exports.updateKYCStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ['Pending', 'Applied', 'Approved', 'Rejected'];
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    if (!allowedStatus.includes(formattedStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedKYC = await KYC.findByIdAndUpdate(
      id,
      { status: formattedStatus },
      { new: true }
    );

    if (!updatedKYC) {
      return res.status(404).json({ message: 'KYC not found' });
    }

    res.status(200).json({ message: 'KYC status updated', data: updatedKYC });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating KYC status' });
  }
};

// ✅ Delete KYC by ID
exports.deleteKYC = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedKYC = await KYC.findByIdAndDelete(id);
    if (!deletedKYC) {
      return res.status(404).json({ message: 'KYC record not found' });
    }

    res.status(200).json({ message: 'KYC deleted successfully', data: deletedKYC });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting KYC record' });
  }
};
