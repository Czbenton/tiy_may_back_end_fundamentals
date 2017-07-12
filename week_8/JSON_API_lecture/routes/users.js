var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/:userId", function(req, res) {
  console.log(req.params.userId);
  res.send(req.params.userId);
});

module.exports = router;
