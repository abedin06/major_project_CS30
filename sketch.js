// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 200;
let y = 50;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  orbitControl();
  box();
  rect(x,y,50,50);

  if(keyIsDown(65)){
    x-=5;
  }
  if(keyIsDown(87)){
    y-=5;
  }
  if(keyIsDown(83)){
    y+=5;
  }
}
