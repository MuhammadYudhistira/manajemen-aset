const express = require("express");

const { response } = require("../response/response");
const { responseError } = require("../response/responseError");
const { uploadImage } = require("../middleware/uploadGambar");
const {
  getAllRepairs,
  getDetailRepair,
  createRepair,
  deleteRepair,
  editRepair,
  acceptRepair,
  rejectRepair,
} = require("./repair.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const repairs = await getAllRepairs();
    response(200, repairs, "Berhasil mendapatkan data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await getDetailRepair(id);
    response(200, repair, "Berhasil mendapatkan data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.post("/:id/accept", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const accept = await acceptRepair(id, user);
    response(200, accept, "Berhasil Menyetujui laporan", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const { keterangan } = req.body;
    const reject = await rejectRepair(id, keterangan);
    response(200, reject, "Berhasil menolak laporan", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const request = req.body;
    const repair = await createRepair(request);
    response(200, repair, "Berhasil menambahkan data", res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRepair(id);
    response(200, null, "Berhasil menghapus data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const repair = await editRepair(id, body);
    response(200, repair, "Berhasil mengedit data", res);
  } catch (error) {
    console.log(error);
    responseError(500, error.message, res);
  }
});

module.exports = router;
