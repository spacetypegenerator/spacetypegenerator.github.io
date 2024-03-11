function setText(){
  inputTextMin = keyTextMin.match(/[^\r\n]+/g);
  inputTextHour = keyTextHour.match(/[^\r\n]+/g);
  inputTextTop = keyTextTop.split('');
  inputTextBottom = keyTextBottom.split('');
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function setTextScaler(val){
  textScaler = map(val, 1, 100, 0.25, 1.75);

  pgTextSizeHour = constrain(textScaler * pgTextSizeHourMax, 25, 500);
  pgTextSizeMin = constrain(textScaler * pgTextSizeMinMax, 25, 500);
  pgTextSizeHead = constrain(textScaler * pgTextSizeHeadMax, 25, 500);

  resetText();
}

function resetPos(){
  if(setMode == 3){
    dropGroupParticles.resetIt();
  } else {
    resetText();
  }
  // if(dropGroupHour != null){ dropGroupHour.resetPos(); }
  // if(dropGroupMin != null){ dropGroupMin.resetPos(); }
  // if(dropGroupHead != null){ dropGroupHead.resetPos(); }
}

function adjustGravity(e){
  gravityAng = e.value + PI;
}

function setGravityStrength(val){
  gravityStrength = map(val, 0, 100, 0, 0.0005);
}

function setTextTop(val){
  inputTextTop = [];
  keyTextTop = val;

  setText();
  resetText();
  configureClock();
}

function setTextBottom(val){
  inputTextBottom = [];
  keyTextBottom = val;

  setText();
  resetText();
  configureClock();
}

function setFullScale(val){
  fullScale = map(val, 0, 100, 0.1, 2);

  configureClock();
  positionBoundaries();
  resetText();
}

function setFont(val){
  fontSelect = val;

  resetText();
}

function setSet(val){
  setMode = val;

  if(setMode == 2){
    document.getElementById('topBotText').style.display = "block";
  } else {
    document.getElementById('topBotText').style.display = "none";
  }

  resetText();
}

function setStyle(val){
  styleMode = val;

  borderDraw = 2;
}

function setReset(val){
  resetMode = val;
}

function setPadFactor(val){
  padFactor = map(val, 0, 100, 0, 1);

  positionBoundaries();
}

function setPadFactor(val){
  borderExtra = map(val, 0, 100, 0, 500);

  borderDraw = 2;

  positionBoundaries();
}

function setFillColor(val){ fillColor = val; }
function setBkgdColor(val){ bkgdColor = val; }
function setHandColor(val){ handColor = val; }
function setAccentColor(val){ accentColor = val; }

function resetText(){
  if(dropGroupHour != null){
    dropGroupHour.removeIt();
    dropGroupHour = null;
  }
  if(dropGroupMin != null){
    dropGroupMin.removeIt();
    dropGroupMin = null;
  }
  if(dropGroupHead != null){
    dropGroupHead.removeIt();
    dropGroupHead = null;
  }
  if(dropGroupParticles != null){
    dropGroupParticles.removeIt();
    dropGroupParticles = null;
  }

  if(setMode == 0){
    dropGroupHour = new DropAll(0);    
  } else if(setMode == 1){
    dropGroupHour = new DropAll(0);    
    dropGroupMin = new DropAll(1);
  } else if(setMode == 2){
    dropGroupHead = new DropAll(2);
  }else if(setMode == 3){
    dropGroupParticles = new PartPac();
  }
}