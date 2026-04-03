

// const mongoose = require("mongoose");

// const planSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Plan name is required"],
//       unique: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: [true, "Plan price is required"],
//       min: [0, "Price must be a positive number"],
//     },
//     baseRate: {
//       type: Number,
//       required: [true, "Base rate is required"],
//       min: [0, "Base rate must be a positive number"],
//     },
//     docketCharge: {
//       type: Number,
//       required: [true, "Docket charge is required"],
//       min: [0, "Docket charge must be a positive percentage"],
//     },
//     minCharge: {
//       type: Number,
//       required: [true, "Minimum charge is required"],
//       min: [0, "Minimum charge must be a positive number"],
//     },
//     odaCharge: {
//       type: Number,
//       required: [true, "ODA charge is required"],
//       min: [0, "ODA charge must be a positive number"],
//     },
//     appointmentDeliveries: {
//       type: Number,
//       required: [true, "Appointment deliveries charge is required"],
//       min: [0, "Appointment deliveries must be a positive number"],
//     },
//     additionalUsers: {
//       type: Number,
//       required: [true, "Additional users count is required"],
//       min: [0, "Additional users must be a positive number"],
//     },
//     integrations: {
//       type: Boolean,
//       default: false,
//     },
//     whatsappUpdates: {
//       type: Boolean,
//       default: false,
//     },
//     prioritySupport: {
//       type: Boolean,
//       default: false,
//     },
//     ndrCallSetup: {
//       type: Boolean,
//       default: false,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Plan = mongoose.model("Plan", planSchema);

// module.exports = Plan;




const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      unique: true,
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Plan price is required"],
      min: 0,
    },
    baseRate: {
      type: String,
      default: "",
    },
    docketCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    fuelCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    minCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    odaCharge: {
      type: String,
      required: true,
    },
    appointmentDeliveries: {
      type: Number,
      required: true,
      min: 0,
    },
    integrations: {
      type: String,
      default: "",
    },
    whatsappUpdates: {
      type: Boolean,
      default: false,
    },
    prioritySupport: {
      type: String,
      default: "",
    },
    ndrCallSetup: {
      type: Boolean,
      default: false,
    },
    additionalUsers: {
      type: String,
      default: "",
    },
    usageLimit: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly ensure unique index on 'name' field
planSchema.index({ name: 1 }, { unique: true });

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;

