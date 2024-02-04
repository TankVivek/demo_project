const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const https = require("https"); // Corrected: Changed 'http' to 'https'
const fs = require("fs");

const app = express();
mongoose.set('strictQuery', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Welcome to the application."); // Corrected: Changed 'res.render' to 'res.send'
});

const options = {
  key: fs.readFileSync("certificate/key.pem"),
  cert: fs.readFileSync("certificate/cert.pem"),
};

https.createServer(options, app).listen(3000, () => {
  console.log("Server connected on port 3000");
});
