const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig.js");
const entryRoutes = require("./routes/entryRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

var users = require("./users.js");

//SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    next(); //is here automatically due to the nature of middleware
  }
}

//ROUTES
app.listen(port, function() {
  console.log("Server is up on ", port);
});

app.use("/", entryRoutes);

app.use("/auth", authRoutes);

app.get("/profile", checkAuth, function(req, res) {
  res.render("profile", { user: req.session.user });
});

app.post("/users", function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.redirect("/");
  }
  var newUser = {
    username: req.body.username,
    password: req.body.password
  };

  users.push(newUser);
  console.log("users: ", users);
  return res.redirect("auth/login");
});
