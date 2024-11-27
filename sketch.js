// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class SpaceShip{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.velx = createVector(5,0);
    this.vely = createVector(0,5);
    this.length = 50;
    this.width = 25;
    this.mass = 100;
  }

  display(){
    rect(this.pos.x, this.pos.y, this.length, this.width);
  }

  move(){
    if (keyIsDown(38)){
      this.pos.sub(this.vely);
    }

    if (keyIsDown(40)){
      this.pos.add(this.vely);
    }

    if(keyIsDown(37)){
      this.pos.sub(this.velx);
    }

    if(keyIsDown(39)){
      this.pos.add(this.velx);
    }
  }

}

class Planet{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.mass = 100000;
  }

  display(){
    circle(this.x, this.y, this.radius*2);
  }

  applygravity(someShip){
    
  }

}

let player;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  player = new SpaceShip(0,height/2);
}

function draw() {
  background(220);
  //orbitControl();
  player.display();
  player.move();
}
