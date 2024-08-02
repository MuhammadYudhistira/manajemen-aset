const express = require("express");
const { response } = require("../response/response");
const {
  getUser,
  getDetailUser,
  createUser,
  deleteUser,
  editUser,
} = require("./user.service");
const { responseError } = require("../response/responseError");
const { uploadImage } = require("../middleware/uploadGambar");

const router = express.Router();

const uploadUserImage = uploadImage(
  "user-image", // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ["image/png", "image/jpg", "image/jpeg", "image/webp"] //jenis file yang diterima
);

router.get("/", async (req, res) => {
  try {
    const users = await getUser();
    response(200, users, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getDetailUser(id);
    response(200, user, "berhasil mengambil data user", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/", uploadUserImage, async (req, res) => {
  try {
    const data = req.body;
    const user = await createUser(data);
    response(200, user, "Berhasil menambahkan data user", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    response(200, null, "Berhasil menghapus Data user", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch("/:id", uploadUserImage, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await editUser(id, data);
    response(200, user, "Berhasil mengupdata Data", res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

module.exports = router;
