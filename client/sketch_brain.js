var pg = [];
var pgPlus = [];
var pgLabel = [];

var bkgdColor;

var x = [];
var xTarget = [];
var xHold = [];
var y = [];
var yTarget = [];
var yHold = [];
var z = [];
var zTarget = [];
var zHold = [];

var a = [];
var aTarget = [];
var aHold = [];

var labelA, labelY;
var labelAhold, labelYhold;
var labelAtarget, labelYtarget;

var xNudge = [];
var yNudge = [];
var headline = []
var subhead = []

var animOn = false;

var animLength = 30;
var animStart = 0;
var animStop = 0;

var currentState = 6;

var font1;
var fontHead, fontSub;

var cullSpace = 0.1;

var partCount = 16;

function preload(){
  pg[0] = loadImage("resources/brain/0brainBkgd.png");

  pg[1] = loadImage("resources/brain/2_oLines.png");
  pg[2] = loadImage("resources/brain/2_locus.png");
  pg[3] = loadImage("resources/brain/2_anteriorCing.png");
  pg[4] = loadImage("resources/brain/2_lgn.png");
  pg[5] = loadImage("resources/brain/2_entorhinal.png");
  pg[6] = loadImage("resources/brain/2_hippocampus.png");

  pg[7] = loadImage("resources/brain/1_cerebellum.png");
  pg[8] = loadImage("resources/brain/1_visualcortex.png");
  pg[9] = loadImage("resources/brain/1_frontal.png");
  pg[10] = loadImage("resources/brain/1_occipital.png");
  pg[11] = loadImage("resources/brain/1_parietal.png");
  pg[12] = loadImage("resources/brain/1_prefrontal.png");
  pg[13] = loadImage("resources/brain/1_temporal.png");
  pg[14] = loadImage("resources/brain/1_auditory.png");

  pg[15] = loadImage("resources/brain/0eye.png");

  pgPlus[1] = loadImage("resources/brain/3plus_oLines.png");
  pgPlus[2] = loadImage("resources/brain/3plus_locus.png");
  pgPlus[3] = loadImage("resources/brain/3plus_anteriorCing.png");
  pgPlus[4] = loadImage("resources/brain/3plus_lgn.png");
  pgPlus[5] = loadImage("resources/brain/3plus_entorhinal.png");
  pgPlus[6] = loadImage("resources/brain/3plus_hippocampus.png");
  pgPlus[8] = loadImage("resources/brain/3plus_visualcortex.png");
  pgPlus[11] = loadImage("resources/brain/3plus_parietal.png");
  pgPlus[12] = loadImage("resources/brain/3plus_prefrontal.png");
  pgPlus[14] = loadImage("resources/brain/3plus_auditory.png");
  pgPlus[15] = loadImage("resources/brain/0eye.png");

  pgLabel[2] = loadImage("resources/brain/4label_locus.png");
  pgLabel[3] = loadImage("resources/brain/4label_anteriorCing.png");
  pgLabel[4] = loadImage("resources/brain/4label_lgn.png");
  pgLabel[5] = loadImage("resources/brain/4label_entorhinal.png");
  pgLabel[6] = loadImage("resources/brain/4label_hippocampus.png");
  pgLabel[8] = loadImage("resources/brain/4label_visualcortex.png");
  pgLabel[11] = loadImage("resources/brain/4label_parietal.png");
  pgLabel[12] = loadImage("resources/brain/4label_prefrontal.png");
  pgLabel[14] = loadImage("resources/brain/4label_auditory.png");

  fontHead = loadFont("resources/ActionCondensedMedium-Grade1.otf");
  fontSub = loadFont("resources/ActionTextDark-Medium.otf");
}

