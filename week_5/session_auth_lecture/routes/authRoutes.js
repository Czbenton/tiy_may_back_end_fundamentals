const express = require("express");
const authRoutes = express.Router();

var users = require("../users.js");

authRoutes.get("/signup", function(req, res) {
  res.render("signup");
});

authRoutes.get("/login", function(req, res) {
  res.render("login");
});

authRoutes.post("/login", function(req, res) {
  if (!req.body) {
    return res.redirect("/");
  }

  var requestingUser = req.body;
  var userRecord;

  users.forEach(function(item) {
    console.log(item);
    if (item.username === requestingUser.username) {
      userRecord = item;
    }
  });

  if (!userRecord) {
    return res.redirect("/login");
  }
  if (requestingUser.password === userRecord.password) {
    req.session.user = userRecord;
    return res.redirect("/profile");
  } else {
    return res.redirect("/login");
  }
});

module.exports = authRoutes;

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("I am a cool homepage");
  });
};
