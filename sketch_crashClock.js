const {
    Engine,
    World,
    Bodies,
    Composite,
    Constraint,
    Mouse,
    MouseConstraint
} = Matter;

let engine;
let world;
let testPart;
let boundaries = [];
let spokeBound;
var hourGroup = [];
let hourHand, minHand, secHand;
let hourAngle, minAngle, secAngle;
let mConstraint;

var bkgdColor = '#ffffff';
var fillColor = '#000000';
var handColor = '#000000';
var accentColor = '#ff0000';

var textScaler = 1;
var pg = [];
var pgTextSizeHour = 200;
var pgTextSizeMin = 35;
var pgTextSizeHead = 250;

var pgTextSizeHourMax = 200;
var pgTextSizeMinMax = 35;
var pgTextSizeHeadMax = 250;

var tFont = [];
var pgTextFactor = [];

var keyTextHour = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12";
var keyTextMin = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n";
var keyTextTop = "TIME";
var keyTextBottom = "FLIES";

var inputTextHour = [];
var inputTextMin = [];
var inputTextTop = [];
var inputTextBottom = [];

let dropGroupHour;
let dropGroupMin;
let dropGroupHead;
let dropGroupParticles;

var widgetOn = true;

var fps = 60;
var secSmoothAng = 0;
var smoothAng = 0;
var secHold = 0;
var holdMin = 0;

var setMode = 3;
var resetMode = 0;

var gravityAng = 1.5708;
var gravityStrength = 0.0000; // 0.0001

var boundCount = 16;
var constrainMode = 2;

var handsRadius = 0;
var borderRadius, secHandLength, minHandLength, hourHandLength;

var borderPadding = 100;
var borderExtra = 0;

var clockBorder;

var fontSelect = 4;
var borderDraw = 2;

var fullScale = 1;
var styleMode = 0;

