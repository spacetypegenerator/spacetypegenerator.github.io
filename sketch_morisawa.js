// LETTER
var typeX, typeY;
var typeStroke = 4;
var tracking = 5;

// FIELD
var xSpace, ySpace;
var yBlock;
var rows;
var speed;
var SA;
var padding = 20;
var mirror = false;
var track;
var lineSpace;
var mover = 1;
var rowMax;

// STRING
var letter_select, inp, inpText;
var myText = [];
var runLength;
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var bkgdColor, textColor;

// SAVE BETA
var fluxLength = 126;
var fluxSave = false;
var canvas;

var capturer = new CCapture( {
     framerate: 30,
     format:'gif',
     workersPath: 'js/',
     verbose: true
} );

function preload() {
  font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup() {
  var p5SaveCanvas = createCanvas(windowWidth, windowHeight);
  canvas = p5SaveCanvas.canvas;
    
  background(0);
  smooth();
  frameRate(30);
  textFont(font);
  pixelDensity(1);
  
  inp = select("#textfield");

  rowsSlider = createSlider(1, 60, 10);rowsSlider.position(25, height-85);rowsSlider.style('width', '100px');  
  typeStrokeSlider = createSlider(0, 4, 1, 0.5);typeStrokeSlider.position(25, height-55);typeStrokeSlider.style('width', '100px');
  trackingSlider = createSlider(0, 500, 200);trackingSlider.position(150, height-85);trackingSlider.style('width', '100px');
  speedSlider = createSlider(0, 2, 0.3, 0.01);speedSlider.position(150, height-55);speedSlider.style('width', '100px');
  lineSpaceSlider = createSlider(0, 40, 5);lineSpaceSlider.position(275, height-85);lineSpaceSlider.style('width', '100px');
  paddingSlider = createSlider(0, windowWidth/2, 20);paddingSlider.position(275, height-55);paddingSlider.style('width', '100px');
  
  mirrorCheck = createCheckbox('', true);mirrorCheck.position(390, height-88);
  mirrorSpeedCheck = createCheckbox('', false);mirrorSpeedCheck.position(390, height-72);
  fluxCheck = createCheckbox('', false);fluxCheck.position(390, height-56);
  
  textColorPicker = createColorPicker('#FFFFFF'); textColorPicker.position(490, height-89); textColorPicker.style('width', '20px');
  bkgdColorPicker = createColorPicker('#000000'); bkgdColorPicker.position(490, height-59); bkgdColorPicker.style('width', '20px');

  moonSet = createButton('MOON'); moonSet.position(70,height-30); moonSet.mousePressed(moon);
  postSpaceSet = createButton('Post Space'); postSpaceSet.position(125,height-30); postSpaceSet.mousePressed(postSpace);
  crossSet = createButton('  X  '); crossSet.position(205,height-30); crossSet.mousePressed(cross);
  bridgeSet = createButton('Bridge'); bridgeSet.position(235,height-30); bridgeSet.mousePressed(bridge);
  whitneySet = createButton('Whitney'); whitneySet.position(290,height-30); whitneySet.mousePressed(whitney);
  beachSet = createButton('Beach'); beachSet.position(355,height-30); beachSet.mousePressed(beach);
  xFluxSet = createButton('Recede'); xFluxSet.position(410,height-30); xFluxSet.mousePressed(xFlux);

  fluxLoopSave = createButton('Save Flux'); fluxLoopSave.position(550,height-30); fluxLoopSave.mousePressed(fluxLoop);
}

function draw() {
  //  strkColor = inp1.value();  
  bkgdColor = bkgdColorPicker.value();
  textColor = textColorPicker.value();
  rows = rowsSlider.value();
  speed = speedSlider.value();
  lineSpace = lineSpaceSlider.value();
  padding = paddingSlider.value();
  
  background(125);
  
  fill(textColor);
  noStroke();
  textSize(9);
    if(fluxSave == false){
      text("Rows " + rows, 25, height-85);
      text("Weight " + typeStroke, 25, height-55);  
      text("Tracking " + tracking, 150, height-85);
      text("Scroll Speed " + speed, 150, height-55);
      text("Line space " + lineSpace, 275, height-85);
      text("Matte " + padding, 275, height-55);

      text("MIRROR", 411, height-74);
      text("FLIP SPEED", 411, height-58);
      text("ROW FLUX", 411, height-42);

      text("Type Color", 522, height-73);
      text("Background", 522, height-43);

      text("PRESETS", 25, height-18);
    }
  
  inpText = String(inp.value());
  runLength = inpText.length;

  typeStroke = typeStrokeSlider.value();
  tracking = trackingSlider.value()/100;
  
  SA = typeStroke/2;
  doubleQuoteSwitch = 1;
  singleQuoteSwitch = 1;
  noFill();
  strokeWeight(typeStroke);
  stroke(textColor);
  strokeCap(ROUND);strokeJoin(ROUND);

  push();
  translate(padding,20);

  if(fluxCheck.checked() == true){
    rowMax = rowsSlider.value();
    rows = map(sinEngine(0.05, 2),-1,1,rowMax,0.99);
  }
    
  let xField = width-(2*padding);
  let yField = height-140;
  
  typeY = yField;
  let step = (sq(rows)+rows)/2;
  
  if(mirrorCheck.checked() == true){
    yBlock = (yField-(rows)*lineSpace*2)/(step*2);
  } else {
    yBlock = (yField-(rows-1)*lineSpace)/(step);
  }
  
  let speedBlock = speed;
  
//  rect(0,0,xField,yField);
  
  for (var j = 0; j < rows; j++){
    typeX = xField/((j+1)*inpText.length + ((j+1)*inpText.length-1)*tracking);
    track = typeX*tracking;
    for (var i = 0; i < j+1; i++){
      
      for (var k = 0; k < inpText.length; k++) {
        letter_select = k;
        typeY = yBlock*(rows-j);
      
        push();
          translate(k*typeX + k*track,0);
          translate(inpText.length*typeX*i + inpText.length*track*i,0);
          translate(-(mover*speedBlock*(rows-j))%(xField+track),0);
          keyboardEngine();
        pop();
        
        if(speed>0){
          push();
            translate(k*typeX + k*track,0);
            translate(inpText.length*typeX*i + inpText.length*track*i,0);
            translate(-(mover*speedBlock*(rows-j))%(xField+track)+(xField+track),0);
            keyboardEngine();
          pop();
        }
      }
    }
    translate(0,typeY+lineSpace);
  }
    
  if(mirrorCheck.checked() == true){
    
    pop();
    push();
    translate(padding,20);
    translate(0,yField);
    
    for (var m = 0; m < rows; m++){
      typeX = xField/((m+1)*inpText.length + ((m+1)*inpText.length-1)*tracking);
      track = typeX*tracking;
      typeY = yBlock*(rows-m);

      translate(0,-typeY-lineSpace);

      for (var n = 0; n < m+1; n++){    
        for (var p = 0; p < inpText.length; p++) {
          letter_select = p;
              
          push();
            translate(p*typeX + p*track,0);
            translate(inpText.length*typeX*n + inpText.length*track*n,0);
          
          if(mirrorSpeedCheck.checked()==true){         
            translate((mover*speedBlock*(rows-m))%(xField+track),0);
          } else {         
            translate(-(mover*speedBlock*(rows-m))%(xField+track),0);
          }
            keyboardEngine();
          pop();
        
          if(speed>0){
            push();
              translate(p*typeX + p*track,0);
              translate(inpText.length*typeX*n + inpText.length*track*n,0);
            
            if(mirrorSpeedCheck.checked()==true){         
              translate((mover*speedBlock*(rows-m))%(xField+track)-(xField+track),0);
            } else {
              translate(-(mover*speedBlock*(rows-m))%(xField+track)+(xField+track),0);
            }
              keyboardEngine();
            pop();
          }
        }
      }
    }
  }
  
  pop();
  noStroke(); fill(bkgdColor);
  rect(-1,-1,padding,height-110);
  rect(width+1,-1,-padding,height-110);
  
  mover++;
    
    if(fluxSave == true && mover==2){
      capturer.start();
      capturer.capture(canvas);
      print("start");
    } else if(fluxSave == true && mover<=fluxLength){
      capturer.capture(canvas);
//      print("record");
    } else if (fluxSave == true && mover==fluxLength+1) {
      capturer.stop();
      capturer.save();
      print("stop");
      fluxSave = false;
    }
}

function sinEngine(speed, slope) {
  var sinus = cos((mover*speed-PI));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slope));
  return sinerSquare;
}

