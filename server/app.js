const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

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

const asetController = require("./src/asset/aset.controller");
app.use("/api/aset", asetController);

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
