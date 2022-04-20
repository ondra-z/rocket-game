//ellipse objects
let ellipseNum = 4;
let ellipses = [];

preload = () => {        
  
}

//ellipse variables
let ellipseMinWidth = 350;
let ellipseMaxWidth = 550;


let ellipseArea = (1000+2*resetZone)/8;
let ellipseSpeed = 3;

class Ellipse {
  constructor(tempX){
    this.xMargin = 50;

    this.x = tempX;
    
    this.resetPosition();
    this.imgEllipse = loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/625ecd6846551d10f20fac16_Bottom_Ellipse.svg');
  }

  move(){
    this.x -= ellipseSpeed;

    //reset ellipses from left of canvas to the right to start over
    if(this.x < -resetZone){
      this.x = width + resetZone;
      this.resetPosition();
    }
  }

  resetPosition(){
    this.xShift = random(0,ellipseArea);

    this.width = random(ellipseMinWidth, ellipseMaxWidth);
    this.height = this.width/3;

    this.y = height-20;
  }

  display(){
    //rect(this.x, 20+random(0,5),ellipseArea,3)
    
    //rect(this.x+this.xShift, this.y+30, this.width, this.height);
    image(this.imgEllipse, this.x+this.xShift, this.y, this.width, this.height);

  }

}