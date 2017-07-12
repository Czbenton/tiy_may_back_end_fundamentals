const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Arrowhead = require("./models/Arrowhead");
const mustache = require("mustache-express");
const app = express();
const port = process.env.PORT || 8000;
const dbURL = "mongodb://localhost:27017/moongoose";

//TEMPLATE ENGINE
app.engine("mustache", mustache());
app.set("views", "./views");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use(bodyParser.urlencoded());

app.use("/", express.static("./public"));

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("Connected to MOONGOOSE DB.");
});

app.get("/arrowheads", (req, res) => {
  Arrowhead.find()
    .then(foundArrowheads => {
      // console.log(foundArrowheads);
      res.render("index", { arrowHeads: foundArrowheads });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/arrowheads/:id", (req, res) => {
  Arrowhead.findById(req.params.id)
    .then(foundArrowhead => {
      foundArrowhead.shoot();
      res.send(foundArrowhead);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/arrowheads", (req, res) => {
  let arrowheadData = req.body;
  let newArrowhead = new Arrowhead();

  newArrowhead.tribe = req.body.tribe;
  newArrowhead.shape = req.body.shape;
  newArrowhead.material = req.body.material;
  newArrowhead.size = req.body.size;
  newArrowhead.sizeUnit = req.body.sizeUnit;
  newArrowhead.color = req.body.color;
  newArrowhead.age = req.body.age;
  newArrowhead.value = req.body.value;
  newArrowhead.currency = req.body.currency;
  newArrowhead.foundLocation.country = req.body.country;
  newArrowhead.foundLocation.region = req.body.region;
  newArrowhead.foundLocation.state_province = req.body.state_province;
  newArrowhead.foundLocation.city = req.body.city;
  newArrowhead.foundLocation.address = req.body.address;
  newArrowhead.foundLocation.otherData = req.body.otherData;
  newArrowhead.finders = req.body.finders;
  newArrowhead.yearFound = req.body.yearFound;

  // console.log("newArrowhead: ", newArrowhead);
  newArrowhead
    .save()
    .then(savedArrowhead => {
      res.send(savedArrowhead);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/arrowheads/:id", (req, res) => {
  Arrowhead.updateOne({ _id: req.params.id }, req.body)
    .then(updatedArrowhead => {
      res.send(updatedArrowhead);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/arrowheads/:id", (req, res) => {
  Arrowhead.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("Deleted record");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
