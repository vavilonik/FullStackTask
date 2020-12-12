const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  logIn: { type: String, required: true },
  workPhone: { type: String, required: true },
  personalPhone: { type: String, required: false },
  workEmail: { type: String, required: true },
  personalEmail: { type: String, required: false },
  businessLocation: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  hourlyRate: { type: String, required: true },
});

module.exports = Employee = mongoose.model('Employee', EmployeeSchema);