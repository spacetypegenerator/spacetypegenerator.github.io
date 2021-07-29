function drawTextures(){
  for(var p = 0; p<unitCount; p++){
    pgTexture(p);
  }
}

function pgTexture(p){
  var paddingFix = 0;

  if(unitFont[p] == tFont[8]){
    paddingFix = 0.05;
  } else if (unitFont[p] == tFont[10]){
    paddingFix = 0.25;
  }

  textSize(pgTextSize);
  textFont(unitFont[p]);
  repeatSize = round(textWidth(tEntry[p] + "M"));

  pgT[p] = createGraphics(repeatSize,pgTextSize * (pgPadding[p] + paddingFix));

  if(pgInvert[p]){
    if(pgBackground[p]){pgT[p].background(foreColor);}
    pgT[p].fill(bkgdColor);
  } else {
    if(pgBackground[p]){pgT[p].background(bkgdColor);}
    pgT[p].fill(foreColor);
  }

  if(pgFlip[p]){
    pgT[p].rotate(PI);
    pgT[p].translate(-pgT[p].width, -pgT[p].height);
  }

  pgT[p].noStroke();
  pgT[p].textSize(pgTextSize);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(unitFont[p]);
  pgT[p].text(tEntry[p],pgT[p].width/2,pgT[p].height/2 + pgTextSize*0.68/2);

  if(pgOutline[p]){
    pgT[p].rectMode(CENTER);
    pgT[p].noFill();
    pgT[p].strokeWeight((pgTextSize * (pgPadding[p] + paddingFix))/20);
    if(pgInvert[p]){ pgT[p].stroke(bkgdColor);} else {pgT[p].stroke(foreColor);}
    pgT[p].rect(pgT[p].width/2, pgT[p].height/2,pgT[p].width + 100,pgT[p].height);
  }
}
