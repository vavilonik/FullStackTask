const joi = require('joi');

const employeeSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  logIn: joi.string().required(),
  workPhone: joi.string().required(),
  personalPhone: joi.string().optional(),
  workEmail: joi.string().required(),
  personalEmail: joi.string().optional(),
  businessLocation: joi.string().required(),
  company: joi.string().required(),
  role: joi.string().required(),
  hourlyRate: joi.string().required()
}).required();

module.exports = employeeSchema;