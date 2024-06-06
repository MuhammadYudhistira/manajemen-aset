const Joi = require("joi");

const createDetailAsetValidation = Joi.object({
  kode_barang: Joi.string().max(100).required(),
  nomor_rangka: Joi.string().max(100).optional(),
  nomor_mesin: Joi.string().max(100).optional(),
  nomor_polisi: Joi.string().max(100).optional(),
  nomor_bpkb: Joi.string().max(100).optional(),
  id_aset: Joi.string().required(),
  id_ruangan: Joi.string().required(),
});

const UpdateDetailAsetValidation = Joi.object({
  id: Joi.string().required(),
  kode_barang: Joi.string().max(100).required(),
  nomor_rangka: Joi.string().max(100).optional(),
  nomor_mesin: Joi.string().max(100).optional(),
  nomor_polisi: Joi.string().max(100).optional(),
  nomor_bpkb: Joi.string().max(100).optional(),
  id_aset: Joi.string().required(),
  id_ruangan: Joi.string().required(),
});

module.exports = { createDetailAsetValidation, UpdateDetailAsetValidation };
