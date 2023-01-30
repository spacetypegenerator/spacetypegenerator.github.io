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
    cwidth = 1080/2;
    cheight = 1920/2;

    cScale = cheight/height;
  } else if(saveSizeState == 2){    // Sq
    cwidth = 1080/2;
    cheight = 1080/2;

    if(width > height){
      cScale = cheight/height;
    } else {
      cScale = cwidth/width;

    }
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
    newHeight = height;
    newWidth = width;

    cXadjust = 0;
    cYadjust = 0;
  } else if(saveSizeState == 1){
    newHeight = height;
    newWidth = height * 9/16;

    cXadjust = -(width - newWidth)/2;
    cYadjust = 0;
  } else if(saveSizeState == 2){
    if(width > height){
      newWidth = height;
      newHeight = height;

      cXadjust = -(width - newWidth)/2;
      cYadjust = 0;
    } else if(height >= width){
      newHeight = width;
      newWidth = width;

      cXadjust = 0;
      cYadjust = -(height - newHeight)/2
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