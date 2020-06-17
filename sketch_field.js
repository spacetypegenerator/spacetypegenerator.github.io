// LETTER
var typeX, typeXSlider;
var typeY, typeYSlider;
var typeStroke, typeStrokeSlider;
var strecherXslider, strecherXsize;
var strecherX = 0;
var strecherYslider, strecherYsize;
var strecherY = 0;

// FIELD
var column, columnSlider;
var row, rowSlider;
var tracking, trackSlider;
var lineSpace, lineSpaceSlider;
var xSpace, ySpace;

// WAVE
var speed, speedSlider;
var xOffset, xOffsetSlider;
var yOffset, yOffsetSlider;
var zWave, zWaveSlider, zWaveCheck;
var zWaver = 0;
var zWaveChecked = 0;
var xWave, xWaveSlider, xWaveCheck;
var xWaver = 0;
var xWaveChecked = 0;
var yWave, yWaveSlider, yWaveCheck;
var yWaver = 0;
var yWaveChecked = 0;
var yWavezRot, yWavezRotSlider;
var yWavezRoter = 0;
var yWavexStr, yWavexStrSlider;
var yWavexStrer = 0;
var xStrechWave, xStrechWaveSlider, xStrechWaveCheck;
var xStrechWave = 0;
var xStrechWaveChecked = 0;
var yStrechWave, yStrechWaveSlider, yStrechWaveCheck;
var yStrechWave = 0;
var yStrechWaveChecked = 0;

// CAMERA
var xRotCamera, yRotCamera, zRotCamera;
var xRotCameraSlider, yRotCameraSlider, zRotCameraSlider;
var zoomCamera, zoomCameraSlider;

// STRING
var letter_select, inp, inpText;
var myText = [];
var runLength;
var fullTextCheck, fullText;

// COLOR
var strkColor = 0;
var bkgdColor = 255;
var inp1, inp2, inp3, inp4, inp5, inp6;
var inpNumber = 1;

// SAVE
var exportButton;

// PRESETS
var presetStacks, presetBricks, presetSimpleZ, presetComplexZ, presetZebra, presetHarlequin;

