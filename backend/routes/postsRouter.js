const postsRouter = require("express").Router();
const postsController = require("../controllers/postsController");

postsRouter.get("/", postsController.getAllPosts);

module.exports = postsRouter;
