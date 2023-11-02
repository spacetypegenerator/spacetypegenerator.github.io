// LETTER
var typeX = 10;
var typeY = 20;
var typeStroke = 4;

// FIELD
var SA;

// RIBBONS
var ribbonCount = 5;
var ribbonSize = 1;
var ribbonColor;

// SPIRAL
var radius, radiusAdjusted;
var tracker, tracking;
var spiralStart;
var spin;

// WAVE
var waveSize, waveCount;
var waveSpeed;
var waveOffset2;
var slope;

// STRING
var letter_select, inp, inpText;
var myText = [];
var doubleQuoteSwitch = 1;
var singleQuoteSwitch = 1;

// COLOR
var bkgdColor = 0;
var inp1, inp2, inp3, inp4, inp5;
var inpNumber = 4;

var presetStacks;

function preload() {
  font = loadFont('assets/IBMPlexMono-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bkgdColor);
  smooth();
  textFont(font);

  inp = select("#textfield");

  typeXSlider = createSlider(0, 100, 7); typeXSlider.position(25, 20);typeXSlider.style('width', '100px');
  typeYSlider = createSlider(0, 100, 20);typeYSlider.position(25, 50);typeYSlider.style('width', '100px');
  typeStrokeSlider = createSlider(0, 5, 2, 0.5);typeStrokeSlider.position(25, 80);typeStrokeSlider.style('width', '100px');

  ribbonCountSlider = createSlider(0, 400, 40);ribbonCountSlider.position(25, 130);ribbonCountSlider.style('width', '100px');
  ribbonSizeSlider = createSlider(-10, 50, 10);ribbonSizeSlider.position(25, 160);ribbonSizeSlider.style('width', '100px');

  radioEnd = createRadio();
  radioEnd.position(35,195); radioEnd.style('width','30px');
  radioEnd.option(' ', 1); radioEnd.option(' ', 2);
  radioEnd.value('1').checked = true;
  
  radiusSlider = createSlider(0, 25, 3, 0.5); radiusSlider.position(25, 260);radiusSlider.style('width', '100px');
  trackerSlider = createSlider(0, 50, 10); trackerSlider.position(25, 290);trackerSlider.style('width', '100px');
  spiralStartSlider = createSlider(0, 200, 50); spiralStartSlider.position(25, 320);spiralStartSlider.style('width', '100px');
  spinSlider = createSlider(0, 10, 1); spinSlider.position(25, 350);spinSlider.style('width', '100px');
  
  waveSizeSlider = createSlider(0, 200, 0); waveSizeSlider.position(25, 410);waveSizeSlider.style('width', '100px');
  waveCountSlider = createSlider(0, 12, 1); waveCountSlider.position(25, 440); waveCountSlider.style('width', '100px');
  waveSpeedSlider = createSlider(0, 10, 1); waveSpeedSlider.position(25, 470); waveSpeedSlider.style('width', '100px');
  slopeSlider = createSlider(0, PI, 1, 0.1); slopeSlider.position(25, 500); slopeSlider.style('width', '100px');

  //exportButton = createButton('Save Loop'); exportButton.position(140,20); exportButton.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,45); prideButton.mousePressed(pride);
    
//  resetSet = createButton('Reset'); resetSet.position(25,height-60); resetSet.mousePressed(reset);
  wideSet = createButton('Wide'); wideSet.position(25,height-60); wideSet.mousePressed(wide);
  superSet = createButton('Super'); superSet.position(75,height-60); superSet.mousePressed(tall);
  amoebaSet = createButton('Amoeba'); amoebaSet.position(130,height-60); amoebaSet.mousePressed(amoeba);
  spacerSet = createButton('Spacer'); spacerSet.position(200,height-60); spacerSet.mousePressed(spacer);	
  kittySet = createButton('Kitty'); kittySet.position(260,height-60); kittySet.mousePressed(kitty);	
  
  hourglassSet = createButton('Hourglass'); hourglassSet.position(25,height-35); hourglassSet.mousePressed(hourglass);	
  starSet = createButton('Star'); starSet.position(100,height-35); starSet.mousePressed(star);	
  star2Set = createButton('ZZtar'); star2Set.position(145,height-35); star2Set.mousePressed(star2);	
  pretzelSet = createButton('Pretzel'); pretzelSet.position(200,height-35); pretzelSet.mousePressed(pretzel);	
  lemniscateSet = createButton('Lemniscate'); lemniscateSet.position(260,height-35); lemniscateSet.mousePressed(lemniscate);	

  inp0check = createCheckbox('', false);inp0check.position(150, 77);
  inp1 = createColorPicker('#ff0000');inp1.position(170, 105);inp1.style('width', '20px');
  inp1check = createCheckbox('', true);inp1check.position(150, 107);
  inp2 = createColorPicker('#ffff00');inp2.position(170, 135);inp2.style('width', '20px');
  inp2check = createCheckbox('', true);inp2check.position(150, 137);
  inp3 = createColorPicker('#0000ff');inp3.position(170, 165);inp3.style('width', '20px');
  inp3check = createCheckbox('', true);inp3check.position(150, 167);
  inp4 = createColorPicker('#ffffff');inp4.position(170, 195);inp4.style('width', '20px');
  inp4check = createCheckbox('', true);inp4check.position(150, 197);
  inp5 = createColorPicker('#000');inp5.position(170, 225);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(150, 227);

  bkgdColorPicker = createColorPicker('#fff');bkgdColorPicker.position(152, 270);bkgdColorPicker.style('height', '50px');

  inp1check.changed(inp1checker);
  inp2check.changed(inp2checker);
  inp3check.changed(inp3checker);
  inp4check.changed(inp4checker);
  inp5check.changed(inp5checker);
}

function draw() {
  //  strkColor = inp1.value();  
  bkgdColor = bkgdColorPicker.value();
  background(bkgdColor);
  
  fill(50,200,250);
  noStroke();
  textSize(9);
  text("TYPE: X-Scale " + typeX, 25, 20);
  text("TYPE: Y-Scale " + typeY, 25, 50);
  text("TYPE: Weight " + typeStroke, 25, 80);

  text("RIBBON: Count " + ribbonCount, 25, 130);
  text("RIBBON: Size " + ribbonSize, 25, 160);
  text("RIBBON: Caps", 25, 190);
  text("Round", 55, 207);
  text("Flat", 55, 228);
  
  text("SPIRAL: Radius " + radius, 25, 260);
  text("SPIRAL: Spacing " + tracker, 25, 290);
  text("SPIRAL: Start " + spiralStart, 25, 320);
  text("SPIRAL: Spin " + spin, 25, 350);

  text("WAVE: Size " + waveSize, 25, 410);
  text("WAVE: Count " + waveCount, 25, 440);
  text("WAVE: Speed " + waveSpeed, 25, 470);
  text("WAVE: Slope " + slope, 25, 500);  
  
  text("No stripes", 172,90);    
    
	text("PRESETS", 25,height-70);
  
  push();
  rotate(-PI/2);
  text("SEGMENT TOGGLES AND COLORS",-250,144);
  text("BKGD COLORS", -325,144);
  pop();
  
  noFill();
    
  inpText = String(inp.value()) + " ";
  runLength = inpText.length;

  typeX = typeXSlider.value();
  typeY = typeYSlider.value();
  typeStroke = typeStrokeSlider.value();
	ribbonCount = ribbonCountSlider.value();
	ribbonSize = ribbonSizeSlider.value();

  radius = radiusSlider.value();
  tracker = trackerSlider.value();
  spiralStart = spiralStartSlider.value();
  spin = spinSlider.value();
  
  waveSize = waveSizeSlider.value();
  waveCount = waveCountSlider.value();
  waveSpeed = waveSpeedSlider.value();
  slope = slopeSlider.value();
  
  SA = typeStroke/2;
  doubleQuoteSwitch = 1;
  singleQuoteSwitch = 1;

  push();
  translate(width / 2, height / 2);
	rotate(frameCount*-(spin/200));
  
  radiusAdjusted = map(radius,0,50,typeY/6,typeY*2);
  tracking = map(tracker,0,50,typeX*3/14,typeX*4);
	for(var k = 0; k<ribbonCount; k++){
    //ribbon
    if(inp0check.checked() == false){
      setRibbonColor(k);
      stroke(ribbonColor);
      if(radioEnd.value() == 1) {
        strokeCap(ROUND);
      } else {
        strokeCap(SQUARE);
      }
      strokeJoin(ROUND);
      strokeWeight(typeY+ribbonSize);
        beginShape();
        for(var i = spiralStart + inpText.length*k - 1; i <= spiralStart + inpText.length + inpText.length*k; i++){
          var polarX = -(radiusAdjusted)*sqrt(tracking*i)*cos(sqrt(tracking*i));
          var polarY = -(radiusAdjusted)*sqrt(tracking*i)*sin(sqrt(tracking*i));

          var echo = atan2(polarY,polarX);
          var theWave = sinEngine(echo,waveCount,waveSpeed/100,slope) * waveSize;
  //        var theWave = sin(echo*waveCount+ frameCount*waveSpeed/100)*waveSize;
          var waveX = (theWave)*cos(echo);
          var waveY = (theWave)*sin(echo);

          vertex(polarX+waveX,polarY+waveY);
        }
        endShape();
    }
 
      //letter
      setTextColor(k);
      strokeWeight(typeStroke);
      stroke(strkColor);
      strokeCap(PROJECT); strokeJoin(ROUND);
      for(var i = spiralStart + inpText.length*k; i < spiralStart + inpText.length + inpText.length*k; i++){
        letter_select = (i-spiralStart)%inpText.length;
        var polarX = -(radiusAdjusted)*sqrt(tracking*i)*cos(sqrt(tracking*i));
        var polarY = -(radiusAdjusted)*sqrt(tracking*i)*sin(sqrt(tracking*i));
        
        var preX = -(radiusAdjusted)*sqrt(tracking*(i-1))*cos(sqrt(tracking*(i-1)));
        var preY = -(radiusAdjusted)*sqrt(tracking*(i-1))*sin(sqrt(tracking*(i-1)));
        var postX = -(radiusAdjusted)*sqrt(tracking*(i+1))*cos(sqrt(tracking*(i+1)));
        var postY = -(radiusAdjusted)*sqrt(tracking*(i+1))*sin(sqrt(tracking*(i+1)));

        var echo = atan2(polarY,polarX);
        var theWave = sinEngine(echo,waveCount,waveSpeed/100,slope) * waveSize;
//        var theWave = sin(echo*waveCount + frameCount*waveSpeed/100)*waveSize;
        var waveX = (theWave)*cos(echo);
        var waveY = (theWave)*sin(echo);
  
        var preEcho = atan2(preY,preX);
        var preWave = sinEngine(preEcho,waveCount,waveSpeed/100,slope) * waveSize;
//        var preWave = sin(preEcho*waveCount + frameCount*waveSpeed/100)*waveSize;
        var preWaveX = (preWave)*cos(preEcho);
        var preWaveY = (preWave)*sin(preEcho);        
 
        var postEcho = atan2(postY,postX);
        var postWave = sinEngine(postEcho,waveCount,waveSpeed/100,slope) * waveSize;
//        var postWave = sin(postEcho*waveCount + frameCount*waveSpeed/100)*waveSize;
        var postWaveX = (postWave)*cos(postEcho);
        var postWaveY = (postWave)*sin(postEcho);   
        
        var delta = atan2((postY+postWaveY)-(preY+preWaveY),(postX+postWaveX)-(preX+preWaveX));
        
        push();
          translate(polarX+waveX,polarY+waveY);
          rotate(delta);
          translate(-typeX/2,-typeY/2);
          keyboardEngine();
        pop();
      }

    }
  
  pop();
}

function sinEngine(xCount,xLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + xCount*xLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}
   

function inp1checker() {
  inp2check.checked(false);
  inp3check.checked(false);
  inp4check.checked(false);
  inp5check.checked(false);
  inpNumber = 1;
}

function inp2checker() {
    inp1check.checked(true);
    inp3check.checked(false);
    inp4check.checked(false);
    inp5check.checked(false);
	if(this.checked()) {
    inpNumber = 2;
  } else {
  	inpNumber = 1;
  }
}

function inp3checker() {
    inp1check.checked(true);
    inp2check.checked(true);
    inp4check.checked(false);
    inp5check.checked(false);
	if(this.checked()) {
    inpNumber = 3;
  } else {
    inpNumber = 2;
  }
}

function inp4checker() {
  	inp1check.checked(true);
    inp2check.checked(true);
    inp3check.checked(true);
    inp5check.checked(false);
	if(this.checked()) {
	  inpNumber = 4;
  } else {
    inpNumber = 3;
  }
}

function inp5checker() {
  	inp1check.checked(true);
    inp2check.checked(true);
    inp3check.checked(true);
    inp4check.checked(true);
	if(this.checked()){
	  inpNumber = 5;
  } else {
    inpNumber = 4;
  }
}

function setRibbonColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {ribbonColor = inp1.value();}
    if (switcher % 6 == 1) {ribbonColor = inp2.value();}
    if (switcher % 6 == 2) {ribbonColor = inp3.value();}
    if (switcher % 6 == 3) {ribbonColor = inp4.value();}
    if (switcher % 6 == 4) {ribbonColor = inp5.value();}
    if (switcher % 6 == 5) {ribbonColor = inp6;}
  } if (inpNumber == 5) {
    if (switcher % 5 == 0) {ribbonColor = inp1.value();}
    if (switcher % 5 == 1) {ribbonColor = inp2.value();}
    if (switcher % 5 == 2) {ribbonColor = inp3.value();}
    if (switcher % 5 == 3) {ribbonColor = inp4.value();}
    if (switcher % 5 == 4) {ribbonColor = inp5.value();}
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) {ribbonColor = inp1.value();}
    if (switcher % 4 == 1) {ribbonColor = inp2.value();}
    if (switcher % 4 == 2) {ribbonColor = inp3.value();}
    if (switcher % 4 == 3) {ribbonColor = inp4.value();}
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) {ribbonColor = inp1.value();}
    if (switcher % 3 == 1) {ribbonColor = inp2.value();}
    if (switcher % 3 == 2) {ribbonColor = inp3.value();}
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) {ribbonColor = inp1.value();}
    if (switcher % 2 == 1) {ribbonColor = inp2.value();}
  } else if (inpNumber == 1) {
    ribbonColor = inp1.value();
  }
}

function setTextColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {strkColor = inp6;}
    if (switcher % 6 == 1) {strkColor = inp1.value();}
    if (switcher % 6 == 2) {strkColor = inp4.value();}
    if (switcher % 6 == 3) {strkColor = inp3.value();}
    if (switcher % 6 == 4) {strkColor = inp2.value();}
    if (switcher % 6 == 5) {strkColor = inp5.value();}
  } else if (inpNumber == 5) {
    if (switcher % 5 == 0) {strkColor = inp5.value();}
    if (switcher % 5 == 1) {strkColor = inp1.value();}
    if (switcher % 5 == 2) {strkColor = inp2.value();}
    if (switcher % 5 == 3) {strkColor = inp3.value();}
    if (switcher % 5 == 4) {strkColor = inp4.value();}
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) {strkColor = inp4.value();}
    if (switcher % 4 == 1) {strkColor = inp1.value();}
    if (switcher % 4 == 2) {strkColor = inp2.value();}
    if (switcher % 4 == 3) {strkColor = inp3.value();}
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) {strkColor = inp3.value();}
    if (switcher % 3 == 1) {strkColor = inp1.value();}
    if (switcher % 3 == 2) {strkColor = inp2.value();}
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) {strkColor = inp2.value();}
    if (switcher % 2 == 1) {strkColor = inp1.value();
    }
  } else if (inpNumber == 1) {
    strkColor = bkgdColor;
  }
}

