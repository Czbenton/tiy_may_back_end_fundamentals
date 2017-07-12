//DATABASE NAME FOR THIS PROJECT = tweeter
//sequelize init
//brew services list (need postgres running)
//sequelize model:create --name user --attributes "name:string"
//sequelize db:migrate

const express = require("express");
const app = express();
const port = process.env.port || 8000;
const models = require("./models");

// var newUser = models.user.build({
//   name: "zach",
//   bio: "because i'm batman"
// });

// newUser.save().then(function(savedUser) {
//   console.log("SAVED USER", savedUser);
// });

// var newPost = models.post.build({
//   body: "this is my second 2nd post",
//   authorId: 2
// });

// newPost.save().then(function(savedPost) {
//   console.log(savedPost);
// });

// var newComment = models.comment.build({
//   comment: "this is my second comment",
//   postId: 2,
//   authorId: 2
// });

// newComment.save().then(function(savedPost) {
//   console.log(savedPost);
// });

//ROUTES
app.listen(port, function() {
  console.log("server is running on", port);
});

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
