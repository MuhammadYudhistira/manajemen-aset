const express = require("express");

const {
  getAllAssets,
  getAssetByid,
  createAsset,
  deleteAssetById,
  editAsetById,
} = require("./aset.service");
const {
  getListDetailAset,
  getDetailDetailAset,
  postDetailAset,
  updateDetailAset,
  removeDetailAset,
} = require("../detail_aset/detail_aset.controller");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listAssets = await getAllAssets();
    response(200, listAssets, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const asset = await getAssetByid(id);
    response(200, asset, "Berhasil mengambil data", res)
  } catch (error) {
    responseError(404, error.message, res)
  }
});

router.post("/", async (req, res) => {
  try {
    const newAssetData = req.body;
    const asset = await createAsset(newAssetData);
    response(200, asset, "Berhasil menambahkan data", res)
  } catch (error) {
    responseError(400, error.message, res)
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAssetById(id);
    response(200, "Berhasil menghapus data", res)
  } catch (error) {
    responseError(400, error.message, res)
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newAssetData = req.body;
    await editAsetById(id, newAssetData);
    response(200, newAssetData, "Berhasil mengupdate data", res)
  } catch (error) {
    response(400, error.message, res)
  }
});

router.get("/:id/detail-aset", getListDetailAset);
router.get("/:id/detail-aset/:idDetail", getDetailDetailAset);
router.post("/:id/detail-aset", postDetailAset);
router.patch("/:id/detail-aset/:idDetail", updateDetailAset);
router.delete("/:id/detail-aset/:idDetail", removeDetailAset);

module.exports = router;
