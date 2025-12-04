const postsRouter = require("express").Router();
const postsController = require("../controllers/postsController");
const { validatePost } = require("../validators/postValidator");
const { handleValidation } = require("../middlewares/handleValidation");
const { isAdmin } = require("../middlewares/isAdmin");
const { authenticateToken } = require("../middlewares/authenticateToken");

postsRouter.get("/", authenticateToken, postsController.getAllPosts);
postsRouter.get("/:slug", authenticateToken, postsController.getPostBySlug);

postsRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  validatePost,
  handleValidation,
  postsController.createPost
);

postsRouter.put(
  "/:slug",
  authenticateToken,
  isAdmin,
  validatePost,
  handleValidation,
  postsController.updatePost
);

postsRouter.delete(
  "/:slug",
  authenticateToken,
  isAdmin,
  postsController.deletePost
);

module.exports = postsRouter;
