var columns = 150;
var rows = 50;

var xSpace = 10;
var ySpace = 20;

var pivot;

var radiusNoise;
var noiseSpeed;

let pgTextSize;
let currentpgTextSize;

var record = false;

var lineCount = 3;

var leading = 0.8;
var currentLeading;

var invert = false;

var input;
var splitInput = [];
var iT = [];
var currentInput;

var foreCol, backCol;

function preload(){
  font0 = loadFont('assets/IBMPlexMono-Regular.otf');

  font1 = loadFont('assets/KeplerStd-Medium.otf');
  font2 = loadFont('assets/WorkSans-Regular.ttf');
  font3 = loadFont('assets/RobotoCondensed-Bold.ttf');
  font4 = loadFont('assets/AguafinaScript-Regular.ttf');
  font5 = loadFont('assets/Roboto-Thin.ttf');
}

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);

  frameRate(30);
  noSmooth();

  noiseSpeedSlider = createSlider(1,50,20, 0.01); noiseSpeedSlider.position(width/2-150,10); noiseSpeedSlider.style('width','300px');

  radiusNoiseSlider = createSlider(0,1,0.25,0.01); radiusNoiseSlider.position(width/2-150,40); radiusNoiseSlider.style('width','140px');
  tumultSlider = createSlider(0,6*PI,2*PI,0.1); tumultSlider.position(width/2-150,60); tumultSlider.style('width','140px');

  columnSlider = createSlider(1,150,45); columnSlider.position(width/2+10,40); columnSlider.style('width','140px');
  rowSlider = createSlider(1,150,45); rowSlider.position(width/2+10,60); rowSlider.style('width','140px');

  inp = createInput('ALL|GOOD|THINGS|I HOPE.'); inp.position(width/2 - 160,height - 123); inp.style('width','150px');
  saveButton = createButton('Save PNG'); saveButton.position(width/2 + 170,height - 70); saveButton.style('width','80px'); saveButton.mousePressed(savePNG);

  fontSizeSlider = createSlider(1,500,170); fontSizeSlider.position(width/2 + 20,height - 80); fontSizeSlider.style('width','140px');
  leadingSlider = createSlider(0,2,0.6,0.01); leadingSlider.position(width/2 + 20,height - 60); leadingSlider.style('width','140px');

  sel = createSelect(); sel.position(width/2 - 215,height - 80);
    sel.option('KeplerStd-Medium',0);
    sel.option('WorkSans-Regular',1);
    sel.option('RobotoCondensed-Bold',2);
    sel.option('AguafinaScript-Regular',3);
    sel.option('Roboto-Thin',4);
    sel.selected(0);
    sel.changed(createSplits);

  invertCheck = createCheckbox('',false); invertCheck.position(width/2 - 150,height - 60); invertCheck.changed(createSplits);

  allYoursButton = createButton('All Yours'); allYoursButton.position(width/2 - 250,height - 30); allYoursButton.mousePressed(allYoursSet);
  justOkButton = createButton('Just OK'); justOkButton.position(width/2 - 175,height - 30); justOkButton.mousePressed(justOkSet);
  notSoGoodButton = createButton('Not So Good'); notSoGoodButton.position(width/2 - 105,height - 30); notSoGoodButton.mousePressed(notSoGood);
  cheerButton = createButton('Cheer'); cheerButton.position(width/2,height - 30); cheerButton.mousePressed(beAggressive);
  dateButton = createButton('Date'); dateButton.position(width/2 + 60,height - 30); dateButton.mousePressed(todayDate);
  hopeButton = createButton('Hopes'); hopeButton.position(width/2 + 110,height - 30); hopeButton.mousePressed(hopesDangers);
  circleButton = createButton('Circle'); circleButton.position(width/2 + 175,height - 30); circleButton.mousePressed(circlePreset);

  // pivot = -atan2(height,width);
  foreCol = color('#ffffff');
  bkgdCol = color('#000000');
}

