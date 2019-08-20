var segmentCount, segmentSpace, segmentLength;
var depth, typeHeight, tracking;
var typeStroke;
var xCenter, yCenter;
var radius, side, textDirect;
var sinStep, step;
var jumper = 0;
var count = 1;
var zSpace, xSpace;
var middleStretch = 2;

var bkgdColor, textColor, textColorAdjust;
var inp1, inp2, inp3, inp4, inp5;
var inpNumber = 3;
var typeX, typeY;
var zCamera, rotX, rotY, rotZ;
var SA;

var latX;
var letXspeed;
var speed;

// STRING
var letter_select, inp, inpText, runLength;
var myText = [];

// SAVE BETA
var gifLength = 250;
var gifStart, gifEnd;
var gifRecord = false;
var canvas;

var capturer = new CCapture( {
     framerate: 60,
     format:'gif',
     workersPath: 'js/',
    verbose: true
} );

function preload() {
  font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup() {
  var p5SaveCanvas = createCanvas(windowWidth, windowHeight,WEBGL);
  canvas = p5SaveCanvas.canvas;
    
  background(0);
//  frameRate(30);
//  noSmooth();
  textFont(font);

  inp = select("#textfield");

  segmentSpaceSlider = createSlider(0,100,15);segmentSpaceSlider.position(25, 30);segmentSpaceSlider.style('width', '100px');  
  segmentCountSlider = createSlider(0,50,15);segmentCountSlider.position(25, 60);segmentCountSlider.style('width', '100px');  
  typeHeightSlider = createSlider(0,100,30);typeHeightSlider.position(25, 90);typeHeightSlider.style('width', '100px');   
  trackingSlider = createSlider(0,100,30);trackingSlider.position(25, 120);trackingSlider.style('width', '100px');   
  typeStrokeSlider = createSlider(0,2,1,0.1);typeStrokeSlider.position(25, 150);typeStrokeSlider.style('width', '100px');

  speedSlider = createSlider(0,1,0.1,0.01);speedSlider.position(25, 210);speedSlider.style('width', '100px');
  
  depthSlider = createSlider(0,200,30);depthSlider.position(25, 270);depthSlider.style('width', '100px');
  middleStretchSlider = createSlider(0,6,0.5,0.1);middleStretchSlider.position(25, 300);middleStretchSlider.style('width', '100px');
  countSlider = createSlider(0,10,1);countSlider.position(25, 330);countSlider.style('width', '100px');
  zSpaceSlider = createSlider(1, 3, 1, 0.01);zSpaceSlider.position(25, 360);zSpaceSlider.style('width', '100px');
  xSpaceSlider = createSlider(0, 2, 0,0.01);xSpaceSlider.position(25, 390);xSpaceSlider.style('width', '100px');
  altCheck = createCheckbox('', false);altCheck.position(50, 405);
  
  scalerSlider = createSlider(0, 3, 1.6, 0.01);scalerSlider.position(25, 440);scalerSlider.style('width', '100px');
  
  rotXslider = createSlider(-3.14, 3.14, -1.79, 0.01);rotXslider.position(25, height-170);rotXslider.style('width', '100px');
  rotYslider = createSlider(-3.14, 3.14, 0, 0.01);rotYslider.position(25, height-140);rotYslider.style('width', '100px');
  rotZslider = createSlider(-3.14, 3.14, -0.4, 0.01);rotZslider.position(25, height-110);rotZslider.style('width', '100px');
  
  inp0check = createCheckbox('', false);inp0check.position(150, 57);
  gradientCheck = createCheckbox('', true);gradientCheck.position(150, 77);
  bSideCheck = createCheckbox('', true);bSideCheck.position(150, 97);
  inp1 = createColorPicker('#0000ff');inp1.position(170, 125);inp1.style('width', '20px');
  inp1check = createCheckbox('', true);inp1check.position(150, 127);
  inp2 = createColorPicker('#ff0000');inp2.position(170, 155);inp2.style('width', '20px');
  inp2check = createCheckbox('', true);inp2check.position(150, 157);
  inp3 = createColorPicker('#ffff00');inp3.position(170, 185);inp3.style('width', '20px');
  inp3check = createCheckbox('', true);inp3check.position(150, 187);
  inp4 = createColorPicker('#fff');inp4.position(170, 215);inp4.style('width', '20px');
  inp4check = createCheckbox('', false);inp4check.position(150, 217);
  inp5 = createColorPicker('#000000');inp5.position(170, 245);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(150, 247);
  
  bkgdColorPicker = createColorPicker('#ffffff');bkgdColorPicker.position(152, 340);bkgdColorPicker.style('width', '40px');
  textColorPicker = createColorPicker('#000000');textColorPicker.position(152, 295);textColorPicker.style('width', '40px');

  inp1check.changed(inp1checker); inp2check.changed(inp2checker); inp3check.changed(inp3checker); inp4check.changed(inp4checker); inp5check.changed(inp5checker);
  
  basicSet = createButton('Basic'); basicSet.position(25,height-60); basicSet.mousePressed(basic);
  streamerSet = createButton('Streamers'); streamerSet.position(75,height-60); streamerSet.mousePressed(streamer);
  terraceSet = createButton('Terrace'); terraceSet.position(150,height-60); terraceSet.mousePressed(terrace);
  linkSet = createButton('Link'); linkSet.position(210,height-60); linkSet.mousePressed(link);
  seaSet = createButton('Sea'); seaSet.position(253,height-60); seaSet.mousePressed(sea);
  riverSet = createButton('River'); riverSet.position(295,height-60); riverSet.mousePressed(river);
  
  webRibbonSet = createButton('Web Art'); webRibbonSet.position(25,height-35); webRibbonSet.mousePressed(webRibbon);
  primarySet = createButton('Primary'); primarySet.position(90,height-35); primarySet.mousePressed(primary);
  snakeSet = createButton('Snake'); snakeSet.position(153,height-35); snakeSet.mousePressed(snake);
  hotcoldSet = createButton('Hot/Cold'); hotcoldSet.position(208,height-35); hotcoldSet.mousePressed(hotcold);
  trackSet = createButton('Track'); trackSet.position(280,height-35); trackSet.mousePressed(track);
  track2Set = createButton('Track II'); track2Set.position(330,height-35); track2Set.mousePressed(track2);
  
  saveLoopSet = createButton('Save Loop'); saveLoopSet.position(150, 20); saveLoopSet.mousePressed(saveLoop); 
    
  inp0check.changed(inp0checker);
  gradientCheck.changed(gradientChecker);
}

function draw() {
  if(gifRecord == true){
    pixelDensity(1);
  } else {
    pixelDensity();
  } 

  ortho(-width/2, width/2, -height/2, height/2,-5000,5000);  
    
  bkgdColor = color(bkgdColorPicker.value());
  textColor = color(textColorPicker.value());
  background(bkgdColor);
  noStroke(); textSize(10);
  inpText = String(inp.value());
  runLength = inpText.length;
  sinStep = PI/segmentCount;  
  
  segmentSpace = segmentSpaceSlider.value();
  segmentCount = segmentCountSlider.value();
  
  typeHeight = typeHeightSlider.value();
  tracking = trackingSlider.value();
  rotX = rotXslider.value();
  rotY = rotYslider.value();
  rotZ = rotZslider.value();
  speed = speedSlider.value();
  scaler = scalerSlider.value();
  depth = depthSlider.value();
  typeStroke = typeStrokeSlider.value();
  SA = typeStroke/2;
  middleStretch = middleStretchSlider.value();
  count = countSlider.value();
  zSpace = zSpaceSlider.value();
  xSpace = xSpaceSlider.value();
  
  segmentLength = segmentCount*segmentSpace;
  radius = (segmentLength)/PI;

//  fill(255); noStroke();
//  ellipse(0,0,5,5);
  
  textColorAdjust = lerpColor(bkgdColor,textColor,0.01);

  push();  
  scale(scaler);
  rotateX(rotX);
  rotateY(rotY);
  rotateZ(rotZ + PI);

  let yCrawl = (runLength+frameCount*speed)/(segmentCount + segmentCount*middleStretch) * radius*2;
  let ribbonHeight = runLength/(segmentCount + segmentCount*middleStretch) * radius*2.25;
  let ribbonHeight2 = (count-1)*xSpace*radius*2;

  let ribbonWidth = segmentLength*middleStretch;
  
  if(altCheck.checked() == true){
    translate(-ribbonWidth/2,-yCrawl + ribbonHeight/2 - radius,-depth*(count-1)/2 - (count-1)*(zSpace-1)*depth/2);
  } else {
    translate(-ribbonWidth/2,-yCrawl + ribbonHeight/2 - (ribbonHeight2)/2,-depth*(count-1)/2 - (count-1)*(zSpace-1)*depth/2);
  }
  
  rectMode(CENTER);
  
  for(var j = 0; j<count; j++){
    for(var i = frameCount*speed; i<runLength+frameCount*speed; i++){
      step = i%(2*segmentCount + 2*segmentCount*middleStretch);
      
      if(gradientCheck.checked() == true){
        setGradient(i - frameCount*speed);
      } else {
        ribbonColor = color(inp1.value());
      }
      
      letter_select = runLength - round(i + 1 - frameCount*speed);
      jumper = floor(i/(segmentCount*2 + 2*segmentCount*middleStretch));
    
      xCenterPre = xCenter;
      yCenterPre = yCenter;
      
      if(i%(2*segmentCount + 2*segmentCount*middleStretch)<=(segmentCount*middleStretch)){
//        step = i%(segmentCount*2 + 2*segmentCount*middleStretch);
        xCenter = step * segmentSpace;
        yCenter = jumper*radius*4;
        rot = 0;
        side = 1; textDirect = -1;
      } else if (i%(2*segmentCount + 2*segmentCount*middleStretch)<=(segmentCount + segmentCount*middleStretch)){
        step -= segmentCount*middleStretch;
        xCenter = segmentLength*middleStretch;
        yCenter = jumper*radius*4;
        rot = step*sinStep;
        side = 1; textDirect = -1;
      } else if (i%(2*segmentCount + 2*segmentCount*middleStretch)<=(segmentCount + 2*segmentCount*middleStretch)){
        step -= (segmentCount*middleStretch + segmentCount);
        xCenter = segmentLength*middleStretch - step*segmentSpace;
        yCenter = radius*2 + jumper*radius*4;
        rot = 0;
        side = -1; textDirect = 1;
      } else if (i%(2*segmentCount + 2*segmentCount*middleStretch)<=(2*segmentCount + 2*segmentCount*middleStretch)) {
        step -= (segmentCount*middleStretch + segmentCount);
        xCenter = 0;
        yCenter = radius*2 + jumper*radius*4;
        rot = -step*sinStep + PI*middleStretch;
        side = -1; textDirect = 1;
      }
    
      typeX = (segmentSpace - (tracking/100)*segmentSpace) * textDirect;
      typeY = depth - (typeHeight/100)*depth;
    
      let trackingAdjust = (tracking/100)*segmentSpace * -textDirect;
      let typeHeightAdjust = (typeHeight/100)*depth;
      
      push();
        if(altCheck.checked() == true){
          translate(xCenter, yCenter + (j%2)*radius*2, j*depth*zSpace);
        } else {
          translate(xCenter, yCenter + j*xSpace*radius*2, j*depth*zSpace);
        }
  
      rotateZ(rot);
        translate(0,-radius);
        rotateX(PI/2);
      
        if(inp0check.checked()==false){
          stroke(ribbonColor); fill(ribbonColor);
          strokeWeight(2);
          rect(0,0,segmentSpace,depth);
          if(bSideCheck.checked()==true){
            translate(0,0,side);
            fill(textColor); stroke(textColor);
            rect(0,0,segmentSpace,depth);
          }
        }
        if(bSideCheck.checked()==true){
          translate(-typeX/2,-depth/2 + typeHeightAdjust/2,-3*side/2);
        } else {
          translate(-typeX/2,-depth/2 + typeHeightAdjust/2,0);        
        }
        noFill(); stroke(textColor); strokeWeight(typeStroke);
        keyboardEngine();
      
        if(inp0check.checked()==true){
          translate(0,0,side/2);
          noFill(); stroke(textColorAdjust); strokeWeight(typeStroke);
          keyboardEngine();
        }
      pop();
    }
  }
  pop();

fill(textColor);
  if(gifRecord == false){
      push();
        translate(-width/2,-height/2);
        text("Segment Space " + segmentSpace,25,30);
        text("Segment Count " + segmentCount,25,60);
        text("Type Height " + typeHeight,25,90);
        text("Tracking " + tracking,25,120);
        text("Type Stroke " + typeStroke,25,150);

        text("Speed " + speed,25,210);

        text("Ribbon Height " + depth,25,270);
        text("Ribbon Stretch " + middleStretchSlider.value(),25,300);
        text("Ribbon Count " + count,25,330);
        text("Ribbon Spacing " + zSpace,25,360);
        text("Ribbon Offset " + xSpace,25,390);
        text("Alternate ",70,420);
        text("Scale " + scalerSlider.value(),25,440);

        text("Rotate X " + rotX,25,height-170);
        text("Rotate Y " + rotY,25,height-140);
        text("Rotate Z " + rotZ,25,height-110);

        text("PRESETS", 25,height-70);

        text("No stripes", 172,70);
        text("Gradient Mode", 172,90);
        text("B-Side Color", 172,110);
        text("A-Side", 205,143);
        text("BACKGROUND", 152,335);
        text("B-SIDE/TEXT", 152,290);
        translate(205,165);
        rotateZ(PI/2);
        text("Gradient Steps",0,0);
      pop();
  }    
    
    if(gifRecord == true && frameCount==(gifStart+1)){
      capturer.start();
      capturer.capture(canvas);
      print("start");
    } else if(gifRecord == true && frameCount<=gifEnd){
      capturer.capture(canvas);
      print("record");
    } else if (gifRecord == true && frameCount==gifEnd+1) {
      capturer.stop();
      capturer.save();
      print("stop");
      gifRecord = false;
    }
}

function inp1checker() {
  inp2check.checked(false);inp3check.checked(false);inp4check.checked(false);inp5check.checked(false);
  inpNumber = 1;
}

function inp2checker() {
  inp1check.checked(true);inp3check.checked(false);inp4check.checked(false);inp5check.checked(false);
  if(this.checked()) { inpNumber = 2; } else { inpNumber = 1;}
}

function inp3checker() {
  inp1check.checked(true);inp2check.checked(true);inp4check.checked(false);inp5check.checked(false);
  if(this.checked()) {inpNumber = 3; } else { inpNumber = 2;}
}

function inp4checker() {
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp5check.checked(false);
  if(this.checked()) { inpNumber = 4; } else { inpNumber = 3;}
}

function inp5checker() {
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true);
  if(this.checked()){ inpNumber = 5; } else { inpNumber = 4; }
}

