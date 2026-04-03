
const { getZone } = require('../utils/getZoneByPincode');
const CourierRate = require('../models/courierrateSchema');


exports.calculateCourierRates = async (req, res) => {
  try {
    const {
      pickupPincode,
      deliveryPincode,
      weight,
      qty,
      length,
      width,
      height,
      paymentMode,
      invoiceValue,
      insurance,
      appointmentDelivery
    } = req.body;

    const zone = await getZone(pickupPincode, deliveryPincode); // ✅ Add await
    if (!zone) return res.status(400).json({ message: 'Invalid pincode' });

    const courierRates = await CourierRate.find();

    const weightKg = parseFloat(weight);
    const volWeight = (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 5000;
    const chargedWeight = Math.max(weightKg, volWeight);

    const GST_PERCENT = 18;

    const allRates = courierRates.map(company => {
      const baseRate = parseFloat(company[`${zone}_upto`] || 0);
      const additionalRate = parseFloat(company[`${zone}_additional`] || 0);
      const minWeight = parseFloat(company.minWeight || 0);

      let weightCharge = 0;
      if (chargedWeight <= minWeight) {
        weightCharge = baseRate;
      } else {
        const extra = chargedWeight - minWeight;
        weightCharge = baseRate + (extra * additionalRate);
      }

      const fuelPercent = parseFloat(company.fuelSurcharge?.replace('%', '') || 0);
      const fuelCharge = (weightCharge * fuelPercent) / 100;

      let codFixed = 0, codPercent = 0, codCharge = 0;
      if (paymentMode === 'COD') {
        codFixed = parseFloat(company.codCharge_charge || 0);
        codPercent = parseFloat(company.codCharge_percentage?.replace('%', '') || 0);
        codCharge = codFixed + ((weightCharge * codPercent) / 100);
      }

      let insuranceCharge = 0;
      if (insurance) {
        insuranceCharge = invoiceValue * 0.02;
      }

      let appointmentCharge = appointmentDelivery ? 30 : 0;

      const freightBeforeGST = weightCharge + fuelCharge + codCharge + insuranceCharge + appointmentCharge;
      const gstCharge = (freightBeforeGST * GST_PERCENT) / 100;

      const finalRate = freightBeforeGST + gstCharge;

      return {
        companyName: company.companyName,
        breakdown: {
          weightCharge: weightCharge.toFixed(2),
          fuelCharge: fuelCharge.toFixed(2),
          freightCharges: (weightCharge + fuelCharge).toFixed(2),
          codCharges: codCharge.toFixed(2),
          insuranceCharge: insuranceCharge.toFixed(2),
          appointmentDeliveryCharge: appointmentCharge.toFixed(2),
          gst: gstCharge.toFixed(2),
          total: finalRate.toFixed(2),
          volumetricWeight: volWeight.toFixed(2),
          chargedWeight: chargedWeight.toFixed(2),
          minimumWeight: minWeight.toFixed(2)
        },
        totalRate: parseFloat(finalRate.toFixed(2))
      };
    });

    res.status(200).json({
      message: 'Rates calculated successfully',
      zone,
      rates: allRates
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error' });
  }
};
