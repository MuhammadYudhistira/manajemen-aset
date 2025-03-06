const exporess = require('express');
const {
  getListDP,
  getDetailDP,
  updateDetailPengadaan,
  deleteDetailPengadaan,
  unarchiveDP,
  archiveDP,
  getActiveDP,
  getSearchDetailPengadaan,
} = require('./dp.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const { uploadImage } = require('../middleware/uploadGambar');

const router = exporess.Router();

const uploadDetailAssetImage = uploadImage(
  'detailAset-image', // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'] //jenis file yang diterima
);

router.get('/', async (req, res) => {
  try {
    const data = await getListDP();
    response(200, data, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/active', async (req, res) => {
  try {
    const data = await getActiveDP();
    response(200, data, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/search', async (req, res) => {
  try {
    const { kode } = req.query;
    const data = await getSearchDetailPengadaan(kode);
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
    const data = await getDetailDP(req.params.id);
    response(200, data, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.patch('/:id', uploadDetailAssetImage, async (req, res) => {
  try {
    const data = await updateDetailPengadaan(req.params.id, req.body);
    response(200, data, 'Berhasil mengubah data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await deleteDetailPengadaan(req.params.id);
    response(200, data, 'Berhasil menghapus data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/:id/archive', async (req, res) => {
  try {
    const { id } = req.params;
    const { keterangan, action } = req.body;

    const data =
      action === 'unarchive'
        ? await unarchiveDP(id, keterangan)
        : await archiveDP(id, keterangan);

    response(200, data, 'Berhasil memperbarui status aset', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
