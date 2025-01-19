const express = require('express');
const {
  getListKendaraan,
  getDetailKendaraan,
  createKendaraan,
  updateKendaraan,
  deleteKendaraan,
} = require('./kendaraan.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const listKendaraan = await getListKendaraan();
    response(200, listKendaraan, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/:kode', async (req, res) => {
  try {
    const { kode } = req.params;
    const kendaraan = await getDetailKendaraan(kode);
    response(200, kendaraan, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const kendaraan = await createKendaraan(data);
    response(200, kendaraan, 'Berhasil menambahkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch('/:kode', async (req, res) => {
  try {
    const { kode } = req.params;
    const data = req.body;
    const kendaraan = await updateKendaraan(kode, data);
    response(200, kendaraan, 'Berhasil memperbarui data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete('/:kode', async (req, res) => {
  try {
    const { kode } = req.params;
    await deleteKendaraan(kode);
    response(200, null, 'Berhasil menghapus data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
