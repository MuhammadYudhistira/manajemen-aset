const express = require("express");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");
const {
  dashboardAdmin,
  dashboardHead,
  dashboardSekwan,
} = require("./dashboard.service");

const router = express.Router();

router.get("/admin", async (req, res) => {
  try {
    const data = await dashboardAdmin();
    response(200, data, "Berhasil mendapatkan data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get("/head", async (req, res) => {
  try {
    const data = await dashboardHead();
    response(200, data, "Berhasil mendapatkan data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get("/sekwan", async (req, res) => {
  try {
    const data = await dashboardSekwan();
    response(200, data, "Berhasil mendapatkan data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
