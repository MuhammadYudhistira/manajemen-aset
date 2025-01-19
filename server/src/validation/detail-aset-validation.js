const Joi = require('joi');

const createDetailAsetValidation = Joi.object({
  kode_detail: Joi.string().max(25).required(),
  kode_barang: Joi.string().max(20).required(),
  nomor_pengadaan: Joi.string().max(20).allow(null, ''),
  nomor_rangka: Joi.string().max(50).optional().allow(null, ''), // Allow null and empty string
  nomor_mesin: Joi.string().max(50).optional().allow(null, ''), // Apply similar rule here
  nomor_polisi: Joi.string().max(50).optional().allow(null, ''),
  nomor_bpkb: Joi.string().max(50).optional().allow(null, ''),
  id_lokasi: Joi.number().required(),
  merk: Joi.string().max(50).required(),
  ukuran: Joi.string().max(50).required(),
  harga_satuan: Joi.number().required(),
  keterangan: Joi.string().optional().allow('').allow(null),
  tahun_perolehan: Joi.date().optional().allow(null, ''),
  image: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.optional()
  ),
});

const UpdateDetailAsetValidation = Joi.object({
  kode_detail: Joi.string().max(25).required(),
  kode_barang: Joi.string().max(20).required(),
  nomor_pengadaan: Joi.string().max(20).allow(null, ''),
  nomor_rangka: Joi.string().max(50).optional().allow(null, ''), // Allow null and empty string
  nomor_mesin: Joi.string().max(50).optional().allow(null, ''), // Apply similar rule here
  nomor_polisi: Joi.string().max(50).optional().allow(null, ''),
  nomor_bpkb: Joi.string().max(50).optional().allow(null, ''),
  id_lokasi: Joi.number().required(),
  merk: Joi.string().max(50).required(),
  ukuran: Joi.string().max(50).required(),
  harga_satuan: Joi.number().required(),
  keterangan: Joi.string().optional().allow('').allow(null),
  tahun_perolehan: Joi.alternatives()
    .try(
      Joi.date(), // Nilai tanggal valid
      Joi.allow(null, '') // Nilai null atau string kosong
    )
    .optional(),
  image: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.optional()
  ),
});

module.exports = { createDetailAsetValidation, UpdateDetailAsetValidation };
