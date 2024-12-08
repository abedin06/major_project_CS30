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
    this.speed = 5;
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
      this.pos.sub(0,this.speed);
    }
  
    if (keyCode === DOWN_ARROW){
      this.pos.add(0,this.speed);
    }
  
    if(keyCode === LEFT_ARROW){
      this.pos.sub(this.speed,0);
    }
  
    if(keyCode === RIGHT_ARROW){
      this.pos.add(this.speed,0);
    }
  }

  refresh(initial_x,initial_y){
    this.pos.x = initial_x;
    this.pos.y = initial_y;
    this.velx = createVector(0,0);
    this.vely = createVector(0,0);
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
    if(someShip.pos.x > this.x-this.radius+10 && someShip.pos.x < this.x+this.radius-10 &&
       someShip.pos.y > this.y - this.radius + 10 && someShip.pos.y < this.y+this.radius - 10){
      crashed = true;
    }
  }

}

class Space_Station{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.size = 30;
  }

  display(){
    square(this.pos.x, this.pos.y, this.size);
  }

  hasLanded(someShip){
    if(someShip.pos.x >= this.pos.x && someShip.pos.x <= this.pos.x + this.size &&
      someShip.pos.y >= this.pos.y && someShip.pos.y  <= this.pos.y + this.size){
      landed = "has docked";
    }

  }
}

let crashed = false;
let level = 3;
let landed = "has not docked";
let number_of_crashes = 0;
const G_CONSTANT = 6.6743*10**-2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  player = new SpaceShip(width/2,150);
  mars = new Planet(0,0);
  venus = new Planet(0,0);
  earth = new Planet(0,0);

  stellar = new Space_Station(0,0);
  stellar_2 = new Space_Station(0,0);
}



function draw() {
  background(220);
  game_level();
  return_player();
  show_scores();
}

function return_player(){
  if(crashed){
    player.refresh(width/2,50);
    crashed = false;
    number_of_crashes++;
  }
}

function show_scores(){
  textSize(20);
  text(number_of_crashes, width-100,100);
  text(landed, width-150, 200);
}


function game_level(){
  if(level === 1){
    mars.x = width/2;
    mars.y = height/2;
    mars.display();
    mars.applygravity(player, G_CONSTANT);
    mars.collision(player);

    stellar.pos.x = width/2 + 400;
    stellar.pos.y = height/2;
    stellar.display();
    stellar.hasLanded(player);

    player.display();
    player.update_position();
    player.move();
  }

  if(level === 2){
    mars.x = width/4;
    mars.y = height/2;

    venus.x = 0.75*width;
    venus.y = height/2;

    stellar.pos.x = 0.75*width+200;
    stellar.pos.y = height/2;

    mars.display();
    venus.display();
  
    venus.applygravity(player, G_CONSTANT);
    mars.applygravity(player,G_CONSTANT);
  
    venus.collision(player);
    mars.collision(player);
  
    stellar.display();
    stellar.hasLanded(player);
  
    player.display();
    player.update_position();
    player.move();
  }

  if(level === 3){

    mars.x = 200;
    mars.y = 300;

    venus.x = width-200;
    venus.y = 300;

    earth.x = width/2;
    earth.y = height-150;

    stellar.pos.x = 250;
    stellar.pos.y = height-100;

    stellar_2.pos.x = width-300;
    stellar_2.pos.y = height-100;
  

    mars.display();
    mars.applygravity(player, G_CONSTANT);
    mars.collision(player);

    venus.display();
    venus.applygravity(player, G_CONSTANT);
    venus.collision(player);

    earth.display();
    earth.applygravity(player, G_CONSTANT);
    earth.collision(player);

    stellar.display();
    stellar.hasLanded(player);

    stellar_2.display();
    stellar_2.hasLanded(player);

    player.display();
    player.update_position();
    player.move();

  }
}

