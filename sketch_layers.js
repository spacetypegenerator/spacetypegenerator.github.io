p5.disableFriendlyErrors = true;

let shelfHeightH, shelfWidthH;
let shelfHeightV, shelfWidthV;
let fontSize = 100;
let inpText;
let sWidth;
let textRepeats;
let alphaStep;
let pinchFactor = 20;
let rotateFactor = 0.05;

let layerDepth = 200;

var blockColor, textColor, strokeColor, bkgdColor;

let innerH;
let innerV;
let pinchH, pinchV;

let stackCount;

let fontAnimate;

function preload() {
  fontMenu = loadFont("assets/IBMPlexMono-Regular.otf");
  fontSelect1 = loadFont("assets/WorkSans-Regular.ttf");
  fontSelect2 = loadFont("assets/Tratto-Trial-LeggeroCorsivo.otf");
  fontSelect3 = loadFont("assets/KeplerStd-Medium.otf");
  fontSelect4 = loadFont("assets/ProximaNova-Black.otf");
  fontSelect5 = loadFont("assets/SpaceMono-Bold.ttf");
  fontSelect6 = loadFont("assets/DoHyeon-Regular.ttf");
  fontSelect7 = loadFont("assets/AguafinaScript-Regular.ttf");

}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);

  sel = createSelect();
  sel.position(25, 30);
  sel.option('Work Sans - Regular');
  sel.option('Tratto - Leggero Corsivo');
  sel.option('Kepler - Medium');
  sel.option('ProximaNova - Black');
  sel.option('SpaceMono - Bold');
  sel.option('DoHyeon - Regular (Hangul)');
  sel.option('AguafinaScript - Regular');
  sel.style("width", "120px");

  radio = createRadio();
  radio.position(30,270);
  radio.option(' ');
  radio.option('  ');
  radio.option('   ');
  radio.style("width","20px");
  radio.value(' ');

  stackCountSlider = createSlider(1,40,14);
  stackCountSlider.position(25,80);
  stackCountSlider.style('width','100px');

  fontSizeSlider = createSlider(50,300,100);
  fontSizeSlider.position(25,110);
  fontSizeSlider.style('width','100px');

  innerHSlider = createSlider(-500,1500,100);
  innerHSlider.position(25,140);
  innerHSlider.style("width","100px");

  innerVSlider = createSlider(-500,1500,100);
  innerVSlider.position(25,170);
  innerVSlider.style('width','100px');

  rotateFactorSlider = createSlider(-0.78, 0.78, 0, 0.01);
  rotateFactorSlider.position(25,200);
  rotateFactorSlider.style('width','100px');

  inp = select("#textfield");

  textColorPicker = createColorPicker('#000000');
  textColorPicker.position(25, 240); textColorPicker.style('width', '20px');
  blockColorPicker = createColorPicker('#ffffff');
  blockColorPicker.position(50, 240); blockColorPicker.style('width', '20px');
  strokeColorPicker = createColorPicker('#545454');
  strokeColorPicker.position(75, 240); strokeColorPicker.style('width', '20px');
  bkgdColorPicker = createColorPicker('#000000');
  bkgdColorPicker.position(100, 240); bkgdColorPicker.style('width', '20px');

  speedRacerSet = createButton('Speed Racer'); speedRacerSet.position(25,height-160); speedRacerSet.mousePressed(speedRacer);
  goingMonoSet = createButton('To Space'); goingMonoSet.position(25,height-140); goingMonoSet.mousePressed(toSpace);
  hangulSet = createButton('나선형의 것'); hangulSet.position(25,height-120); hangulSet.mousePressed(hangulSample);
  lostTimeSet = createButton('Lost Time'); lostTimeSet.position(25,height-100); lostTimeSet.mousePressed(lostTime);
  dotSpiralSet = createButton('Dot Spiral'); dotSpiralSet.position(25,height-80); dotSpiralSet.mousePressed(dotSpiral);
  beAggressiveSet = createButton('Be Aggressive'); beAggressiveSet.position(25,height-60); beAggressiveSet.mousePressed(beAggressive);
  meatSpaceSet = createButton('Meat Space'); meatSpaceSet.position(25,height-40); meatSpaceSet.mousePressed(meatSpace);
}

