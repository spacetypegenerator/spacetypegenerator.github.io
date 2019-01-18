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
var SA;

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

// CAMERA
var xRotCamera, yRotCamera, zRotCamera;
var xRotCameraSlider, yRotCameraSlider, zRotCameraSlider;
var zoomCamera, zoomCameraSlider;

// STRING
var letter_select, inp, inpText;
var myText = [];
var runLength;
var fullTextCheck, fullText;
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var radioBkgd;
var radioStroke;

var strkColor = 0;
var bkgdColor = 255;

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
  
  inp = select("#textfield");
  
  columnSlider = createSlider(1,200,33); columnSlider.position(25,17); columnSlider.style('width','100px');
  rowSlider = createSlider(1,200,7); rowSlider.position(25,47); rowSlider.style('width','100px');
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
  
  invertCheck = createCheckbox('',false); invertCheck.position(140,60);
  fullTextCheck = createCheckbox('',true); fullTextCheck.position(140,90);
  fullText = true;
  xRotCameraSlider = createSlider(-180,180,0); xRotCameraSlider.position(-20,height-107); xRotCameraSlider.style('width','100px'); xRotCameraSlider.style('rotate',270);
  yRotCameraSlider = createSlider(-180,180,0); yRotCameraSlider.position(20,height-107); yRotCameraSlider.style('width','100px'); yRotCameraSlider.style('rotate',270);
  zRotCameraSlider = createSlider(-180,180,0); zRotCameraSlider.position(60,height-107); zRotCameraSlider.style('width','100px'); zRotCameraSlider.style('rotate',270);
	zoomCameraSlider = createSlider(-500,500,0); zoomCameraSlider.position(15,height-20); zoomCameraSlider.style('width','100px');

  exportButton = createButton('Export PNG'); exportButton.position(140,20); exportButton.mousePressed(exportPNG);
  presetStacks = createButton('Stacks'); presetStacks.position(140,height-30); presetStacks.mousePressed(stackSet);
  presetBricks = createButton('Bricks'); presetBricks.position(200,height-30); presetBricks.mousePressed(brickSet);
  presetSimpleZ = createButton('Simple Z'); presetSimpleZ.position(260,height-30); presetSimpleZ.mousePressed(simpleZSet);
  presetComplexZ = createButton('Complex Z'); presetComplexZ.position(335,height-30); presetComplexZ.mousePressed(complexZSet);
  presetZebra = createButton('Zebra'); presetZebra.position(420,height-30); presetZebra.mousePressed(zebraSet);
  presetHarlequin = createButton('Harlequin'); presetHarlequin.position(480,height-30); presetHarlequin.mousePressed(harlequinSet);
	
  radioBkgd = createRadio();
  radioBkgd.position(660,height-60);
  radioBkgd.option(' ', 1);
  radioBkgd.option(' ', 2);
  radioBkgd.option(' ', 3);
  radioBkgd.option(' ', 4);
  radioBkgd.option(' ', 5);
  radioBkgd.option(' ', 6);
  radioBkgd.value('1').checked = true;
  
  radioStroke = createRadio();
  radioStroke.position(660,height-30);
  radioStroke.option(' ', 1);
  radioStroke.option(' ', 2);
  radioStroke.option(' ', 3);
  radioStroke.option(' ', 4);
  radioStroke.option(' ', 5);
  radioStroke.option(' ', 6);
  radioStroke.value('3').checked = true;
  
	zWaveCheck.changed(zWaveChecker);
	xWaveCheck.changed(xWaveChecker);
	yWaveCheck.changed(yWaveChecker);
  fullTextCheck.changed(fullTexter);
  invertCheck.changed(inverter);
}

