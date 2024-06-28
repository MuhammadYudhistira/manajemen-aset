const express = require("express");
const { response } = require("../response/response");
const { getUser, getDetailUser, createUser } = require("./user.service");
const { responseError } = require("../response/responseError");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUser();
    response(200, users, "Berhasil mengambil data", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getDetailUser(id);
    response(200, user, "berhasil mengambil data user", res);
  } catch (error) {
    responseError(404, error.message, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const user = await createUser(data);
    response(200, user, "Berhasil menambahkan data user", res);
  } catch (error) {
    responseError(500, error.message, res);
  }
});

module.exports = router;