function draw() {
  strokeColor = color(strokeColorPicker.value());
  textColor = color(textColorPicker.value());
  blockColor = color(blockColorPicker.value());
  bkgdColor = color(bkgdColorPicker.value());

  setFont();

  background(bkgdColor);

  innerH = innerHSlider.value();
  innerV = innerVSlider.value();
  rotateFactor = rotateFactorSlider.value();
  stackCount = stackCountSlider.value();
  fontSize = fontSizeSlider.value();

  shelfHeightH = height;
  shelfWidthH = width * 4;
  shelfHeightV = height;
  shelfWidthV = height * 4;

  inpText = String(inp.value());
  if(inpText == ""){
    inpText = inpText + " ";
  }

  rectMode(CENTER);
  textFont(fontAnimate);
  textSize(fontSize);
  textAlign(LEFT);

  sWidth = textWidth(inpText);
  textRepeats = floor(width/sWidth) + 3;

  let hSpace = -height/2 - shelfHeightH/2;
  let vSpace = -width/2 - shelfHeightV/2;

  pinchH = -((hSpace+shelfHeightH/2)+innerH)/stackCount;
  pinchV = -((vSpace+shelfHeightV/2)+innerV)/stackCount;

  push();

  if(radio.value() == " "){
    translate(0,0,layerDepth);
  } else if(radio.value() == "  "){
    translate(0,0,layerDepth*3);
    rotateY(PI/8);
    rotateX(PI/8);
  } else if(radio.value() == "   "){
    translate(0,-height/4,layerDepth*2);
    rotateX(PI/8);
  }

  for(var i = stackCount; i>0; i--){
    if(i == stackCount){
      alphaStep = map(frameCount*2%layerDepth,0,layerDepth,0,255);
    } else {
      alphaStep = 255;
    }

    blockColor.setAlpha(alphaStep);
    strokeColor.setAlpha(alphaStep);
    textColor.setAlpha(alphaStep);

    push();
      translate(0,0,i*-layerDepth);
      translate(0,0,frameCount*2%layerDepth);

      for(var j=0; j<4; j++){
        push();
          rotateZ(rotateFactor*i - rotateFactor*(frameCount*2%layerDepth)/layerDepth)
          rotateZ(j*PI/2);

          if(j%2 == 0){
            translate(0,hSpace + pinchH*i - pinchH*(frameCount*2%layerDepth)/layerDepth);
          } else {
            translate(0,vSpace + pinchV*i - pinchV*(frameCount*2%layerDepth)/layerDepth);
          }

          rotateY(radians(1));

          fill(blockColor);
          stroke(strokeColor); strokeWeight(3);

          if(j%2 == 0){
            rect(0,0,shelfWidthH,shelfHeightH);
            translate(0,shelfHeightH/2-20,1);
          } else {
            rect(0,0,shelfWidthV,shelfHeightV);
            translate(0,shelfHeightV/2-20,1);
          }

          for(var k=0; k<textRepeats; k++){
            push();
//              translate(k * sWidth - width,0);
              translate(k * sWidth - sWidth,0);
              translate(-(frameCount*4)%sWidth,0);
              fill(textColor); noStroke();
              text(inpText,0,0);
            pop();
          }

        pop();
      }
    pop();
  }
  pop();

  textFont(fontMenu);
  fill(bkgdColor);
  textSize(10);
  textAlign(LEFT);
  push();
  translate(-width/2, -height/2);
    text("Layers " + stackCount,25,80);
    text("Type Size " + fontSize,25,110);
    text("Inner Height " + innerHSlider.value(),25,140);
    text("Inner Width " + innerVSlider.value(),25,170);
    text("Rotate " + rotateFactorSlider.value(),25,200);
    text("Front ",52,283);
    text("Quarter ",52,302);
    text("Upward ",52,321);
    text("PRESETS",25,height-170);
  pop();
}

