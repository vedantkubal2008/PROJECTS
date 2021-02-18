var gameState, START = 1,
  PLAY = 2,
  END = 0
var iornMan, iornMan_Image;
var missle, missle_Image, missleGroup;
var coin, coin_Image, coinsGroup;
var side1, side2;
var cloudsGroup,cloud,cloudImage,land;
var score = 0;
var distance=0;
//giving default gameState
gameState = START;

function preload() {
  //loading images
  iornMan_Image = loadAnimation("ironman.gif");
  missile_Image = loadImage("missile.png");
  coins_Image = loadImage("c.png");
  cloudImage = loadImage("cloud.png");
}

function setup() {
  //creating canvas
  createCanvas(600, 700);

  //creating land
  
  
  //creating iorn man
  iornMan = createSprite(300, 550, 10, 10);
  iornMan.addAnimation("flying",iornMan_Image);
  iornMan.scale = 0.5;

  land=createSprite(200, 650, 1000, 100);
  land.shapeColor=rgb(99, 16, 10)
  
  //creating sides
  side1 = createSprite(0, 200, 10, 400);
  side1.visible = false;
  side2 = createSprite(400, 200, 10, 400);
  side2.visible = false;

  //creating group
  coinsGroup = new Group();
  missileGroup = new Group();
  cloudsGroup = new Group();
}
n = 0

function draw() {
  background(168,182,255);

  if (gameState === START) {
    if (keyWentUp("space")) {
      gameState = PLAY;
    }
  } else if (gameState === PLAY) {
    if (keyDown(UP_ARROW)){
    //making background move
      iornMan.y -= 15;
    camera.position.y = iornMan.y - 167
    distance+=5;
    if (frameCount % 50 === 0) {
      spawnMissile();
    }

    //spawn Coins
    if (frameCount % 150 === 0) {
      spawnCoins();
    }
    
    //spawn Clouds
      spawnClouds();
  //  iornMan.velocityY = -10
   // side1.y = iornMan.y-200
    //side2.y = iornMan.y-200
    }
    //spawn Missles
  

    //making iorn man move
    if (keyDown(RIGHT_ARROW)) {
      iornMan.x += 5
    }

    if (keyDown(LEFT_ARROW)) {
      iornMan.x -= 5
    }

    iornMan.collide(side1);
    iornMan.collide(side2);
    //iornMan.debug = true;
    iornMan.setCollider("rectangle", 0, 0, 170, 250);

    //scoreBoard

    if (iornMan.isTouching(coinsGroup)) {
      score += 5;
      coinsGroup.destroyEach();
    }
    if (iornMan.isTouching(missileGroup)  ) {
      iornMan.visible = false;
      missileGroup.destroyEach();
      coinsGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameState = END;
    }
  } else if (gameState === END) {
    if (keyWentUp("r")) {
      gameState = PLAY;
      score = 0;
      distance=0
      iornMan.visible = true;
    }
  }
if (distance>5000){
   // gameEnd();
   gameState=END
}
  drawSprites();

  //Displaying instructions
  if (gameState === START) {
    noStroke();
    fill("red");
    textSize(35);
    text("Press Space To Start", 150, 200);
    textSize(25);
    text("Note:Use right & left arrow keys to move", 0, 20)
    text("You have to cover a distance of 5000", 60, 50)
   
  }
  if (gameState === PLAY || gameState === END) {
    noStroke();
    fill(1);
    textSize(35);
    text("score:" + score, 100, iornMan.y - 430)
  }
  if (gameState === END) {
    if (distance<5000){
    noStroke();
    fill(1);
    textSize(50);
    text("GAME OVER!☠", 100, camera.y);
    textSize(20);
    text("Press R To Restart", 200, camera.y + 50)
    }else{
      noStroke();
      fill("green");
      textSize(50);
      text("You Win", 180, camera.y);
      textSize(20);
      text("Refresh To Restart", 200, camera.y + 50)
     
    }
  }
}

//creating funtion to spawn Missile
//if (frameCount % 100=== 0) {
function spawnMissile() {
  missile = createSprite(0, iornMan.y - 400, 10, 10);
  missile.addImage("missile", missile_Image);
  missile.x = random(80, 550);
  missile.scale = 0.5;
  missile.lifetime = 80
  missile.setCollider("rectangle",27,0,200,400);
  missileGroup.add(missile)
//}
}

function spawnCoins() {
 // if (frameCount % 150=== 0) {
  coin = createSprite(0, iornMan.y - 400, 10, 10);
  coin.addImage("coin", coins_Image);
  coin.x = random(80, 320);
  coin.scale = 0.1;
  coin.bounce(missileGroup)
  coin.setCollider("circle",0,0,269);
  coin.lifetime = 150

  coinsGroup.add(coin)
  }
//}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100=== 0) {
     cloud = createSprite(600,iornMan.y - 400,40,10);
    cloud.x = Math.round(random(10,390));
    cloud.addImage(cloudImage);
    cloud.scale = random(0.5,0.5);
    
     //assign lifetime to the variable
    cloud.lifetime = 100;
    
    //adjust the depth
    cloud.depth = iornMan.depth;
    iornMan.depth += 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

