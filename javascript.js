/**
 * Created by Nick on 2/15/2017.
 */
var chosenWord;
var guessedLetters = [];
var gameBoard = [];
var missesLeft;
var wins = 0;
var losses = 0;

//Objects
var starWars = {
    category: "Star Wars",
    wordBank: ["Lightsaber", "Yoda", "Millennium Falcon", "Luke Skywalker", "Alderaan", "Princess Leia", "Han Solo", "Chewbacca", "Death Star", "X-Wing"],
    background: "starwars.png",
    trivia: "The sounds of the TIE fighters in star wars were a combo of an elephant call and a car driving on wet pavement.",
    color: "white"
};

var doctorWho = {
    category: "Doctor Who",
    wordBank: ["TARDIS", "Sonic Screwdriver", "Dalek", "Rose Tyler", "Weeping Angel", "Sontaran", "The Master", "Donna Noble", "Gallifrey", "River Song", "Vashta Nerada"],
    background: "who.png",
    trivia: "The Doctor's real name remains a complete mystery to all but a very small number of individuals.",
    color: "white"
};

var bttf = {
    category: "Back to the Future",
    wordBank: ["George McFly", "Marty McFly", "Delorean", "Flux Capacitor", "Hoverboard", "Biff Tannen", "Doc Brown", "Hill Valley", "Twin Pines Mall", "Lorraine Baines", "Principal Strickland"],
    background: "bttf.png",
    trivia: 'A studio executive suggested that the title should be changed to "Spaceman From Pluto',
    color: "black"
};

var objArray = [starWars, doctorWho, bttf];


//End of Objects/

function newGame(){
    var newObject = objArray[Math.floor(Math.random() * objArray.length)]; //chooses a random object

    gameBoard.length = 0; //resets the game board
    guessedLetters.length = 0; //resets the guessed letter array
    missesLeft = 6; //resets the miss counter

    chosenWord = newObject.wordBank[Math.floor(Math.random() * newObject.wordBank.length)]; //randomly chooses word from wordBank

    createBoard(chosenWord);
    updateScoreboard(); //updates the scoreboard
    updateGameboard(); //displays game board
    $("#category").html(newObject.category); //sets the category text
    $("#trivia").html(newObject.trivia); //updates trivia text
    $(".answer-box").css("background-image", "url(images/" + newObject.background).css("color", newObject.color);

}

function pressXToStart()
{
    $("#category").html("Press X to start!");

    document.onkeyup = function (startEvent) {
        if(startEvent.keyCode === 88){ //if user presses X key
            newGame();
            document.onkeyup = function (event) { //wait for keypress
                var userGuess = event.keyCode;  //store keypress as int
                checkUserGuess(userGuess);
            }
        }
    }
}

function createBoard(word) {

    for(i = 0; i < word.length; i++){
        var letter = word.charAt(i);
        if(letter.match(/[A-Z|a-z]/i)) //check if letter
        {
            gameBoard.push('_'); //if letter, push underscore
        }
        else{
            gameBoard.push(word.charAt(i)); //if not letter, push that character
        }
    }
}

function checkForWin() {
    if(gameBoard.indexOf("_") === -1){ //if no underscores are left in game board
        wins++;
        pressXToStart();
    }
}

function checkForLoss() {
    if(missesLeft < 1){
        losses++;
        $("#gameboard").html(chosenWord);
        pressXToStart();
    }
}

function updateScoreboard(){
    $("#winCounter").html(wins);
    $("#lossCounter").html(losses);
}

function updateGameboard() {
    $("#gameboard").html(gameBoard.join(''));
    $("#usedLetters").html(guessedLetters.join(','));
    $("#missCounter").html(missesLeft);
}


function addToGuessedLetters(letter) {
    for (i = 0; i < guessedLetters.length; i++)
    {
        if(guessedLetters[i] === letter.toUpperCase()){ //return if guessed letter is already in array
            return;
        }
    }
    guessedLetters.push(letter.toUpperCase());
}

function checkUserGuess(guess) {

    if(guess > 64 && guess < 91)
    {
        var letter = String.fromCharCode(guess);

        if(chosenWord.toLowerCase().indexOf(letter.toLowerCase()) !== -1){ //if user guess is found in word

            for(i=0; i < chosenWord.length; i++){
                if(chosenWord.charAt(i).toLowerCase() == letter.toLowerCase()){ //if user guess is equal to letter in position of i
                    gameBoard[i] = chosenWord[i]; //update game board to correct letter from word
                }
            }
            checkForWin();
            updateGameboard(); //display updated game board
        }
        else {
            missesLeft--;
            addToGuessedLetters(letter);
            updateGameboard();
            checkForLoss();
        }
    }
}