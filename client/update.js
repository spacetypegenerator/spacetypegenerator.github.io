function setState(state){
  animStart = frameCount;
  animStop = frameCount + animLength;

  if(state == currentState){
    for(var k = 0; k<5; k++){
      resetState(k);
    }
  } else {
    currentState = state;
    assignState();
  }
  animOn = true;
}

function assignState(){
  zTarget[0] = -300;

  if(currentState == 0){
    xTarget[0] = 110;
    yTarget[0] = 110;

    xTarget[1] = -120;
    yTarget[1] = -80;
    zTarget[1] = 300;
    aTarget[1] = 255;

    xTarget[2] = 30;
    yTarget[2] = -110;
    zTarget[2] = 300;
    aTarget[2] = 255;

    resetState(3);
    resetState(4);
  } else if(currentState == 1){
    xTarget[0] = -100;
    yTarget[0] = -20;

    xTarget[2] = 150;
    yTarget[2] = -60;
    zTarget[2] = 300;
    aTarget[2] = 255;

    xTarget[4] = 40;
    yTarget[4] = 160;
    zTarget[4] = 300;
    aTarget[4] = 255;

    resetState(1);
    resetState(3);
  } else if(currentState == 2){
    xTarget[0] = -40;
    yTarget[0] = 0;

    xTarget[3] = 50;
    yTarget[3] = 0;
    zTarget[3] = 350;
    aTarget[3] = 255;

    resetState(1);
    resetState(2);
    resetState(4);
  } else if(currentState == 3){
    xTarget[0] = -200;
    yTarget[0] = 0;

    xTarget[2] = 160;
    yTarget[2] = -80;
    zTarget[2] = 300;
    aTarget[2] = 255;

    xTarget[3] = 200;
    yTarget[3] = 0;
    zTarget[3] = 300;
    aTarget[3] = 255;

    xTarget[4] = 120;
    yTarget[4] = 100;
    zTarget[4] = 300;
    aTarget[4] = 255;

    resetState(1);
  } else if(currentState == 4){
    xTarget[0] = 130;
    yTarget[0] = 60;

    xTarget[1] = -100;
    yTarget[1] = -50;
    zTarget[1] = 300;
    aTarget[1] = 255;

    resetState(2);
    resetState(3);
    resetState(4);
  }
}

function animater(){
  for(var k = 0; k<5; k++){
    var ticker = map(frameCount, animStart, animStop, 0, 1);

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
