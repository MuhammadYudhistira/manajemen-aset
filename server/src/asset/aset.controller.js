const express = require("express");

const { getAllAssets, getAssetByid } = require("./aset.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const listAssets = await getAllAssets();
  res.json(listAssets);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const asset = await getAssetByid(id);
  res.json(asset);
});

module.exports = router;
