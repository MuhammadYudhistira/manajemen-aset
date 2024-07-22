const express = require("express");
const { getDetailAset } = require("./detail_aset.service");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    response(200, "HALO", "Berhasil mendapatkan data", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetailAset(id);
    response(200, data, "Berhasil mendapatkan data", res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

module.exports = router;
