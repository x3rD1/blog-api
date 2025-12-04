const commentsRouter = require("express").Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:id", commentsController.getCommentById);

module.exports = commentsRouter;
