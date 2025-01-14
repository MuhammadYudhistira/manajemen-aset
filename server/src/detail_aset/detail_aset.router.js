const express = require('express');
const {
  getDetailAset,
  unarchiveAsset,
  archiveAsset,
  listActiveDetailAset,
  getSearchDetailAset,
} = require('./detail_aset.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    response(200, 'HALO', 'Berhasil mendapatkan data', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.get('/active', async (req, res) => {
  try {
    const data = await listActiveDetailAset();
    response(200, data, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.get('/search', async (req, res) => {
  try {
    const { kode } = req.query;
    const data = await getSearchDetailAset(kode);
    response(200, data, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    if (error.message === 'Data tidak ditemukan') {
      responseError(404, error.message, res);
    }
    responseError(500, error.message, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetailAset(id);
    response(200, data, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.post('/:id/archive', async (req, res) => {
  try {
    const { id } = req.params;
    const { keterangan, action } = req.body;

    let detailAset;
    if (action === 'unarchive') {
      detailAset = await unarchiveAsset(id, keterangan);
    } else {
      detailAset = await archiveAsset(id, keterangan);
    }

    response(200, detailAset, 'Berhasil memperbarui status aset', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
