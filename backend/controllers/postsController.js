const prisma = require("../config/prisma");
const slugify = require("../utilities/slugify");

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

    if (!post) return res.status(404);

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

    await prisma.post.create({
      data: { title, slug, body, authorId: req.user.id },
    });

    res.json({ success: true, message: "Post has been created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
