// const mongoose = require('mongoose');   

// const appointmentSchema = new mongoose.Schema({
//   lrNo: {
//     type: String,
//     required: true,
//   },
//   appointmentDate: {
//     type: Date,
//     required: true,
//   },
//   startTime: {
//     type: String,
//     required: true,
//   },
//   endTime: {
//     type: String,
//     required: true,
//   },  
//   appointmentId: {
//     type: String,
//   },
//   poNumber: {
//     type: String,
//     required: true,
//   },
//   asn: {
//     type: String,
//   },
//   poCopy: {
//     type: String, // File path or URL
//   },
// }, {
//   timestamps: true,
// });

// module.exports = mongoose.model('Appointment', appointmentSchema);






const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  lrNo: {
    type: String,
    required: true,
    unique: true, // prevent duplicates
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: String,
  },
  poNumber: {
    type: String,
    required: true,
  },
  asn: {
    type: String,
    required: true,
  },
  poCopy: {
    type: String, // File path
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
