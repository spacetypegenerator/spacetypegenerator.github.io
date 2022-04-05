function setText(){
  pgT = [];
  pEntry = [];
  heightRatio = [];
  xNudge = [];
  wordCount = [];
  sHarry = [];

  fullHeight = 0;

  var enteredText = document.getElementById("textArea").value;
  keyText = enteredText;
  keyArray = enteredText.split(" ");

  if(keyArray == null){
    keyArray = "";
  }

  randomInsert();

  var lineDist = 0;
  var lineCount = 0;
  var thisWordCount = 0;

  var rSh = random(10);
  var sH = stripH;
  if(rSh>7.5){
    sH = stripH/4;
  } else if(rSh>5){
    sH = stripH/2;
  }

  for(var k = 0; k<keyArray.length; k++){

    if(lineDist > wWindow){
      xNudge[lineCount] = lineDist;
      wordCount[lineCount] = thisWordCount;
      sHarry[lineCount] = sH;
      fullHeight += sH;

      lineCount ++;
      lineDist = 0;
      thisWordCount = 0;

      var rSh = random(10);

      sH = stripH;
      if(rSh>7.5){
        sH = stripH/4;
      } else if(rSh>5){
        sH = stripH/2;
      }
    }

    var ver = 0;

    if(keyArray[k] == "X0"){  // IMAGE
      pgImage(k, sH);
      ver = 0;
    } else if(keyArray[k] == "X1"){  // SLASHES
      pSlash(k, sH);
      ver = 1;
    } else if(keyArray[k] == "X2"){  // CIRCLES
      pRound(k, sH);
      ver = 2;
    } else if(keyArray[k] == "X3"){  // SCRIBBLE
      pBlank(k, sH);
      ver = 3;
    } else if(keyArray[k] == "X4"){  // BLANKS
      pBlank(k, sH);
      ver = 4;
    } else if(keyArray[k] == "X5"){  // CLOUD
      pBlank(k, sH);
      ver = 5;
    } else if(keyArray[k] == "X6"){  // ZIGZAG
      pBlank(k, sH);
      ver = 6;
    } else if(keyArray[k] == "X7"){  // GRADIENT
      pBlank(k, sH);
      ver = 7;
    } else if(keyArray[k] == "X8"){  // BOXES
      pBlank(k, sH);
      ver = 8;
    } else {
      var rFont = random(10);
      if(rFont < 8){
        pgTexture1(keyArray[k], 0, k, sH);
      } else {
        pgTexture1(keyArray[k], typeToggle, k, sH);
      }
      ver = 9;
    }

    thisWordCount ++;
    lineDist += heightRatio[k];

    pEntry[k] = new Entry(k, ver, sH);
  }

  xNudge[lineCount] = lineDist;
  wordCount[lineCount] = thisWordCount;
  sHarry[lineCount] = sH;
  fullHeight += sH;
}

function reRoll(){
  typeToggle = round(random(1,2));

  setText();
}

function aSet(ticker, influ){          // takes a 0 - 1 and returns an eased 0 - 1
  var capTicker = ticker%1;

  var targetPoint = pow(capTicker,influ)/(pow(capTicker,influ) + pow(1-capTicker,influ));
  return targetPoint;
}

function randomInsert(){
  // insert for images
  // var r0 = 8;
  var r0 = 1 + floor(keyArray.length/5);
  for(var r = 0; r<r0; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X0");
  }

  // insert for slashes
  // var r1 = 10;
  var r1 = 1 + floor(keyArray.length/12);
  for(var r = 0; r<r1; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X1");
  }

  // insert for circles
  // var r2 = 5;
  var r2 = 1 + floor(keyArray.length/12);
  for(var r = 0; r<r2; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X2");
  }

  // insert for scribbles
  // var r3 = 4;
  var r3 = 1 + floor(keyArray.length/12)
  for(var r = 0; r<r3; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X3");
  }

  // insert for blanks
  // var r4 = 4;
  var r4 = 1 + floor(keyArray.length/18)
  for(var r = 0; r<r4; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X4");
  }

  // insert for clouds
  // var r5 = 4;
  var r5 = 1 + floor(keyArray.length/10)
  for(var r = 0; r<r5; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X5");
  }

  // insert for zigzag
  // var r6 = 4;
  var r6 = 1 + floor(keyArray.length/15)
  for(var r = 0; r<r6; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X6");
  }

  // insert for gradient
  // var r7 = 4;
  var r7 = 1 + floor(keyArray.length/12)
  for(var r = 0; r<r7; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X7");
  }

  // insert for boxes
  // var r8 = 4;
  var r8 = floor(keyArray.length/15)
  for(var r = 0; r<r8; r++){
    var insertPoint = round(random(keyArray.length));
    keyArray.splice(insertPoint, 0, "X8");
  }
}

function hideWidget(){
  widgetOn = !widgetOn;
  if(widgetOn==true){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function invert(){
  inverter = !inverter;
  if(inverter == true){
    bkgdColor = color('#ffffff');
    foreColor = color('#000000');
    colorA[4] = bkgdColor;
    pImg[6] = loadImage("construct/resources/gifs/6i.gif");

    pGradientH();
    pGradientV();
    pGradientCH();

    setText();
  } else {
    bkgdColor = color('#000000');
    foreColor = color('#ffffff');
    colorA[4] = bkgdColor;
    pImg[6] = loadImage("construct/resources/gifs/6.gif");

    pGradientH();
    pGradientV();
    pGradientCH();

    setText();
  }
}

function setWpadding(val){
  wPad = val;
  wWindow = width - map(wPad, 0, 100, 0, width);

  setText();
}


function setStripH(val){
  stripH = round(val);

  setText();
}
