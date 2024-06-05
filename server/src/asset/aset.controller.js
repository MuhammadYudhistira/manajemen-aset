const express = require("express");

const {
  getAllAssets,
  getAssetByid,
  createAsset,
  deleteAssetById,
  editAsetById,
} = require("./aset.service");
const {
  getDetailAsets,
  getListDetailAset,
  getDetailDetailAset,
} = require("../detail_aset/detail_aset.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listAssets = await getAllAssets();
    res.json(listAssets);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const asset = await getAssetByid(id);
    res.json(asset);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      error: true,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAssetData = req.body;
    const asset = await createAsset(newAssetData);
    res.status(200).json({
      data: `Asset dengan nama ${asset.nama_barang} berhasil di tambahkan`,
      message: "Sukses",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAssetById(id);
    res.status(200).json({
      data: "Aset berhasil dihapus",
      message: "sukses",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newAssetData = req.body;
    await editAsetById(id, newAssetData);
    res.status(200).json({
      message: `Data aset berhasil di update`,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

router.get("/:id/detail-aset", getListDetailAset);
router.get("/:id/detail-aset/:idDetail", getDetailDetailAset);

module.exports = router;
