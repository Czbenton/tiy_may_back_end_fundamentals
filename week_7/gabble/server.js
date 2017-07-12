const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const mustache = require("mustache-express");
const session = require("express-session");
const sessionConfig = require("./sessionConfig.js");
const createEntryRoutes = require("./routes/entryRoutes.js");
const createAccountRoutes = require("./routes/createAccountRoutes.js");
// const createUserRoutes = require("./routes/userRoutes.js");
const createLoginRoutes = require("./routes/loginRoutes.js");
const createPostRoutes = require("./routes/postRoutes.js");

const port = process.env.port || 8000;
const app = express();

//TEMPLATE ENGINE
app.engine("mustache", mustache());
app.set("views", "./views");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded());
app.use(session(sessionConfig));

//ROUTES
app.listen(port, function(req, res) {
  console.log("server up on ", port);
});

//some of these are not needed for the final product. I just want to be able to see some data.
createEntryRoutes(app);
createAccountRoutes(app);
// createUserRoutes(app);
createLoginRoutes(app);
createPostRoutes(app);
