const express = require("express");

const {
  getAllAssets,
  getAssetByid,
  createAsset,
  deleteAssetById,
  editAsetById,
  countAset,
  getAssetByUser,
} = require("./aset.service");
const {
  getListDetailAset,
  getDetailDetailAset,
  postDetailAset,
  updateDetailAset,
  removeDetailAset,
  getAllListDetailAset,
  deleteDetailImage,
} = require("../detail_aset/detail_aset.controller");
const { response } = require("../response/response");
const { responseError } = require("../response/responseError");
const { uploadImage } = require("../middleware/uploadGambar");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

const uploadAssetImage = uploadImage(
  "aset-image", // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ["image/png", "image/jpg", "image/jpeg", "image/webp"] //jenis file yang diterima
);

const uploadDetailAssetImage = uploadImage(
  "detailAset-image", // nama folder di bucket
  1024 * 1024 * 5, // maksimal ukuran file, kalau ini brrti 5MB
  ["image/png", "image/jpg", "image/jpeg", "image/webp"] //jenis file yang diterima
);

router.get("/", async (req, res) => {
  try {
    const listAssets = await getAllAssets();
    const count = await countAset();
    const data = {
      count,
      listAssets,
    };
    response(200, data, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.get("/penanggung-jawab", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const asset = await getAssetByUser(user.id);
    response(200, asset, "Berhasil mengambil data", res);
  } catch (error) {
    console.log(error);
    responseError(404, error.message, res);
  }
});

router.get("/detail-aset", getAllListDetailAset);

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const asset = await getAssetByid(id);
    response(200, asset, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/", uploadAssetImage, async (req, res) => {
  try {
    const newAssetData = req.body;
    const asset = await createAsset(newAssetData);
    response(200, asset, "Berhasil menambahkan data", res);
  } catch (error) {
    console.log(error.message);
    responseError(400, error.message, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAssetById(id);
    response(200, null, "Berhasil menghapus data", res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

router.patch("/:id", uploadAssetImage, async (req, res) => {
  try {
    const id = req.params.id;
    const newAssetData = req.body;
    await editAsetById(id, newAssetData);
    response(200, newAssetData, "Berhasil mengupdate data", res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

router.get("/:id/detail-aset", getListDetailAset);
router.get("/:id/detail-aset/:idDetail", getDetailDetailAset);
router.post("/:id/detail-aset", uploadDetailAssetImage, postDetailAset);
router.patch(
  "/:id/detail-aset/:idDetail",
  uploadDetailAssetImage,
  updateDetailAset
);
router.delete("/:id/detail-aset/:idDetail", removeDetailAset);
router.post("/:id/detail-aset/:idDetail/image", deleteDetailImage);

module.exports = router;