function setTextOnlyColor(switcher) {
  if (inpNumber == 6) {
    if (switcher % 6 == 0) {strkColor = inp1.value();}
    if (switcher % 6 == 1) {strkColor = inp2.value();}
    if (switcher % 6 == 2) {strkColor = inp3.value();}
    if (switcher % 6 == 3) {strkColor = inp4.value();}
    if (switcher % 6 == 4) {strkColor = inp5.value();}
    if (switcher % 6 == 5) {strkColor = inp6;}
  } else if (inpNumber == 5) {
    if (switcher % 5 == 0) {strkColor = inp1.value();}
    if (switcher % 5 == 1) {strkColor = inp2.value();}
    if (switcher % 5 == 2) {strkColor = inp3.value();}
    if (switcher % 5 == 3) {strkColor = inp4.value();}
    if (switcher % 5 == 4) {strkColor = inp5.value();}
  } else if (inpNumber == 4) {
    if (switcher % 4 == 0) {strkColor = inp1.value();}
    if (switcher % 4 == 1) {strkColor = inp2.value();}
    if (switcher % 4 == 2) {strkColor = inp3.value();}
    if (switcher % 4 == 3) {strkColor = inp4.value();}
  } else if (inpNumber == 3) {
    if (switcher % 3 == 0) {strkColor = inp1.value();}
    if (switcher % 3 == 1) {strkColor = inp2.value();}
    if (switcher % 3 == 2) {strkColor = inp3.value();}
  } else if (inpNumber == 2) {
    if (switcher % 2 == 0) {strkColor = inp1.value();}
    if (switcher % 2 == 1) {strkColor = inp2.value();
    }
  } else if (inpNumber == 1) {
    strkColor = inp1.value();
  }
}

