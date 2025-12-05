const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to blog api" });
});

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log("App is listening on PORT 3000");
});
