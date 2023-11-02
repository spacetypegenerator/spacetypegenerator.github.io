// TYPE
var typeX, typeY;
var typeStroke = 1.5;
var typePush;
var padding;
var TR, TL, BR, BL;
var Rhalf, Lhalf, Thalf, Bhalf, Lthird, Rthird, Tthird, Bthird, L2third, R2third, T2third, B2third;
var Lquad, Rquad, Tquad, Bquad, L3quad, R3quad, T3quad, B3quad;
var L0506,R0506,T0506,B0506,L0106,R0106,T0106,B0106;
var L0108,R0108,T0108,B0108,L0708,R0708,T0708,B0708;
var L1528;

// GRID
var rows;
var xSpace, ySpace;

// WAVE
var zWave, yWave, xWave;
var offset, speed;
var rowOffset;
var slope;

// CAMERA
var xRotCamera, yRotCamera, zRotCamera;
var zoomCamera;

// STRING
var letter_select, inp, inpText;
var myText = [];
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var bkgdColor = 0;
var inp1, inp2, inp3, inp4, inp5;
var inpNumber = 2;
var strkColor, ribbonColor;
var backSide = true;

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
  var p5SaveCanvas = createCanvas(windowWidth, windowHeight,WEBGL);
  canvas = p5SaveCanvas.canvas;

  pixelDensity(1);

  background(bkgdColor);
  smooth();
  textFont(font);

  inp = select("#textfield");

  typeXSlider = createSlider(0, 150, 20);typeXSlider.position(15, 30);typeXSlider.style('width', '100px');
  typeYSlider = createSlider(0, 150, 50);typeYSlider.position(15, 60);typeYSlider.style('width', '100px');
  typeStrokeSlider = createSlider(0, 4, 2,0.25);typeStrokeSlider.position(15, 90);typeStrokeSlider.style('width', '100px');
  rowSlider = createSlider(0, 30, 6);rowSlider.position(15, 120);rowSlider.style('width', '100px');
  paddingSlider = createSlider(0, 100, 30);paddingSlider.position(15, 150);paddingSlider.style('width', '100px');

  xWaveSlider = createSlider(0, 200, 95);xWaveSlider.position(15, 210);xWaveSlider.style('width', '100px');
  yWaveSlider = createSlider(0, 200, 20);yWaveSlider.position(15, 240);yWaveSlider.style('width', '100px');
  zWaveSlider = createSlider(0, 200, 50);zWaveSlider.position(15, 270);zWaveSlider.style('width', '100px');
  offsetSlider = createSlider(0, PI / 4, 0.3, 0.01);offsetSlider.position(15, 300);offsetSlider.style('width', '100px');
  speedSlider = createSlider(0, 0.5, 0.03, 0.01);speedSlider.position(15, 330);speedSlider.style('width', '100px');
  rowOffsetSlider = createSlider(0, PI, 0.37, 0.01);rowOffsetSlider.position(15, 360);rowOffsetSlider.style('width', '100px');
  slopeSlider = createSlider(0, PI, 1, 0.1);slopeSlider.position(15, 390);slopeSlider.style('width', '100px');

  typePushSlider = createSlider(0, 10, 2);typePushSlider.position(15, 510);typePushSlider.style('width', '100px');

  xRotCameraSlider = createSlider(-90, 90, -50);xRotCameraSlider.position(-20, height - 107);xRotCameraSlider.style('width', '100px');xRotCameraSlider.style('rotate', 270);
  yRotCameraSlider = createSlider(-90, 90, 65);yRotCameraSlider.position(20, height - 107);yRotCameraSlider.style('width', '100px');yRotCameraSlider.style('rotate', 270);
  zRotCameraSlider = createSlider(-90, 90, 11);zRotCameraSlider.position(60, height - 107);zRotCameraSlider.style('width', '100px');zRotCameraSlider.style('rotate', 270);
  zoomCameraSlider = createSlider(-500, 500, -40);zoomCameraSlider.position(15, height - 20);zoomCameraSlider.style('width', '100px');

  saveLoopSet = createButton('Save Loop'); saveLoopSet.position(140, 10); saveLoopSet.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,35); prideButton.mousePressed(pride);

  oneBannerSet = createButton('A Banner'); oneBannerSet.position(150,height-60); oneBannerSet.mousePressed(oneBanner);
  twistSet = createButton('A Twist'); twistSet.position(220,height-60); twistSet.mousePressed(twist);
  foldsSet = createButton('Folds'); foldsSet.position(280,height-60); foldsSet.mousePressed(folds);
  flatSeaSet = createButton('Flat Sea'); flatSeaSet.position(330,height-60); flatSeaSet.mousePressed(flatSea);
  barberSet = createButton('Barber'); barberSet.position(395,height-60); barberSet.mousePressed(barber);
  siloSet = createButton('Silos'); siloSet.position(450,height-60); siloSet.mousePressed(silos);
  mysterySet = createButton('Mystery'); mysterySet.position(500,height-60); mysterySet.mousePressed(mystery);

  colaWaveSet = createButton('Cola Waves'); colaWaveSet.position(150,height-40); colaWaveSet.mousePressed(colaWave);
  origamiSet = createButton('Origami'); origamiSet.position(230,height-40); origamiSet.mousePressed(origami);
  craneSet = createButton('Origami 2'); craneSet.position(293,height-40); craneSet.mousePressed(crane);
  blackwhiteSet = createButton('B&W'); blackwhiteSet.position(365,height-40); blackwhiteSet.mousePressed(blackwhite);
  newsprintSet = createButton('Newsprint'); newsprintSet.position(415,height-40); newsprintSet.mousePressed(newsprint);
  edgeSet = createButton('Edge Case'); edgeSet.position(490,height-40); edgeSet.mousePressed(edge);

  inp0check = createCheckbox('', false);inp0check.position(150, 65);
  inp1 = createColorPicker('#f5f5f5');inp1.position(170, 93);inp1.style('width', '20px');
  inp1check = createCheckbox('', true);inp1check.position(150, 95);
  inp2 = createColorPicker('#000000');inp2.position(170, 123);inp2.style('width', '20px');
  inp2check = createCheckbox('', true);inp2check.position(150, 125);
  inp3 = createColorPicker('#ff0000');inp3.position(170, 153);inp3.style('width', '20px');
  inp3check = createCheckbox('', false);inp3check.position(150, 155);
  inp4 = createColorPicker('#ffff00');inp4.position(170, 183);inp4.style('width', '20px');
  inp4check = createCheckbox('', false);inp4check.position(150, 185);
  inp5 = createColorPicker('#000');inp5.position(170, 213);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(150, 215);

  bkgdColorPicker = createColorPicker('#fff');bkgdColorPicker.position(150, 255);bkgdColorPicker.style('height', '50px');

  inp1check.changed(inp1checker);
  inp2check.changed(inp2checker);
  inp3check.changed(inp3checker);
  inp4check.changed(inp4checker);
  inp5check.changed(inp5checker);

}