function draw(){
  if(radioBkgd.value() == 1){
    bkgdColor = color(255);
  } else if(radioBkgd.value() == 2){
    bkgdColor = color('#787eff');
  } else if(radioBkgd.value() == 3){
    bkgdColor = color('#eb008b');
  } else if(radioBkgd.value() == 4){
    bkgdColor = color('#fbaf3f');
  } else if(radioBkgd.value() == 5){
    bkgdColor = color('#ff6427');
  } else if(radioBkgd.value() == 6){
    bkgdColor = color('#d67aff');
  }
  
  if(radioStroke.value() == 1){
    strkColor = color(255);
  } else if(radioStroke.value() == 2){
    strkColor = color('#787eff');
  } else if(radioStroke.value() == 3){
    strkColor = color('#eb008b');
  } else if(radioStroke.value() == 4){
    strkColor = color('#fbaf3f');
  } else if(radioStroke.value() == 5){
    strkColor = color('#ff6427');
  } else if(radioStroke.value() == 6){
    strkColor = color('#d67aff');
  }
  
  background(bkgdColor);
  letter_select = 0;
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
	ySpace = typeY + lineSpace;
  SA = typeStroke/2;
  doubleQuoteSwitch =1;
  singleQuoteSwitch =1;
  
  if(mouseX>145 && mouseX<220 && mouseY>18 && mouseY<45){
  } else {
    push();
    translate(-width/2,-height/2);
    
    stroke(strkColor);
    strokeWeight(1);
    line(10,130,130,130);
    line(10,230,130,230);  	
    line(10,330,130,330);  	
    line(10,520,130,520);  
    line(185,height-43,500,height-43); 
    
    fill(strkColor);
    textAlign(LEFT);
    
    textSize(13);
    rotateZ(-PI/2);
    text("GRID",-120,17);
    text("TYPE",-220,17);
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

    text("INVERT",158,74);  
    text("FULL TEXT",158,104);
    text("CAMERA: Zoom",15,height-22);
		text("PRESETS", 145,height-40);

    textAlign(RIGHT);
		text("BACKGROUND", 650,height-48);
		text("STROKE", 650,height-16);   

    noStroke();
    for(var j=0;j<2;j++){
      push();
      translate(40,j*30);
        fill(255);
        ellipse(629,height-50,23,23);
        fill('#787eff');
        ellipse(650,height-50,23,23);
        fill('#eb008b');
        ellipse(672,height-50,23,23);
        fill('#fbaf3f');
        ellipse(694,height-50,23,23);
        fill('#ff6427');
        ellipse(716,height-50,23,23);
        fill('#d67aff');
        ellipse(738,height-50,23,23);
      pop();
    }

    textAlign(LEFT);    
    translate(0,height);
    rotateZ(-PI/2);
    text("CAMERA: X-Rotation " + xRotCamera,45,20);
    text("CAMERA: Y-Rotation " + yRotCamera,45,60);
    text("CAMERA: Z-Rotation " + zRotCamera,45,100);
    
    pop();
  }
  
  noFill();
  strokeWeight(typeStroke);
	stroke(strkColor);

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
    
  if(zWave != 0){
  	zWaver = sinEngine(zWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1)*zWave;
  }
  if(xWave != 0){
  	xWaver = map(sinEngine(xWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,xWave);
  }
  if(yWave != 0){
  	yWaver = sinEngine(yWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1)*yWave;
  }
//  if(yWavezRot != 0){
		yWavezRoter = cosEngine(yWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1)*yWavezRot;
//  }
    
    push();
    translate((i%column)*xSpace + xWaver,floor(i/column)*ySpace + yWaver,zWaver);
    translate(-(typeX)/2,-(typeY)/2);

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


function inverter() {
	if(this.checked()){
		strkColor = color(255);
    bkgdColor = color(0);
  } else {
  	strkColor = color(0);
    bkgdColor = color(255);
  }
}

function exportPNG() {
	saveCanvas('STG_field', 'png');
}

function reSetting() {
	yWaver = 0;
	columnSlider.value(33); rowSlider.value(7); trackingSlider.value(5); lineSpaceSlider.value(5); typeXSlider.value(20); typeYSlider.value(40);typeStrokeSlider.value(2);
  speedSlider.value(-2); xOffsetSlider.value(3.1); yOffsetSlider.value(3.1);
  xWaveSlider.value(0); zWaveSlider.value(0);
  yWaveSlider.value(0); yWavezRotSlider.value(0);
	xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(0); 

  fullTextCheck.checked(false); fullText = false;
  invertCheck.checked(false);
  strkColor = color(0);
  bkgdColor = color(255);  
}

function stackSet() {
	reSetting();
	columnSlider.value(22); rowSlider.value(8); trackingSlider.value(4); lineSpaceSlider.value(12); typeXSlider.value(20); typeYSlider.value(18);
  speedSlider.value(-3); xOffsetSlider.value(5.1); yOffsetSlider.value(59.1); yWaveSlider.value(100); yWavezRotSlider.value(35);
	
  fullTextCheck.checked(true); fullText = true;
}

function brickSet() {
	reSetting();
	columnSlider.value(20); rowSlider.value(9); trackingSlider.value(17); lineSpaceSlider.value(7); typeXSlider.value(13); typeYSlider.value(20);
  speedSlider.value(-4); xWaveSlider.value(86);
  
  fullTextCheck.checked(true); fullText = true;
  invertCheck.checked(true);
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
  invertCheck.checked(true);
  strkColor = color(255);
  bkgdColor = color(0);
}

function zebraSet() {
	reSetting();
	columnSlider.value(50); rowSlider.value(8); trackingSlider.value(7); lineSpaceSlider.value(18.5); typeXSlider.value(6); typeYSlider.value(20); typeStrokeSlider.value(1);
  speedSlider.value(-4); xOffsetSlider.value(6.1); yOffsetSlider.value(5.1); yWaveSlider.value(33); yWavezRotSlider.value(18);

  fullTextCheck.checked(true); fullText = true;
}

function harlequinSet() {
	reSetting();
	columnSlider.value(40); rowSlider.value(7); trackingSlider.value(5); lineSpaceSlider.value(11); typeXSlider.value(9); typeYSlider.value(19); typeStrokeSlider.value(1.1);
  speedSlider.value(2); xOffsetSlider.value(2.1); yOffsetSlider.value(59.1);

  fullTextCheck.checked(true); fullText = true;
  invertCheck.checked(true);
  strkColor = color(255);
  bkgdColor = color(0);
}