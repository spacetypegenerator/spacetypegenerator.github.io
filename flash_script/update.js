function setText(val){
  var enteredText = document.getElementById("textArea").value;
  keyText = enteredText;
  keyArray = enteredText.match(/[^\r\n]+/g);

  if(keyArray == null){
    keyArray = "";
  }

  selector = 0;
  pickScene();
}

function setSceneLength(val){
  sceneLength = int(val);
}

function setFont(val){
  currentFont = tFont[val];
  if(val == 0){
    thisFontAdjust = 0.7;
    thisFontAdjustUp = 0;
  } else if(val == 1){
    thisFontAdjust = 0.7;
    thisFontAdjustUp = 0;
  } else if(val == 2){
    thisFontAdjust = 0.75;
    thisFontAdjustUp = 0;
  } else if(val == 3){
    thisFontAdjust = 0.7;
    thisFontAdjustUp = 0;
  } else if(val == 4){
    thisFontAdjust = 0.75;
    thisFontAdjustUp = 0;
  } else if(val == 5){
    thisFontAdjust = 0.775;
    thisFontAdjustUp = 0;
  } else if(val == 6){
    thisFontAdjust = 1.05;
    thisFontAdjustUp = -0.315;
  }
}

function setSelectMode(val){
  displayMode = val;

  if(displayMode == 0){               // TEXT
    document.getElementById('textModeUI').style.display = "block";
    document.getElementById('textModeUI2').style.display = "flex";
  } else if(displayMode == 1){        // CLOCK
    document.getElementById('textModeUI').style.display = "none";
    document.getElementById('textModeUI2').style.display = "none";
    sceneLength = floor(frameRate()) + 2;
  }
}

function setAccelMode(val){
  accelMode = val;
  print(accelMode);
}

function setForeColor(val){
  foreColor = color(val);
}

function setBkgdColor(val){
  bkgdColor = color(val);
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function clearAllScenes(){
  for(var n = 0; n < flashCount; n++){
    sceneOn[n] = false;
  }
  document.getElementById('arcer').checked = false;
  document.getElementById('bend').checked = false;
  document.getElementById('box').checked = false;
  document.getElementById('bugeyes').checked = false;
  // document.getElementById('cloud').checked = false;
  // document.getElementById('grid').checked = false;
  document.getElementById('halo').checked = false;
  document.getElementById('risesun').checked = false;
  document.getElementById('shutters').checked = false;
  document.getElementById('shutters2').checked = false;
  document.getElementById('slotmachine').checked = false;
  document.getElementById('snap').checked = false;
  document.getElementById('split').checked = false;
  document.getElementById('starburst').checked = false;
  document.getElementById('twist').checked = false;

  sceneCount = 0;
}

function setScene(val){
  sceneOn[val] = !sceneOn[val];

  sceneCount = 0;
  for(var n = 0; n < flashCount; n++){
    if(sceneOn[n]){
      sceneCount++;
    }
  }
}

function toggleRecMessage(){
  recMessageOn = !recMessageOn;

  if(recMessageOn){
    document.getElementById('recStatus').style.display = "block";
  } else {
    document.getElementById('recStatus').style.display = "none";
  }
}

function setSceneRepeats(val){
  sceneRepeats = round(val);
}

function toggleColorSwap(){
  if(document.getElementById('colorSwap').checked){
    colorSwapOn = true;
  } else {
    colorSwapOn = false;
  }
}

function sizeSaveChange(val){
  saveMode = val;
  resizeForPreview();
}