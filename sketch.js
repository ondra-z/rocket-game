let columnWidth = 40;
let colYcor = []
let birdHeight = 50;
let birdWidth = 23;
let birdXcor = 100;
let birdYcor = 50;
let counter = 0;
let gameMode = 2; //2 = before start, 1 = game active, 0 = gameOver
let scale = 3;
let fallSpeed = 4;
let jumpTime = 100;
let OGbirdYcor = 50;
let fireLength = 6;
let jumpLength = 10;

let columnSpeed = 4;

//gradient
const Y_AXIS = 1;
let b1;
let b2;

//game proportions
let gap = 150;//gap opening in column
let margin = 100; //how close the gap can be to bottom of top of the canvas

preload = () => {        
  imgBg = loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/62605cad03c837a5a054ecc3_Background.svg');
  imgRocket =  loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/625eb66b615304579022b97f_G_Rocket.svg');
  imgRocketFire = loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/625eb66cf5bcfa650326fa68_G_Rocket_fire.svg');
  imgColumn = loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/625eb8d503bfba83741b7337_Column.png')
  
  }
setup = () => {//----------------SETUP-----------------------------
  b1 = color(32,106,129);
  b2 = color(29,2,74);
  //createCanvas(windowWidth-100, windowHeight-100);
  
  createCanvas(1000 , 600);
  //fullscreen();
  restartGame();
  frameRate(30);
  noStroke();

  for(let i = 0; i <cloudNum; i++){
    planets[i] = new Planet((width+resetZone*2)/planetNum*i);
  }
  for(let i = 0; i <ellipseNum; i++){
    ellipses[i] = new Ellipse((width+resetZone*2)/ellipseNum*i);
  }
  for(let i = 0; i <cloudNum; i++){
    clouds[i] = new Cloud((width+resetZone*2)/cloudNum*i);
  }
}
function startJump(){
  OGbirdYcor = birdYcor;
  jumpTime = 0;
}
function jump(){
  //birdYcor = OGbirdYcor  - (sin((jumpTime-18)/12)+1)*43;
  birdYcor = OGbirdYcor  - sin(jumpTime/5)*86;
  
  jumpTime ++;
}

var truncateFloat = function(value, precision) {
    // Ensure the multiplier is a float
    var pMult = 1.0;
    while (precision--) {
        pMult *= 10;
    }
    // Multiply the value by the precision multiplier, 
    // convert it to int (discarding any pesky leftover decimals) 
    // and float-divide it by the same multiplier
    return ((value * pMult) >> 0) / pMult;
}
function showFpsAnScore(){
  fill(0);
  textSize(12);
  
  if(counter%12 == 0){
    trancatedFps = truncateFloat(frameRate(),1)
  }
  textStyle(NORMAL);
  textAlign(LEFT);
  text("Fps: " + trancatedFps, width-80, 30);
  text("Score: " + score, 20, 30);
}
function restartGame(){
  birdYcor = 100;
  jumpTime = 100;
  score = 0;
  colXcor = [width,parseInt(width + (width+columnWidth)/3), parseInt(width + (width+columnWidth)/3*2)];
  
  for(var i=0; i <3; i++){
    colYcor[i] = random(margin, height - gap - margin);
  }
}
function drawBackground(){
  for(let i = 0; i <planetNum; i++){
    planets[i].display();
    if (gameMode==1){
      planets[i].move();
    }
  } 

  for(let i = 0; i <ellipseNum; i++){
    ellipses[i].display();
    if (gameMode==1){
      ellipses[i].move();
    }
  } 
  
  for(let i = 0; i <cloudNum; i++){
    clouds[i].display();
    if (gameMode==1){
      clouds[i].move();
    }
  } 
}
function drawColumns(){
  for(var i=0; i <3; i++){
    fill("#000");
    
    image(imgColumn, colXcor[i], colYcor[i]+gap, columnWidth, 800);
    image(imgColumn, colXcor[i], colYcor[i]-800, columnWidth, 800);
  }
}
function updateColumns(){
  for(var i=0; i <3; i++){
    colXcor[i] -= columnSpeed;
    
    //restart column
    if(colXcor[i] <= -columnWidth){
      colXcor[i] = width;
      colYcor[i] = random(margin, height - gap - margin);
    }
  }
  
}
function checkColision(){
  if(birdYcor < 2){
    gameMode = 0;
  }
  //check if bird hit the floor
  if(birdYcor > height - birdHeight-2){
    gameMode = 0;
    
  }
  
  //check colision with columns
  for(var i=0; i <3; i++){//check for Y coordinates
    if( (colXcor[i] >= (birdXcor-columnWidth))  && (colXcor[i]<=(birdXcor+birdWidth))){
      print("gameOver");
      if(birdYcor<colYcor[i] || (birdYcor+birdHeight) > (colYcor[i]+gap) ){//check for X coordinates
          gameMode = 0;
        }
      
    }
  }
}
function updateScore(){
  for(var i=0; i <3; i++){
    
    //restart column
    if(colXcor[i] >= birdXcor-columnWidth &&  colXcor[i] < birdXcor-columnWidth+columnSpeed){
      score ++;

    }
  }
}

touchStarted = () => {
  if(gameMode == 1){
    startJump();
  }
  else if(gameMode==0){
    restartGame();
    gameMode = 1;
    
  }
}
keyPressed = () => {
  if (keyCode === 32 && gameMode ==1) {
    startJump();
  }
  if (keyCode === 32 && gameMode ==2){
    gameMode = 1;
  }
  if (keyCode == 82){
    restartGame();
    gameMode = 1;
    
  }
  
}
function windowResized() {
  setCanvasScale();
  resizeCanvas(300 * scale , 200 * scale);
}



draw = () => {
  image(imgBg, 0, 0, width, height);
  drawBackground();
  drawColumns();
  
  //-------------------------------GAME MODE 2 = before startinh ----------------------------
  if(gameMode == 2){
    fill(255);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(30);
    text("Rocket Game by Ondrej Zajic", width/2, height/2-10);
    textSize(16);
    text("Press SPACE to play the game", width/2, height/2 + 30);
  //-------------------------------GAME MODE 1 = playing----------------------------
  } else if(gameMode == 1){
    
    //falling movemenet for bird
    if(jumpTime < jumpLength){
      jump();
    } else{
      birdYcor += fallSpeed;
    }

    updateColumns();
    updateScore();

    
  //-------------------------------GAME MODE 0 = game over----------------------------  
  } else if(gameMode == 0){
    fill(255);
    textAlign(CENTER);
    textStyle(BOLD);
    noStroke();
    textSize(50);
    text("GAME OVER", width/2, height/2-10);
    textSize(16);
    text("Press R to restart the game", width/2, height/2 + 30);
  }
  
  
  
  //drawing Bird
  //rect(birdXcor, birdYcor, birdWidth, birdHeight);
  if(jumpTime<fireLength){
    image(imgRocketFire, birdXcor-3, birdYcor, birdWidth+6, birdHeight+10);
  }else{
    image(imgRocket, birdXcor-3, birdYcor, birdWidth+6, birdHeight+10);
  }
  
  
  checkColision();

  
  //show FPS and add to counter
  showFpsAnScore();
  counter ++;
  
}
