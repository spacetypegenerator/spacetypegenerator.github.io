//////////////////////////////////////////////
/////////////////////////////       TEXT
//////////////////////////////////////////////

function pgTexture1(inp, p){
  // var pHorz = 100;
  // var pVer = 200;
  var pHorz = pgTextSize * 2/3;
  var pVer = pgTextSize * 4/3;

  textSize(pgTextSize);
  textFont(tFont[0]);
  repeatSize = round(textWidth(inp)) * 1.1;

  pgT[p] = createGraphics(repeatSize + pVer*2,pgTextSize * 0.8 + pHorz*2);

  // pgT[p].background(0,0,255);

  // pgT[p].stroke(foreColor); pgT[p].strokeWeight(4);

  pgT[p].fill(typeColor);
  pgT[p].noStroke();
  pgT[p].textSize(pgTextSize);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(tFont[0]);
  pgT[p].text(inp.toUpperCase(), pgT[p].width/2, pgT[p].height/2 + pgTextSize*0.7/2);
}

function pgTexture2(inp, p){
  // var pHorz = 100;
  // var pVer = 200;
  var pHorz = pgTextSize * 2/3;
  var pVer = pgTextSize * 4/3;

  textSize(pgTextSize * 0.95);
  textFont(tFont[1]);
  repeatSize = round(textWidth(inp)) * 1.1;

  pgT[p] = createGraphics(repeatSize + pVer*2,pgTextSize * 0.8 + pHorz*2);

  // pgT[p].background(0,0,255);

  // pgT[p].stroke(foreColor); pgT[p].strokeWeight(4);

  pgT[p].fill(typeColor);
  pgT[p].noStroke();
  pgT[p].textSize(pgTextSize * 0.95);
  pgT[p].textAlign(CENTER);
  pgT[p].textFont(tFont[1]);
  pgT[p].text(inp.toUpperCase(), pgT[p].width/2, pgT[p].height/2 + pgTextSize*0.7/2);
}

//////////////////////////////////////////////
/////////////////////////////       Random Color
//////////////////////////////////////////////

function grabRandomColor(){
  var rs = random(100);
  if(rs<25){
    return color1;
  } else if(rs<50){
    return color2;
  } else if(rs<75){
    return color3;
  } else {
    return foreColor;
  }
}

//////////////////////////////////////////////
/////////////////////////////       STARS
//////////////////////////////////////////////

function pgG_star1(g){  // soft sun crest
  var thisR = 200;
  var thisIter = 28;
  var thisAng = 2*PI/thisIter;

  var rColor1 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisR*1.1, thisR*1.1);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].stroke(rColor1);
  pg_grfx[g].fill(bkgdColor);
  pg_grfx[g].beginShape();
    pg_grfx[g].curveVertex(thisR * 0.55,0);
    for(var p = 0; p <= thisIter; p++){
      var nowRadius = (thisR - (p%2)*thisR/4)/2;

      var x = cos(p*thisAng) * nowRadius;
      var y = sin(p*thisAng) * nowRadius;

      pg_grfx[g].curveVertex(x,y);
    }
    pg_grfx[g].curveVertex(thisR/2,0);
  pg_grfx[g].endShape();

  rColor1.setAlpha(255);
}

function pgG_star2(g){  // hard eight point
  var thisR = 300;
  var thisIter = 16;
  var thisAng = 2*PI/thisIter;

  pg_grfx[g] = createGraphics(thisR*1.8, thisR*1.8);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  var rColor2 = grabRandomColor();

  // pg_grfx[g].stroke(rColor2);
  // pg_grfx[g].strokeWeight(2);
  pg_grfx[g].noStroke();
  pg_grfx[g].fill(rColor2);
  pg_grfx[g].beginShape();
    pg_grfx[g].curveVertex(thisR * 0.9, 0);
    for(var p = 0; p<=thisIter; p++){
      var thisRadius = (thisR - (p%2)*thisR*0.7)/2;

      if(p%4==0){
        thisRadius = thisR * 0.9;
      }

      var x = cos(p*thisAng) * thisRadius;
      var y = sin(p*thisAng) * thisRadius;

      pg_grfx[g].curveVertex(x,y);
    }
    pg_grfx[g].curveVertex(thisR * 0.9,0);
  pg_grfx[g].endShape();

  rColor2.setAlpha(255);
}

