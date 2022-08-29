var winCondition = "";
var newPoint = 0;
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
  var userChoice = this.id;
  randomDrawString = randomDraw();
  //User chooses "Rock" Win Conditions
  if (userChoice === "Rock" && randomDrawString === "Paper") {
    winCondition = "You lost this round :( Choose again";
    newPoint = 2;
    $("h1").css("color", "red");
  } else if (userChoice === "Rock" && randomDrawString === "Scissors") {
    winCondition = "You won this round! Choose again";
    newPoint = 1;
    $("h1").css("color", "green");
  }
  //User chooses "Paper" Win Conditions
  else if (userChoice === "Paper" && randomDrawString === "Rock") {
    winCondition = "You won this round!! Choose again";
    newPoint = 1;
    $("h1").css("color", "green");
  } else if (userChoice === "Paper" && randomDrawString === "Scissors") {
    winCondition = "You lost this round :(( Choose again";
    newPoint = 2;
    $("h1").css("color", "red");
  }
  //User chooses "Scissors" Win Conditions
  else if (userChoice === "Scissors" && randomDrawString === "Rock") {
    winCondition = "You lost this round :((( Choose again";
    newPoint = 2;
    $("h1").css("color", "red");
  } else if (userChoice === "Scissors" && randomDrawString === "Paper") {
    winCondition = "You won this round!!! Choose again";
    newPoint = 1;
    $("h1").css("color", "green");
    //User and computer choose the same condition
  } else {
    winCondition = "It's a draw :O Choose again";
    newPoint = 0;
    $("h1").css("color", "black");
  }
  $(".userChoice").text("You chose " + userChoice + "...");
  $(".computerChoice").text("The computer chose " + randomDrawString + "...");
  $("h1").text(winCondition);

  //Talleys the points and sends to gameCompletion function
  if (newPoint === 1) {
    var userResultText = $(".userResultText").text();
    var userConcatText = userResultText.concat("I");
    $(".userResultText").text(userConcatText);
    userPoint++;
    if (userPoint === 2) {
      $("h1").text("You won the entire game!");
      endGameResultScreen();
    }
  } else if (newPoint === 2) {
    //Refactored to make the talley text as one line of code with the lines above saved for reference
    $(".computerResultText").text($(".computerResultText").text().concat("I"));
    computerPoint++;
    if (computerPoint === 2) {
      $("h1").text("The computer won the entire game :(");
      endGameResultScreen();
    }
  }
});

//End Game button properties
function endGameResultScreen() {
  //Disables RPS buttons
  $(".gameButton").attr("disabled", true);
  //adds "New Game" button to results section, but a "visibility: hidden;" method could've been used in the html flow
  const talleyParent = document.getElementById("talleyParent");
  const crtChild = document.getElementById("crtChild");
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("class", "newGame btn btn-sm btn-outline-dark");
  newGameButton.innerHTML = "New Game";
  talleyParent.insertBefore(newGameButton, crtChild);
  //"New Game" button removes itself and resets the game once clicked
  $(".newGame").click(function () {
    $(".newGame").remove();
    $(".gameButton").attr("disabled", false);
    $(".userResultText").text("User Results: ");
    $(".computerResultText").text("Computer Results: ");
    $("h1")
      .text("Choose rock, paper, or scissors to start playing!")
      .css("color", "black");
    $("h2").text("");
    winCondition = "";
    newPoint = 0;
    userPoint = 0;
    computerPoint = 0;
  });
}
