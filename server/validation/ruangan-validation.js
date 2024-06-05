const joi = require("joi");

const createRuanganValidation = joi.object({
  nama_ruangan: joi.string().max(100).required(),
});

module.exports = { createRuanganValidation };
