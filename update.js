function setInitialValues(){
  uRadius = map(document.getElementById("uRadius").value, 0, 100, 100, 500);

  for(var p = 0; p<unitCount; p++){
    tEntry[p] = document.getElementById("text" + p).value;
    unitFont[p] = tFont[document.getElementById("font" + p).value];
    pgPadding[p] = map(document.getElementById("padding" + p).value, 0, 100, 1.0, 10.0);
    unitRepeat[p] = document.getElementById("repeatCheckbox" + p).checked;
    unitCycle[p] = document.getElementById("cycleCheckbox" + p).checked;

    pgInvert[p] = document.getElementById("invertCheckbox" + p).checked;
    pgOutline[p] = document.getElementById("outlineCheckbox" + p).checked;
    pgBackground[p] = document.getElementById("backgroundCheckbox" + p).checked;
  }

  // for "units" that have a repeat
  for(var p = 2; p<unitCount; p++){
    pgFlip[p] = document.getElementById("flipCheckbox" + p).checked
  }

  stripToggle = document.getElementById("stripSwitch").checked;
  orbitToggle = document.getElementById("orbitSwitch").checked;
  tunnelToggle = document.getElementById("tunnelSwitch").checked;
  ringToggle = document.getElementById("ringSwitch").checked;
  gateToggle = document.getElementById("gateSwitch").checked;
  spreadToggle = document.getElementById("spreadSwitch").checked;
  trackToggle = document.getElementById("trackSwitch").checked;
  imageToggle = document.getElementById("imageSwitch").checked;

  stripLength = map(document.getElementById("stripLength").value, 0, 100, 0, 2);
  stripHeight = map(document.getElementById("stripHeight").value, 0, 100, 0, 5);
  stripShear = map(document.getElementById("stripShear").value, 0, 100, -PI/4, PI/4);
  stripRotate = map(document.getElementById("stripRotate").value, 0, 100, -PI/2, PI/2);
  stripPosition = map(document.getElementById("stripPosition").value, 0, 100, -uRadius, uRadius);

  orbitCirc = map(document.getElementById("orbitCirc").value, 0, 100, 0, PI*2);
  orbitHeight = map(document.getElementById("orbitHeight").value, 0, 100, 0, 4);
  orbitRadius = map(document.getElementById("orbitRadius").value, 0, 100, 0, 2);
  orbitXrot = map(document.getElementById("orbitXrot").value, 0, 100, -PI/2, PI/2);
  orbitZrot = map(document.getElementById("orbitZrot").value, 0, 100, -PI/2, PI/2);

  ringCirc = map(document.getElementById("ringCirc").value, 0, 100, 0, PI*2);
  ringHeight = map(document.getElementById("ringHeight").value, 0, 100, 0, 4);
  ringRadius = map(document.getElementById("ringRadius").value, 0, 100, 0, 2.0);
  ringOffset = map(document.getElementById("ringOffset").value, 0, 100, -PI, PI);

  tunnelCirc = map(document.getElementById("tunnelCirc").value, 0, 100, 0, PI*2);
  tunnelInner = map(document.getElementById("tunnelInner").value, 0, 100, 0, 1.0);
  tunnelOffset = map(document.getElementById("tunnelOffset").value, 0, 100, 0, PI*2);

  gateInner = map(document.getElementById("gateInner").value, 0, 100, 0, 1.0);
  stretchRes = map(document.getElementById("stretchRes").value, 0, 100, 0, 100);

  spreadFontSize = map(document.getElementById("spreadFontSize").value, 0, 100, 0, 200);
  spreadTangent = document.getElementById("spreadTangent").checked;
  spreadRadial = document.getElementById("spreadRadial").checked;
  spreadRadius = map(document.getElementById("spreadRadius").value, 0, 100, 0, 1.5);
  spreadXPinch = map(document.getElementById("spreadXPinch").value, 0, 100, 0, 2.0);
  spreadYPinch = map(document.getElementById("spreadYPinch").value, 0, 100, 0, 2.0);

  trackWidth = map(document.getElementById("trackWidth").value, 0, 100, 0, 2.0);
  trackHeight = map(document.getElementById("trackHeight").value, 0, 100, 0, 2.0);
  trackWidthPinch = map(document.getElementById("trackWidthPinch").value, 0, 100, 0, 2.0);
  trackHeightPinch = map(document.getElementById("trackHeightPinch").value, 0, 100, 0, 2.0);

  imageRadius = map(document.getElementById("imageRadius").value, 0, 100, 0, 1.0);
  imageWidth = map(document.getElementById("imageWidth").value, 0, 100, 0, 2.0);
  imageHeight = map(document.getElementById("imageHeight").value, 0, 100, 0, 2.0);

  bkgdColor = document.getElementById("bColor").value;
  foreColor = document.getElementById("fColor").value;

  drawTextures();
}

