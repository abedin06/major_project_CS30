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
    this.width = 3;
    this.speed = 5;
  }

  display(){
    noStroke();
    fill("white");
    rect(this.pos.x, this.pos.y, this.length, this.width);
  }

  move(){
    this.pos.add(this.velx);
    this.pos.add(this.vely);

    if(this.pos.x > width){
      this.pos.x = 0;
    }

    if(this.pos.x < 0){
      this.pos.x = width-this.width;
    }

    if(this.pos.y > height){
      this.pos.y = 0;
    }

    if(this.pos.y < 0){
      this.pos.y = height;
    }
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
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = 100000;
  }

  display(){
    fill("white");
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
    fill("white");
    square(this.pos.x, this.pos.y, this.size);
  }

  hasLanded(someShip){
    if(someShip.pos.x >= this.pos.x && someShip.pos.x <= this.pos.x + this.size &&
      someShip.pos.y >= this.pos.y && someShip.pos.y  <= this.pos.y + this.size){
      landed = "has docked";
    }

  }
}

class Earthship{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.length = 10;
    this.width = 5;
    this.thrust = 300;
    this.mass = 1*10**5;
    this.deltatime = 1;
    this.mass_change = 0.01;
    this.vely_prev = 0;
    this.vely_new = 0;
  }

  move(){
    this.vely_new = (this.thrust- this.mass*G_CONSTANT - DRAG_CONSTANT*this.vely_prev*this.vely_prev - 
      this.vely_prev*this.mass_change)/this.mass *this.deltatime + this.vely_prev;

    this.y += this.vely_new;
    this.vely_prev = this.vely_new;
    this.mass -= this.mass_change;

    if(this.y < 0){
      this.y = height;
    }

    if(this.mass <= 0){
      alert("rocket fuel is over");
    }
  }

  display(){
    rect(this.x, this.y, this.width, this.length);
    textSize(25);
    text(this.vely_new, 100, 100);
  }
}

class Asteroid{
  constructor(){
    this.x = random(0,width);
    this.y = -10;
    this.radius = 5;
    this.dx = 5;
    this.dy = 5;
  }

  display(){
    fill("red");
    circle(this.x, this.y, this.radius*2);
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;
  }

  isDead(){
    return this.y > windowHeight;
  }

}

let crashed = false;
let level = 2;
let landed = "has not docked";
let number_of_crashes = 0;
const G_CONSTANT = 6.6743*10**-2;
const DRAG_CONSTANT = 0.35;
let asteroidList = [];
let lastswitch = 0;
let interval = 5000;



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  player = new SpaceShip(width/2,150);
  mars = new Planet(0,0, 100);
  venus = new Planet(0,0, 100);
  earth = new Planet(0,0, 100);
  mercury = new Planet(0,0, 75);
  p_1 = new Planet(0,0,75);
  p_2 = new Planet(0,0,75);
  p_3 = new Planet(0,0,75);
  bp = new Planet(0,0,150);


  stellar = new Space_Station(0,0);
  stellar_2 = new Space_Station(0,0);

  falcon = new Earthship(width/2, height-200);
}



function draw() {
  background(0);
  game_level();
  return_player();
  change_levels();
  show_scores();

  for (let rock of asteroidList){
    if(rock.isDead()){
      let index = asteroidList.indexOf(rock);
      asteroidList.splice(index, 1);
    }

    else{
      rock.display();
      rock.move();
    }
  }

}

function return_player(){
  if(crashed){
    player.refresh(width/2,50);
    crashed = false;
    number_of_crashes++;
  }
}

function makeAsteroids(){
  if(millis() > lastswitch + interval){
    for (let i = 0; i < 10 ; i++){
      let someparticle = new Asteroid();
      asteroidList.push(someparticle);
    }
    lastswitch = millis();
  }
}

function show_scores(){
  textSize(20);
  text(number_of_crashes, width-100,100);
  text(landed, width-150, 200);
}


function game_level(){
  if(level === 2){
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

  if(level === 3){
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

  if(level === 4){

    mars.x = 300;
    mars.y = 300;

    venus.x = width-300;
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

  if (level === 1){
    
    //translate(width/2 - falcon.x, height/2 - falcon.y);
    falcon.display();
    falcon.move();
    
  }

  if(level === 5){
    mars.x = 300;
    mars.y = 350;

    venus.x = width-300;
    venus.y = 350;

    earth.x = width/2;
    earth.y = height-150;

    mercury.x = width/2;
    mercury.y = height/2-100;

    stellar.pos.x = 50;
    stellar.pos.y = height-100;

    stellar_2.pos.x = width-50;
    stellar_2.pos.y = 50;
  

    mars.display();
    mars.applygravity(player, G_CONSTANT);
    mars.collision(player);

    venus.display();
    venus.applygravity(player, G_CONSTANT);
    venus.collision(player);

    earth.display();
    earth.applygravity(player, G_CONSTANT);
    earth.collision(player);

    mercury.display();
    mercury.applygravity(player, G_CONSTANT);
    mercury.collision(player);

    stellar.display();
    stellar.hasLanded(player);

    stellar_2.display();
    stellar_2.hasLanded(player);

    player.display();
    player.update_position();
    player.move();

  }

  if(level === 6){

    player.display();
    player.update_position();
    player.move();

    bp.x = width/2;
    bp.y = height/2;
    bp.display();
    bp.applygravity(player, G_CONSTANT);
    bp.collision(player);

    mercury.x = 300;
    mercury.y = 200;
    mercury.display();
    mercury.applygravity(player, G_CONSTANT);
    mercury.collision(player);

    p_1.x = 300;
    p_1.y = 600;
    p_1.display();
    p_1.applygravity(player, G_CONSTANT);
    p_1.collision(player);

    p_2.x = width-300;
    p_2.y = 200;
    p_2.display();
    p_2.applygravity(player, G_CONSTANT);
    p_2.collision(player);

    p_3.x = width-300;
    p_3.y = 600;
    p_3.display();
    p_3.applygravity(player, G_CONSTANT);
    p_3.collision(player);

    stellar.pos.x = 100;
    stellar.pos.y = 400;

    stellar_2.pos.x = width-100;
    stellar_2.pos.y = 400;

    stellar.display();
    stellar.hasLanded(player);

    stellar_2.display();
    stellar_2.hasLanded(player);
  }
}

function change_levels(){
  if (level === 1 && landed === "has docked"){
    level++;
    landed = "has not docked";
  }

  if(level === 2 && landed === "has docked"){
    level++;
    landed = "has not docked";
  }

  if(level === 3 && landed === "has docked"){
    level++;
    landed = "has not docked";
  }

  if(level === 4 && landed === "has docked"){
    level++;
    landed = "has not docked";
  }

  if(level === 5 && landed === "has docked"){
    level++;
    landed = "has not docked";
  }
}



