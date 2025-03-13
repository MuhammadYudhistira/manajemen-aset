const express = require('express');
const {
  getAllDeletion,
  createDeletion,
  getDetailDetaletion,
  confirmationDeletion,
  rejectionDeletion,
  deleteDeletion,
  deleteDetailDeletion,
  updateDeletion,
} = require('./deletion.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const { uploadFiles } = require('../middleware/uploadFile');

const router = express.Router();

const fileConfigs = [
  {
    fieldName: 'bukti_penghapusan',
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ['application/pdf'],
  },
];

router.get('/', async (req, res) => {
  try {
    const data = await getAllDeletion();
    response(200, data, 'Berhasil Mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const detailDeletion = await deleteDetailDeletion(id);
    response(200, detailDeletion, 'Berhasil menghapus data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetailDetaletion(id);
    response(200, data, 'Berhasil Mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const newDeletionData = req.body;
    const deletion = await createDeletion(newDeletionData);
    response(200, deletion, 'Berhasil menambahkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newDeletionData = req.body;
    const deletion = await updateDeletion(id, newDeletionData);
    response(200, deletion, 'Berhasil menambahkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/:id/confirmation', uploadFiles(fileConfigs), async (req, res) => {
  try {
    const newDeletionData = req.body;
    newDeletionData.bukti_penghapusan = req.body.bukti_penghapusan?.[0];
    const { id } = req.params;
    const deletion = await confirmationDeletion(id, newDeletionData);
    response(200, deletion, 'Berhasil Menyetujui Usulan', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post('/:id/rejection', uploadFiles(fileConfigs), async (req, res) => {
  try {
    const newDeletionData = req.body;
    newDeletionData.bukti_penghapusan = req.body.bukti_penghapusan?.[0];
    const { id } = req.params;
    const deletion = await rejectionDeletion(id, newDeletionData);
    response(200, deletion, 'Berhasil Menolak Usulan', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletion = await deleteDeletion(id);
    response(200, deletion, 'Berhasil menghapus data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
