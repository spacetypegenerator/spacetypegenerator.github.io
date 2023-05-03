var bkgdColor, foreColor, secColor;

var pgFontSize = 138;

var frate = 30;
var mainHourRadius;
var mainMinRadius;
var mainSecRadius;

var fontDataMinCW, fontDataMaxCW;
var fontDataMinRight, fontDataMaxRight;
var fontDataMinSharp, fontDataMaxSharp;

var fFontMinCW, fFontMaxCW;
var fFontMinRight, fFontMaxRight;
var fFontMinSharp, fFontMaxSharp;

var coreScale = 0.9;

// var hourHandOutRad = 150;
// var hourHandInRad = 20;
// var minHandOutRad = 250;
// var minHandInRad = 20;
// var secHandOutRad = 350;
// var secHandInRad = 20;

var handsRadius = 375;

var pgT = [];
pgT[0] = [];
pgT[1] = [];
pgT[2] = [];
var pgWidth = 1250;
var pgHeight = 100;

var tFont;
var hrHourMin = [];
var hrHourMax = [];
var hrMinMin = [];
var hrMinMax = [];

var hourSecWidth, minSecWidth, secSecWidth;
var hourSecStripH, minSecStripH, secSecStripH;
var hourClock, minClock, secClock;

var hourAngle, minAngle, secAngle;
var hourX, hourY;
var minX, minY;
var secX, secY;
var hourHandIn, hourHandOut, minHandIn, minHandOut, secHandIn, secHandOut;
var hourSpeed, minSpeed, secSpeed;
var hourAdjust, minAdjust, secAdjust;
var hourSpread, minSpread, secSpread;
var tickerSecond = 0;
var holdSecond = 0;

var spreadHourAng = 0;
var spreadMinAng = 0;
var spreadSecAng = 0;

var colorA = [];
var bkgdGradLinear;

var fontMode = 0;

var flipBottomOn = false;
var widgetOn = true;
var textColorMode = 0;
var slidersOn = false;
var timeFliesOn = false;
var handsOn = true;
var easeFlowOn = false;
var creditsOn = true;
var lockRotOn = false;

function preload(){
  hourHandIn = createVector(0, 0);
  hourHandOut = createVector(0, 0);
  minHandIn = createVector(0, 0);
  minHandOut = createVector(0, 0);
  secHandIn = createVector(0, 0);
  secHandOut = createVector(0, 0);

  tFont = loadFont('resources/Inter-Medium.ttf');

  fontDataMinCW = loadBytes("resources/cw0.ttf");
  fontDataMaxCW = loadBytes("resources/cw1.ttf");

  fontDataMinRight = loadBytes("resources/rightGrotesk0.ttf");
  fontDataMaxRight = loadBytes("resources/rightGrotesk1.ttf");

  fontDataMinSharp = loadBytes("resources/sharpGrotesk0.ttf");
  fontDataMaxSharp = loadBytes("resources/sharpGrotesk1.ttf");

  setFontModeCore(fontMode);
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);

  minAngle = PI * 1/2;
  // minAngle = 5.8; //// started at 4.7
  hourAngle = PI*5/4;
  secAngle = 0;

  document.getElementById('bColor').value = '#000000';
  document.getElementById('fColor').value = '#ffffff';
  document.getElementById('sColor').value = '#ff0000';
  document.getElementById('colorA0').value = '#ffffff';
  document.getElementById('colorA1').value = '#f29f05';
  document.getElementById('colorA2').value = '#f21905';
  document.getElementById('colorA3').value = '#022873';

  bkgdColor = color(document.getElementById('bColor').value);
  foreColor = color(document.getElementById('fColor').value);
  secColor = color(document.getElementById('sColor').value);
  colorA[0] = color(document.getElementById('colorA0').value);
  colorA[1] = color(document.getElementById('colorA1').value);
  colorA[2] = color(document.getElementById('colorA2').value);
  colorA[3] = color(document.getElementById('colorA3').value);

  fFontMinCW = opentype.parse(fontDataMinCW.bytes.buffer);
  fFontMaxCW = opentype.parse(fontDataMaxCW.bytes.buffer);

  fFontMinRight = opentype.parse(fontDataMinRight.bytes.buffer);
  fFontMaxRight = opentype.parse(fontDataMaxRight.bytes.buffer);

  fFontMinSharp = opentype.parse(fontDataMinSharp.bytes.buffer);
  fFontMaxSharp = opentype.parse(fontDataMaxSharp.bytes.buffer);

  for(var m = 0; m < 3; m++){
    for(var n = 0; n < 12; n++){
      pgTexture(m, n, 0, true);
    }
  }

  secSecWidth = (2*PI*mainSecRadius)*(secSpread/(2*PI));
  secSecStripH = (pgHeight/pgWidth) * secSecWidth;

  minSecWidth = (2*PI*mainMinRadius)*(minSpread/(2*PI));
  minSecStripH = (pgHeight/pgWidth) * minSecWidth;

  hourSecWidth = (2*PI*mainHourRadius)*(hourSpread/(2*PI));
  hourSecStripH = (pgHeight/pgWidth) * hourSecWidth;

  secSpeed = (2*PI)/100;
  minSpeed = secSpeed/60;
  hourSpeed = minSpeed/12;

  frameRate(frate);
  textureMode(NORMAL);

  hourClock = new ClockHour();
  minClock = new ClockMin();
  secClock = new ClockSec();

  // createBkgdLinear();
  // createBkgdRadial();

  resetRadiiSliders();
}

