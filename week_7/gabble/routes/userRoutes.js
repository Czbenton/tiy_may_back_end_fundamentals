module.exports = function(app) {
  app.get("/users", function(req, res) {
    res.send("users");
  });

  app.post("/users", function(req, res) {
    return res.redirect("/");
  });
};
