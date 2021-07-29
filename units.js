function unitStrip(){
  var scrollSpeed;
  if(unitCycle[0]){
    scrollSpeed = 5;
  } else {
    scrollSpeed = 0;
  }

  push();
  translate(0,0,1);
  translate(0, stripPosition);
  rotateZ(stripRotate);
    var thisStripH = uStripH * stripHeight;
    var stripWidth = (uRadius * 2) * stripLength;
    var thisSec = stripWidth/unitRes;
    var heightRatio = pgT[0].width * thisStripH/pgT[0].height;
    var uOffset;
    if(unitRepeat[0]){
      uOffset = -stripWidth/2 - heightRatio/2 + heightRatio*20;
    } else {
      uOffset = -stripWidth/2 - heightRatio/2 + heightRatio;
    }

    var yShearLeft = sin(stripShear + PI) * stripWidth;
    var yShearRight = sin(stripShear) * stripWidth;

    texture(pgT[0]);
    beginShape(TRIANGLE_STRIP);

    for(var j=0; j<=unitRes; j++){
      // var shearLine = map(j,0,unitRes,-uRadius * shr, uRadius * shr);
      var shearLine = map(j, 0, unitRes, yShearLeft, yShearRight);

      var x = -stripWidth/2 + j*thisSec;
      var yTop = shearLine - thisStripH/2;
      var yBot = shearLine + thisStripH/2;

      var u;
      if(unitRepeat[0]){
        u = map((j*thisSec + uOffset + frameCount*scrollSpeed)%heightRatio,0,heightRatio,0,1);
      } else {
        u = map(j*thisSec + uOffset + frameCount*scrollSpeed,0,heightRatio,0,1)
      }

      vertex(x, yTop, u, 0);
      vertex(x, yBot, u, 1);

      if((j*thisSec + uOffset + frameCount*scrollSpeed)%heightRatio > heightRatio - thisSec && unitRepeat[0]){
        vertex(x, yTop, 0, 0);
        vertex(x, yBot, 0, 1);
      }
    }
    endShape();
  pop();
}

function unitOrbit(){
  var scrollSpeed;
  if(unitCycle[1]){
    scrollSpeed = 5;
  } else {
    scrollSpeed = 0;
  }

  var thisRadius = uRadius * orbitRadius;
  var thisStripH = uStripH * orbitHeight;
  var thisOffset = PI/2 - orbitCirc/2;
  var heightRatio = pgT[1].width * thisStripH/pgT[1].height;

  var uOffset = -uRadius * orbitCirc/2 - heightRatio/2 + heightRatio;
  if(unitRepeat[1]){
    uOffset = -uRadius * orbitCirc/2 - heightRatio/2 + heightRatio*20;
  }

  uRingAngle = orbitCirc/unitRes;
  uRingSec = orbitCirc * thisRadius/unitRes

  push();
  rotateZ(PI);
  rotateX(orbitXrot);
  rotateZ(orbitZrot);

  texture(pgT[1]);
  beginShape(TRIANGLE_STRIP);
  for(var j=0; j<=unitRes; j++){
    var x = cos(thisOffset + j*uRingAngle) * (thisRadius);
    var z = sin(thisOffset + j*uRingAngle) * (thisRadius);
    var yTop = -thisStripH/2;
    var yBot = thisStripH/2;

    var u = map(j*uRingSec + uOffset + frameCount * scrollSpeed,0,heightRatio,0,1);;
    if(unitRepeat[1]){
      u = map((j*uRingSec + uOffset + frameCount * scrollSpeed)%heightRatio,0,heightRatio,0,1);
    }

    vertex(x, yTop, z, u, 1);
    vertex(x, yBot, z, u, 0);

    if((j*uRingSec + uOffset + frameCount * scrollSpeed)%heightRatio > heightRatio - uRingSec && unitRepeat[1]){
      vertex(x, yTop, z, 0, 1);
      vertex(x, yBot, z, 0, 0);
    }
  }
  endShape();
  pop();
}

