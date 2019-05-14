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

// SAVE FLUX
var fluxLength = 126;
var fluxSave = false;
// SAVE SCROLL
var scrollLength = 175;
var scrollSave = false;

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

  rowsSlider = createSlider(1, 60, 13);rowsSlider.position(10, height-55);rowsSlider.style('width', '100px');  
  typeStrokeSlider = createSlider(0, 4, 1, 0.5);typeStrokeSlider.position(10, height-25);typeStrokeSlider.style('width', '100px');
  trackingSlider = createSlider(0, 500, 200);trackingSlider.position(125, height-55);trackingSlider.style('width', '100px');
  speedSlider = createSlider(0, 2, 0.3, 0.01);speedSlider.position(125, height-25);speedSlider.style('width', '100px');
  lineSpaceSlider = createSlider(0, 40, 5);lineSpaceSlider.position(235, height-55);lineSpaceSlider.style('width', '100px');
  paddingSlider = createSlider(0, windowWidth/2, 0);paddingSlider.position(235, height-25);paddingSlider.style('width', '100px');
  
  mirrorCheck = createCheckbox('', true);mirrorCheck.position(350, height-58);
  mirrorSpeedCheck = createCheckbox('', false);mirrorSpeedCheck.position(350, height-42);
  fluxCheck = createCheckbox('', false);fluxCheck.position(350, height-26);
  
  textColorPicker = createColorPicker('#FFFFFF'); textColorPicker.position(450, height-59); textColorPicker.style('width', '20px');
  bkgdColorPicker = createColorPicker('#000000'); bkgdColorPicker.position(450, height-29); bkgdColorPicker.style('width', '20px');

  moonSet = createButton('MOON'); moonSet.position(530,height-30); moonSet.mousePressed(moon);
  postSpaceSet = createButton('Post Space'); postSpaceSet.position(530,height-50); postSpaceSet.mousePressed(postSpace);
  crossSet = createButton('  X  '); crossSet.position(588,height-30); crossSet.mousePressed(cross);
  bridgeSet = createButton('Bridge'); bridgeSet.position(615,height-50); bridgeSet.mousePressed(bridge);
  whitneySet = createButton('Whitney'); whitneySet.position(620,height-30); whitneySet.mousePressed(whitney);
  beachSet = createButton('Beach'); beachSet.position(670,height-50); beachSet.mousePressed(beach);
  xFluxSet = createButton('Recede'); xFluxSet.position(685,height-30); xFluxSet.mousePressed(xFlux);

  fluxLoopSave = createButton('Flux Loop'); fluxLoopSave.position(770,height-50); fluxLoopSave.mousePressed(fluxLoop);
  scrollSave = createButton('Scroll'); scrollSave.position(770,height-30); scrollSave.mousePressed(scroll);
}

function draw() {
  //  strkColor = inp1.value();  
  bkgdColor = bkgdColorPicker.value();
  textColor = textColorPicker.value();
  rows = rowsSlider.value();
  speed = speedSlider.value();
  lineSpace = lineSpaceSlider.value();
  padding = paddingSlider.value();
  
  background('#FF0000');
  
  fill(textColor);
  noStroke();
  textSize(9);
    if(fluxSave == true || scrollSave == true){
    } else {
      text("Rows " + rows, 10, height-55);
      text("Weight " + typeStroke, 10, height-25);  
      text("Tracking " + tracking, 125, height-55);
      text("Scroll Speed " + speed, 125, height-25);
      text("Line space " + lineSpace, 235, height-55);
      text("Matte " + padding, 235, height-25);

      text("MIRROR", 375, height-44);
      text("FLIP SPEED", 375, height-28);
      text("ROW FLUX", 375, height-12);

      text("TYPE", 480, height-43);
      text("BKGD", 480, height-13);

      text("PRESETS", 530, height-57);
      text("SAVE", 770, height-57);
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
  translate(padding,60);

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
    translate(padding,60);
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
  rect(-1,-1,padding,height-60);
  rect(width+1,-1,-padding,height-60);
  
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
    
    if(scrollSave == true && mover==2){
      capturer.start();
      capturer.capture(canvas);
      print("start");
    } else if(scrollSave == true && mover<=scrollLength){
      capturer.capture(canvas);
//      print("record");
    } else if (scrollSave == true && mover==scrollLength+1) {
      capturer.stop();
      capturer.save();
      print("stop");
      scrollSave = false;
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
      fluxCheck.checked(true); 
      mover = 1;
      fluxSave = true;      
    } else {
      fluxSave = false;
    }
}

function scroll() {
    if(confirm('Click OK to record a section of the scrolling motion.\nThe process will take a minute. Be patient, plz!')){
      mover = 10;
        if(speedSlider.value()== 0){
            speedSlider.value(0.3);
        }
      scrollSave = true;      
    } else {
      scrollSave = false;
    }
}