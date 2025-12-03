const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to blog api");
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log("App is listening on PORT 3000");
});
