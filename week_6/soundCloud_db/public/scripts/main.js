// https://developers.soundcloud.com/docs/api/reference#users
// 123333 - stray-hound
// URL for an artist http://api.soundcloud.com/users/stray-hound/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f
// URL for an artist's tracks http://api.soundcloud.com/users/52955/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f

// STREAM URL https://api.soundcloud.com/tracks/3037033/stream

const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
const URL_BASE = "http://api.soundcloud.com/users/";

var mainDiv = document.querySelector(".main");
var searchInput;
var userUR;
var userObj;
var userID;
var userTracksObj;
var musicPlayer = document.querySelector("audio");
var searchBtn = document.querySelector("#submit");
var searchInput = document.querySelector("#input");

searchBtn.addEventListener("click", function(e) {
  getSearchInput();
  executeUserSearch(userURL);
});

searchInput.addEventListener("keypress", function(e) {
  if (e.which == 13) {
    getSearchInput();
    executeUserSearch(userURL);
  }
});

function getSearchInput() {
  event.preventDefault();
  var input = document.querySelector(".search");
  searchInput = input.value;
  userURL = URL_BASE + searchInput + API_KEY;
  input.value = "";
}

function executeUserSearch(url) {
  axios
    .get(url)
    .then(function(response) {
      userID = response.data.id;
      executeTrackSearchFromUserID(userID);
    })
    .catch(function(error) {
      console.log("ERROR: ", error);
      var errorMsg = document.createElement("p");
      errorMsg.classList.add("errorMsg");
      errorMsg.innerHTML =
        "I'm sorry, no results were found for '" +
        searchInput +
        "'. Please try again.";
      mainDiv.appendChild(errorMsg);
    });
}

function executeTrackSearchFromUserID(id) {
  let trackSearchURL = URL_BASE + id + "/tracks" + API_KEY;
  axios.get(trackSearchURL).then(function(response) {
    userTracksObj = response.data;
    console.log("userTracksObj: ", userTracksObj);

    if (userTracksObj.length < 1) {
      clearHTML();
      var errorMsg = document.createElement("p");
      errorMsg.classList.add("errorMsg");
      errorMsg.innerHTML =
        "I'm sorry, '" + searchInput + "' has no tracks to display.";
      mainDiv.appendChild(errorMsg);
    } else populateHTML(4); //number to display per row
  });
}

function populateHTML(row_limit) {
  clearHTML();
  let currentIndex = 0;
  let counter = userTracksObj.length / row_limit;

  //do this as many times as i need to finish object
  for (var i = 0; i < counter; i++) {
    let newColumnContainer = document.createElement("div");
    newColumnContainer.classList.add("columns");

    for (var k = 0; k < row_limit; k++) {
      var newColumn = document.createElement("div");

      updateColumn(newColumn, currentIndex);

      newColumnContainer.appendChild(newColumn);

      if (currentIndex < userTracksObj.length - 1) {
        currentIndex++;
      } else break;
    }
    mainDiv.appendChild(newColumnContainer);
  }
}

function updateColumn(newColumn, currentIndex) {
  newColumn.classList.add("column");

  let trackObj = userTracksObj[currentIndex];
  let artworkURL = trackObj.artwork_url;
  let title = trackObj.title;
  let description = trackObj.description;
  let artist = trackObj.user.username;

  let img = document.createElement("img");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let div4 = document.createElement("div");
  let div5 = document.createElement("div");
  let playBtn = document.createElement("div");
  let favBtn = document.createElement("div");

  if (artworkURL == null) {
    img.src =
      "http://themodernape.com/wp-content/uploads/2014/09/internet-troll.jpg";
  } else img.src = artworkURL;
  playBtn.classList.add("tag");
  playBtn.classList.add("is-info");
  playBtn.innerHTML = "Play";
  favBtn.classList.add("tag");
  favBtn.classList.add("is-info");
  favBtn.classList.add("fav");
  favBtn.innerHTML = "+Fav";
  div2.innerHTML = title;
  div3.innerHTML = description;
  div4.innerHTML = artist;

  div2.appendChild(playBtn);
  div5.appendChild(favBtn);
  newColumn.appendChild(img);
  newColumn.appendChild(div2);
  newColumn.appendChild(div3);
  newColumn.appendChild(div5);
  newColumn.appendChild(div4);

  div2.addEventListener("click", function(e) {
    musicPlayer.src = trackObj.stream_url + API_KEY;
  });
  img.addEventListener("click", function(e) {
    musicPlayer.src = trackObj.stream_url + API_KEY;
  });

  div5.addEventListener("click", function(e) {
    axios.post("/favs", trackObj).then(function(ele) {
      return ele.data;
    });
  });
}

function clearHTML() {
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }
}
