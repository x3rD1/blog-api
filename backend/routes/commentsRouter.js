const commentsRouter = require("express").Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

commentsRouter.get("/", commentsController.getAllComments);

module.exports = commentsRouter;
