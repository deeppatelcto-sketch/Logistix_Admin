const B2BCourierRate = require('../models/b2bcourierrateSchema');

exports.calculateSmartB2BRate = async (req, res) => {
  try {
    const { courierName, fromZone, toZone, weight, codAmount = 0, isODA = false, distance = 0 } = req.body;

    const courier = await B2BCourierRate.findOne({ courierName });
    if (!courier) return res.status(404).json({ message: 'Courier not found' });

    const { overheads, zoneRates, odaMatrix } = courier;

    // Get zone rate
    const zoneObj = zoneRates.find(
      (z) => z.fromZone === fromZone && z.toZone === toZone
    );
    if (!zoneObj) return res.status(400).json({ message: 'Zone rate not found' });

    const baseFreight = (weight * zoneObj.rate) / overheads.divisor;

    // Fuel
    const fuelCharge = (baseFreight * overheads.fuel) / 100;

    // Docket
    const docketCharge = overheads.docketCharge;

    // ROV
    let rovCharge = 0;
    if (overheads.rovCharge.includes('%')) {
      const rovPerc = parseFloat(overheads.rovCharge);
      const rovFlat = parseInt(overheads.rovCharge.match(/\d+/g)[1]);
      rovCharge = Math.max((rovPerc / 100) * codAmount, rovFlat);
    } else {
      rovCharge = parseInt(overheads.rovCharge.match(/\d+/g)[0]);
    }

    // Insurance
    let insurance = 100;
    if (overheads.insurance.includes('%')) {
      const insPerc = parseFloat(overheads.insurance);
      const insFlat = parseInt(overheads.insurance.match(/\d+/g)[1]);
      insurance = Math.max((insPerc / 100) * codAmount, insFlat);
    }

    // COD
    let codCharge = 0;
    if (codAmount > 0) {
      codCharge = overheads.codCharge.includes('%')
        ? Math.max(100, (0.2 / 100) * codAmount)
        : parseInt(overheads.codCharge.match(/\d+/g)[0]);
    }

    // Handling Charge
    let handlingCharge = 0;
    const h = overheads.handlingCharge;

    if (typeof h === 'string' && h.includes('>')) {
      if (weight > 200 && h.includes('Rs 2500')) handlingCharge = 2500;
      else if (weight > 70 && weight <= 200 && h.includes('Rs 250')) handlingCharge = 250;
      else if (weight > 32 && weight <= 70 && h.includes('Rs 25')) handlingCharge = 25;
    } else if (typeof h === 'string' && h.includes('INR 2/Kg')) {
      if (weight > 101) {
        handlingCharge = Math.max(2 * weight, 400);
      }
    } else if (!isNaN(parseFloat(h))) {
      handlingCharge = parseFloat(h);
    }

    // ODA Charge
    let odaCharge = 0;
    if (isODA) {
      const oda = odaMatrix.find(
        (o) => {
          const [min, max] = o.distanceRange.split('-').map(Number);
          return distance >= min && distance <= max && weight <= parseFloat(o.weightRange.split(' ')[1]);
        }
      );
      if (oda) odaCharge = oda.charge;
    }

    // Total
    const total = baseFreight + docketCharge + fuelCharge + rovCharge + insurance + codCharge + handlingCharge + odaCharge;

    res.status(200).json({
      baseFreight: baseFreight.toFixed(2),
      docketCharge,
      fuelCharge: fuelCharge.toFixed(2),
      rovCharge,
      insurance,
      codCharge,
      handlingCharge,
      odaCharge,
      totalCharge: total.toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ message: 'Calculation Error', error: err.message });
  }
};
