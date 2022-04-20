//cloud objects
let cloudNum = 10;
let clouds = [];



//cloud variables
let cloudMinWidth = 60;
let cloudMaxWidth = 120;



let cloudArea = ((1000+2*resetZone)/8);
let cloudSpeed = 2;

class Cloud {
  constructor(tempX){
    this.xMargin = 50;

    this.x = tempX;
    
    this.resetPosition();
    this.imgCloud = loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/625eceb5970227174a28ac8f_Cloud.svg');
  }

  move(){
    this.x -= cloudSpeed;

    //reset clouds from left of canvas to the right to start over
    if(this.x < -resetZone){
      this.x = width + resetZone;
    }
  }

  resetPosition(){
    this.xShift = random(0,cloudArea);

    this.width = random(cloudMinWidth, cloudMaxWidth);
    this.height = this.width/3;

    this.y = random(250,400);
  }

  display(){
    //rect(this.x, 20+random(0,5),cloudArea,3)
    
    //rect(this.x+this.xShift, this.y+30, this.width, this.height);
    image(this.imgCloud, this.x+this.xShift, this.y, this.width, this.height);

  }

}