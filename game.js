// alert("hello!");

//initialize elements
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var Level = 0;
var HighScore = 0;
var checkStart = 'false';
$("#level-correct").css("opacity", "0");

//start game on 1st key press
$(document).on('keypress', function(){
    if (checkStart != 'true'){
        nextSequence();
        checkStart = 'true';
    }
});

//Calls next sequence
function nextSequence(){
    //Generate random colour
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //random colour flash
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    //random colour audio
    playSound(randomChosenColour);
    //add level in text
    Level = Level + 1;
    $("h1").text("Level " + Level);
    userClickedPattern = [];
    checkStart = 'true';
};

//Button click (event listener - jquery)
$('.btn').click(function (){
    if (checkStart == 'true') {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer()
    };
});

//Generic function to play sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


//Generic function to animate button for pressed
function animatePress(currentColour){
    var currentButton = $("#" + currentColour);
    currentButton.addClass("pressed");
    setTimeout(function() {
        currentButton.removeClass("pressed");
    }, 200);
};


//Function to check answer comparing arrays
function checkAnswer(){
    console.log ("check answer: gamePattern = " + gamePattern.length + ", userPattern = " + userClickedPattern.length);
    if (gamePattern.length === userClickedPattern.length){
        checkStart = 'false';
        if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
            //correct answer
            $("#level-correct").css("opacity", "1");
            $("#level-correct").fadeTo(1000, 0);
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } else {
            //wrong answer
            console.log("wrong at Level " + Level);
            $("h1").text("Game Over at level " + Level + ", press any key to restart.");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 500);
            restartGame();
        };
    };
};


function restartGame(){
    checkStart = 'false';
    userClickedPattern = [];
    gamePattern = [];
    if(Level > HighScore) {
        $("#high-score").text("High Score: " + Level);
        HighScore = Level;
    };
    Level = 0;
};