const session = require("express-session");
const models = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  app.post("/", function(req, res) {
    res.redirect("/");
  });
};
