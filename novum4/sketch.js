var Engine = Matter.Engine,
//  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  Body = Matter.Body,
  MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];
var constraint = [];
var partSizes = [];
var arrayCount = 0;

var alphaPreview = 0;

var mConstraint;

var partSize = 140;
var typeSize = partSize;
var partHeight, partWidth;

var wordCount = 0;

function preload(){
  font1 = loadFont("assets/IBMPlexMono-Medium.otf");
//  font1 = loadFont("assets/IBMPlexMono-ExtraLightItalic.otf");
}

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);


  partSizeSlider = createSlider(0,300,140);
  partSizeSlider.position(width/2-100,30);
  partSizeSlider.style('width','200px');
  partSizeSlider.mouseReleased(partSizeChange);
  partSizeSlider.mousePressed(previewSize);

//  let inp = createInput("");
//  inp.position(30,30);
  boundaries.push(new Boundary(width/2,-90,width,200,0));
  boundaries.push(new Boundary(width/2,height+90,width,200,0));
  boundaries.push(new Boundary(-90,height/2,200,height,0));
  boundaries.push(new Boundary(width+90,height/2,200,height,0));

  var canvasMouse = Mouse.create(canvas.elt);
  var options = {
    mouse:canvasMouse,
  }

  canvasMouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine,options);
  World.add(world,mConstraint);

  particles[arrayCount] = [];
  partSizes[arrayCount] = partSizeSlider.value();
}

function draw() {
  background(0);

//  typeSize = partSize;
//  partHeight = partSize * 1.25;
//  partWidth = partSize * 0.4;

  textFont(font1);

  push();
  translate(width/2,height/2);
  noFill();
    stroke(255,alphaPreview)
    ellipse(0,0,partSizeSlider.value());
  pop();

  world.gravity.scale = 0.0000;

  // wrom
  for(var j = 0; j<particles.length; j++){
    for (var i = 0;  i<particles[j].length; i++){
      if(i>0){
        var options = {
          bodyA: particles[j][i].body,
          bodyB: particles[j][i-1].body,
          length: partSizes[j]*0.75
        }
        constraint[i] = Constraint.create(options);
        World.add(world,constraint[i]);
        stroke(255); strokeWeight(partSizes[j]/10); noFill(); strokeJoin(ROUND);
        line(particles[j][i].body.position.x,particles[j][i].body.position.y,particles[j][i-1].body.position.x,particles[j][i-1].body.position.y);
      } else {
        stroke(255); strokeWeight(partSizes[j]/10); noFill(); strokeJoin(ROUND);
        line(particles[j][i].body.position.x,particles[j][i].body.position.y,particles[j][i].body.position.x,particles[j][i].body.position.y);
      }
    }
  }

  // show particle and find angle b/n letters
  for(var j = 0; j<particles.length; j++){
    for (var i = 0;  i<particles[j].length; i++){
     particles[j][i].show();
      let xDiff, yDiff;

      if(particles[j].length==1){
        angleDiff = 3*PI;
      } else if(i==0){
        xDiff = particles[j][i].body.position.x - particles[j][i + 1].body.position.x;
        yDiff = particles[j][i].body.position.y - particles[j][i + 1].body.position.y;
        angleDiff = atan2(yDiff,xDiff);
      } else if(i==particles[j].length-1){
        xDiff = particles[j][i-1].body.position.x - particles[j][i].body.position.x;
        yDiff = particles[j][i-1].body.position.y - particles[j][i].body.position.y;
        angleDiff = atan2(yDiff,xDiff);
      } else {
        xDiff = particles[j][i-1].body.position.x - particles[j][i + 1].body.position.x;
        yDiff = particles[j][i-1].body.position.y - particles[j][i + 1].body.position.y;
        angleDiff = atan2(yDiff,xDiff);
      }

      particles[j][i].letter(angleDiff+PI);
    }
  }


  for(var i = 0; i<boundaries.length; i++){
    boundaries[i].show();
  }
//  print(particles.length, particles[arrayCount].length,partSizes[arrayCount]);

  if(alphaPreview>0){
    alphaPreview-=2;
  }
}

function keyTyped(){
  if(key!=" "){
    if(particles[arrayCount].length==0){
      particles[arrayCount].push(new Particle(width/2,height/2,partSizes[arrayCount],key));
    } else {
      let prevX = particles[arrayCount][particles[arrayCount].length-1].body.position.x;
      let prevY = particles[arrayCount][particles[arrayCount].length-1].body.position.y;
      particles[arrayCount].push(new Particle(prevX+partSizes[arrayCount],prevY+random(-partSizes[arrayCount]/3,partSizes[arrayCount]/3),partSizes[arrayCount],key));
    }
  }
}

function keyPressed(){
  if(key == " "){
    print(true);
    arrayCount++;
    particles[arrayCount] = [];
    partSizes[arrayCount] = partSizeSlider.value();
  }
}

function partSizeChange(){
  partSizes[arrayCount] = partSizeSlider.value();
}

function previewSize(){
  print(true);
  alphaPreview = 255;
}
