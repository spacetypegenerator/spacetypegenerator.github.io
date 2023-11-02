// LETTER
var typeX = 20;
var typeY = 40;
var typeStroke = 4;
var tracking = 5;

// FIELD
var xSpace, ySpace;
var SA;

// RIBBONS
var ribbonCount = 5;
var ribbonSpaceX = 5;
var ribbonSpaceY = 5;
var ribbonSize = 1;
var ribbonColor;
var ribbonOffset;

// WAVE
var yWave, yWaver;
var speed;
var offset;
var slope;

// STRING
var letter_select, inp, inpText;
var myText = [];
var runLength;
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var bkgdColor = 0;
var inp1, inp2, inp3, inp4, inp5;
var inpNumber = 3;

var presetStacks;

// SAVE BETA
var gifLength = 157;
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
  var p5SaveCanvas = createCanvas(windowWidth, windowHeight);
  canvas = p5SaveCanvas.canvas;

  pixelDensity(1);
    
  background(bkgdColor);
  smooth();
  textFont(font);

  inp = select("#textfield");

  typeXSlider = createSlider(0, 100, 20); typeXSlider.position(25, 20);typeXSlider.style('width', '100px');
  typeYSlider = createSlider(0, 100, 40);typeYSlider.position(25, 50);typeYSlider.style('width', '100px');
  typeStrokeSlider = createSlider(0, 5, 2);typeStrokeSlider.position(25, 80);typeStrokeSlider.style('width', '100px');
  trackingSlider = createSlider(0, 40, 10);trackingSlider.position(25, 110);trackingSlider.style('width', '100px');

  ribbonCountSlider = createSlider(0, 40, 9);ribbonCountSlider.position(25, 170);ribbonCountSlider.style('width', '100px');
  ribbonSpaceXSlider = createSlider(-60, 60, -17);ribbonSpaceXSlider.position(25, 200);ribbonSpaceXSlider.style('width', '100px');
  ribbonSpaceYSlider = createSlider(-60, 60, -35);ribbonSpaceYSlider.position(25, 230);ribbonSpaceYSlider.style('width', '100px');
  ribbonSizeSlider = createSlider(-20, 100, 35);ribbonSizeSlider.position(25, 260);ribbonSizeSlider.style('width', '100px');
  ribbonOffsetSlider = createSlider(0, PI, 0.2, 0.1);ribbonOffsetSlider.position(25, 290);ribbonOffsetSlider.style('width', '100px');
  
  yWaveSlider = createSlider(0, 100, 96);yWaveSlider.position(25, 350);yWaveSlider.style('width', '100px');
  speedSlider = createSlider(0, 0.3, 0.01, 0.01);speedSlider.position(25, 380);speedSlider.style('width', '100px');
  offsetSlider = createSlider(0, PI, .26, 0.01);offsetSlider.position(25, 410);offsetSlider.style('width', '100px');
  slopeSlider = createSlider(0, 4, 1, 0.1);slopeSlider.position(25, 440);slopeSlider.style('width', '100px');

  saveLoopSet = createButton('Save Loop'); saveLoopSet.position(140, 10); saveLoopSet.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,35); prideButton.mousePressed(pride);
    
  marqueeSet = createButton('Marquee'); marqueeSet.position(25,height-60); marqueeSet.mousePressed(marquee);
  subwaySet = createButton('Subway'); subwaySet.position(95,height-60); subwaySet.mousePressed(subway);
  wowSet = createButton('Wow'); wowSet.position(160,height-60); wowSet.mousePressed(wow);
  stackedSet = createButton('Stacks'); stackedSet.position(210,height-60); stackedSet.mousePressed(stacks);
  oldSeaSet = createButton('Old Sea'); oldSeaSet.position(270,height-60); oldSeaSet.mousePressed(oldSea);
  colorSeaSet = createButton('Color Sea'); colorSeaSet.position(335,height-60); colorSeaSet.mousePressed(colorSea);
  simpleSet = createButton('Simple Wave'); simpleSet.position(25,height-35); simpleSet.mousePressed(simpleWave);
  simpleSet2 = createButton('Simple Wave 2'); simpleSet2.position(115,height-35); simpleSet2.mousePressed(simpleWave2);
  notSoWeirdSet = createButton('Not So Weird'); notSoWeirdSet.position(215,height-35); notSoWeirdSet.mousePressed(notSoWeird);
  racerSet = createButton('Racer'); racerSet.position(310,height-35); racerSet.mousePressed(racer);
  
  inp1 = createColorPicker('#ff0000');inp1.position(170, 70);inp1.style('width', '20px');
  inp1check = createCheckbox('', true);inp1check.position(150, 72);
  inp2 = createColorPicker('#ffff00');inp2.position(170, 100);inp2.style('width', '20px');
  inp2check = createCheckbox('', true);inp2check.position(150, 102);
  inp3 = createColorPicker('#0000ff');inp3.position(170, 130);inp3.style('width', '20px');
  inp3check = createCheckbox('', true);inp3check.position(150, 132);
  inp4 = createColorPicker('#ffffff');inp4.position(170, 160);inp4.style('width', '20px');
  inp4check = createCheckbox('', true);inp4check.position(150, 162);
  inp5 = createColorPicker('#000');inp5.position(170, 190);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(150, 192);

  bkgdColorPicker = createColorPicker('#fff');bkgdColorPicker.position(152, 235);bkgdColorPicker.style('height', '50px');

  inp1check.changed(inp1checker);
  inp2check.changed(inp2checker);
  inp3check.changed(inp3checker);
  inp4check.changed(inp4checker);
  inp5check.changed(inp5checker);
    
}

