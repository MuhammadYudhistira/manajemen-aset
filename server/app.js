const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const asetController = require("./src/asset/aset.controller");
const ruanganController = require("./src/ruangan/ruangan.controller")

dotenv.config();

const app = express();
const port = process.env.PORT;

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

app.use("/api/aset", asetController);
app.use("/api/ruangan", ruanganController)

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
