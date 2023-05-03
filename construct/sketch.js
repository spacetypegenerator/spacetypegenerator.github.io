var pgT = [];
var pEntry = [];
var heightRatio = [];
var sHarry = [];

var pImg = [];
var tFont = [];

var pGradV, pGradH, pGradCH;

var pgTextSize = 100;
var bkgdColor, foreColor;

var keyText;
var keyArray = [];

var xNudge = [];
var wordCount = [];
var stripH = 60;
var wWindow;
var wPad;

var fullHeight = 0;

var colorA = [];

var widgetOn = true;

var inverter = false;
var typeToggle = 1;

function preload(){
  // tFont[0] = loadFont("resources/Linotype - Neue Haas Grotesk Text Std 55 Roman.ttf");
  tFont[0] = loadFont("construct/resources/Linotype - Neue Haas Grotesk Text Std 55 Roman.ttf");
  tFont[1] = loadFont("construct/resources/Windward_14m.otf");
  tFont[2] = loadFont("construct/resources/ApocLC-Regular-Desktop.otf");

  for(var i = 0; i<11; i++){
    pImg[i] = loadImage("construct/resources/gifs/" + i + ".gif");
  }
  // pImg[0] = loadImage("construct/resources/gifs/0.gif");
  // pImg[1] = loadImage("construct/resources/gifs/1.gif");
  // pImg[2] = loadImage("construct/resources/gifs/2.gif");
  // pImg[3] = loadImage("construct/resources/gifs/3.gif");
  // pImg[4] = loadImage("construct/resources/gifs/4.gif");
  // pImg[5] = loadImage("construct/resources/gifs/5.gif");
  // pImg[6] = loadImage("construct/resources/gifs/6.gif");
  // pImg[7] = loadImage("construct/resources/gifs/7.gif");
  // pImg[8] = loadImage("construct/resources/gifs/8.gif");
  // pImg[9] = loadImage("construct/resources/gifs/9.gif");
  // pImg[10] = loadImage("construct/resources/gifs/10.gif");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  frameRate(30);

  wPad = 40;
  wWindow = width - map(wPad, 0, 100, 0, width);
  typeToggle = int(random(1,2));

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');
  colorA[0] = color('#25d964');
  colorA[1] = color('#f24f13');
  colorA[2] = color('#f2b90f');
  colorA[3] = color('#0f5cbf');
  colorA[4] = bkgdColor;

  pGradientH();
  pGradientV();
  pGradientCH();

  setText();
}

function draw(){
  background(bkgdColor);

  // image(pImg[0], width/2, height/2);

  push();
    translate(width/2, height/2 - fullHeight/2);
    italicWave0();
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  wWindow = width - map(wPad, 0, 100, 0, width);

  setText();
}

function sinEngine(aCount, aLength, bCount,bLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function aSet(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1
  var capTicker = ticker%1;
  var targetPoint = pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));
  return targetPoint;
}

function aSet2(ticker, influ){  /// takes a 0 - 1 and returns an eased 0 - 1 then 1 to 0
  var nowTicker = ticker;

  var targetPoint = 0;
  if(nowTicker<=0.5){
    var thisTicker = map(nowTicker, 0, 0.5, 0, 1);
    targetPoint = pow(thisTicker,influ)/(pow(thisTicker,influ) + pow(1-thisTicker,influ));
  } else if(nowTicker<=1){
    var thisTicker = map(nowTicker, 0.5, 1, 1, 0);
    targetPoint = pow(thisTicker,influ)/(pow(thisTicker,influ) + pow(1-thisTicker,influ));
  }

  return targetPoint;
}
