const express = require("express");
const { login } = require("./auth.service");
const { response } = require("../response/response");
const { authMiddleware } = require("../middleware/authMiddleware");
const { responseError } = require("../response/responseError");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const request = req.body;
    const data = await login(request);
    response(200, data, "Berhasil Login", res);
  } catch (error) {
    console.log(error)
    responseError(400, error.message, res);
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    response(200, user, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(401, "Unauthorized", res);
  }
});

module.exports = router;
