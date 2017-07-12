const express = require("express");
const bodyParser = require("body-parser");
const mustache = require("mustache-express");
const models = require("./models");
const app = express();
const port = 8000;

//TEMPLATE ENGINE
app.engine("mustache", mustache());
app.set("views", "./views");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.json());

//ROUTES
app.listen(8000, () => {
  console.log(`Server listening on port ${port}.`);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/favs", function(req, res) {
  models.favorite_songs.findAll().then(function(foundItems) {
    res.render("favorites", { favorites: foundItems });
  });
});

app.post("/favs", function(req, res) {
  let newFav = models.favorite_songs.build({
    artist: req.body.user.username,
    artwork: req.body.artwork_url,
    description: req.body.description,
    title: req.body.title,
    stream_url: req.body.stream_url
  });
  //   console.log("newFav: ", newFav);
  newFav
    .save()
    .then(function(savedFav) {
      //   console.log("savedFav: ", savedFav);
      res.send(savedFav);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

// create a fav button that posts to /favs on server, this needs an ID from the for loop inside the axios fetch
// make post route for /favs
// get the req.body data and use that to model.build into var
// var.save().then
// make a button that gets /favs
// make a get route for /favs that model.tablename.findAll().then(func{res.render})
