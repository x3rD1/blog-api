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
