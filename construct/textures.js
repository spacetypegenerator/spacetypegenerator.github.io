//////////////////////////////////////////////
/////////////////////////////       TEXT
//////////////////////////////////////////////

function pgTexture1(inp, typeP, p, sH){
  textSize(pgTextSize);
  textFont(tFont[typeP]);
  var repeatSize = round(textWidth(inp + " "));

  pgT[p] = createGraphics(repeatSize, pgTextSize * 1.0);

  // pgT[p].background(bkgdColor);

  pgT[p].fill(foreColor);
  pgT[p].noStroke();
  pgT[p].textSize(pgTextSize);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(tFont[typeP]);
  pgT[p].text(inp, pgT[p].width/2, pgT[p].height/2 + pgTextSize*0.7/2);

  heightRatio[p] = pgT[p].width * sH/pgT[p].height;
}

function pgImage(p, sH){
  var r = round(random(10));

  pgT[p] = pImg[r];

  heightRatio[p] = pgT[p].width * sH/pgT[p].height;
}

function pSlash(p, sH){
  var rSel = round(random(2));
  var pWidth = random(50, 350);

  pgT[p] = createGraphics(pWidth, sH);

  pgT[p].stroke(foreColor);
  pgT[p].strokeWeight(1);
  pgT[p].noFill();

  if(rSel == 0){
    pgT[p].line(5, 5, pgT[p].width - 5, pgT[p].height - 5);
  } else if(rSel == 1){
    pgT[p].line(5, 5, pgT[p].width - 5, pgT[p].height - 5);
    pgT[p].rect(5, 5, pgT[p].width - 10, pgT[p].height - 10);
  } else {
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 - 10, pgT[p].width/2 + 10, pgT[p].height/2 + 10);
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 + 10, pgT[p].width/2 + 10, pgT[p].height/2 - 10);
    pgT[p].rect(5, 5, pgT[p].width - 10, pgT[p].height - 10);
  }

  heightRatio[p] = pgT[p].width * sH/pgT[p].height;
}

function pRound(p, sH){
  var rSel = round(random(2));
  var pWidth = random(sH/2, sH * 2);

  pgT[p] = createGraphics(pWidth, sH);

  if(rSel == 0){
    pgT[p].stroke(foreColor);
    pgT[p].strokeWeight(1);
    pgT[p].noFill();

    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  } else if(rSel == 1){
    pgT[p].fill(foreColor);
    pgT[p].noStroke();

    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  } else {
    pgT[p].stroke(foreColor);
    pgT[p].strokeWeight(1);
    pgT[p].noFill();

    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 - 10, pgT[p].width/2 + 10, pgT[p].height/2 + 10);
    pgT[p].line(pgT[p].width/2 - 10, pgT[p].height/2 + 10, pgT[p].width/2 + 10, pgT[p].height/2 - 10);
    pgT[p].ellipse(pgT[p].width/2, pgT[p].height/2, pgT[p].width - 10, pgT[p].height - 10);
  }

  heightRatio[p] = pgT[p].width * sH/pgT[p].height;
}

function pBlank(p, sH){
  var pWidth = random(50, 350);

  pgT[p] = createGraphics(pWidth, sH);

  heightRatio[p] = pgT[p].width * sH/pgT[p].height;
}

function pGradientH(){
  var steps = 512;

  pGradH = createGraphics(1024, 512);

  for(var i = 0; i<steps; i++){
    var gradientColor;
    if(i<steps* 1/5){
      gradientColor = lerpColor(colorA[0], colorA[1], i/(steps/5));
    } else if(i<steps * 2/5){
      gradientColor = lerpColor(colorA[1], colorA[2], (i - steps/5)/(steps/5));
    } else if(i<steps * 3/5){
      gradientColor = lerpColor(colorA[2], colorA[3], (i - steps*2/5)/(steps/5));
    } else if(i<steps * 4/5){
      gradientColor = lerpColor(colorA[3], colorA[4], (i - steps*3/5)/(steps/5));
    } else {
      gradientColor = lerpColor(colorA[4], bkgdColor, (i - steps*4/5)/(steps/5));
    }
    pGradH.stroke(gradientColor);
    pGradH.strokeWeight(2);
    pGradH.line(i*2, 0, i*2, pGradH.height);
  }
}

function pGradientV(){
  var steps = 256;

  pGradV = createGraphics(1024, 512);

  for(var i = 0; i<steps; i++){
    var  gradientColor = lerpColor(colorA[0], colorA[4], i/steps);

    pGradV.stroke(gradientColor);
    pGradV.strokeWeight(2);
    pGradV.line(0, i*2, pGradV.width, i*2);
  }
}

function pGradientCH(){
  var steps = 512;

  pGradCH = createGraphics(1024, 512);

  for(var i = 0; i<steps; i++){
    var gradientColor;
    if(i<steps/2){
      gradientColor = lerpColor(bkgdColor, colorA[1], i/(steps/2));
    } else {
      gradientColor = lerpColor(colorA[1], bkgdColor, (i - steps/2)/(steps/2));

    }
    pGradCH.stroke(gradientColor);
    pGradCH.strokeWeight(2);
    pGradCH.line(i*2, 0, i*2, pGradCH.height);
  }
}
