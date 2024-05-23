const express = require("express");

const { getAllAssets } = require("./aset.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const listAssets = await getAllAssets();
  res.json(listAssets);
});

module.exports = router;