function draw() {
  //  strkColor = inp1.value();  
  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);
  
  fill(125);
  noStroke();
  textSize(9);
    
    if(gifRecord == false){
      text("TYPE: X-Scale " + typeX, 25, 20);
      text("TYPE: Y-Scale " + typeY, 25, 50);
      text("TYPE: Weight " + typeStroke, 25, 80);
      text("TYPE: Tracking " + tracking, 25, 110);

      text("RIBBON: Count " + ribbonCount, 25, 170);
      text("RIBBON: X Space " + ribbonSpaceX, 25, 200);
      text("RIBBON: Y Space " + ribbonSpaceY, 25, 230);
      text("RIBBON: Size " + ribbonSize, 25, 260);
      text("RIBBON: Offset " + ribbonOffset, 25, 290);

      text("WAVE: Size " + yWave, 25, 350);
      text("WAVE: Speed " + speed, 25, 380);
      text("WAVE: Wavelength " + offset, 25, 410);
      text("WAVE: Slope " + slope, 25, 440);

      text("PRESETS", 25,height-70);        
        
  push();
  rotate(-PI/2);
  text("SEGMENT TOGGLES AND COLORS",-215,144);
  text("BKGD COLORS", -290,144);
  pop();
    }
  
  inpText = String(inp.value());
  runLength = inpText.length;

  typeX = typeXSlider.value();
  typeY = typeYSlider.value();
  typeStroke = typeStrokeSlider.value();
  tracking = trackingSlider.value();
  ribbonCount = ribbonCountSlider.value();
  ribbonSpaceX = ribbonSpaceXSlider.value();
  ribbonSpaceY = ribbonSpaceYSlider.value();
  ribbonSize = ribbonSizeSlider.value();
  ribbonOffset = ribbonOffsetSlider.value();
  yWave = yWaveSlider.value();
  speed = speedSlider.value();
  offset = offsetSlider.value();
	slope = slopeSlider.value();
  
  xSpace = typeX + tracking;
  SA = typeStroke/2;
  doubleQuoteSwitch = 1;
  singleQuoteSwitch = 1;
  noFill();

  push();
  translate(width / 2, height / 2);
  translate(-xSpace * runLength / 2 - ribbonCount * ribbonSpaceX / 2, -ribbonCount * ribbonSpaceY / 2);

  // FLAG
  for (var k = 0; k < ribbonCount; k++) {

    //Ribbon Shadow
    strokeWeight(typeY + ribbonSize);
    stroke(0, 0, 0, 50);
    strokeCap(SQUARE);
    strokeJoin(ROUND);
    beginShape();
    for (var i = -1; i <= runLength; i++) {
 			yWaver = sinEngine(offset, i, ribbonOffset, k, -speed, slope) * yWave;
      vertex(i * xSpace + k * ribbonSpaceX - ribbonSpaceX / 7, k * ribbonSpaceY - ribbonSpaceY / 7 + yWaver);
    }
    endShape();

    //Ribbon
    setRibbonColor(k);
    strokeWeight(typeY + ribbonSize);
    stroke(ribbonColor);
    beginShape();
    for (var i = -1; i <= runLength; i++) {
 			yWaver = sinEngine(offset, i, ribbonOffset, k, -speed, slope) * yWave;
  //     yWaver = sin(frameCount*speed + i*offset + k*ribbonOffset) * yWave;
      vertex(i * xSpace + k * ribbonSpaceX, k * ribbonSpaceY + yWaver);
    }
    endShape();

    //Type
    setTextColor(k);
    strokeWeight(typeStroke);
    stroke(strkColor);
    strokeCap(PROJECT);
    for (var i = 0; i < runLength; i++) {
      var yWaverPre = sinEngine(offset, i-1, ribbonOffset, k, -speed, slope) * yWave;
      var yWaverPost= sinEngine(offset, i+1, ribbonOffset, k, -speed, slope) * yWave;
      var rotateFix = atan2(yWaverPost - yWaverPre, 2 * xSpace);

 			yWaver = sinEngine(offset, i, ribbonOffset, k, -speed, slope) * yWave;
      letter_select = i;

      push();
      translate(i * xSpace + k * ribbonSpaceX, k * ribbonSpaceY + yWaver);
      rotate(rotateFix);
      translate(-(typeX) / 2, -(typeY) / 2);

      keyboardEngine();
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

function sinEngine(xLength, xCounter, yLength, yCounter, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + xCounter*xLength + yCounter*yLength));
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

function reset() {
	typeXSlider.value(20); typeYSlider.value(40); typeStrokeSlider.value(2); trackingSlider.value(10);
	ribbonCountSlider.value(9); ribbonSpaceXSlider.value(-17); ribbonSpaceYSlider.value(-35); ribbonSizeSlider.value(35); ribbonOffsetSlider.value(0.2);    
	yWaveSlider.value(95); speedSlider.value(0.01); offsetSlider.value(0.26); slopeSlider.value(1);

  inp1.value('#ff0000');inp2.value('#0000ff');inp3.value('#ffffoo');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inpNumber = 3;
  bkgdColorPicker.value('#FFFFFF');
}

function marquee() {
  reset();
	typeXSlider.value(15); typeYSlider.value(25); typeStrokeSlider.value(3); trackingSlider.value(30);
	ribbonCountSlider.value(11); ribbonSpaceXSlider.value(43); ribbonSpaceYSlider.value(57); ribbonSizeSlider.value(45); ribbonOffsetSlider.value(0.4);    
	yWaveSlider.value(41); speedSlider.value(0.025); offsetSlider.value(PI); slopeSlider.value(2);

  inp1.value('#ff0000');inp2.value('#ffffff');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("gHoEoLdLbOy?e");

  inpNumber = 5;
  bkgdColorPicker.value('#ffff00');
}

function subway() {
  reset();
	typeXSlider.value(20); typeYSlider.value(12); typeStrokeSlider.value(2); trackingSlider.value(7);
	ribbonCountSlider.value(20); ribbonSpaceXSlider.value(-10); ribbonSpaceYSlider.value(35); ribbonSizeSlider.value(18); ribbonOffsetSlider.value(2.4);    
	yWaveSlider.value(60); speedSlider.value(0.02); offsetSlider.value(0.27); slopeSlider.value(4);

  inp1.value('#ff0000');inp2.value('#ffffff');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value("Time moves in one direction, memory in another.");

  inpNumber = 4;
  bkgdColorPicker.value('#000000');
}

function simpleWave() {
  reset();
	typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(2); trackingSlider.value(9);
	ribbonCountSlider.value(8); ribbonSpaceXSlider.value(0); ribbonSpaceYSlider.value(0); ribbonSizeSlider.value(23); ribbonOffsetSlider.value(0.5);    
	yWaveSlider.value(100); speedSlider.value(0.01); offsetSlider.value(0.2); slopeSlider.value(1);

  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value("STG_v.Stripes*STG_v.Stripes*STG_v.Stripes*");

  inpNumber = 3;
  bkgdColorPicker.value('#FFFFFF');
}

function oldSea() {
  reset();
	typeXSlider.value(9); typeYSlider.value(74); typeStrokeSlider.value(2); trackingSlider.value(18);
	ribbonCountSlider.value(18); ribbonSpaceXSlider.value(-2); ribbonSpaceYSlider.value(60); ribbonSizeSlider.value(26); ribbonOffsetSlider.value(0.8);    
	yWaveSlider.value(44); speedSlider.value(0.3); offsetSlider.value(0.22); slopeSlider.value(1);

  inp1.value('#000000');inp2.value('#4d4d4d');inp3.value('#808080');inp4.value('#b3b3b3');inp5.value('#f2f2f2');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("LEIK*COMENNT*SUSCRIBE*LIKE*COMENT*SUBCRIBE*IKE*COMMNT*SUBSCRIB");

  inpNumber = 5;
  bkgdColorPicker.value('#FFFFFF');
}

function colorSea() {
  reset();
	typeXSlider.value(20); typeYSlider.value(46); typeStrokeSlider.value(2); trackingSlider.value(11);
	ribbonCountSlider.value(33); ribbonSpaceXSlider.value(5); ribbonSpaceYSlider.value(37); ribbonSizeSlider.value(35); ribbonOffsetSlider.value(3.1);    
	yWaveSlider.value(45); speedSlider.value(0.03); offsetSlider.value(0.42); slopeSlider.value(1);

  inp1.value('#ff0000');inp2.value('#FFFFFF');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#00000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("To be whole is to be part; true voyage is return.");

  inpNumber = 5;
  bkgdColorPicker.value('#000000');
}

function wow() {
  reset();
	typeXSlider.value(20); typeYSlider.value(40); typeStrokeSlider.value(2); trackingSlider.value(40);
	ribbonCountSlider.value(14); ribbonSpaceXSlider.value(-38); ribbonSpaceYSlider.value(47); ribbonSizeSlider.value(49); ribbonOffsetSlider.value(0);    
	yWaveSlider.value(100); speedSlider.value(0.05); offsetSlider.value(2.96); slopeSlider.value(1);

  inp1.value('#ff0000');inp2.value('#FFFFFF');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#00000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("*W*O*W* *W*O*W* *W*O*W* *W*O*W* *W*O*W* *W*O*W* *W*O*W* *W*O*W* ");

  inpNumber = 5;
  bkgdColorPicker.value('#0000ff');
}

function stacks() {
  reset();
	typeXSlider.value(10); typeYSlider.value(100); typeStrokeSlider.value(3); trackingSlider.value(10);
	ribbonCountSlider.value(34); ribbonSpaceXSlider.value(-2); ribbonSpaceYSlider.value(-2); ribbonSizeSlider.value(57); ribbonOffsetSlider.value(0.1);    
	yWaveSlider.value(34); speedSlider.value(0.06); offsetSlider.value(0.2); slopeSlider.value(1);

  inp1.value('#ff0000');inp2.value('#FFFFFF');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#00000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("Stacks on Stacks");

  inpNumber = 5;
  bkgdColorPicker.value('#ff0000');
}

function notSoWeird() {
  reset();
	typeXSlider.value(11); typeYSlider.value(100); typeStrokeSlider.value(2); trackingSlider.value(10);
	ribbonCountSlider.value(23); ribbonSpaceXSlider.value(-5); ribbonSpaceYSlider.value(16); ribbonSizeSlider.value(81); ribbonOffsetSlider.value(2.9);    
	yWaveSlider.value(22); speedSlider.value(0.03); offsetSlider.value(0.31); slopeSlider.value(1);

  inp1.value('#ff0000');inp2.value('#FFFFFF');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#00000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("I'M NOT SO WEIRD TO ME.");

  inpNumber = 5;
  bkgdColorPicker.value('#FFFFFF');
}

function racer() {
  reset();
	typeXSlider.value(35); typeYSlider.value(15); typeStrokeSlider.value(2); trackingSlider.value(2);
	ribbonCountSlider.value(20); ribbonSpaceXSlider.value(3); ribbonSpaceYSlider.value(-15); ribbonSizeSlider.value(32); ribbonOffsetSlider.value(0.4);    
	yWaveSlider.value(100); speedSlider.value(0.02); offsetSlider.value(0.18); slopeSlider.value(0.6);

  inp1.value('#ffff00');inp2.value('#0000ff');inp3.value('#ffffff');inp4.value('#0000ff');inp5.value('#ff0000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("GO GO SPEED RACER GO GO SPEED RACER!");

  inpNumber = 5;
  bkgdColorPicker.value('#ffff00');
}

function simpleWave2() {
  reset();
	typeXSlider.value(7); typeYSlider.value(42); typeStrokeSlider.value(2); trackingSlider.value(11);
	ribbonCountSlider.value(34); ribbonSpaceXSlider.value(-4); ribbonSpaceYSlider.value(20); ribbonSizeSlider.value(22); ribbonOffsetSlider.value(0.2);    
	yWaveSlider.value(98); speedSlider.value(0.02); offsetSlider.value(0.14); slopeSlider.value(1);

  inp1.value('#ffff00');inp2.value('#0000ff');inp3.value('#ffffff');inp4.value('#0000ff');inp5.value('#ff0000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value("A word after a word after a word is power");

  inpNumber = 5;
  bkgdColorPicker.value('#000000');
}

function pride() {
  inpNumber = 6;
  
  inp1.value('#e70000');inp2.value('#ff8c00');inp3.value('#ffef00');inp4.value('#00811f');inp5.value('#0044ff'); inp6 = color('#760089');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  bkgdColorPicker.value('#ffffff');
}

function saveLoop() {
//  2*PI/0.04 = gifLength;  
    if(confirm('Click OK to generate your gif.\nThe process will take a minute. Be patient, plz!')){
        speedSlider.value(0.04); 
        gifStart = frameCount;
        gifEnd = gifStart + gifLength;
        gifRecord = true;       
    } else {
        gifRecord = false;
    }
}