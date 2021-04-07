function drawTextures(){
  for(var p = 0; p<widgetCount; p++){
    pgTexture(p);
    pgTextureInside(p);
  }

  for(var p = 0; p<widgetCount; p++){
    pgTind[p] = []
    drawIndividuals(p);
  }
}

function drawIndividuals(p){
  for(var c = 0; c<textEntry[p].length; c++){
    pgTextureInd(p,c);
  }
}

function pgTexture(p){
  let fSelect = fontSelect[p];
  textSize(pgTextSize);
  textFont(tFont[fSelect]);
  repeatSize = round(textWidth(textEntry[p])) * 1.05;

  if(repeatSize>8000){
    repeatSize = 8000;
  }

  pgT[p] = createGraphics(repeatSize,pgTextSize * 1.15);

  if(bColorOn[p]){
    pgT[p].background(bColor[p]);
  }

  pgT[p].fill(tColor[p]);
  pgT[p].noStroke();
  pgT[p].textSize(pgTextSize);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(tFont[fSelect]);
  pgT[p].text(textEntry[p],pgT[p].width/2,pgT[p].height/2 + pgTextSize*0.7/2);
}

function pgTextureInside(p){
  let fSelect = fontSelect[p];

  textSize(pgTextSize);
  textFont(tFont[fSelect]);
  repeatSize = round(textWidth(textEntry[p])) * 1.05;

  if(repeatSize>8000){
    repeatSize = 8000;
  }

  pgTI[p] = createGraphics(repeatSize,pgTextSize * 1.15);

  if(bColorOn[p]){
    pgTI[p].background(lerpColor(bkgdColor,color(bColor[p]),0.5));
  } else {
    pgTI[p].fill(lerpColor(bkgdColor,color(tColor[p]),0.5));
    pgTI[p].noStroke();
    pgTI[p].textSize(pgTextSize);
    pgTI[p].textAlign(CENTER);
    pgTI[p].textFont(tFont[fSelect]);
    pgTI[p].text(textEntry[p],pgTI[p].width/2,pgTI[p].height/2 + pgTextSize*0.7/2);
  }
}

function pgTextureInd(p, c){
  let fSelect = fontSelect[p];
  var thisLet = textEntry[p].charAt(c);

  var c1, c2, c3;

  if(bColorOn[p]){
    c1 = lerpColor(color(bColor[p]),color(tColor[p]),0.5);
    c2 = lerpColor(color(bColor[p]),color(tColor[p]),0.2);
    c3 = color(tColor[p]);
  } else {
    c1 = lerpColor(bkgdColor,color(tColor[p]),0.5);
    c2 = lerpColor(bkgdColor,color(tColor[p]),0.2);
    c3 = color(tColor[p]);
  }

  textSize(pgTextSize);
  textFont(tFont[fSelect]);
  repeatSize = round(textWidth(thisLet));

  pgTind[p][c] = createGraphics(repeatSize + stepC,pgTextSize + stepC);

  pgTind[p][c].noStroke();
  pgTind[p][c].textSize(pgTextSize);
  pgTind[p][c].textAlign(LEFT);
  pgTind[p][c].textFont(tFont[fSelect]);

  for(var t = 0; t<stepC; t++){
    pgTind[p][c].fill(c1);
    pgTind[p][c].text(thisLet,stepC - t, pgTind[p][c].height - t - pgTextSize*0.7/3);
    pgTind[p][c].fill(c2);
    pgTind[p][c].text(thisLet,stepC - t - 1, pgTind[p][c].height - t - pgTextSize*0.7/3);
    if(t==stepC-1){
      pgTind[p][c].fill(c3);
      pgTind[p][c].text(thisLet,stepC - t, pgTind[p][c].height - t - pgTextSize*0.7/3);
    }
  }

}
