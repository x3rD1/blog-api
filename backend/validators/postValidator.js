const { body } = require("express-validator");

exports.validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3, max: 60 })
    .withMessage("Title must be between 3 and 60 characters long."),

  body("body")
    .notEmpty()
    .withMessage("Blog requires a body")
    .custom((value) => {
      const textOnly = value.replace(/<[^>]*>/g, "").trim();

      if (!textOnly) {
        throw new Error("Blog content cannot be empty.");
      }

      const forbiddenTags = ["script", "iframe", "style"];
      for (const tag of forbiddenTags) {
        if (new RegExp(`<${tag}[^>]*>`, "i").test(value)) {
          throw new Error(`The <${tag}> tag is not allowed.`);
        }
      }

      return true;
    }),
  ,
];
