const Joi = require("joi");

const registerUserValidation = Joi.object({
  nip: Joi.string().max(18).required(),
  nama: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  profile: Joi.string().optional(),
  jenis_kelamin: Joi.string().valid("Pria", "Wanita"),
  alamat: Joi.string(),
  no_hp: Joi.string().max(18),
  image: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.optional()
  ),
  role: Joi.string()
    .valid("ADMIN", "SEKWAN", "KEPALA_BAGIAN", "STAFF", "GUEST")
    .required(),
});

const loginValidation = Joi.object({
  nip: Joi.string().max(18).required(),
  password: Joi.string().max(100).required(),
});

module.exports = { registerUserValidation, loginValidation };
