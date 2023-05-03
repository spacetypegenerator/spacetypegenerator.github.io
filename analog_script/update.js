function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function toggleFlipBottom(){
  flipBottomOn = !flipBottomOn;
}
function toggleTimeFlies(){
  timeFliesOn = !timeFliesOn;
}
function toggleHandsOn(){
  handsOn = !handsOn;
}
function toggleEaseFlow(){
  easeFlowOn = !easeFlowOn;
}
function toggleLockRotOn(){
  lockRotOn = !lockRotOn;
}
function toggleCreditsOn(){
  creditsOn = !creditsOn;

  if(creditsOn){
    document.getElementById('credits').style.display = "block";
  } else {
    document.getElementById('credits').style.display = "none";
  }
}
function setForeColor(val){
  foreColor = color(val);
}

function setBkgdColor(val){
  bkgdColor = color(val);

  if(lightness(bkgdColor) > 90){
    document.getElementById('credits').style.color = "#000000";
  } else {
    document.getElementById('credits').style.color = "#ffffff";
  }
}

function setSecColor(val){
  secColor = color(val);
}

function setHourRadius(val){
  slidersOn = true;
  mainHourRadius = map(val, 0, 100, 10, width/2);

  hourSecWidth = (2*PI*mainHourRadius)*(hourSpread/(2*PI));
  hourSecStripH = (pgHeight/pgWidth) * hourSecWidth;

  hourClock.refresh();
}

function setMinRadius(val){
  slidersOn = true;

  mainMinRadius = map(val, 0, 100, 10, width/2);

  minSecWidth = (2*PI*mainMinRadius)*(minSpread/(2*PI));
  minSecStripH = (pgHeight/pgWidth) * minSecWidth;

  minClock.refresh();
}

function setSecRadius(val){
  slidersOn = true;

  mainSecRadius = map(val, 0, 100, 10, width/2);

  secSecWidth = (2*PI*mainSecRadius)*(secSpread/(2*PI));
  secSecStripH = (pgHeight/pgWidth) * secSecWidth;

  secClock.refresh();
}

function setHandsRadius(val){
  handsRadius = map(val, 0, 100, 0, width/2);
}

function setScale(val){
  coreScale = map(val, 0, 100, 0, 2);
}

function resetRadii(){
  slidersOn = false;

  coreScale = 0.9;
  if(fontMode == 0){
    mainHourRadius = 500;
    mainMinRadius = 445;
    mainSecRadius = 400;

    handsRadius = 375;
  } else if(fontMode == 1){
    mainHourRadius = 500;
    mainMinRadius = 425;
    mainSecRadius = 370;

    handsRadius = 330;
  } else if(fontMode == 2){
    mainHourRadius = 460;
    mainMinRadius = 378;
    mainSecRadius = 325;

    handsRadius = 285;
  }
  secSecWidth = (2*PI*mainSecRadius)*(secSpread/(2*PI));
  secSecStripH = (pgHeight/pgWidth) * secSecWidth;

  minSecWidth = (2*PI*mainMinRadius)*(minSpread/(2*PI));
  minSecStripH = (pgHeight/pgWidth) * minSecWidth;

  hourSecWidth = (2*PI*mainHourRadius)*(hourSpread/(2*PI));
  hourSecStripH = (pgHeight/pgWidth) * hourSecWidth;

  hourClock.refresh();
  minClock.refresh();
  secClock.refresh();

  resetRadiiSliders();
}

function setColorA(select, val){
  colorA[select] = color(val);
  if(select == 0){
    document.getElementById('colorA0').value = val;
  } else if(select == 1){
    document.getElementById('colorA1').value = val;
  } else if(select == 2){
    document.getElementById('colorA2').value = val;
  } else if(select == 3){
    document.getElementById('colorA3').value = val;
  }
}

function setTextColorMode(val){
  textColorMode = val;

  if(val == 0){
    document.getElementById('colorA0').style.display = "flex";
    document.getElementById('colorA1').style.display = "none";
    document.getElementById('colorA2').style.display = "none";
    document.getElementById('colorA3').style.display = "none";
  } else if(val == 1){
    document.getElementById('colorA0').style.display = "flex";
    document.getElementById('colorA1').style.display = "none";
    document.getElementById('colorA2').style.display = "none";
    document.getElementById('colorA3').style.display = "flex";
  } else if(val == 2){
    document.getElementById('colorA0').style.display = "flex";
    document.getElementById('colorA1').style.display = "none";
    document.getElementById('colorA2').style.display = "flex";
    document.getElementById('colorA3').style.display = "flex";
  } else if(val == 3){
    document.getElementById('colorA0').style.display = "flex";
    document.getElementById('colorA1').style.display = "flex";
    document.getElementById('colorA2').style.display = "flex";
    document.getElementById('colorA3').style.display = "flex";
  } 
}

function resetRadiiSliders(){
  document.getElementById('scaleSlider').value = map(coreScale, 0, 2, 0, 100);
  document.getElementById('hourRadiusSlider').value = map(mainHourRadius, 10, width/2, 0, 100);
  document.getElementById('minRadiusSlider').value = map(mainMinRadius, 10, width/2, 0, 100);
  document.getElementById('secRadiusSlider').value = map(mainSecRadius, 10, width/2, 0, 100);
  document.getElementById('handsRadius').value = map(handsRadius, 0, width/2, 0, 100);
}
