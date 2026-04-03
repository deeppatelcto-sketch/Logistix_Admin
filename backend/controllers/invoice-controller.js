// const Order = require('../models/orderSchema');
// const { generateInvoicePDF } = require('../utils/invoice-generator');
// const path = require('path');
// const fs = require('fs');

// exports.generateAllCourierInvoices = async (req, res) => {
//   try {
//     const { from, to } = req.query;

//     if (!from || !to) {
//       return res.status(400).json({ msg: 'Please provide both from and to date in YYYY-MM-DD format.' });
//     }

//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     toDate.setHours(23, 59, 59, 999); // include full day

//     // Step 1: Get delivered orders in date range
//     const orders = await Order.find({
//       status: 'delivered',
//       createdAt: { $gte: fromDate, $lte: toDate }
//     });

//     console.log(`📦 Delivered Orders Found: ${orders.length}`);

//     if (!orders.length) {
//       return res.status(404).json({ msg: 'No delivered orders found in the given range.' });
//     }

//     // Step 2: Group by selectedCourierCompany (String field)
//     const groupedOrders = {};

//     orders.forEach(order => {
//       const courierName = order.selectedCourierCompany?.trim();

//       if (!courierName) {
//         console.log(`❌ Order ${order._id} has no courier company`);
//         return;
//       }

//       if (!groupedOrders[courierName]) {
//         groupedOrders[courierName] = [];
//       }

//       groupedOrders[courierName].push(order);
//     });

//     if (Object.keys(groupedOrders).length === 0) {
//       return res.status(404).json({ msg: 'No courier-linked delivered orders found in the given range.' });
//     }

//     // Step 3: Generate invoice per courier
//     const generatedInvoices = [];

//     for (const courierName in groupedOrders) {
//       const orders = groupedOrders[courierName];

//       const subtotal = orders.reduce((sum, o) => sum + (o.finalRate || 0), 0);
//       const gst = parseFloat((subtotal * 0.18).toFixed(2));
//       const total = subtotal + gst;

//       const invoiceData = {
//         courierDetails: {
//           name: courierName,
//           address: 'N/A',
//           gst: 'N/A'
//         },
//         orders,
//         invoiceNo: `TC/${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
//         generatedDate: new Date().toLocaleDateString(),
//         dateRange: {
//           from: fromDate.toDateString(),
//           to: toDate.toDateString()
//         },
//         subtotal,
//         gst,
//         total
//       };

//       const fileName = `invoice-${courierName.replace(/\s+/g, '_')}.pdf`;
//       const filePath = path.join(__dirname, `../invoices/${fileName}`);

//       await generateInvoicePDF(invoiceData, filePath);

//       generatedInvoices.push({
//         courier: courierName,
//         fileName,
//         downloadLink: `/invoices/${fileName}`
//       });
//     }

//     return res.status(200).json({
//       msg: 'Invoices generated successfully',
//       invoices: generatedInvoices
//     });

//   } catch (err) {
//     console.error('❌ Server error:', err);
//     return res.status(500).json({ msg: 'Server error generating courier invoices' });
//   }
// };                              




const Order = require('../models/orderSchema');
const { generateInvoicePDF } = require('../utils/invoice-generator');
const path = require('path');

exports.generateAllCourierInvoices = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ msg: 'Please provide both from and to date in YYYY-MM-DD format.' });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      status: 'delivered',
      createdAt: { $gte: fromDate, $lte: toDate }
    });

    if (!orders.length) {
      return res.status(404).json({ msg: 'No delivered orders found in the given range.' });
    }

    const groupedOrders = {};
    orders.forEach(order => {
      const courierName = order.selectedCourierCompany?.trim();
      if (!courierName) return;

      if (!groupedOrders[courierName]) {
        groupedOrders[courierName] = [];
      }
      groupedOrders[courierName].push(order);
    });

    if (Object.keys(groupedOrders).length === 0) {
      return res.status(404).json({ msg: 'No courier-linked delivered orders found in the given range.' });    
    }

    const generatedInvoices = [];

    for (const courierName in groupedOrders) {
      const orders = groupedOrders[courierName];

      const subtotal = orders.reduce((sum, o) => sum + (o.finalRate || 0), 0);
      const gst = parseFloat((subtotal * 0.18).toFixed(2));
      const total = subtotal + gst;

      const invoiceData = {
        courierDetails: {
          name: courierName,
          address: 'N/A',
          gst: 'N/A'
        },
        orders,
        invoiceNo: `TC/${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        generatedDate: new Date().toLocaleDateString(),
        dateRange: {
          from: fromDate.toDateString(),
          to: toDate.toDateString()
        },
        subtotal,
        gst,
        total
      };

      const fileName = `invoice-${courierName.replace(/\s+/g, '_')}.pdf`;
      const filePath = path.join(__dirname, `../invoices/${fileName}`);

      await generateInvoicePDF(invoiceData, filePath);

      generatedInvoices.push({
        courier: courierName,
        fileName,
        downloadLink: `${req.protocol}://${req.get('host')}/invoices/${fileName}`
      });
    }

    return res.status(200).json({
      msg: 'Invoices generated successfully',
      invoices: generatedInvoices
    });

  } catch (err) {
    console.error('❌ Server error:', err);
    return res.status(500).json({ msg: 'Server error generating courier invoices' });
  }
};