function reset() {
  rowsSlider.value(10); typeStrokeSlider.value(1); trackingSlider.value(200);
  speedSlider.value(0.3); lineSpaceSlider.value(5); paddingSlider.value(20);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(false); fluxCheck.checked(false);
  
  textColorPicker.value('#FFFFFF'); bkgdColorPicker.value('#000000');
  
  inp.value("SPACE ");
}

function postSpace() {
  reset();
  rowsSlider.value(23); typeStrokeSlider.value(1); trackingSlider.value(200);
  speedSlider.value(0); lineSpaceSlider.value(5); paddingSlider.value(20);
  mirrorCheck.checked(false); mirrorSpeedCheck.checked(false);
  
  textColorPicker.value('#ffffff'); bkgdColorPicker.value('#000000');
  inp.value("POST    *    SPACE");
} 

function moon() {
  reset();
  rowsSlider.value(20); typeStrokeSlider.value(1); trackingSlider.value(168);
  speedSlider.value(0); lineSpaceSlider.value(2); paddingSlider.value(100);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(false);
  
  textColorPicker.value('#D8E9EF'); bkgdColorPicker.value('#000000');
  inp.value("MOON");
} 

function cross() {
  reset();
  rowsSlider.value(22); typeStrokeSlider.value(1); trackingSlider.value(500);
  speedSlider.value(0); lineSpaceSlider.value(0); paddingSlider.value(width/4);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(false);
  
  textColorPicker.value('#000000'); bkgdColorPicker.value('#FFFFFF');
  inp.value("X");
}