function draw(){
  background(bkgdColor);

  // image(bkgdGradLinear, -width/2, -height/2);
  // image(bkgdGradRadial, -width/2, -height/2);

  // translate(0, height/2);
  // scale(0.9);

  scale(coreScale);
  // fill(bkgdColor);
  // noStroke();
  // ellipse(0,0,mainSecRadius*2 - 60, mainSecRadius*2 - 60, 50);
  // ellipse(0,0,mainHourRadius*2 + 200, mainHourRadius*2 + 200, 100);

  if(handsOn){
    push();
      translate(0, 0, 1);
      rotateZ(-PI/2);
      strokeWeight(2);
      stroke(secColor);
      line(secHandIn.x, secHandIn.y, secHandOut.x, secHandOut.y);
      stroke(foreColor);
      line(minHandIn.x, minHandIn.y, minHandOut.x, minHandOut.y);
      line(hourHandIn.x, hourHandIn.y, hourHandOut.x, hourHandOut.y);
    pop();
  }

  push();
    rotateZ(-PI/2);
    rotateZ((hourAdjust));
    if(lockRotOn){rotateZ(-hourAngle);}
    hourClock.update();
    hourClock.display();
  pop();

  push();
    rotateZ(-PI/2);
    rotateZ(minAdjust);
    if(lockRotOn){rotateZ(-minAngle);}
    minClock.update();
    minClock.display();
  pop();

  push();
    rotateZ(-PI/2);
    rotateZ(secAdjust);
    if(lockRotOn){rotateZ(-secAngle);}
    secClock.update();
    secClock.display();
  pop();

  // textSize(20);
  // text(hourAdjust, 0, 0);
  // text(minAdjust, 0, 50);
  // text(secAdjust, 0, 100);

  // textFont(tFont);
  // textSize(20);
  // text(hour()+":"+minute()+":"+second(), 0, 0);

  configTimeMech();

  ///////////// Figure out adjustment for keeping properly selected time
  configAdjustAngle();

  ///////////// Figure out space between words
  configAvgSpace();
}

