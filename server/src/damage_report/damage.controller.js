const express = require("express");
const {
  getAllDamage,
  getDetailDamage,
  createDemage,
  deleteDamage,
  editDamage,
  getDamageByIdUser,
  acceptDamage,
  rejectDamage,
} = require("./damage.service");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");
const { uploadImage } = require("../middleware/uploadGambar");

const router = express.Router();

const uploadDamageImage = uploadImage(
  "damage-image", // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ["image/png", "image/jpg", "image/jpeg", "image/webp"] //jenis file yang diterima
);

router.get("/", async (req, res) => {
  const data = await getAllDamage();
  response(200, data, "Berhasil mendapatkan data laporan kerusakan", res);
});

router.get("/user", async (req, res) => {
  try {
    const user = req.user;
    const damages = await getDamageByIdUser(user.id);
    response(200, damages, "Berhasil mendapatkan data", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetailDamage(id);
    response(200, data, "Berhasil mendapatkan data", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const accept = await acceptDamage(id, user);
    response(200, accept, "Berhasil Menyetujui laporan", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const { keterangan } = req.body;
    const reject = await rejectDamage(id, keterangan);
    response(200, reject, "Berhasil menolak laporan", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/", uploadDamageImage, async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;
    data.id_user = user.id;
    const damage = await createDemage(data);
    response(200, damage, "Berhasil menambahkan laporan kerusakan", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch("/:id", uploadDamageImage, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const damage = await editDamage(id, data);
    response(200, damage, "Berhasil mengupdate data laporan kerusakan", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDamage(id);
    response(200, null, "Berhasil menghapus data laporan kerusakan", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

module.exports = router;
