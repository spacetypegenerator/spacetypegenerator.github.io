// LETTER
var typeX = 20;
var typeY = 40;
var typeStroke, typeStrokeSlider;
var strecherXslider, strecherXsize;
var strecherX = 0;
var strecherYslider, strecherYsize;
var strecherY = 0;
var SA;

// FIELD
var column;
var row, rowSlider;
var tracking, trackSlider;
var lineSpace, lineSpaceSlider;
var xSpace, ySpace;

// WAVE
var speed, speedSlider;
var xOffset = 3.14;
var yOffset = 3.14;
var zWave, zWaveSlider, zWaveCheck;
var zWaver = 0;
var zWaveChecked = 0;
var xWave, xWaveSlider, xWaveCheck;
var xWaver = 0;
var xWaveChecked = 0;
var yWave, yWaveSlider, yWaveCheck;
var yWaver = 0;
var yWaveChecked = 0;
var yWavezRot = 0;
var yWavezRoter = 0;
var yWavexStr, yWavexStrSlider;
var yWavexStrer = 0;

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
var invertCheck = false;

var strkColor = 0;
var bkgdColor = 255;

// SAVE
var exportButton;

// PRESETS
var presetWobbly, presetDriftin, presetSkyDancer, presetFlag1, presetFlag2, presetLava;
var presetWeavin, presetPopNLock, presetShuffle, presetRollin, presetWiggle, presetGritFund;

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

  typeStrokeSlider = createSlider(1,5,2,0.5); typeStrokeSlider.position(25,147); typeStrokeSlider.style('width','100px');
  
  speedSlider = createSlider(-2,2,2); speedSlider.position(25,187); speedSlider.style('width','100px');    

  zWaveSlider = createSlider(0,200,0); zWaveSlider.position(25,227); zWaveSlider.style('width','100px');
  zWaveCheck = createCheckbox('',false); zWaveCheck.position(130,226);
  xWaveSlider = createSlider(0,200,0); xWaveSlider.position(25,257); xWaveSlider.style('width','100px');
  xWaveCheck = createCheckbox('',false); xWaveCheck.position(130,256);
  yWaveSlider = createSlider(0,200,0); yWaveSlider.position(25,287); yWaveSlider.style('width','100px');
  yWaveCheck = createCheckbox('',false); yWaveCheck.position(130,286);

  fullTextCheck = createCheckbox('',true); fullTextCheck.position(140,90);
  fullText = true;
  xRotCameraSlider = createSlider(-180,180,0); xRotCameraSlider.position(-20,height-107); xRotCameraSlider.style('width','100px'); xRotCameraSlider.style('rotate',270);
  yRotCameraSlider = createSlider(-180,180,0); yRotCameraSlider.position(20,height-107); yRotCameraSlider.style('width','100px'); yRotCameraSlider.style('rotate',270);
  zRotCameraSlider = createSlider(-180,180,0); zRotCameraSlider.position(60,height-107); zRotCameraSlider.style('width','100px'); zRotCameraSlider.style('rotate',270);
	zoomCameraSlider = createSlider(-800,800,0); zoomCameraSlider.position(15,height-20); zoomCameraSlider.style('width','100px');

  exportButton = createButton('Export PNG'); exportButton.position(140,20); exportButton.mousePressed(exportPNG);
  presetWobbly = createButton('Wobbly'); presetWobbly.position(140,height-50); presetWobbly.mousePressed(wobblySet);
  presetDriftin = createButton('Driftin\''); presetDriftin.position(200,height-50); presetDriftin.mousePressed(driftinSet);
  presetSkyDancer = createButton('Sky Dancer'); presetSkyDancer.position(260,height-50); presetSkyDancer.mousePressed(skydancerSet);
  presetFlag1 = createButton('Flag1'); presetFlag1.position(345,height-50); presetFlag1.mousePressed(flag1Set);
  presetFlag2 = createButton('Flag2'); presetFlag2.position(395,height-50); presetFlag2.mousePressed(flag2Set);
  presetLava = createButton('Lava'); presetLava.position(445,height-50); presetLava.mousePressed(lavaSet);
  presetWeavin = createButton('Weavin\''); presetWeavin.position(140,height-30); presetWeavin.mousePressed(weavinSet);
  presetPopNLock = createButton('Pop n\' Lock'); presetPopNLock.position(200,height-30); presetPopNLock.mousePressed(popnlockSet);
  presetShuffle = createButton('Shuffle'); presetShuffle.position(280,height-30); presetShuffle.mousePressed(shuffleSet);
  presetRollin = createButton('Rollin\''); presetRollin.position(340,height-30); presetRollin.mousePressed(rollinSet);
  presetWiggle = createButton('Wiggle'); presetWiggle.position(395,height-30); presetWiggle.mousePressed(wiggleSet);
  presetGritFund = createButton('Grit Fund'); presetGritFund.position(455,height-30); presetGritFund.mousePressed(gritfundSet);  
  
  radioBkgd = createRadio();
  radioBkgd.position(660,height-60);
  radioBkgd.option(' ', 1);
  radioBkgd.option(' ', 2);
  radioBkgd.option(' ', 3);
  radioBkgd.option(' ', 4);
  radioBkgd.option(' ', 5);
  radioBkgd.option(' ', 6);
  radioBkgd.option(' ', 7);
  radioBkgd.value('1').checked = true;
  
  radioStroke = createRadio();
  radioStroke.position(660,height-30);
  radioStroke.option(' ', 1);
  radioStroke.option(' ', 2);
  radioStroke.option(' ', 3);
  radioStroke.option(' ', 4);
  radioStroke.option(' ', 5);
  radioStroke.option(' ', 6);
  radioStroke.option(' ', 7);
  radioStroke.value('3').checked = true;
  
	zWaveCheck.changed(zWaveChecker);
	xWaveCheck.changed(xWaveChecker);
	yWaveCheck.changed(yWaveChecker);
  fullTextCheck.changed(fullTexter);
