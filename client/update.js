function setState(state){
  currentState = state;
  if(stateChanged){
    runReturn = true;
    returnStart = frameCount;
    returnStop = frameCount + returnLength;
  }
  if(runReturn == false){
    assignState();
  }
}

function assignState(){
  animStart = frameCount;
  animStop = frameCount + animLength;

  for(var k = 0; k<5; k++){
    x[k] = 0;
    xTarget[k] = 0;
    y[k] = 0;
    yTarget[k] = 0;
    z[k] = 0;
    zTarget[k] = 0;

    animOn[k] = false;
  }

  if(currentState == 0){
    animOn[0] = true;
    zTarget[0] = -50;

    animOn[1] = true;
    xTarget[1] = -50;
    yTarget[1] = -50;

    animOn[2] = true;
    xTarget[2] = 10;
    yTarget[2] = -50;
  } else if(currentState == 1){
    animOn[0] = true;
    zTarget[0] = -50;

    animOn[2] = true;
    xTarget[2] = 10;
    yTarget[2] = -50;

    animOn[4] = true;
    xTarget[4] = -20;
    yTarget[4] = 50;
  } else if(currentState == 2){
    animOn[0] = true;
    zTarget[0] = -50;

    animOn[3] = true;
    xTarget[3] = 50;
    yTarget[3] = 0;
  } else if(currentState == 3){
    animOn[0] = true;
    zTarget[0] = -50;

    animOn[2] = true;
    xTarget[2] = 10;
    yTarget[2] = -50;

    animOn[3] = true;
    xTarget[3] = 50;
    yTarget[3] = 0;

    animOn[4] = true;
    xTarget[4] = -20;
    yTarget[4] = 50;
  } else if(currentState == 4){
    animOn[0] = true;
    zTarget[0] = -50;

    animOn[1] = true;
    xTarget[1] = -50;
    yTarget[1] = -50;
  }
}

function animater(){
  // textFont(font1); fill(foreColor);
  // text("ANIMATING!", width/2 - 100, height/2 - 100);

  for(var k = 0; k<5; k++){
    if(animOn[k]){
      z[0] = map(aSet(ticker, 5), 0, 1, 0, zTarget[0]);

      var ticker = map(frameCount, animStart, animStop, 0, 1);

      x[k] = map(aSet(ticker, 5), 0, 1, 0, xTarget[k]);
      y[k] = map(aSet(ticker, 5), 0, 1, 0, yTarget[k]);
      z[k] = map(aSet(ticker, 5), 0, 1, 0, zTarget[k]);
    }
    if(frameCount == animStop-1){
      animOn[k] = false;
    }
  }

  if(frameCount == animStop-1){
    stateChanged = true;
  }
}

function returner(){
  // textFont(font1); fill(foreColor);
  // text("RETURNING!", width/2 - 100, height/2 - 100);

  for(var k = 0; k<5; k++){

    var ticker = map(frameCount, returnStart, returnStop, 0.5, 1);

    x[k] = map(aSet(ticker, 4), 0.5, 1, xTarget[k], 0);
    y[k] = map(aSet(ticker, 4), 0.5, 1, yTarget[k], 0);
    z[k] = map(aSet(ticker, 4), 0.5, 1, zTarget[k], 0);
  }

  if(frameCount == returnStop-1){
    runReturn = false;
    stateChanged = false;
    assignState();
  }
}

function checkReturn(){

}

function aSet(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1
  var capTicker = ticker%1;

  var targetPoint = pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));
  return targetPoint;
}
