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
    res.json(listRuangan);
  } catch (error) {
    res.status(500).json(error.message);
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
    res.status(200).json(ruangan);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRuanganData = req.body;
    const ruangan = await editRuangan(id, newRuanganData);
    res.status(200).json(ruangan);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteRuangan(id);
    res.status(200).json({
      message: "Data ruangan berhasil dihapus",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

module.exports = router;
