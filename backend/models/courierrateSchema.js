const mongoose = require('mongoose');

const courierRateSchema = new mongoose.Schema({
    companyName: {
  type: String,
    required: true

},

    companiesLogo: {
        type: String, 
        required: true
    },
    serviceType: {
        type: String,
        enum: ['Small', 'Surface', 'Large', 'Express', '10KG', 'Heavy', 'Air'],
        required: true
    },
    mode: {
        type: String,
        enum: ['Surface', 'Air'],
        required: true
    },
    minWeight: {
        type: String,
        required: true
    },

    // Zone rates
    zoneA_upto: {
        type: String,
        required: true
    },        // base rate
    zoneA_additional: {
        type: String,
        required: true
    },  // additional rate
    zoneB_upto: {
        type: String,
        required: true
    },
    zoneB_additional: {
        type: String,
        required: true
    },
    zoneC1_upto: {
        type: String,
        required: true
    },
    zoneC1_additional: {
        type: String,
        required: true
    },
    zoneC2_upto: {
        type: String,
        required: true
    },
    zoneC2_additional: {
        type: String,
        required: true
    },
    zoneD1_upto: {
        type: String,
        required: true
    },
    zoneD1_additional: {
        type: String,
        required: true
    },
    zoneD2_upto: {
        type: String,
        required: true
    },
    zoneD2_additional: {
        type: String,
        required: true
    },
    zoneE_upto: {
        type: String,
        required: true
    },
    zoneE_additional: {
        type: String,
        required: true
    },
    zoneF_upto: {
        type: String,
        required: true
    },
    zoneF_additional: {
        type: String,
        required: true
    },

    // Extra charges
    codCharge_charge: {
        type: String,
        required: true
    },
    codCharge_percentage: {
        type: String,
        required: true
    }, // e.g., "1.5%"
    fuelSurcharge: {
        type: String, // e.g., "5%", "15%"
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CourierRate', courierRateSchema);


