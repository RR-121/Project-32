const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var world, engine;
var net, ground, bgImg, Hour, catapult1, catapult2, wall1, wall2;
var goal1_1, goal1_2, goal1_3, goal2_1, goal2_2, goal2_3;
var b1, b2, b3, b4, b5, b6, b7, b8, b9, b10;
var ballState = "b1";
var BlRemaining = 5;
var BlScore = 0;
var ReScore = 0;
var ReRemaining = 5;
var GameState = "Instructions";


function preload() {
  getTimeAndChangeImage();
}

function setup() {
  createCanvas(1400, 600);

  engine = Engine.create();
  world = engine.world;

  //Balls
  b1 = new Ball(230, 540);
  b2 = new Ball(180, 540);
  b3 = new Ball(130, 540);
  b4 = new Ball(80, 540);
  b5 = new Ball(30, 540);
  b6 = new Ball(1170, 540);
  b7 = new Ball(1220, 540);
  b8 = new Ball(1270, 540);
  b9 = new Ball(1320, 540);
  b10 = new Ball(1370, 540);

  //Base and division
  net = new Net(700, 520);
  ground = new Ground(700, 575);

  //Borders
  wall1 = new Net(0, 520);
  wall2 = new Net(1400, 520);

  //Goals  
  goal1_1 = new Goal(150, 250, 250, 10);
  goal1_2 = new Goal(25, 220, 10, 70);
  goal1_3 = new Goal(275, 220, 10, 70);
  goal2_1 = new Goal(1250, 250, 250, 10);
  goal2_2 = new Goal(1125, 220, 10, 70);
  goal2_3 = new Goal(1375, 220, 10, 70);

  //Catapults
  catapult1 = new Catapult(b1.body, { x: 450, y: 470 });
  catapult2 = new Catapult(b6.body, { x: 950, y: 470 });
}

function draw() {
  if (bgImg)
    background(bgImg);
  Engine.update(engine);

  if (GameState === "Instructions") {
    background("gold");

    fill("red");
    textSize(30);
    text("Welcome to the Multiplayer Catapult Goal game!", 350, 50);
    textSize(18);
    text("*", 710, 40);
    textSize(10);
    text("*Can only be played on the same device", 1200, 580);
    text("**Game only made for devices with a mouse", 1200, 590);

    fill("DarkSlateBlue");
    textSize(20);
    text("In this game, go head-to-head with friends, family, rivals, or yourself! You'll see 2 catapults which hold either red or blue balls; decide which colour will be whose. Then, begin playing turn-by-turn. Drag** the balls, according to whoever's turn it is, and aim at the opposite colour goal. If you are successful and get the ball in the goal, without it bouncing outside the goal, you'll get points! Score maximum goals to win! Once all balls have finished, wait for some time for the result! Beware, own goals are counted.", 230, 220, 940);
    text("Press 'Space' to enter the arena!", 520, 450);
    textSize(15);
    text("P.S.: The background may load slowly, but if it does not load even after 10 seconds, try refreshing your page.", 300, 595);
  }

  if (GameState === "Main Game") {
    //Changing base, division and border colours according to time
    if (Hour <= 18 && Hour >= 06) {
      net.display("black");
      ground.display("black");
      wall1.display("black");
      wall2.display("black");
    }
    else {
      net.display("white");
      ground.display("white");
      wall1.display("white");
      wall2.display("white");
    }

    //Player Blue
    b1.display("blue");
    b2.display("blue");
    b3.display("blue");
    b4.display("blue");
    b5.display("blue");
    goal1_1.display("blue");
    goal1_2.display("blue");
    goal1_3.display("blue");

    //Player Red
    b6.display("red");
    b7.display("red");
    b8.display("red");
    b9.display("red");
    b10.display("red");
    goal2_1.display("red");
    goal2_2.display("red");
    goal2_3.display("red");

    //Catapults
    catapult1.display();
    catapult2.display();

    getTimeAndChangeImage();

    //Displaying scores and balls remaining
    textSize(20);
    stroke("black")
    strokeWeight(2);
    fill("blue");
    text("Player Blue's Score: " + BlScore, 10, 20);
    text("Balls remaining: " + BlRemaining, 10, 45);
    fill("red");
    text("Player Red's Score: " + ReScore, 1170, 20);
    text("Balls remaining: " + ReRemaining, 1170, 45);

    if (ballState === "end of balls" && frameCount % 600 === 0) {
      if (ReScore > BlScore)
        GameState = "RWin";
      if (ReScore < BlScore)
        GameState = "BWin";
      if (ReScore === BlScore)
        GameState = "Draw";
    }

    reattach();
  }

  if (GameState === "RWin") {
    background("red");
    textSize(40);
    fill("Yellow");
    text("Player Red wins!!!", 520, 300);
    fill("Black");
    textSize(20);
    text("Final scores:", 600, 400);
    text("Player Red: "+ReScore, 600, 430);
    text("Player Blue: "+BlScore, 600, 460);
    text("Press 'r' to play again", 570, 500);
  }
  else if (GameState === "BWin") {
    background("blue");
    textSize(40);
    fill("yellow")
    text("Player Blue wins!!!", 520, 300);
    fill("black");
    textSize(20);
    text("Final scores:", 600, 400);
    text("Player Blue: "+BlScore, 600, 430);
    text("Player Red: "+ReScore, 600, 460);
    text("Press 'r' to play again", 570, 500);
  }
  else if (GameState === "Draw") {
    background("black");
    textSize(40);
    fill("yellow")
    text("The game has ended in a draw!", 400, 300);
    fill("white");
    textSize(20);
    text("Final scores:", 600, 400);
    text("Player Red: "+ReScore, 600, 430);
    text("Player Blue: "+BlScore, 600, 460);
    text("Press 'r' to play again", 570, 500);
  }

  drawSprites();

}

