function drawTextures(){
  c1 = color(c1Picker.value());
  c2 = color(c2Picker.value());
  bkgdColor = color(backgroundPicker.value());

  createText();
  createStripes();
}

function createText(){
  textFont(font1);
  textSize(pgTextSize);
  repeatSize = round(textWidth(mainText1) * 1.1);

  // if(repeatSize<1000){
  //   repeatSize = 1000;
  // }

  pgT = createGraphics(repeatSize,pgTextSize);
  pgT.background(c2);
  pgT.fill(c1);
  pgT.noStroke();
  pgT.textAlign(CENTER);

  pgT.textSize(pgTextSize);

  pgT.textFont(font1);
  pgT.text(mainText1,pgT.width/2,pgT.height/2 + pgTextSize*0.7/2);
}

function createStripes(){
  textFont(font1);
  repeatSize = round(textWidth(mainText1));

  pgStripes = createGraphics(repeatSize,pgTextSize);
  pgStripes.background(c2);
  let ySpace = pgStripes.height/5;

  pgStripes.noStroke();
  pgStripes.fill(c1);

  for(var i = 0; i<3; i++){

    pgStripes.rect(0, 2*i*ySpace, pgStripes.width, ySpace);
  }
}