function configTimeMech(){
  if(holdSecond != second()){
    holdSecond = second();
    tickerSecond = 0;
  } else {
    tickerSecond ++;
  }

  if(timeFliesOn){
    // TIME FLIES
    hourAngle += hourSpeed;
    minAngle += minSpeed;
    secAngle += secSpeed;
  } else {
    // REAL TIME
    hourAngle = (hour()%12 + (minAngle/TWO_PI))/12 * TWO_PI;
    minAngle = (minute() + ((holdSecond + tickerSecond/frate)/60))/60 * TWO_PI;
    secAngle = (holdSecond + tickerSecond/frate)/60 * TWO_PI;
  }

  // ATTEMPT ONE
  // hourAngle = ((hour() + (minAngle/TWO_PI))%12)/12 * TWO_PI;
  // minAngle = (minute() + (secAngle/TWO_PI))/60 * TWO_PI;
  // secAngle = (holdSecond + tickerSecond/60)/60 * TWO_PI;

  // hourAngle = (hour()%12)/12 * TWO_PI;
  // minAngle = minute()/60 * TWO_PI;
  // secAngle = second()/60 * TWO_PI;

  hourAngle = hourAngle%(2*PI);
  hourX = cos(hourAngle) * mainHourRadius;
  hourY = sin(hourAngle) * mainHourRadius;
  // hourHandIn.set(cos(hourAngle) * handsRadius/10, sin(hourAngle) * handsRadius/10);
  hourHandOut.set(cos(hourAngle) * handsRadius * 1/3, sin(hourAngle) * handsRadius * 1/3);
  if(lockRotOn){ hourHandOut.set(cos(0) * handsRadius * 1/3, sin(0) * handsRadius * 1/3); };

  minAngle = minAngle%(2*PI);
  minX = cos(minAngle) * mainMinRadius;
  minY = sin(minAngle) * mainMinRadius;
  // minHandIn.set(cos(minAngle) * handsRadius/10, sin(minAngle) * handsRadius/10);
  minHandOut.set(cos(minAngle) * handsRadius * 2/3, sin(minAngle) * handsRadius * 2/3);
  if(lockRotOn){ minHandOut.set(cos(0) * handsRadius * 2/3, sin(0) * handsRadius * 2/3); };

  secAngle = secAngle%(2*PI);
  secX = cos(secAngle) * mainSecRadius;
  secY = sin(secAngle) * mainSecRadius;
  // secHandIn.set(cos(secAngle) * handsRadius/10, sin(secAngle) * handsRadius/10);
  secHandOut.set(cos(secAngle) * handsRadius, sin(secAngle) * handsRadius);
  if(lockRotOn){ secHandOut.set(cos(0) * handsRadius, sin(0) * handsRadius); };
}

function configAdjustAngle(){
  var hourPerc = map(hourAngle%(PI/6), 0, PI/6, 0, 1);
  var fromHour = floor(hourAngle/(PI/6));
  var diffFromHour = hourAngle - hourClock.hours[fromHour].currentAng;
  var toHour = fromHour + 1;
  var diffToHour;
  if(toHour == 12){
    diffToHour = hourAngle - hourClock.hours[0].currentAng - 2*PI;
  } else {
    diffToHour = hourAngle - hourClock.hours[toHour].currentAng;
  }

  var minPerc = map(minAngle%(PI/6), 0, PI/6, 0, 1);
  var fromMin = floor(minAngle/(PI/6));
  var diffFromMin = minAngle - minClock.mins[fromMin].currentAng;
  var toMin = fromMin + 1;
  var diffToMin;
  if(toMin == 12){
    diffToMin = minAngle - minClock.mins[0].currentAng - 2*PI;
  } else {
    diffToMin = minAngle - minClock.mins[toMin].currentAng;
  }

  var secPerc = map(secAngle%(PI/6), 0, PI/6, 0, 1);
  var fromSec = floor(secAngle/(PI/6));
  var diffFromSec = secAngle - secClock.secs[fromSec].currentAng;
  var toSec = fromSec + 1;
  var diffToSec;
  if(toSec == 12){
    diffToSec = secAngle - secClock.secs[0].currentAng - 2*PI;
  } else {
    diffToSec = secAngle - secClock.secs[toSec].currentAng;
  }

  // hourAdjust =map(easeInOutSine(hourPerc), 0, 1, diffFromHour, diffToHour);
  // minAdjust = map(easeInOutSine(minPerc), 0, 1, diffFromMin, diffToMin);
  // secAdjust = map(easeInOutSine(secPerc), 0, 1, diffFromSec, diffToSec);
  hourAdjust = map(hourPerc, 0, 1, diffFromHour, diffToHour);
  minAdjust = map(minPerc, 0, 1, diffFromMin, diffToMin);
  secAdjust = map(secPerc, 0, 1, diffFromSec, diffToSec);
}

