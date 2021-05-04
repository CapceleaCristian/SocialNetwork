require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const models = require("./models/models");
const database = require("./db");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

async function startServer() {
  try {
    await database.authenticate();
    await database.sync();
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (e) {
    throw new Error("Some server problems!");
  }
}

startServer();
