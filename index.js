var winCondition = "";
var newPoint = "";
var userPoint = 0;
var computerPoint = 0;

//Generate random number between 1-3 and assign that number as RPS to be returned
function randomDraw() {
  var computerChoiceString = "";
  var computerChoice = Math.ceil(Math.random() * 3);
  if (computerChoice === 1) {
    computerChoiceString = "Rock";
  } else if (computerChoice === 2) {
    computerChoiceString = "Paper";
  } else {
    computerChoiceString = "Scissors";
  }
  return computerChoiceString;
}

$("button").click(function () {
  document
    .getElementById("talleyParent")
    .setAttribute("style", "visibility: visible");
  var userChoice = this.id;
  randomDrawString = randomDraw();
  //User Loses Conditions
  if (
    (userChoice === "Rock" && randomDrawString === "Paper") ||
    (userChoice === "Paper" && randomDrawString === "Scissors") ||
    (userChoice === "Scissors" && randomDrawString === "Rock")
  ) {
    winCondition =
      randomDrawString +
      " beats " +
      userChoice.toLowerCase() +
      " :( Choose again";
    newPoint = "Computer Point";
    $(".game-status-text").css("color", "red");
    //User Wins Conditions
  } else if (
    (userChoice === "Rock" && randomDrawString === "Scissors") ||
    (userChoice === "Paper" && randomDrawString === "Rock") ||
    (userChoice === "Scissors" && randomDrawString === "Paper")
  ) {
    winCondition =
      userChoice +
      " beats " +
      randomDrawString.toLowerCase() +
      "! Choose again";
    newPoint = "User Point";
    $(".game-status-text").css("color", "green");
    //Draw
  } else {
    winCondition = "It's a draw :O Choose again";
    newPoint = "";
    $(".game-status-text").css("color", "black");
  }
  $(".userChoice").text("You chose " + userChoice + "...");
  $(".computerChoice").text("The computer chose " + randomDrawString + "...");
  $(".game-status-text").text(winCondition);
  var winConditionSlice = winCondition.slice(0, winCondition.length - 12);

  //Talleys the points and sends to endGameResultScreen function
  if (newPoint === "User Point") {
    $(".userResultText").text($(".userResultText").text().concat("I"));
    userPoint++;
    if (userPoint === 2) {
      $(".game-status-text").text(
        winConditionSlice + "You won the entire game!"
      );
      endGameResultScreen();
    }
  } else if (newPoint === "Computer Point") {
    $(".computerResultText").text($(".computerResultText").text().concat("I"));
    computerPoint++;
    if (computerPoint === 2) {
      $(".game-status-text").text(
        winConditionSlice + "The computer won the entire game :("
      );
      endGameResultScreen();
    }
  }
});

//End Game button properties
function endGameResultScreen() {
  // End Screen animation trigger
  $(".game-status-text").addClass("end-animation");
  //Disables RPS buttons
  $(".gameButton").attr("disabled", true);
  //adds "New Game" button to results section to demonstrate DOM manipulation, but a "visibility: hidden;" method could've been used in the html flow
  const talleyParent = document.getElementById("talleyParent");
  const crtChild = document.getElementById("crtChild");
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("class", "newGame btn btn-sm btn-outline-dark");
  newGameButton.innerHTML = "New Game";
  talleyParent.insertBefore(newGameButton, crtChild);

  //"New Game" button removes itself and resets the game once clicked
  $(".newGame").click(function () {
    $(".game-status-text").removeClass("end-animation");
    document
      .getElementById("talleyParent")
      .setAttribute("style", "visibility: hidden");
    $(".newGame").remove();
    $(".gameButton").attr("disabled", false);
    $(".userResultText").text("User Results: ");
    $(".computerResultText").text("Computer Results: ");
    $(".game-status-text")
      .text("Choose rock, paper, or scissors to start playing!")
      .css("color", "black");
    $(".userChoice, .computerChoice").text("");
    winCondition = "";
    newPoint = 0;
    userPoint = 0;
    computerPoint = 0;
  });
}
