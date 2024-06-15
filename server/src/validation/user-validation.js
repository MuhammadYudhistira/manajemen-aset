const Joi = require("joi");

const registerUserValidation = Joi.object({
  nip: Joi.string().max(18).required(),
  nama: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  profile: Joi.string().optional(),
  jenis_kelamin: Joi.string().valid("Pria", "Wanita"),
  alamat: Joi.string(),
  no_hp: Joi.string().max(18),
  role: Joi.string()
    .valid("ADMIN", "SEKWAN", "KEPALA_BAGIAN", "STAFF", "GUEST")
    .required(),
});

module.exports = { registerUserValidation };
