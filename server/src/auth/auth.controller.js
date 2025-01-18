const express = require("express");
const { login } = require("./auth.service");
const { response } = require("../response/response");
const { authMiddleware } = require("../middleware/authMiddleware");
const { responseError } = require("../response/responseError");
const { getDetailUser } = require("../user/user.service");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const request = req.body;
    const data = await login(request);
    response(200, data, "Berhasil Login", res);
  } catch (error) {
    console.log(error);
    responseError(400, error.message, res);
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const userData = await getDetailUser(user.nip);

    const {
      password,
      createdAt,
      updatedAt,
      Penanggung_Jawab,
      ...userWithoutSensitiveInfo
    } = userData;

    response(200, userWithoutSensitiveInfo, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(401, "Unauthorized", res);
  }
});

module.exports = router;