function unitRing(){
  var scrollSpeed;
  if(unitCycle[3]){
    scrollSpeed = 5;
  } else {
    scrollSpeed = 0;
  }

  var thisStripH = uStripH * ringHeight;
  var thisOffset = -PI/2 - ringCirc/2;
  var heightRatio = pgT[3].width * thisStripH/pgT[3].height;
  var thisRadius = uRadius * ringRadius;

  var uOffset = -thisRadius * ringCirc/2 - heightRatio/2 + heightRatio;
  if(unitRepeat[3]){
    uOffset = -thisRadius * ringCirc/2 - heightRatio/2 + heightRatio*20;
  }

  uRingAngle = ringCirc/unitRes;
  uRingSec = ringCirc*thisRadius/unitRes;

  push();
  rotateZ(ringOffset);

  texture(pgT[3]);
  beginShape(TRIANGLE_STRIP);
  for(var j=0; j<=unitRes; j++){
    var xTop = cos(thisOffset + j*uRingAngle) * (thisRadius);
    var yTop = sin(thisOffset + j*uRingAngle) * (thisRadius);
    var xBot = cos(thisOffset + j*uRingAngle) * (thisRadius - thisStripH);
    var yBot = sin(thisOffset + j*uRingAngle) * (thisRadius - thisStripH);

    var u = map(j*uRingSec + uOffset + frameCount * scrollSpeed, 0, heightRatio, 0, 1);
    if(unitRepeat[3]){
      u = map((j*uRingSec + uOffset + frameCount * scrollSpeed)%heightRatio, 0, heightRatio, 0, 1);
    }

    vertex(xTop, yTop, u, 0);
    vertex(xBot, yBot, u, 1);

    if((j*uRingSec + uOffset + frameCount * scrollSpeed)%heightRatio > heightRatio - uRingSec  && unitRepeat[3]){
      vertex(xTop, yTop, 0, 0);
      vertex(xBot, yBot, 0, 1);
    }
  }
  endShape();
  pop();
}

function unitTunnel(){
  var angleCut = tunnelCirc/2;
  var thisOffset = -PI/2 - angleCut;
  var newStripH = (uRadius - (tunnelInner*uRadius))/(tunnelCount-1);
  var heightRatio = pgT[2].width * newStripH/pgT[2].height;

  uRingAngle = tunnelCirc/unitRes;
  uRingSec = tunnelCirc*uRadius/unitRes;

  push();
  translate(0,0,-1);
  rotateZ(tunnelOffset);

  for(var k = 0; k<tunnelCount; k++){
    var scrollSpeed = 0;
    if(unitCycle[2]){
      scrollSpeed = rSpeedGate[k];
    }

    var thisK = (k + frameCount/uZoomSpeed)%tunnelCount;
    var thisStripH = newStripH;
    var thisRadius = map(thisK, 0, tunnelCount, uRadius + thisStripH, (tunnelInner*uRadius));
    var thisSec = tunnelCirc*thisRadius/unitRes;
    // var uOffset = -thisRadius * tunnelCirc/2 + -heightRatio/2 + heightRatio*20;

    var uOffset = -thisRadius * tunnelCirc/2 - heightRatio/2 + heightRatio;
    if(unitRepeat[2]){
      uOffset = -thisRadius * tunnelCirc/2 - heightRatio/2 + heightRatio*20;
    }

    var stripTop = 0;
    var stripBot = -thisStripH;

    if(thisK>tunnelCount-1){
      thisStripH = map(thisK,tunnelCount-1,tunnelCount,newStripH,0);
      stripTop = 0;
      stripBot = -thisStripH;
    }
    if(thisK < 1){
      thisStripH = map(thisK,0,1,0,newStripH);
      stripBot = -newStripH;
      stripTop = -newStripH + thisStripH;
    }

    texture(pgT[2]);
    beginShape(TRIANGLE_STRIP);
    for(var j=0; j<=unitRes; j++){

      let xTop = cos(thisOffset + j*uRingAngle) * (thisRadius + stripTop);
      let yTop = sin(thisOffset + j*uRingAngle) * (thisRadius + stripTop);
      let xBot = cos(thisOffset + j*uRingAngle) * (thisRadius + stripBot);
      let yBot = sin(thisOffset + j*uRingAngle) * (thisRadius + stripBot);

      var u;
      if(unitRepeat[2]){
        u = map((j*thisSec + uOffset + frameCount * scrollSpeed)%heightRatio,0,heightRatio,0,1);
      } else {
        u = map(j*thisSec + uOffset + frameCount * scrollSpeed,0,heightRatio,0,1);
      }

      vertex(xTop, yTop, u, 0);
      vertex(xBot, yBot, u, 1);

      if((j*thisSec + uOffset + frameCount * scrollSpeed)%heightRatio > heightRatio - thisSec && unitRepeat[2]){
        vertex(xTop, yTop, 0, 0);
        vertex(xBot, yBot, 0, 1);
      }
    }
    endShape();
  }
  pop();
}

