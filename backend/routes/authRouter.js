const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const { validateSignup } = require("../validators/signupValidator");
const { handleValidation } = require("../middlewares/handleValidation");

authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.login);

authRouter.get("/signup", authController.getSignupPage);
authRouter.post(
  "/signup",
  validateSignup,
  handleValidation,
  authController.signup
);

module.exports = authRouter;
