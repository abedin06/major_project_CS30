// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 200;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  fill("red");
  orbitControl();
  box();
  rect(x,50,50,50);

  if(keyIsDown(65)){
    x-=5;
  }
}
