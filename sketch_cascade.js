// LETTER
var typeX, typeY, typeStroke, tracking;

var lineSpace = 10;

var yBlock;
var yField;
var typeYfigure;
var rows = 4;
var SA;

// WAVE
var waveSize, waveLength;
var waveSpeed;
var slope;

var maxFrame;

// STRING
var letter_select, inp, inpText;
var myText = [];
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var bkgdColor = 0;
var inp1, inp2, inp3, inp4, inp5;
var inpNumber = 2;

// SAVE BETA
var gifLength = 157;
var gifStart, gifEnd;
var gifRecord = false;
var canvas;
var pdSave;

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
  var p5SaveCanvas = createCanvas(windowWidth, windowHeight);
  canvas = p5SaveCanvas.canvas;

//  pixelDensity(1);
  background(bkgdColor);
  smooth();
  textFont(font);

  inp = select("#textfield");

  typeXSlider = createSlider(0, 100, 20); typeXSlider.position(25, 20);typeXSlider.style('width', '100px');
  typeStrokeSlider = createSlider(0, 5, 2, 0.5);typeStrokeSlider.position(25, 50);typeStrokeSlider.style('width', '100px');
  trackingSlider = createSlider(0, 100, 10);trackingSlider.position(25, 80);trackingSlider.style('width', '100px');
  lineSpaceSlider = createSlider(0, 100, 20);lineSpaceSlider.position(25, 110);lineSpaceSlider.style('width', '100px');
  rowSlider = createSlider(0, 100, 14, 2);rowSlider.position(25, 160);rowSlider.style('width', '100px');

  mirrorCheck = createCheckbox('', false);mirrorCheck.position(25, 178);

  waveLengthSlider = createSlider(0, 1, 0.13, 0.01); waveLengthSlider.position(25, 220); waveLengthSlider.style('width', '100px');
  waveSpeedSlider = createSlider(0, 10, 1); waveSpeedSlider.position(25, 250); waveSpeedSlider.style('width', '100px');
  slopeSlider = createSlider(0, PI, 1, 0.1); slopeSlider.position(25, 280); slopeSlider.style('width', '100px');

  saveLoopSet = createButton('Save Loop'); saveLoopSet.position(140,10); saveLoopSet.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,35); prideButton.mousePressed(pride);

  gradientCheck = createCheckbox('', false);gradientCheck.position(150, 77);
  inp0check = createCheckbox('', false);inp0check.position(150, 57);
  inp1 = createColorPicker('#000000');inp1.position(170, 105);inp1.style('width', '20px');
  inp1check = createCheckbox('', true);inp1check.position(150, 107);
  inp2 = createColorPicker('#ffffff');inp2.position(170, 135);inp2.style('width', '20px');
  inp2check = createCheckbox('', false);inp2check.position(150, 137);
  inp3 = createColorPicker('#ff0000');inp3.position(170, 165);inp3.style('width', '20px');
  inp3check = createCheckbox('', false);inp3check.position(150, 167);
  inp4 = createColorPicker('#ffff00');inp4.position(170, 195);inp4.style('width', '20px');
  inp4check = createCheckbox('', false);inp4check.position(150, 197);
  inp5 = createColorPicker('#0000ff');inp5.position(170, 225);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(150, 227);

  bkgdColorPicker = createColorPicker('#FFFFFF');bkgdColorPicker.position(152, 280);bkgdColorPicker.style('width', '40px');

  inp1check.changed(inp1checker);
  inp2check.changed(inp2checker);
  inp3check.changed(inp3checker);
  inp4check.changed(inp4checker);
  inp5check.changed(inp5checker);

  checkerSet = createButton('Checker'); checkerSet.position(25,height-210); checkerSet.mousePressed(checker);
  cascadeSet = createButton('Cascade'); cascadeSet.position(90,height-210); cascadeSet.mousePressed(cascade);
  classicSet = createButton('Classic'); classicSet.position(25,height-190); classicSet.mousePressed(classic);
  mosaicSet = createButton('Mosaic'); mosaicSet.position(80,height-190); mosaicSet.mousePressed(mosaic);
  gradientCheckerSet = createButton('Ticker'); gradientCheckerSet.position(25,height-170); gradientCheckerSet.mousePressed(gradientChecker);
  runningSet = createButton('Run'); runningSet.position(80,height-170); runningSet.mousePressed(running);
  salmonSet = createButton('Salmon'); salmonSet.position(25,height-150); salmonSet.mousePressed(salmon);
  gridSet = createButton('Grid'); gridSet.position(85,height-150); gridSet.mousePressed(grid);
  webartSet = createButton('Web Art'); webartSet.position(25,height-130); webartSet.mousePressed(webart);
  sparkleSet = createButton('Sparkle'); sparkleSet.position(90,height-130); sparkleSet.mousePressed(sparkle);
  pixelGradientSet = createButton('Pixel Gradient'); pixelGradientSet.position(25,height-110); pixelGradientSet.mousePressed(pixelGradient);

  yField = height-50;
  pdSave = pixelDensity();
}

