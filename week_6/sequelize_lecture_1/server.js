// IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const models = require("./models");
const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.json());
app.use(morgan("dev"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Request received!");
});

app.get("/users", function(req, res) {
  models.users
    .findAll()
    .then(function(foundUsers) {
      res.send(foundUsers);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.get("/users/:id", function(req, res) {
  models.users
    .findById(req.params.id)
    .then(function(foundUser) {
      res.send(foundUser);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.post("/users", function(req, res) {
  var userData = req.body;

  var newUser = models.users.build(userData);
  newUser
    .save()
    .then(function(savedUser) {
      res.send(savedUser);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.delete("/users/:id", function(req, res) {
  models.users
    .destroy({ where: { id: req.params.id } })
    .then(function() {
      res.send("Deleted user");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.post("/books", (req, res) => {
  var bookData = {
    title: "Langoliers",
    author: 2
  };

  var newBook = models.books.build(bookData);
  newBook.save().then(savedBook => {
    res.send(savedBook);
  });
});

app.listen(8000, () => {
  console.log(`Server listening on port ${port}.`);
});
