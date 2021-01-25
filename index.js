var colors = ["red", "yellow", "green", "blue"];
var clickSound = new Audio("sounds/click.mp3");
var wrongClickSound = new Audio("sounds/wrongclick.mp3");
var clicked = [];
var sequence = [];
var n = 0;
var level = 1;

$(".image").click(async function(event){
  key = event.target;
  if ($(key).hasClass("red")){
    clicked.push(0);
  }
  else if ($(key).hasClass("yellow")){
    clicked.push(1);
  }
  else if ($(key).hasClass("green")){
    clicked.push(2);
  }
  else if ($(key).hasClass("blue")){
    clicked.push(3);
  }

  animate(key);
  if (clicked[n] == sequence[n]){
    clickSound.play();
  }

  else {
    await sleep(200);
    wrongClickSound.play();
    $("h1").text("You Lost 🙁");
    level = 1;
    n = 0;
  }

  if (n >= sequence.length-1){
    await sleep(200);
    n = 0;
    $("h1").text("You Won 🏆");
    level += 1;
  }
  n += 1;
}
);

$(".play-button").click(function(event) {
  n = 0;
  sequence = [];
  clicked = [];
  $("h1").text("Level " + level);
  randomAnim(level);
});


function animate (key){
  $(key).addClass("imageclick");
  setTimeout(() => {$(key).removeClass("imageclick");}, 150);
}

async function randomAnim(n) {
  for(var i=0; i<n; i++){
    var val = Math.floor(Math.random()*4);
    console.log(val);
    sequence.push(val);
    clickSound.play();
    animate($("." +colors[val]));
    await sleep(1000);
    console.log("sequence" + sequence);
  }
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