function draw() {
  if(gifRecord == true){
    pixelDensity(1);
  } else {
    pixelDensity(pdSave);
  }

  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);

  fill(50,200,250);
  noStroke();
  textSize(9);

  if(gifRecord==false){
      text("TYPE: X-Scale " + typeX, 25, 20);
      text("TYPE: Weight " + typeStroke, 25, 50);
      text("TYPE: Tracking " + tracking, 25, 80);
      text("TYPE: Line Space " + lineSpaceSlider.value(), 25, 110);

      text("GRID: Rows " + rows, 25, 160);
      text("Mirror", 43,191);

      text("WAVE: Length " + waveLength, 25, 220);
      text("WAVE: Speed " + waveSpeedSlider.value(), 25, 250);
      text("WAVE: Slope " + slope, 25, 280);

      text("Gradient Mode", 172,90);
      text("No stripes", 172,70);
      text("BKGD COLOR", 148,275);

      text("PRESETS", 25, height-220);

      push();
      rotate(-PI/2);
      text("SEGMENT TOGGLES AND COLORS",-250,144);
      pop();
  }

  noFill();
  strokeWeight(1); strokeJoin(ROUND);
  stroke(50,200,250);

  inpText = String(inp.value());
  runLength = inpText.length;

  typeX = typeXSlider.value();
  typeStroke = typeStrokeSlider.value();
  tracking = trackingSlider.value();
  lineSpace = lineSpaceSlider.value();
  rows = rowSlider.value();

  waveLength = waveLengthSlider.value();
  waveSpeed = waveSpeedSlider.value()/100;
  slope = slopeSlider.value();

  SA = typeStroke/2;
  doubleQuoteSwitch = 1;
  singleQuoteSwitch = 1;

  let step = (sq(rows)+rows)/2;

  if(mirrorCheck.checked() == true){
    yBlock = yField/(step*2);
  } else {
    yBlock = yField/step;
  }

  let waveBlock = 2*PI/rows;

  push();
  translate(width / 2, height / 2);
  translate(-(runLength*typeX + tracking*(runLength-1))/2,-yField/2);

  for(var k = 0; k<runLength; k++){
    push();
    for(var i = 0; i<rows; i++){
      if(gradientCheck.checked() == true){
        setGradient(i);
      } else if(inp0check.checked() == false){
        setTextColor(i);
        setRibbonColor(i);
      } else {
        setTextOnlyColor(i);
      }

      letter_select = k;

      if(waveSpeed>0){
        typeYfigure = map(sinEngine(i,waveBlock,k,waveLength,waveSpeed,slope),-1,1,yBlock,rows*yBlock);
      } else {
        typeYfigure = (rows-i)*yBlock;
      }
      typeY = typeYfigure - typeYfigure*(lineSpaceSlider.value()/100);
      lineSpace = typeYfigure*(lineSpaceSlider.value()/100);

      push();
        translate(typeX*k + tracking*k,0);
        if(inp0check.checked() == false){
          fill(ribbonColor); noStroke();
          rect(-tracking/2,0,typeX+tracking,typeYfigure);
        }
        translate(0,lineSpace/2);
        stroke(strkColor); strokeWeight(typeStroke); noFill();
        keyboardEngine();
      pop();
      translate(0,typeYfigure);
    }
    pop();
  }

 if(mirrorCheck.checked() == true){
   push();
    translate(0,yField/2);

    for(var m = 0; m<runLength; m++){
      push();
      for(var n = 1; n<rows+1; n++){
        if(gradientCheck.checked() == true){
          setGradient(rows-n);
        } else if(inp0check.checked() == false){
          setTextColor(rows-n);
          setRibbonColor(rows-n);
        } else {
          setTextOnlyColor(rows-n);
        }

        letter_select = m;

      if(waveSpeed>0){
        typeYfigure = map(sinEngine(rows-n,waveBlock,m,waveLength,waveSpeed,slope),-1,1,yBlock,rows*yBlock);
      } else {
        typeYfigure = n*yBlock;
      }
      typeY = typeYfigure - typeYfigure*(lineSpaceSlider.value()/100);
      lineSpace = typeYfigure*(lineSpaceSlider.value()/100);

       push();
          translate(typeX*m + tracking*m,0);
          if(inp0check.checked() == false){
            fill(ribbonColor); noStroke();
            rect(-tracking/2,0,typeX+tracking,typeYfigure);
          }
          translate(0,lineSpace/2);
          stroke(strkColor); strokeWeight(typeStroke); noFill();
          keyboardEngine();
        pop();
        translate(0,typeYfigure);
      }
      pop();
    }
  }

  pop();

    if(gifRecord == true && frameCount==(gifStart+1)){
      capturer.start();
      capturer.capture(canvas);
      print("start");
    } else if(gifRecord == true && frameCount<=gifEnd){
      capturer.capture(canvas);
//      print("record");
    } else if (gifRecord == true && frameCount==gifEnd+1) {
      capturer.stop();
      capturer.save();
      print("stop");
      gifRecord = false;
    }
}

