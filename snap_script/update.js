function setText(){
  textSize(pgTextSize);
  textFont(currentFont);

  var enteredText = document.getElementById("textArea").value;
  keyText = enteredText;
  keyArray = enteredText.match(/[^\r\n]+/g);

  if(keyArray == null){
    keyArray = "";
  }

  resetAnim();
}

function setFont(val){
  currentFont = tFont[val];
}

function runSave(){
  if(saveSizeState == 0){           // AS IS
    cwidth = newWidth;
    cheight = newHeight;

    cScale = 1;
  } else if(saveSizeState == 1){    // Vert
    cwidth = 1080/thisDensity;
    cheight = 1920/thisDensity;

    if(widthHold > heightHold * 9/16){
      cScale = cheight/heightHold;
    } else {
      cScale = cwidth/widthHold;
    }
  } else if(saveSizeState == 2){    // Sq
    cwidth = 1080/thisDensity;
    cheight = 1080/thisDensity;

    if(widthHold > heightHold){
      cScale = cheight/heightHold;
    } else {
      cScale = cwidth/widthHold;
    }
  }

  if(width < cwidth){
    print("Width too big!");
    resizeCanvas(cwidth, height);
  }
  
  if(height < cheight){
    print("Height too big!");
    resizeCanvas(width, cheight);
  }

  setRecorder();

  numFrames = 90 + (keyArray[keyArray.length - 1].length - 1) * 3 + (keyArray.length - 1) * 3;
  recording = true;
  setText();

  toggleRecMessage();
}

function setForeColor(val){
  foreColor = color(val);
}

function setBkgdColor(val){
  bkgdColor = color(val);
}

function setFontSize(val){ 
  for(var p = 0; p < groupCount; p++){
    kineticGroups[p] = 0;
  }

  pgTextSize = int(val);
  lineHeight = pgTextSize * 0.8;

  setText();
}

function sizeSaveChange(val){
  saveSizeState = val;

  if(saveSizeState == 0){
    newHeight = heightHold;
    newWidth = widthHold;

    cXadjust = 0;
    cYadjust = 0;
  } else if(saveSizeState == 1){
    if(widthHold > heightHold * 9/16){
      print("center on x");
      
      newHeight = heightHold;
      newWidth = heightHold * 9/16;
  
      cXadjust = -(widthHold - newWidth)/2;
      cYadjust = 0;
    } else {
      print("center on y");

      newHeight = widthHold * 16/9;
      newWidth = widthHold;

      cXadjust = 0;
      cYadjust = -(heightHold - newHeight)/2;
    }
  } else if(saveSizeState == 2){
    if(widthHold > heightHold){
      newWidth = heightHold;
      newHeight = heightHold;

      cXadjust = -(widthHold - newWidth)/2;
      cYadjust = 0;
    } else if(heightHold >= widthHold){
      newHeight = widthHold;
      newWidth = widthHold;

      cXadjust = 0;
      cYadjust = -(heightHold - newHeight)/2
    }
  }

  horzSpacer = newWidth/2;
  frameFade = 4;

  setText();
}

function toggleRecMessage(){
  recMessageOn = !recMessageOn;

  if(recMessageOn){
    document.getElementById('recStatus').style.display = "block";
  } else {
    document.getElementById('recStatus').style.display = "none";
  }
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}