function reset() {
	typeXSlider.value(7); typeYSlider.value(20); typeStrokeSlider.value(2);
	ribbonCountSlider.value(40); ribbonSizeSlider.value(10);
	radiusSlider.value(3); trackerSlider.value(10); spiralStartSlider.value(50); spinSlider.value(1);
  
  waveSizeSlider.value(0); waveCountSlider.value(2); waveSpeedSlider.value(1); slopeSlider.value(1);
  radioEnd.value('1').checked = true;
  
  inp0check.checked(false);
  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value("THIS & THEN ");
  
  inpNumber = 4;
  bkgdColorPicker.value('#000000');
}  

function wide() {
  reset();
	typeXSlider.value(18); typeYSlider.value(10); typeStrokeSlider.value(2);
	ribbonCountSlider.value(100); ribbonSizeSlider.value(15);
	radiusSlider.value(15); trackerSlider.value(2); spiralStartSlider.value(40); spinSlider.value(1);
  
  waveSizeSlider.value(0); waveCountSlider.value(2); waveSpeedSlider.value(1); slopeSlider.value(1);
  radioEnd.value('2').checked = true;
  
  inp1.value('#ffffff');inp2.value('#0000ff');inp3.value('#ff0000');inp4.value('#000000');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value("THIS & THEN");

  inpNumber = 4;
  bkgdColorPicker.value('#ffffff');
}  

