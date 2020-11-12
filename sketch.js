/*GameStates

gameState PLAY = Middle State in which game is played
Game State STORY = The story behind the game
game State END = End  of the game*/

var gameState,ground,groundImage,NoGround,wallpaper,wallpaperImage,score,ObstaclesGroup,bananaGroup;
var monkey,monkeyImage;

function preload(){
  groundImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  wallpaperImage = loadImage("wallpaper.jpg");
}

function setup(){
  
  gameState = "STORY";
  
  ground = createSprite(200,200);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  
  NoGround = createSprite(200,310,400,5);
  NoGround.visible = false;
  
  monkey = createSprite(50,300,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  monkey.setCollider("circle",0,0,30);
  
  wallpaper = createSprite(200,200);
  wallpaper.addImage("wall paper");
  wallpaper.visible = true;
  
  score = 0;
  ObstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
}
function draw() {
  background("white");
    if (gameState==="STORY"){
      drawSprites();
      
      textSize(20);
      fill ("red");
      text ("Press enter to continue",100,350);
      
      //changing game state to play
      if (keyWentDown("ENTER")){
        gameState = "PLAY";
      }
    }
    
    
    if (gameState==="PLAY"){
      
      ground.velocityX=  - (6 + 3*score/100);
      
      score = Math.ceil(frameCount/frameRate);
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      wallpaper.visible = false;
      
      if (keyDown("space")&& monkey.y>=301){
        monkey.velocityY = -15;
      }
      
      monkey.velocityY = monkey.velocityY+0.8;
      monkey.collide(NoGround);
      
      if (bananaGroup.isTouching(monkey)){
        monkey.width = monkey.width + 5;
        monkey.height = monkey.height + 5;
        bananaGroup.destroyEach();
      }
      drawSprites();
      textSize(20);
      fill("red");
      text("Survival Time: "+ score, 175, 50);
      
      spawnObstacles();
      spawnBanana();
      if (ObstaclesGroup.isTouching(monkey)){
        monkey.width = monkey.width - 5;
        monkey.height = monkey.height - 5;
      }
    }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(450,321,10,40);
    obstacle.velocityX =  - (6 + 3*score/100);
    
    obstacle.setAnimation("Stone");
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 80;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBanana(){
  if (frameCount%80===0){
    var banana = createSprite(410,230,10,5);
    banana.y = randomNumber(180,250);
    banana.setAnimation("banana");
    banana.scale = 0.15;
    banana.velocityX =  (-6);
    banana.lifetime = 66;
    bananaGroup.add(banana);
  } 
}

  
