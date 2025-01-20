const express = require('express');

const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const { uploadImage } = require('../middleware/uploadGambar');
const {
  getAllRepairs,
  getDetailRepair,
  createRepair,
  deleteRepair,
  editRepair,
  acceptRepair,
  rejectRepair,
  getAllAcceptedRepairs,
  inputLaporan,
} = require('./repair.service');
const { uploadFiles } = require('../middleware/uploadFile');

const router = express.Router();

const fileConfigs = [
  {
    fieldName: 'faktur',
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ['application/pdf'],
  },
  {
    fieldName: 'kuitansi',
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ['application/pdf'],
  },
  {
    fieldName: 'berita_acara',
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ['application/pdf'],
  },
];

router.get('/', async (req, res) => {
  try {
    const repairs = await getAllRepairs();
    response(200, repairs, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error, res);
  }
});

router.get('/accepted', async (req, res) => {
  try {
    const repairs = await getAllAcceptedRepairs();
    response(200, repairs, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await getDetailRepair(id);
    response(200, repair, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;
    data.id_requested_by = user.nip;
    const repair = await createRepair(data);
    response(200, repair, 'Berhasil menambahkan data', res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

router.post('/:id/laporan', uploadFiles(fileConfigs), async (req, res) => {
  try {
    const { id } = req.params;
    const faktur = req.body.faktur[0];
    const kuitansi = req.body.kuitansi[0];
    const berita_acara = req.body.berita_acara[0];
    const data = { faktur, kuitansi, berita_acara };
    const laporan = await inputLaporan(id, data);
    response(200, laporan, 'Berhasil menambahkan data', res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

router.post('/:id/accept', async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const accept = await acceptRepair(id, user);
    response(200, accept, 'Berhasil Menyetujui laporan', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { keterangan } = req.body;
    const reject = await rejectRepair(id, keterangan);
    response(200, reject, 'Berhasil menolak laporan', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRepair(id);
    response(200, null, 'Berhasil menghapus data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const repair = await editRepair(id, body);
    response(200, repair, 'Berhasil mengedit data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
