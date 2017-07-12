var express = require("express");
var entryRoutes = express.Router();

entryRoutes.get("/", function(req, res) {
  //   console.log("session::", req.session);
  res.render("index");
});

module.exports = entryRoutes;

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("I am a cool homepage");
  });
};
