const express = require("express");
const { login } = require("./auth.service");
const { response } = require("../response/response");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const request = req.body;
    const data = await login(request);
    response(200, data, "Berhasil Login", res);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
