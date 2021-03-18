let mainText1 = "BEYOND IMMEDIATE HORIZONS";
let pgTextSize = 128;

let uFontBol, uFontLig, uFontReg;

let pieSlices = 200;
let pieAdjust;
let stackHeight = 100;

// CYLINDER
let textureRepeats = 2;
let stackCount = 1;
let stackSpace = 0;
let stackOffset;
let waveCount = 1;
let cylLongWave = 0;
let cylLatWave = 0;
let surfaceWave = 0;
let stWaveOffset = 0;
let radius;

// FIELD
let fieldTextureRepeats = 2;
let fieldStackCount = 7;
let fieldStackSpace;
let fieldStackOffset;
let yAxisWave = 0;
let zAxisWave = 0;
let fieldYScale = 0;
let fieldLatOffset = 0;
let fieldLongOffset = 0;

// CASCADE
let cascadeRows = 14;
var casOffset = 0.1;
var casSlope = 1;
let waveBlock;
let mirrorSwitch = false;
let yBlock;

// glitchOn
let glitch = 1;
let glitchOn = true;
let glitchProb = 25;
let glitchWindow = 50;
let glitchSelect = [];
glitchSelect[0] = [];
let glitchAmount = [];
let glitchPace = 20;
let glitchClicker = 0;
let glitchBuild = 0;

let cameraXrot = 0.2;
let cameraYrot = 0;
let cameraZrot = 0;
let cameraZoom = -500;

let secretSwitch = 1;

let generatorSelect = 0;
let typeCselect = 3;
let backCselect = 5;

let pgTG = [];
let pgTGI = [];
let mainInd = [];
let startC, endC;
let bkgdColor, foreColor;

let recordSwitch = false;
let recordLength;

let speedWave = 0.02; // 0.03 // used for sample animations

let saveSize = 0;
let alphaSave = 0;

let wWidth, wHeight;

function preload(){
  uFontReg = loadFont('resources/UniversLTStd.otf')
}

function setup() {
  pixelDensity(2);
  wWidth = int(windowWidth);
  if(wWidth%2 == 1){
    wWidth++;
  }

  wHeight = int(windowHeight);
  if(wHeight%2 == 1){
    wHeight++;
  }

  noSmooth();
  frameRate(30);

  canvas = createCanvas(wWidth, wHeight, WEBGL);
  // const gl = canvas.GL;
  //
  // gl.enable(gl.CULL_FACE);
  // gl.cullFace(gl.FRONT_AND_BACK);

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  startC = color('#62cf5d');
  endC = color('#004b3f');

  pieAdjust = 2*PI/pieSlices;

smooth();
  updateGlitch1(1);

  drawTextures();
  generateRandom();

  stackOffset = map(5,0,100,0,pgT.width);

  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  radius = (heightRatio * textureRepeats)/(2*PI);
}