function preload(){
  tFont[0] = loadFont("crashClock_resources/Milligram-Heavy.otf");
  pgTextFactor[0] = 0.725;

  tFont[1] = loadFont("crashClock_resources/Inter-Medium.ttf");
  pgTextFactor[1] = 0.735;

  tFont[2] = loadFont("crashClock_resources/Gilway-Bold.otf");
  pgTextFactor[2] = 0.825;

  tFont[3] = loadFont("crashClock_resources/EditorialNew-Thin.otf");
  pgTextFactor[3] = 0.835;

  tFont[4] = loadFont("crashClock_resources/Evans-Narrow-Heavy.otf");
  pgTextFactor[4] = 0.82;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  randomStart();

  setText();

  secSmoothAng = (TWO_PI/60)/fps;
  configureClock();
  holdMin = minute();

  // create an engine
  var engineOptions = {
    positionIterations:10,
    velocityIterations:10
    // constraintIterations: 4
  }
  engine = Engine.create(engineOptions);
  world = engine.world;
  
  textFont(tFont[fontSelect]);
  strokeJoin(ROUND);

  frameRate(fps);

  $("#handle2").roundSlider({
    animation:false,
    min:0,
    max:TWO_PI,
    sliderType: "default",
    radius:50,
    handsRadius: 50,
    showTooltip: false,
    width: 50,
    value: 3/2 * PI,
    step: 0.001,
    handleSize: 0,
    handleShape: "square",
    tooltipFormat: "adjustGravity"
  });

  // TYPE PIECES
  if(setMode == 0){
    dropGroupHour = new DropAll(0);    
  } else if(setMode == 1){
    dropGroupHour = new DropAll(0);    
    dropGroupMin = new DropAll(1);
  } else if(setMode == 2){
    dropGroupHead = new DropAll(2);
  } else if(setMode == 3){
    dropGroupParticles = new PartPac();
  }

  // BOUNDARY
  for(var m = 0; m < boundCount; m++){
    boundaries.push(new Boundary(0, 0, height + width, borderPadding * 2, 0));
  }
  positionBoundaries();
  spokeBound = new Particle(width/2, height/2, 30, true);
  // CLOCK HANDS
  secHand = new Hand(width/2, height/2, secHandLength, 5, 0);
  minHand = new Hand(width/2, height/2, minHandLength, 10, 1);
  hourHand = new Hand(width/2, height/2, hourHandLength, 20, 2);

  // MOUSE THINGS
  let canvasMouse = Mouse.create(canvas.elt);
  let options = { mouse: canvasMouse, }
  canvasMouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function draw() {
  world.gravity.x = cos(gravityAng);
  world.gravity.y = sin(gravityAng);
  world.gravity.scale = gravityStrength;

  background(bkgdColor);

  Engine.update(engine);

  // for(m = 0; m < boundaries.length; m++){
  //   boundaries[m].show();
  // }

  if(styleMode == 0){
    stroke(fillColor);
    noFill();
    strokeWeight(borderDraw);
    ellipse(width/2, height/2, clockBorder);    
  } else if(styleMode == 1){
    stroke(fillColor);
    noFill();
    strokeWeight(3);
    ellipse(width/2, height/2, clockBorder);
  } else {
    background(fillColor);
    fill(handColor);
    noStroke();
    ellipse(width/2, height/2, clockBorder);
  }

  fill(fillColor);
  if(dropGroupHour != null){ dropGroupHour.run(); }
  if(dropGroupMin != null){ dropGroupMin.run(); }
  if(dropGroupHead != null){ dropGroupHead.run(); }
  if(dropGroupParticles != null){ dropGroupParticles.run(); }

  minHand.show();
  hourHand.show();
  noStroke();
  fill(handColor);
  ellipse(width/2, height/2, 50, 50);
  secHand.show();
  fill(accentColor);
  ellipse(width/2, height/2, 20, 20);
  
  runClock();

  if(resetMode == 1){
    if(frameCount%(fps * 5) == 0){
      resetPos();
    }
  } else if(resetMode == 2){
    if(holdMin != minute()){
      resetPos();
      holdMin = minute();
    }
  }
  // if(frameCount%(fps * 8) == 0){
  //   resetPos();
  // }

  if(borderDraw > 0.1){
    borderDraw -= 0.05;
  } else {
    borderDraw = 0;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  configureClock();
  positionBoundaries();
}

function runClock(){
  ///////// secHand
  var currentSec = second();
  if(secHold != currentSec){
    smoothAng = 0;
    secHold = currentSec;
  } else {
    smoothAng += secSmoothAng;
  }

  secAngle = map(currentSec, 0, 60, -PI/2, PI * 3/2) + smoothAng;
  var secX = width/2 + cos(secAngle) * (secHandLength/2 - 50);
  var secY = height/2 + sin(secAngle) * (secHandLength/2 - 50);

  Matter.Body.setPosition(secHand.body, {x: secX, y: secY});
  Matter.Body.setAngle(secHand.body, secAngle);

  ///////// minHand
  minAngle = map(minute(), 0, 60, -PI/2, PI * 3/2);
  var minX = width/2 + cos(minAngle) * minHandLength/2;
  var minY = height/2 + sin(minAngle) * minHandLength/2;

  Matter.Body.setPosition(minHand.body, {x: minX, y: minY});
  Matter.Body.setAngle(minHand.body, minAngle);

  ///////// hourHand
  hourAngle = map(hour(), 0, 12, -PI/2, PI * 3/2);
  var hourX = width/2 + cos(hourAngle) * hourHandLength/2;
  var hourY = height/2 + sin(hourAngle) * hourHandLength/2;

  Matter.Body.setPosition(hourHand.body, {x: hourX, y: hourY});
  Matter.Body.setAngle(hourHand.body, hourAngle);
}

function configureClock(){
  if(width > height){
    handsRadius = (height)/2 * fullScale;
  } else {
    handsRadius = (width)/2 * fullScale;
  }
  borderRadius = handsRadius * 2 + 6;

  var holdSec = secHandLength;
  secHandLength = handsRadius;
  var secFactor = secHandLength/holdSec;

  var holdMin = minHandLength;
  minHandLength = handsRadius * 3/4;
  var minFactor = minHandLength/holdMin
  
  var holdHour = hourHandLength;
  hourHandLength = handsRadius/2;
  var hourFactor = hourHandLength/holdHour

  clockBorder = (handsRadius + borderExtra - 25) * 2;

  if(secHand != null){
    Matter.Body.setAngle(secHand.body, 0);
    Matter.Body.setAngle(minHand.body, 0);
    Matter.Body.setAngle(hourHand.body, 0);
    Matter.Body.scale(secHand.body, secFactor, 1);
    Matter.Body.scale(minHand.body, minFactor, 1);
    Matter.Body.scale(hourHand.body, hourFactor, 1);
    Matter.Body.setAngle(secHand.body, secAngle);
    Matter.Body.setAngle(minHand.body, minAngle);
    Matter.Body.setAngle(hourHand.body, hourAngle);

    secHand.w = secHandLength;
    minHand.w = minHandLength;
    hourHand.w = hourHandLength;

    Matter.Body.setPosition(spokeBound.body, {x: width/2, y: height/2});
  }

  pgTextSizeHourMax = ((TWO_PI * handsRadius)/keyTextHour.length) * 1.5;
  pgTextSizeMinMax = ((TWO_PI * (handsRadius - pgTextSizeHourMax))/inputTextMin.length) * 0.75;
  if(inputTextTop.length > inputTextBottom.length){
    pgTextSizeHeadMax = ((PI * handsRadius)/inputTextTop.length) * 1.0;
  } else {
    pgTextSizeHeadMax = ((PI * handsRadius)/inputTextBottom.length) * 1.0;
  }

  pgTextSizeHour = textScaler * pgTextSizeHourMax;
  pgTextSizeMin = textScaler * pgTextSizeMinMax;
  pgTextSizeHead = textScaler * pgTextSizeHeadMax;
}

function positionBoundaries(){
  var boundAng = TWO_PI/boundCount;

  clockBorder = (handsRadius + borderExtra - 25) * 2;

  for(var m = 0; m < boundCount; m++){
    var ang = m * boundAng;
    // var rad = (handsRadius + borderPadding + borderExtra - 25);
    var rad = (clockBorder)/2 + borderPadding;

    var xB = width/2 + cos(ang) * rad;
    var yB = height/2 + sin(ang) * rad;

    Matter.Body.setPosition(boundaries[m].body, {x: xB, y: yB});
    Matter.Body.setAngle(boundaries[m].body, ang + PI/2);    
  }
}

function randomStart(){
  var ran = int(random(8));

  if(ran == 0){             ////////////////////////////////// DEFAULT

  } else if(ran == 1){      ////////////////////////////////// GRAVITY WITH HOURS & MINS
    fontSelect = 1;
    document.getElementById('font1').selected = true;
    
    setMode = 1;
    document.getElementById('setHours').checked = false;
    document.getElementById('setHoursMin').checked = true;
    document.getElementById('setText').checked = false;
    document.getElementById('setParticle').checked = false;

    textScaler = 1.25;
    document.getElementById('textScaler').value = 65;

    gravityStrength = 0.00025;
    document.getElementById('gravityStrength').value = 50;

    bkgdColor = '#5080bf'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#ffffff'; document.getElementById('fillColor').value = fillColor;
    handColor = '#000000'; document.getElementById('handColor').value = handColor;
    accentColor = '#f2aec7'; document.getElementById('accentColor').value = accentColor;
  } else if(ran == 2){      ////////////////////////////////// HEAVY TYPE, GRAVITY
    fontSelect = 0;
    document.getElementById('font0').selected = true;
    
    setMode = 0;
    document.getElementById('setHours').checked = true;
    document.getElementById('setHoursMin').checked = false;
    document.getElementById('setText').checked = false;
    document.getElementById('setParticle').checked = false;

    styleMode = 2;
    document.getElementById('style2').selected = true;

    textScaler = 1.75;
    document.getElementById('textScaler').value = 80;

    gravityStrength = 0.00025;
    document.getElementById('gravityStrength').value = 50;

    borderExtra = 100;
    document.getElementById('padFactor').value = 20;

    bkgdColor = '#000000'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#f2b441'; document.getElementById('fillColor').value = fillColor;
    handColor = '#ffffff'; document.getElementById('handColor').value = handColor;
    accentColor = '#f2aec7';document.getElementById('accentColor').value = accentColor;
  } else if(ran == 3){      ////////////////////////////////// TEXT VERSION, W/ EDITORIAL
    fontSelect = 3;
    document.getElementById('font3').selected = true;

    setMode = 2;
    document.getElementById('setHours').checked = false;
    document.getElementById('setHoursMin').checked = false;
    document.getElementById('setText').checked = true;
    document.getElementById('setParticle').checked = false;

    resetMode = 1;
    document.getElementById('resetNever').checked = false;
    document.getElementById('reset5sec').checked = true;
    document.getElementById('reset1min').checked = false;

    bkgdColor = '#000000'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#ffffff'; document.getElementById('fillColor').value = fillColor;
    handColor = '#5080bf'; document.getElementById('handColor').value = handColor;
    accentColor = '#f24535'; document.getElementById('accentColor').value = accentColor;
  } else if(ran == 4){      ////////////////////////////////// GILWAY, RAN ANGLE
    fontSelect = 2;
    document.getElementById('font2').selected = true;

    textScaler = 1.75;
    document.getElementById('textScaler').value = 65;

    setMode = 1;
    document.getElementById('setHours').checked = false;
    document.getElementById('setHoursMin').checked = true;
    document.getElementById('setText').checked = false;
    document.getElementById('setParticle').checked = false;

    gravityAng = random(TWO_PI);
    document.getElementById('handle2').value = gravityAng;

    gravityStrength = 0.00025;
    document.getElementById('gravityStrength').value = 50;

    borderExtra = 100;
    document.getElementById('padFactor').value = 20;

    bkgdColor = '#000000'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#f2aec7'; document.getElementById('fillColor').value = fillColor;
    handColor = '#f2b441'; document.getElementById('handColor').value = handColor;
    accentColor = '#ffffff'; document.getElementById('accentColor').value = accentColor;
  } else if(ran == 5){      ////////////////////////////////// TEXT VERSION, W/ EDITORIAL
    fontSelect = 1;
    document.getElementById('font1').selected = true;

    setMode = 2;
    document.getElementById('setHours').checked = false;
    document.getElementById('setHoursMin').checked = false;
    document.getElementById('setText').checked = true;

    resetMode = 1;
    document.getElementById('resetNever').checked = true;
    document.getElementById('reset5sec').checked = false;
    document.getElementById('reset1min').checked = false;
    document.getElementById('setParticle').checked = false;

    textScaler = 1.5;
    document.getElementById('textScaler').value = 60;

    document.getElementById('topBotText').style.display = "block"
    keyTextTop = "ABCDEFGHIJ";
    document.getElementById('textTop').value = keyTextTop;
    keyTextBottom = "MNOPQRST";
    document.getElementById('textBot').value = keyTextBottom;

    gravityStrength = 0.00025;
    document.getElementById('gravityStrength').value = 50;

    bkgdColor = '#000000'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#ffffff';document.getElementById('fillColor').value = fillColor;
    handColor = '#f24535'; document.getElementById('handColor').value = handColor;
    accentColor = '#f2b441'; document.getElementById('accentColor').value = accentColor;
  } else if(ran == 6){      ////////////////////////////////// PARTICLES
    setMode = 3;
    document.getElementById('setHours').checked = false;
    document.getElementById('setHoursMin').checked = false;
    document.getElementById('setText').checked = false;
    document.getElementById('setParticle').checked = true;

    resetMode = 1;
    document.getElementById('resetNever').checked = true;
    document.getElementById('reset5sec').checked = false;
    document.getElementById('reset1min').checked = false;

    bkgdColor = '#000000'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#5080bf'; document.getElementById('fillColor').value = fillColor;
    handColor = '#f2aec7'; document.getElementById('handColor').value = handColor;
    accentColor = '#ffffff'; document.getElementById('accentColor').value = accentColor;
  } else if(ran == 7){      ////////////////////////////////// PARTICLES
    setMode = 3;
    document.getElementById('setHours').checked = false;
    document.getElementById('setHoursMin').checked = false;
    document.getElementById('setText').checked = false;
    document.getElementById('setParticle').checked = true;

    resetMode = 1;
    document.getElementById('resetNever').checked = false;
    document.getElementById('reset5sec').checked = true;
    document.getElementById('reset1min').checked = false;

    bkgdColor = '#f2b441'; document.getElementById('bkgdColor').value = bkgdColor;
    fillColor = '#ffffff'; document.getElementById('fillColor').value = fillColor;
    handColor = '#000000'; document.getElementById('handColor').value = handColor;
    accentColor = '#f2b441'; document.getElementById('accentColor').value = accentColor;

    gravityStrength = 0.00025;
    document.getElementById('gravityStrength').value = 50;
  } 
}