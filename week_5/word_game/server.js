const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 8000;
const words = fs
  //word object length is 235887
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toLowerCase()
  .split("\n");

var randomWord = selectRandomWord(0, 235887);
var randomWordArray = makeRandomWordArray(randomWord);
var wrongGuessCounter = 0;
var wrongGuessList = [];
var emptyWord = randomWord.split("").map(function(letter) {
  return "_";
});
console.log("randomWord: ", randomWord);

//SET VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

//MIDDLEWARE
app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "aberrant horse gun",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 900000 }
  })
);

//ROUTES
app.listen(port, function() {
  console.log("Server is up on ", port);
});

app.get("/", function(req, res) {
  //   console.log("session::", req.session);
  res.render("index", {
    randomWord: randomWord,
    emptyWord: emptyWord,
    errorMsg: req.session.errorMsg,
    wrongGuessCounter: wrongGuessCounter,
    wrongGuessList: wrongGuessList
  });
});

app.post("/", function(req, res) {
  let userGuessObj = req.body;
  console.log("userGuess: ", userGuessObj);

  if (isUserGuessInvalid(userGuessObj, req, res)) {
    return res.redirect("/");
  }

  handleValidUserGuess(userGuessObj, req);

  if (checkForGameEnd()) {
    resetGame();
    return res.redirect("/gameover");
  }

  return res.redirect("/");
});

app.get("/gameover", function(req, res) {
  console.log("GAME OVER HERE NOW!!!");
  res.render("gameover");
});

//LOGIC
function selectRandomWord(min, max) {
  return words[Math.floor(Math.random() * (max - min + 1) + min)];
}

function makeRandomWordArray(word) {
  return word.split("");
}

function isUserGuessInvalid(userGuessObj, req, res) {
  if (userGuessObj.userGuess.length > 1) {
    req.session.errorMsg = "Invalid guess! Please enter a single letter.";
    return true;
  } else if (!isNaN(userGuessObj.userGuess)) {
    req.session.errorMsg = "Invalid guess! Please enter a single LETTER.";
    return true;
  } else {
    req.session.errorMsg = "";
    return false;
  }
}

function handleValidUserGuess(userGuessObj, req) {
  let userGuessInWord = false;
  for (var i = 0; i < randomWordArray.length; i++) {
    if (randomWordArray[i] === userGuessObj.userGuess) {
      emptyWord[i] = userGuessObj.userGuess;
      userGuessInWord = true;
    }
  }

  if (!userGuessInWord) {
    req.session.errorMsg = "Incorrect guess! Try again.";
    if (wrongGuessList.indexOf(userGuessObj.userGuess) > -1) {
      //do nothing
    } else {
      wrongGuessList.push(userGuessObj.userGuess);
      wrongGuessCounter++;
    }
  }
}

function checkForGameEnd() {
  if (wrongGuessCounter === 7) {
    return true;
  } else if (emptyWord.toString() === randomWordArray.toString()) {
    return true;
  } else return false;
}

function resetGame() {
  randomWord = selectRandomWord(0, 235887);
  randomWordArray = makeRandomWordArray(randomWord);
  emptyWord = randomWord.split("").map(function(letter) {
    return "_";
  });
  wrongGuessCounter = 0;
  wrongGuessList = [];
}
