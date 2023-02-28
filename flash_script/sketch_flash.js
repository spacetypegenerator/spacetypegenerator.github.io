var tFont = [];
var pgTextSize = 100;
var bkgdColor, foreColor;
var colorA = [];

var main;
var selector = 0;
var fullMainWidth;
var budgeCenter = 0;

var mainFlash;
var sceneLength = 30;

var starterText = "THE\nCOLLECTIVE\nPOWER\nOF\nTINY\nMOMENTS";
// var starterText = "الحركة\nبركة";

var rampCounter = 0;

var thisFont = 0;
var thisFontAdjust = 0.7;
var thisFontAdjustUp = -0.2;

var flashCount = 13;
var sceneOn = [];
var sceneCount = 15;

var widgetOn = true;

let encoder;

const frate = 30;
var numFrames = 100;
let recording = false;
let recordedFrames = 0;

let sceneRepeats = 2;
let thisDensity = 2;

let cwidth, cheight;
let saveMode = 0;

let coreCounter = 0;
let recMessageOn = false;
let colorSwapOn = true;

let displayMode = 0;
let accelMode = 0;
let sHold = 0;

function preload(){
  tFont[0] = loadFont("resources/TT Bluescreens Trial Medium.otf");
  tFont[1] = loadFont("resources/TT Travels Next Trial Bold.ttf");
  tFont[2] = loadFont("resources/Inter-Medium.ttf");
  tFont[3] = loadFont("resources/Agrandir-TightBlack.otf");
  tFont[4] = loadFont("resources/ApocLC-Regular-Desktop.otf");
  tFont[5] = loadFont("resources/BaseNeueTrial-CondensedBlack.otf");
  tFont[6] = loadFont("resources/Cairo-Black.ttf");

  currentFont = tFont[0];
  thisFontAdjust = 0.7;
  thisFontAdjustUp = 0;
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);

  for(var n = 0; n < flashCount; n++){
    sceneOn[n] = true;
  }

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    pixelDensity(1);

    sceneOn[1] = false;
    document.getElementById("bend").checked = false;
    sceneOn[2] = false;
    document.getElementById("box").checked = false;
    sceneOn[3] = false;
    document.getElementById("bugeyes").checked = false;
    sceneOn[4] = false;
    document.getElementById("halo").checked = false;
    sceneOn[5] = false;
    document.getElementById("risesun").checked = false;
    sceneOn[12] = false;
    document.getElementById("twist").checked = false;
  }

  cwidth = width;
  cheight = height;

  thisDensity = pixelDensity();

  bkgdColor = color('#ffffff');
  foreColor = color('#000000');
  colorA[0] = color('#f25835');
  colorA[1] = color('#0487d9');
  colorA[2] = color('#014029');
  colorA[3] = color('#f2ae30');
  colorA[4] = color('#f2aec1');

  // frameRate(10);
  frameRate(frate);
  textureMode(NORMAL);

  document.getElementById("textArea").value = starterText;
  setText(starterText);
}

function draw(){
  background(bkgdColor);
  ortho(-width / 2, width / 2, -height / 2, height / 2, -10000, 10000);
  
  push();
    translate(-width/2, -height/2);

    mainFlash.update();
    mainFlash.display();
  pop();

  runRecording();

  if(displayMode == 0){
    if((coreCounter+1) % sceneLength == 0){
      pickScene();
    }
  } else if(displayMode == 1){
    if(sHold != second()){
      pickScene();
      sHold = second();
    }
  }

  coreCounter ++;
}

function pickScene(){
  if(mainFlash != null){
    mainFlash.removeGraphics();
  }

  if(selector == keyArray.length){
    selector = 0;
  }

  var currentText = keyArray[selector];
  if(displayMode == 1){
    let h = hour();
    let m = minute();
    let s = second();
    m = checkTime(m);
    s = checkTime(s);

    var barrier = ":";
    if(currentFont == tFont[5]){
      barrier = ".";
    }

    currentText = h + barrier + m + barrier + s;
  }

  if(sceneCount == 0){
    mainFlash = new Blank(rampCounter%2, currentText);
  } else {
    var sceneSelecting = true;
    var rs0 = random(flashCount * 10);
    while(sceneSelecting){
      if(rs0 < 10 && sceneOn[0]){
        mainFlash = new Arcer(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 10 && rs0 < 20 && sceneOn[1]){
        mainFlash = new Bend(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 20 && rs0 < 30 && sceneOn[2]){
        mainFlash = new Box(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 30 && rs0 < 40 && sceneOn[3]) {
        if(accelMode == 0){
          mainFlash = new BugEyes(rampCounter%2, currentText);
        } else {
          mainFlash = new BugEyesEE(rampCounter%2, currentText);
        }
        sceneSelecting = false;
      } else if(rs0 > 40 && rs0 < 50 && sceneOn[4]){
        mainFlash = new Halo(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 50 && rs0 < 60 && sceneOn[5]){
        mainFlash = new RiseSun(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 60 && rs0 < 70 && sceneOn[6]){
        if(accelMode == 0){
          mainFlash = new Shutters(rampCounter%2, currentText);
        } else {
          mainFlash = new ShuttersEE(rampCounter%2, currentText);
        }
        sceneSelecting = false;
      } else if(rs0 > 70 && rs0 < 80 && sceneOn[7]){
        mainFlash = new Shutters2(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 80 && rs0 < 90 && sceneOn[8]){
        mainFlash = new SlotMachine(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 90 && rs0 < 100 && sceneOn[9]){
        mainFlash = new Snap(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 100 && rs0 < 110 && sceneOn[10]){
        mainFlash = new Split(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 110 && rs0 < 120 && sceneOn[11]){
        mainFlash = new Starburst(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 120 && rs0 <= 130 && sceneOn[12]) {
        mainFlash = new Twist(rampCounter%2, currentText);
        sceneSelecting = false;
      } else {
        rs0 = random(flashCount * 10);
      }
    }
  }

  if(colorSwapOn){
    if(random(10) < 3){
      var colorA = rgbToHex(foreColor.levels[0], foreColor.levels[1], foreColor.levels[2]);
      var colorB = rgbToHex(bkgdColor.levels[0], bkgdColor.levels[1], bkgdColor.levels[2]);
  
      foreColor = color(colorB);
      bkgdColor = color(colorA);
  
      document.getElementById('bColor').value = colorA;
      document.getElementById('fColor').value = colorB;
    }
  }

  rampCounter ++;
  selector ++;
}

function checkTime(i){
  if (i < 10) {i = "0" + i};
  return i;
}

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function windowResized(){
  resizeForPreview();
}

function resizeForSave(){
  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight,WEBGL);
  } else if(saveMode == 1){
    resizeCanvas(1080, 1920, WEBGL);
  } else if(saveMode == 2){
    resizeCanvas(1080, 1080, WEBGL);
  }
}

function resizeForPreview(){
  var tempWidth, tempHeight;

  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight,WEBGL);
  } else if(saveMode == 1){
    if(windowWidth > windowHeight * 9/16){
      tempHeight = windowHeight;
      tempWidth = windowHeight * 9/16;
    } else {
      tempWidth = windowWidth;
      tempHeight = windowWidth * 16/9;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  } else if(saveMode == 2){
    if(windowWidth < windowHeight){
      tempWidth = windowWidth;
      tempHeight = windowWidth;
    } else {
      tempHeight = windowHeight;
      tempWidth = windowHeight;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  }

  cwidth = width;
  cheight = height;
}