function inp0checker() {
  gradientCheck.checked(false);
  bSideCheck.checked(false);
  	inp1check.checked(false);
    inp2check.checked(false);
    inp3check.checked(false);
  	inp4check.checked(false);
    inp5check.checked(false);
}

function gradientChecker() {
  inp0check.checked(false);
}

function setGradient(switcher) {
  if (inpNumber == 5 || inpNumber ==6) {
    let from = color(inp1.value());
    let mid = color(inp2.value());
    let mid2 = color(inp3.value());
    let mid3 = color(inp4.value());
    let to = color(inp5.value());    
    if(switcher<=(runLength/4)) {
      ribbonColor = lerpColor(from,mid,switcher/(runLength/4));
      strkColor = from;
    } else if (switcher>(runLength/4) && switcher<=(runLength/2)) {
      ribbonColor = lerpColor(mid,mid2,(switcher-runLength/4)/(runLength/4));
      strkColor = mid;
    } else if (switcher>(runLength/2) && switcher<=(3*runLength/4)) {
      ribbonColor = lerpColor(mid2,mid3,(switcher-runLength/2)/(runLength/4));
      strkColor = mid2;
    } else {
      ribbonColor = lerpColor(mid3,to,(switcher-3*runLength/4)/(runLength/4));
      strkColor = mid3;
    }
  } else if (inpNumber == 4) {
    let from = color(inp1.value());
    let mid = color(inp2.value());
    let mid2 = color(inp3.value());
    let to = color(inp4.value());
    if(switcher<=(runLength/3)) {
      ribbonColor = lerpColor(from,mid,switcher/(runLength/3));
      strkColor = from;
    } else if (switcher>(runLength/3) && switcher<=(2*runLength/3)) {
      ribbonColor = lerpColor(mid,mid2,(switcher-runLength/3)/(runLength/3));
      strkColor = mid;
    } else {
      ribbonColor = lerpColor(mid2,to,(switcher-2*runLength/3)/(runLength/3));
      strkColor = mid2;
    }
  } else if (inpNumber == 3) {
    let from = color(inp1.value());
    let mid = color(inp2.value());
    let to = color(inp3.value());
    if(switcher<=(runLength/2)) {
      ribbonColor = lerpColor(from,mid,switcher/(runLength/2));
      strkColor = from;
    } else {
      ribbonColor = lerpColor(mid,to,(switcher-runLength/2)/(runLength/2));
      strkColor = mid;
    }
    } else if (inpNumber == 2) {
      let from = color(inp1.value());
      let to = color(inp2.value());
      ribbonColor = lerpColor(from,to,switcher/runLength);
      strkColor = from;
    } else if (inpNumber == 1) {
      let from = color(inp1.value());
      let to = color(bkgdColorPicker.value());
      ribbonColor = lerpColor(from,to,switcher/runLength);
      strkColor = to;
  }
}

