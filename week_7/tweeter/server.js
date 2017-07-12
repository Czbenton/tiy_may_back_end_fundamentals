const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const models = require("./models");

// var newComment = models.comment.build({
//   comment: "Radical Man!!",
//   postid: 3,
//   authorid: 1
// });
// newComment.save().then(function(savedPost) {
//   console.log(savedPost);
// });

app.get("/user", function(req, res) {
  models.user
    .findAll({
      include: [
        {
          model: models.post,
          as: "posts"
        }
      ]
    })
    .then(function(foundUser) {
      console.log("foundUser: ", foundUser);
      res.send(foundUser);
    });
});

app.get("/posts", function(req, res) {
  models.post
    .findAll({
      include: [
        {
          model: models.user,
          as: "author"
        },
        {
          model: models.comment,
          as: "comments"
        }
      ]
    })
    .then(function(foundPosts) {
      res.send(foundPosts);
    });
});

app.get("/comments/:id", function(req, res) {
  models.comment
    .find({
      where: { id: req.params.id },
      include: [
        {
          model: models.post,
          as: "post"
        },
        {
          model: models.user,
          as: "author"
        }
      ]
    })
    .then(function(foundComment) {
      res.send(foundComment);
    });
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`);
});