function draw() {
  clear()

  if(invertCheck.checked()){
    foreCol = color('#000000');
    bkgdCol = color('#ffffff');
  } else {
    foreCol = color('#ffffff');
    bkgdCol = color('#000000');
  }

  background(bkgdCol);

  noiseSpeed = noiseSpeedSlider.value()/1000;
  radiusNoise = radiusNoiseSlider.value() * map(fontSizeSlider.value(),0,1,0,2);
  tumult = tumultSlider.value();
  columns = columnSlider.value();
  rows = rowSlider.value();
  input = inp.value();
  pgTextSize = fontSizeSlider.value();
  leading = leadingSlider.value();

  if(input != currentInput || leading != currentLeading || pgTextSize != currentpgTextSize){
    createSplits();
    currentInput = input;
    currentLeading = leading;
    currentpgTextSize = pgTextSize;
  }

  for(var z = 0; z<splitInput.length; z++){
    push();
  //  rotateZ(pivot);
    var stripS = iT[z];
    textureMode(NORMAL);

    xSpace = stripS.width/columns;
    ySpace = stripS.height/rows;

    texture(stripS);
    translate(-stripS.width/2,-stripS.height/2 - stripS.height*leading*(splitInput.length-1)/2 + stripS.height*z*leading);

    for(var y = 0; y<rows; y++){
      beginShape(TRIANGLE_STRIP);
      for(var x = 0; x<=columns; x++){
        let baseSpot = dist(0,stripS.height,stripS.width,-stripS.height/0.5);
        let currentSpot = dist(x*xSpace,y*ySpace, stripS.width, -stripS.height/0.5);
        let distMap = map(currentSpot,0,baseSpot,1,0);
        let radiusMap = easer(distMap)*radiusNoise;

        let nextSpot = dist(x*xSpace,(y+1)*ySpace, stripS.width, -stripS.height/0.5);
        let distMapNext = map(nextSpot,0,baseSpot,1,0);
        let radiusMapNext = easer(distMapNext)*radiusNoise;

        let noiseAngle = map(noise((x - (noiseSpeed*15)*frameCount) * 0.1, (y + z*rows + (noiseSpeed*5)*frameCount) * 0.1,frameCount*noiseSpeed),0,1,-tumult,tumult);
        let noiseAngleNext = map(noise((x - (noiseSpeed*15)*frameCount) * 0.1, (y+1  + z*rows + (noiseSpeed*5)*frameCount) * 0.1,frameCount*noiseSpeed),0,1,-tumult,tumult);

        let u = map(x*xSpace + sin(noiseAngle)*radiusMap, 0, stripS.width, 0, 1);
        let vTop = map(y*ySpace + cos(noiseAngle)*radiusMap, 0, stripS.height, 0, 1);
        let vBottom = map((y+1)*ySpace + cos(noiseAngleNext)*radiusMapNext, 0, stripS.height, 0, 1);

        vertex(x*xSpace,y*ySpace,u,vTop);
        vertex(x*xSpace,(y+1)*ySpace,u,vBottom);
      }
      endShape();
    }
    pop();
  }

  if(record){
    saveCanvas('stg_danger', 'png');
    record = false;
    print("done?");
  }

  push();
  translate(-width/2,-height/2);

  fill(foreCol);
  textAlign(RIGHT);
  textSize(10);
  textFont(font0);
  text("Speed",width/2-160,22);
  text("Size",width/2-160,53);
  text("Complexity",width/2-160,73);
  text("Font Size",width/2 + 15,height-67);
  text("Leading",width/2 + 15,height-47);
  textAlign(LEFT);
  text("Invert",width/2 - 128,height-46);
  text("Columns",width/2+160,53);
  text("Rows",width/2+160,73);
  text("Use vertical bars ('|')\nto create line breaks.",width/2 + 20,height-115);
  noFill();
  stroke(foreCol);
  line(width/2 - 200, height - 90, width/2 + 200, height - 90);
  pop();
}

function savePNG(){
  record = true;
  print("start recording!");
}

function createSplits(){
  if(invertCheck.checked()){
    foreCol = color('#000000');
    bkgdCol = color('#ffffff');
  } else {
    foreCol = color('#ffffff');
    bkgdCol = color('#000000');
  }

  splitInput = input.split('|');

  for(var i=0; i<splitInput.length; i++){
    createIndTexture(i,splitInput[i]);
  }
}

function easer(step){
  var p = 4;
  return pow(step,p)/(pow(step,p) + pow(1-step,p));
}

function resetPreset(){
  noiseSpeedSlider.value(20); //50
  radiusNoiseSlider.value(0.25); //1
  tumultSlider.value(2*PI); // 6*PI
  columnSlider.value(45); rowSlider.value(45); //150
  inp.value('ALL|GOOD|THINGS|I HOPE.');
  fontSizeSlider.value(170); //500
  leadingSlider.value(0.6); //2
  sel.value(0); //4
  invertCheck.checked(false);
}

