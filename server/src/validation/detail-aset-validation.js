const Joi = require("joi");

const createDetailAsetValidation = Joi.object({
  kode_barang: Joi.string().max(100).required(),
  nomor_rangka: Joi.string().max(100).optional().allow("").allow(null),
  nomor_mesin: Joi.string().max(100).optional().allow("").allow(null),
  nomor_polisi: Joi.string().max(100).optional().allow("").allow(null),
  nomor_bpkb: Joi.string().max(100).optional().allow("").allow(null),
  keterangan: Joi.string().optional().allow("").allow(null),
  id_aset: Joi.string().required(),
  id_ruangan: Joi.string().required(),
  image: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.optional()
  ),
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
