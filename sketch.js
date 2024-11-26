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
  }

  display(){
    fill("blue");
    rect(this.x, this.y, this.length, this.width);
  }

  move(){
    if (keyCode === UP_ARROW){
      this.pos.sub(vely);
    }

    if (keyCode === DOWN_ARROW){
      this.pos.add(vely);
    }

    if(keyCode === LEFT_ARROW){
      this.pos.sub(velx);
    }

    if(keyCode === RIGHT_ARROW){
      this.pos.add(velx);
    }
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