function tall() {
  reset();
	typeXSlider.value(11); typeYSlider.value(68); typeStrokeSlider.value(1.5);
	ribbonCountSlider.value(40); ribbonSizeSlider.value(25);
	radiusSlider.value(1); trackerSlider.value(4); spiralStartSlider.value(6); spinSlider.value(1);
  
  waveSizeSlider.value(0); waveCountSlider.value(2); waveSpeedSlider.value(1); slopeSlider.value(1);
  radioEnd.value('2').checked = true;
  
  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value("*SUPER*");

  inpNumber = 4;
  bkgdColorPicker.value('#0000ff');
}

function amoeba() {
  reset();
	typeXSlider.value(9); typeYSlider.value(14); typeStrokeSlider.value(1.5);
	ribbonCountSlider.value(25); ribbonSizeSlider.value(22);
	radiusSlider.value(6); trackerSlider.value(10); spiralStartSlider.value(32); spinSlider.value(1);
  
  waveSizeSlider.value(100); waveCountSlider.value(2); waveSpeedSlider.value(1); slopeSlider.value(1);
  radioEnd.value('2').checked = true;
  
  inp1.value('#ffff00');inp2.value('#ff0000');inp3.value('#011993');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(false); inp5check.checked(false);

  inp.value("in the micro, the macro");

  inpNumber = 3;
  bkgdColorPicker.value('#ffffff');
}  

function star() {
  reset();
	typeXSlider.value(7); typeYSlider.value(20); typeStrokeSlider.value(2);
	ribbonCountSlider.value(230); ribbonSizeSlider.value(0);
	radiusSlider.value(4.5); trackerSlider.value(0); spiralStartSlider.value(122); spinSlider.value(2);
  
  waveSizeSlider.value(25); waveCountSlider.value(5); waveSpeedSlider.value(0); slopeSlider.value(1);
  radioEnd.value('1').checked = true;
  
  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value("------------");

  inpNumber = 4;
  bkgdColorPicker.value('#ffff00');
} 

function spacer() {
  reset();
	typeXSlider.value(5); typeYSlider.value(50); typeStrokeSlider.value(2.5);
	ribbonCountSlider.value(110); ribbonSizeSlider.value(-10);
	radiusSlider.value(3.5); trackerSlider.value(1); spiralStartSlider.value(22); spinSlider.value(1);
  
  waveSizeSlider.value(0); waveCountSlider.value(0); waveSpeedSlider.value(0); slopeSlider.value(0);
  radioEnd.value('1').checked = true;
  
  inp0check.checked(true);
  inp1.value('#ff0000');inp2.value('#ffffff');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(false); inp4check.checked(false); inp5check.checked(false);

  inp.value("SPACE *");

  inpNumber = 2;
  bkgdColorPicker.value('#000000');
} 

