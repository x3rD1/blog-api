const postsRouter = require("express").Router();
const postsController = require("../controllers/postsController");

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:slug", postsController.getPostBySlug);

module.exports = postsRouter;