function preload() {
 font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup(){
  strkColor = color(0);
  bkgdColor = color(255);

  createCanvas(windowWidth,windowHeight, WEBGL);
  background(bkgdColor);
  smooth();
  textFont(font);
  frameRate(30);

  inp = select("#textfield");

  columnSlider = createSlider(1,200,21); columnSlider.position(25,17); columnSlider.style('width','100px');
  rowSlider = createSlider(1,200,21); rowSlider.position(25,47); rowSlider.style('width','100px');
  trackingSlider = createSlider(-10,100,5); trackingSlider.position(25,77); trackingSlider.style('width','100px');
  lineSpaceSlider = createSlider(-10,100,5); lineSpaceSlider.position(25,107); lineSpaceSlider.style('width','100px');

  typeXSlider = createSlider(0,100,20); typeXSlider.position(25,147); typeXSlider.style('width','100px');
	typeYSlider = createSlider(0,100,40); typeYSlider.position(25,177); typeYSlider.style('width','100px');
	typeStrokeSlider = createSlider(0,10,2,0.1); typeStrokeSlider.position(25,207); typeStrokeSlider.style('width','100px');

  speedSlider = createSlider(-10,10,2); speedSlider.position(25,247); speedSlider.style('width','100px');
  xOffsetSlider = createSlider(0.1,60,PI); xOffsetSlider.position(25,277); xOffsetSlider.style('width','100px');
  yOffsetSlider = createSlider(0.1,60,PI); yOffsetSlider.position(25,307); yOffsetSlider.style('width','100px');

  zWaveSlider = createSlider(0,200,0); zWaveSlider.position(25,347); zWaveSlider.style('width','100px');
  zWaveCheck = createCheckbox('',false); zWaveCheck.position(130,346);
  xWaveSlider = createSlider(0,200,0); xWaveSlider.position(25,377); xWaveSlider.style('width','100px');
  xWaveCheck = createCheckbox('',false); xWaveCheck.position(130,376);
  yWaveSlider = createSlider(0,200,0); yWaveSlider.position(25,407); yWaveSlider.style('width','100px');
  yWaveCheck = createCheckbox('',false); yWaveCheck.position(130,406);
  	yWavezRotSlider = createSlider(0,60,0); yWavezRotSlider.position(45,436); yWavezRotSlider.style('width','50px');
  	yWavexStrSlider = createSlider(0,60,0); yWavexStrSlider.position(110,436); yWavexStrSlider.style('width','50px');
  xStrechWaveSlider = createSlider(0,100,0); xStrechWaveSlider.position(25,467); xStrechWaveSlider.style('width','100px');
  xStrechWaveCheck = createCheckbox('',false); xStrechWaveCheck.position(130,466);
  yStrechWaveSlider = createSlider(0,100,0); yStrechWaveSlider.position(25,497); yStrechWaveSlider.style('width','100px');
  yStrechWaveCheck = createCheckbox('',false); yStrechWaveCheck.position(130,496);

  fullTextCheck = createCheckbox('',true); fullTextCheck.position(140,57);
  xRotCameraSlider = createSlider(-180,180,0); xRotCameraSlider.position(-20,height-107); xRotCameraSlider.style('width','100px'); xRotCameraSlider.style('rotate',270);
  yRotCameraSlider = createSlider(-180,180,0); yRotCameraSlider.position(20,height-107); yRotCameraSlider.style('width','100px'); yRotCameraSlider.style('rotate',270);
  zRotCameraSlider = createSlider(-180,180,0); zRotCameraSlider.position(60,height-107); zRotCameraSlider.style('width','100px'); zRotCameraSlider.style('rotate',270);
	zoomCameraSlider = createSlider(-500,500,0); zoomCameraSlider.position(15,height-20); zoomCameraSlider.style('width','100px');

//  exportButton = createButton('Save Loop'); exportButton.position(140,10); exportButton.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,35); prideButton.mousePressed(pride);

  presetStacks = createButton('Stacks'); presetStacks.position(140,height-30); presetStacks.mousePressed(stackSet);
  presetBricks = createButton('Bricks'); presetBricks.position(200,height-30); presetBricks.mousePressed(brickSet);
  presetSimpleZ = createButton('Simple Z'); presetSimpleZ.position(260,height-30); presetSimpleZ.mousePressed(simpleZSet);
  presetComplexZ = createButton('Complex Z'); presetComplexZ.position(335,height-30); presetComplexZ.mousePressed(complexZSet);
  presetZebra = createButton('Zebra'); presetZebra.position(420,height-30); presetZebra.mousePressed(zebraSet);
  presetHarlequin = createButton('Harlequin'); presetHarlequin.position(480,height-30); presetHarlequin.mousePressed(harlequinSet);

  zWaveCheck.changed(zWaveChecker);
  xWaveCheck.changed(xWaveChecker);
  yWaveCheck.changed(yWaveChecker);
  xStrechWaveCheck.changed(xStrechWaveChecker);
  yStrechWaveCheck.changed(yStrechWaveChecker);
  fullTextCheck.changed(fullTexter);

  inp1 = createColorPicker('#000');inp1.position(180, 80);inp1.style('width', '20px');
  inp1check = createCheckbox('', true);inp1check.position(160, 82);
  inp2 = createColorPicker('#ff0000');inp2.position(180, 110);inp2.style('width', '20px');
  inp2check = createCheckbox('', false);inp2check.position(160, 112);
  inp3 = createColorPicker('#0000ff');inp3.position(180, 140);inp3.style('width', '20px');
  inp3check = createCheckbox('', false);inp3check.position(160, 142);
  inp4 = createColorPicker('#ffff00');inp4.position(180, 170);inp4.style('width', '20px');
  inp4check = createCheckbox('', false);inp4check.position(160, 172);
  inp5 = createColorPicker('#ffffff');inp5.position(180, 200);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(160, 202);

  bkgdColorPicker = createColorPicker('#FFFFFF'); bkgdColorPicker.position(160, 265); bkgdColorPicker.style('height', '50px');

  inp1check.changed(inp1checker);
  inp2check.changed(inp2checker);
  inp3check.changed(inp3checker);
  inp4check.changed(inp4checker);
  inp5check.changed(inp5checker);
}

function draw(){
  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);
  inpText = String(inp.value());

  column = columnSlider.value();
  row = rowSlider.value();
  tracking = trackingSlider.value();
  lineSpace = lineSpaceSlider.value();

  speed = speedSlider.value();
  zWave = zWaveSlider.value();
  xWave = xWaveSlider.value();
  yWave = yWaveSlider.value();
  yWavezRot = yWavezRotSlider.value();
	yWavexStr = yWavexStrSlider.value();
	xStrechWave = xStrechWaveSlider.value()
	yStrechWave = yStrechWaveSlider.value()

  xOffset = xOffsetSlider.value();
  yOffset = yOffsetSlider.value();

  typeX = typeXSlider.value();
  typeY = typeYSlider.value();
  typeStroke = typeStrokeSlider.value();

  xRotCamera = xRotCameraSlider.value();
  yRotCamera = yRotCameraSlider.value();
  zRotCamera = zRotCameraSlider.value();
  zoomCamera = zoomCameraSlider.value();

	xSpace = typeX + tracking;
	ySpace = typeY + lineSpace + yStrechWave/2;

    push();
    translate(-width/2,-height/2);

    stroke(125);
    strokeWeight(1);
    line(10,130,130,130);
    line(10,230,130,230);
    line(150,240,220,240);
    line(10,330,130,330);
    line(10,520,130,520);
    line(185,height-43,500,height-43);

    fill(125);
    textAlign(LEFT);

    textSize(13);
    rotateZ(-PI/2);
    text("GRID",-120,17);
    text("TYPE",-220,17);
    text("TYPE COLOR",-220,150);
    text("BKGD COLOR",-330,150);
    text("WAVE",-320,17);
    text("AMPLITUDE",-510,17);
    rotateZ(PI/2);

    textSize(9);
    text("GRID: Columns " + column,25,16);
    text("GRID: Rows " + row,25,46);
    text("GRID: Tracking " + tracking,25,76);
    text("GRID: Line Space " + lineSpace,25,106);

    text("TYPE: X-Scale " + typeX,25,146);
    text("TYPE: Y-Scale " + typeY,25,176);
    text("TYPE: Weight " + typeStroke,25,206);

    text("WAVE: Speed " + speed,25,246);
    text("WAVE: X Size" + xOffset,25,276);
    text("WAVE: Y Size " + yOffset,25,306);

    text("AMPLITUDE: Z Axis " + zWave,25,346);
    text("OFFSET",150,360);
    text("AMPLITUDE: X Axis " + xWave,25,376);
    text("OFFSET",150,390);
    text("AMPLITUDE: Y Axis " + yWave,25,406);
    text("OFFSET",150,420);
    text("Z Smooth " + yWavezRot,45,435);
    text("X Stretch " + yWavexStr,110,435);
    text("AMPLITUDE: X Stretch " + xStrechWave,25,466);
    text("OFFSET",150,480);
    text("AMPLITUDE: Y Stretch " + yStrechWave,25,496);
    text("OFFSET",150,510);

    text("FULL TEXT",160,70);

    text("CAMERA: Zoom",15,height-22);
	text("PRESETS", 145,height-40);

    translate(0,height);
    rotateZ(-PI/2);
    text("CAMERA: X-Rotation " + xRotCamera,45,20);
    text("CAMERA: Y-Rotation " + yRotCamera,45,60);
    text("CAMERA: Z-Rotation " + zRotCamera,45,100);

    pop();

  noFill();
  strokeWeight(typeStroke);


  push();
  // camera
  translate(0,0,zoomCamera);
  rotateX(radians(xRotCamera));
  rotateY(radians(yRotCamera));
  rotateZ(radians(zRotCamera));

  if(fullText==true){
		runLength = row*column;
    translate(-column*xSpace/2,-row*ySpace/2);
  } else {
    runLength = inpText.length;
    if(inpText.length>=column){
      translate(-column*xSpace/2,-floor(inpText.length/column)*ySpace/2);
    } else {
      translate(-inpText.length*xSpace/2,-floor(inpText.length/column)*ySpace/2);
    }
  }

  // THE TYPE
  for(var i=0;i<runLength;i++){
    if(fullText==true){
      letter_select = i%inpText.length;
    } else {
      letter_select = i;
    }

    setTextColor(floor(i/column));
    stroke(strkColor);

  	zWaver = sinEngine(zWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1)*zWave;
  	xWaver = map(sinEngine(xWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,xWave);
  	yWaver = sinEngine(yWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1)*yWave;

	yWavezRoter = cosEngine(yWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1)*yWavezRot;

	yWavexStrer = map(cosEngine2(yWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,yWavexStr);

    strecherX = map(sinEngine(xStrechWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,xStrechWave)+yWavexStrer;

    if(floor(i/column)%2==1){
	    strecherY = map(sinEngine(yStrechWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,yStrechWave);
    } else {
	    strecherY = map(sinEngine(yStrechWaveChecked+PI,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,yStrechWave);
    }

    push();
    translate((i%column)*xSpace + xWaver,floor(i/column)*ySpace + yWaver,zWaver);
    translate(-(typeX+strecherX)/2,-(typeY+strecherY)/2);

        // rotation adjustments
        var preZAnchX = sinEngine(zWaveChecked,xOffset,(i%column)-1,yOffset,floor((i)/column),speed,1)*zWave;
        var postZAnchX = sinEngine(zWaveChecked,xOffset,(i%column)+1,yOffset,floor((i)/column),speed,1)*zWave;
        var diffZAnchorX = postZAnchX - preZAnchX;
        var newYrot = atan2(abs(diffZAnchorX),2*xSpace);
        if(preZAnchX>postZAnchX){ rotateY(newYrot); } else {rotateY(-newYrot);}

        var preZAnchY = sinEngine(zWaveChecked,xOffset,i%column,yOffset,floor(i/column)-1,speed,1)*zWave;
        var postZAnchY = sinEngine(zWaveChecked,xOffset,i%column,yOffset,floor(i/column)+1,speed,1)*zWave;
        var diffZAnchorY = postZAnchY - preZAnchY;
        var newXrot = atan2(abs(diffZAnchorY),2*ySpace);
        if(preZAnchY>postZAnchY){ rotateX(-newXrot); } else {rotateX(newXrot);}

    rotateZ(radians(yWavezRoter));
    keyboardEngine();
    pop();
  }

	pop();
}

function sinEngine(Offset, xLength, xCounter, yLength, yCounter, Speed, slopeN) {
  var sinus = sin((frameCount*Speed/100 + xCounter/xLength + yCounter/yLength + Offset));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function cosEngine(Offset, xLength, xCounter, yLength, yCounter, Speed, slopeN) {
  var cosus = cos((frameCount*Speed/100 + xCounter/xLength + yCounter/yLength + Offset));
  var sign = (cosus >= 0 ? 1: -1);
  var coserSquare = sign * (1-pow(1-abs(cosus),slopeN));
  return coserSquare;
}

function cosEngine2(Offset, xLength, xCounter, yLength, yCounter, Speed, slopeN) {
  var cosus = cos((frameCount*Speed/100 + xCounter/xLength + yCounter/yLength + Offset)*2);
  var sign = (cosus >= 0 ? 1: -1);
  var coserSquare = sign * (1-pow(1-abs(cosus),slopeN));
  return coserSquare;
}

function fullTexter() {
	if(this.checked()){
		fullText = true;
  } else {
		fullText = false;
  }
}

function zWaveChecker() {
	if(this.checked()){
		zWaveChecked = PI;
  } else {
		zWaveChecked = 0;
  }
}

function xWaveChecker() {
	if(this.checked()){
		xWaveChecked = PI;
  } else {
		xWaveChecked = 0;
  }
}

function yWaveChecker() {
	if(this.checked()){
		yWaveChecked = PI;
  } else {
		yWaveChecked = 0;
  }
}

function xStrechWaveChecker() {
	if(this.checked()){
		xStrechWaveChecked = PI/2;
  } else {
		xStrechWaveChecked = 0;
  }
}

function yStrechWaveChecker() {
	if(this.checked()){
		yStrechWaveChecked = PI/2;
  } else {
		yStrechWaveChecked = 0;
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

function setTextColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {strkColor = inp1.value();}
    if (switcher % 6 == 1) {strkColor = inp2.value();}
    if (switcher % 6 == 2) {strkColor = inp3.value();}
    if (switcher % 6 == 3) {strkColor = inp4.value();}
    if (switcher % 6 == 4) {strkColor = inp5.value();}
    if (switcher % 6 == 5) {strkColor = inp6;}
  }if (inpNumber == 5) {
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
    if (switcher % 2 == 1) {strkColor = inp2.value();}
  } else if (inpNumber == 1) {
    strkColor = inp1.value();
  }
}

function reSetting() {
	yWaver = 0;
	columnSlider.value(33); rowSlider.value(7); trackingSlider.value(5); lineSpaceSlider.value(5); typeXSlider.value(20); typeYSlider.value(40);typeStrokeSlider.value(2);
  speedSlider.value(-2); xOffsetSlider.value(3.1); yOffsetSlider.value(3.1);
  xWaveSlider.value(0); zWaveSlider.value(0); xStrechWaveSlider.value(0); yStrechWaveSlider.value(0);
  yWaveSlider.value(0); yWavezRotSlider.value(0); yWavexStrSlider.value(0);
	xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(0);

  xStrechWaveCheck.checked(false); xStrechWaveChecked = 0;
  fullTextCheck.checked(false); fullText = false;
  strkColor = color(0);
  bkgdColor = color(255);
}

function stackSet() {
	reSetting();
	columnSlider.value(22); rowSlider.value(8); trackingSlider.value(4); lineSpaceSlider.value(12); typeXSlider.value(20); typeYSlider.value(18);
  speedSlider.value(-3); xOffsetSlider.value(5.1); yOffsetSlider.value(59.1); yWaveSlider.value(100); yWavezRotSlider.value(35); yWavexStrSlider.value(7);

  fullTextCheck.checked(true); fullText = true;
}

function brickSet() {
	reSetting();
	columnSlider.value(20); rowSlider.value(9); trackingSlider.value(17); lineSpaceSlider.value(7); typeXSlider.value(13); typeYSlider.value(20);
  speedSlider.value(-4); xWaveSlider.value(86); xStrechWaveSlider.value(25);

  xStrechWaveCheck.checked(true); xStrechWaveChecked = PI/2;
  fullTextCheck.checked(true); fullText = true;
  strkColor = color(255);
  bkgdColor = color(0);
}

function simpleZSet() {
	reSetting();
	columnSlider.value(28); rowSlider.value(15); trackingSlider.value(5); lineSpaceSlider.value(5); typeXSlider.value(20); typeYSlider.value(40);
  speedSlider.value(-4); xOffsetSlider.value(9.1); zWaveSlider.value(90); xRotCameraSlider.value(33); yRotCameraSlider.value(-27); zRotCameraSlider.value(24);

  fullTextCheck.checked(true); fullText = true;
}

function complexZSet() {
	reSetting();
	columnSlider.value(38); rowSlider.value(10); trackingSlider.value(5); lineSpaceSlider.value(6); typeXSlider.value(8); typeYSlider.value(21); typeStrokeSlider.value(.9);
  speedSlider.value(2); xOffsetSlider.value(4.1); yOffsetSlider.value(3.1); zWaveSlider.value(41); xWaveSlider.value(63); yWaveSlider.value(25); yWavezRotSlider.value(22);
	xRotCameraSlider.value(26); yRotCameraSlider.value(-39); zRotCameraSlider.value(15); zoomCameraSlider.value(200);

  yWaveCheck.checked(true); yWaveChecked = PI;
  fullTextCheck.checked(true); fullText = true;
  strkColor = color(255);
  bkgdColor = color(0);
}

function zebraSet() {
	reSetting();
	columnSlider.value(50); rowSlider.value(8); trackingSlider.value(7); lineSpaceSlider.value(18.5); typeXSlider.value(6); typeYSlider.value(20); typeStrokeSlider.value(1);
  speedSlider.value(-4); xOffsetSlider.value(6.1); yOffsetSlider.value(5.1); yWaveSlider.value(33); yWavezRotSlider.value(18); yStrechWaveSlider.value(35);

  fullTextCheck.checked(true); fullText = true;
}

function harlequinSet() {
	reSetting();
	columnSlider.value(40); rowSlider.value(7); trackingSlider.value(5); lineSpaceSlider.value(11); typeXSlider.value(9); typeYSlider.value(19); typeStrokeSlider.value(1.1);
  speedSlider.value(2); xOffsetSlider.value(2.1); yOffsetSlider.value(59.1); yStrechWaveSlider.value(58);

  fullTextCheck.checked(true); fullText = true;
  strkColor = color(255);
  bkgdColor = color(0);
}

function pride() {
  inpNumber = 6;

  inp1.value('#e70000');inp2.value('#ff8c00');inp3.value('#ffef00');inp4.value('#00811f');inp5.value('#0044ff'); inp6 = color('#760089');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);
}

function saveLoop(){
}