function setText(keyNum, val){
  // document.getElementById('text'+keyNum).value=val;
  tEntry[keyNum] = val;
  pgTexture(keyNum);
}

function stripSwitch() {
  stripToggle = !stripToggle;
}

function setStripLength(val) {
  stripLength = map(val,0,100,0,2);
}

function setStripHeight(val) {
  stripHeight = map(val,0,100,0,5);
}

function setStripShear(val) {
  stripShear = map(val, 0, 100, -PI/4, PI/4);
}

function setStripRotate(val) {
  stripRotate = map(val, 0, 100, -PI/2, PI/2);
}

function setStripPosition(val) {
  stripPosition = map(val, 0, 100, -uRadius, uRadius);
}

function orbitSwitch() {
  orbitToggle = !orbitToggle;
}

function setOrbitCirc(val){
  orbitCirc = map(val,0,100,0,PI*2);
}

function setOrbitRadius(val){
  orbitRadius = map(val,0,100,0,2.0);
}

function setOrbitHeight(val) {
  orbitHeight = map(val,0,100,0,4);
}

function setOrbitXrot(val){
  orbitXrot = map(val,0,100,-PI/2,PI/2);
}

function setOrbitZrot(val){
  orbitZrot = map(val,0,100,-PI/2,PI/2);
}

function tunnelSwitch() {
  tunnelToggle = !tunnelToggle;
}

function setTunnelCount(val){
  tunnelCount = int(map(val,0,100,2,20));

  for(var r= 0; r<tunnelCount; r++){
    var rs = random(5);
    rSpeed[r] = rs;
  }
}

function setTunnelCirc(val){
  tunnelCirc = map(val,0,100,0,PI*2);
}

function setTunnelInner(val){
  tunnelInner = map(val,0,100,0,1.0);
}

function setTunnelOffset(val){
  tunnelOffset = map(val,0,100,0,PI*2);
}

function ringSwitch() {
  ringToggle = !ringToggle;
}

function setRingCirc(val){
  ringCirc = map(val,0,100,0,PI*2);
}

function setRingHeight(val) {
  ringHeight = map(val,0,100,0,4);
}

function setRingRadius(val){
  ringRadius = map(val,0,100,0,2.0);
}

function setRingOffset(val){
  ringOffset = map(val,0,100,-PI,PI);
}

function gateSwitch() {
  gateToggle = !gateToggle;
}

function setGateHalf(){
  gateHalf = !gateHalf;
}

function setGateCount(val) {
  gateCount = int(map(val,0,100,2,20));

  for(var r= 0; r<gateCount; r++){
    var rs = random(5);
    rSpeedGate[r] = rs;
  }
}

function setGateInner(val){
  gateInner = map(val,0,100,0,1.0);
}

function setStretchRes(val){
  stretchRes = map(val,0,100,0,100);
}

function spreadSwitch(){
  spreadToggle = !spreadToggle;
}

function setSpreadFontSize(val){
  spreadFontSize = map(val,0,100,0,200);
}

function setSpreadTangent() {
  spreadTangent = !spreadTangent;
  if(spreadRadial && spreadTangent){
    document.getElementById("spreadRadial").checked = false;
    spreadRadial = false;
  }
}

function setSpreadRadial() {
  spreadRadial = !spreadRadial;
  if(spreadTangent && spreadRadial){
    document.getElementById("spreadTangent").checked = false;
    spreadTangent = false;
  }
}

function setSpreadRadius(val){
  spreadRadius = map(val,0,100,0,1.5);
}

function setSpreadXPinch(val){
  spreadXPinch = map(val,0,100,0,2);
}

function setSpreadYPinch(val){
  spreadYPinch = map(val,0,100,0,2);
}

function trackSwitch() {
  trackToggle = !trackToggle;
}

function setTrackStripHeight(val){
  trackStripHeight = map(val,0,100,0,2);
}

function setTrackWidth(val){
  trackWidth = map(val,0,100,0,2);
}

function setTrackWidthPinch(val) {
  trackWidthPinch = map(val,0,100,0,2.0);
}

