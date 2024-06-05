const express = require("express");

const {
  getAllRuangan,
  getRuanganById,
  createRuangan,
  editRuangan,
  deleteRuangan,
} = require("./ruangan.service");

const response = require("../response/response");
const responseError = require("../response/responseError");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listRuangan = await getAllRuangan();
    response(200, listRuangan, "Berhasil mengambil data", res)
  } catch (error) {
    responseError(500, error.message, res)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ruangan = await getRuanganById(id);
    response(200, ruangan, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const newRuanganData = req.body;
    const ruangan = await createRuangan(newRuanganData);
    response(200, ruangan, "Berhasil menambah data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRuanganData = req.body;
    const ruangan = await editRuangan(id, newRuanganData);
    response(200, ruangan, "Berhasil mengupdate data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteRuangan(id);
    response(200, null, "Berhasil menghapus data", res);
  } catch (error) {
    responseError(404, error.message, res)
  }
});

module.exports = router;
