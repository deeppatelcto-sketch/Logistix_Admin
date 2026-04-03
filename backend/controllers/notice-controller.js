// const Notice = require('../models/noticeSchema.js');

// const noticeCreate = async (req, res) => {
//     try {
//         const notice = new Notice({
//             ...req.body,
//             school: req.body.adminID
//         })
//         const result = await notice.save()
//         res.send(result)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const noticeList = async (req, res) => {
//     try {
//         let notices = await Notice.find({ school: req.params.id })
//         if (notices.length > 0) {
//             res.send(notices)
//         } else {
//             res.send({ message: "No notices found" });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const updateNotice = async (req, res) => {
//     try {
//         const result = await Notice.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })
//         res.send(result)
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

// const deleteNotice = async (req, res) => {
//     try {
//         const result = await Notice.findByIdAndDelete(req.params.id)
//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// const deleteNotices = async (req, res) => {
//     try {
//         const result = await Notice.deleteMany({ school: req.params.id })
//         if (result.deletedCount === 0) {
//             res.send({ message: "No notices found to delete" })
//         } else {
//             res.send(result)
//         }
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };


// const Notice = require('../models/noticeSchema.js');




// const noticeCreate = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, address, phoneNumber } = req.body;

//         // Generate 4-digit OTP
//         const otp = Math.floor(1000 + Math.random() * 9000).toString();

//         const notice = new Notice({
//             firstName,
//             lastName,
//             email,
//             password,
//             address,
//             phoneNumber,
//             otp  // store OTP
//         });

//         const result = await notice.save();

//         // You could also trigger an SMS/email service here to send the OTP

//         res.status(201).send(result);
//     } catch (err) {
//         res.status(500).json({ message: "Error creating notice", error: err });
//     }
// };


// // Get all notices
// const noticeList = async (req, res) => {
//     try {
//         // Find all notices
//         let notices = await Notice.find();

//         // Check if any notices were found
//         if (notices.length > 0) {
//             res.status(200).send(notices);
//         } else {
//             res.status(404).send({ message: "No notices found" });
//         }
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching notices", error: err });
//     }
// };

// // Update a notice
// const updateNotice = async (req, res) => {
//     try {
//         const noticeId = req.params.id;
//         const { firstName, lastName, email, password, address, phoneNumber } = req.body;

//         // Update the notice with the given ID
//         const result = await Notice.findByIdAndUpdate(
//             noticeId,
//             { 
//                 $set: { 
//                     firstName, 
//                     lastName, 
//                     email, 
//                     password, 
//                     address, 
//                     phoneNumber 
//                 } 
//             },
//             { new: true }  // Return the updated document
//         );

//         // If notice is found and updated, return the updated notice
//         if (result) {
//             res.status(200).send(result);
//         } else {
//             res.status(404).send({ message: "Notice not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error updating notice", error });
//     }
// };

// // Delete a specific notice
// const deleteNotice = async (req, res) => {
//     try {
//         const noticeId = req.params.id;

//         // Delete the notice with the given ID
//         const result = await Notice.findByIdAndDelete(noticeId);

//         // If notice is found and deleted, return the result
//         if (result) {
//             res.status(200).send({ message: "Notice deleted successfully", result });
//         } else {
//             res.status(404).send({ message: "Notice not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting notice", error });
//     }
// };

// // Delete all notices (this can be used for any batch deletion logic if needed)
// const deleteNotices = async (req, res) => {
//     try {
//         // Delete all notices
//         const result = await Notice.deleteMany();

//         // If no notices were deleted, send a message
//         if (result.deletedCount === 0) {
//             res.status(404).send({ message: "No notices found to delete" });
//         } else {
//             res.status(200).send({ message: "Notices deleted successfully", result });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting notices", error });
//     }
// };

// module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };




const Notice = require('../models/noticeSchema.js');
const crypto = require('crypto'); // ✅ NEW - for generating secure token

// Create a new notice
const noticeCreate = async (req, res) => {
    try {
        const { firstName, lastName, email, password, address, phoneNumber } = req.body;

        const otp = "123456";

        const notice = new Notice({
            firstName,
            lastName,
            email,
            password,
            address,
            phoneNumber,
            otp  // store OTP
        });

        const result = await notice.save();

        // ✅ Generate secure token and store in a separate collection
        const tokenString = crypto.randomBytes(32).toString("hex");

        const token = new Token({
            userId: result._id,
            token: tokenString
        });

        await token.save();

        // ✅ Optionally send token in response
        res.status(201).send({
            message: "Notice created & token saved",
            data: result,
            token: tokenString
        });

    } catch (err) {
        res.status(500).json({ message: "Error creating notice", error: err });
    }
};


// Get all notices
const noticeList = async (req, res) => {
    try {
        let notices = await Notice.find();

        if (notices.length > 0) {
            res.status(200).send(notices);
        } else {
            res.status(404).send({ message: "No notices found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching notices", error: err });
    }
};

// Update a notice
const updateNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const { firstName, lastName, email, password, address, phoneNumber } = req.body;

        const result = await Notice.findByIdAndUpdate(
            noticeId,
            { 
                $set: { 
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    address, 
                    phoneNumber 
                } 
            },
            { new: true }
        );

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Notice not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating notice", error });
    }
};

// Delete a specific notice
const deleteNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const result = await Notice.findByIdAndDelete(noticeId);

        if (result) {
            res.status(200).send({ message: "Notice deleted successfully", result });
        } else {
            res.status(404).send({ message: "Notice not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting notice", error });
    }
};

// Delete all notices
const deleteNotices = async (req, res) => {
    try {
        const result = await Notice.deleteMany();

        if (result.deletedCount === 0) {
            res.status(404).send({ message: "No notices found to delete" });
        } else {
            res.status(200).send({ message: "Notices deleted successfully", result });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting notices", error });
    }
};


// ✅ Get all notices with their tokens
const noticeWithTokens = async (req, res) => {
    try {
        // Step 1: Get all notices
        const notices = await Notice.find();

        // Step 2: Get tokens for each notice
        const results = await Promise.all(
            notices.map(async (notice) => {
                const tokenData = await Token.findOne({ userId: notice._id });
                return {
                    ...notice.toObject(),  // convert Mongoose doc to plain JS
                    token: tokenData?.token || null  // add token field
                };
            })
        );

        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(404).send({ message: "No notices found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching notice and token data", error });
    }
};


// ✅ Get notice and token by phone number
const noticeWithTokenByPhone = async (req, res) => {
    try {
        const { phoneNumber } = req.params; // or use req.body if you're using POST

        // Step 1: Find notice by phone number
        const notice = await Notice.findOne({ phoneNumber });

        if (!notice) {
            return res.status(404).send({ message: "Notice not found for this phone number" });
        }

        // Step 2: Find token by notice._id
        const token = await Token.findOne({ userId: notice._id });

        // Step 3: Merge both
        const result = {
            ...notice.toObject(),
            token: token?.token || null
        };

        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data by phone number", error });
    }
};




module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices, noticeWithTokens, noticeWithTokenByPhone };