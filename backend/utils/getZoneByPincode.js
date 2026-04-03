
const axios = require('axios');

const metroCities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad'];
const neStates = ['Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura', 'Jammu and Kashmir'];


/**
 * Get state & city using Indian postal API
 */
async function getCityState(pincode) {
  try {
    const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = res.data[0];

    if (data.Status !== 'Success') return null;

    const info = data.PostOffice[0];
    return {
      city: info.District,
      state: info.State
    };
  } catch (err) {
    console.error('Pincode fetch error:', err);
    return null;
  }
}

/**
 * Zone logic
 */
async function getZone(pickupPincode, deliveryPincode) {
  const from = await getCityState(pickupPincode);
  const to = await getCityState(deliveryPincode);

  if (!from || !to) return 'Unknown';

  if (from.city === to.city) return 'zoneB';
  if (from.state === to.state) return 'zoneA';
  if (metroCities.includes(from.city) && metroCities.includes(to.city)) return 'zoneC1';
  if (neStates.includes(to.state)) return 'zoneE';

  return 'zoneD1';
}

module.exports = { getZone };