function reset() {
  segmentSpaceSlider.value(10); segmentCountSlider.value(20); typeHeightSlider.value(30); trackingSlider.value(30);
  typeStrokeSlider.value(1); speedSlider.value(0.1); depthSlider.value(30); middleStretchSlider.value(1);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(1);
  
  rotXslider.value(-2.1); rotYslider.value(0.78); rotZslider.value(0);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(false); altCheck.checked(false);
  
  inp1.value('#0000ff');inp2.value('#ff0000');inp3.value('#ffff00');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value(" Somewhere something incredible is waiting to be known. Somewhere something incredible is waiting to be known. ");
  
  inpNumber = 3;
  bkgdColorPicker.value('#212121'); textColorPicker.value('#ffffff');
  
}  

function basic() {
  reset();
  
  segmentSpaceSlider.value(8); segmentCountSlider.value(27); typeHeightSlider.value(56); trackingSlider.value(30);
  typeStrokeSlider.value(1.4); speedSlider.value(0.32); depthSlider.value(30); middleStretchSlider.value(0.2);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(2);
  
  rotXslider.value(-1.87); rotYslider.value(-0.56); rotZslider.value(-0.56);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(true); altCheck.checked(false);
  
  inp1.value('#ff0000');inp2.value('#FF9300');inp3.value('#ffff00');inp4.value('#00ff00');inp5.value('#0000ff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value(" We have been taking into our mouths the bodies of dead birds. We have been taking into our mouths the bodies of dead birds. ");
  
  inpNumber = 5;
  bkgdColorPicker.value('#ffffff'); textColorPicker.value('#000000');
} 

function river() {
  reset();

  segmentSpaceSlider.value(10); segmentCountSlider.value(20); typeHeightSlider.value(64); trackingSlider.value(30);
  typeStrokeSlider.value(1); speedSlider.value(0.1); depthSlider.value(74); middleStretchSlider.value(0);
  
  countSlider.value(7); zSpaceSlider.value(1.11); xSpaceSlider.value(0.63); scalerSlider.value(1.32);
  
  rotXslider.value(-1.82); rotYslider.value(0.22); rotZslider.value(-0.43);
  
  inp0check.checked(true); gradientCheck.checked(false); bSideCheck.checked(false); altCheck.checked(false);
  
  inp1check.checked(false); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" Somewhere something incredible is waiting to be known. Somewhere something incredible is waiting to be known. Somewhere something incredible is waiting to be known. ");
  
  inpNumber = 0;
  bkgdColorPicker.value('#0000ff'); textColorPicker.value('#ffffff');
} 