function setFont() {
  if(sel.value() == 'Work Sans - Regular') {fontAnimate = fontSelect1;}
  else if(sel.value() == 'Tratto - Leggero Corsivo') {fontAnimate = fontSelect2;}
  else if(sel.value() == 'Kepler - Medium') {fontAnimate = fontSelect3;}
  else if(sel.value() == 'ProximaNova - Black') {fontAnimate = fontSelect4;}
  else if(sel.value() == 'SpaceMono - Bold') {fontAnimate = fontSelect5;}
  else if(sel.value() == 'DoHyeon - Regular (Hangul)') {fontAnimate = fontSelect6;}
  else if(sel.value() == 'AguafinaScript - Regular') {fontAnimate = fontSelect7;}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function reset() {
  stackCountSlider.value(14);
  fontSizeSlider.value(100);
  innerHSlider.value(700);
  innerVSlider.value(50);
  rotateFactorSlider.value(0);

  textColorPicker.value('#000000');
  blockColorPicker.value('#ffffff');
  strokeColorPicker.value('#000000');
  bkgdColorPicker.value('#0000ff');

  inp.value("GOING. GOING. GOING. ");

  radio.value(' ');
}

function speedRacer() {
  reset();
  stackCountSlider.value(14);
  fontSizeSlider.value(90);
  innerHSlider.value(985);
  innerVSlider.value(-225);
  rotateFactorSlider.value(-0.11);

  textColorPicker.value('#000000');
  blockColorPicker.value('#ffffff');
  strokeColorPicker.value('#FF7E79');
  bkgdColorPicker.value('#0000ff');

  inp.value("GO, SPEED RACER, GO! ");
  sel.value('Tratto - Leggero Corsivo');
}

function toSpace() {
  reset();
  stackCountSlider.value(14);
  fontSizeSlider.value(300);
  innerHSlider.value(-10);
  innerVSlider.value(-10);
  rotateFactorSlider.value(-0.28);

  textColorPicker.value('#000000');
  blockColorPicker.value('#ffffff');
  strokeColorPicker.value('#0000');
  bkgdColorPicker.value('#0000ff');

  inp.value("Go. Go. Go. ");
  sel.value('SpaceMono - Bold');
}

function hangulSample() {
  reset();
  stackCountSlider.value(16);
  fontSizeSlider.value(155);
  innerHSlider.value(140);
  innerVSlider.value(40);
  rotateFactorSlider.value(-0.78);

  textColorPicker.value('#FFD479');
  blockColorPicker.value('#000000');
  strokeColorPicker.value('#ffffff');
  bkgdColorPicker.value('#ffffff');

  inp.value("나선형의 것 ");
  sel.value('DoHyeon - Regular (Hangul)');
}

function lostTime() {
  reset();
  stackCountSlider.value(14);
  fontSizeSlider.value(100);
  innerHSlider.value(600);
  innerVSlider.value(50);
  rotateFactorSlider.value(0);

  textColorPicker.value('#ffffff');
  blockColorPicker.value('#000000');
  strokeColorPicker.value('#FF7E79');
  bkgdColorPicker.value('#FF7E79');

  inp.value("LOST TIME LOST TIME ");
  sel.value('ProximaNova - Black');
}

function dotSpiral() {
  reset();
  stackCountSlider.value(20);
  fontSizeSlider.value(250);
  innerHSlider.value(-50);
  innerVSlider.value(-165);
  rotateFactorSlider.value(0.42);

  textColorPicker.value('#ffffff');
  blockColorPicker.value('#000000');
  strokeColorPicker.value('#000000');
  bkgdColorPicker.value('#0000ff');

  inp.value(". . . . . . . . ");
  sel.value('ProximaNova - Black');

  radio.value('   ');
}

function beAggressive() {
  reset();
  stackCountSlider.value(20);
  fontSizeSlider.value(110);
  innerHSlider.value(-150);
  innerVSlider.value(-250);
  rotateFactorSlider.value(-0.1);

  textColorPicker.value('#FF7E79');
  blockColorPicker.value('#000000');
  strokeColorPicker.value('#000000');
  bkgdColorPicker.value('#ffffff');

  inp.value("BE AGGRESSIVE.  ");
  sel.value('AguafinaScript - Regular');

  radio.value('   ');
}

function meatSpace() {
  reset();
  stackCountSlider.value(20);
  fontSizeSlider.value(100);
  innerHSlider.value(415);
  innerVSlider.value(1035);
  rotateFactorSlider.value(0);

  textColorPicker.value('#73FA79');
  blockColorPicker.value('#000000');
  strokeColorPicker.value('#ffffff');
  bkgdColorPicker.value('#ffffff');

  inp.value("MEAT SPACE -- // MEAT SPACE -- //");
  sel.value('Kepler - Medium');
}
