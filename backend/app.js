const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/authRouter");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to blog api" });
});

app.use("/auth", authRouter);

app.listen(3000, (err) => {
  if (err) throw err;

  console.log("App is listening on PORT 3000");
});