function setTrackHeight(val){
  trackHeight = map(val,0,100,0,2);
}

function setTrackHeightPinch(val) {
  trackHeightPinch = map(val,0,100,0,2.0);
}

function imageSwitch() {
  imageToggle = !imageToggle;
}

function setImageHeight(val) {
  imageHeight = map(val,0,100,0,2.0);
}

function setImageWidth(val) {
  imageWidth = map(val,0,100,0,2.0);
}

function setImageShape(val) {
  imageShape = val;
}

function setImageRadius(val) {
  imageRadius = map(val,0,100,0,1.0);
}

////////////// master toggles
function setUradius(val){
  uRadius = map(val,0,100,100,500);
}

function setInvert(keyNum){
  pgInvert[keyNum] = !pgInvert[keyNum];
  pgTexture(keyNum);
}

function setFont(keyNum, val){
  unitFont[keyNum] = tFont[val];
  pgTexture(keyNum);
}

function setPadding(keyNum, val){
  pgPadding[keyNum] = map(val,0,100,1.0,10.0);
  pgTexture(keyNum);
}

function setOutline(keyNum){
  pgOutline[keyNum] = !pgOutline[keyNum];
  pgTexture(keyNum);
}

function setBackground(keyNum){
  pgBackground[keyNum] = !pgBackground[keyNum];
  pgTexture(keyNum);
}

function setFlip(keyNum){
  pgFlip[keyNum] = !pgFlip[keyNum];
  pgTexture(keyNum);

  if(keyNum==4){
    gateFlip = !gateFlip;
  }
}

function setRepeat(keyNum){
  unitRepeat[keyNum] = !unitRepeat[keyNum];
  if(unitCycle[keyNum] && !unitRepeat[keyNum]){
    document.getElementById("cycleCheckbox" + keyNum).checked = false;
    unitCycle[keyNum] = false;
  }
}

function setUnitCycle(keyNum){
  unitCycle[keyNum] = !unitCycle[keyNum];
  if(unitCycle[keyNum] && !unitRepeat[keyNum]){
    document.getElementById("repeatCheckbox" + keyNum).checked = true;
    unitRepeat[keyNum] = true;
  }
}

function setImage(val){
  if(val == 0){ pgImage = loadImage("images/0cosmic.gif");
  } else if(val == 1){ pgImage = loadImage("images/1cruise.gif");
  } else if(val == 2){ pgImage = loadImage("images/2clouds.gif");
  } else if(val == 3){ pgImage = loadImage("images/3earth.gif");
  } else if(val == 4){ pgImage = loadImage("images/4moon.gif");
  } else if(val == 5){ pgImage = loadImage("images/5thumbsup.gif");
  } else if(val == 6){ pgImage = loadImage("images/6flowers.gif");
  } else if(val == 7){ pgImage = loadImage("images/7stars.gif");
  } else if(val == 8){ pgImage = loadImage("images/8texture.gif");
  } else if(val == 9){ pgImage = loadImage("images/9storm.gif");
  } else if(val == 10){ pgImage = loadImage("images/10eva.gif");
  } else if(val == 11){ pgImage = loadImage("images/11robotech.gif");
  } else if(val == 12){ pgImage = loadImage("images/12macross.gif");
  } else if(val == 13){ pgImage = loadImage("images/13waves.gif");
  }
}

function setColor(keyNum, val){
  if(keyNum == 0){
    bkgdColor = color(val);
    document.body.style.backgroundColor = color(val);
  } else if(keyNum == 1){
    foreColor = color(val);
  }

  drawTextures();
}

function invertColor(){
  var c1 = bkgdColor;
  var c2 = foreColor;

  bkgdColor = c2;
  foreColor = c1;

  document.getElementById("bColor").value = c2;
  document.getElementById("fColor").value = c1;

  document.body.style.backgroundColor = c2;

  drawTextures();
}

var loadFile0 = function(event) {
  var image0 = document.getElementById('output');
  image0.src = URL.createObjectURL(event.target.files[0]);
  pgImage = loadImage(image0.src);
}

function recordSwitch(){
  recordToggle = !recordToggle;

  if(recordToggle){
    document.getElementById("recordButton").style.background = "red";
    document.getElementById("recordButton").style.color = "white";
    document.getElementById("recordButton").textContent = "RECORDING";
  } else if(recordToggle == false){
    document.getElementById("recordButton").style.background = "white";
    document.getElementById("recordButton").style.color = "red";
    document.getElementById("recordButton").textContent = "RECORD";
  }
}
