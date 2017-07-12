const express = require("express");
const app = express();
const port = 3000;

const mustacheExpress = require("mustache-express");

var wordList = ["abc", "zach", "is", "batman", "....", "maybe"];

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.listen(port, function() {
  console.log("server started on", port);
});

app.get("/", function(req, res) {
  res.render("index", { userName: "Zach" });
});

app.get("/words", function(req, res) {
  res.render("other", { myList: wordList });
});
