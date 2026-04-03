// // controllers/walletController.js

// const Wallet = require('../models/walletSchema');
// const Customer = require('../models/User'); 
// const CourierCompany = require('../models/couriercompanySchema'); 

// // Recharge wallet using userId and userModel from request body
// const rechargeWallet = async (req, res) => {
//   try {
//     const { userId, amount, description, userModel } = req.body;

//     if (!userId) return res.status(400).json({ message: 'userId is required' });
//     if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
//     if (!userModel || !['Customer', 'CourierCompany'].includes(userModel)) {
//       return res.status(400).json({ message: 'Invalid userModel' });
//     }

//     let user;
//     if (userModel === 'Customer') {
//       user = await Customer.findById(userId);
//     } else if (userModel === 'CourierCompany') {
//       user = await CourierCompany.findById(userId);
//     }

//     if (!user) return res.status(404).json({ message: `${userModel} not found` });

//     let wallet = await Wallet.findOne({ userId, userModel });
//     if (!wallet) {
//       wallet = new Wallet({ userId, userModel, balance: 0, transactions: [] });
//     }

//     wallet.balance += amount;
//     wallet.transactions.push({ type: 'credit', amount, description: description || 'Wallet Recharge' });

//     await wallet.save();

//     return res.json({ message: 'Wallet recharged', balance: wallet.balance, transactions: wallet.transactions });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   rechargeWallet,
// };


// // Debit wallet
// const debitWallet = async (req, res) => {
//   try {
//     const { userId, amount, description } = req.body;
//     if (!userId) return res.status(400).json({ message: 'userId is required' });
//     if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

//     let wallet = await Wallet.findOne({ userId });
//     if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

//     if (wallet.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

//     wallet.balance -= amount;
//     wallet.transactions.push({ type: 'debit', amount, description: description || 'Wallet Debit' });

//     await wallet.save();

//     return res.json({ message: 'Amount debited', balance: wallet.balance, transactions: wallet.transactions });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// // Refund wallet  
// const refundWallet = async (req, res) => {
//   try {
//     const { userId, amount, description, userModel } = req.body;
//     if (!userId) return res.status(400).json({ message: 'userId is required' });
//     if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

//     let wallet = await Wallet.findOne({ userId });
//     if (!wallet) {
//       wallet = new Wallet({ userId, userModel: userModel || 'Customer', balance: 0, transactions: [] });
//     }

//     wallet.balance += amount;
//     wallet.transactions.push({ type: 'refund', amount, description: description || 'Wallet Refund' });

//     await wallet.save();

//     return res.json({ message: 'Refund successful', balance: wallet.balance, transactions: wallet.transactions });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get wallet info by userId (pass in query or body)
// const getWallet = async (req, res) => {
//   try {
//     // You can choose to get userId from query or body, example query:
//     const userId = req.query.userId || req.body.userId;
//     if (!userId) return res.status(400).json({ message: 'userId is required' });

//     const wallet = await Wallet.findOne({ userId });
//     if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

//     return res.json({ balance: wallet.balance, transactions: wallet.transactions });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get all wallets
// const getAllWallets = async (req, res) => {
//   try {
//     const wallets = await Wallet.find().sort({ updatedAt: -1 });

//     // Optional: Populate names for display (Customer or CourierCompany)
//     const enrichedWallets = await Promise.all(wallets.map(async (wallet) => {
//       let userInfo = null;
//       if (wallet.userModel === 'Customer') {
//         userInfo = await Customer.findById(wallet.userId).select('name mobile');
//       } else if (wallet.userModel === 'CourierCompany') {
//         userInfo = await CourierCompany.findById(wallet.userId).select('companyName phone');
//       }

//       return {
//         ...wallet.toObject(),
//         userDetails: userInfo,
//       };
//     }));

//     return res.status(200).json(enrichedWallets);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Failed to fetch wallets' });
//   }
// };

// module.exports = {
//   rechargeWallet,
//   debitWallet,
//   refundWallet,
//   getWallet,
//   getAllWallets, 
// };









const Wallet = require('../models/walletSchema');
const Customer = require('../models/User');
const CourierCompany = require('../models/couriercompanySchema');