function unitGate(){
  var angleCut = gateCirc/2;
  var thisOffset = -PI/2 - angleCut;
  var newStripH = (uRadius - (gateInner*uRadius))/(gateCount-1);
  var heightRatio = pgT[4].width * newStripH/pgT[4].height;

  uRingAngle = gateCirc/unitRes;
  uRingSec = gateCirc * uRadius/unitRes;

  var gatesFullHeight;
  if(gateHalf){
    gatesFullHeight = stretchRes * uRingSec - uRadius/2;
  } else {
    gatesFullHeight = stretchRes * uRingSec;
  }
  push();
  if(gateFlip){
    rotateZ(PI);
  }
  translate(0,-gatesFullHeight/2,-1);

  rotateZ(gatesOffset);


  for(var k = 0; k<gateCount; k++){
    var scrollSpeed = 0;
    if(unitCycle[4]){
      scrollSpeed = rSpeedGate[k];
    }

    var thisK = (k + frameCount/uZoomSpeed)%gateCount;
    var thisStripH = newStripH;
    var thisRadius = map(thisK, 0, gateCount, uRadius + newStripH, (gateInner*uRadius));
    var thisSec = gateCirc*thisRadius/unitRes;
    var uOffset = -thisRadius * gateCirc/2 + -heightRatio/2 + heightRatio*20;

    var stripTop = 0;
    var stripBot = -thisStripH;

    if(thisK>gateCount-1){
      thisStripH = map(thisK,gateCount-1,gateCount,newStripH,0);
      stripTop = 0;
      stripBot = -thisStripH;
    }
    if(thisK < 1){
      thisStripH = map(thisK,0,1,0,newStripH);
      stripBot = -newStripH;
      stripTop = -newStripH + thisStripH;
    }

    var newStretchSec = uRingSec;
    var fullStretch = stretchRes * newStretchSec;

    var thisStretchRes = stretchRes*2;
    var section1 = stretchRes;
    var section2 = stretchRes + unitRes/2;
    var section3 = 2*stretchRes + unitRes/2;

    var runTime;
    if(gateHalf){
      runTime = unitRes/2 + (stretchRes*2);
    } else {
      runTime = unitRes + (stretchRes*2);
    }

    texture(pgT[4]);
    beginShape(TRIANGLE_STRIP);
    var culmDist = 0; let thisDist;
    for(var j=0; j<= runTime; j++){
      let xTop, yTop, xBot, yBot;

      if(j < section1){
        xTop = -(thisRadius + stripTop);
        yTop = fullStretch - j*newStretchSec;
        xBot = -(thisRadius + stripBot);
        yBot = fullStretch - j*newStretchSec;
        thisDist = newStretchSec;
      } else if(j < section2){
        xTop = cos(PI + (j-section1)*uRingAngle) * (thisRadius + stripTop);
        yTop = sin(PI + (j-section1)*uRingAngle) * (thisRadius + stripTop);
        xBot = cos(PI + (j-section1)*uRingAngle) * (thisRadius + stripBot);
        yBot = sin(PI + (j-section1)*uRingAngle) * (thisRadius + stripBot);
        thisDist = thisSec;
      } else if(j < section3){
        xTop = (thisRadius + stripTop);
        yTop = (j-section2)*newStretchSec;
        xBot = (thisRadius + stripBot);
        yBot = (j-section2)*newStretchSec;
        thisDist = newStretchSec;
      } else {
        xTop = cos((j-section3)*uRingAngle) * (thisRadius + stripTop);
        yTop = sin((j-section3)*uRingAngle) * (thisRadius + stripTop) + fullStretch;
        xBot = cos((j-section3)*uRingAngle) * (thisRadius + stripBot);
        yBot = sin((j-section3)*uRingAngle) * (thisRadius + stripBot) + fullStretch;
        thisDist = thisSec;
      }
      var u = map((culmDist + frameCount * scrollSpeed)%heightRatio,0,heightRatio,0,1);

      vertex(xTop, yTop, u, 0);
      vertex(xBot, yBot, u, 1);

      if((culmDist + frameCount * scrollSpeed)%heightRatio > heightRatio - thisDist){
        vertex(xTop, yTop, 0, 0);
        vertex(xBot, yBot, 0, 1);
      }

      culmDist += thisDist;
    }
    endShape();
  }
  pop();
}

function unitSpread() {
  var thisRadius = uRadius * spreadRadius;
  var eLength = tEntry[5].length;
  var eAngle = 2*PI/eLength;
  var rotateSpeed = 0;
  if(unitCycle[5]){
    rotateSpeed = -0.01
  }

  noStroke();
  if(pgInvert[5]){ fill(bkgdColor) } else { fill(foreColor) };
  textFont(unitFont[5]);
  textSize(spreadFontSize);
  textAlign(CENTER);

  push();
    // rotateZ(frameCount*rotateSpeed);
    for(var j = 0; j<eLength; j++){
      var x = cos(j*eAngle + PI + frameCount*rotateSpeed) * thisRadius * spreadXPinch;
      var y = sin(j*eAngle + PI + frameCount*rotateSpeed) * thisRadius * spreadYPinch;
      push();
        translate(x,y);
        if(spreadTangent){
          rotateZ(j*eAngle - PI/2 + frameCount*rotateSpeed);
        } else if(spreadRadial){
          rotateZ(j*eAngle + PI + frameCount*rotateSpeed);
        }
        translate(0,spreadFontSize*0.68/2);
        text(tEntry[5].charAt(j),0,0);
      pop();
    }
  pop();
}

