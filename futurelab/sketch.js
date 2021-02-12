let mainText1 = "FUTURE LAB";
let mainInd = [];
let pgTextSize = 128;

let uFontBol, uFontLig, uFontReg;

let pieSlices = 200;
let pieAdjust;
let stackHeight = 100;

// CYLINDER
let textureRepeats = 3;
let stackCount = 8;
let stackSpace = 0;
let stackOffset;
let cylLatWave;
let waveCount = 1;
let stWaveOffset = 0;
let cylLongWave = 0;
let surfaceWave = 0;
let radius;

// FIELD
let fieldTextureRepeats = 3;
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

let cameraXrot = 0;
let cameraYrot = 0;
let cameraZrot = 0;
let cameraZoom = -500;

let secretSwitch = 1;

let generatorSelect = 0;
let typeCselect = 1;
let backCselect = 5;

function preload(){
  uFontBol = loadFont('resources/UniversLTStd-Bold.otf');
  uFontLig = loadFont('resources/UniversLTStd-Light.otf');
  uFontReg = loadFont('resources/UniversLTStd.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  pieAdjust = 2*PI/pieSlices;
  // recordBut = createButton("Record"); recordBut.position(40,40); recordBut.mousePressed(recordThis);

  frameRate(30);
  drawTextures();

  stackOffset = map(5,0,100,0,pgT.width);

  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  radius = (heightRatio * textureRepeats)/(2*PI);

  cylLatWave = map(33,0,100,0,radius);
  stWaveOffset = map(40,0,100,0,1);
}

function draw() {
  clear();

  push();
  translate(0,0,cameraZoom);

  rotateY(cameraYrot);
  rotateX(cameraXrot);
  rotateZ(cameraZrot);

  background(bkgdColor);

  blendMode(BLEND);

  if(generatorSelect == 0){
    cylinderEngine();
  } else if(generatorSelect == 1){
    fieldEngine();
  } else {
    cascadeEngine();
  }

  pop();

  if(typeCselect < 4 && backCselect==5){
    blendMode(MULTIPLY);
    push();
    translate(-width/2,-height/2,500);
    if(typeCselect==1){
      image(pgGradient1,0,0);
    } else if(typeCselect==2){
      image(pgGradient2,0,0);
    } else if(typeCselect==3){
      image(pgGradient3,0,0);
    }
    pop();
  } else if (typeCselect == 4){
    blendMode(SCREEN);
    push();
    translate(-width/2,-height/2,500);
    if(backCselect==1){
      image(pgGradient1,0,0);
    } else if(backCselect==2){
      image(pgGradient2,0,0);
    } else if(backCselect==3){
      image(pgGradient3,0,0);
    }
    pop();
  }


}

function sinEngine(aCount, aLength, bCount, bLength, Speed, slopeN) {
  var sinus = sin(frameCount*Speed/10 + aCount*aLength + bCount*bLength);
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function sinEngine2(aCount, aLength, bCount, bLength, cCount, cLength, Speed, slopeN) {
  var sinus = sin(frameCount*Speed/10 + aCount*aLength + bCount*bLength + cCount*cLength);
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
  rotateY(-(frameCount+5)*0.01);

  textureMode(NORMAL);

  for(var p = 0; p<2; p++){ // back, front
    for(var s = 0; s<2; s++){ // inside, outside
      let neuR;
      if(s==0){
        texture(pgTinside);
        neuR = radius;
;
      } else {
        texture(pgT);
        neuR = radius + 1;
      }

      for(var st = 0; st< stackCount; st++){
        beginShape(TRIANGLE_STRIP);

        var neuStart = ((frameCount-10)*0.01)/pieAdjust - cameraYrot/pieAdjust;
        for(var ps = p*(pieSlices/2) + neuStart;  ps<= (p+1)*(pieSlices/2) + neuStart; ps++){
          var waverTop = sinEngine(ps, latWaveOffset, st, stWaveOffset, 1, 1) * cylLatWave;
          var waverBot = sinEngine(ps, latWaveOffset, st+1, stWaveOffset, 1, 1) * cylLatWave;

          var waverTopLong = sinEngine(0, 0, st, stWaveOffset, 1, 1) * cylLongWave;
          var waverBotLong = sinEngine(0, 0, st+1, stWaveOffset, 1, 1) * cylLongWave;

          var waverSurface = sinEngine2(ps, latWaveOffset, st, stWaveOffset, (st%2)*secretSwitch, PI, 1, 1) * surfaceWave;

          var xTop = cos(ps*pieAngle) * (neuR + waverTop + waverTopLong);
          var xBot = cos(ps*pieAngle) * (neuR + waverBot + waverBotLong);
          var yTop = st * stackHeight + st*stackSpace + waverSurface;
          var yBot = (st+1) * stackHeight + st*stackSpace + waverSurface;
          var zTop = sin(ps*pieAngle) * (neuR + waverTop);
          var zBot = sin(ps*pieAngle) * (neuR + waverBot);

          let u = map((ps*segmentLength + st*stackOffset)%heightRatio,0,heightRatio,0,1);

          vertex(xTop,yTop,zTop,u,0);
          vertex(xBot,yBot,zBot,u,1);

          if((ps*segmentLength + st*stackOffset)%heightRatio > heightRatio - segmentLength){
            vertex(xTop,yTop,zTop,0,0);
            vertex(xBot,yBot,zBot,0,1);
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

  textureMode(NORMAL); texture(pgT);
  blendMode(BLEND);

  for(var y = 0; y<fieldStackCount; y++){
    beginShape(TRIANGLE_STRIP);
    for(var x = 0; x<=xCount; x++){

      let yScaleWave = sinEngine2(x,fieldLatOffset,y,fieldLongOffset, (y%2)*secretSwitch, PI,1,1) * fieldYScale/2;

      let mainX = x * xSpace;
      let mainY = y * ySpace + sinEngine(x,fieldLatOffset,y,fieldLongOffset,1,1) * yAxisWave + y * fieldStackSpace + yScaleWave;
      let mainZ = sinEngine(x,fieldLatOffset,y,fieldLongOffset,1,1) * zAxisWave;

      let mainYbot = (y+1) * ySpace + sinEngine(x,fieldLatOffset,y+1,fieldLongOffset,1,1) * yAxisWave + y * fieldStackSpace -yScaleWave;
      let mainZbot = sinEngine(x,fieldLatOffset,y+1,fieldLongOffset,1,1) * zAxisWave;

      let u = map((x*xSpace + y*fieldStackOffset)%heightRatio,0,heightRatio,0,1);

      vertex(mainX,mainY,mainZ, u,0);
      vertex(mainX,mainYbot,mainZbot, u,1);

      if((x*xSpace + y*fieldStackOffset)%heightRatio >= heightRatio-xSpace){
        vertex(mainX,mainY,mainZ, 0,0);
        vertex(mainX,mainYbot,mainZbot, 0,1);
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

  for(var k = 0; k<mainInd.length; k++){
    push();
    for(var i = 0; i<rows; i++){
      typeYfigure = map(sinEngine(i,waveBlock,k,casOffset,0.5,casSlope),-1,1,yBlock,rows*yBlock);

      image(mainInd[k],0,0,mainInd[k].width,typeYfigure);

      translate(0,typeYfigure);
    }
    pop();
    translate(mainInd[k].width,0);
  }
  pop();

  if(mirrorSwitch){
    push();
    translate(-pgT.width/2,0);
    for(var m = 0; m<mainInd.length; m++){
      push();
      for(var n = 1; n<rows+1; n++){
        typeYfigure = map(sinEngine(rows-n,waveBlock,m,casOffset,0.5,casSlope),-1,1,yBlock,rows*yBlock);

        image(mainInd[m],0,0,mainInd[m].width,typeYfigure);

        translate(0,typeYfigure);
      }
      pop();
      translate(mainInd[m].width,0);
    }

  }
}

// function recordThis(){
//   startRecording();
//   recordOn = true;
//   recordStop = frameCount + recordLength;
// }
