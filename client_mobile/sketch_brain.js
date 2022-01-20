var pg = [];
var label = [];
var subLabel = [];

var bkgdColor, foreColor;

var font1;

var currentState = 0;

function preload(){
  pg[0] = loadImage("resources/0base.png");
  pg[1] = loadImage("resources/1paul.png");
  pg[2] = loadImage("resources/2qi.png");
  pg[3] = loadImage("resources/3josh.png");
  pg[4] = loadImage("resources/4nima.png");
  pg[5] = loadImage("resources/5dion.png");
  pg[6] = loadImage("resources/6ken.png");

  label[0] = "";
  subLabel[0] = "";
  label[1] = "PAUL SAJDA";
  subLabel[1] = "Prefrontal Cortex, Anterior Cingulate Cortex, Locus Coeruleus";
  label[2] = "QI WANG";
  subLabel[2] = "Locus Coeruleus";
  label[3] = "JOSHUA JACOBS";
  subLabel[3] = "Entorhinal Cortex, Hippocampus";
  label[4] = "NIMA MESGARANI";
  subLabel[4] = "Auditory Cortex";
  label[5] = "DION KHODAGHOLY";
  subLabel[5] = "Hippocampus";
  label[6] = "KEN SHEPARD";
  subLabel[6] = "Lateral Geniculate Nucleus, Visual Cortex";

  fontLabel = loadFont("resources/ActionCondensedBold-Grade1.otf");
  fontSubLabel = loadFont("resources/ActionTextBright-Medium.otf");
}

function setup(){
  let renderer = createCanvas(1000,800,WEBGL);

  bkgdColor = color("#ffffff");
  foreColor = color("#000000");
}

function draw(){
  background(bkgdColor);
  // orbitControl();

  noStroke();
  fill(foreColor);
  push();
    translate(-width/2,-height/2);
    image(pg[currentState], 80, 20, width, height);

    textSize(100);
    textFont(fontLabel);
    text(label[currentState], 150, 100);
    textSize(20);
    textFont(fontSubLabel);
    text(subLabel[currentState], 150, 140);
  pop();
}

function setState(state){
  currentState = state;
}