function draw() {
  clear();

  noFill(); noStroke();
  rectMode(CENTER);

  if(recordSwitch){
    document.querySelector('#download').textContent = 'RECORDING';
  }

  if(backCselect==4){
    background(255);
  } else {
    background(0);
  }

  push();
  translate(0,0,-5000);
  scale(10);

  if(backCselect==1){
    texture(pgGradient1);
    rect(0,0,windowWidth,windowHeight);
  } else if(backCselect==2){
    texture(pgGradient2);
    rect(0,0,windowWidth,windowHeight);
  } else if(backCselect==3){
    texture(pgGradient3);
    rect(0,0,windowWidth,windowHeight);
  }
  pop();

  push();
  translate(0,0,cameraZoom);

  rotateY(cameraYrot);
  rotateX(cameraXrot);
  rotateZ(cameraZrot);

  if(generatorSelect == 0){
    if(glitchOn){
      cylinderGlitch();
    }
    // blendMode(BLEND);
    cylinderEngine();
  } else if(generatorSelect == 1){
    if(glitchOn){
      fieldGlitch();
    }
    // blendMode(BLEND);
    fieldEngine();
  } else {
    if(glitchOn){
      cascadeGlitch();
    }
    // blendMode(BLEND);
    cascadeEngine();
  }

  pop();

  if(glitchOn && glitchClicker > glitchWindow){
    generateRandom();
    glitchClicker = 0;
  }

  glitchClicker ++;

  if(glitchOn && (glitchClicker<glitchPace/3)){
    glitchBuild = 0;
  } else if(glitchOn && (glitchClicker<glitchPace*2/3)){
    glitchBuild = 10;
  } else if(glitchOn && (glitchClicker<glitchPace)){
    glitchBuild = 15;
  }

  if(recordSwitch && frameCount>recordStop){
    recordSwitch = false;
    stopRecording();
    document.querySelector('#download').textContent = 'STARTING UP...';
    // location.reload();
  }

  if(alphaSave>0){
    if(saveSize==0){
      noFill(); stroke(255,alphaSave);
      rect(0,0,1080,1080);
      noFill(); stroke(0,alphaSave);
      rect(1,1,1080,1080);
    } else if(saveSize==1){
      noFill(); stroke(255,alphaSave);
      rect(0,0,1536,864);
      noFill(); stroke(0,alphaSave);
      rect(1,1,1536,864);
    }
    alphaSave -= 8;
  }

}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function sinEngine(aCount, aLength, bCount, bLength, Speed, slopeN) {
  var sinus = sin(frameCount*Speed + aCount*aLength + bCount*bLength);
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function sinEngine2(aCount, aLength, bCount, bLength, cCount, cLength, Speed, slopeN) {
  var sinus = sin(frameCount*Speed + aCount*aLength + bCount*bLength + cCount*cLength);
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function cylinderEngine(){
  let pieAngle = -2*PI/pieSlices;
  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  radius = (heightRatio * textureRepeats)/(2*PI);
  let latWaveOffset = (2*PI*waveCount)/pieSlices;
  let segmentLength = (2*PI*radius)/pieSlices;

  push();
  translate(0,-(stackCount*stackHeight + (stackCount-1)*stackSpace)/2,0);

  let spinSection = (2*PI)/textureRepeats;
  rotateY(-(frameCount)*speedWave);

  textureMode(NORMAL);

  for(var p = 0; p<2; p++){ // 0 back, 1 front
     for(var s = 0; s<2; s++){ // 0 inside, 1 outside
      let neuR;

      for(var st = 0; st< stackCount; st++){
        if(s==0){
          texture(pgTGI[st]);
          neuR = radius;
        } else {
          texture(pgTG[st]);
          neuR = radius + 0.1;
        }

        beginShape(TRIANGLE_STRIP);

        var neuStart = ((frameCount)*speedWave)/pieAdjust - cameraYrot/pieAdjust;

        for(var ps = p*(pieSlices/2) + neuStart;  ps<= (p+1)*(pieSlices/2) + neuStart; ps++){
          var waverTop = sinEngine(ps, latWaveOffset, st, stWaveOffset, speedWave, 1) * cylLatWave;
          var waverBot = sinEngine(ps, latWaveOffset, st+1, stWaveOffset, speedWave, 1) * cylLatWave;

          var waverTopLong = sinEngine(0, 0, st, stWaveOffset, speedWave, 1) * cylLongWave;
          var waverBotLong = sinEngine(0, 0, st+1, stWaveOffset, speedWave, 1) * cylLongWave;

          var waverSurface = sinEngine2(ps, latWaveOffset, st, stWaveOffset, (st%2)*secretSwitch, PI, speedWave, 1) * surfaceWave;

          var xTop = cos(ps*pieAngle) * (neuR + waverTop + waverTopLong);
          var xBot = cos(ps*pieAngle) * (neuR + waverBot + waverBotLong);
          var yTop = st * stackHeight + st*stackSpace + waverSurface;
          var yBot = (st+1) * stackHeight + st*stackSpace + waverSurface;
          var zTop = sin(ps*pieAngle) * (neuR + waverTop);
          var zBot = sin(ps*pieAngle) * (neuR + waverBot);

          let u = map((ps*segmentLength + st*stackOffset)%heightRatio,0,heightRatio,0,1);

          let vTop = 0;
          let vBot = 1;

          // if(glitchOn && glitchClicker<glitchPace && glitchSelect[22][st]<glitchProb){
          //   vTop += map(glitchAmount[22][st] + glitchBuild,0,100,0,1);
          //   vBot += map(glitchAmount[23][st] + glitchBuild,0,100,0,1);
          // }

          vertex(xTop,yTop,zTop,u,vTop);
          vertex(xBot,yBot,zBot,u,vBot);

          if((ps*segmentLength + st*stackOffset)%heightRatio > heightRatio - segmentLength){
            vertex(xTop,yTop,zTop,0,vTop);
            vertex(xBot,yBot,zBot,0,vBot);
          }
        }
        endShape();
      }
    }
  }
  pop();
}

function fieldEngine(){
  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  let stripLength = heightRatio * fieldTextureRepeats;
  let xCount = pieSlices * fieldTextureRepeats;
  let xSpace = stripLength/xCount;
  let ySpace = stackHeight;

  push();
  translate(-stripLength/2, -(fieldStackCount*stackHeight + (fieldStackCount-1)*fieldStackSpace)/2,0);


  for(var y = 0; y<fieldStackCount; y++){
    textureMode(NORMAL);

    texture(pgTG[y]);
    beginShape(TRIANGLE_STRIP);

    var neuStart = 0;

    for(var x = 0 + neuStart; x<=xCount; x++){

      let yScaleWave = sinEngine2(x,fieldLatOffset,y,fieldLongOffset, (y%2)*secretSwitch, PI, speedWave, 1) * fieldYScale/2;

      let mainX = x * xSpace;
      let mainY = y * ySpace + sinEngine(x,fieldLatOffset,y,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace + yScaleWave;
      let mainZ = sinEngine(x,fieldLatOffset,y,fieldLongOffset, speedWave, 1) * zAxisWave;

      let mainYbot = (y+1) * ySpace + sinEngine(x,fieldLatOffset,y+1,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace -yScaleWave;
      let mainZbot = sinEngine(x,fieldLatOffset,y+1,fieldLongOffset, speedWave, 1) * zAxisWave;

      let u = map((x*xSpace + y*fieldStackOffset)%heightRatio,0,heightRatio,0,1);

      let vTop = 0;
      let vBot = 1;

      vertex(mainX,mainY,mainZ, u, vTop);
      vertex(mainX,mainYbot,mainZbot, u, vBot);

      if((x*xSpace + y*fieldStackOffset)%heightRatio >= heightRatio-xSpace){
        vertex(mainX,mainY,mainZ, 0, vTop);
        vertex(mainX,mainYbot,mainZbot, 0, vBot);
      }
    }
    endShape();
  }
  pop();
}

function cascadeEngine(){
  let rows = parseInt(cascadeRows);
  let step = (sq(rows)+rows)/2;
  waveBlock = 2*PI/rows;
  if(mirrorSwitch == true){
    yBlock = height/(step*2);
  } else {
     yBlock = height/step;
  }

  push();
  translate(-pgT.width/2,0);
  translate(0,-height/2);

  for(var k = 0; k<mainText1.length; k++){
    push();
    for(var i = 0; i<rows; i++){
      typeYfigure = map(sinEngine(i,waveBlock,k,casOffset,speedWave/2,casSlope),-1,1,yBlock,rows*yBlock);

      image(mainInd[k][i],0,0,mainInd[k][i].width,typeYfigure);

      translate(0,typeYfigure);
    }
    pop();
    translate(mainInd[k][0].width,0);
  }
  pop();

  if(mirrorSwitch){
    push();
    translate(-pgT.width/2,0);
    for(var m = 0; m<mainText1.length; m++){
      push();
      for(var n = 1; n<rows+1; n++){
        typeYfigure = map(sinEngine(rows-n,waveBlock,m,casOffset,speedWave/2,casSlope),-1,1,yBlock,rows*yBlock);

        image(mainInd[m][rows-n],0,0,mainInd[m][rows-n].width,typeYfigure);

        translate(0,typeYfigure);
      }
      pop();
      translate(mainInd[m][0].width,0);
    }

  }
}
