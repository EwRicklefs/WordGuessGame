// 

//Hardcode list here.
var listOfWords = ["spotted",
    "call",
    "bleach",
    "shut",
    "typical",
    "shaggy",
    "word",
    "wink",
    "vacuous",
    "fur2",
    "existence",
    "mind",
    "little",
    "curved",
    "private"];

    //generates a random word from the provided list
function randWord(inputWordList) {
    var num=Math.floor(Math.random()*(listOfWords.length-1));
    return inputWordList[num];
}

//contains the values of the current gamestate
var gameState = {
    wins:0,
    losses:0,
    guessesRem:0,
    contFlag:true,
    guesses:[],
    word:' ',
    guessedWord:[]
}

function newWord() {
    gameState.guessesRem=9;
    gameState.contFlag=true;
    gameState.guesses=[];
    gameState.word=randWord(listOfWords);
    gameState.guessedWord=Array(gameState.word.length);
    gameState.guessedWord.fill('-');
}

newWord();
startup();

//Initialzies the game and loads the gamebar.
function startup() {
    document.getElementById("textBar").innerHTML="Ready to play hangman? Enter a value!";
    document.getElementById("correctWord").innerHTML=gameState.guessedWord.join('');
    document.getElementById("guesses").innerHTML=gameState.guesses;
    document.getElementById("gusRem").innerHTML=gameState.guessesRem;
    document.getElementById("wins").innerHTML=gameState.wins;
    document.getElementById("losses").innerHTML=gameState.losses;
    console.log("word is " + gameState.word)
}

function refresh() {
    document.getElementById("correctWord").innerHTML=gameState.guessedWord.join('');
    document.getElementById("guesses").innerHTML=gameState.guesses;
    document.getElementById("gusRem").innerHTML=gameState.guessesRem;
    document.getElementById("wins").innerHTML=gameState.wins;
    document.getElementById("losses").innerHTML=gameState.losses;
}


document.onkeypress = function(event) {
    if (gameState.contFlag) {
        var curGuess = event.key;
        var counter=0;
        gameState.guesses.push(curGuess);
        gameState.guessesRem--;
        refresh();
        for (var i=0;i<gameState.word.length;i++) {
            if (curGuess === gameState.word[i]) {
                gameState.guessedWord[i]=curGuess;
                counter++;
            }
        }
        if (counter > 0) {
            document.getElementById("textBar").innerHTML="Correct Guess! Guess Again!"
        } else {
            document.getElementById("textBar").innerHTML="Incorrect Guess! Guess Again!"
        }
        refresh();
    
    //resolves game based off winning or losing
    if (gameState.guessedWord.join('')===gameState.word) {
        gameState.wins++;
        gameState.contFlag=false;
        document.getElementById('textBar').innerHTML="You win! Click here to play again!";
        document.getElementById('textBar').id='restartButton';
        document.getElementById('restartButton').onclick = function() {
            document.getElementById('restartButton').id='textBar';
            newWord();
            startup();
        }
            
    } else if (gameState.guessesRem<1){
        gameState.losses++;
        document.getElementById('textBar').innerHTML="You lose! Click here to play again!";
        document.getElementById('textBar').id='restartButton'; 
        document.getElementById('restartButton').onclick = function() {
            document.getElementById('restartButton').id='textBar';
            newWord();
            startup();
        }        
    }
}
}




    











