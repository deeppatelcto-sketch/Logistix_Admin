

// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// const couriercompanySchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//     required: [true, 'User ID is required.'],
//   },
//   name: {
//     type: String,
//     required: [true, 'Name is required.'],
//   },
//   contactNo: {
//     type: String,
//     required: [true, 'Contact number is required.'],
//     unique: [true, 'Contact number {VALUE} is already registered.'],
//     match: [/^\d{10}$/, 'Contact number must be exactly 10 digits.'],
//   },
//   companyName: {
//     type: String,
//     required: [true, 'Company name is required.'],
//     unique: [true, 'Company name {VALUE} is already taken.'],
//   },
//   gstNo: {
//     type: String,
//     required: [true, 'GST number is required.'],
//     unique: [true, 'GST number {VALUE} is already registered.'],
//     match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Invalid GST number format.'],
//   },
//   panCardNo: {
//     type: String,
//     required: [true, 'PAN card number is required.'],
//     unique: [true, 'PAN card number {VALUE} is already registered.'],
//     match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN card number format.'],
//   },
//   aadharNo: {
//     type: String,
//     required: [true, 'Aadhar number is required.'],
//     unique: [true, 'Aadhar number {VALUE} is already registered.'],
//     match: [/^\d{12}$/, 'Aadhar number must be exactly 12 digits.'],
//   },
//   idProof: {
//     type: String,
//     required: [true, 'ID proof is required.'],
//   },
//   companyLogo: {
//     type: String,
//     required: [true, 'Company logo is required.'],
//   },
//   address: {
//     type: String,
//     required: [true, 'Address is required.'],
//   },
//   city: {
//     type: String,
//     required: [true, 'City is required.'],
//   },
//   state: {
//     type: String,
//     required: [true, 'State is required.'],
//   },
//   pincode: {
//     type: String,
//     required: [true, 'Pincode is required.'],
//     match: [/^\d{6}$/, 'Pincode must be exactly 6 digits.'],
//   },
//   remittancePreference: {
//     type: String,
//     enum: {
//       values: ['Bank Transfer', 'UPI', 'Cheque'],
//       message: '{VALUE} is not a valid remittance preference.',
//     },
//     required: [true, 'Remittance preference is required.'],
//   },
//   codPlan: {
//     type: String,
//     required: [true, 'COD plan is required.'],
//   },
//   shippingPlan: {
//     type: String,
//     required: [true, 'Shipping plan is required.'],
//   },
//   bankHolderName: {
//     type: String,
//     required: [true, 'Bank holder name is required.'],
//   },
//   bankName: {
//     type: String,
//     required: [true, 'Bank name is required.'],
//   },
//   accountNumber: {
//     type: String,
//     required: [true, 'Account number is required.'],
//     unique: [true, 'Account number {VALUE} is already registered.'],
//     match: [/^\d{9,18}$/, 'Account number must be between 9 and 18 digits.'],
//   },
//   ifscCode: {
//     type: String,
//     required: [true, 'IFSC code is required.'],
//     match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format.'],
//   },
//   cancelledChequeImage: {
//     type: String,
//     required: [true, 'Cancelled cheque image is required.'],
//   },
// }, {
//   timestamps: true,
// });

// couriercompanySchema.plugin(uniqueValidator, { message: '{PATH} {VALUE} is already registered.' });

// module.exports = mongoose.model('CourierCompany', couriercompanySchema);


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const couriercompanySchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, 'User ID is required.'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
    unique: [true, 'Contact number {VALUE} is already registered.'],
    match: [/^\d{10}$/, 'Contact number must be exactly 10 digits.'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required.'],
    unique: [true, 'Company name {VALUE} is already taken.'],
  },
  gstNo: {
    type: String,
    required: [true, 'GST number is required.'],
    unique: [true, 'GST number {VALUE} is already registered.'],
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Invalid GST number format.'],
  },
  panCardNo: {
    type: String,
    required: [true, 'PAN card number is required.'],
    unique: [true, 'PAN card number {VALUE} is already registered.'],
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN card number format.'],
  },
  aadharNo: {
    type: String,
    required: [true, 'Aadhar number is required.'],
    unique: [true, 'Aadhar number {VALUE} is already registered.'],
    match: [/^\d{12}$/, 'Aadhar number must be exactly 12 digits.'],
  },
  idProof: {
    type: String,
    required: [true, 'ID proof is required.'],
  },
  companyLogo: {
    type: String,
    required: [true, 'Company logo is required.'],
  },
  address: {
    type: String,
    required: [true, 'Address is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  state: {
    type: String,
    required: [true, 'State is required.'],
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required.'],
    match: [/^\d{6}$/, 'Pincode must be exactly 6 digits.'],
  },
  remittancePreference: {
    type: String,
    enum: {
      values: ['Bank Transfer', 'UPI', 'Cheque'],
      message: '{VALUE} is not a valid remittance preference.',
    },
    required: [true, 'Remittance preference is required.'],
  },
  codPlan: {
    type: String,
    required: [true, 'COD plan is required.'],
  },
  shippingPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: [true, 'Shipping plan is required.'],
  },
  bankHolderName: {
    type: String,
    required: [true, 'Bank holder name is required.'],
  },
  bankName: {
    type: String,
    required: [true, 'Bank name is required.'],
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required.'],
    unique: [true, 'Account number {VALUE} is already registered.'],
    match: [/^\d{9,18}$/, 'Account number must be between 9 and 18 digits.'],
  },
  ifscCode: {
    type: String,
    required: [true, 'IFSC code is required.'],
    match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format.'],
  },
  cancelledChequeImage: {
    type: String,
    required: [true, 'Cancelled cheque image is required.'],
  },
}, {
  timestamps: true,
});

couriercompanySchema.plugin(uniqueValidator, { message: '{PATH} {VALUE} is already registered.' });

module.exports = mongoose.model('CourierCompany', couriercompanySchema);