function configAvgSpace(){
  var culmAng = 0;
  for(var m = 0; m < hourClock.hourCount; m++){
    culmAng += hourClock.hours[m].secAng;
  }
  spreadHourAng = ((2*PI - culmAng)/hourClock.hourCount)*1.0;

  var culmAng2 = 0;
  for(var m = 0; m < minClock.minCount; m++){
    culmAng2 += minClock.mins[m].secAng;
  }
  spreadMinAng = ((2*PI - culmAng2)/minClock.minCount)*1.0;

  var culmAng3 = 0;
  for(var m = 0; m < secClock.secCount; m++){
    culmAng3 += secClock.secs[m].secAng;
  }
  spreadSecAng = ((2*PI - culmAng3)/secClock.secCount)*1.0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight,WEBGL);
}

function setFontMode(val){
  if(val == 0){
    document.getElementById('cwCredits').style.display = "flex";
    document.getElementById('rightCredits').style.display = "none";
    document.getElementById('sharpCredits').style.display = "none";
  } else if(val == 1){
    document.getElementById('cwCredits').style.display = "none";
    document.getElementById('rightCredits').style.display = "flex";
    document.getElementById('sharpCredits').style.display = "none";
  } else if(val == 2){
    document.getElementById('cwCredits').style.display = "none";
    document.getElementById('rightCredits').style.display = "none";
    document.getElementById('sharpCredits').style.display = "flex";
  }

  setFontModeCore(val);

  for(var m = 0; m < 3; m++){
    for(var n = 0; n < 12; n++){
      pgTexture(m, n, 0, true);
    }
  }

  secSecWidth = (2*PI*mainSecRadius)*(secSpread/(2*PI));
  secSecStripH = (pgHeight/pgWidth) * secSecWidth;

  minSecWidth = (2*PI*mainMinRadius)*(minSpread/(2*PI));
  minSecStripH = (pgHeight/pgWidth) * minSecWidth;

  hourSecWidth = (2*PI*mainHourRadius)*(hourSpread/(2*PI));
  hourSecStripH = (pgHeight/pgWidth) * hourSecWidth;

  // hourClock.refresh();
  // minClock.refresh();
  // secClock.refresh();
  hourClock = new ClockHour();
  minClock = new ClockMin();
  secClock = new ClockSec();
}

