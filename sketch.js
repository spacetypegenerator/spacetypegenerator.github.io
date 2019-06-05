// LETTER
var typeX, typeXSlider;
var typeY, typeYSlider;
var typeStroke, typeStrokeSlider;
var strecherXslider, strecherXsize;
var strecherX = 0;
var strecherYslider, strecherYsize;
var strecherY = 0;

// CYLINDER
var pieSlice;
var rSlider, radius;
var stackNumSlider, stackNum;
var rRotateSlider, rRotate;
var rOffsetSlider, rOffset;
var rWaveCountSlider, rWaveCount;
var rWaveSpeedSlider, rWaveSpeed;
var rWaveSlider, rWave;
var rZaxisSlider, rZaxis;
var rLongSlider, rLong;
var xRotTweakSlider,xRotTweak, yRotTweakSlider, yRotTweak, zRotTweakSlider, zRotTweak;
var rWaveOffset;
var stackHeight;
var stackHeightAdjust = 0;

// CAMERA
var xRotCamera, yRotCamera, zRotCamera;
var xRotCameraSlider, yRotCameraSlider, zRotCameraSlider;
var zoomCamera, zoomCameraSlider;

// STRING
var letter_select, inp, inpText;
var myText = [];

// SAVE
var exportButton;

// COLOR
var strkColor = 0;
var bkgdColor = 255;
var bkgdStrokeColor = 255;
var inp1, inp2, inp3, inp4, inp5, inp6;
var inpNumber = 1;

// PRESETS
var presetSimple, presetJellyfish, presetCrown, presetComplex, presetWeave, presetZebra, presetHoops;

function preload() {
 font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight, WEBGL);
  background(bkgdColor);
  smooth();
  textFont(font);
  frameRate(30);
  
  inp = select("#textfield");
  
  rSlider = createSlider(0,1000,250); rSlider.position(15,17); rSlider.style('width','100px');
  stackNumSlider = createSlider(1,30,1); stackNumSlider.position(15,47); stackNumSlider.style('width','100px');
  rRotateSlider = createSlider(-100,100,-5); rRotateSlider.position(15,77); rRotateSlider.style('width','100px');  
  rOffsetSlider = createSlider(0,PI/2,0,0.01); rOffsetSlider.position(15,107); rOffsetSlider.style('width','100px');    

  rWaveCountSlider = createSlider(0,10,2); rWaveCountSlider.position(15,147); rWaveCountSlider.style('width','100px');
  rWaveSpeedSlider = createSlider(0,100,0); rWaveSpeedSlider.position(15,177); rWaveSpeedSlider.style('width','100px');
  rWaveSlider = createSlider(0,200,0); rWaveSlider.position(15,207); rWaveSlider.style('width','100px');
  rLongSlider = createSlider(0,80,0); rLongSlider.position(15,237); rLongSlider.style('width','100px');
  rZaxisSlider = createSlider(0,100,0); rZaxisSlider.position(15,267); rZaxisSlider.style('width','100px');
  strecherXslider = createSlider(0,80,0); strecherXslider.position(15,297); strecherXslider.style('width','100px');
  strecherYslider = createSlider(0,100,0); strecherYslider.position(15,327); strecherYslider.style('width','100px');
  
  typeXSlider = createSlider(0,100,20); typeXSlider.position(15,367); typeXSlider.style('width','100px');
	typeYSlider = createSlider(0,100,40); typeYSlider.position(15,397); typeYSlider.style('width','100px');
	typeStrokeSlider = createSlider(0,10,2,0.1); typeStrokeSlider.position(15,427); typeStrokeSlider.style('width','100px');

  xRotTweakSlider = createSlider(0,45,0); xRotTweakSlider.position(15,517); xRotTweakSlider.style('width','100px');
  yRotTweakSlider = createSlider(0,45,0); yRotTweakSlider.position(15,547); yRotTweakSlider.style('width','100px');
  zRotTweakSlider = createSlider(0,45,0); zRotTweakSlider.position(15,577); zRotTweakSlider.style('width','100px');
  
  xRotCameraSlider = createSlider(-180,180,15); xRotCameraSlider.position(-20,height-107); xRotCameraSlider.style('width','100px'); xRotCameraSlider.style('rotate',270);
  yRotCameraSlider = createSlider(-180,180,0); yRotCameraSlider.position(20,height-107); yRotCameraSlider.style('width','100px'); yRotCameraSlider.style('rotate',270);
  zRotCameraSlider = createSlider(-180,180,0); zRotCameraSlider.position(60,height-107); zRotCameraSlider.style('width','100px'); zRotCameraSlider.style('rotate',270);
	zoomCameraSlider = createSlider(-500,500,0); zoomCameraSlider.position(15,height-20); zoomCameraSlider.style('width','100px');

