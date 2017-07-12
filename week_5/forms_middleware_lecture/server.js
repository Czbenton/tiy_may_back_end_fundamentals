const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
const app = express();
const port = process.env.PORT || 8000;

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

var users = [];

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(logger("dev"));

// ROUTES
app.use("/", express.static("./public"));

app.get("/users", function(req, res) {
  if (worked) {
    res.status(201).send(users);
  } else {
    res.status(401).send;
  }
});

app.post("/users", function(req, res) {
  req
    .checkBody(
      "name",
      "Name should be at least 3 characters long and no more than 50."
    )
    .isLength({ min: 3, max: 50 });

  req.checkBody("name", "Name should only contain alpha characters").isAlpha();
  req.checkBody("age", "Age should only be a number").isInt();
  req
    .checkBody("age", "Age should be > 15 and < 100")
    .isInt({ min: 16, max: 99 });
  var errors = req.validationErrors();
  console.log("errors: ", errors);

  if (errors) {
    return res.render("error", { errors: errors });
  } else {
    var newUser = req.body;
    console.log("newUser: ", newUser);
    users.push(newUser); // create new user record in DB
    // get back new record from DB
    res.send(newUser); // send back data
  }
  return;
});

app.listen(port, function() {
  console.log("Server is running on", port);
});
