const exporess = require('express');
const { getListDP, getDetailDP } = require('./dp.service');
const { response } = require('../response/response');
const { responseError } = require('../response/responseError');

const router = exporess.Router();

router.get('/', async (req, res) => {
  try {
    const data = await getListDP();
    response(200, data, 'Berhasil mengambil data', res);
  } catch (error) {
    console.log(error);
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

module.exports = router;
