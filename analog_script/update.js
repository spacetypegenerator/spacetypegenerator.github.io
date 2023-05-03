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

function randomPalette(){
  var pCount = 9;
  var rs0 = random(pCount * 10);

  if(rs0 < 1 * 10){
    document.getElementById('bColor').value = '#000000';
    document.getElementById('colorA0').value = '#ffffff';
    document.getElementById('colorA1').value = '#f29f05';
    document.getElementById('colorA2').value = '#f21905';
    document.getElementById('colorA3').value = '#022873';
    console.log("P1!");
  } else if(rs0 < 2 * 10){
    document.getElementById('bColor').value =  '#f2f2f2';
    document.getElementById('colorA0').value = '#596cd9';
    document.getElementById('colorA1').value = '#03a65a';
    document.getElementById('colorA2').value = '#f2c84b';
    document.getElementById('colorA3').value = '#f24e29';
    console.log("P2!");
  } else if(rs0 < 3 * 10){
    document.getElementById('bColor').value =  '#000000';
    document.getElementById('colorA0').value = '#f2eb8d';
    document.getElementById('colorA1').value = '#8c357e';
    document.getElementById('colorA2').value = '#16288c';
    document.getElementById('colorA3').value = '#404040';
    console.log("P3!");
  } else if(rs0 < 4 * 10){
    document.getElementById('bColor').value =  '#122459';
    document.getElementById('colorA0').value = '#f2ca50';
    document.getElementById('colorA1').value = '#f28599';
    document.getElementById('colorA2').value = '#d94625';
    document.getElementById('colorA3').value = '#1c4aa6';
    console.log("P4!");
  } else if(rs0 < 5 * 10){
    document.getElementById('bColor').value =  '#3bd9c9';
    document.getElementById('colorA0').value = '#f2ebf2';
    document.getElementById('colorA1').value = '#f2b3dc';
    document.getElementById('colorA2').value = '#ca659d';
    document.getElementById('colorA3').value = '#a62e9e';
    console.log("P5!");
  } else if(rs0 < 6 * 10){
    document.getElementById('bColor').value =  '#000000';
    document.getElementById('colorA0').value = '#29ffd9';
    document.getElementById('colorA1').value = '#f2c12e';
    document.getElementById('colorA2').value = '#f23e2e';
    document.getElementById('colorA3').value = '#2793f2';
    console.log("P6!");
  } else if(rs0 < 7 * 10){
    document.getElementById('bColor').value =  '#000000';
    document.getElementById('colorA0').value = '#f2ebdc';
    document.getElementById('colorA1').value = '#4541bf';
    document.getElementById('colorA2').value = '#f29f05';
    document.getElementById('colorA3').value = '#d971c7';
    console.log("P7!");
  } else if(rs0 < 8 * 10){
    document.getElementById('bColor').value =  '#ffffff';
    document.getElementById('colorA0').value = '#f24b78';
    document.getElementById('colorA1').value = '#f2a20c';
    document.getElementById('colorA2').value = '#0b8ad9';
    document.getElementById('colorA3').value = '#0a5926';
    console.log("P8!");
  } else if(rs0 < 9 * 10){
    document.getElementById('bColor').value =  '#d9d9d9';
    document.getElementById('colorA0').value = '#f23a29';
    document.getElementById('colorA1').value = '#f2d541';
    document.getElementById('colorA2').value = '#232cd9';
    document.getElementById('colorA3').value = '#040fd9';
    console.log("P9!");
  } else if(rs0 < 10 * 10){
    document.getElementById('bColor').value =  '#1c1c1c';
    document.getElementById('colorA0').value = '#b79bf2';
    document.getElementById('colorA1').value = '#b6c5f2';
    document.getElementById('colorA2').value = '#03a65a';
    document.getElementById('colorA3').value = '#014005';
    console.log("P10!");
  }

  bkgdColor = color(document.getElementById('bColor').value);
  colorA[0] = color(document.getElementById('colorA0').value);
  colorA[1] = color(document.getElementById('colorA1').value);
  colorA[2] = color(document.getElementById('colorA2').value);
  colorA[3] = color(document.getElementById('colorA3').value);

  foreColor = colorA[0];
  document.getElementById('fColor').value = document.getElementById('colorA0').value;
  secColor = colorA[2];
  document.getElementById('sColor').value = document.getElementById('colorA2').value;
}