const CourierCompany = require('../models/b2bcourierrateSchema');
const { getZone } = require('./getZoneByPincode'); // assuming your zone logic is in utils/zoneLogic.js     

/**
 * Calculate courier rate
 */
async function calculateB2BCourierRate(companyId, pickupPincode, deliveryPincode, weight) {
  try {
    const company = await CourierCompany.findById(companyId);
    if (!company) throw new Error('Courier company not found');

    const zone = await getZone(pickupPincode, deliveryPincode);
    if (zone === 'Unknown') throw new Error('Could not determine zone');

    const zoneIndex = company.zoneMatrix.zones.indexOf(zone);
    if (zoneIndex === -1) throw new Error(`Zone ${zone} not found in matrix`);

    const weightBrackets = company.odaWeightBrackets.map(w => parseFloat(w));
    let rowIndex = weightBrackets.findIndex(w => weight <= w);
    if (rowIndex === -1) rowIndex = weightBrackets.length - 1;

    const baseRate = company.zoneMatrix.matrix?.[rowIndex]?.[zoneIndex] || 0;

    const overhead = [...company.overheadCharges.values()]
      .filter(v => typeof v === 'number')
      .reduce((sum, val) => sum + val, 0);

    const total = baseRate + overhead;

    return {
      companyName: company.companyName,
      zone,
      weight,
      baseRate,
      overheadCharges: Object.fromEntries(company.overheadCharges),
      totalCharge: total
    };

  } catch (err) {
    console.error('Rate Calculation Error:', err.message);
    throw err;
  }
}

module.exports = { calculateB2BCourierRate };
