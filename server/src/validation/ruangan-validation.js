const Joi = require('joi');

const createRuanganValidation = Joi.object({
  nama_ruangan: Joi.string().max(100).required(),
});

module.exports = { createRuanganValidation };