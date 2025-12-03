require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

exports.getLoginPage = (req, res) => {
  res.json({ message: "Welcome to login page" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(401).json({ message: "Incorrect email or password" });

    // Check if the user's password is equal to password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Incorrect email or password" });

    const payload = {
      sub: user.id,
      email: user.email,
      admin: user.admin,
    };

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.json({ message: "Authenticated", accessToken, payload });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.getSignupPage = (req, res) => {
  res.json({ message: "Welcome to signup page" });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.json({ message: "Account created successfully!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
