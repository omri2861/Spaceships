const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const { Entity } = require("./schemas");

const port = 8000;
const mongoUri = "mongodb://localhost/Spaceships";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
});
app.use(express.static("./assets"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/entities", (req, res) => {
  Entity.find().then((entities) => res.send(entities));
});

app.post("/api/addElement", (req, res) => {
  console.log(req.body);
  newEntity = new Entity(req.body);
  newEntity
    .save()
    .then(() => res.send(newEntity))
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB server..."));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