function sinEngine(aCount,aLength, bCount,bLength, Speed, slopeN) {
  var sinus = sin((-frameCount*Speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function inp1checker() {
  inp2check.checked(false);
  inp3check.checked(false);
  inp4check.checked(false);
  inp5check.checked(false);
  inpNumber = 1;
}

function inp2checker() {
    inp1check.checked(true);
    inp3check.checked(false);
    inp4check.checked(false);
    inp5check.checked(false);
	if(this.checked()) {
    inpNumber = 2;
  } else {
  	inpNumber = 1;
  }
}

function inp3checker() {
    inp1check.checked(true);
    inp2check.checked(true);
    inp4check.checked(false);
    inp5check.checked(false);
	if(this.checked()) {
    inpNumber = 3;
  } else {
    inpNumber = 2;
  }
}

function inp4checker() {
  	inp1check.checked(true);
    inp2check.checked(true);
    inp3check.checked(true);
    inp5check.checked(false);
	if(this.checked()) {
	  inpNumber = 4;
  } else {
    inpNumber = 3;
  }
}

function inp5checker() {
  	inp1check.checked(true);
    inp2check.checked(true);
    inp3check.checked(true);
    inp4check.checked(true);
	if(this.checked()){
	  inpNumber = 5;
  } else {
    inpNumber = 4;
  }
}

function setRibbonColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {ribbonColor = inp1.value();}
    if (switcher % 6 == 1) {ribbonColor = inp2.value();}
    if (switcher % 6 == 2) {ribbonColor = inp3.value();}
    if (switcher % 6 == 3) {ribbonColor = inp4.value();}
    if (switcher % 6 == 4) {ribbonColor = inp5.value();}
    if (switcher % 6 == 5) {ribbonColor = inp6;}
  } if (inpNumber == 5) {
    if (switcher % 5 == 0) {ribbonColor = inp1.value();}
    if (switcher % 5 == 1) {ribbonColor = inp2.value();}
    if (switcher % 5 == 2) {ribbonColor = inp3.value();}
    if (switcher % 5 == 3) {ribbonColor = inp4.value();}
    if (switcher % 5 == 4) {ribbonColor = inp5.value();}
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) {ribbonColor = inp1.value();}
    if (switcher % 4 == 1) {ribbonColor = inp2.value();}
    if (switcher % 4 == 2) {ribbonColor = inp3.value();}
    if (switcher % 4 == 3) {ribbonColor = inp4.value();}
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) {ribbonColor = inp1.value();}
    if (switcher % 3 == 1) {ribbonColor = inp2.value();}
    if (switcher % 3 == 2) {ribbonColor = inp3.value();}
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) {ribbonColor = inp1.value();}
    if (switcher % 2 == 1) {ribbonColor = inp2.value();}
  } else if (inpNumber == 1) {
    ribbonColor = inp1.value();
  }
}

function setTextColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {strkColor = inp6;}
    if (switcher % 6 == 1) {strkColor = inp1.value();}
    if (switcher % 6 == 2) {strkColor = inp4.value();}
    if (switcher % 6 == 3) {strkColor = inp3.value();}
    if (switcher % 6 == 4) {strkColor = inp2.value();}
    if (switcher % 6 == 5) {strkColor = inp5.value();}
  } else if (inpNumber == 5) {
    if (switcher % 5 == 0) {strkColor = inp5.value();}
    if (switcher % 5 == 1) {strkColor = inp1.value();}
    if (switcher % 5 == 2) {strkColor = inp2.value();}
    if (switcher % 5 == 3) {strkColor = inp3.value();}
    if (switcher % 5 == 4) {strkColor = inp4.value();}
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) {strkColor = inp4.value();}
    if (switcher % 4 == 1) {strkColor = inp1.value();}
    if (switcher % 4 == 2) {strkColor = inp2.value();}
    if (switcher % 4 == 3) {strkColor = inp3.value();}
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) {strkColor = inp3.value();}
    if (switcher % 3 == 1) {strkColor = inp1.value();}
    if (switcher % 3 == 2) {strkColor = inp2.value();}
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) {strkColor = inp2.value();}
    if (switcher % 2 == 1) {strkColor = inp1.value();
    }
  } else if (inpNumber == 1) {
    strkColor = bkgdColor;
  }
}

function setTextOnlyColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {strkColor = inp1.value();}
    if (switcher % 6 == 1) {strkColor = inp2.value();}
    if (switcher % 6 == 2) {strkColor = inp3.value();}
    if (switcher % 6 == 3) {strkColor = inp4.value();}
    if (switcher % 6 == 4) {strkColor = inp5.value();}
    if (switcher % 6 == 5) {strkColor = inp6;}
  } else if (inpNumber == 5) {
    if (switcher % 5 == 0) {strkColor = inp1.value();}
    if (switcher % 5 == 1) {strkColor = inp2.value();}
    if (switcher % 5 == 2) {strkColor = inp3.value();}
    if (switcher % 5 == 3) {strkColor = inp4.value();}
    if (switcher % 5 == 4) {strkColor = inp5.value();}
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) {strkColor = inp1.value();}
    if (switcher % 4 == 1) {strkColor = inp2.value();}
    if (switcher % 4 == 2) {strkColor = inp3.value();}
    if (switcher % 4 == 3) {strkColor = inp4.value();}
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) {strkColor = inp1.value();}
    if (switcher % 3 == 1) {strkColor = inp2.value();}
    if (switcher % 3 == 2) {strkColor = inp3.value();}
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) {strkColor = inp1.value();}
    if (switcher % 2 == 1) {strkColor = inp2.value();
    }
  } else if (inpNumber == 1) {
    strkColor = inp1.value();
  }
}

function setGradient(switcher) {
  if (inpNumber == 5 || inpNumber ==6) {
    let from = color(inp1.value());
    let mid = color(inp2.value());
    let mid2 = color(inp3.value());
    let mid3 = color(inp4.value());
    let to = color(inp5.value());
    if(switcher<=(rows/4)) {
      ribbonColor = lerpColor(from,mid,switcher/(rows/4));
      strkColor = from;
    } else if (switcher>(rows/4) && switcher<=(rows/2)) {
      ribbonColor = lerpColor(mid,mid2,(switcher-rows/4)/(rows/4));
      strkColor = mid;
    } else if (switcher>(rows/2) && switcher<=(3*rows/4)) {
      ribbonColor = lerpColor(mid2,mid3,(switcher-rows/2)/(rows/4));
      strkColor = mid2;
    } else {
      ribbonColor = lerpColor(mid3,to,(switcher-3*rows/4)/(rows/4));
      strkColor = mid3;
    }
  } else if (inpNumber == 4) {
    let from = color(inp1.value());
    let mid = color(inp2.value());
    let mid2 = color(inp3.value());
    let to = color(inp4.value());
    if(switcher<=(rows/3)) {
      ribbonColor = lerpColor(from,mid,switcher/(rows/3));
      strkColor = from;
    } else if (switcher>(rows/3) && switcher<=(2*rows/3)) {
      ribbonColor = lerpColor(mid,mid2,(switcher-rows/3)/(rows/3));
      strkColor = mid;
    } else {
      ribbonColor = lerpColor(mid2,to,(switcher-2*rows/3)/(rows/3));
      strkColor = mid2;
    }
  } else if (inpNumber == 3) {
    let from = color(inp1.value());
    let mid = color(inp2.value());
    let to = color(inp3.value());
    if(switcher<=(rows/2)) {
      ribbonColor = lerpColor(from,mid,switcher/(rows/2));
      strkColor = from;
    } else {
      ribbonColor = lerpColor(mid,to,(switcher-rows/2)/(rows/2));
      strkColor = mid;
    }
    } else if (inpNumber == 2) {
      let from = color(inp1.value());
      let to = color(inp2.value());
      ribbonColor = lerpColor(from,to,switcher/rows);
      strkColor = from;
    } else if (inpNumber == 1) {
      let from = color(inp1.value());
      let to = color(bkgdColorPicker.value());
      ribbonColor = lerpColor(from,to,switcher/rows);
      strkColor = to;
  }
}

