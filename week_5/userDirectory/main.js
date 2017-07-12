//most of this page is boiler plate
const express = require("express");
const app = express();
const port = 3000;

const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

app.listen(port, function() {
  console.log("server started on", port);
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index", { userList: userList });
});

app.get("/details/:id", function(req, res) {
  var id = req.params.id;
  res.render("details", { userList: userList[id] });
});

var dataFile = require("./data.js");
var userList = dataFile.users;
