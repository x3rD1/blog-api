require("dotenv").config();
const {
  createAccessToken,
  createRefreshToken,
} = require("../utilities/createToken");
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
      tokenVersion: user.tokenVersion,
    };

    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload.sub);

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      path: "/auth/token/refresh",
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
    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "username or email already exists." });
    }

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
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.jid;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No refresh token." });

  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    res.status(403).json({ success: false, message: "Invalid refresh token." });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found." });

  const userPayload = {
    sub: user.id,
    email: user.email,
    admin: user.admin,
  };

  const accessToken = createAccessToken(userPayload);
  const refreshToken = createRefreshToken(userPayload.sub);

  res.cookie("jid", refreshToken, {
    httpOnly: true,
    path: "/auth/token/refresh",
  });

  res.json({ success: true, accessToken });
};

exports.logout = async (req, res) => {
  await prisma.user.update({
    data: { tokenVersion: { increment: 1 } },
    where: { id: req.user.sub },
  });

  res.clearCookie("jid", { path: "/auth/token/refresh" });
  res.json({ success: true, message: "Logged out successfully!" });
};
