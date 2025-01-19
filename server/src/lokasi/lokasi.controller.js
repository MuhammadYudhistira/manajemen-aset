const express = require('express');

const {
  getAlllokasi,
  getlokasiById,
  createlokasi,
  editlokasi,
  deletelokasi,
} = require('./lokasi.service');

const { response } = require('../response/response');
const { responseError } = require('../response/responseError');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const listlokasi = await getAlllokasi();
    response(200, listlokasi, 'Berhasil mengambil data', res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const lokasi = await getlokasiById(id);
    response(200, lokasi, 'Berhasil mengambil data', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const newlokasiData = req.body;
    const lokasi = await createlokasi(newlokasiData);
    response(200, lokasi, 'Berhasil menambah data', res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newlokasiData = req.body;
    const lokasi = await editlokasi(id, newlokasiData);
    response(200, lokasi, 'Berhasil mengupdate data', res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deletelokasi(id);
    response(200, null, 'Berhasil menghapus data', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

module.exports = router;
