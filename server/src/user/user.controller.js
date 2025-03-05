const express = require('express');
const { response } = require('../response/response');
const {
  getUser,
  getDetailUser,
  createUser,
  deleteUser,
  editUser,
  countUserStats,
  getPj,
  getStaff,
} = require('./user.service');
const { responseError } = require('../response/responseError');
const { uploadImage } = require('../middleware/uploadGambar');

const router = express.Router();

const uploadUserImage = uploadImage(
  'user-image', // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'] //jenis file yang diterima
);

router.get('/', async (req, res) => {
  try {
    const users = await getUser();
    const countUser = await countUserStats();
    const data = {
      count: countUser,
      users,
    };
    response(200, data, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/staff', async (req, res) => {
  try {
    const user = await getStaff();
    response(200, user, 'berhasil mengambil data staff', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get('/pj', async (req, res) => {
  try {
    const user = await getPj();
    response(200, user, 'berhasil mengambil data user', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.get('/:nip', async (req, res) => {
  try {
    const { nip } = req.params;
    const user = await getDetailUser(nip);
    response(200, user, 'berhasil mengambil data user', res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post('/', uploadUserImage, async (req, res) => {
  try {
    const data = req.body;
    const user = await createUser(data);
    response(200, user, 'Berhasil menambahkan data user', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete('/:nip', async (req, res) => {
  try {
    const { nip } = req.params;
    await deleteUser(nip);
    response(200, null, 'Berhasil menghapus Data user', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch('/:nip', uploadUserImage, async (req, res) => {
  try {
    const { nip } = req.params;
    const data = req.body;
    const user = await editUser(nip, data);
    response(200, user, 'Berhasil mengupdata Data', res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

module.exports = router;
