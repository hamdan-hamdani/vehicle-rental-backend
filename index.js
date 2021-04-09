require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("This is api for Vehicle Rental Apps");
});
