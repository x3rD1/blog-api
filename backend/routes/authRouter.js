const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const { validateSignup } = require("../validators/signupValidator");
const { handleValidation } = require("../middlewares/handleValidation");
const { authenticateToken } = require("../middlewares/authenticateToken");

authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authenticateToken, authController.logout);
authRouter.post("/token/refresh", authController.refreshToken);

authRouter.get("/signup", authController.getSignupPage);
authRouter.post(
  "/signup",
  validateSignup,
  handleValidation,
  authController.signup
);

module.exports = authRouter;
