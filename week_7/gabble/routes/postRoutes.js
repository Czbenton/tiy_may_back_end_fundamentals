const models = require("../models");
const session = require("express-session");

module.exports = function(app) {
  app.get("/posts", function(req, res) {
    models.post.findAll().then(function(foundPosts) {
      res.render("posts", { post_messages: foundPosts });
    });
  });

  app.post("/posts", function(req, res) {
    var newPost = models.post.build({
      msg_body: req.body.msg_body,
      authorId: req.session.user.id
    });

    newPost
      .save()
      .then(function(savedPost) {
        console.log("Your post was saved!");
      })
      .catch(function(err) {
        console.warn("ERROR:::", err);
      });

    return res.redirect("/posts");
  });
};
