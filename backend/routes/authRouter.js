const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.login);

authRouter.get("/signup", authController.getSignupPage);
authRouter.post("/signup", authController.signup);
module.exports = authRouter;
