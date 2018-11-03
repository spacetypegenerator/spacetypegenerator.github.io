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

// CAMERA
var xRotCamera, yRotCamera, zRotCamera;
var xRotCameraSlider, yRotCameraSlider, zRotCameraSlider;
var zoomCamera, zoomCameraSlider;

// STRING
var letter_select, inp, inpText;
var myText = [];

// COLOR
var invertCheck;
var strkColor = 0;
var bkgdColor = 255;
var bkgdStrokeColor = 235;

// SAVE
const btn = document.querySelector('button')
const chunks = [];

function record() {
  chunks.length = 0;
  let stream = document.querySelector('canvas').captureStream(30),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  btn.onclick = e => {
    recorder.stop();
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
  recorder.start();
  btn.textContent = 'stop recording';
}

function exportVideo(e) {
  var blob = new Blob(chunks);
  var vid = document.createElement('video');
  vid.id = 'recorded'
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();
}
btn.onclick = record;

function preload() {
 font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight, WEBGL);
    
  background(bkgdColor);
  smooth();
  textFont(font);
  
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
  
  invertCheck = createCheckbox('',false); invertCheck.position(130,height - 60);
  xRotCameraSlider = createSlider(-180,180,15); xRotCameraSlider.position(-20,height-107); xRotCameraSlider.style('width','100px'); xRotCameraSlider.style('rotate',270);
  yRotCameraSlider = createSlider(-180,180,0); yRotCameraSlider.position(20,height-107); yRotCameraSlider.style('width','100px'); yRotCameraSlider.style('rotate',270);
  zRotCameraSlider = createSlider(-180,180,0); zRotCameraSlider.position(60,height-107); zRotCameraSlider.style('width','100px'); zRotCameraSlider.style('rotate',270);
	zoomCameraSlider = createSlider(-500,500,0); zoomCameraSlider.position(15,height-20); zoomCameraSlider.style('width','100px');
  
  invertCheck.changed(inverter);
}

function draw(){
    
  background(bkgdColor);
  letter_select = 0;
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
  
  stackHeight = (typeY+strecherYsize/2)+5;
  pieSlice = 2*PI/inpText.length;
  rWaveOffset = 2*PI/inpText.length*rWaveCount;
    
  push();
  translate(-width/2,-height/2);
  stroke(bkgdStrokeColor);
  strokeWeight(1);
  line(10,130,130,130);
  line(10,350,130,350);
  rect(5,450,125,160);    
  
  fill(strkColor);
	textSize(9);
  textAlign(LEFT);
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
  text("WAVE: X-Scale " + strecherYsize,15,296);
  text("WAVE: Y-Scale " + strecherXsize,15,326);
// line break  
  text("TYPE: X-Scale " + typeX,15,366);
  text("TYPE: Y-Scale " + typeY,15,396);
  text("TYPE: Weight " + typeStroke,15,426);

  text("Use to smooth form\nafter LATITUDE (x,y)\nor RIPPLE (z) adjust",15,470);  
	text("TWEAK: X Rotation " + xRotTweak,15,516);
	text("TWEAK: Y Rotation " + yRotTweak,15,546);
	text("TWEAK: Z Rotation " + zRotTweak,15,576);
  
	text("INVERT",148,height-46);
	text("CAMERA: Zoom",15,height-22);
  
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
    
    if(strecherYsize!=0){
      if(floor(i/inpText.length)%2 === 1){
        strecherY = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)),-1,1,0,strecherYsize);
      } else {
        strecherY = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000) + PI),-1,1,0,strecherYsize)
      }
    }
		if(strecherXsize!=0){
	    strecherX = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000) + PI),-1,1,0,strecherXsize)
    }
    
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

function inverter() {
	if(this.checked()){
		strkColor = color(255);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
  } else {
  	strkColor = color(0);
    bkgdColor = color(255);
    bkgdStrokeColor = color(235);
  }
}