function unitTrack() {
  if(unitCycle[6]){
    scrollSpeed = 5;
  } else {
    scrollSpeed = 0;
  }

  var thisStripH = uStripH * trackStripHeight;
  var trackInflu = uRadius;
  var heightRatio = pgT[6].width * thisStripH/pgT[6].height;
  var thisResCount = unitRes*2;

  var top = uRadius * trackHeight;
  var side = uRadius * trackWidth;

  var topInflu = top * trackHeightPinch;
  var sideInflu = side * trackWidthPinch;

  var culmDist = 0;
  texture(pgT[6]);
  beginShape(TRIANGLE_STRIP);
  for(var j=0; j<=thisResCount; j++){
    let x, y, px, py, xTop, yTop, xBot, yBot, a;
    let u, v;

    if(j<=thisResCount/4){
      let t = j/(thisResCount/4);
      let pt = (j-1)/(thisResCount/4);

      x = bezierPoint(0, -sideInflu, -side, -side,  t);
      y = bezierPoint(top, top, topInflu, 0, t);
      px = bezierPoint(0, -sideInflu, -side, -side,  pt);
      py = bezierPoint(top, top, topInflu, 0, pt);
      let tx = bezierTangent(0, -sideInflu, -side, -side,  t);
      let ty = bezierTangent(top, top, topInflu, 0, t);
      a = atan2(ty,tx) + PI/2;
    } else if(j<=thisResCount/2){
      let t = (j-thisResCount/4)/(thisResCount/4);
      let pt = (j-1-thisResCount/4)/(thisResCount/4);

      x = bezierPoint(-side, -side, -sideInflu, 0,  t);
      y = bezierPoint(0, -topInflu, -top, -top, t);
      px = bezierPoint(-side, -side, -sideInflu, 0,  pt);
      py = bezierPoint(0, -topInflu, -top, -top, pt);
      let tx = bezierTangent(-side, -side, -sideInflu, 0,  t);
      let ty = bezierTangent(0, -topInflu, -top, -top, t);
      a = atan2(ty,tx) + PI/2;
    } else if(j<=thisResCount*3/4){
      let t = (j-thisResCount/2)/(thisResCount/4);
      let pt = (j-1-thisResCount/2)/(thisResCount/4);

      x = bezierPoint(0,sideInflu,side,side,  t);
      y = bezierPoint(-top,-top,-topInflu,0, t);
      px = bezierPoint(0,sideInflu,side,side,  pt);
      py = bezierPoint(-top,-top,-topInflu,0, pt);
      let tx = bezierTangent(0,sideInflu,side,side,  t);
      let ty = bezierTangent(-top,-top,-topInflu,0, t);
      a = atan2(ty,tx) + PI/2;
    } else {
      let t = (j-thisResCount*3/4)/(thisResCount/4);
      let pt = (j-1-thisResCount*3/4)/(thisResCount/4);

      x = bezierPoint(side, side, sideInflu, 0,  t);
      y = bezierPoint(0, topInflu, top, top, t);
      px = bezierPoint(side, side, sideInflu, 0,  pt);
      py = bezierPoint(0, topInflu, top, top, pt);
      let tx = bezierTangent(side, side, sideInflu, 0,  t);
      let ty = bezierTangent(0, topInflu, top, top, t);
      a = atan2(ty,tx) + PI/2;
    }

    var thisDist = dist(x,y,px,py);
    u = map((culmDist + frameCount*scrollSpeed)%heightRatio, 0, heightRatio, 0, 1);

    xTop = x + cos(a) * thisStripH/2;
    yTop = y + sin(a) * thisStripH/2;

    xBot = x + cos(a) * -thisStripH/2;
    yBot = y + sin(a) * -thisStripH/2;

    vertex(xTop,yTop,u,1);
    vertex(xBot,yBot,u,0);

    if((culmDist + frameCount*scrollSpeed)%heightRatio > heightRatio - thisDist){
      vertex(xTop,yTop,0,1);
      vertex(xBot,yBot,0,0);
    }

    culmDist += thisDist;
  }
  endShape();
}

function unitImage() {
  var iWidth = imageRadius * 2 * uRadius * imageWidth;
  var iHeight = imageRadius * 2 * uRadius * imageHeight;

  push();
  translate(0,0,-5);
    noStroke();
    fill(0);
    texture(pgImage);
    if(imageShape == 0){
      ellipse(0,0,iWidth,iHeight);
    } else if(imageShape == 1){
      rectMode(CENTER);
      rect(0,0,iWidth,iHeight);
    } else if(imageShape == 2){
      ellipse(0,0,iWidth,iHeight);
    }
  pop();
}
