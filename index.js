var newPoint = '';
var userPoint = 0;
var computerPoint = 0;
const computerChoiceString = ['Rock', 'Paper', 'Scissors'];

//Generate random array index from 'computerChoiceString' and return that value
function randomDraw() {
  return computerChoiceString[Math.floor(Math.random() * 3)];
}

$('button').click(function () {
  document
    .getElementById('talleyParent')
    .setAttribute('style', 'visibility: visible');
  var userChoice = this.id;
  var randomDrawString = randomDraw();

  // maps each possible choice to the choice that beats it
  const outcomes = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper',
  };

  // win condition logic based on 'outcomes' object
  const result =
    userChoice === randomDrawString
      ? "It's a draw :O Choose again"
      : outcomes[userChoice] === randomDrawString
      ? `${userChoice} beats ${randomDrawString.toLowerCase()}! Choose again`
      : `${randomDrawString} beats ${userChoice.toLowerCase()} :( Choose again`;

  // adds point to either user or computer
  const newPoint =
    userChoice === randomDrawString
      ? ''
      : outcomes[userChoice] === randomDrawString
      ? 'User Point'
      : 'Computer Point';

  //updates win condition text color
  $('.game-status-text').css(
    'color',
    userChoice === randomDrawString
      ? 'black'
      : outcomes[userChoice] === randomDrawString
      ? 'green'
      : 'red'
  );

  $('.userChoice').text(`You chose ${userChoice}...`);
  $('.computerChoice').text(`The computer chose ${randomDrawString}...`);
  $('.game-status-text').text(result);
  var winConditionSlice = result.slice(0, result.length - 12);
  tallyPoints(newPoint, winConditionSlice);
});

function tallyPoints(newPoint, winConditionSlice) {
  //Talleys the points and sends to endGameResultScreen function
  if (newPoint === 'User Point') {
    $('.userResultText').text($('.userResultText').text().concat('I'));
    userPoint++;
  } else if (newPoint === 'Computer Point') {
    $('.computerResultText').text($('.computerResultText').text().concat('I'));
    computerPoint++;
  }

  if (userPoint === 2) {
    $('.game-status-text').text(
      `${winConditionSlice} You won the entire game!`
    );
    endGameResultScreen();
  } else if (computerPoint === 2) {
    $('.game-status-text').text(
      `${winConditionSlice} The computer won the entire game :(`
    );
    endGameResultScreen();
  }
}

//End Game button properties
function endGameResultScreen() {
  // End Screen animation trigger
  $('.game-status-text').addClass('end-animation');

  //Disables RPS buttons
  $('.gameButton').attr('disabled', true);

  //adds "New Game" button to results section to demonstrate DOM manipulation, but a "visibility: hidden;" method could've been used in the html flow
  const talleyParent = document.getElementById('talleyParent');
  const crtChild = document.getElementById('crtChild');
  const newGameButton = document.createElement('button');
  newGameButton.setAttribute('class', 'newGame btn btn-sm btn-outline-dark');
  newGameButton.innerHTML = 'New Game';
  talleyParent.insertBefore(newGameButton, crtChild);

  //"New Game" button removes itself and resets the game once clicked
  $('.newGame').click(() => {
    $('.game-status-text').removeClass('end-animation');
    document
      .getElementById('talleyParent')
      .setAttribute('style', 'visibility: hidden');
    $('.newGame').remove();
    $('.gameButton').attr('disabled', false);
    $('.userResultText').text('User Results: ');
    $('.computerResultText').text('Computer Results: ');
    $('.game-status-text')
      .text('Choose rock, paper, or scissors to start playing!')
      .css('color', 'black');
    $('.userChoice, .computerChoice').text('');
    newPoint = 0;
    userPoint = 0;
    computerPoint = 0;
  });
}