function kitty() {
  reset();
	typeXSlider.value(6); typeYSlider.value(23); typeStrokeSlider.value(1.5);
	ribbonCountSlider.value(217); ribbonSizeSlider.value(9);
	radiusSlider.value(1.5); trackerSlider.value(5); spiralStartSlider.value(5); spinSlider.value(0);
  
  waveSizeSlider.value(0); waveCountSlider.value(0); waveSpeedSlider.value(0); slopeSlider.value(0);
  radioEnd.value('1').checked = true;
  
  inp1.value('#0433FF');inp2.value('#FFFB00');inp3.value('#FF2F92');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value("Hello?");

  inpNumber = 4;
  bkgdColorPicker.value('#FF7E79');
} 

function hourglass() {
  reset();
	typeXSlider.value(2); typeYSlider.value(36); typeStrokeSlider.value(2);
	ribbonCountSlider.value(337); ribbonSizeSlider.value(30);
	radiusSlider.value(3); trackerSlider.value(3); spiralStartSlider.value(96); spinSlider.value(1);
  
  waveSizeSlider.value(83); waveCountSlider.value(2); waveSpeedSlider.value(4); slopeSlider.value(3.14);
  radioEnd.value('1').checked = true;
  
  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" ");

  inpNumber = 4;
  bkgdColorPicker.value('#D9D9D9');
} 

function star2() {
  reset();
	typeXSlider.value(5); typeYSlider.value(12); typeStrokeSlider.value(2);
	ribbonCountSlider.value(400); ribbonSizeSlider.value(43);
	radiusSlider.value(12.5); trackerSlider.value(0); spiralStartSlider.value(30); spinSlider.value(1);
  
  waveSizeSlider.value(31); waveCountSlider.value(6); waveSpeedSlider.value(7); slopeSlider.value(1);
  radioEnd.value('1').checked = true;
  
  inp1.value('#ff0000');inp2.value('#FF9300');inp3.value('#ffff00');inp4.value('#00ff00');inp5.value('#0000ff');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);

  inp.value(" ");

  inpNumber = 5;
  bkgdColorPicker.value('#ff0000');
} 

function pretzel() {
  reset();
	typeXSlider.value(4); typeYSlider.value(20); typeStrokeSlider.value(2);
	ribbonCountSlider.value(400); ribbonSizeSlider.value(31);
	radiusSlider.value(3); trackerSlider.value(1); spiralStartSlider.value(0); spinSlider.value(1);
  
  waveSizeSlider.value(200); waveCountSlider.value(1); waveSpeedSlider.value(3); slopeSlider.value(1);
  radioEnd.value('1').checked = true;
  
  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" ");

  inpNumber = 4;
  bkgdColorPicker.value('#0000ff');
} 

function lemniscate() {
  reset();
	typeXSlider.value(4); typeYSlider.value(9); typeStrokeSlider.value(2);
	ribbonCountSlider.value(400); ribbonSizeSlider.value(50);
	radiusSlider.value(0); trackerSlider.value(21); spiralStartSlider.value(84); spinSlider.value(1);
  
  waveSizeSlider.value(200); waveCountSlider.value(2); waveSpeedSlider.value(3); slopeSlider.value(1);
  radioEnd.value('2').checked = true;
  
  inp1.value('#ff0000');inp2.value('#ffff00');inp3.value('#0000ff');inp4.value('#ffffff');inp5.value('#000000');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(false);

  inp.value(" ");

  inpNumber = 4;
  bkgdColorPicker.value('#000000');
} 

function pride() {
  inpNumber = 6;
  
  inp1.value('#e70000');inp2.value('#ff8c00');inp3.value('#ffef00');inp4.value('#00811f');inp5.value('#0044ff'); inp6 = color('#760089');
  inp1check.checked(true); inp2check.checked(true); inp3check.checked(true); inp4check.checked(true); inp5check.checked(true);
  
  bkgdColorPicker.value('#ffffff');
}

function saveLoop() {
}