//    inpText = String(inp.value());  
  columnSlider.value(String(inp.value()).length);
}

function draw(){
  if(radioBkgd.value() == 1){
    bkgdColor = color(255);
  } else if(radioBkgd.value() == 2){
    bkgdColor = color('#797fff'); // indigo
  } else if(radioBkgd.value() == 3){
    bkgdColor = color('#ec238c'); // magenta
  } else if(radioBkgd.value() == 4){
    bkgdColor = color('#fbb040'); // orange
  } else if(radioBkgd.value() == 5){
    bkgdColor = color('#ff6528'); // red
  } else if(radioBkgd.value() == 6){
    bkgdColor = color('#d77bff'); // purple
  } else if(radioBkgd.value() == 7){
    bkgdColor = color('#30dbee'); // cyan
  }
  
  if(radioStroke.value() == 1){
    strkColor = color(255);
  } else if(radioStroke.value() == 2){
    strkColor = color('#797fff');
  } else if(radioStroke.value() == 3){
    strkColor = color('#ec238c');
  } else if(radioStroke.value() == 4){
    strkColor = color('#fbb040');
  } else if(radioStroke.value() == 5){
    strkColor = color('#ff6528');
  } else if(radioStroke.value() == 6){
    strkColor = color('#d77bff');
  } else if(radioStroke.value() == 7){
    strkColor = color('#30dbee');
  }

  background(bkgdColor);
  letter_select = 0;
  inpText = String(inp.value());  

  if(keyIsPressed) {  columnSlider.value(inpText.length); }
  column = columnSlider.value(); 
  row = rowSlider.value();
  tracking = trackingSlider.value();
  lineSpace = lineSpaceSlider.value();

  speed = speedSlider.value();
  zWave = zWaveSlider.value();
  xWave = xWaveSlider.value();
  yWave = yWaveSlider.value();
  
  typeStroke = typeStrokeSlider.value();
  
  xRotCamera = xRotCameraSlider.value();
  yRotCamera = yRotCameraSlider.value();
  zRotCamera = zRotCameraSlider.value();
  zoomCamera = zoomCameraSlider.value();
  
  SA = typeStroke/2;
  doubleQuoteSwitch =1;
  singleQuoteSwitch =1;
  
	xSpace = typeX + tracking;
	ySpace = typeY + lineSpace;
  
  if(mouseX>145 && mouseX<220 && mouseY>18 && mouseY<45){
  } else {
    push();
    translate(-width/2,-height/2);
    
    stroke(strkColor);
    strokeWeight(1);
    line(10,130,130,130);
    line(10,170,130,170);  	
    line(10,210,130,210);  	
    line(10,315,130,315);  
    line(185,height-63,500,height-63); 
    
    fill(strkColor);
    textAlign(LEFT);
    
    textSize(13);
    rotateZ(-PI/2);
    text("GRID",-120,17);
//    text("TYPE",-170,17);
//    text("WAVE",-320,17);
    text("AMPLITUDE",-305,17);
    rotateZ(PI/2);

    textSize(9);    
    text("GRID: Columns " + column,25,16);
    text("GRID: Rows " + row,25,46);
    text("GRID: Tracking " + tracking,25,76);
    text("GRID: Line Space " + lineSpace,25,106);

    text("TYPE: Weight " + typeStroke,25,146);

    text("WAVE: Speed " + speed,25,186);  

    text("AMPLITUDE: Z Axis " + zWave,25,226);
    text("OFFSET",150,240);  
    text("AMPLITUDE: X Axis " + xWave,25,256);
    text("OFFSET",150,270);  
    text("AMPLITUDE: Y Axis " + yWave,25,286);
    text("OFFSET",150,300);  

    text("FULL TEXT",158,104);
    text("CAMERA: Zoom",15,height-22);
		text("PRESETS", 145,height-60);

    textAlign(RIGHT);
		text("BACKGROUND", 650,height-48);
		text("STROKE", 650,height-16);   

    noStroke();
    for(var j=0;j<2;j++){
      push();
      translate(40,j*30);
        fill(255);
        ellipse(629,height-50,23,23);
        fill('#797fff');
        ellipse(650,height-50,23,23);
        fill('#ec238c');
        ellipse(672,height-50,23,23);
        fill('#fbb040');
        ellipse(694,height-50,23,23);
        fill('#ff6528');
        ellipse(716,height-50,23,23);
        fill('#d77bff');
        ellipse(738,height-50,23,23);
        fill('#30dbee');
        ellipse(760,height-50,23,23);
      pop();
    }
		
    fill(strkColor);
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
//  if(yWavexStr != 0){
		yWavexStrer = map(cosEngine2(yWaveChecked,xOffset,i%column,yOffset,floor(i/column),speed,1),-1,1,0,yWavexStr);
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
  typeX = 20; typeY = 40; xOffset = 3.1; yOffset = 3.1; yWavezRot = 0;
	columnSlider.value(33); rowSlider.value(7); trackingSlider.value(5); lineSpaceSlider.value(5); typeStrokeSlider.value(2);
  speedSlider.value(-2); 
  xWaveSlider.value(0); zWaveSlider.value(0); yWaveSlider.value(0);
	xRotCameraSlider.value(0); yRotCameraSlider.value(0); zRotCameraSlider.value(0); zoomCameraSlider.value(0); 
  xWaveCheck.checked(false); yWaveCheck.checked(false); zWaveCheck.checked(false);
  
  fullTextCheck.checked(false); fullText = false;
  strkColor = color(0);
  bkgdColor = color(255);  
}

function wobblySet() {
	reSetting();
  typeX = 72; typeY = 94;
	columnSlider.value(13); rowSlider.value(4); trackingSlider.value(14); lineSpaceSlider.value(41);
	typeStrokeSlider.value(4.8);
  xOffset = 5.1; yOffset = 0.1;
  speedSlider.value(1);
  zWaveSlider.value(103); zWaveCheck.checked(true);
  xWaveSlider.value(10);
  yWaveSlider.value(32); yWaveCheck.checked(true);
	xRotCameraSlider.value(4); yRotCameraSlider.value(52); zRotCameraSlider.value(-2); zoomCameraSlider.value(-500);
  radioBkgd.value('2'); radioStroke.value('1');
	
  inp.value("Applications Now Open     ");
  
  fullTextCheck.checked(true); fullText = true;
}

function driftinSet() {
	reSetting();
  typeX = 84; typeY = 94;
	columnSlider.value(5); rowSlider.value(5); trackingSlider.value(15); lineSpaceSlider.value(39);
	typeStrokeSlider.value(4.3);
  xOffset = 8.1; yOffset = 0.1;
  speedSlider.value(-1);
  zWaveSlider.value(165);
  xWaveSlider.value(30);
  yWaveSlider.value(0);
	xRotCameraSlider.value(8); yRotCameraSlider.value(44); zRotCameraSlider.value(8); zoomCameraSlider.value(-165);
  radioBkgd.value('7'); radioStroke.value('1');
	
  inp.value("ApplyToday");
  
  fullTextCheck.checked(true); fullText = true;
}

function skydancerSet() {
	reSetting();
  typeX = 84 * 0.8; typeY = 94 * 0.8;
	columnSlider.value(8); rowSlider.value(4); trackingSlider.value(15); lineSpaceSlider.value(42);
	typeStrokeSlider.value(4.34);
  xOffset = 39.1; yOffset = 1.31;
  speedSlider.value(1); 
  zWaveSlider.value(200); zWaveCheck.checked(true);
  xWaveSlider.value(200);
  yWaveSlider.value(70);
	xRotCameraSlider.value(-36); yRotCameraSlider.value(8); zRotCameraSlider.value(-30); zoomCameraSlider.value(-165);
  radioBkgd.value('3'); radioStroke.value('1');
	
  inp.value("workshop");
  
  fullTextCheck.checked(true); fullText = true;
}

function flag1Set() {
	reSetting();
  typeX = 72; typeY = 94;
	columnSlider.value(10); rowSlider.value(3); trackingSlider.value(12); lineSpaceSlider.value(66);
	typeStrokeSlider.value(4.74);
  xOffset = 8.1; yOffset = 2.51;
  speedSlider.value(-2); 
  zWaveSlider.value(135); zWaveCheck.checked(true);
  xWaveSlider.value(16);
  yWaveSlider.value(20);
	xRotCameraSlider.value(58); yRotCameraSlider.value(-24); zRotCameraSlider.value(16); zoomCameraSlider.value(-245);
  radioBkgd.value('7'); radioStroke.value('1');
	
  inp.value("Guidelines");
  
  fullTextCheck.checked(true); fullText = true;
}

function flag2Set() {
	reSetting();
  typeX = 80; typeY = 95;
	columnSlider.value(12); rowSlider.value(4); trackingSlider.value(14); lineSpaceSlider.value(35);
	typeStrokeSlider.value(4.74);
  xOffset = 12.1; yOffset = 2.51;
  speedSlider.value(-2); 
  zWaveSlider.value(170);
  xWaveSlider.value(18);
  yWaveSlider.value(58);
	xRotCameraSlider.value(28); yRotCameraSlider.value(42); zRotCameraSlider.value(-8); zoomCameraSlider.value(-355);
  radioBkgd.value('2'); radioStroke.value('1');
	
  inp.value("ApplicationsNow Open.   ");
  
  fullTextCheck.checked(true); fullText = true;
}

function lavaSet() {
	reSetting();
  typeX = 72; typeY = 94;
	columnSlider.value(12); rowSlider.value(3); trackingSlider.value(12); lineSpaceSlider.value(41);
	typeStrokeSlider.value(4.74);
  xOffset = 1.31; yOffset = 15.2;
  speedSlider.value(-1); 
  zWaveSlider.value(56.5);
  xWaveSlider.value(18); xWaveCheck.checked(true);
  yWaveSlider.value(42.4);
	xRotCameraSlider.value(-30); yRotCameraSlider.value(14); zRotCameraSlider.value(2); zoomCameraSlider.value(-500);
  radioBkgd.value('5'); radioStroke.value('1');
	
  inp.value("Experimental");
  
  fullTextCheck.checked(true); fullText = true;
}

function weavinSet() {
	reSetting();
  typeX = 80 * 0.8; typeY = 95 * 0.8;
	columnSlider.value(12); rowSlider.value(5); trackingSlider.value(14); lineSpaceSlider.value(43);
	typeStrokeSlider.value(4.74);
  xOffset = 3.73; yOffset = 0.1;
  speedSlider.value(-1.5); 
  zWaveSlider.value(141); zWaveCheck.checked(true);
  xWaveSlider.value(0); 
  yWaveSlider.value(24.2);
	xRotCameraSlider.value(50); yRotCameraSlider.value(48); zRotCameraSlider.value(-44); zoomCameraSlider.value(-420);
  radioBkgd.value('6'); radioStroke.value('1');
	
  inp.value("Now Open.   Applications");
  
  fullTextCheck.checked(true); fullText = true;
}

function popnlockSet() {
	reSetting();
  typeX = 70 * 0.8; typeY = 104 * 0.8;
	columnSlider.value(17); rowSlider.value(3); trackingSlider.value(15); lineSpaceSlider.value(33);
	typeStrokeSlider.value(4.74);
  xOffset = 3.71; yOffset = 1.31;
  speedSlider.value(-2.3); 
  zWaveSlider.value(133); 
  xWaveSlider.value(40); 
  yWaveSlider.value(40); yWaveCheck.checked(true);
	xRotCameraSlider.value(10); yRotCameraSlider.value(-22); zRotCameraSlider.value(6); zoomCameraSlider.value(-500);
  radioBkgd.value('1'); radioStroke.value('2');
	
  inp.value("   New Website   Gritfundbmore.org");
  
  fullTextCheck.checked(true); fullText = true;
}

function shuffleSet() {
	reSetting();
  typeX = 70; typeY = 104;
	columnSlider.value(12); rowSlider.value(4); trackingSlider.value(15); lineSpaceSlider.value(33);
	typeStrokeSlider.value(4.74);
  xOffset = 9.81; yOffset = 0.1;
  speedSlider.value(-1.5); 
  zWaveSlider.value(96); zWaveCheck.checked(true);
  xWaveSlider.value(48); 
  yWaveSlider.value(18); 
	xRotCameraSlider.value(8); yRotCameraSlider.value(-22); zRotCameraSlider.value(6); zoomCameraSlider.value(-500);
  radioBkgd.value('5'); radioStroke.value('1');
	
  inp.value("New Website ");
  
  fullTextCheck.checked(true); fullText = true;
}

function rollinSet() {
	reSetting();
  typeX = 103 * 0.8; typeY = 130 * 0.8;
	columnSlider.value(4); rowSlider.value(3); trackingSlider.value(11); lineSpaceSlider.value(46);
	typeStrokeSlider.value(5.1);
  xOffset = 4.3; yOffset = 0.1;
  speedSlider.value(-2); 
  zWaveSlider.value(123);
  xWaveSlider.value(0); 
  yWaveSlider.value(30); 
	xRotCameraSlider.value(52); yRotCameraSlider.value(30); zRotCameraSlider.value(-24); zoomCameraSlider.value(-95);
  radioBkgd.value('4'); radioStroke.value('1');
	
  inp.value("GritFundOpen");
  
  fullTextCheck.checked(true); fullText = true;
}

function wiggleSet() {
	reSetting();
  typeX = 80; typeY = 94;
	columnSlider.value(9); rowSlider.value(3); trackingSlider.value(12); lineSpaceSlider.value(65);
	typeStrokeSlider.value(4.34);
  xOffset = 1.31; yOffset = 0.1;
  speedSlider.value(1); 
  zWaveSlider.value(54);
  xWaveSlider.value(20); xWaveCheck.checked(true);
  yWaveSlider.value(36); 
	xRotCameraSlider.value(26); yRotCameraSlider.value(16); zRotCameraSlider.value(-16); zoomCameraSlider.value(-165);
  radioBkgd.value('5'); radioStroke.value('1');
	
  inp.value("Grantees ");
  
  fullTextCheck.checked(true); fullText = true;
}

function gritfundSet() {
	reSetting();
  typeX = 90; typeY = 100;
	columnSlider.value(5); rowSlider.value(2); trackingSlider.value(20); lineSpaceSlider.value(18);
	typeStrokeSlider.value(4.1);
  xOffset = 17.1; yOffset = 0.1;
  speedSlider.value(-2); 
  zWaveSlider.value(131);
  xWaveSlider.value(131);
  yWaveSlider.value(0); 
	xRotCameraSlider.value(20); yRotCameraSlider.value(-58); zRotCameraSlider.value(20); zoomCameraSlider.value(0);
  radioBkgd.value('1'); radioStroke.value('2');
	
  inp.value("Grit Fund ");
  
  fullTextCheck.checked(true); fullText = true;
}