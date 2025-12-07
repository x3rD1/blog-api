const prisma = require("../config/prisma");

exports.getAllComments = async (req, res) => {
  try {
    const exist = await prisma.post.findUnique({
      where: { slug: req.params.slug },
    });

    if (!exist)
      return res.status(404).json({
        success: false,
        message: "The requested resource does not exist.",
      });

    const comments = await prisma.comment.findMany({
      where: { post: { slug: req.params.slug } },
      include: { author: { select: { username: true } } },
    });

    if (!comments.length)
      return res.json({
        success: true,
        message: "No comments yet\nBe the first to comment.",
        comments: [],
      });

    res.json({ success: true, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.getCommentById = async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { author: { select: { username: true } } },
    });

    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });

    res.json({ success: true, comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.createComment = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      select: { id: true },
    });

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });

    const comment = await prisma.comment.create({
      data: {
        body: req.body.comment,
        authorId: req.user.sub,
        postId: post.id,
      },
    });

    res.json({ success: true, comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id, 10);

    const exist = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true },
    });

    if (!exist)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });

    if (exist.authorId !== req.user.sub)
      return res
        .status(403)
        .json({ success: false, message: "Forbidden action!" });

    const comment = await prisma.comment.update({
      data: { body: req.body.comment },
      where: { id: commentId },
    });

    res.json({ success: true, message: "Updated successfully", comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id, 10);

    const exist = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true },
    });

    if (!exist)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });

    if (exist.authorId !== req.user.sub)
      return res
        .status(403)
        .json({ success: false, message: "Forbidden action!" });

    await prisma.comment.delete({ where: { id: commentId } });

    res.json({ success: true, message: "Deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
