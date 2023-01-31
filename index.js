var gamePattern=[];
var userClickedPattern=[];
var start=true;
var level=0;
var buttonColours=["red", "blue", "green", "yellow"];
function nextSequence(){
    userClickedPattern = [];
    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
$(document).on('click touchstart',function(){
    if(start==true){
        $("#level-title").text("Level " + level);
        nextSequence();
        start=false;
    }
})
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("correct");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function () {
            $(document.body).removeClass("game-over");
          }, 200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    start=true;
}