async function getTimeAndChangeImage() {
  //Getting the time
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  Hour = datetime.slice(11, 13);

  //Changing the image according to the time
  if (Hour <= 18 && Hour >= 06) {
    bg = "images/Day.jpg";
  }
  else {
    bg = "images/Night.jpg";
  }
  bgImg = loadImage(bg);
}

function reattach() {
  //Reattaching blue balls and updating the red balls remaining
  if (ballState === "b1"){
    catapult1.attach(b1.body);
    catapult2.attach(b6.body);
    ReRemaining = 5;
  } 
  if (ballState === "b2") {
    catapult1.attach(b2.body);
    ReRemaining = 4;
  }
  if (ballState === "b3") {
    catapult1.attach(b3.body);
    ReRemaining = 3;
  }
  if (ballState === "b4") {
    catapult1.attach(b4.body);
    ReRemaining = 2;
  }
  if (ballState === "b5") {
    catapult1.attach(b5.body);
    ReRemaining = 1;
  }
  if (ballState === "end of balls")
    ReRemaining = 0;

  //Reattaching red balls and updating the blue balls remaining
  if (ballState === "b6") 
    BlRemaining = 4;  
  if (ballState === "b7") {
    catapult2.attach(b7.body);
    BlRemaining = 3;
  }
  if (ballState === "b8") {
    catapult2.attach(b8.body);
    BlRemaining = 2;
  }
  if (ballState === "b9") {
    catapult2.attach(b9.body);
    BlRemaining = 1;
  }
  if (ballState === "b10") {
    catapult2.attach(b10.body);
    BlRemaining = 0;
  }
}

function reset() {
  Matter.Body.setPosition(b1.body, {x : 260, y : 520});
  Matter.Body.setPosition(b2.body, {x : 205, y : 520});
  Matter.Body.setPosition(b3.body, {x : 150, y : 520});
  Matter.Body.setPosition(b4.body, {x : 95, y : 520});
  Matter.Body.setPosition(b5.body, {x : 40, y : 520});
  Matter.Body.setPosition(b6.body, {x : 1140, y : 520});
  Matter.Body.setPosition(b7.body, {x : 1195, y : 520});
  Matter.Body.setPosition(b8.body, {x : 1250, y : 520});
  Matter.Body.setPosition(b9.body, {x : 1305, y : 520});
  Matter.Body.setPosition(b10.body, {x : 1360, y : 520});

  ballState = "b1";
  GameState = "Main Game"
  BlRemaining = 5;
  ReRemaining = 5;
  BlScore = 0;
  ReScore = 0;
}

function keyPressed() {
  if (keyCode === 32 && GameState === "Instructions") {
    GameState = "Main Game";
  }
  if (keyCode === 82) {
    if (GameState === "RWin" || GameState === "BWin" || GameState === "Draw") {
      reset();
    }
  }
}

function mouseDragged() {
  //Setting the position of the ball bodies to the mouse position when the mouse is dragged
  //according to the ball state
  if (GameState === "Main Game") {
    if (ballState === "b1")
      Matter.Body.setPosition(b1.body, { x: mouseX, y: mouseY });

    else if (ballState === "b6")
      Matter.Body.setPosition(b6.body, { x: mouseX, y: mouseY });

    else if (ballState === "b2")
      Matter.Body.setPosition(b2.body, { x: mouseX, y: mouseY })

    else if (ballState === "b7")
      Matter.Body.setPosition(b7.body, { x: mouseX, y: mouseY })

    else if (ballState === "b3")
      Matter.Body.setPosition(b3.body, { x: mouseX, y: mouseY })

    else if (ballState === "b8")
      Matter.Body.setPosition(b8.body, { x: mouseX, y: mouseY })

    else if (ballState === "b4")
      Matter.Body.setPosition(b4.body, { x: mouseX, y: mouseY })

    else if (ballState === "b9")
      Matter.Body.setPosition(b9.body, { x: mouseX, y: mouseY })

    else if (ballState === "b5")
      Matter.Body.setPosition(b5.body, { x: mouseX, y: mouseY })

    else if (ballState === "b10")
      Matter.Body.setPosition(b10.body, { x: mouseX, y: mouseY })
  }
}

function mouseReleased() {
  if (GameState === "Main Game") {
    if (ballState === "b1") {
      catapult1.fly();
      ballState = "b6";
    }
    else if (ballState === "b6") {
      catapult2.fly();
      ballState = "b2";
    }
    else if (ballState === "b2") {
      catapult1.fly();
      ballState = "b7";
    }
    else if (ballState === "b7") {
      catapult2.fly();
      ballState = "b3";
    }
    else if (ballState === "b3") {
      catapult1.fly();
      ballState = "b8";
    }
    else if (ballState === "b8") {
      catapult2.fly();
      ballState = "b4";
    }
    else if (ballState === "b4") {
      catapult1.fly();
      ballState = "b9";
    }
    else if (ballState === "b9") {
      catapult2.fly();
      ballState = "b5";
    }
    else if (ballState === "b5") {
      catapult1.fly();
      ballState = "b10";
    }
    else if (ballState === "b10") {
      catapult2.fly();
      ballState = "end of balls";
    }
  }
}