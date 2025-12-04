const commentsRouter = require("express").Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");
const { authenticateToken } = require("../middlewares/authenticateToken");

commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:id", commentsController.getCommentById);

commentsRouter.post("/", authenticateToken, commentsController.createComment);
commentsRouter.put("/:id", authenticateToken, commentsController.updateComment);

module.exports = commentsRouter;
