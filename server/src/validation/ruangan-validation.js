const Joi = require('joi');

const createRuanganValidation = Joi.object({
  nama_lokasi: Joi.string().max(100).required(),
});

module.exports = { createRuanganValidation };
