const express = require('express');
const {
  getDetailAset,
  unarchiveAsset,
  archiveAsset,
  listActiveDetailAset,
  getSearchDetailAset,
  getListDetailAset,
  createDetailAset,
  editDetailAset,
  deleteDetailAset,
  deleteDetailAsetImage,
} = require('./detail_aset.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const { uploadImage } = require('../middleware/uploadGambar');

const router = express.Router();

const uploadDetailAssetImage = uploadImage(
  'detailAset-image', // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'] //jenis file yang diterima
);

router.get('/', async (req, res) => {
  try {
    const detailAset = await getListDetailAset();
    response(200, detailAset, 'Berhasil mendapatkan data', res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.post('/', uploadDetailAssetImage, async (req, res) => {
  try {
    const data = req.body;
    const detailAsset = await createDetailAset(data);
    response(200, detailAsset, 'Berhasil Menambahkan Data Detail Aset', res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
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

router.post('/image', async (req, res) => {
  try {
    const data = req.body;
    await deleteDetailAsetImage(data);
    response(200, data, 'Berhasil menghapus gambar', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/:kode', async (req, res) => {
  try {
    const { kode } = req.params;
    const data = await getDetailAset(kode);
    response(200, data, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.patch('/:kode', uploadDetailAssetImage, async (req, res) => {
  try {
    const { kode } = req.params;
    const data = req.body;
    const detailAset = await editDetailAset(kode, data);
    response(200, detailAset, 'Berhasil merubah data', res);
  } catch (error) {
    console.error('Error in updateDetailAset:', error);
    responseError(400, error.message, res);
  }
});

router.delete('/:kode', async (req, res) => {
  try {
    const { kode } = req.params;
    await deleteDetailAset(kode);
    response(200, null, 'Berhasil menghapus data', res);
  } catch (error) {
    responseError(400, error.message, res);
  }
});

router.post('/:kode/archive', async (req, res) => {
  try {
    const { kode } = req.params;
    const { keterangan, action } = req.body;

    let detailAset;
    if (action === 'unarchive') {
      detailAset = await unarchiveAsset(kode, keterangan);
    } else {
      detailAset = await archiveAsset(kode, keterangan);
    }

    response(200, detailAset, 'Berhasil memperbarui status aset', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
