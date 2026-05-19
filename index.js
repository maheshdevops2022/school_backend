
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./Configs/dbConfig");


const mainRoutes = require("./routes/main.routes");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api", mainRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});