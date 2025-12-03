const prisma = require("../config/prisma");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { AND: [{ publish: true }, { author: { admin: true } }] },
    });

    if (!posts.length)
      return res.json({ success: true, message: "No posts available." });

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