function setup(){
  let renderer = createCanvas(1000,800,WEBGL);
  renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

  bkgdColor = color("#ffffff");
  foreColor = color("#000000");

  frameRate(30);
  // pixelDensity(1);

  for(var k = 0; k<partCount; k++){
    x[k] = 0;
    xTarget[k] = 0;
    xHold[k] = 0;
    y[k] = 0;
    yTarget[k] = 0;
    yHold[k] = 0;
    z[k] = 0;
    zTarget[k] = 0;
    zHold[k] = 0;
    a[k] = 0;
    aTarget[k] = 0;
    aHold[k] = 0;

    animOn[k] = false;

    xNudge[k] = 0;
    yNudge[k] = 0;
  }
  labelA = 0;
  labelY = 0;
  labelAtarget = 0;
  labelYtarget = 0;
  labelAhold= 0;
  labelYhold = 0;

  headline[0] = "Nima Mesgarani";
  headline[1] = "Ken Shepard";
  headline[2] = "Dion Khodagholy";
  headline[3] = "Paul Sajda";
  headline[4] = "Qi Wang";
  headline[5] = "Joshua Jacobs";

  subhead[0] = "They use digital signal processing to separate an audio track into two, one for each voice. Then they use data from a listener’s auditory cortex to tell which track the listener wants to listen to, and they increase that track’s volume for the listener. These technologies are “looking at your brain to figure out what your intentions are,” Mesgarani says, “and based on that they modify the acoustic scene.”";
  subhead[1] = "The chip could be used anywhere on the surface of the brain or even on a damaged spinal cord to amplify existing signals. It both stimulates underlying neural tissue and records information, mostly to monitor the health of underlying tissue. One early application may be helping blind people see again, by transmitting information from a camera to the visual cortex.";
  subhead[2] = "In many memory disorders, the hippocampus fails to communicate properly with other brain regions. By recording from these brain regions together, Khodagholy reasons that it will be possible to identify markers of this communication and boost it using responsive electrical stimulation – with the goal of improving the longevity of memories.";
  subhead[3] = "The ACC receives waves of electrical activity from the prefrontal cortex at 10 Hz. If you stimulate the PFC each time it’s at one phase of that wave, versus other phases, the PFC’s activation will more strongly activate the ACC. Sajda combines two forms of neuroimaging to measure the wave and figure out the optimal phase to amplify it — thereby helping promote decision-making.";
  subhead[4] = "One hypothesized cause of Alzheimer’s disease is the buildup of amyloid plaques in the brain, which may lead to tangled tau proteins, which then kill surrounding cells. Tangled tau proteins have been found in young brains, too — but only in the LC. Wang reasons that stimulating the LC in young people might release more epinephrine, thus allowing microglia to clear the plaques, preventing tangled tau proteins and cell death.";
  subhead[5] = "When rats store information, there are electrical “theta” oscillations around eight hertz in the hippocampus and entorhinal cortex, areas related to memory and navigation. Stimulating those areas in rats at that frequency has been shown to boost their retention. For years, researchers have tried to do the same in humans, with mixed results.";

}

function draw(){
  background(bkgdColor);
  // background(200);
  // orbitControl();

  if(animOn){
    animater();
  }

  push();
    scale(0.85);
    translate(50,-50,0);
    translate(x[0], y[0], z[0]);
    image(pg[0],-width/2,-height/2);

    translate(0,0,1);

    for(var k = 1; k<partCount; k++){
      push();
        translate(x[k], y[k], z[k] + k*cullSpace);

        translate(0,0,1);
        tint(255,255)
        image(pg[k],-width/2,-height/2);
      pop();
    }

    for(var k = 1; k<partCount; k++){
      if(pgPlus[k] != null){
        push();
          translate(x[k], y[k], z[k] + k*cullSpace);

          tint(255, a[k]);
          image(pgPlus[k], -width/2, -height/2);

          if(pgLabel[k] != null){
            image(pgLabel[k], -width/2, -height/2);
          }
        pop();
      }
    }
  pop();

  if(currentState < 6){
    push();
      translate(0, labelY);
      fill(0,0,0, labelA);

      textFont(fontHead);
      textSize(70);
      text(headline[currentState], -width/2 + 50, height/2 - 300);

      textFont(fontSub);
      textSize(18);
      text(subhead[currentState], -width/2 + 50, height/2 - 280, 650, 120);
    pop();
  }

  print(labelA);

  if(frameCount < 2){
    noLoop();
  }

  // textFont(font1);
  // fill(foreColor);
  // text(frameCount, width/2 - 50, 50);
}
