const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
const morgan = require("morgan");
const models = require("../models");
const app = express();
const port = process.env.PORT || 8000;

var todos = [
  "Develop next FaceBook",
  "Profit",
  "Continue profiting until billionaire",
  "Train in all martial arts",
  "Research and Develop super suit",
  "Be Batman"
];

var completed = [];

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(morgan("dev"));

app.use("/", express.static("./public"));

//ROUTES
app.listen(port, function() {
  console.log("server up on ", port);
});

app.get("/", function(req, res) {
  models.todos
    .findAll()
    .then(function(foundTodo) {
      res.send(foundTodo);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });

  res.render("index", { todos: todos });
});

app.post("/", function(req, res) {
  todos.push(req.body.searchInput);

  var todoItem = req.body;

  var todo = models.todos.build(todoItem);

  todo
    .save()
    .then(function(savedTodo) {
      res.send(savedTodo);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });

  res.redirect("/");
});

function removeTodo(e) {
  alert("ALERT");
  console.log(event.target);
}
