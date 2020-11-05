
let pgTextSize = 70;
let stripHeight = 200;
let radius = 500;
let stretch = 1;

let xOffset, xAmp;
let yOffset, yAmp;
let zOffset, zAmp;

let phaseX;

let count = 1000;

let foreColor, bkgdColor, c1;
let factor1, factor2, factor2B;
let spinSpeed, spinOffset;
let ribbonAmp, ribbonWave, ribbonLength;

let mainText1 = "TRIENNELLE MILANO";

let img1, img2, img3;

let stripAradio, stripBradio;

function preload(){
  font0 = loadFont('resources/IBMPlexMono-Regular.otf');
  font1 = loadFont('resources/nimbus-sans-l_regular-condensed.ttf');

  img1 = loadImage('images/tk_tr_ribbon1.png');
  img2 = loadImage('images/tk_tr_ribbon2.png');
  img3 = loadImage('images/tk_tr_ribbon3.png');
  img4_pat = loadImage('images/tk_tr_ribbon_pattern1.png');
  img5_pat = loadImage('images/tk_tr_ribbon_pattern2.png');
  img6_pat = loadImage('images/tk_tr_ribbon_pattern3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);

  backgroundPicker = createColorPicker('#000000'); backgroundPicker.position(10,height - 60);
  backgroundPicker.style('height','50px');backgroundPicker.style('width','30px'); backgroundPicker.input(drawTextures);

  c1Picker = createColorPicker('#000000'); c1Picker.position(60,height - 60)
  c1Picker.style('height','50px');c1Picker.style('width','20px');c1Picker.input(drawTextures);
  c2Picker = createColorPicker('#ffffff'); c2Picker.position(90,height - 60)
  c2Picker.style('height','50px');c2Picker.style('width','20px');c2Picker.input(drawTextures);

  factor1picker = createSlider(0,20,4,0.01); factor1picker.position(10,30); factor1picker.style('width','100px');
  factor2picker = createSlider(0,20,7,0.01); factor2picker.position(10,60); factor2picker.style('width','100px');
  factor2Bpicker = createSlider(0,1,0.286,0.001); factor2Bpicker.position(10,90); factor2Bpicker.style('width','100px');

  stretchPicker = createSlider(-1,1,0,0.001); stretchPicker.position(10,150); stretchPicker.style('width','100px');

  ribbonWavePicker = createSlider(0,0.5,0.1,0.001); ribbonWavePicker.position(10,210); ribbonWavePicker.style('width','100px');
  ribbonAmpPicker = createSlider(0,1,0.25,0.01); ribbonAmpPicker.position(10,240); ribbonAmpPicker.style('width','100px');
  ribbonLengthPicker = createSlider(0,0.1,0.02,0.001); ribbonLengthPicker.position(10,270); ribbonLengthPicker.style('width','100px');

  spinSpeedPicker = createSlider(0,0.01,0.001,0.0001); spinSpeedPicker.position(10,height/2); spinSpeedPicker.style('width','100px');
  spinOffsetPicker = createSlider(0,2*PI,0,0.01); spinOffsetPicker.position(10,height/2 + 30); spinOffsetPicker.style('width','100px');

  selA = createSelect(); selA.position(10, height/2 + 90); selA.style('width','150px'); selA.style('height','20px');
  selA.option('Graphic 1',0);
  selA.option('Graphic 2',1);
  selA.option('Graphic 3',2);
  selA.option('Pattern 1',3);
  selA.option('Pattern 2',4);
  selA.option('Pattern 3',5);
  selA.selected(0);

  selB = createSelect(); selB.position(10, height/2 + 120); selB.style('width','150px'); selB.style('height','20px');
  selB.option('Graphic 1',0);
  selB.option('Graphic 2',1);
  selB.option('Graphic 3',2);
  selB.option('Pattern 1',3);
  selB.option('Pattern 2',4);
  selB.option('Pattern 3',5);
  selB.selected(3);

  frameRate(30);

  drawTextures();

  b1Button = createButton('Ribbon 1'); b1Button.position(150,height-60); b1Button.mousePressed(b1);
  b2Button = createButton('Ribbon 2'); b2Button.position(150,height-30); b2Button.mousePressed(b2);
  b3Button = createButton('Ribbon 3'); b3Button.position(230,height-60); b3Button.mousePressed(b3);

  labelCheck = createCheckbox('',true); labelCheck.position(125,height - 45);
}

function draw() {
  clear();
  orbitControl();

  factor1 = factor1picker.value();
  factor2 = factor2picker.value();
  factor2B = factor2Bpicker.value();
  stretch = stretchPicker.value();

  ribbonWave = ribbonWavePicker.value();
  ribbonAmp = ribbonAmpPicker.value();
  ribbonLength = ribbonLengthPicker.value();

  spinSpeed = spinSpeedPicker.value();
  spinOffset = spinOffsetPicker.value();

  background(bkgdColor);

  blendMode(BLEND);

  if(labelCheck.checked() == true){
    push();
      translate(-width/2,-height/2);

      fill(255);
      textAlign(LEFT);
      textSize(10);
      textFont(font0);
      text("Factor1 " + factor1,15,30);
      text("Factor2 " + factor2,15,60);
      text("Factor3 " + factor2B,15,90);

      text("Stretch " + stretch, 15, 150);

      text("Ribbon Wave " + ribbonWave, 15, 210);
      text("Ribbon Amp " + ribbonAmp, 15, 240);
      text("Ribbon Length " + ribbonLength, 15, 270);

      text("Spin Speed " + spinSpeed,15,height/2);
      text("Spin Offset " + spinOffset,15,height/2 + 30);
    pop();
  }

  noStroke();

  push();

  // rotateX(PI/2);
  // translate(0,0,-500);
  translate(0,-(stretch*count)/2,0);
  scale(0.75)

  textureMode(NORMAL);
  if(selA.value() == 0){
    texture(img1);
  } else if(selA.value() == 1){
    texture(img2);
  } else if(selA.value() == 2){
    texture(img3);
  } else if(selA.value() == 3){
    texture(img4_pat);
  } else if(selA.value() == 4){
    texture(img5_pat);
  } else if(selA.value() == 5){
    texture(img6_pat);
  }
  ribbonEngine(false);

  radius -= 3;
  if(selB.value() == 0){
    texture(img1);
  } else if(selB.value() == 1){
    texture(img2);
  } else if(selB.value() == 2){
    texture(img3);
  } else if(selB.value() == 3){
    texture(img4_pat);
  } else if(selB.value() == 4){
    texture(img5_pat);
  } else if(selB.value() == 5){
    texture(img6_pat);
  }
  ribbonEngine(true);
  radius += 3;

  blendMode(MULTIPLY);
  translate(-3,3,0);
  fill(125);
  ribbonEngine(true);

  pop();
}

function b1(){
  backgroundPicker.value('#1c4aa6'); c1Picker.value('#ffffff'); c2Picker.value('#000000');

  drawTextures();

  factor1picker.value(4); factor2picker.value(7); factor2Bpicker.value(0.286);

  stretchPicker.value(0.37);

  ribbonWavePicker.value(0.098); ribbonAmpPicker.value(0.13); ribbonLengthPicker.value(0.035);

  spinSpeedPicker.value(0.0012); spinOffsetPicker.value(0);

  selA.value(0);
  selB.value(1);
}

function b2(){
  backgroundPicker.value('#000000'); c1Picker.value('#ffffff'); c2Picker.value('#000000');

  drawTextures();

  factor1picker.value(5.74); factor2picker.value(17.79); factor2Bpicker.value(0.541);

  stretchPicker.value(-0.219);

  ribbonWavePicker.value(0.146); ribbonAmpPicker.value(0.19); ribbonLengthPicker.value(0.01);

  spinSpeedPicker.value(0.0014); spinOffsetPicker.value(3.34);

  selA.value(1);
  selB.value(3);
}

function b3(){
  backgroundPicker.value('#000000'); c1Picker.value('#ffffff'); c2Picker.value('#000000');

  drawTextures();

  factor1picker.value(4.71); factor2picker.value(13.18); factor2Bpicker.value(0.215);

  stretchPicker.value(-0.705);

  ribbonWavePicker.value(0.101); ribbonAmpPicker.value(0.14); ribbonLengthPicker.value(0.018);

  spinSpeedPicker.value(0.0); spinOffsetPicker.value(0.018);

  selA.value(2);
  selB.value(0);
}
