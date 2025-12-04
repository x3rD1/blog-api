exports.isAdmin = (req, res, next) => {
  if (!req.user.admin)
    return res.status(403).json({
      success: false,
      message: "You are not authorized to view this page",
    });

  next();
};
