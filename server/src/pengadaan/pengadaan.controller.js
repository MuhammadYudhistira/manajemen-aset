const express = require('express');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const {
  getAllPengadaan,
  getPengadaanByNomor,
  createPengadaan,
} = require('./pengadaan.service');
const { uploadFiles } = require('../middleware/uploadFile');

const router = express.Router();

const fileConfigs = [
  {
    fieldName: 'dokumen_pengadaan',
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ['application/pdf'],
  },
];

router.get('/', async (req, res) => {
  try {
    const data = await getAllPengadaan();
    response(200, data, 'Berhasil Mendapatkan Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/:nomor', async (req, res) => {
  try {
    const { nomor } = req.params;
    const data = await getPengadaanByNomor(nomor);
    response(200, data, 'Berhasil Mendapatkan Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/', uploadFiles(fileConfigs), async (req, res) => {
  try {
    const data = req.body;
    data.dokumen_pengadaan = req.body.dokumen_pengadaan[0];
    const pengadaan = await createPengadaan(data);
    response(200, pengadaan, 'Berhasil Menambahkan Data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
