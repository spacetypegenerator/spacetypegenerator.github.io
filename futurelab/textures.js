function drawTextures(){
  createText();
  createTextInside();
  createGradient1();
  createGradient2();
  createGradient3();
}

function createText(){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(mainText1))*1.1;

  pgT = createGraphics(repeatSize,pgTextSize*0.8);
  //pgT.background(foreColor);
  pgT.fill(foreColor);
  pgT.noStroke();
  pgT.textAlign(CENTER);

  pgT.textSize(pgTextSize);

  pgT.textFont(uFontReg);
  pgT.text(mainText1,pgT.width/2,pgT.height/2 + pgTextSize*0.7/2);
}

function createTextInside(){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(mainText1))*1.1;

  pgTinside = createGraphics(repeatSize,pgTextSize*0.8);
  // pgT.background(foreColor);
  pgTinside.fill(100);
  pgTinside.noStroke();
  pgTinside.textAlign(CENTER);

  pgTinside.textSize(pgTextSize);

  pgTinside.textFont(uFontReg);
  pgTinside.text(mainText1,pgT.width/2,pgT.height/2 + pgTextSize*0.7/2);
}

function createGradient1(){
  c1 = color('#62CF5D');
  c2 = color('#004B3F');

  pgGradient1 = createGraphics(width,height);

  for(var g = 0; g<height; g++){
    var lerpC = lerpColor(c1,c2,g/height);
    pgGradient1.stroke(lerpC);
    pgGradient1.strokeWeight(1);
    pgGradient1.noFill();
    pgGradient1.line(0,g,pgGradient1.width,g);
  }
}

function createGradient2(){
  c1 = color('#F3De46');
  c2 = color('#c46000');

  pgGradient2 = createGraphics(width,height);

  for(var g = 0; g<height; g++){
    var lerpC = lerpColor(c1,c2,g/height);
    pgGradient2.stroke(lerpC);
    pgGradient2.strokeWeight(1);
    pgGradient2.noFill();
    pgGradient2.line(0,g,pgGradient2.width,g);
  }
}

function createGradient3(){
  c1 = color('#7de1da');
  c2 = color('#1f378c');

  pgGradient3 = createGraphics(width,height);

  for(var g = 0; g<height; g++){
    var lerpC = lerpColor(c1,c2,g/height);
    pgGradient3.stroke(lerpC);
    pgGradient3.strokeWeight(1);
    pgGradient3.noFill();
    pgGradient3.line(0,g,pgGradient3.width,g);
  }
}

function drawInds(){
  mainInd = [];

  for(var a=0; a<mainText1.length; a++){
    createTextInd(a, mainText1.charAt(a));
  }
}

function createTextInd(r, alp){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(alp));

  mainInd[r] = createGraphics(repeatSize,pgTextSize*0.8);
  // mainInd[r].background(foreColor);
  mainInd[r].fill(foreColor);
  mainInd[r].noStroke();
  mainInd[r].textAlign(CENTER);

  mainInd[r].textSize(pgTextSize);

  mainInd[r].textFont(uFontReg);
  mainInd[r].text(alp,mainInd[r].width/2,mainInd[r].height/2 + pgTextSize*0.7/2);
}
