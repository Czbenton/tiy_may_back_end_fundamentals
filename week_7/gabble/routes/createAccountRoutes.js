const models = require("../models");
const session = require("express-session");

module.exports = function(app) {
  app.get("/createAccount", function(req, res) {
    console.log("CREATE ACCOUNT GET");
    res.render("createAcct", { error_msg: req.session.error_msg });
  });

  app.post("/createAccount", function(req, res) {
    //validate user input / check username not already taken
    // create user in session and db

    var newUser = models.user.build({
      userName: req.body.userName,
      fistName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });

    newUser
      .save()
      .then(function(savedUser) {
        console.log("SAVED USER", savedUser);
        return res.redirect("/login");
      })
      .catch(function(err) {
        req.session.error_msg =
          "That username is already taken. Please enter a new one.";
        console.warn("ERROR:::", err);
        return res.redirect("/createAccount");
      });
  });
};
