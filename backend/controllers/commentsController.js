const prisma = require("../config/prisma");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { post: { slug: req.params.slug } },
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
