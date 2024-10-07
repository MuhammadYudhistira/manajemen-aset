const express = require("express");
const {
  getAllDeletion,
  createDeletion,
  getDetailDetaletion,
  confirmationDeletion,
  rejectionDeletion,
} = require("./deletion.service");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAllDeletion();
    response(200, data, "Berhasil Mengambil data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDetailDetaletion(id);
    response(200, data, "Berhasil Mengambil data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const newDeletionData = req.body;
    const deletion = createDeletion(newDeletionData);
    response(200, deletion, "Berhasil menambahkan data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post("/:id/confirmation", async (req, res) => {
  try {
    const newDeletionData = req.body;
    const { id } = req.params;
    const deletion = confirmationDeletion(id, newDeletionData);
    response(200, deletion, "Berhasil Menyetujui Usulan", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post("/:id/rejection", async (req, res) => {
  try {
    const newDeletionData = req.body;
    const { id } = req.params;
    const deletion = rejectionDeletion(id, newDeletionData);
    response(200, deletion, "Berhasil Menolak Usulan", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