// 🟢 Recharge wallet (Token-based or Admin)
exports.rechargeWallet = async (req, res) => {
  try {
    let { userId, amount, description, userModel } = req.body;

    // ✅ If token present (client)
    if (req.user && req.user._id) {
      userId = req.body.userId || req.user._id;
      userModel = req.body.userModel || req.user.userModel || 'Customer';

      // 🚫 Prevent assigning someone else's wallet
      if (req.body.userId && req.body.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not allowed to recharge another user's wallet." });
      }
    } else {
      // ✅ Admin route (no token)
      if (!userId) return res.status(400).json({ message: 'userId is required' });
      if (!userModel) return res.status(400).json({ message: 'userModel is required' });
    }

    if (!amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid amount' });

    // ✅ Validate userModel
    if (!['Customer', 'CourierCompany'].includes(userModel))
      return res.status(400).json({ message: 'Invalid userModel' });

    // ✅ Find the user
    let user =
      userModel === 'Customer'
        ? await Customer.findById(userId)
        : await CourierCompany.findById(userId);

    if (!user) return res.status(404).json({ message: `${userModel} not found` });

    // ✅ Find or create wallet
    let wallet = await Wallet.findOne({ userId, userModel });
    if (!wallet)
      wallet = new Wallet({ userId, userModel, balance: 0, transactions: [] });

    // ✅ Update wallet
    wallet.balance += amount;
    wallet.transactions.push({
      type: 'credit',
      amount,
      description: description || 'Wallet Recharge',
    });

    await wallet.save();
    res.json({ message: 'Wallet recharged', balance: wallet.balance, transactions: wallet.transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔴 Debit wallet
exports.debitWallet = async (req, res) => {
  try {
    let { userId, amount, description } = req.body;

    if (req.user && req.user._id) {
      userId = req.body.userId || req.user._id;

      if (req.body.userId && req.body.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You cannot debit another user's wallet." });
      }
    } else {
      if (!userId) return res.status(400).json({ message: 'userId is required' });
    }

    if (!amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid amount' });

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    if (wallet.balance < amount)
      return res.status(400).json({ message: 'Insufficient balance' });

    wallet.balance -= amount;
    wallet.transactions.push({
      type: 'debit',
      amount,
      description: description || 'Wallet Debit',
    });

    await wallet.save();
    res.json({ message: 'Amount debited', balance: wallet.balance, transactions: wallet.transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔄 Refund wallet
exports.refundWallet = async (req, res) => {
  try {
    let { userId, amount, description, userModel } = req.body;

    if (req.user && req.user._id) {
      userId = req.body.userId || req.user._id;
      userModel = req.body.userModel || req.user.userModel || 'Customer';

      if (req.body.userId && req.body.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not allowed to refund another user's wallet." });
      }
    } else {
      if (!userId) return res.status(400).json({ message: 'userId is required' });
      if (!userModel) return res.status(400).json({ message: 'userModel is required' });
    }

    if (!amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid amount' });

    let wallet = await Wallet.findOne({ userId });
    if (!wallet)
      wallet = new Wallet({ userId, userModel, balance: 0, transactions: [] });

    wallet.balance += amount;
    wallet.transactions.push({
      type: 'refund',
      amount,
      description: description || 'Wallet Refund',
    });

    await wallet.save();
    res.json({ message: 'Refund successful', balance: wallet.balance, transactions: wallet.transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📦 Get my wallet (token)
exports.getMyWallet = async (req, res) => {
  try {
    if (!req.user || !req.user._id)
      return res.status(401).json({ message: 'Unauthorized' });

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.json({ balance: wallet.balance, transactions: wallet.transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📋 Get any wallet by userId (Admin)
exports.getWallet = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.json({ balance: wallet.balance, transactions: wallet.transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// // 📊 Get all wallets (Admin)
// exports.getAllWallets = async (req, res) => {
//   try {
//     const wallets = await Wallet.find().sort({ updatedAt: -1 });

//     const enrichedWallets = await Promise.all(wallets.map(async (wallet) => {
//       let userInfo = null;
//       if (wallet.userModel === 'Customer') {
//         userInfo = await Customer.findById(wallet.userId).select('name mobile');
//       } else if (wallet.userModel === 'CourierCompany') {
//         userInfo = await CourierCompany.findById(wallet.userId).select('companyName phone');
//       }
//       return { ...wallet.toObject(), userDetails: userInfo };
//     }));

//     res.status(200).json(enrichedWallets);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch wallets' });
//   }
// };




// 📊 Get all wallets (Admin)
exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find().sort({ updatedAt: -1 });

    const enrichedWallets = await Promise.all(
      wallets.map(async (wallet) => {
        let userInfo = null;

        if (wallet.userModel === "Customer") {
          // ✅ Fetch both firstName & lastName for frontend compatibility
          userInfo = await Customer.findById(wallet.userId).select("firstName lastName mobile");
        } else if (wallet.userModel === "CourierCompany") {
          // ✅ Fetch both companyName & name for courier display
          userInfo = await CourierCompany.findById(wallet.userId).select("companyName name phone");
        }

        return {
          ...wallet.toObject(),
          userDetails: userInfo,
        };
      })
    );

    res.status(200).json(enrichedWallets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch wallets" });
  }
};
// 📊 Get all wallets (Admin)
exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find().sort({ updatedAt: -1 });

    const enrichedWallets = await Promise.all(
      wallets.map(async (wallet) => {
        let userInfo = null;

        if (wallet.userModel === "Customer") {
          // ✅ Fetch both firstName & lastName for frontend compatibility
          userInfo = await Customer.findById(wallet.userId).select("firstName lastName mobile");
        } else if (wallet.userModel === "CourierCompany") {
          // ✅ Fetch both companyName & name for courier display
          userInfo = await CourierCompany.findById(wallet.userId).select("companyName name phone");
        }

        return {
          ...wallet.toObject(),
          userDetails: userInfo,
        };
      })
    );

    res.status(200).json(enrichedWallets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch wallets" });
  }
};
