const File = require('../models/fileModel');

module.exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newFile = await File.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

    res.json({ success: true, file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading file" });
  }
};

module.exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Error fetching files" });
  }
};       
