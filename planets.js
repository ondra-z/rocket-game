//planet objects
let planetNum = 4;
let planets = [];
let imgPlanet;




//planet variables
let planetMinWidth = 60;
let planetMaxWidth = 120;
let resetZone = 500;

let planetArea = (1000+2*resetZone)/8;
let planetSpeed = 2;

class Planet {
  constructor(tempX){
    this.xMargin = 50;

    this.x = tempX;
    
    this.resetPosition();
    this.imgPlanet = loadImage('https://uploads-ssl.webflow.com/5feb37a08d2817321dc9c524/625eceb5f0be9034ad59f0d0_Planet.svg');
  }

  move(){
    this.x -= planetSpeed;

    //reset planets from left of canvas to the right to start over
    if(this.x < -resetZone){
      this.x = width + resetZone;
    }
  }

  resetPosition(){
    this.xShift = random(0,planetArea);

    this.width = random(planetMinWidth, planetMaxWidth);
    this.height = this.width/1.5;

    this.y = random(50,150);
  }

  display(){
    //rect(this.x, 20+random(0,5),planetArea,3)
    
    //rect(this.x+this.xShift, this.y+30, this.width, this.height);
    image(this.imgPlanet, this.x+this.xShift, this.y, this.width, this.height);

  }

}