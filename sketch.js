// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class SpaceShip{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.velx = createVector(0.0005,0);
    this.vely = createVector(0,0.0005);
    this.length = 5;
    this.width = 2;
  }

  display(){
    rect(this.pos.x, this.pos.y, this.length, this.width);
  }

  move(){
    this.pos.add(this.velx);
    this.pos.add(this.vely);
  }

  update_position(){
    if (keyCode === 38){
      this.pos.sub(this.vely);
    }

    if (keyCode === 40){
      this.pos.add(this.vely);
    }

    if(keyCode === 37){
      this.pos.sub(this.velx);
    }

    if(keyCode === 39){
      this.pos.add(this.velx);
    }
  }

}

class Planet{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = 100;
    this.mass = 100000;
  }

  display(){
    circle(this.x, this.y, this.radius*2);
  }

  applygravity(someShip, G){
    let gravity_acc = this.mass*G/ dist(this.x, this.y, someShip.pos.x, someShip.pos.y)**2;
    let angle = atan((someShip.pos.x-this.x)/(someShip.pos.y-this.y));
    someShip.velx.add(gravity_acc*cos(angle), 0);
    someShip.vely.add(0, gravity_acc*sin(angle));
  }

}

let player;
const G_CONSTANT = 6.6743* 10**-2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  player = new SpaceShip(0, height);
  mars = new Planet(width/2,height/2);
}

function draw() {
  background(220);
  //orbitControl();
  player.display();
  mars.display();
  player.move();
  mars.applygravity(player,G_CONSTANT);
  player.update_position();
}


