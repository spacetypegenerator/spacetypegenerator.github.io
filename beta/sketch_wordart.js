var xPos = [];
var yPos = [];
var pgT = [];
var pgTI = [];
var pgTind = [];

var unitCount = 3;
var pgTextSize = 400;

var stepC = 35;

//////////////////////// MASTER VARIABLES
var stripH = 100;
var tFont = [];
var textEntry = [];
var fontSelect = [];
var generatorSelect = [];
var repeats = [];
var genScale = [];
var uMove = []; var clickerU = [];
var optA = []; var optB = [];
var tColor = [];
var bColor = [];
var bColorOn = [];

var img = [];
var imageOn = [];
var imageSize = [];
var imageWaveCount = [];
var imageWaveSize = [];
var imageRot = [];

//////////////////////// CYLINDER VARIABLES
var radius = 100;
var segmentRes = 250;
var pieAngle;

//////////////////////// IMAGE VARIABLES
var imageRes = 100;

var widgetOn = true;
var widgetCount = 3;
var maxWidgetCount = 9;

function preload(){
  tFont[0] = loadFont("resources/WorkSans-Regular.ttf");
  tFont[1] = loadFont("resources/nimbus-sans-l_bold-condensed.ttf");
  tFont[2] = loadFont("resources/Plaid-XL.otf");
  tFont[3] = loadFont("resources/KeplerStd-Medium.otf");
  tFont[4] = loadFont("resources/Origin-Super-Condensed-Regular.otf");
  tFont[5] = loadFont("resources/NotoSansJP-Black.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);

  frameRate(30);

  for(var st = 0; st<maxWidgetCount; st++){
    xPos[st] = width * 0.1 - 100;
    yPos[st] = height * (st-2)*0.1 - 40;
    textEntry[st] = "MORE";
    fontSelect[st] = 0;
    repeats[st] = 3;
    genScale[st] = 1;
    uMove[st] = true; clickerU[st] = 0;
    optA[st] = 50; optB[st] = 50;
    generatorSelect[st] = 0;
    imageOn[st] = false;
    imageSize[st] = 400;
    imageWaveCount[st] = 1;
    imageWaveSize[st] = 50;
    imageRot[st] = 0;
    tColor[st] = color("#ffffff");
    bColor[st] = color("#0000ff");
    bColorOn[st] = false;
  }

  textEntry[0] = "WORD";
  xPos[0] = windowWidth/2 - 100;
  yPos[0] = windowHeight/4 - 40;

  textEntry[1] = "ART";
  xPos[1] = windowWidth/2 - 100;
  yPos[1] = windowHeight * 1/2 - 40;

  textEntry[2] = "PLUS";
  xPos[2] = windowWidth/2 - 100;
  yPos[2] = windowHeight * 3/4 - 40;

  textureMode(NORMAL);

  bkgdColor = color(0);
  foreColor = color(255);

  drawTextures();
}

function draw(){
  background(bkgdColor);

  print(bColorOn[0]);

  push();
  translate(-width/2,-height/2);

  for(var p = 0; p<widgetCount; p++){
    push();
    translate(xPos[p] + 100, yPos[p] - 50);
    if(imageOn[p]){
      imageEngine(p);
    } else {
      if(generatorSelect[p] == 0){
        cylinderEngineFront(p);
      } else if(generatorSelect[p] == 1){
        circleEngine(p);
      } else if(generatorSelect[p] == 2){
        waveEngine(p);
      } else {
        jamEngine(p);
      }
    }
    pop();
  }

  for(var p = 0; p<widgetCount; p++){
    push();
    translate(xPos[p] + 100, yPos[p] - 50);
    if(imageOn[p]){
    } else {
      if(generatorSelect[p] == 0){
        cylinderEngineBack(p);
      }
    }
    pop();
  }

  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight,WEBGL);
}

