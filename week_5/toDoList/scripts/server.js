const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
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
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

//ROUTES
app.listen(port, function() {
  console.log("server up on ", port);
});

app.use("/", express.static("./public"));

app.get("/", function(req, res) {
  res.render("index", { todos: todos });
});

app.post("/", function(req, res) {
  todos.push(req.body.searchInput);
  res.redirect("/");
});

function removeTodo(e) {
  alert("ALERT");
  console.log(event.target);
}
