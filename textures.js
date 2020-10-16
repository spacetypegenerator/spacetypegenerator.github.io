function drawTextures(){
  c1 = color(gradient1pick.value());
  c2 = color(gradient2pick.value());
  c3 = color(gradient3pick.value());
  c4 = color(gradient4pick.value());
  c5 = color(gradient5pick.value());
  c6 = color(gradient1pick.value());
  bkgdColor = color(backgroundPicker.value());
  foreColor = color(forePicker.value());

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
  } else if(sel.value() == 5){
    selectedFont = font6;
  } else if(sel.value() == 6){
    selectedFont = font7;
  } else if(sel.value() == 7){
    selectedFont = font8;
  }

  createText();
  createStripes();
  createGradient();
  createGradient2();
  createBlocks();
}

function createText(){
  if(sel.value() == 6 || sel.value() == 7){
    textSize(pgTextSize*0.85);
  } else {
    textSize(pgTextSize);
  }


  textFont(selectedFont);
  repeatSize = round(textWidth(mainText1)) + textureUnit*4;

  // if(repeatSize<1000){
  //   repeatSize = 1000;
  // }

  pgT = createGraphics(repeatSize,pgTextSize);
  pgT.background(c1);
  pgT.fill(foreColor);
  pgT.noStroke();
  pgT.textAlign(CENTER);

  if(sel.value() == 6 || sel.value() == 7){
    pgT.textSize(pgTextSize*0.85);
  } else {
    pgT.textSize(pgTextSize);
  }

  pgT.textFont(selectedFont);
  pgT.text(mainText1,pgT.width/2,pgT.height/2 + pgTextSize*0.7/2);
  if(outlineCheck.checked()){
    pgT.noFill();
    pgT.strokeWeight(4);
    pgT.stroke(foreColor);
    pgT.rect(-10,0,pgT.width+20,pgT.height);
  }
}

function createStripes(){
  let stripLength = 1000;

  pgStripes = createGraphics(stripLength,pgTextSize);
  pgStripes.background(foreColor);
  pgStripes.stroke(bkgdColor);
  for(var i = 0; i<=5; i++){
    let ySpace = pgStripes.height/5;
    pgStripes.strokeWeight(4);
    pgStripes.noFill();
    pgStripes.line(0,i*ySpace,pgStripes.width,i*ySpace);
  }
  if(outlineCheck.checked()){
    pgStripes.noFill();
    pgStripes.strokeWeight(4);
    pgStripes.stroke(foreColor);
    pgStripes.rect(-10,0,pgStripes.width+20,pgStripes.height);
  }
}

// vertical gradient
function createGradient(){
  textSize(pgTextSize);
  textFont(selectedFont);
  repeatSize = round(textWidth(mainText1)) + textureUnit*2;

  pgG = createGraphics(repeatSize,pgTextSize);
  for(let i=0; i<=repeatSize; i++){
    let gradientFill;
    if(i<repeatSize/5){
      gradientFill = lerpColor(c1,c2,i/(repeatSize/5));
    } else if (i<repeatSize * 2/5){
      gradientFill = lerpColor(c2,c3,(i-repeatSize/5)/(repeatSize/5));
    } else if (i<repeatSize * 3/5){
      gradientFill = lerpColor(c3,c4,(i-repeatSize*2/5)/(repeatSize/5));
    } else if (i<repeatSize * 4/5){
      gradientFill = lerpColor(c4,c5,(i-repeatSize*3/5)/(repeatSize/5));
    } else {
      gradientFill = lerpColor(c5,c6,(i-repeatSize*4/5)/(repeatSize/5));
    }

    pgG.stroke(gradientFill);
    pgG.strokeWeight(1);
    pgG.noFill();
    pgG.line(i,0,i,pgG.height);
  }
  if(outlineCheck.checked()){
    pgG.noFill();
    pgG.strokeWeight(4);
    pgG.stroke(foreColor);
    pgG.rect(-10,0,pgG.width+20,pgG.height);
  }
}

// horizontal gradient
function createGradient2(){
  textSize(pgTextSize);
  textFont(selectedFont);
  repeatSize = round(textWidth(mainText1)) + textureUnit*2;

  pgGH = createGraphics(repeatSize,pgTextSize);
  for(let i=0; i<=pgTextSize; i++){
    let gradientFill;
    if(i<pgTextSize/5){
      gradientFill = lerpColor(c1,c2,i/(pgTextSize/5));
    } else if (i<pgTextSize * 2/5){
      gradientFill = lerpColor(c2,c3,(i-pgTextSize/5)/(pgTextSize/5));
    } else if (i<pgTextSize * 3/5){
      gradientFill = lerpColor(c3,c4,(i-pgTextSize*2/5)/(pgTextSize/5));
    } else if (i<pgTextSize * 4/5){
      gradientFill = lerpColor(c4,c5,(i-pgTextSize*3/5)/(pgTextSize/5));
    } else {
      gradientFill = lerpColor(c5,c6,(i-pgTextSize*4/5)/(pgTextSize/5));
    }

    pgGH.stroke(gradientFill);
    pgGH.strokeWeight(1);
    pgGH.noFill();
    pgGH.line(0,i,pgGH.width,i);
  }
  if(outlineCheck.checked()){
    pgGH.noFill();
    pgGH.strokeWeight(4);
    pgGH.stroke(foreColor);
    pgGH.rect(-10,0,pgGH.width+20,pgGH.height);
  }
}

function createBlocks(){
  textSize(pgTextSize);
  repeatSize = round(pgTextSize*15);


  pgB = createGraphics(repeatSize,pgTextSize);

  let xSpace = repeatSize/5;

  for(let i=0; i<6; i++){
    if(i==0 || i==5){ pgB.fill(c1);}
    else if(i==1){ pgB.fill(c2);}
    else if(i==2){ pgB.fill(c3);}
    else if(i==3){ pgB.fill(c4);}
    else if(i==4){ pgB.fill(c5);}

    pgB.stroke(bkgdColor);
    pgB.strokeWeight(2);
    pgB.rect(-xSpace/2 + i * xSpace, 0, xSpace, pgB.height);
  }
}
