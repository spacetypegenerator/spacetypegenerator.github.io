function drawTextures(){
  for(let r = 0; r<stackCount; r++){
    createTextGradient(r,stackCount);
    createTextGradientInside(r,stackCount);
  }
  createText();
  createTextInside();
  createGradient1();
  createGradient2();
  createGradient3();
}

function createTextGradient(r, rCount){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(mainText1))*1.05;

  pgTG[r] = createGraphics(repeatSize,pgTextSize*0.8);

  if(typeCselect == 1){
    startC = color('#62cf5d');
    endC = color('#004b3f');
  } else if(typeCselect == 2){
    startC = color('#f3de46');
    endC = color('#c46000');
  } else if(typeCselect == 3){
    startC = color('#7de1da');
    endC = color('#1f378c');
  } else if(typeCselect == 4){
    startC = color('#ffffff');
    endC = color('#ffffff');
  } else if(typeCselect == 5){
    startC = color('#000000');
    endC = color('#000000');
  }

  let gColor = lerpColor(startC,endC,r/rCount);

  pgTG[r].fill(gColor);
  pgTG[r].noStroke();
  pgTG[r].textAlign(CENTER);

  pgTG[r].textSize(pgTextSize);

  pgTG[r].textFont(uFontReg);
  pgTG[r].text(mainText1,pgTG[r].width/2,pgTG[r].height/2 + pgTextSize*0.7/2);
}

function createTextGradientInside(r, rCount){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(mainText1))*1.05;

  pgTGI[r] = createGraphics(repeatSize,pgTextSize*0.8);

  let startCinner;
  let endCinner;
  if(typeCselect == 1){
    startCinner = color('#409939');
    endCinner = color('#01232d');
  } else if(typeCselect == 2){
    startCinner = color('#c46000');
    endCinner = color('#751300');
  } else if(typeCselect == 3){
    startCinner = color('#3f8caa');
    endCinner = color('#080547')
  } else if(typeCselect == 4){
    startCinner = color('#a3a3a3');
    endCinner = color('#a3a3a3');
  } else if(typeCselect == 5){
    startCinner = color('#353535');
    endCinner = color('#353535');
  }

  let gColor = lerpColor(startCinner,endCinner,r/rCount);

  pgTGI[r].fill(gColor);
  pgTGI[r].noStroke();
  pgTGI[r].textAlign(CENTER);

  pgTGI[r].textSize(pgTextSize);

  pgTGI[r].textFont(uFontReg);
  pgTGI[r].text(mainText1,pgTGI[r].width/2,pgTGI[r].height/2 + pgTextSize*0.7/2);
}

function createText(){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(mainText1))*1.05;

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
  repeatSize = round(textWidth(mainText1))*1.05;

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

  pgGradient1 = createGraphics(windowWidth,windowHeight);

  for(var g = 0; g<windowHeight; g++){
    var lerpC = lerpColor(c1,c2,g/windowHeight);
    pgGradient1.stroke(lerpC);
    pgGradient1.strokeWeight(1);
    pgGradient1.noFill();
    pgGradient1.line(0,g,windowWidth,g);
  }
}

function createGradient2(){
  c1 = color('#F3De46');
  c2 = color('#c46000');

  pgGradient2 = createGraphics(windowWidth,windowHeight);

  for(var g = 0; g<windowHeight; g++){
    var lerpC = lerpColor(c1,c2,g/windowHeight);
    pgGradient2.stroke(lerpC);
    pgGradient2.strokeWeight(1);
    pgGradient2.noFill();
    pgGradient2.line(0,g,windowWidth,g);
  }
}

function createGradient3(){
  c1 = color('#7de1da');
  c2 = color('#1f378c');

  pgGradient3 = createGraphics(windowWidth,windowHeight);

  for(var g = 0; g<windowHeight; g++){
    var lerpC = lerpColor(c1,c2,g/windowHeight);
    pgGradient3.stroke(lerpC);
    pgGradient3.strokeWeight(1);
    pgGradient3.noFill();
    pgGradient3.line(0,g,windowWidth,g);
  }
}

function drawInds(){
  for(var a=0; a<mainText1.length; a++){
    mainInd[a] = [];
    for(var r=0; r<cascadeRows; r++){
      createTextInd(a, mainText1.charAt(a), r, cascadeRows);
    }
  }
}

function createTextInd(a, alp, r, rCount){
  textSize(pgTextSize);

  textFont(uFontReg);
  repeatSize = round(textWidth(alp));

  mainInd[a][r] = createGraphics(repeatSize,pgTextSize*0.8);

  if(typeCselect == 1){
    startC = color('#62cf5d');
    endC = color('#004b3f');
  } else if(typeCselect == 2){
    startC = color('#f3de46');
    endC = color('#c46000');
  } else if(typeCselect == 3){
    startC = color('#7de1da');
    endC = color('#1f378c');
  } else if(typeCselect == 4){
    startC = color('#ffffff');
    endC = color('#ffffff');
  } else if(typeCselect == 5){
    startC = color('#000000');
    endC = color('#000000');
  }

  let gColor = lerpColor(startC,endC,r/rCount);

  // mainInd[r].background(foreColor);
  mainInd[a][r].fill(gColor);
  mainInd[a][r].noStroke();
  mainInd[a][r].textAlign(CENTER);

  mainInd[a][r].textSize(pgTextSize);

  mainInd[a][r].textFont(uFontReg);
  mainInd[a][r].text(alp,mainInd[a][r].width/2,mainInd[a][r].height/2 + pgTextSize*0.7/2);
}
