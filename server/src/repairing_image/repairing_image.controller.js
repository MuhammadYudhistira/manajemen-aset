const express = require("express");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");
const { uploadImage } = require("../middleware/uploadGambar");
const { createRepairingImages } = require("./repairing_image.service");

const router = express.Router();

const uploadUserImage = uploadImage(
  "laporan-perbaikan/perbaikan-images", // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ["image/png", "image/jpg", "image/jpeg", "image/webp"] //jenis file yang diterima
);

router.get("/", async (req, res) => {
  try {
    response(200, "testing", "Berhasil mengambil data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.post("/", uploadUserImage, async (req, res) => {
  try {
    const body = req.body;
    const repair = await createRepairingImages(body);
    response(200, repair, "Berhasil menambahkan data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

module.exports = router;
