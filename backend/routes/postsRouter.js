const postsRouter = require("express").Router();
const postsController = require("../controllers/postsController");
const { validatePost } = require("../validators/postValidator");
const { handleValidation } = require("../middlewares/handleValidation");

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:slug", postsController.getPostBySlug);

postsRouter.post(
  "/:slug",
  validatePost,
  handleValidation,
  postsController.createPost
);

module.exports = postsRouter;
