let cols = 24;
let rows = 24;

let dashSize = 0.5;
let dashColor;

let rippleX, rippleY;

let spinEngine;
let spinSpeed;
let spinStart;
let spinEnd;

let rotSpeed;
let rippleSpeed;

function preload() {
  font = loadFont('resources/IBMPlexMono-Medium.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(30);

  rowsSlider = createSlider(0,100,24);
  rowsSlider.position(30,30);
  rowsSlider.style('width','100px');

  colsSlider = createSlider(0,100,24);
  colsSlider.position(30,60);
  colsSlider.style('width','100px');

  sizeSlider = createSlider(0,2,0.5,0.01);
  sizeSlider.position(30,90);
  sizeSlider.style('width','100px');

  rotSpeedSlider = createSlider(0,4,1,0.01);
  rotSpeedSlider.position(30,150);
  rotSpeedSlider.style('width','100px');

  rippleSpeedSlider = createSlider(0,10,5,0.01);
  rippleSpeedSlider.position(30,180);
  rippleSpeedSlider.style('width','100px');

  radialCheck = createCheckbox(' ',true);
  radialCheck.position(30,240);
  radialCheck.changed(myRadialCheck);

  diamondCheck = createCheckbox(' ',false);
  diamondCheck.position(30,260);
  diamondCheck.changed(myDiamondCheck);

  frameCheck = createCheckbox(' ',false);
  frameCheck.position(30,280);
  frameCheck.changed(myFrameCheck);

  rippleX = width/2;
  rippleY = height/2;

  dashColor = color('#ff0000');
}

function draw() {
  background(255);

  textFont(font);
  fill(0);
  noStroke();
  textSize(9);
  text("Rows", 30, 30);
  text("Columns", 30, 60);
  text("Size", 30, 90);

  text("Spin Speed", 30, 150);
  text("Ripple Speed", 30, 180);

  text("Radial", 50, 253);
  text("Diamond", 50, 273);
  text("Frame", 50, 293);


  rows = rowsSlider.value();
  cols = colsSlider.value();
  dashSize = sizeSlider.value();
  rotSpeed = rotSpeedSlider.value();
  rippleSpeed = rippleSpeedSlider.value()/100;

  let spinSteps = PI/(30*rotSpeed);

  let xSpace = width/cols;
  let ySpace = height/rows;

  for(let i=0; i<=rows; i++){
    for(let j=0; j<=cols; j++){
      push();
      translate(j*xSpace,i*ySpace);

      let delayDist;

      if(diamondCheck.checked()==true){
        let delayDistY = dist(j*xSpace,i*ySpace,j*xSpace,rippleY);
        let delayDistX = dist(j*xSpace,i*ySpace,rippleX,i*ySpace);
        delayDist = (delayDistX + delayDistY)/2 * rippleSpeed;
      }

      if(radialCheck.checked() ==true){
        delayDist = dist(j*xSpace,i*ySpace,rippleX,rippleY) * rippleSpeed;
      }

      if(frameCheck.checked() ==true){
        let delayDistY = dist(j*xSpace,i*ySpace,j*xSpace,rippleY);
        let delayDistX = dist(j*xSpace,i*ySpace,rippleX,i*ySpace);
        delayDist = dist(delayDistY,delayDistX,rippleX,rippleY) * rippleSpeed;
      }

      if(frameCount>(spinStart+delayDist) && frameCount<(spinEnd+delayDist)){
        let spinner = spinEngine - delayDist*spinSteps;

        let easeFactor = map(sinEngine(spinner-PI/2,1),-1,1,0,2*PI)

        rotate(easeFactor);
      }

      dash(0,0,dashSize);
      pop();
    }
  }

  spinEngine += spinSteps;
}



function mousePressed(){
  spinStart = frameCount;
  spinEnd = frameCount + (30*rotSpeed);
  spinEngine = 0;

  print(true);

  rippleX = mouseX;
  rippleY = mouseY;
}

function dash(x,y,size){
  this.x = x;
  this.y = y;
  this.size = size;

  push();
    fill(dashColor);
    noStroke();
    translate(-50*size,-8*size);
    beginShape();
      vertex(16*size,0);
      vertex(100*size,0);
      vertex(84*size,16*size);
      vertex(0,16*size);
    endShape(CLOSE);
  pop();
}

function sinEngine(aLength, slope) {
  var sinus = sin(aLength);
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slope));
  return sinerSquare;
}

function myRadialCheck(){
  if(diamondCheck.checked() == true){ diamondCheck.checked(false);}
  if(frameCheck.checked() == true){ frameCheck.checked(false);}

  if(radialCheck.checked() == false){ radialCheck.checked(true);}
}

function myDiamondCheck(){
  if(radialCheck.checked() == true){ radialCheck.checked(false);}
  if(frameCheck.checked() == true){ frameCheck.checked(false);}

  if(diamondCheck.checked() == false){ diamondCheck.checked(true);}
}

function myFrameCheck(){
  if(radialCheck.checked() == true){ radialCheck.checked(false);}
  if(diamondCheck.checked() == true){ diamondCheck.checked(false);}

  if(frameCheck.checked() == false){ frameCheck.checked(true);}
}
/*
      // no ease
      if(frameCount>(spinStart+delayDist) && frameCount<(spinEnd+delayDist)){
        rotate(spinEngine - delayDist*spinSpeed);
      }

      // ease attempt 1 - doesn't really work
      if(frameCount>(spinStart+delayDist) && frameCount<(spinEnd+delayDist)){
        let spinner = spinEngine - delayDist*spinSpeed;

        let easeFactor = map(spinner,0,2*PI,0,PI);

        rotate(spinner * sinEngine(easeFactor,1));
      }
*/