function pride() {
  inpNumber = 6;

  inp1.value('#e70000');inp2.value('#ff8c00');inp3.value('#ffef00');inp4.value('#00811f');inp5.value('#0044ff'); inp6 = color('#760089');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  bkgdColorPicker.value('#ffffff');
}

function reset() {
  typeXSlider.value(20); typeStrokeSlider.value(2); trackingSlider.value(10);
  lineSpaceSlider.value(20); rowSlider.value(14);
  waveLengthSlider.value(0.13); waveSpeedSlider.value(1); slopeSlider.value(1);

  mirrorCheck.checked(false); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#000000');inp2.value('#ffffff');inp3.value('#ff0000');inp4.value('#ffff00');inp5.value('#0000ff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  bkgdColorPicker.value('#ffffff');
  inp.value(" HERE TODAY & GONE TOMORROW ");
  inpNumber = 2;
}

function cascade() {
  reset();
  typeXSlider.value(20); typeStrokeSlider.value(2); trackingSlider.value(3);
  lineSpaceSlider.value(22); rowSlider.value(80);
  waveLengthSlider.value(0.59); waveSpeedSlider.value(2); slopeSlider.value(1.5);

  mirrorCheck.checked(false); gradientCheck.checked(false); inp0check.checked(true);

  inp1.value('#ffffff');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false);

  bkgdColorPicker.value('#0000ff');
  inp.value("CASCADE");
  inpNumber = 1;
}

function checker() {
  reset();
  typeXSlider.value(17); typeStrokeSlider.value(2); trackingSlider.value(10);
  lineSpaceSlider.value(20); rowSlider.value(18);
  waveLengthSlider.value(0.37); waveSpeedSlider.value(2); slopeSlider.value(3.14);

  mirrorCheck.checked(true); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#ffffff');inp2.value('#000000');
  inp1check.checked(true); inp2check.checked(true);

  bkgdColorPicker.value('#000000');
  inp.value("SPACE TYPE GENERATOR V.CASCADE");
  inpNumber = 2;
}

function mosaic() {
  reset();
  typeXSlider.value(13); typeStrokeSlider.value(1.5); trackingSlider.value(13);
  lineSpaceSlider.value(12); rowSlider.value(6);
  waveLengthSlider.value(1.5); waveSpeedSlider.value(3); slopeSlider.value(3.14);

  mirrorCheck.checked(false); gradientCheck.checked(false); inp0check.checked(true);

  inp1.value('#ffffff');
  inp1check.checked(true);

  bkgdColorPicker.value('#000000');
  inp.value("COLLECT THEM ALL");
  inpNumber = 1;
}

function running() {
  reset();
  typeXSlider.value(20); typeStrokeSlider.value(2); trackingSlider.value(10);
  lineSpaceSlider.value(10); rowSlider.value(15);
  waveLengthSlider.value(0); waveSpeedSlider.value(5); slopeSlider.value(3.14);

  mirrorCheck.checked(true); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#000000')
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  bkgdColorPicker.value('#ffff00');
  inp.value("RUNNING UP THAT HILL");
  inpNumber = 1;
}

