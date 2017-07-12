const session = require("express-session");
const models = require("../models");

module.exports = function(app) {
  app.get("/login", function(req, res) {
    res.render("login", { errorMsg: req.session.errorMsg });
  });

  app.post("/login", function(req, res) {
    models.user
      .find({
        where: { userName: req.body.userName }
      })
      .then(function(foundUser) {
        checkUser(foundUser, req, res);
      });
  });
};

function checkUser(foundUser, req, res) {
  if (foundUser) {
    if (foundUser.dataValues.password === req.body.password) {
      //correct password
      req.session.user = foundUser;
      req.session.errorMsg = "";
      return res.redirect("/posts");
    } else {
      //incorrect password
      req.session.errorMsg = "Invalid username or password";
      return res.redirect("/login");
    }
  }
}
