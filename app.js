// app.js
const express = require("express");
const { executeQuery } = require("./utils/firebird");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.SERVER_PORT || 5000;

// Middleware to handle encoding
app.use((req, res, next) => {
  req.setEncoding("binary");
  res.set({ "Content-Type": "application/json; charset=windows-1253" });
  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api", require("./routes/index"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
