const prisma = require("../config/prisma");
const { slugify } = require("../utilities/slugify");

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
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: { author: true, comments: true },
    });

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const slug = slugify(title);

    // Check if slug already exists
    const exist = await prisma.post.findUnique({ where: { slug } });

    if (exist)
      return res.status(403).json({
        success: false,
        message: "A post with this title already exists.",
      });

    await prisma.post.create({
      data: { title, slug, body, authorId: req.user.sub },
    });

    res.json({ success: true, message: "Post has been created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const slug = slugify(title);

    // Check if the post actually exists
    const exist = await prisma.post.findUnique({
      where: { slug: req.params.slug },
    });

    if (!exist)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found!" });

    // Check if the title has changed, if it does check if already exists
    if (slug !== req.params.slug) {
      const conflict = await prisma.post.findUnique({ where: { slug } });
      if (conflict)
        return res
          .status(403)
          .json({ success: false, message: "Title already exists." });
    }

    const post = await prisma.post.update({
      data: {
        title,
        slug,
        body,
      },
      where: { slug: req.params.slug },
    });

    res.json({ success: true, message: "Update successfully!", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const exist = await prisma.post.findUnique({
      where: { slug: req.params.slug },
    });

    if (!exist)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });

    await prisma.post.delete({ where: { slug: req.params.slug } });

    res.json({ success: true, message: "Deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