function streamer() {
  reset();
  segmentSpaceSlider.value(23); segmentCountSlider.value(22); typeHeightSlider.value(25); trackingSlider.value(40);
  typeStrokeSlider.value(2); speedSlider.value(0.4); depthSlider.value(56); middleStretchSlider.value(0);
  
  countSlider.value(4); zSpaceSlider.value(1.62); xSpaceSlider.value(1.3); scalerSlider.value(1.04);
  
  rotXslider.value(-1.91); rotYslider.value(0.56); rotZslider.value(-0.53);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(true); altCheck.checked(false);
  
  inp1.value('#FFFC79');inp2.value('#FF2F92');inp3.value('#011993');inp4.value('#0096FF');inp5.value('#ffffff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" THE SEA IS A DESERT OF WAVES, A WILDERNESS OF WATER. THE SEA IS A DESERT OF WAVES, A WILDERNESS OF WATER. THE SEA IS A DESERT OF WAVES, A WILDERNESS OF WATER. ");
  
  inpNumber = 4;
  bkgdColorPicker.value('#212121'); textColorPicker.value('#ffffff');
}  

function terrace() {
  reset();
  segmentSpaceSlider.value(14); segmentCountSlider.value(17); typeHeightSlider.value(30); trackingSlider.value(30);
  typeStrokeSlider.value(1); speedSlider.value(0.3); depthSlider.value(40); middleStretchSlider.value(0.7);
  
  countSlider.value(8); zSpaceSlider.value(1.40); xSpaceSlider.value(0.23); scalerSlider.value(2);
  
  rotXslider.value(-1.2); rotYslider.value(0.14); rotZslider.value(-0.95);
  
  inp0check.checked(false); gradientCheck.checked(false); bSideCheck.checked(true); altCheck.checked(false);
  
  inp1.value('#ffffff');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" and sailed back over a year and in and out of weeks and through a day and sailed back over a year ");
  
  inpNumber = 1;
  bkgdColorPicker.value('#000000'); textColorPicker.value('#000000');
}

