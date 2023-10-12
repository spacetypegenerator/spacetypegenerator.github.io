function setText(){
  var enteredText = document.getElementById("text0").value;

  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    inputText = [];
    inputText[0] = " ";
  }

  buildIt();
}

function setPGtextSize(val){
  pgTextSize = int(map(val, 0, 100, 10, 400));

  coreScale = pgTextSize/250;  

  resetPop();
  coreSplode.refresh();
}

function setFillColor(val){ fillColor = val; }
function setBkgdColor(val){ bkgdColor = val; }
function setStrokeColor(val){ strokeColor = val; }

function setCoreSW(val){
  coreSW = map(val, 1, 100, 0, 4);
}

function setDetailFactor(val){
  detailFactor = map(val, 1, 100, 1.5, 0.3);

  resetPop();
  coreSplode.refresh();
}

function setBlastFactor(val){
  blastFactor = map(val, 1, 100, 0.5, 3);

  resetPop();
  coreSplode.refresh();
}

function setRatioFactor(val){
  ratioFactor = map(val, 1, 100, 0.1, 4);

  resetPop();
  coreSplode.refresh();
}

function toggleMousePop(){
  if(document.getElementById('mousePop').checked){
    mousePopOn = true;
  } else {
    mousePopOn = false;
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

function resetPop(){
  orgX = width/2;
  orgY = height/2;

  coreMousePop.refresh(orgX, orgY);
}

function setFont(val){
  fontSelect = val;

  resetPop();
  coreSplode.refresh();
}

function runJPGsave(){
  save("STGpowStatic.jpg");
}

function runSVGsave(){
  createCanvas(windowWidth, windowHeight, SVG);
  background(bkgdColor);

  if(mousePopOn){ coreMousePop.runBottom(); }
  coreSplode.run();
  if(mousePopOn){ coreMousePop.runTop();}

  print("SVG SAVED?");
  save("STGpow.svg"); // give file name

  resetWithCustomUrl();
}

function resetWithCustomUrl(){
  var url = window.location.href;    
  url = url.split('?')[0];

  var tempString = '';
  for(var m = 0; m < inputText.length; m++){
    tempString += inputText[m] + '_*_';
  }
  url += '?starterText=' + tempString;
  url += '&fontSelect=' + fontSelect;
  url += '&pgTextSize=' + pgTextSize;
  url += '&fillColor=' + color(fillColor);
  url += '&bkgdColor=' + color(bkgdColor);
  url += '&strokeColor=' + color(strokeColor);
  url += '&coreSW=' + coreSW;
  url += '&detailFactor=' + detailFactor;
  url += '&blastFactor=' + blastFactor;
  url += '&ratioFactor=' + ratioFactor;

  window.location.href = url;
}