function gradientChecker() {
  reset();
  typeXSlider.value(20); typeStrokeSlider.value(2); trackingSlider.value(10);
  lineSpaceSlider.value(20); rowSlider.value(30);
  waveLengthSlider.value(1.5); waveSpeedSlider.value(4); slopeSlider.value(3.14);

  mirrorCheck.checked(false); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#000000');inp2.value('#4d4d4d'); inp3.value('#808080');inp4.value('#cccccc'); inp5.value('#ffffff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  bkgdColorPicker.value('#ffffff');
  inp.value("HERE TODAY. GONE TOMORROW.");
  inpNumber = 5;
}

function salmon() {
  reset();
  typeXSlider.value(40); typeStrokeSlider.value(2); trackingSlider.value(0);
  lineSpaceSlider.value(0); rowSlider.value(14);
  waveLengthSlider.value(0); waveSpeedSlider.value(5); slopeSlider.value(1);

  mirrorCheck.checked(true); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#FF7E79');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  bkgdColorPicker.value('#ffffff');
  inp.value("////////////////////");
  inpNumber = 1;
}

function classic() {
  reset();
  typeXSlider.value(24); typeStrokeSlider.value(4); trackingSlider.value(20);
  lineSpaceSlider.value(38); rowSlider.value(14);
  waveLengthSlider.value(0.36); waveSpeedSlider.value(1); slopeSlider.value(2);

  mirrorCheck.checked(true); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#0000ff');inp2.value('#ffff00'); inp3.value('#ff0000');inp4.value('#ffffff'); inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  bkgdColorPicker.value('#ffff00');
  inp.value(" I AM ROOTED. BUT I FLOW. ");
  inpNumber = 4;
}

function grid() {
  reset();
  typeXSlider.value(62); typeStrokeSlider.value(1); trackingSlider.value(0);
  lineSpaceSlider.value(0); rowSlider.value(18);
  waveLengthSlider.value(0); waveSpeedSlider.value(3); slopeSlider.value(3.14);

  mirrorCheck.checked(true); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#ffffff');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  bkgdColorPicker.value('#0000ff');
  inp.value("IIIIIIIIIIIII");
  inpNumber = 1;
}

function webart() {
  reset();

  let xBlock = (width-50)/30;

  typeXSlider.value(xBlock); typeStrokeSlider.value(0); trackingSlider.value(0);
  lineSpaceSlider.value(0); rowSlider.value(50);
  waveLengthSlider.value(0.32); waveSpeedSlider.value(1); slopeSlider.value(3.14);

  mirrorCheck.checked(true); gradientCheck.checked(true); inp0check.checked(false);

  inp1.value('#000000');inp2.value('#ffffff'); inp3.value('#ff0000');inp4.value('#ffff00'); inp5.value('#0000ff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  bkgdColorPicker.value('#ffffff');
  inp.value("                              ");
  inpNumber = 5;
}

function sparkle() {
  reset();

  typeXSlider.value(17); typeStrokeSlider.value(2.5); trackingSlider.value(4);
  lineSpaceSlider.value(0); rowSlider.value(20);
  waveLengthSlider.value(0.25); waveSpeedSlider.value(6); slopeSlider.value(0.5);

  mirrorCheck.checked(true); gradientCheck.checked(false); inp0check.checked(false);

  inp1.value('#ffffff');inp2.value('#FF85FF'); inp3.value('#00FDFF');inp4.value('#0433FF'); inp5.value('#0000ff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  bkgdColorPicker.value('#0096FF');
  inp.value("***************");
  inpNumber = 4;
}

function pixelGradient() {
  reset();

  let xBlock = (height-50)/20;

  typeXSlider.value(xBlock); typeStrokeSlider.value(0); trackingSlider.value(0);
  lineSpaceSlider.value(0); rowSlider.value(46);
  waveLengthSlider.value(0.28); waveSpeedSlider.value(2); slopeSlider.value(0.8);

  mirrorCheck.checked(false); gradientCheck.checked(true); inp0check.checked(false);

  inp1.value('#2CFDFE');inp2.value('#FD8DD7'); inp3.value('#FC3692');inp4.value('#103FFB');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  bkgdColorPicker.value('#ffffff');
  inp.value("                    ");
  inpNumber = 4;
}

function saveLoop() {
//  2*PI/0.04 = gifLength;
    if(confirm('Click OK to generate your gif.\nThe process will take a minute. Be patient, plz!')){
        waveSpeedSlider.value(4);
        gifStart = frameCount;
        gifEnd = gifStart + gifLength;
        gifRecord = true;
    } else {
        gifRecord = false;
    }
}