function link() {
  reset();
  segmentSpaceSlider.value(17); segmentCountSlider.value(12); typeHeightSlider.value(55); trackingSlider.value(30);
  typeStrokeSlider.value(1.5); speedSlider.value(0.2); depthSlider.value(45); middleStretchSlider.value(0);
  
  countSlider.value(8); zSpaceSlider.value(2.10); xSpaceSlider.value(0); scalerSlider.value(0.96);
  
  rotXslider.value(-2.18); rotYslider.value(-0.09); rotZslider.value(-1.13);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(true); altCheck.checked(true);
  
  inp1.value('#0096FF');inp2.value('#FF0000');inp3.value('#FFFF00');inp4.value('#000000');inp5.value('#ffffff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value("       WHICH CAME FIRST - THE OBSERVER OR THE PARTICLE?       ");
  
  inpNumber = 3;
  bkgdColorPicker.value('#ffffff'); textColorPicker.value('#000000');
}

function sea() {
  reset();
  segmentSpaceSlider.value(11); segmentCountSlider.value(20); typeHeightSlider.value(80); trackingSlider.value(30);
  typeStrokeSlider.value(1.5); speedSlider.value(0.4); depthSlider.value(60); middleStretchSlider.value(0);
  
  countSlider.value(9); zSpaceSlider.value(1.95); xSpaceSlider.value(0); scalerSlider.value(1);
  
  rotXslider.value(-1.25); rotYslider.value(-0.44); rotZslider.value(-0.58);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(true); altCheck.checked(true);
  
  inp1.value('#FFD479');inp2.value('#73FDFF');inp3.value('#0096FF');inp4.value('#FF8AD8');inp5.value('#ff0000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value(" Somewhere something Somewhere something Somewhere something Somewhere something Somewhere something Somewhere something ");
  
  inpNumber = 5;
  bkgdColorPicker.value('#000000'); textColorPicker.value('#005493');
} 


function webRibbon() {
  reset();
  segmentSpaceSlider.value(10); segmentCountSlider.value(25); typeHeightSlider.value(30); trackingSlider.value(30);
  typeStrokeSlider.value(1); speedSlider.value(0.4); depthSlider.value(101); middleStretchSlider.value(0.9);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(1);
  
  rotXslider.value(2.04); rotYslider.value(-2.58); rotZslider.value(0.11);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(false); altCheck.checked(false);
  
  inp1.value('#0000ff');inp2.value('#ffff00');inp3.value('#ff0000');inp4.value('#000000');inp5.value('#ffffff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("                                                                                                                                                                                                            ");
  
  inpNumber = 5;
  bkgdColorPicker.value('#929292'); textColorPicker.value('#ffffff');
}  

function primary() {
  reset();
  segmentSpaceSlider.value(10); segmentCountSlider.value(20); typeHeightSlider.value(0); trackingSlider.value(0);
  typeStrokeSlider.value(2); speedSlider.value(0.2); depthSlider.value(111); middleStretchSlider.value(1.1);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(1.25);
  
  rotXslider.value(-0.6); rotYslider.value(-0.66); rotZslider.value(0.94);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(false); altCheck.checked(false);
  
  inp1.value('#ffffff');inp2.value('#0000ff');inp3.value('#ff0000');inp4.value('#ffff00');inp5.value('#ffffff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("======================================================================================================================================================================================================");
  
  inpNumber = 5;
  bkgdColorPicker.value('#ffffff'); textColorPicker.value('#000000');
}

function snake() {
  reset();
  segmentSpaceSlider.value(6); segmentCountSlider.value(33); typeHeightSlider.value(0); trackingSlider.value(0);
  typeStrokeSlider.value(1); speedSlider.value(0.5); depthSlider.value(85); middleStretchSlider.value(1);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(1);
  
  rotXslider.value(-0.58); rotYslider.value(-0.52); rotZslider.value(0.03);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(true); altCheck.checked(false);
  
  inp1.value('#000000');inp2.value('#ffffff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value("======================================================================================================================================================================================================");
  
  inpNumber = 2;
  bkgdColorPicker.value('#000000'); textColorPicker.value('#000000');
}

function hotcold() {
  reset();
  segmentSpaceSlider.value(7); segmentCountSlider.value(25); typeHeightSlider.value(0); trackingSlider.value(0);
  typeStrokeSlider.value(0); speedSlider.value(0.2); depthSlider.value(80); middleStretchSlider.value(1.2);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(1);
  
  rotXslider.value(-1.06); rotYslider.value(0.92); rotZslider.value(-0.42);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(false); altCheck.checked(false);
  
  inp1.value('#000000');inp2.value('#011993');inp3.value('#EF577A');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value("                                                                                                                                                                ");
  
  inpNumber = 3;
  bkgdColorPicker.value('#000000'); textColorPicker.value('#000000');
}

function track() {
  reset();
  segmentSpaceSlider.value(9); segmentCountSlider.value(19); typeHeightSlider.value(0); trackingSlider.value(100);
  typeStrokeSlider.value(2); speedSlider.value(0.1); depthSlider.value(106); middleStretchSlider.value(1.2);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(1.03);
  
  rotXslider.value(0.93); rotYslider.value(0.24); rotZslider.value(-2.19);
  
  inp0check.checked(false); gradientCheck.checked(true); bSideCheck.checked(true); altCheck.checked(false);
  
    inp1.value('#000000');inp2.value('#DF2519');inp3.value('#DCB76E');inp4.value('#094D83'); inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
  
  inpNumber = 5;
  bkgdColorPicker.value('#000000'); textColorPicker.value('#000000');
}

function track2() {
  reset();
  segmentSpaceSlider.value(13); segmentCountSlider.value(19); typeHeightSlider.value(0); trackingSlider.value(100);
  typeStrokeSlider.value(2); speedSlider.value(0.1); depthSlider.value(168); middleStretchSlider.value(1.2);
  
  countSlider.value(1); zSpaceSlider.value(1); xSpaceSlider.value(0); scalerSlider.value(2.1);
  
  rotXslider.value(-2.15); rotYslider.value(0.56); rotZslider.value(-2.19);
  
  inp0check.checked(false); gradientCheck.checked(false); bSideCheck.checked(false); altCheck.checked(false);
  
    inp1.value('#000000');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value("///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
  
  inpNumber = 1;
  bkgdColorPicker.value('#FF7E79'); textColorPicker.value('#ffffff');
}

function saveLoop() {
    var newSpeed = (2*segmentCount + 2*segmentCount*middleStretch)/gifLength;    
    print(newSpeed);
    
    if(confirm('Click OK to generate your gif.\nThe process will take a minute. Be patient, plz!')){
        speedSlider.value(newSpeed); 
        gifStart = frameCount;
        print(gifStart);
        gifEnd = gifStart + gifLength;
        print(gifEnd)
        gifRecord = true;       
    } else {
        gifRecord = false;
    }
}