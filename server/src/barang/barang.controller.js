const express = require('express');
const { getAllBarang } = require('./barang.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await getAllBarang();
    response(200, data, 'Berhasil mendapatkan data', res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