function bridge() {
  reset();
  rowsSlider.value(7); typeStrokeSlider.value(4); trackingSlider.value(0);
  speedSlider.value(0.66); lineSpaceSlider.value(11); paddingSlider.value(50);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(true);
  
  textColorPicker.value('#000000'); bkgdColorPicker.value('#D6D6D6');
  inp.value("MMMMM");
}

function whitney() {
  reset();
  rowsSlider.value(17); typeStrokeSlider.value(1.5); trackingSlider.value(15);
  speedSlider.value(0.89); lineSpaceSlider.value(4); paddingSlider.value(0);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(false);
  
  textColorPicker.value('#000000'); bkgdColorPicker.value('#FFFFFF');
  inp.value("W W");
}

function beach() {
  reset();
  mover = 1;
  rowsSlider.value(35); typeStrokeSlider.value(1); trackingSlider.value(208);
  speedSlider.value(0.3); lineSpaceSlider.value(5); paddingSlider.value(20);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(true);
  
  textColorPicker.value('#000000'); bkgdColorPicker.value('#FFFFFF');
  inp.value("////");
}

function xFlux() {
  reset();
  mover = 1;
  rowsSlider.value(20); typeStrokeSlider.value(1); trackingSlider.value(0);
  speedSlider.value(0); lineSpaceSlider.value(7); paddingSlider.value(0);
  mirrorCheck.checked(true); mirrorSpeedCheck.checked(false); fluxCheck.checked(true);
  
  textColorPicker.value('#FFFFFF'); bkgdColorPicker.value('#242424');
  inp.value("XXX");
}

function fluxLoop() {
    if(confirm('Click OK to generate a looped gif of the flux motion.\nThe process will take a minute. Be patient, plz!')){
      speedSlider.value(0);
      mover = 1;
      fluxSave = true;      
    } else {
      fluxSave = false;
    }
}