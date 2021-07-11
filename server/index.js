const express = require("express");
const getEntities = require("./entities");

const app = express();
const port = 8000;

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
})
app.use(express.static("./assets"))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/entities", (req, res) => {
    res.send(getEntities());
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
