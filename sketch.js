const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var world, engine;
var net, ground, bgImg, Hour, catapult1, catapult2;
var goal1_1, goal1_2, goal1_3, goal2_1, goal2_2, goal2_3; 
var b1, b2, b3, b4, b5, b6, b7, b8, b9, b10;
var balloonState = "b1";
var BlRemaining = 5;
var BlScore = 0;
var ReScore = 0;
var ReRemaining = 5;


function preload() {
  getTimeAndChangeImage();
}

function setup() {
  createCanvas(1400,600);

  engine = Engine.create();
  world = engine.world;

  //Water Balloons
  b1 = new Balloon(230, 520);
  b2 = new Balloon(180, 520);
  b3 = new Balloon(130, 520);
  b4 = new Balloon(80, 520);
  b5 = new Balloon(30, 520);
  b6 = new Balloon(1170, 520);
  b7 = new Balloon(1220, 520);
  b8 = new Balloon(1270, 520);
  b9 = new Balloon(1320, 520);
  b10 = new Balloon(1370, 520);

  //Base and division
  net = new Net(700, 520);
  ground = new Ground(700, 575);

  //Goals  
  goal1_1 = new Goal(150, 250, 250, 10);
  goal1_2 = new Goal(25, 220, 10, 70);
  goal1_3 = new Goal(275, 220, 10, 70);
  goal2_1 = new Goal(1250, 250, 250, 10);
  goal2_2 = new Goal(1125, 220, 10, 70);
  goal2_3 = new Goal(1375, 220, 10, 70);

  //Catapults
  catapult1 = new Catapult(b1.body, {x : 450, y : 470});
  catapult2 = new Catapult(b6.body, {x : 950, y : 470});
}

function draw() {
  if(bgImg)
  background(bgImg);  
  Engine.update(engine);
  
  //Base and division colours according to time
  if(Hour <= 18 && Hour >= 06) {
    net.display("black");
    ground.display("black");
  }
  else {
    net.display("white");
    ground.display("white");
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

  //Reattaching blue balloons and updating the red balloons remaining
  if(balloonState === "b1")
    ReRemaining = 5;
  if(balloonState === "b2") {
    catapult1.attach(b2.body);
    ReRemaining = 4;
  }
  if(balloonState === "b3") {
    catapult1.attach(b3.body);
    ReRemaining = 3;
  }
  if(balloonState === "b4") {
    catapult1.attach(b4.body);
    ReRemaining = 2;
  }
  if(balloonState === "b5") {
    catapult1.attach(b5.body);
    ReRemaining = 1;
  }
  if(balloonState === "end of balloons")
    ReRemaining = 0;

  //Reattaching red balloons and updating the blue balloons remaining
  if(balloonState === "b6")
    BlRemaining = 4;
  if(balloonState === "b7") {
    catapult2.attach(b7.body);
    BlRemaining = 3;
  }
  if(balloonState === "b8") {
    catapult2.attach(b8.body);
    BlRemaining = 2;
  }
  if(balloonState === "b9") {
    catapult2.attach(b9.body);
    BlRemaining = 1;
  }
  if(balloonState === "b10") {
    catapult2.attach(b10.body);
    BlRemaining = 0;
  }
  
  getTimeAndChangeImage();

  textSize(20);
  stroke("black")
  strokeWeight(2);
  fill("blue");
  text("Player Blue's Score: "+BlScore, 10, 20);
  text("Balloons remaining: "+BlRemaining, 10, 45);
  fill("red");
  text("Player Red's Score: "+ReScore, 1170, 20); 
  text("Balloons remaining: "+ReRemaining, 1170, 45);

  drawSprites();
}

async function getTimeAndChangeImage() {
  //Getting the time
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  Hour = datetime.slice(11, 13);

  //Changing the image according to the time
  if(Hour <= 18 && Hour >= 06) {
    bg = "images/Day.jpg";
  }
  else {
    bg = "images/Night.jpg";
  }
  bgImg = loadImage(bg);
}

function mouseDragged() {
  //Setting the position of the water balloon bodies to the mouse position when the mouse is dragged
  //accoding to the 
  if(balloonState === "b1")
    Matter.Body.setPosition(b1.body, {x : mouseX, y : mouseY});

  else if(balloonState === "b6") 
    Matter.Body.setPosition(b6.body, {x : mouseX, y : mouseY});
  
  else if(balloonState === "b2")
    Matter.Body.setPosition(b2.body, {x : mouseX, y : mouseY})

  else if(balloonState === "b7")
    Matter.Body.setPosition(b7.body, {x : mouseX, y : mouseY})

  else if(balloonState === "b3")
    Matter.Body.setPosition(b3.body, {x : mouseX, y : mouseY})
  
  else if(balloonState === "b8")
    Matter.Body.setPosition(b8.body, {x : mouseX, y : mouseY})
  
  else if(balloonState === "b4")
    Matter.Body.setPosition(b4.body, {x : mouseX, y : mouseY})
  
  else if(balloonState === "b9")
    Matter.Body.setPosition(b9.body, {x : mouseX, y : mouseY})
  
  else if(balloonState === "b5")
    Matter.Body.setPosition(b5.body, {x : mouseX, y : mouseY})
  
  else if(balloonState === "b10")
    Matter.Body.setPosition(b10.body, {x : mouseX, y : mouseY})
}

function mouseReleased() {
  if(balloonState === "b1") {
    catapult1.fly();
    balloonState = "b6"; 
  }
  else if(balloonState === "b6") {
    catapult2.fly();
    balloonState = "b2";
  }
  else if(balloonState === "b2") {
    catapult1.fly();
    balloonState = "b7";
  }
  else if(balloonState === "b7") {
    catapult2.fly();
    balloonState = "b3";
  }
  else if(balloonState === "b3") {
    catapult1.fly();
    balloonState = "b8";
  }
  else if(balloonState === "b8") {
    catapult2.fly();
    balloonState = "b4";
  }
  else if(balloonState === "b4") {
    catapult1.fly();
    balloonState = "b9";
  }
  else if(balloonState === "b9") {
    catapult2.fly();
    balloonState = "b5";
  }
  else if(balloonState === "b5") {  
    catapult1.fly();
    balloonState = "b10";
  }
  else if(balloonState === "b10"){
    catapult2.fly();
    balloonState = "end of balloons";
  }
}