//  exportButton = createButton('Save Loop'); exportButton.position(140,10); exportButton.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,35); prideButton.mousePressed(pride);

  presetSimple = createButton('Simple'); presetSimple.position(140,height-30); presetSimple.mousePressed(simpleSet);
  presetJellyfish = createButton('Jellyfish'); presetJellyfish.position(200,height-30); presetJellyfish.mousePressed(jellyfishSet);
  presetCrown = createButton('Crown'); presetCrown.position(270,height-30); presetCrown.mousePressed(crownSet);
  presetComplex = createButton('Complex'); presetComplex.position(330,height-30); presetComplex.mousePressed(complexSet);
  presetWeave = createButton('Weave'); presetWeave.position(405,height-30); presetWeave.mousePressed(weaveSet);
  presetZebra = createButton('Zebra'); presetZebra.position(465,height-30); presetZebra.mousePressed(zebraSet);
  presetHoops = createButton('Hoops'); presetHoops.position(515,height-30); presetHoops.mousePressed(hoopsSet);
  
  inp1 = createColorPicker('#000');inp1.position(140, 80);inp1.style('height', '20px');
 /*
  inp1check = createCheckbox('', true);inp1check.position(160, 82);
  inp2 = createColorPicker('#ff0000');inp2.position(180, 110);inp2.style('width', '20px');
  inp2check = createCheckbox('', false);inp2check.position(160, 112);
  inp3 = createColorPicker('#0000ff');inp3.position(180, 140);inp3.style('width', '20px');
  inp3check = createCheckbox('', false);inp3check.position(160, 142);
  inp4 = createColorPicker('#ffff00');inp4.position(180, 170);inp4.style('width', '20px');
  inp4check = createCheckbox('', false);inp4check.position(160, 172);
  inp5 = createColorPicker('#ffffff');inp5.position(180, 200);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(160, 202);
*/
  bkgdColorPicker = createColorPicker('#FFFFFF'); bkgdColorPicker.position(140, 120); bkgdColorPicker.style('height', '20px');
//  bkgdStrokeColorPicker = createColorPicker('#FFFFFF'); bkgdStrokeColorPicker.position(160, 310); bkgdStrokeColorPicker.style('height', '20px');
}

function draw(){
  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);
  inpText = String(inp.value());  

  radius = rSlider.value();
  stackNum = stackNumSlider.value();
  rRotate = rRotateSlider.value();
  rOffset = rOffsetSlider.value();
  rWaveCount = rWaveCountSlider.value();
  rWaveSpeed = rWaveSpeedSlider.value();
  rWave = rWaveSlider.value();  
  rZaxis = rZaxisSlider.value();
  strecherYsize = strecherYslider.value();
  strecherXsize = strecherXslider.value();
  rLong = rLongSlider.value();
  typeX = typeXSlider.value();
  typeY = typeYSlider.value();
  typeStroke = typeStrokeSlider.value();
  xRotCamera = xRotCameraSlider.value();
  yRotCamera = yRotCameraSlider.value();
  zRotCamera = zRotCameraSlider.value();
  xRotTweak = xRotTweakSlider.value();
  yRotTweak = yRotTweakSlider.value();
  zRotTweak = zRotTweakSlider.value();
  zoomCamera = zoomCameraSlider.value();
  
  stackHeight = (typeY+strecherYsize/2) + 5 + stackHeightAdjust;
  pieSlice = 2*PI/inpText.length;
  rWaveOffset = 2*PI/inpText.length*rWaveCount;

    push();
    translate(-width/2,-height/2);
    stroke(125);
    strokeWeight(1);
    line(10,130,130,130);
    line(10,350,130,350);
    rect(5,450,125,160);    
    line(185,height-43,500,height-43); 

    fill(125);
    textAlign(LEFT);

    textSize(9);
    text("Type Color",140,75);
    text("BACKGROUND",140,115);
