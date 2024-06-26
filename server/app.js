const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const authController = require("./src/auth/auth.controller");
const asetController = require("./src/asset/aset.controller");
const ruanganController = require("./src/ruangan/ruangan.controller");
const penanggungJawabController = require("./src/custodian/custodian.controller");
const laporanKerusakanController = require("./src/damage_report/damage.controller");
const UserController = require("./src/user/user.controller");
const { authMiddleware } = require("./src/middleware/authMiddleware");

const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const path = require("path");
const { UploadGambar } = require("./src/middleware/uploadGambar");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    data: "Welcome to the API",
  });
});

app.use("/api/auth", authController);
app.use("/api/aset", asetController);
app.use("/api/ruangan", ruanganController);
app.use("/api/penanggung-jawab", penanggungJawabController);
app.use("/api/laporan-kerusakan", laporanKerusakanController);
app.use("/api/user", UserController);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
