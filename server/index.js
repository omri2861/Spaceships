const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const { Entity } = require("./schemas");
const imageNames = require("./getImages");

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

app.post("/api/element", (req, res) => {
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

app.put("/api/element/:elementId", (req, res) => {
  Entity.findByIdAndUpdate(req.params.elementId, req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      res.status(500);
      res.send(error);
      console.log(error);
    });
});

app.delete("/api/element/:elementId", (req, res) => {
  Entity.findByIdAndDelete(req.params.elementId)
    .then(res.sendStatus(200))
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/api/imageNames", (req, res) => {
  res.send(imageNames);
});

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB server..."));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