function setFontModeCore(val){
  if(val == 0){        ////////////////////////////// FOR CW
    fontMode = 0;
    
    pgFontMin = loadFont("resources/cw0.ttf");
    pgFontMax = loadFont("resources/cw1.ttf");
  
    if(!slidersOn){
      mainHourRadius = 500;
      mainMinRadius = 445;
      mainSecRadius = 400;

      handsRadius = 375;

      resetRadiiSliders();
    }
  
    hourSpread = 1.5;
    minSpread = 1.0;  
    secSpread = 1.0;
  
    hrHourMax[0] = 146; hrHourMin[0] = 895;   // 12*
    hrHourMax[1] = 60; hrHourMin[1] = 430;   // 1*
    hrHourMax[2] = 60; hrHourMin[2] = 430;   // 2*
    hrHourMax[3] = 60; hrHourMin[3] = 430;   // 3*
    hrHourMax[4] = 60; hrHourMin[4] = 430;   // 4*
    hrHourMax[5] = 60; hrHourMin[5] = 430;   // 5*
    hrHourMax[6] = 60; hrHourMin[6] = 430;   // 6*
    hrHourMax[7] = 60; hrHourMin[7] = 430;   // 7*
    hrHourMax[8] = 60; hrHourMin[8] = 430;   // 8*
    hrHourMax[9] = 60; hrHourMin[9] = 430;   // 9*
    hrHourMax[10] = 146; hrHourMin[10] = 895; // 10*
    hrHourMax[11] = 146; hrHourMin[11] = 895; // 11*
  
    hrMinMax[0] = 146; hrMinMin[0] = 895;   // 60 *
    hrMinMax[1] = 60; hrMinMin[1] = 430;   // 5 *
    hrMinMax[2] = 146; hrMinMin[2] = 895;   // 10 *
    hrMinMax[3] = 146; hrMinMin[3] = 895;   // 15 *
    hrMinMax[4] = 146; hrMinMin[4] = 895;   // 20 *
    hrMinMax[5] = 146; hrMinMin[5] = 895;   // 25 *
    hrMinMax[6] = 146; hrMinMin[6] = 895;   // 30 *
    hrMinMax[7] = 146; hrMinMin[7] = 895;   // 35 *
    hrMinMax[8] = 146; hrMinMin[8] = 895;   // 40 *
    hrMinMax[9] = 146; hrMinMin[9] = 895;   // 45 *
    hrMinMax[10] = 146; hrMinMin[10] = 895;   // 50
    hrMinMax[11] = 146; hrMinMin[11] = 895;  // 55
  } else if(val == 1){        ////////////////////////////// FOR RIGHT GROTESK
    fontMode = 1;
    
    pgFontMin = loadFont("resources/rightGrotesk0.ttf");
    pgFontMax = loadFont("resources/rightGrotesk1.ttf");
  
    if(!slidersOn){
      mainHourRadius = 500;
      mainMinRadius = 425;
      mainSecRadius = 370;
    
      handsRadius = 330;

      resetRadiiSliders();
    }
  
    hourSpread = 2.4;
    minSpread = 1.7;  
    secSpread = 1.7;
  
    hrHourMax[0] = 678; hrHourMin[0] = 146;   // 12*
    hrHourMax[1] = 346; hrHourMin[1] = 78;   // 1*
    hrHourMax[2] = 396; hrHourMin[2] = 98;   // 2*
    hrHourMax[3] = 540; hrHourMin[3] = 122;   // 3*
    hrHourMax[4] = 456; hrHourMin[4] = 100;   // 4*
    hrHourMax[5] = 362; hrHourMin[5] = 76;   // 5*
    hrHourMax[6] = 294; hrHourMin[6] = 68;   // 6*
    hrHourMax[7] = 548; hrHourMin[7] = 126;   // 7*
    hrHourMax[8] = 504; hrHourMin[8] = 114;   // 8*
    hrHourMax[9] = 390; hrHourMin[9] = 96;   // 9*
    hrHourMax[10] = 320; hrHourMin[10] = 74; // 10*
    hrHourMax[11] = 624; hrHourMin[11] = 138; // 11*
  
    hrMinMax[0] = 514; hrMinMin[0] = 112;   // 60 *
    hrMinMax[1] = 358; hrMinMin[1] = 75;   // 5 *
    hrMinMax[2] = 314; hrMinMin[2] = 72;   // 10 *
    hrMinMax[3] = 662; hrMinMin[3] = 142;   // 15 *
    hrMinMax[4] = 716; hrMinMin[4] = 174;   // 20 *
    hrMinMax[5] = 1130; hrMinMin[5] = 260;   // 25 *
    hrMinMax[6] = 614; hrMinMin[6] = 140;   // 30 *
    hrMinMax[7] = 1026; hrMinMin[7] = 230;   // 35 *
    hrMinMax[8] = 558; hrMinMin[8] = 122;   // 40 *
    hrMinMax[9] = 966; hrMinMin[9] = 210;   // 45 *
    hrMinMax[10] = 468; hrMinMin[10] = 108;   // 50
    hrMinMax[11] = 872; hrMinMin[11] = 188;  // 55
  } else if(val == 2){        ////////////////////////////// FOR SHARP GROTESK
    fontMode = 2;
    
    pgFontMin = loadFont("resources/sharpGrotesk0.ttf");
    pgFontMax = loadFont("resources/sharpGrotesk1.ttf");

    // FOR CAP CASE
    // mainHourRadius = 460;
    // mainMinRadius = 380;
    // mainSecRadius = 322;
    // hourSpread = 4.0;
    // minSpread = 2.7;  
    // secSpread = 2.7;
    // hrHourMax[0] = 486; hrHourMin[0] = 70;   // 12*
    // hrHourMax[1] = 254; hrHourMin[1] = 40;   // 1*
    // hrHourMax[2] = 266; hrHourMin[2] = 40;   // 2*
    // hrHourMax[3] = 380; hrHourMin[3] = 54;   // 3*
    // hrHourMax[4] = 296; hrHourMin[4] = 46;   // 4*
    // hrHourMax[5] = 272; hrHourMin[5] = 40;   // 5*
    // hrHourMax[6] = 218; hrHourMin[6] = 32;   // 6*
    // hrHourMax[7] = 408; hrHourMin[7] = 66;   // 7*
    // hrHourMax[8] = 342; hrHourMin[8] = 52;   // 8*
    // hrHourMax[9] = 298; hrHourMin[9] = 50;   // 9*
    // hrHourMax[10] = 236; hrHourMin[10] = 34; // 10*
    // hrHourMax[11] = 432; hrHourMin[11] = 68; // 11*
  
    // hrMinMax[0] = 354; hrMinMin[0] = 52;   // 60 *
    // hrMinMax[1] = 272; hrMinMin[1] = 40;   // 5 *
    // hrMinMax[2] = 236; hrMinMin[2] = 34;   // 10 *
    // hrMinMax[3] = 484; hrMinMin[3] = 72;   // 15 *
    // hrMinMax[4] = 488; hrMinMin[4] = 72;   // 20 *
    // hrMinMax[5] = 754; hrMinMin[5] = 112;   // 25 *
    // hrMinMax[6] = 396; hrMinMin[6] = 56;   // 30 *
    // hrMinMax[7] = 664; hrMinMin[7] = 98;   // 35 *
    // hrMinMax[8] = 356; hrMinMin[8] = 52;   // 40 *
    // hrMinMax[9] = 624; hrMinMin[9] = 92;   // 45 *
    // hrMinMax[10] = 318; hrMinMin[10] = 44;   // 50
    // hrMinMax[11] = 586; hrMinMin[11] = 84;  // 55

    // FOR UPPERCASE
    if(!slidersOn){
      mainHourRadius = 460;
      mainMinRadius = 378;
      mainSecRadius = 325;

      handsRadius = 285;

      resetRadiiSliders();
    }

    hourSpread = 2.95;
    minSpread = 1.75;  
    secSpread = 1.75;
    hrHourMax[0] = 670; hrHourMin[0] = 92;   // 12*
    hrHourMax[1] = 350; hrHourMin[1] = 54;   // 1*
    hrHourMax[2] = 394; hrHourMin[2] = 56;   // 2*
    hrHourMax[3] = 538; hrHourMin[3] = 78;   // 3*
    hrHourMax[4] = 462; hrHourMin[4] = 72;   // 4*
    hrHourMax[5] = 406; hrHourMin[5] = 56;   // 5*
    hrHourMax[6] = 342; hrHourMin[6] = 46;   // 6*
    hrHourMax[7] = 564; hrHourMin[7] = 84;   // 7*
    hrHourMax[8] = 536; hrHourMin[8] = 74;   // 8*
    hrHourMax[9] = 444; hrHourMin[9] = 66;   // 9*
    hrHourMax[10] = 330; hrHourMin[10] = 48; // 10*
    hrHourMax[11] = 632; hrHourMin[11] = 92; // 11*
  
    hrMinMax[0] = 558; hrMinMin[0] = 76;   // 60 *
    hrMinMax[1] = 406; hrMinMin[1] = 56;   // 5 *
    hrMinMax[2] = 330; hrMinMin[2] = 48;   // 10 *
    hrMinMax[3] = 724; hrMinMin[3] = 100;   // 15 *
    hrMinMax[4] = 722; hrMinMin[4] = 100;   // 20 *
    hrMinMax[5] = 1120; hrMinMin[5] = 154;   // 25 *
    hrMinMax[6] = 648; hrMinMin[6] = 88;   // 30 *
    hrMinMax[7] = 1046; hrMinMin[7] = 142;   // 35 *
    hrMinMax[8] = 564; hrMinMin[8] = 80;   // 40 *
    hrMinMax[9] = 962; hrMinMin[9] = 134;   // 45 *
    hrMinMax[10] = 516; hrMinMin[10] = 68;   // 50
    hrMinMax[11] = 914; hrMinMin[11] = 122;  // 55
  }
}
