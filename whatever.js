


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

let asteroidList = [];
let lastswitch = 0;
let interval = 5000;

function setup(){
  createCanvas(windowWidth, windowHeight);

}

function draw(){
  background(0);
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

function makeAsteroids(){
  if(millis() > lastswitch + interval){
    for (let i = 0; i < 10 ; i++){
      let someparticle = new Asteroid;
      asteroidList.push(someparticle);
    }
    lastswitch = millis();
  }
}