function allYoursSet(){
  resetPreset();
  noiseSpeedSlider.value(20); //50
  radiusNoiseSlider.value(0.8); //1
  tumultSlider.value(5*PI); // 6*PI
  columnSlider.value(45); rowSlider.value(45); //150
  inp.value('One|day|all|this|will|be|yours.');
  fontSizeSlider.value(85); //500
  leadingSlider.value(0.75); //2
  sel.value(0); //4
  invertCheck.checked(false);
}

function justOkSet(){
  resetPreset();
  noiseSpeedSlider.value(12); //50
  radiusNoiseSlider.value(0.8); //1
  tumultSlider.value(5*PI); // 6*PI
  columnSlider.value(15); rowSlider.value(150); //150
  inp.value('OK');
  fontSizeSlider.value(500); //500
  leadingSlider.value(0.6); //2
  sel.value(4); //4
  invertCheck.checked(false);
}

function notSoGood(){
  resetPreset();
  noiseSpeedSlider.value(10);
  radiusNoiseSlider.value(1); tumultSlider.value(5*PI);
  columnSlider.value(30); rowSlider.value(30);
  inp.value('NOT|SO|GOOD');
  fontSizeSlider.value(220);
  leadingSlider.value(0.65);
  sel.value(2);
  invertCheck.checked(true);
}

function beAggressive(){
  resetPreset();
  noiseSpeedSlider.value(15);
  radiusNoiseSlider.value(0.2); tumultSlider.value(4*PI);
  columnSlider.value(40); rowSlider.value(50);
  inp.value("be|aggressive");
  fontSizeSlider.value(110);
  leadingSlider.value(0.4);
  sel.value(3);
  invertCheck.checked(true);
}

function todayDate(){
  resetPreset();
  noiseSpeedSlider.value(15);
  radiusNoiseSlider.value(0.2); tumultSlider.value(6*PI);
  columnSlider.value(80); rowSlider.value(80);
  inp.value("2016–|TODAY");
  fontSizeSlider.value(50);
  leadingSlider.value(0.65);
  sel.value(0);
  invertCheck.checked(true);
}

function hopesDangers(){
  resetPreset();
  noiseSpeedSlider.value(10); //50
  radiusNoiseSlider.value(1); //1
  tumultSlider.value(3*PI); // 6*PI
  columnSlider.value(25); rowSlider.value(25); //150
  inp.value('Hopes|    and|  Dangers');
  fontSizeSlider.value(50); //500
  leadingSlider.value(0.4); //2
  sel.value(3); //4
  invertCheck.checked(false);
}

function circlePreset(){
  resetPreset();
  noiseSpeedSlider.value(20); //50
  radiusNoiseSlider.value(1); //1
  tumultSlider.value(2*PI); // 6*PI
  columnSlider.value(30); rowSlider.value(150); //150
  inp.value(' O ');
  fontSizeSlider.value(500); //500
  leadingSlider.value(0.0); //2
  sel.value(1); //4
  invertCheck.checked(true);
}

function createIndTexture(i,indInput){
  let selectedFont;

  if(sel.value() == 0){
    selectedFont = font1;
  } else if(sel.value() == 1){
    selectedFont = font2;
  } else if(sel.value() == 2){
    selectedFont = font3;
  } else if(sel.value() == 3){
    selectedFont = font4;
  } else if(sel.value() == 4){
    selectedFont = font5;
  }

  textSize(pgTextSize);
  textFont(selectedFont);
  repeatSize = textWidth(indInput)*1.015;

  var textureWidth = repeatSize*1.4;
  var textureHeight = pgTextSize*1.2;

  var textNudgeDown = pgTextSize*0.7/2;

  if(sel.value()==3){
    textureHeight = pgTextSize*1.75;
    textureWidth = repeatSize*1.75;
    textNudgeDown = pgTextSize*0.7/4;
  }

  iT[i] = createGraphics(textureWidth,textureHeight);
//  iT[i].background(0,0,255);
  iT[i].fill(foreCol);
  iT[i].noStroke();
  iT[i].textAlign(CENTER);
  iT[i].textSize(pgTextSize);
  iT[i].textFont(selectedFont);
  iT[i].translate(textureWidth/2,textureHeight/2 + textNudgeDown);
//  v1.rotate(-PI/64);
  iT[i].text(indInput,0,0);
}
