function setState(state){
  for(var n = 0; n<6; n++){
    var thisOne = document.getElementById('entry'+n);
    thisOne.style.display = 'none';
  }

  loop();
  animStart = frameCount;
  animStop = frameCount + animLength;

  if(state == currentState){
    for(var k = 0; k<partCount; k++){
      resetState(k);
    }
    currentState = 6;
  } else {
    currentState = state;
    assignState();

    var showThisOne = document.getElementById('entry'+state);
    showThisOne.style.display = 'block';
  }
  animOn = true;
}

function assignState(){
  zTarget[0] = -200;

  for(var k = 1; k<partCount; k++){
    resetState(k);
  }

  if(currentState == 0){
    xTarget[0] = 280;
    yTarget[0] = -125;

    xTarget[14] = 0;
    yTarget[14] = -60;
    zTarget[14] = 200;
    aTarget[14] = 255;
  } else if(currentState == 1){
    xTarget[0] = 220;
    yTarget[0] = -125;
    zTarget[0] = -300;

    xTarget[1] = 0;
    yTarget[1] = -20;
    zTarget[1] = 200;
    aTarget[1] = 255;

    xTarget[4] = -40;
    yTarget[4] = -20;
    zTarget[4] = 200;
    aTarget[4] = 255;

    xTarget[8] = 0;
    yTarget[8] = -20;
    zTarget[8] = 200;
    aTarget[8] = 255;

    xTarget[13] = 20;
    yTarget[13] = 120;
    zTarget[13] = 200;

    xTarget[14] = 20;
    yTarget[14] = 120;
    zTarget[14] = 200;

    xTarget[15] = 0;
    yTarget[15] = -20;
    zTarget[15] = 200;
    aTarget[15] = 255;
  } else if(currentState == 2){
    xTarget[0] = 270;
    yTarget[0] = -100;
    zTarget[0] = -250;

    xTarget[6] = 40;
    yTarget[6] = -20;
    zTarget[6] = 125;
    aTarget[6] = 255;

    xTarget[11] = 40;
    yTarget[11] = -30;
    zTarget[11] = 125;
    aTarget[11] = 255;

    xTarget[12] = -10;
    yTarget[12] = -10;
    zTarget[12] = 200;
    aTarget[12] = 255;

    xTarget[13] = 10;
    yTarget[13] = 100;
    zTarget[13] = 200;

    xTarget[14] = 10;
    yTarget[14] = 100;
    zTarget[14] = 200;
  } else if(currentState == 3){
    xTarget[0] = 310;
    yTarget[0] = -100;
    zTarget[0] = -300;

    xTarget[2] = -20;
    yTarget[2] = 20;
    zTarget[2] = 125;
    aTarget[2] = 255;

    xTarget[3] = -40;
    yTarget[3] = -40;
    zTarget[3] = 125;
    aTarget[3] = 255;

    xTarget[7] = 80;
    yTarget[7] = 40;

    xTarget[8] = 60;
    yTarget[8] = -40;
    // zTarget[8] = 200;

    xTarget[10] = 60;
    yTarget[10] = -40;
    // zTarget[10] = 200;

    xTarget[9] = 60;
    yTarget[9] = -40;
    // zTarget[9] = 200;

    xTarget[11] = 60;
    yTarget[11] = -40;
    // zTarget[11] = 200;

    xTarget[12] = -60;
    yTarget[12] = -40;
    zTarget[12] = 200;
    aTarget[12] = 255;

    xTarget[13] = 45;
    yTarget[13] = 0;
    // zTarget[13] = 200;

    xTarget[14] = 45;
    yTarget[14] = 0;
    // zTarget[14] = 200;
  } else if(currentState == 4){
    xTarget[0] = 270;
    yTarget[0] = -125;

    xTarget[2] = -10;
    yTarget[2] = 10;
    zTarget[2] = 125;
    aTarget[2] = 255;

    xTarget[7] = 80;
    yTarget[7] = 20;
  } else if(currentState == 5){
    xTarget[0] = 220;
    yTarget[0] = -125;

    xTarget[5] = 0;
    yTarget[5] = -30;
    zTarget[5] = 125;
    aTarget[5] = 255;

    xTarget[6] = 0;
    yTarget[6] = -50;
    zTarget[6] = 125;
    aTarget[6] = 255;

    xTarget[13] = 70;
    yTarget[13] = 120;
    zTarget[13] = 200;

    xTarget[14] = 70;
    yTarget[14] = 120;
    zTarget[14] = 200;
  }
}

function animater(){
  var ticker = map(frameCount, animStart, animStop, 0, 1);

  for(var k = 0; k<partCount; k++){
    x[k] = map(aSet(ticker, 5), 0, 1, xHold[k], xTarget[k]);
    y[k] = map(aSet(ticker, 5), 0, 1, yHold[k], yTarget[k]);
    z[k] = map(aSet(ticker, 5), 0, 1, zHold[k], zTarget[k]);

    a[k] = map(aSet(ticker, 5), 0, 1, aHold[k], aTarget[k]);

    if(frameCount == animStop-1){
      xHold[k] = xTarget[k];
      yHold[k] = yTarget[k];
      zHold[k] = zTarget[k];
      aHold[k] = aTarget[k];
    }
  }

  if(frameCount == animStop-1){
    animOn = false;
    noLoop();
  }
}

function resetState(st){
  xTarget[st] = 0;
  yTarget[st] = 0;
  zTarget[st] = 0;
  aTarget[st] = 0;
}

function aSet(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1
  var capTicker = ticker%1;
  var targetPoint = pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));
  return targetPoint;
}