function draw() {
  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);
  inpText = String(inp.value());
  SA = typeStroke / 2;
  doubleQuoteSwitch = 1;
  singleQuoteSwitch = 1;

  typeX = typeXSlider.value();
  typeY = typeYSlider.value();
  typeStroke = typeStrokeSlider.value();
  rows = rowSlider.value();

  slope = slopeSlider.value();

  padding = paddingSlider.value() / 100;
  typePush = typePushSlider.value();

  zWave = zWaveSlider.value();
//  yWave = yWaveSlider.value();
//  xWave = xWaveSlider.value();
  xWave = map(xWaveSlider.value(),0,200,0,2.5*typeX);
  yWave = map(yWaveSlider.value(),0,100,0,2*typeY);
  offset = offsetSlider.value();
  speed = -speedSlider.value();
  rowOffset = rowOffsetSlider.value();

  xRotCamera = xRotCameraSlider.value();
  yRotCamera = yRotCameraSlider.value();
  zRotCamera = zRotCameraSlider.value();
  zoomCamera = zoomCameraSlider.value();

  push();
  translate(-width / 2, -height / 2);

  fill(50, 150, 150);
  textSize(10);
  textAlign(LEFT);
    if(gifRecord == false){
      text("TEXT: Type X " + typeX, 15, 30);
      text("TEXT: Type Y " + typeY, 15, 60);
      text("TEXT: Weight " + typeStroke, 15, 90);
      text("GRID: Rows  " + rows, 15, 120);

      text("TEXT: Padding " + paddingSlider.value(), 15, 150);

      text("WAVE: X Size  " + xWaveSlider.value(), 15, 210);
      text("WAVE: Y Size  " + yWaveSlider.value(), 15, 240);
      text("WAVE: Z Size  " + zWave, 15, 270);
      text("WAVE: Offset  " + offset, 15, 300);
      text("WAVE: Speed  " + -speed, 15, 330);
      text("WAVE: Row Offset  " + rowOffset, 15, 360);
      text("Slope " + slope, 15, 390);

      text("Type & Stripe adjust " + typePush, 15, 510);
      text("Camera Zoom " + zoomCamera, 15, height - 20);

      text("PRESETS", 150,height-70);
      text("No stripes", 170,79);

      translate(0, height);
      rotateZ(-PI / 2);
      text("CAMERA: X-Rotation " + xRotCamera, 45, 20);
      text("CAMERA: Y-Rotation " + yRotCamera, 45, 60);
      text("CAMERA: Z-Rotation " + zRotCamera, 45, 100);
      text("SEGMENT TOGGLES AND COLORS", (height-230),140);
      text("BKGD COLORS", (height-315),140);
    }
  pop();

  push();
  // camera
  translate(0, 0, zoomCamera);
  rotateX(radians(xRotCamera));
  rotateY(radians(yRotCamera));
  rotateZ(radians(zRotCamera));

  xSpace = typeX;
  ySpace = typeY;

  translate(-typeX * inpText.length / 2, -typeY * rows / 2);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < inpText.length; i++) {
      letter_select = i;
      setRibbonColor(j);

       if(inp0check.checked() == false){
         setTextColor(j);
       } else {
         setTextOnlyColor(j);
       }

//      sinEngine(aCount, aLength, bCount, bLength, Speed, slopeN)
      var yWaverTL = sinEngine(i,offset,j,rowOffset,speed, slope) * yWave;
      var yWaverTR = sinEngine((i+1),offset,j,rowOffset,speed, slope) * yWave;
      var yWaverBR = sinEngine((i+1),offset,(j+1),rowOffset,speed, slope) * yWave;
      var yWaverBL = sinEngine(i,offset,(j+1),rowOffset,speed, slope) * yWave;

      var xWaverTL = sinEngine(i,offset,j,rowOffset,speed, slope) * xWave;
      var xWaverTR = sinEngine((i+1),offset,j,rowOffset,speed, slope) * xWave;
      var xWaverBR = sinEngine((i+1),offset,(j+1),rowOffset,speed, slope) * xWave;
      var xWaverBL = sinEngine(i,offset,(j+1),rowOffset,speed, slope) * xWave;

      var zWaverTL = sinEngine(i,offset,j,rowOffset,speed, slope) * zWave;
      var zWaverTR = sinEngine((i+1),offset,j,rowOffset,speed, slope) * zWave;
      var zWaverBR = sinEngine((i+1),offset,(j+1),rowOffset,speed, slope) * zWave;
      var zWaverBL = sinEngine(i,offset,(j+1),rowOffset,speed, slope) * zWave;

      TLbox = createVector(xWaverTL, yWaverTL, zWaverTL);
      TRbox = createVector(typeX +xWaverTR, yWaverTR, zWaverTR);
      BRbox = createVector(typeX +xWaverBR, typeY+yWaverBR, zWaverBR);
      BLbox = createVector(xWaverBL, typeY+yWaverBL, zWaverBL);

      Thalf = p5.Vector.lerp(TLbox,TRbox,0.5);
      Bhalf = p5.Vector.lerp(BLbox,BRbox,0.5);
      center = p5.Vector.lerp(Thalf,Bhalf,0.5)

      TL = p5.Vector.lerp(TLbox,center,padding);
      TR = p5.Vector.lerp(TRbox,center,padding);
      BR = p5.Vector.lerp(BRbox,center,padding);
      BL = p5.Vector.lerp(BLbox,center,padding);

      push();
        translate(xSpace * i, ySpace * j);
        translate(-typeX / 2, -typeY / 2);
        noFill(); stroke(strkColor); strokeWeight(typeStroke);
        keyboardEngine_corners();
      if(inp0check.checked() == false){
        translate(0, 0, -typePush);
            fill(ribbonColor); noStroke();
            beginShape();
            vertex(TLbox.x, TLbox.y, TLbox.z);
            vertex(TRbox.x, TRbox.y, TRbox.z);
            vertex(BRbox.x, BRbox.y, BRbox.z);
            vertex(BLbox.x, BLbox.y, BLbox.z);
            vertex(TLbox.x, TLbox.y, TLbox.z);
            endShape();
          if(backSide == true) {
            translate(0, 0, -1);
            fill(strkColor);
            beginShape();
            vertex(TLbox.x, TLbox.y, TLbox.z);
            vertex(TRbox.x, TRbox.y, TRbox.z);
            vertex(BRbox.x, BRbox.y, BRbox.z);
            vertex(BLbox.x, BLbox.y, BLbox.z);
            vertex(TLbox.x, TLbox.y, TLbox.z);
            endShape();
          }
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
  if (this.checked()) {
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
  if (this.checked()) {
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
  if (this.checked()) {
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
  if (this.checked()) {
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

function sinEngine(aCount, aLength, bCount, bLength, speed, slope) {
  var sinus = sin((frameCount*speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slope));
  return sinerSquare;
}

function reset() {
  typeXSlider.value(20); typeYSlider.value(50); typeStrokeSlider.value(1.5);
  rowSlider.value(1); paddingSlider.value(20);   typePushSlider.value(2);

  zWaveSlider.value(30); xWaveSlider.value(30); yWaveSlider.value(30); offsetSlider.value(0.3);
  slopeSlider.value(1); speedSlider.value(0.02); rowOffsetSlider.value(0.3);

  xRotCameraSlider.value(30); yRotCameraSlider.value(30); zRotCameraSlider.value(-30); zoomCameraSlider.value(0);

  inp0check.checked(false); backSide = true;
  inp1.value('#ffffff');inp2.value('#0000ff');inp3.value('#ff0000');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" THIS & THEN ");

  inpNumber = 2;
  bkgdColorPicker.value('#000000');
}

function oneBanner() {
  reset();
  typeXSlider.value(20); typeYSlider.value(40); typeStrokeSlider.value(1);
  rowSlider.value(1); paddingSlider.value(20); typePushSlider.value(0);

  zWaveSlider.value(70); xWaveSlider.value(0); yWaveSlider.value(0); offsetSlider.value(0.3); speedSlider.value(0.02); rowOffsetSlider.value(0);

  xRotCameraSlider.value(25); yRotCameraSlider.value(75); zRotCameraSlider.value(-10); zoomCameraSlider.value(-150);

  inp1.value('#FFFFFF');inp2.value('#ff0000');inp3.value('#0000ff');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" -ALL THIS AND MORE // ALL THIS AND MORE- ");

  inpNumber = 2;
  bkgdColorPicker.value('#00FDFF');
}

function folds() {
  reset();
  typeXSlider.value(45); typeYSlider.value(70); typeStrokeSlider.value(3);
  rowSlider.value(8); paddingSlider.value(20); typePushSlider.value(8.5);

  zWaveSlider.value(90); xWaveSlider.value(0); yWaveSlider.value(0); offsetSlider.value(0.21); speedSlider.value(0.02); rowOffsetSlider.value(2.55);

  xRotCameraSlider.value(51); yRotCameraSlider.value(37); zRotCameraSlider.value(-28); zoomCameraSlider.value(-300);

  inp1.value('#FFFFFF');inp2.value('#0000ff');inp3.value('#ff0000');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value(" I AM OUTSIDE TIME ");

  inpNumber = 5;
  bkgdColorPicker.value('#ffff00');
}

function twist() {
  reset();
  typeXSlider.value(30); typeYSlider.value(50); typeStrokeSlider.value(2);
  rowSlider.value(1); paddingSlider.value(70); typePushSlider.value(4);

  zWaveSlider.value(30); xWaveSlider.value(0); yWaveSlider.value(0); offsetSlider.value(0.3); speedSlider.value(0.02); rowOffsetSlider.value(3.14);

  xRotCameraSlider.value(-45); yRotCameraSlider.value(37); zRotCameraSlider.value(-15); zoomCameraSlider.value(-120);

  inp1.value('#FFFFFF');inp2.value('#000000');inp3.value('#ff0000');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" THERE ARE NO ENDINGS ");

  inpNumber = 2;
  bkgdColorPicker.value('#0000FF');
}

function flatSea() {
  reset();
  typeXSlider.value(25); typeYSlider.value(45); typeStrokeSlider.value(2);
  rowSlider.value(12); paddingSlider.value(40); typePushSlider.value(4);

  zWaveSlider.value(75); xWaveSlider.value(0); yWaveSlider.value(200); offsetSlider.value(0.11); speedSlider.value(0.08); rowOffsetSlider.value(1.96);

  xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(-500);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#FF0000');inp3.value('#0000FF');inp4.value('#ffff00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value(" rolled by like scrolls of silver ");

  inpNumber = 5;
  bkgdColorPicker.value('#000000');
}

function barber() {
  reset();
  typeXSlider.value(20); typeYSlider.value(40); typeStrokeSlider.value(1.5);
  rowSlider.value(15); paddingSlider.value(20); typePushSlider.value(2);

  zWaveSlider.value(0); xWaveSlider.value(0); yWaveSlider.value(30); offsetSlider.value(0.3); speedSlider.value(0.07); rowOffsetSlider.value(2.13);

  xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(-30); zoomCameraSlider.value(-150);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#0000ff');inp3.value('#ff0000');inp4.value('#000000');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" DOUBLE-STRIPES BREAK! ");

  inpNumber = 4;
  bkgdColorPicker.value('#D6D6D6');
}

function colaWave() {
  reset();
  typeXSlider.value(35); typeYSlider.value(100); typeStrokeSlider.value(3);
  rowSlider.value(4); paddingSlider.value(43); typePushSlider.value(0);

  zWaveSlider.value(0); xWaveSlider.value(0); yWaveSlider.value(150); offsetSlider.value(0.19); speedSlider.value(0.02); rowOffsetSlider.value(0.28);

  xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(-500);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#ff0000');inp3.value('#D6D6D6');inp4.value('#0000ff');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" ------ENTIRE FUTURES ARE BORN------ ");

  inpNumber = 4;
  bkgdColorPicker.value('#FF0000');
}

function origami() {
  reset();
  typeXSlider.value(87); typeYSlider.value(83); typeStrokeSlider.value(3);
  rowSlider.value(18); paddingSlider.value(43); typePushSlider.value(10);

  zWaveSlider.value(75); xWaveSlider.value(0); yWaveSlider.value(0); offsetSlider.value(0.21); speedSlider.value(0.12); rowOffsetSlider.value(3.14);

  xRotCameraSlider.value(42); yRotCameraSlider.value(20); zRotCameraSlider.value(-23); zoomCameraSlider.value(-500);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#ff0000');inp3.value('#ffff00');inp4.value('#0000ff');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" Forever Future Landscapes ");

  inpNumber = 4;
  bkgdColorPicker.value('#011993');
}

function blackwhite() {
  reset();
  typeXSlider.value(17); typeYSlider.value(43); typeStrokeSlider.value(2);
  rowSlider.value(10); paddingSlider.value(28); typePushSlider.value(2);

  zWaveSlider.value(0); xWaveSlider.value(200); yWaveSlider.value(55); offsetSlider.value(0.3); speedSlider.value(0.06); rowOffsetSlider.value(0.3);

  xRotCameraSlider.value(30); yRotCameraSlider.value(30); zRotCameraSlider.value(0); zoomCameraSlider.value(-250);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#000000');inp3.value('#ff0000');inp4.value('#0000ff');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" This and then that ");

  inpNumber = 2;
  bkgdColorPicker.value('#000000');
}

function newsprint() {
  reset();
  typeXSlider.value(42); typeYSlider.value(48); typeStrokeSlider.value(2);
  rowSlider.value(16); paddingSlider.value(48); typePushSlider.value(4);

  zWaveSlider.value(83); xWaveSlider.value(200); yWaveSlider.value(200);
  slopeSlider.value(3.1); offsetSlider.value(0.11); speedSlider.value(0.08); rowOffsetSlider.value(1.96);

  xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(-500);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#000000');inp3.value('#ff0000');inp4.value('#0000ff');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value(" Rolled by like scrolls over silver ");

  inpNumber = 2;
  bkgdColorPicker.value('#5e5e5e');
}

function silos() {
  reset();
  typeXSlider.value(15); typeYSlider.value(43); typeStrokeSlider.value(1.5);
  rowSlider.value(7); paddingSlider.value(20); typePushSlider.value(8);

  zWaveSlider.value(200); xWaveSlider.value(0); yWaveSlider.value(0);
  slopeSlider.value(3.1); offsetSlider.value(0.37); speedSlider.value(0.1); rowOffsetSlider.value(0);

  xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(-90);

  backSide = true;
  inp1.value('#FFFF00');inp2.value('#0000FF');inp3.value('#ff0000');inp4.value('#FFFFFF');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value(" BEFORE AND DURING AND AFTER ");

  inpNumber = 3;
  bkgdColorPicker.value('#FFFFFF');
}

function crane() {
  reset();
  typeXSlider.value(12); typeYSlider.value(40); typeStrokeSlider.value(1.75);
  rowSlider.value(10); paddingSlider.value(40); typePushSlider.value(3);

  zWaveSlider.value(32); xWaveSlider.value(115); yWaveSlider.value(0);
  slopeSlider.value(0.8); offsetSlider.value(0.2); speedSlider.value(0.03); rowOffsetSlider.value(2.47);

  xRotCameraSlider.value(40); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(0);

  backSide = true;
  inp1.value('#FFFFFF');inp2.value('#0000FF');inp3.value('#ff0000');inp4.value('#FFFF00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value(" square possibilities ");

  inpNumber = 3;
  bkgdColorPicker.value('#0000ff');
}


function edge() {
  reset();
  typeXSlider.value(40); typeYSlider.value(70); typeStrokeSlider.value(2);
  rowSlider.value(5); paddingSlider.value(20); typePushSlider.value(0);

  xWaveSlider.value(200); yWaveSlider.value(0); zWaveSlider.value(0);
  slopeSlider.value(0.5); offsetSlider.value(0.42); speedSlider.value(0.02); rowOffsetSlider.value(0.46);

  xRotCameraSlider.value(0); yRotCameraSlider.value(11); zRotCameraSlider.value(30); zoomCameraSlider.value(-500);

  inp0check.checked(true);
  inp1.value('#FFFFFF');inp2.value('#0000FF');inp3.value('#ff0000');inp4.value('#FFFF00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value("harsh yet smooth angles");

  inpNumber = 1;
  bkgdColorPicker.value('#000000');
}


function mystery() {
  reset();
  typeXSlider.value(25); typeYSlider.value(45); typeStrokeSlider.value(2);
  rowSlider.value(15); paddingSlider.value(27); typePushSlider.value(0);

  xWaveSlider.value(0); yWaveSlider.value(71); zWaveSlider.value(73);
  slopeSlider.value(1); offsetSlider.value(0.22); speedSlider.value(0.08); rowOffsetSlider.value(1.96);

  xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(-500);

  inp0check.checked(true);
  inp1.value('#000000');inp2.value('#0000FF');inp3.value('#ff0000');inp4.value('#FFFF00');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(false); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value("A gentle flowing space");

  inpNumber = 1;
  bkgdColorPicker.value('#ffffff');
}

function pride() {
  inpNumber = 6;

  inp1.value('#e70000');inp2.value('#ff8c00');inp3.value('#ffef00');inp4.value('#00811f');inp5.value('#0044ff'); inp6 = color('#760089');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);
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
