let particles = [];
let steps = 70;
let pgTextSize = 70;
let glow = 0;

let depthUnit = -2;

let curveStop = 5;
let stripCount = 8;

let textureUnit = 5;
let currentTextureUnit = 5;

let stripChoice = 2;
let stripCountChoice = 1;

let partCount = 2;
let squiggleCount = 1;
let stripHeight = 85;
let stripRadio;

let culmDist = [];

let foreColor, bkgdColor;

let mainText1;
let currentMainText;
let radio;

let rSpeed = [];
let roundCap = false;

let handleColor;
let handleAlpha = 255;

let drgHL = stripHeight;
let drgStartX;
let drgStartY;
let drgA = 0;
let clickedIn = false;
let draggedIn = false;
let noneSelected = true;

let outlineCheck;

function preload(){
  font0 = loadFont('resources/IBMPlexMono-Regular.otf');

  font1 = loadFont('resources/nimbus-sans-l_regular-condensed.ttf');
  font2 = loadFont('resources/ProximaNova-Black.otf');
  font3 = loadFont('resources/KeplerStd-Medium.otf');
  font4 = loadFont('resources/Plaid-XL.otf');
  font5 = loadFont('resources/IBMPlexMono-Italic.otf');
  font6 = loadFont('resources/DoHyeon-Regular.ttf');
  font7 = loadFont('resources/NotoSansJP-Black.otf');
  font8 = loadFont('resources/NotoSansSC-Thin.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);

  inp = createInput('YOU DON\'T UNDERSTAND THINGS, YOU JUST GET USED TO THEM.');
  inp.position(10,height-155); inp.style('width','300px');

  sel = createSelect(); sel.position(340, height-155); sel.style('width','150px'); sel.style('height','20px');
  sel.option('NimbusSans-Regular Condensed',0);
  sel.option('ProximaNova-Black',1);
  sel.option('KeplerStd-Medium',2);
  sel.option('Plaid-XL',3);
  sel.option('IBMPlexMono-Italic',4);
  sel.option('DoHyeon-Korean-Regular',5);
  sel.option('NotoSans-Japanese-Black',6);
  sel.option('NotoSans-SimpleChinese-Thin',7);
  sel.changed(drawTextures);
  sel.selected(0);

  handleColor = color(0,0,255);

  stripHeightSlider = createSlider(10,300,70); stripHeightSlider.position(10,height-120); stripHeightSlider.style('width','100px');
  stripCountSlider = createSlider(1,6,1); stripCountSlider.position(10 ,height-85); stripCountSlider.style('width','100px');
  stripCountSlider.changed(setStripCountChoice);

  outlineCheck = createCheckbox(' ',false); outlineCheck.position(10,height-45); outlineCheck.changed(drawTextures);
  roundCapCheck = createCheckbox(' ',false); roundCapCheck.position(10,height-25);

  backgroundPicker = createColorPicker('#0d0d0d'); backgroundPicker.position(220,height - 60);
  backgroundPicker.style('height','25px');backgroundPicker.style('width','65px'); backgroundPicker.input(drawTextures);
  forePicker = createColorPicker('#ffffff'); forePicker.position(295,height - 60)
  forePicker.style('height','25px');forePicker.style('width','65px');forePicker.input(drawTextures);

  gradient1pick = createColorPicker('#2955d9'); gradient1pick.position(220,height - 105); gradient1pick.style('height','40px'); gradient1pick.style('width','20px'); gradient1pick.input(drawTextures);
  gradient2pick = createColorPicker('#2793f2'); gradient2pick.position(250,height - 105); gradient2pick.style('height','40px'); gradient2pick.style('width','20px'); gradient2pick.input(drawTextures);
  gradient3pick = createColorPicker('#f2c12e'); gradient3pick.position(280,height - 105); gradient3pick.style('height','40px'); gradient3pick.style('width','20px'); gradient3pick.input(drawTextures);
  gradient4pick = createColorPicker('#f23e2e'); gradient4pick.position(310,height - 105); gradient4pick.style('height','40px'); gradient4pick.style('width','20px'); gradient4pick.input(drawTextures);
  gradient5pick = createColorPicker('#0d0d0d'); gradient5pick.position(340,height - 105); gradient5pick.style('height','40px'); gradient5pick.style('width','20px'); gradient5pick.input(drawTextures);

  stripRadio = createRadio();
  stripRadio.option(' ');
  stripRadio.option('  ');
  stripRadio.option('   ');
  stripRadio.option('    ');
  stripRadio.option('     ');
  stripRadio.option('      ');
  stripRadio.position(120,height-125); stripRadio.style('width','20px'); stripRadio.selected('   '); stripRadio.changed(setStripChoice);

  mainText1 = inp.value();
  currentMainText1= inp.value();
  frameRate(30);
  rectMode(CENTER);

  culmDist[0] = [];
  particles[0] = [];

  particles[0][0] = new Particle(width/2 ,(height)*3/4,PI,width/4);
  particles[0][1] = new Particle(width/2,(height)*2/4,PI,width/4);
  particles[0][2] = new Particle(width/2,(height)*1/4,PI,width/4);

  foreColor = color(gradient1pick.value());
  bkgdColor = color('#000000');

  drawTextures();

  for(let r=0; r<20; r++){
    var rs = random(5,20);
    rSpeed[r] = rs/10;
  }

  b4Buntton = createButton('Vote'); b4Buntton.position(380,height-105); b4Buntton.mousePressed(b4);
  b2Buntton = createButton('Dream-ager'); b2Buntton.position(380,height-80); b2Buntton.mousePressed(b2);
  b3Buntton = createButton('Tracks'); b3Buntton.position(380,height-55); b3Buntton.mousePressed(b3);
  b1Buntton = createButton('Juicy'); b1Buntton.position(380,height-30); b1Buntton.mousePressed(b1);
  b5Buntton = createButton('Yes &'); b5Buntton.position(480,height-105); b5Buntton.mousePressed(b5);
  b6Buntton = createButton('Guts'); b6Buntton.position(480,height-80); b6Buntton.mousePressed(b6);
  b7Buntton = createButton('Eels & wind'); b7Buntton.position(480,height-55); b7Buntton.mousePressed(b7);
  button = createButton('Reset Points'); button.position(480,height-30); button.mousePressed(resetPoints);

}

function draw() {
  clear();

  bkgdColor = color(backgroundPicker.value());
  foreColor = color(forePicker.value());
  mainText1 = inp.value();
  stripHeight = stripHeightSlider.value();
  //stripCount = stripCountSlider.value();
  stripCount = stripCountChoice;
  roundCap = roundCapCheck.checked();

  background(bkgdColor);

  if(textureUnit != currentTextureUnit || mainText1 != currentMainText1){
    drawTextures();
    currentTextureUnit = textureUnit;
    currentMainText1 = mainText1;
  }

  push();
  translate(-width/2,-height/2);

  fill(foreColor);
  textAlign(LEFT);
  textSize(10);
  textFont(font0);
  text("Strip Height " + stripHeight,15,height-90);
  text("Strip Count " + stripCount,15,height-55);
  text("Outlines",32,height-32);
  text("Round Cap",32,height-12);
  text("Text",145,height-113);
  text("Gradient 1",145,height-93);
  text("Gradient 2",145,height-73);
  text("Stripes",145,height-53);
  text("All",145,height-34);
  text("Mixture",145,height-15);

  text("GRADIENT KNOTS",220,height-110);
  text("Background",220,height-18);
  text("Foreground",300,height-18);

  text("PRESETS",380,height-110);

  textSize(12);
  text("Click & drag to lay down points. Press ENTER to start a new string.",10,height-170);

  let particleCt = particles[squiggleCount-1].length;
  if(draggedIn){
    stroke(0,0,255);
    strokeWeight(1);
    noFill();
    bezier ( particles[squiggleCount-1][particleCt-1].x,particles[squiggleCount-1][particleCt-1].y,-2,
            particles[squiggleCount-1][particleCt-1].althx,particles[squiggleCount-1][particleCt-1].althy,-2,
            drgStartX + cos(drgA)*drgHL,drgStartY + sin(drgA)*drgHL,-2,
            drgStartX,drgStartY,-2);
    line(   drgStartX + cos(drgA)*drgHL,drgStartY + sin(drgA)*drgHL,-2,
            drgStartX - cos(drgA)*drgHL,drgStartY - sin(drgA)*drgHL,-2)
  } else if(particles[squiggleCount-1].length>1){
    stroke(handleColor);
    strokeWeight(1);
    noFill();
    bezier ( particles[squiggleCount-1][particleCt-1].x,particles[squiggleCount-1][particleCt-1].y,-2,
            particles[squiggleCount-1][particleCt-1].althx,particles[squiggleCount-1][particleCt-1].althy,-2,
            mouseX+drgHL,mouseY,-2,
            mouseX,mouseY,-2);
  } else {
    stroke(handleColor);
    strokeWeight(1);
    noFill();
    bezier ( particles[squiggleCount-1][0].x,particles[squiggleCount-1][0].y,-2,
            particles[squiggleCount-1][0].althx,particles[squiggleCount-1][0].althy,-2,
            mouseX+drgHL,mouseY,-2,
            mouseX,mouseY,-2);
    ellipse(mouseX,mouseY,stripHeight/2,stripHeight/2);
  }

  for(var n = 0; n<squiggleCount; n++){
    if(outlineCheck.checked() && roundCap==false){
      noFill();
      stroke(foreColor);
      strokeWeight(2/stripCount * stripHeight/60);

      let xStart = particles[n][0].x;
      let yStart = particles[n][0].y;
      let aStart = particles[n][0].a;

      let xEnd = particles[n][particles[n].length-1].x;
      let yEnd = particles[n][particles[n].length-1].y;
      let aEnd = particles[n][particles[n].length-1].a;

      push();
      translate(xStart,yStart);
      rotateZ(aStart);
      line(0,-stripHeight/2,0,stripHeight/2);
      pop();

      push();
      translate(xEnd,yEnd,-2);
      rotateZ(aEnd);
      line(-1,-stripHeight/2,-1,stripHeight/2);
      pop();
    }
  }

  for(var n = 0; n<squiggleCount; n++){
    for(var m = 0; m<stripCount; m++){
      if(stripCount==3){ if(m==1) { m=2; } else if(m==2) { m=1; }}
      if(stripCount==4){ if(m==1) { m=3; } else if(m==3) { m=1; }}
      if(stripCount==5){ if(m==1) { m=4; } else if(m==2) { m=1; } else if(m==4) { m=2; }}
      if(stripCount==6){ if(m==1) { m=5; } else if(m==2) { m=1; } else if(m==3) { m=4; } else if(m==4) { m=2; } else if(m==5) { m=3; }}

      culmDist[n][m] = 0;
      for(var j = particles[n].length; j>0; j--){
        if(j < particles[n].length){
          let stripSelect;
          if(stripChoice == 5){
            if(n%4==0){
              stripSelect = pgT;
            } else if(n%4==1){
              stripSelect = pgGH;
            } else if(n%4==2){
              stripSelect = pgStripes;
            } else {
              stripSelect = pgG;
            }
          } else if(stripChoice == 4){
            if(m%4==0){
              stripSelect = pgT;
            } else if(m%4==1){
              stripSelect = pgGH;
            } else if(m%4==2){
              stripSelect = pgStripes;
            } else {
              stripSelect = pgG;
            }
          } else if (stripChoice == 0){
            stripSelect = pgT;
          } else if(stripChoice == 1){
            stripSelect = pgGH;
          } else if(stripChoice == 2){
            stripSelect = pgG;
          } else {
            stripSelect = pgStripes;
          }

          texture(stripSelect);
          textureMode(NORMAL);

          let heightRatio = stripSelect.width*(stripHeight/stripCount)/stripSelect.height;

          beginShape(TRIANGLE_STRIP);
          for(var k = 0; k<=steps; k++){
            let x = particles[n][j].x;
            let y = particles[n][j].y;

            let preX = particles[n][j-1].x;
            let preY = particles[n][j-1].y;

            let a = particles[n][j].a;
            let preA = particles[n][j-1].a;

            let hX = particles[n][j].hx;
            let hY = particles[n][j].hy;

            let hPreX = particles[n][j-1].althx;
            let hPreY = particles[n][j-1].althy;

            let t = k/steps;
            let pointX = bezierPoint(x,hX,hPreX,preX,t);
            let pointY = bezierPoint(y,hY,hPreY,preY,t);
            let tangentX = bezierTangent(x,hX,hPreX,preX,t);
            let tangentY = bezierTangent(y,hY,hPreY,preY,t);
            let pointAngle = atan2(tangentY,tangentX);

            pointAngle -= HALF_PI;

            let u = map((culmDist[n][m] + frameCount*rSpeed[m])%heightRatio, 0, heightRatio, 0, 1);

            var thisStripHeight = stripHeight/stripCount;

            var stripHeightTop, stripHeightBottom;
            stripHeightBottom = -stripHeight/2 + m * stripHeight/stripCount;
            stripHeightTop = -stripHeight/2 + (m+1) * stripHeight/stripCount;

            let preT = (k-1)/steps;
            let prePointX = bezierPoint(x,hX,hPreX,preX,preT);
            let prePointY = bezierPoint(y,hY,hPreY,preY,preT);

            let thisStepDist = abs(dist(pointX,pointY,prePointX,prePointY));

            if(k!=steps){
              culmDist[n][m] += thisStepDist;
            }

            if(k==0 && j == particles[n].length-1 && roundCap){
              for(let b = curveStop; b>=1; b--){
                vertex(pointX + cos(pointAngle + PI/2 * b/curveStop) * stripHeightBottom, pointY + sin(pointAngle + PI/2 * b/curveStop) * stripHeightBottom, u, 1);
                vertex(pointX + cos(pointAngle - PI/2 * b/curveStop) * stripHeightTop, pointY + sin(pointAngle - PI/2 * b/curveStop) * stripHeightTop, u, 0);
              }
            }

            vertex(pointX + cos(pointAngle) * stripHeightBottom, pointY + sin(pointAngle) * stripHeightBottom, u, 1);
            vertex(pointX + cos(pointAngle) * stripHeightTop, pointY + sin(pointAngle) * stripHeightTop, u, 0);

            if(((culmDist[n][m]-thisStepDist) + frameCount*rSpeed[m])%heightRatio > heightRatio - thisStepDist){
              vertex(pointX + cos(pointAngle) * stripHeightBottom, pointY + sin(pointAngle) * stripHeightBottom, 0, 1);
              vertex(pointX + cos(pointAngle) * stripHeightTop, pointY + sin(pointAngle) * stripHeightTop, 0, 0);
            }

            if(k==steps && j==1 && roundCap){
              for(let b = 1; b<=curveStop; b++){
                vertex(pointX + cos(pointAngle - PI/2 * b/curveStop) * stripHeightBottom, pointY + sin(pointAngle - PI/2 * b/curveStop) * stripHeightBottom, u, 1);
                vertex(pointX + cos(pointAngle + PI/2 * b/curveStop) * stripHeightTop, pointY + sin(pointAngle + PI/2 * b/curveStop) * stripHeightTop, u, 0);
              }
            }

            if(thisStepDist>textureUnit){
              textureUnit = thisStepDist;
            }
          }
          endShape();
        }
      }

      if(stripCount==3){
        if(m==2){ m=1; } else if(m==1){ m=2; }
      }

      if(stripCount==4){
        if(m==3) { m=1; } else if(m==1) { m=3; }
      }
      if(stripCount==5){ if(m==4) { m=1; } else if(m==1) { m=2; } else if(m==2) { m=4; }}
      if(stripCount==6){ if(m==5) { m=1; } else if(m==1) { m=2; } else if(m==4) { m=3; } else if(m==2) { m=4; } else if(m==3) { m=5; }}
    }


  }

  translate(0,0,1);
  for(var n = 0; n<squiggleCount; n++){
    for(var j = 0; j<particles[n].length; j++){
      particles[n][j].update();
      particles[n][j].over();
      particles[n][j].show();
      particles[n][j].w = stripHeight/2;
      particles[n][j].h= stripHeight/2;
    }
  }

  pop();

  handleColor.setAlpha(handleAlpha);

  if(handleAlpha >= 0){
    handleAlpha -= 15;
  }

}

function mouseMoved(){
  if(handleAlpha<255){
    handleAlpha += 30;
  }
}

function mouseClicked(){
  noneSelected = true;
  for(var n = 0; n<squiggleCount; n++){
    for(var j = 0; j<particles[n].length; j++){
      particles[n][j].pressed();
      if(particles[n][j].dragging || particles[n][j].draggingHandle || particles[n][j].draggingHandleAlt){
        noneSelected = false;
      }
      particles[n][j].released();
    }
  }

  if(mouseY>height-160){
    noneSelected = false;
  }

  if(noneSelected){
    let particleCt = particles[squiggleCount-1].length;
    particles[squiggleCount-1][particleCt] = new Particle(drgStartX,drgStartY,drgA,drgHL);
    drgA = 0;
    drgHL = stripHeight;
  }
}

function mousePressed() {
  clickedIn = true;
  drgStartX = mouseX;
  drgStartY = mouseY;

  for(var n=0; n<squiggleCount; n++){
    for(var j = 0; j<particles[n].length; j++){
      particles[n][j].pressed();
    }
  }
}

function mouseDragged(){
  drgHL = dist(drgStartX,drgStartY,mouseX,mouseY);
  drgA = atan2(drgStartY - mouseY, drgStartX - mouseX);


  draggedIn = true;
}

function mouseReleased() {
  for(var n=0; n<squiggleCount; n++){
    for(var j = 0; j<particles[n].length; j++){
      particles[n][j].released();
    }
  }
  clickedIn = false;
  draggedIn = false;
}

function keyPressed(){
  if(keyCode===ENTER){
    squiggleCount++;
    particles[squiggleCount-1] = [];
    culmDist[squiggleCount-1] = [];
    if(mouseX<width/2){
      particles[squiggleCount-1][0] = new Particle(mouseX+10,mouseY,drgA,drgHL);
    } else {
      particles[squiggleCount-1][0] = new Particle(mouseX-10,mouseY,drgA,drgHL);
    }
  }
}

function resetPoints(){
  for(var n = 0; n<squiggleCount; n++){
    while(particles[n].length>0){
      particles[n].pop();
    }
  }

  squiggleCount = 1;

  for(var j = 0; j<partCount; j++){
    particles[0][j] = new Particle(((partCount-j)) * (width+400)/(partCount+1) - 200,(height-120)/2,PI/4,width/4);
  }
}

function setStripChoice(){
  if(stripRadio.value() == ' '){
    stripChoice = 0;
  } else if(stripRadio.value() == '  '){
    stripChoice = 1;
  }  else if(stripRadio.value() == '   '){
    stripChoice = 2;
  }  else if(stripRadio.value() == '    '){
    stripChoice = 3;
  }  else if(stripRadio.value() == '     '){
    stripChoice = 4;
  }  else if(stripRadio.value() == '      '){
    stripChoice = 5;
  }
}

function setStripCountChoice(){
  stripCountChoice = stripCountSlider.value();
}

function resetBasic(){
  sel.selected(0);
  inp.value('WILL YOU ALWAYS BE ABLE TO PROTECT ME FROM THE FUTURE?');

  stripHeightSlider.value(60);
  stripCountSlider.value(1);

  outlineCheck.checked(false);
  roundCapCheck.checked(false);

  gradient1pick.value('#030a8C');
  gradient2pick.value('#030BA6');
  gradient3pick.value('#F21d1d');
  gradient4pick.value('#FcBC1B');
  gradient5pick.value('#F2c4E6');
  forePicker.value('#F21d1d');
  backgroundPicker.value('#ffffff');

  stripChoice = 1;
  stripCountChoice = 1;

  for(var n = 0; n<squiggleCount; n++){
    while(particles[n].length>0){
      particles[n].pop();
    }
  }

  squiggleCount = 1;
}

function b1(){
  resetBasic();

  stripHeightSlider.value(100);

  gradient1pick.value('#0f5cbf');
  gradient2pick.value('#25d964');
  gradient3pick.value('#f2b90f');
  gradient4pick.value('#f24f13');
  gradient5pick.value('#0d0d0d');
  forePicker.value('#ffffff');
  backgroundPicker.value('#000000');

  stripChoice = 2;

  drawTextures();

  for(var j = 0; j<10; j++){
    particles[0][j] = new Particle(random(100,width-100),random(100,height-300),random(2*PI),random(width/2));
  }
}

function b2(){
  resetBasic();

  stripHeightSlider.value(44);
  outlineCheck.checked(true);

  gradient1pick.value('#030a8C');
  gradient2pick.value('#030BA6');
  gradient3pick.value('#F21d1d');
  gradient4pick.value('#FcBC1B');
  gradient5pick.value('#F2c4E6');
  forePicker.value('#030a8C');
  backgroundPicker.value('#F2c4E6');

  stripChoice = 2;

  drawTextures();

  for(var j = 0; j<20; j++){
    particles[0][j] = new Particle(random(50,width-50),random(50,height-200),random(PI,PI*3/2),random(50,300));
  }
}

function b3(){
  resetBasic();

  sel.selected(0);
  inp.value('WILL YOU ALWAYS BE ABLE TO PROTECT ME FROM THE FUTURE?');

  stripHeightSlider.value(60);
  outlineCheck.checked(true);

  gradient1pick.value('#ffffff');
  gradient2pick.value('#0d0d0d');
  gradient3pick.value('#000000');
  gradient4pick.value('#b7b7b7');
  gradient5pick.value('#e2e2e2');
  forePicker.value('#000000');
  backgroundPicker.value('#858585');

  stripChoice = 0;

  drawTextures();

  for(var j = 0; j<28; j++){
    let angleStep = map(j,0,28,0,19*PI) + PI/4;

    particles[0][j] = new Particle(
      width/2 + cos(angleStep) * random(0,width/2),
      height/2 - 100 + sin(angleStep/PI) * random(0,height/2),
      angleStep - PI/2,
      random(width*1/8,width/4));
  }
}

function b4(){
  resetBasic();

  sel.selected(3);
  inp.value('SAVE THE COUNTRY');

  stripHeightSlider.value(180);
  stripCountSlider.value(4);

  gradient1pick.value('#2955d9');
  gradient2pick.value('#2793f2');
  gradient3pick.value('#ffffff');
  gradient4pick.value('#f23e2e');
  gradient5pick.value('#000000');
  forePicker.value('#ffffff');
  backgroundPicker.value('#000000');

  stripChoice = 4;
  stripCountChoice = 4;


  drawTextures();

  particles[0][0] = new Particle(width - 50, height-400, PI/4, width/4);
  particles[0][1] = new Particle(width - 50 - width/3, height-300, PI*5/4, width/8);
  particles[0][2] = new Particle(width + 50 - width/3, 200, PI*1/8, width/4);
  particles[0][3] = new Particle(width - 50 - width*2/3, height-300, PI*5/4, width/4);
  particles[0][4] = new Particle(width/2, 200, 0, width/4);
  particles[0][5] = new Particle(150, height/2, PI*5/4, width/8);
  particles[0][6] = new Particle(150, 150, PI/4, width/3);
}

function b5(){
  resetBasic();

  sel.selected(1);
  inp.value('       -- - - ----- - ---        - - -----------        - - ----- - - -- - ----- --- - -- --- --      ------ - ------- - - ---- - - -     ');

  stripHeightSlider.value(200);

  gradient1pick.value('#000000');
  forePicker.value('#ffffff');
  backgroundPicker.value('#000000');

  stripChoice = 0;
  stripCountChoice = 14;

  drawTextures();

  particles[0][0] = new Particle(width/2 + 350, height-250, PI/2, height*3/8);
  particles[0][1] = new Particle(width/2 - 350, 350, PI/2, height*1/8);
  particles[0][2] = new Particle(width/2, 350, -PI/2, height*1/8);
  particles[0][3] = new Particle(width/2 - 350, height-450, -PI * 3/4, height/4);
  particles[0][4] = new Particle(width/2 + 350, height/3, PI * 3/5, height/4);
}

function b6(){
  resetBasic();

  stripHeightSlider.value(100);

  gradient1pick.value('#ffffff');
  gradient2pick.value('#ffffff');
  gradient3pick.value('#f28599');
  gradient4pick.value('#d94625');
  gradient5pick.value('#f2ca50');
  forePicker.value('#000000');
  backgroundPicker.value('#000000');

  stripChoice = 2;
  stripCountChoice = 3;
  outlineCheck.checked(true);

  drawTextures();

  for(var j = 0; j<28; j++){
    let angleStep = map(j,0,28,0,5*PI)-PI/4;

    particles[0][j] = new Particle(
      width/2 + cos(angleStep) * random(0,width/8),
      height/2 - 100 + sin(angleStep) * random(0,(height-100)/2),
      angleStep - random(PI/2),
      random(width/16,width/4));
  }
}

function b7(){
  resetBasic();

  sel.selected(6);
  inp.value('ゆふめしに かますご喰へば 風薫');

  stripHeightSlider.value(200);

  gradient1pick.value('#141414');
  gradient2pick.value('#cccccc');
  gradient3pick.value('#4f4f4f');
  gradient4pick.value('#212121');
  gradient5pick.value('#e2e2e2');
  forePicker.value('#ffffff');
  backgroundPicker.value('#ffadad');

  stripChoice = 4;
  stripCountChoice = 3;
  outlineCheck.checked(true);

  drawTextures();

  particles[0][0] = new Particle(width-300, height-300, PI/4, height/4);
  particles[0][1] = new Particle(300, height-300, PI*5/4, height/8);
  particles[0][2] = new Particle(width - 300, 300, PI*5/4, height/8);
  particles[0][3] = new Particle(width/2, height/2, 0, height/4);
  particles[0][4] = new Particle(width * 3/8, 350, PI*5/4, height/8);
  particles[0][5] = new Particle(300, height/2, 0, height/4);
}

// BW set - 000000  ffffff  000000  b7b7b7  e2e2e2
// ball set - 0f5cbf  25d964  f2b90f  f24f13  0d0d0d
// moon set - 1d64f2  055ba6  04b2d9  f2bb72  f27d52
// broad set - f28599  122459  1c4aa6  f2ca50  d94625
// HKV set - 2955d9  2793f2  f2c12e  f23e2e  0d0d0d
