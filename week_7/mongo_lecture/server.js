const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const app = express();
const port = process.env.port || 8000;
const db_url = "mongodb://localhost:27017/people";

app.get("/tiypeople", (req, res) => {
  mongoClient.connect(db_url, function(err, db) {
    if (err) {
      console.warn("Error connecting to database::", err);
    }

    //===find all
    db.collection("tiy").find({}).toArray(function(err, foundPeople) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(foundPeople);
    });

    //===find one
    // db.collection("tiy").findOne({}, function(err, foundPeople) {
    //   if (err) {
    //     res.status(500).send(err);
    //   }
    //   res.send(foundPeople);
    //   db.close();
    // });
  });
});

app.get("/tiypeople/:id", (req, res) => {
  mongoClient.connect(db_url, function(err, db) {
    if (err) {
      res.status(500).send(err);
    }
    db
      .collection("tiy")
      .findOne({ _id: ObjectID(req.params.id) }, function(err, foundPerson) {
        if (err) {
          res.status(500).send(err);
        }
        res.send(foundPerson);
        db.close();
      });
  });
});

app.listen(port, () => {
  console.log("server up on port", port);
});
