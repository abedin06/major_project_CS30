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
    this.length = 7;
    this.width = 5;
    this.speed = 5;
  }

  display(){
    noStroke();
    if(!crashed){
      fill("white");
      rect(this.pos.x, this.pos.y, this.length, this.width);
    }
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
  constructor(x, y, radius, someImage){
    this.x = x;
    this.y = y;
    this.image = someImage;
    this.radius = radius;
    this.mass = 100000;
  }

  display(){
    image(this.image, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
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
    this.pos = createVector(random(0,width), -5);
    this.radius = 5;
    this.velx = createVector(random(0,5), 0);
    this.vely = createVector(0, random(0,5));
  }

  display(){
    fill("red");
    circle(this.pos.x, this.pos.y, this.radius*2);
  }

  move(){
    this.pos.add(this.velx);
    this.pos.add(this.vely);
  }

  isDead(){
    if (this.y > windowHeight || this.x > windowWidth || this.x < windowWidth){
      return true;
    }

    for(let i = 0; i < planet_x_list[level-2].length; i++){
      if(this.pos.x > planet_x_list[level-2][i] - planet_radius_list[level-2][i] &&
         this.pos.x < planet_x_list[level-2][i] + planet_radius_list[level-2][i] &&
         this.pos.y > planet_y_list[level-2][i] - planet_radius_list[level-2][i] &&
         this.pos.y < planet_y_list[level-2][i] + planet_radius_list[level-2][i]) {
        return true;
      }
    }
  }

  made_contact(ship){
    if(ship.pos.x > this.pos.x-this.radius && ship.pos.x < this.pos.x+this.radius &&
      ship.pos.y > this.pos.y - this.radius && ship.pos.y < this.pos.y+this.radius){
      crashed = true;
    }
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

let planet_x_list;
let planet_y_list;
let planet_radius_list;



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  planet_x_list = [
    [width/2],
    [width/4 , 0.75*width],
    [300, width-300, width/2],
    [300, width-300, width/2, width/2],
    [width/2, 300, 300, width-300, width-300]
  ];
  
  planet_y_list = [
    [height/2],
    [height/2, height/2],
    [300, 300, height-150],
    [350, 350, height-150, height/2 -150],
    [height/2, 200, 600, 200, 600]
  ];
  
  planet_radius_list = [
    [100],
    [100, 100],
    [100, 100, 100],
    [100, 100, 100, 75],
    [150, 75, 75, 75, 75]
  ];

  planet_image_list = [
    [EarthImage],
    [SaturnImage, MarsImage],
    [EarthImage, MarsImage, SaturnImage],
    [EarthImage, MarsImage, UranusImage, SaturnImage],
    [UranusImage, MoonImage, MoonImage, MoonImage, MoonImage]

  ];


  player = new SpaceShip(width/2,150);

  stellar = new Space_Station(0,0);
  stellar_2 = new Space_Station(0,0);

  falcon = new Earthship(width/2, height-200);
}

function preload(){
  EarthImage = loadImage("Earth.png");
  MarsImage = loadImage("mars.png");
  SaturnImage = loadImage("saturn.png");
  MoonImage = loadImage("moon.png");
  UranusImage = loadImage("uranus.png");
}

function draw() {
  background(0);
  game_level();
  return_player();
  change_levels();
  show_scores();

  makeAsteroids();

  for (let rock of asteroidList){
    if(rock.isDead()){
      let index = asteroidList.indexOf(rock);
      asteroidList.splice(index, 1);
    }

    else{
      rock.display();
      rock.move();
      rock.made_contact(player);
    }
  }

}

function return_player(){
  if(crashed){
    if(frameCount%100 === 0){
      player.refresh(width/2,50);
      crashed = false;
      number_of_crashes++;
    }
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
    let planet_list = [];

    for (let i = 0; i < planet_y_list[0].length; i++){
      let object = new Planet(planet_x_list[0][i], planet_y_list[0][i], planet_radius_list[0][i], planet_image_list[0][i]);
      planet_list.push(object);
    }

    for (let somePlanet of planet_list){
      somePlanet.display();
      somePlanet.applygravity(player, G_CONSTANT);
      somePlanet.collision(player);

      for (let asteroid of asteroidList){
        somePlanet.applygravity(asteroid, G_CONSTANT);
      }
    }

    stellar.pos.x = width/2 + 400;
    stellar.pos.y = height/2;
    stellar.display();
    stellar.hasLanded(player);

    player.display();
    player.update_position();
    player.move();
  }

  if(level === 3){
    let planet_list = [];

    for (let i = 0; i < planet_y_list[1].length; i++){
      let object = new Planet(planet_x_list[1][i], planet_y_list[1][i], planet_radius_list[1][i], planet_image_list[1][i]);
      planet_list.push(object);
    }

    for (let somePlanet of planet_list){
      somePlanet.display();
      somePlanet.applygravity(player, G_CONSTANT);
      somePlanet.collision(player);

      for (let asteroid of asteroidList){
        somePlanet.applygravity(asteroid, G_CONSTANT);
      }
    }
    

    stellar.pos.x = 0.75*width+200;
    stellar.pos.y = height/2;
  
    stellar.display();
    stellar.hasLanded(player);
  
    player.display();
    player.update_position();
    player.move();
  }

  if(level === 4){

    let planet_list = [];

    for (let i = 0; i < planet_x_list[2].length; i++){
      let object = new Planet(planet_x_list[2][i], planet_y_list[2][i], planet_radius_list[2][i], planet_image_list[2][i]);
      planet_list.push(object);
    }

    for (let somePlanet of planet_list){
      somePlanet.display();
      somePlanet.applygravity(player, G_CONSTANT);
      somePlanet.collision(player);

      for (let asteroid of asteroidList){
        somePlanet.applygravity(asteroid, G_CONSTANT);
      }
    }

    stellar.pos.x = 250;
    stellar.pos.y = height-100;

    stellar_2.pos.x = width-300;
    stellar_2.pos.y = height-100;

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

    let planet_list = [];

    for (let i = 0; i < planet_x_list[3].length; i++){
      let object = new Planet(planet_x_list[3][i], planet_y_list[3][i], planet_radius_list[3][i], planet_image_list[3][i]);
      planet_list.push(object);
    }

    for (let somePlanet of planet_list){
      somePlanet.display();
      somePlanet.applygravity(player, G_CONSTANT);
      somePlanet.collision(player);

      for (let asteroid of asteroidList){
        somePlanet.applygravity(asteroid, G_CONSTANT);
      }
    }

    stellar.pos.x = 50;
    stellar.pos.y = height-100;

    stellar_2.pos.x = width-50;
    stellar_2.pos.y = 50;

    stellar.display();
    stellar.hasLanded(player);

    stellar_2.display();
    stellar_2.hasLanded(player);

    player.display();
    player.update_position();
    player.move();

  }

  if(level === 6){

    let planet_list = [];

    for (let i = 0; i < planet_x_list[4].length; i++){
      let object = new Planet(planet_x_list[4][i], planet_y_list[4][i], planet_radius_list[4][i], planet_image_list[4][i]);
      planet_list.push(object);
    }

    for (let somePlanet of planet_list){
      somePlanet.display();
      somePlanet.applygravity(player, G_CONSTANT);
      somePlanet.collision(player);

      for (let asteroid of asteroidList){
        somePlanet.applygravity(asteroid, G_CONSTANT);
      }
    }

    player.display();
    player.update_position();
    player.move();

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