function pgG_star3(g){  // 9 lines
  var thisR = 150;
  var thisIter = 18;
  var thisAng = 2*PI/thisIter;

  var rColor3 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisR*2, thisR*2);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].stroke(rColor3);
  pg_grfx[g].strokeWeight(1);
  pg_grfx[g].noFill();
  for(var p = 0; p<thisIter; p++){
    var x = cos(p*thisAng) * thisR;
    var y = sin(p*thisAng) * thisR;

    pg_grfx[g].line(0, 0, x, y);
  }

  rColor3.setAlpha(255);
}

function pgG_star4(g){  // soft sun crest
  var thisR = 300;
  var thisIter = 28;
  var thisAng = 2*PI/thisIter;

  var rColor4 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisR*1.1, thisR*1.1);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].stroke(rColor4);
  pg_grfx[g].fill(bkgdColor);
  pg_grfx[g].beginShape();
    pg_grfx[g].curveVertex(thisR * 0.55,0);
    for(var p = 0; p <= thisIter; p++){
      var nowRadius = (thisR - (p%2)*thisR/16)/2;

      var x = cos(p*thisAng) * nowRadius;
      var y = sin(p*thisAng) * nowRadius;

      pg_grfx[g].curveVertex(x,y);
    }
    pg_grfx[g].curveVertex(thisR/2,0);
  pg_grfx[g].endShape();

  rColor4.setAlpha(255);
}
//////////////////////////////////////////////
/////////////////////////////       SPRAYS
//////////////////////////////////////////////

function pgG_spray1(g){
  var thisSize = 1200;
  var thisIter = 1000;

  var rColor5 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].fill(rColor5);
  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var a = random(0,2*PI);
    var dist = random(-thisSize/4, thisSize/2);

    var x = cos(a) * dist;
    var y = sin(a) * dist;

    pg_grfx[g].ellipse(x,y, 2, 2);
  }

  rColor5.setAlpha(255);
}

function pgG_spray2(g){
  var thisSize = 800;
  var thisIter = 1500;

  var rColor6 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].fill(rColor6);
  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var a = random(0,2*PI);
    var dist = random(-thisSize/4, thisSize/2);

    var x = cos(a) * dist;
    var y = sin(a) * dist;

    pg_grfx[g].ellipse(x,y, 2, 2);
  }

  for(var i = 0; i<thisIter/2; i++){
    var a = random(0,2*PI);
    var dist = random(-thisSize/8, thisSize/4);

    var x = cos(a) * dist;
    var y = sin(a) * dist;

    pg_grfx[g].ellipse(x,y, 2, 2);
  }

  rColor6.setAlpha(255);
}

//////////////////////////////////////////////
/////////////////////////////       GRADIENTS
//////////////////////////////////////////////

function pgG_gradient1(g){
  var thisSize = round(random(800,1400));
  var thisIter = thisSize/10;

  var rColor7 = grabRandomColor();
  rColor7.setAlpha(1);

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var nowR = map(i, 0, thisIter, 0, thisSize*0.9);

    pg_grfx[g].fill(rColor7);
    pg_grfx[g].ellipse(0,0, nowR, nowR);
  }

  rColor7.setAlpha(255);
}

function pgG_gradient2(g){
  var thisSize = round(random(250,600));
  var thisIter = round(thisSize * 0.25);

  var rColor8 = bkgdColor;
  rColor8.setAlpha(50);

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var nowR = map(i, 0, thisIter, 0, thisSize*0.9);

    pg_grfx[g].fill(rColor8);
    pg_grfx[g].ellipse(0,0, nowR, nowR);
  }

  rColor8.setAlpha(255);
}

function pgG_gradient3(g){
  var thisSize = 350;
  var thisIter = 150;

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  var rColor9 = grabRandomColor();
  rColor9.setAlpha(1);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var nowR = map(i, 0, thisIter, 0, thisSize*0.9);

    pg_grfx[g].fill(rColor9);
    pg_grfx[g].ellipse(0,0, nowR, nowR);
  }

  rColor9.setAlpha(255);
}