//    text("INNER",145,300);

  
    text("CYLINDER: Radius " + radius,15,16);
    text("CYLINDER: Count " + stackNum,15,46);
    text("CYLINDER: Rotate " + rRotate,15,76);
    text("CYLINDER: Offset " + rOffset,15,106);
  //  line break
    text("WAVE: Count " + rWaveCount,15,146);
    text("WAVE: Speed " + rWaveSpeed,15,176);
    text("WAVE: Latitude  " + rWave,15,206);
    text("WAVE: Longitude " + rLong,15,236);
    text("WAVE: Ripple " + rZaxis,15,266);
    text("WAVE: X-Scale " + strecherXsize,15,296);
    text("WAVE: Y-Scale " + strecherYsize,15,326);
  // line break  
    text("TYPE: X-Scale " + typeX,15,366);
    text("TYPE: Y-Scale " + typeY,15,396);
    text("TYPE: Weight " + typeStroke,15,426);

    text("Use to smooth form\nafter LATITUDE (x,y)\nor RIPPLE (z) adjust",15,470);  
    text("TWEAK: X Rotation " + xRotTweak,15,516);
    text("TWEAK: Y Rotation " + yRotTweak,15,546);
    text("TWEAK: Z Rotation " + zRotTweak,15,576);

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
  
  // center stack
  translate(0,-(stackNum-1)*stackHeight/2);
  
  // rotation
  rotateY(frameCount*(rRotate/1000));
               	
  for(var i =0; i<inpText.length*stackNum; i++) {
    var ringSpot = i%inpText.length;
    letter_select = ringSpot;  
    
      if(floor(i/inpText.length)%2 === 1){
        strecherY = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)),-1,1,0,strecherYsize);
      } else {
        strecherY = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000) + PI),-1,1,0,strecherYsize);
      }

	    strecherX = map(sin(floor(i/inpText.length)*rWaveOffset+frameCount*(rWaveSpeed/1000)),-1,1,0,strecherXsize);
    
    push();
    // stack translates
    rotateY(floor(i/inpText.length)*rOffset);
    translate(0,floor(i/inpText.length)*stackHeight);
    // ring translates
    rotateY(ringSpot*pieSlice);
    
    translate(0,0,radius);
    if(rLong!=0){
      var rLonger = sin(floor(i/inpText.length)*rWaveOffset+frameCount*(rWaveSpeed/1000))*rLong;
			translate(0,0,rLonger);
    }
    if(rZaxis!=0){
      var rZaxiser = sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * rZaxis;
    	translate(0,rZaxiser,0);
    }
    if(rWave!=0){
      var rWaver = sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * rWave;
      translate(0,0,rWaver);
    }
    if(yRotTweak!=0){
	    rotateY(cos(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * -radians(yRotTweak));
    }
    if(xRotTweak!=0){      
      rotateX(cos(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * -radians(xRotTweak));
    }
    
		if(rLong!=0){
      // fix rLong y-rotation
      var prerLonger = sin(floor((i/inpText.length)-1)*rWaveOffset+frameCount*(rWaveSpeed/1000))*rLong;
      var postrLonger = sin(floor((i/inpText.length)+1)*rWaveOffset+frameCount*(rWaveSpeed/1000))*rLong;
      var rLongAdjust = atan2(stackHeight*2,(prerLonger-postrLonger))
      rotateX(rLongAdjust-PI/2);
    }
    
    if(zRotTweak!=0){
      rotateZ(cos(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * radians(zRotTweak));
    }
        
    translate(-(typeX+strecherX)/2,-(typeY+strecherY)/2,0);
    	// outer surface
    if(inpNumber == 6){
      setTextColor(floor(i/inpText.length));
    } else {
      strkColor = color(inp1.value())
      bkgdStrokeColor = lerpColor(strkColor, color(bkgdColorPicker.value()), 0.75);
    }
      stroke(strkColor);    
     	keyboardEngine();
    translate(0,0,-1);
   		// inner surface
    	stroke(bkgdStrokeColor);
     	keyboardEngine()
  	pop();
 	}
	pop();
}

function setTextColor(switcher) {
  let backgroundColor = color(bkgdColorPicker.value());
    if (switcher % 6 == 0) {
      strkColor = inp1;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 1) {
      strkColor = inp2;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 2) {
      strkColor = inp3;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 3) {
      strkColor = inp4;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 4) {
      strkColor = inp5;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 5) {
      strkColor = inp6;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
}

function reSetting() {
  stackHeightAdjust = 0;
	rSlider.value(250); stackNumSlider.value(1); rRotateSlider.value(-5); rOffsetSlider.value(0); rWaveCountSlider.value(2); rWaveSpeedSlider.value(0); rWaveSlider.value(0);
  rLongSlider.value(0); rZaxisSlider.value(0); strecherXslider.value(0); strecherYslider.value(0); typeXSlider.value(20); typeYSlider.value(40); typeStrokeSlider.value(2);
  xRotTweakSlider.value(0); yRotTweakSlider.value(0); zRotTweakSlider.value(0);
  xRotCameraSlider.value(15);  yRotCameraSlider.value(0);  zRotCameraSlider.value(0); zoomCameraSlider.value(0);
  
//  invertCheck.checked(false);
  strkColor = color(0);
	bkgdColor = color(255);
  bkgdStrokeColor = color(235);
}

function simpleSet() {
	reSetting();
	rSlider.value(185); stackNumSlider.value(8); rRotateSlider.value(-10); rOffsetSlider.value(0.2); rWaveSpeedSlider.value(75); rWaveSlider.value(41);
  xRotTweakSlider.value(24); yRotTweakSlider.value(27);
  xRotCameraSlider.value(20);
}

function jellyfishSet() {
	reSetting();
	rSlider.value(200); stackNumSlider.value(6); rOffsetSlider.value(0.15); rWaveCountSlider.value(3); rWaveSpeedSlider.value(100);
  rLongSlider.value(80); strecherXslider.value(23); typeXSlider.value(13); typeYSlider.value(64); typeStrokeSlider.value(.5);
  xRotCameraSlider.value(25);
  
//  invertCheck.checked(true);
	strkColor = color(255);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}

function crownSet() {
	reSetting();
  stackNumSlider.value(3); rRotateSlider.value(-5); rWaveCountSlider.value(4); rWaveSpeedSlider.value(50);
  rZaxisSlider.value(21); strecherYslider.value(76); typeXSlider.value(30); typeStrokeSlider.value(3);
  strecherXslider.value(-25); zoomCameraSlider.value(-500);
}

function complexSet() {
	reSetting();
	rSlider.value(178); stackNumSlider.value(11); rRotateSlider.value(0); rOffsetSlider.value(0.16); rWaveCountSlider.value(6); rWaveSpeedSlider.value(75); rWaveSlider.value(10);
  rLongSlider.value(31); typeXSlider.value(16); typeYSlider.value(40); typeStrokeSlider.value(2);
  xRotTweakSlider.value(15); yRotTweakSlider.value(35); zRotTweakSlider.value(0);
  xRotCameraSlider.value(-34);  yRotCameraSlider.value(10);  zRotCameraSlider.value(25);
  
//  invertCheck.checked(true);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}


function weaveSet() {
	reSetting();
  stackHeightAdjust = 30;
	rSlider.value(110); stackNumSlider.value(7); rRotateSlider.value(15); rOffsetSlider.value(0.62); rWaveCountSlider.value(5); rWaveSpeedSlider.value(30);
  rZaxisSlider.value(15); typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(1);
	zRotTweakSlider.value(33);
  xRotCameraSlider.value(15);  yRotCameraSlider.value(0);  zRotCameraSlider.value(0); zoomCameraSlider.value(0);
}

function zebraSet() {
	reSetting();
  stackHeightAdjust = 10;
	rSlider.value(110); stackNumSlider.value(7); rRotateSlider.value(20); rOffsetSlider.value(0.3); rWaveCountSlider.value(2); rWaveSpeedSlider.value(30); rWaveSlider.value(15);
  rZaxisSlider.value(15); strecherYslider.value(33); typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(1);
  xRotTweakSlider.value(9); yRotTweakSlider.value(24); zRotTweakSlider.value(22);
  xRotCameraSlider.value(15);  yRotCameraSlider.value(0);  zRotCameraSlider.value(0); zoomCameraSlider.value(0);
  
//  invertCheck.checked(true);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}

function hoopsSet() {
	reSetting();
  stackHeightAdjust = 30;
	rSlider.value(110); stackNumSlider.value(7); rRotateSlider.value(15); rOffsetSlider.value(0.62); rWaveCountSlider.value(1); rWaveSpeedSlider.value(100);
  rZaxisSlider.value(58); typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(1.5);
  zRotTweakSlider.value(28);
  xRotCameraSlider.value(-10);

//  invertCheck.checked(true);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}

function pride() {
  stackNumSlider.value(6);
  inpNumber = 6;
  
  inp1 = color('#e70000');inp2 = color('#ff8c00'); inp3 = color('#ffef00');inp4 = color('#00811f'); inp5 = color('#0044ff'); inp6 = color('#760089');
}

function saveLoop(){
}