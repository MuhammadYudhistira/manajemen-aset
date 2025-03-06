const express = require('express');
const router = express.Router();

const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const {
  listPengajuan,
  detailPengajuan,
  createPengajuan,
  cancelledPengajuan,
  listPengajuanByUser,
  listAcceptedPengajuan,
  reviewPengajuan,
} = require('./pengajuan.service');

router.get('/', async (req, res) => {
  try {
    const pengajuan = await listPengajuan();
    response(200, pengajuan, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/accepted', async (req, res) => {
  try {
    const pengajuan = await listAcceptedPengajuan();
    response(200, pengajuan, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/user', async (req, res) => {
  try {
    const nip = req.user.nip;
    const pengajuan = await listPengajuanByUser(nip);
    response(200, pengajuan, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/:no', async (req, res) => {
  try {
    const pengajuan = await detailPengajuan(req.params.no);
    response(200, pengajuan, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const today = new Date();
    data.tanggal_pengajuan = today;
    data.nip_pengusul = req.user.nip;
    const pengajuan = await createPengajuan(data);
    response(200, pengajuan, 'Berhasil menambahkan data', res);
  } catch (error) {
    console.log(error);
    if (error.message === 'Nomor pengajuan sudah ada') {
      responseError(400, error.message, res);
    }
    responseError(500, error.message, res);
  }
});

router.post('/:no/cancel', async (req, res) => {
  try {
    await cancelledPengajuan(req.params.no);
    response(200, null, 'Berhasil membatalkan pengajuan', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.post('/:no/approve', async (req, res) => {
  try {
    const body = req.body;
    body.status = 'Approved';
    const pengajuan = await reviewPengajuan(req.params.no, body);
    response(200, pengajuan, 'Berhasil membatalkan pengajuan', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.post('/:no/reject', async (req, res) => {
  try {
    const body = req.body;
    body.status = 'Rejected';
    const pengajuan = await reviewPengajuan(req.params.no, body);
    response(200, pengajuan, 'Berhasil membatalkan pengajuan', res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

module.exports = router;
