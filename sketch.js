// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class SpaceShip{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.velx = createVector(0,0);
    this.vely = createVector(0,0);
    this.length = 5;
    this.width = 2;
    this.sped = 5;
  }

  display(){
    rect(this.pos.x, this.pos.y, this.length, this.width);
  }

  move(){
    this.pos.add(this.velx);
    this.pos.add(this.vely);
  }

  update_position(){
    if (keyCode === UP_ARROW){
      this.pos.sub(0,this.sped);
    }
  
    if (keyCode === DOWN_ARROW){
      this.pos.add(0,this.sped);
    }
  
    if(keyCode === LEFT_ARROW){
      this.pos.sub(this.sped,0);
    }
  
    if(keyCode === RIGHT_ARROW){
      this.pos.add(this.sped,0);
    }
  }

  refresh(initial_x,initial_y){
    this.pos.x = initial_x;
    this.pos.y = initial_y;
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
    let gravity_acc = this.mass*G/dist(this.x, this.y, someShip.pos.x, someShip.pos.y)**2;
    let angle = atan(Math.abs(someShip.pos.y-this.y)/Math.abs(someShip.pos.x-this.x));

    if(someShip.pos.x < this.x && someShip.pos.y < this.y){
      someShip.velx.add(gravity_acc*cos(angle), 0);
      someShip.vely.add(0, gravity_acc*sin(angle));
    }

    if(someShip.pos.x < this.x && someShip.pos.y > this.y){
      someShip.velx.add(gravity_acc*cos(angle), 0);
      someShip.vely.sub(0, gravity_acc*sin(angle));
    }

    if(someShip.pos.x > this.x && someShip.pos.y > this.y){
      someShip.velx.sub(gravity_acc*cos(angle), 0);
      someShip.vely.sub(0, gravity_acc*sin(angle));
    }

    if(someShip.pos.x > this.x && someShip.pos.y < this.y){
      someShip.velx.sub(gravity_acc*cos(angle), 0);
      someShip.vely.add(0, gravity_acc*sin(angle));
    }

  }

  collision(someShip){
    if(someShip.pos.x > this.x-this.radius && someShip.pos.x < this.x+this.radius &&
       someShip.pos.y > this.y - this.radius && someShip.pos.y < this.y+this.radius){
      crashed = true;
    }
  }

}

let player;
let crashed = false;
const G_CONSTANT = 6.6743*10**-2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  player = new SpaceShip(width/2, 100);
  mars = new Planet(width/4,height/2);
  venus = new Planet(0.75*width, height/2);
}



function draw() {
  background(220);
  //orbitControl();
  mars.display();
  venus.display();
  venus.applygravity(player, G_CONSTANT);
  mars.applygravity(player,G_CONSTANT);
  venus.collision(player);
  mars.collision(player);
  player.display();
  player.update_position();
  player.move();
  return_player();
}

function return_player(){
  if(crashed){
    player.refresh(width/2,100);
    player.velx = (0,0);
    player.vely = (0,0);
    crashed = false;
  }
}


