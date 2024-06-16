const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const authController = require("./src/auth/auth.controller");
const asetController = require("./src/asset/aset.controller");
const ruanganController = require("./src/ruangan/ruangan.controller");
const penanggungJawabController = require("./src/custodian/custodian.controller");
const laporanKerusakanController = require("./src/damage_report/damage.controller");
const UserController = require("./src/user/user.controller");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
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
