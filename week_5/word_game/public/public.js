var counter = document.querySelector("#counter");
var gallows = document.querySelector(".gallowsImg");

switch (parseInt(counter.textContent)) {
  case 0:
    gallows.src = "./images/GameStartLogo_800x600.png";
    gallows.style = "height: 7rem";
    break;
  case 1:
    gallows.src = "./images/hang0.gif";
    break;
  case 2:
    gallows.src = "./images/hang1.gif";
    break;
  case 3:
    gallows.src = "./images/hang2.gif";
    break;
  case 4:
    gallows.src = "./images/hang3.gif";
    break;
  case 5:
    gallows.src = "./images/hang4.gif";
    break;
  case 6:
    gallows.src = "./images/hang5.gif";
    break;
  default:
    gallows.src = "./images/Game_Over.jpg";
    break;
}