function sinEngine(aCount, aLength, bCount,bLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function cylinderEngineFront(p){
  scale(genScale[p]);
  rotateX(map(optA[p],0,100,-PI/2,PI/2));
  rotateZ(map(optB[p],0,100,-PI/2,PI/2));

  var pgH = pgT[p].height;
  var pgW = pgT[p].width;
  var pieAngle = 2*PI/segmentRes;
  var heightRatio = pgW * stripH/pgH;
  var thisRadius = (heightRatio*repeats[p])/(2*PI);
  var sLength = 2*PI*thisRadius/segmentRes;

  for(var srf=0; srf<2; srf++){ // 0:inside / 1:outside
    if(srf==0){
      texture(pgTI[p]);
    } else {
      texture(pgT[p]);
      thisRadius++;
    }

    for(var s = 0; s<1; s++){ // 0:front / 1:back
      beginShape(TRIANGLE_STRIP);

      var neuStart = -PI;
      for(var r = s * (segmentRes/2); r <= (s+1) * (segmentRes/2); r++){
        var x = cos(r*pieAngle - PI) * thisRadius;
        var z = sin(r*pieAngle - PI) * thisRadius;

        var currentU = r*sLength + clickerU[p];
        if(uMove[p]){
          // clickerU[p] += 0.01;
          clickerU[p] = frameCount;
        } else {
          clickerU[p] = 0;
        }

        var u = map(currentU%heightRatio,0,heightRatio,1,0);

        vertex(x,-stripH/2,z,u,0);
        vertex(x,stripH/2,z,u,1);

        if(currentU%heightRatio > heightRatio - sLength){
          vertex(x,-stripH/2,z,1,0);
          vertex(x,stripH/2,z,1,1);
        }
      }
      endShape();
    }
  }
}

function cylinderEngineBack(p){
  scale(genScale[p]);
  rotateX(map(optA[p],0,100,-PI/2,PI/2));
  rotateZ(map(optB[p],0,100,-PI/2,PI/2));

  var pgH = pgT[p].height;
  var pgW = pgT[p].width;
  var pieAngle = 2*PI/segmentRes;
  var heightRatio = pgW * stripH/pgH;
  var thisRadius = (heightRatio*repeats[p])/(2*PI);
  var sLength = 2*PI*thisRadius/segmentRes;

  for(var srf=0; srf<2; srf++){ // 0:inside / 1:outside
    if(srf==0){
      texture(pgTI[p]);
    } else {
      texture(pgT[p]);
      thisRadius++;
    }

    for(var s = 1; s<2; s++){ // 0:front / 1:back
      beginShape(TRIANGLE_STRIP);

      var neuStart = -PI;
      for(var r = s * (segmentRes/2); r <= (s+1) * (segmentRes/2); r++){
        var x = cos(r*pieAngle - PI) * thisRadius;
        var z = sin(r*pieAngle - PI) * thisRadius;

        var currentU = r*sLength + clickerU[p];
        if(uMove[p]){
          // clickerU[p] += 0.01;
          clickerU[p] = frameCount;
        } else {
          clickerU[p] = 0;
        }

        var u = map(currentU%heightRatio,0,heightRatio,1,0);

        vertex(x,-stripH/2,z,u,0);
        vertex(x,stripH/2,z,u,1);

        if(currentU%heightRatio > heightRatio - sLength){
          vertex(x,-stripH/2,z,1,0);
          vertex(x,stripH/2,z,1,1);
        }
      }
      endShape();
    }
  }
}

function circleEngine(p){
  translate(0,50);
  scale(genScale[p]);
  rotateZ(PI + map(optB[p],0,100,-PI,PI));

  var newStripH = stripH/2;

  var pgH = pgT[p].height;
  var pgW = pgT[p].width;
  var heightRatio = pgW * newStripH/pgH;
  var section = 2*PI - map(optA[p],0,100,0,2*PI);
  var pieAngle = section/segmentRes;
  var thisRadius = (heightRatio*repeats[p])/(PI);
  var sLength = section*thisRadius/segmentRes;

  texture(pgT[p]);

  beginShape(TRIANGLE_STRIP);

  for(var r = 0; r <= segmentRes+2; r++){
    var xBot = cos(r*pieAngle) * (thisRadius - newStripH/2);
    var yBot = sin(r*pieAngle) * (thisRadius - newStripH/2);

    var xTop = cos(r*pieAngle) * (thisRadius + newStripH/2);
    var yTop = sin(r*pieAngle) * (thisRadius + newStripH/2);

    var currentU = r*sLength + clickerU[p];
    if(uMove[p]){
      // clickerU[p] += 0.01;
      clickerU[p] = frameCount
    } else {
      clickerU[p] = 0;
    }

    var u = map(currentU%heightRatio,0,heightRatio,0,1);

    vertex(xTop,yTop,0,u,0);
    vertex(xBot,yBot,0,u,1);

    if(currentU%heightRatio > heightRatio - sLength){
      vertex(xTop,yTop,0,0,0);
      vertex(xBot,yBot,0,0,1);
    }
  }
  endShape();
}

function waveEngine(p){
  var pgH = pgT[p].height;
  var pgW = pgT[p].width;
  var waveHeight = map(optA[p],0,100,0,pgT[p].height/2);
  var heightRatio = pgW * stripH/pgH;
  var stripLength = heightRatio*repeats[p];
  var waveOffset = 2.5*PI/(segmentRes);
  var sLength = stripLength/segmentRes;

  rotateZ(map(optB[p],0,100,-PI,PI));

  scale(genScale[p]);
  translate(-stripLength/2,-waveHeight/2);

  texture(pgT[p]);

  beginShape(TRIANGLE_STRIP);

  var culmDist = 0;
  for(var r = 0; r <= segmentRes; r++){
    var x = r*sLength;
    var xPre = (r-1)*sLength;
    var y = sin(r * waveOffset)*waveHeight;
    var yPre = sin((r-1) * waveOffset)*waveHeight;

    var a = -atan2(yPre - y, sLength);
    a += HALF_PI;

    var yBot = 0;
    var yTop = stripH;

    var thisDist = abs(dist(xPre,yPre,x,y));
    var currentU = culmDist + clickerU[p];

    if(uMove[p]){
      // clickerU[p] += 0.01;
      clickerU[p] = frameCount;
    } else {
      clickerU[p] = 0;
    }

    var u = map(currentU%heightRatio,0,heightRatio,0,1);

    vertex(x - cos(a)*stripH/2, y - sin(a)*stripH/2, 0, u, 0);
    vertex(x + cos(a)*stripH/2, y + sin(a)*stripH/2, 0, u, 1);

    if(currentU%heightRatio > heightRatio - thisDist){
      vertex(x - cos(a)*stripH/2, y - sin(a)*stripH/2, 0, 0, 0);
      vertex(x + cos(a)*stripH/2, y + sin(a)*stripH/2, 0, 0, 1);
    }
    culmDist += thisDist;
  }
  endShape();
}

function jamEngine(p){
  var waveSize = repeats[p] * 15;
  var waveOffset = map(optA[p],0,100,0,2);

  scale(genScale[p]);
  scale(0.2);
  rotateZ(map(optB[p],0,100,-PI,PI));

  translate(-(textWidth(textEntry[p]))/2, -(pgTextSize + stepC + 10)/2);

  if(uMove[p]){
    // clickerU[p] += 0.01;
    clickerU[p] = frameCount/6;
  } else {
    clickerU[p] = 0;
  }

  for(var c = 0; c<textEntry[p].length; c++){
    var x = sin(clickerU[p] - c * waveOffset) * waveSize;
    var y = sin(clickerU[p] - c * waveOffset) * waveSize;
    image(pgTind[p][c],x,y);

    translate(pgTind[p][c].width-stepC,0);
  }
}

function imageEngine(p){
  var pgW = img[p].width;
  var pgH = img[p].height;
  var imageRatio = pgW/pgH;

  var imageW = imageSize[p];
  var imageH = imageW * pgH/pgW;
  var xSpace = imageW/imageRes;
  var xWaveOffset = (2*PI*imageWaveCount[p])/imageRes;

  rotateZ(imageRot[p]);
  translate(-imageW/2,-imageH/2);
  texture(img[p]);
  beginShape(TRIANGLE_STRIP);
  for(var x = 0; x<imageRes; x++){
    var y = sinEngine(x,xWaveOffset,0,0,0.1,1) * imageWaveSize[p];

    let u = map(x,0,imageRes,0,1);

    vertex(x*xSpace, y, u,0);
    vertex(x*xSpace, y + imageH, u,1);
  }
  endShape();
}