function pgG_gradient4(g){
  var thisSize = round(random(400,800));
  var thisIter = round(thisSize * 0.25);

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  var rColor12 = bkgdColor;
  var addColor = grabRandomColor();
  rColor12.setAlpha(15);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var nowR = map(i, 0, thisIter, thisSize*0.9, 0);
    if(i==0){
      pg_grfx[g].fill(addColor);
    } else {
      pg_grfx[g].fill(rColor12);
    }
    pg_grfx[g].ellipse(0,0, nowR, nowR);
  }

  rColor12.setAlpha(255);
}

function pgG_gradient5(g){
  var thisSize = round(random(800,1400));
  var thisIter = thisSize/10;

  var rColor13 = grabRandomColor();
  rColor13.setAlpha(1);

  pg_grfx[g] = createGraphics(thisSize, thisSize);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noStroke();

  for(var i = 0; i<thisIter; i++){
    var nowR = map(i, 0, thisIter, 0, thisSize*0.9);

    pg_grfx[g].fill(rColor13);
    pg_grfx[g].ellipse(0,0, nowR, nowR);
  }

  rColor13.setAlpha(255);
}

//////////////////////////////////////////////
/////////////////////////////       SCRIBBLE
//////////////////////////////////////////////

function pgG_scribble1(g){
  var thisSize = 2000;
  var thisIter = 12;

  var rColor10 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisSize * 1.5, thisSize * 1.5);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noFill();
  pg_grfx[g].stroke(rColor10);
  pg_grfx[g].strokeWeight(0.5);

  pg_grfx[g].beginShape();
  pg_grfx[g].vertex(thisSize/4,0);

  var pX = thisSize/4;
  var pY = 0;
  var pXH = 0;
  var pYH = thisSize/8;

  var currentAng = 0;
  for(var i = 0; i<thisIter; i++){
    var pAng = currentAng;
    currentAng += random(PI/2, PI * 2);
    var nowR = random(thisSize/8, thisSize/2);
    var nowH = random(thisSize/16, thisSize/4);

    var x = cos(currentAng) * nowR;
    var y = sin(currentAng) * nowR;
    var xH = cos(currentAng + PI/2) * nowH;
    var yH = sin(currentAng + PI/2) * nowH;

    pg_grfx[g].bezierVertex(pX + pXH, pY + pYH, x - xH, y - yH, x, y);
    pX = x;
    pY = y;
    pXH = xH;
    pYH = yH;
  }
  pg_grfx[g].endShape();

  rColor10.setAlpha(255);
}

function pgG_scribble2(g){
  var thisSize = round(random(150,400));
  var thisIter = 20;

  var rColor11 = grabRandomColor();

  pg_grfx[g] = createGraphics(thisSize * 1.5, thisSize * 1.5);

  pg_grfx[g].translate(pg_grfx[g].width/2, pg_grfx[g].height/2);

  pg_grfx[g].noFill();
  pg_grfx[g].stroke(rColor11);
  pg_grfx[g].strokeWeight(0.5);

  pg_grfx[g].beginShape();
  pg_grfx[g].vertex(thisSize/4,0);

  var pX = thisSize/4;
  var pY = 0;
  var pXH = 0;
  var pYH = thisSize/8;

  var currentAng = 0;
  for(var i = 0; i<thisIter; i++){
    var pAng = currentAng;
    currentAng += PI/2 + random(-1, 1);
    var nowR = thisSize/2 - random(thisSize/4);
    var nowH = random(thisSize/3, thisSize/4);

    var x = cos(currentAng) * nowR;
    var y = sin(currentAng) * nowR;
    var xH = cos(currentAng + PI/2) * nowH;
    var yH = sin(currentAng + PI/2) * nowH;

    pg_grfx[g].bezierVertex(pX + pXH, pY + pYH, x - xH, y - yH, x, y);
    pX = x;
    pY = y;
    pXH = xH;
    pYH = yH;
  }
  pg_grfx[g].endShape();

  rColor11.setAlpha(255);
}
