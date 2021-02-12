function resetRadius(){
  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  radius = (heightRatio * textureRepeats)/(2*PI);
}

function resetView(){
  cameraXrot = 0; document.getElementById('cameraX').value = 0;
  cameraYrot = 0; document.getElementById('cameraY').value = 0;
  cameraZrot = 0; document.getElementById('cameraZ').value = 0;
  cameraZoom = -500; document.getElementById('cameraZoom').value = -500;
}

function resetCylinder(){
  stackCount = 8; document.getElementById('stackCount').value = 8;
  textureRepeats = 3; document.getElementById('textureRepeats').value = 3;
  stackSpace = 0; document.getElementById('stackSpace').value = 0;
  stackOffset = map(5,0,100,0,pgT.width); document.getElementById('stackOffset').value = 5;

  resetRadius();

  cylLatWave = map(0,0,100,0,radius); document.getElementById('cylLatWave').value=0;
  cylLongWave = map(0,0,100,0,radius); document.getElementById('cylLongWave').value=0;
  waveCount = 2; document.getElementById('waveCount').value = 2;
  stWaveOffset = map(0,0,100,0,1); document.getElementById('stWaveOffset').value = 0;
  surfaceWave = 0;  document.getElementById('surfaceWave').value=0;

  secretSwitch = 0;
}

function resetField(){
  fieldTextureRepeats = 3; document.getElementById('fieldTextureRepeats').value = 3;
  fieldStackCount = 8; document.getElementById('fieldStackCount').value = 8;
  fieldStackSpace = 50; document.getElementById('fieldStackSpace').value = 50;
  fieldStackOffset = map(15,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 15;

  yAxisWave = 250; document.getElementById('yAxisWave').value = 250;
  zAxisWave = 0; document.getElementById('zAxisWave').value = 0;
  fieldYScale = map(0,0,100,0,pgT.height); document.getElementById('fieldYScale').value = 0;
  fieldLatOffset = map(25,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 25;
  fieldLongOffset = map(0,0,100,0,5); document.getElementById('fieldLongOffset').value = 0;

  secretSwitch = 1;
}

function resetCascade(){
  cameraZoom = 0; document.getElementById('cameraZoom').value = 0;

  drawInds();
}

///////////////////////////////////////////////////////////////////////////////// CYLINDER PRESETS

function setSimple(){
  resetView();
  resetCylinder();

  cylLatWave = map(33,0,100,0,radius); document.getElementById('cylLatWave').value=33;
  stWaveOffset = map(40,0,100,0,1); document.getElementById('stWaveOffset').value = 40;

  cameraXrot = PI/8; document.getElementById('cameraX').value = PI/8;
}

function setJellyfish(){
  resetView();
  resetCylinder();

  stackOffset = map(15,0,100,0,pgT.width); document.getElementById('stackOffset').value = 15;
  cylLatWave = map(40,0,100,0,radius); document.getElementById('cylLatWave').value=40;
  waveCount = 0; document.getElementById('waveCount').value = 0;
  stWaveOffset = map(33,0,100,0,1); document.getElementById('stWaveOffset').value = 33;

  cameraXrot = PI/8; document.getElementById('cameraX').value = PI/8;
}

function setComplex(){
  resetView();
  resetCylinder();

  stackOffset = map(15,0,100,0,pgT.width); document.getElementById('stackOffset').value = 15;
  stackCount = 12; document.getElementById('stackCount').value = 12;

  cylLatWave = map(15,0,100,0,radius); document.getElementById('cylLatWave').value=15;
  cylLongWave = map(40,0,100,0,radius); document.getElementById('cylLongWave').value=40;
  waveCount = 5; document.getElementById('waveCount').value = 5;
  stWaveOffset = map(55,0,100,0,1); document.getElementById('stWaveOffset').value = 55;

  cameraXrot = -0.44; document.getElementById('cameraX').value = -0.44;
  cameraZrot = 0.44; document.getElementById('cameraZ').value = 0.44;
  cameraZoom = -1500; document.getElementById('cameraZoom').value = -1500;
}

function setWeave(){
  resetView();
  resetCylinder();

  textureRepeats = 4; document.getElementById('textureRepeats').value = 4;
  stackCount = 7; document.getElementById('stackCount').value = 7;
  stackSpace = 160; document.getElementById('stackSpace').value = 160;
  waveCount = 4; document.getElementById('waveCount').value = 4;
  surfaceWave = 80;  document.getElementById('surfaceWave').value=80;

  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;

  secretSwitch = 1;
}

function setHoops(){
  resetView();
  resetCylinder();

  textureRepeats = 4; document.getElementById('textureRepeats').value = 4;
  stackCount = 7; document.getElementById('stackCount').value = 7;
  stackSpace = 180; document.getElementById('stackSpace').value = 180;
  waveCount = 1; document.getElementById('waveCount').value = 1;
  surfaceWave = 200;  document.getElementById('surfaceWave').value = 200;
  stWaveOffset = map(95,0,100,0,1); document.getElementById('stWaveOffset').value = 95;

  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;
}

///////////////////////////////////////////////////////////////////////////////// FIELD PRESETS


function setStacks(){
  resetView();
  resetField();

  fieldTextureRepeats = 3; document.getElementById('fieldTextureRepeats').value = 3;
  fieldStackCount = 8; document.getElementById('fieldStackCount').value = 8;
  fieldStackSpace = 25; document.getElementById('fieldStackSpace').value = 25;
  fieldStackOffset = map(15,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 15;

  yAxisWave = 250; document.getElementById('yAxisWave').value = 250;
  fieldLatOffset = map(25,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 25;

  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;
}

function setSimpleField(){
  resetView();
  resetField();

  fieldTextureRepeats = 2; document.getElementById('fieldTextureRepeats').value = 2;
  fieldStackCount = 16; document.getElementById('fieldStackCount').value = 16;
  fieldStackSpace = 0; document.getElementById('fieldStackSpace').value = 0;
  fieldStackOffset = map(50,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 50;

  yAxisWave = 0; document.getElementById('yAxisWave').value = 0;
  zAxisWave = 100; document.getElementById('zAxisWave').value = 100;
  fieldLatOffset = map(50,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 50;
  fieldLongOffset = map(12,0,100,0,5); document.getElementById('fieldLongOffset').value = 12;

  cameraXrot = 0.75; document.getElementById('cameraX').value = 0.75;
  cameraZrot = 0.75; document.getElementById('cameraZ').value = 0.75;
  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;
}

function setComplexField(){
  resetView();
  resetField();

  fieldTextureRepeats = 2; document.getElementById('fieldTextureRepeats').value = 2;
  fieldStackCount = 8; document.getElementById('fieldStackCount').value = 8;
  fieldStackSpace = 25; document.getElementById('fieldStackSpace').value = 25;
  fieldStackOffset = map(10,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 10;

  yAxisWave = 220; document.getElementById('yAxisWave').value = 220;
  zAxisWave = 50; document.getElementById('zAxisWave').value = 50;
  fieldLatOffset = map(33,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 33;
  fieldLongOffset = map(15,0,100,0,5); document.getElementById('fieldLongOffset').value = 15;

  cameraXrot = 0.65; document.getElementById('cameraX').value = 0.65;
  cameraZrot = 0.6; document.getElementById('cameraZ').value = 0.6;
  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;
}

function setHarlequin(){
  resetView();
  resetField();

  fieldTextureRepeats = 2; document.getElementById('fieldTextureRepeats').value = 2;
  fieldStackCount = 7; document.getElementById('fieldStackCount').value = 7;
  fieldStackSpace = 10; document.getElementById('fieldStackSpace').value = 10;
  fieldStackOffset = map(0,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 0;

  yAxisWave = 0; document.getElementById('yAxisWave').value = 0;
  zAxisWave = 0; document.getElementById('zAxisWave').value = 0;
  fieldYScale = map(50,0,100,0,pgT.height); document.getElementById('fieldYScale').value = 50;
  fieldLatOffset = map(100,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 100;
  fieldLongOffset = map(0,0,100,0,5); document.getElementById('fieldLongOffset').value = 0;

  cameraZoom = -1000; document.getElementById('cameraZoom').value = -1000;
}

///////////////////////////////////////////////////////////////////////////////// FIELD PRESETS

function setCascade(){
  resetView();

  mainText1 = "FUTURE"; document.getElementById('mainText').value = "FUTURE";
  drawInds();
  drawTextures();

  cascadeRows = 30; document.getElementById('cascadeRows').value = 30;
  casOffset = map(50,0,100,0,2); document.getElementById('casOffset').value = 50;
  casSlope = map(80,0,100,0,2*PI); document.getElementById('casSlope').value = 80;
  mirrorSwitch = false; document.getElementById('cascadeMirror').value = 1;

  cameraZoom = 0; document.getElementById('cameraZoom').value = 0;
}

function setRun(){
  resetView();

  mainText1 = "FUTURE LAB"; document.getElementById('mainText').value = "FUTURE LAB";
  drawInds();
  drawTextures();

  cascadeRows = 16; document.getElementById('cascadeRows').value = 16;
  casOffset = map(0,0,100,0,2); document.getElementById('casOffset').value = 0;
  casSlope = map(50,0,100,0,2*PI); document.getElementById('casSlope').value = 50;
  mirrorSwitch = true; document.getElementById('cascadeMirror').value = 2;

  cameraZoom = 0; document.getElementById('cameraZoom').value = 0;
}

///////////////////////////////////////////////////////////////////////////////// UPDATE SLIDERS

function updateText(val) {
    document.getElementById('mainText').innerHTML=val;
    mainText1 = val;
    drawTextures();
    resetRadius();
    if(generatorSelect==2){
      drawInds();
    }
}

///////////////////////////////////////////////////////////////////////////////// CYLINDER

function updateStackCount(val) {
    document.getElementById('stackCount').innerHTML=val;
    stackCount = val;
}

function updateTextureRepeats(val) {
    document.getElementById('textureRepeats').innerHTML=val;
    textureRepeats = val;
}

function updateStackSpace(val) {
    document.getElementById('stackSpace').innerHTML=val;
    stackSpace = val;
}

function updateStackOffset(val) {
    document.getElementById('stackOffset').innerHTML=val;
    stackOffset = map(val,0,100,0,pgT.width);
}

function updateCylLatWave(val) {
    document.getElementById('cylLatWave').innerHTML=val;
    cylLatWave = map(val,0,100,0,radius);
}

function updateCylLongWave(val) {
    document.getElementById('cylLongWave').innerHTML=val;
    cylLongWave = map(val,0,100,0,radius);
}

function updateSurfaceWave(val) {
    document.getElementById('surfaceWave').innerHTML=val;
    surfaceWave = val;
}

function updateWaveCount(val) {
    document.getElementById('waveCount').innerHTML=val;
    waveCount = val;
}

function updateWaveOffset(val) {
    document.getElementById('stWaveOffset').innerHTML=val;
    stWaveOffset = map(val,0,100,0,1);
}

///////////////////////////////////////////////////////////////////////////////// FIELD
function updateFieldStackCount(val) {
    document.getElementById('fieldStackCount').innerHTML=val;
    fieldStackCount = val;
}

function updateFieldTextureRepeats(val) {
    document.getElementById('fieldTextureRepeats').innerHTML=val;
    fieldTextureRepeats = val;
}

function updateFieldStackSpace(val) {
    document.getElementById('fieldStackSpace').innerHTML=val;
    fieldStackSpace = val;
}

function updateFieldStackOffset(val) {
    document.getElementById('fieldStackOffset').innerHTML=val;
    fieldStackOffset = map(val,0,100,0,pgT.width);
}

function updateyAxisWave(val) {
    document.getElementById('yAxisWave').innerHTML=val;
    yAxisWave = val;
}

function updatezAxisWave(val) {
    document.getElementById('zAxisWave').innerHTML=val;
    zAxisWave = val;
}

function updateFieldLatOffset(val) {
    document.getElementById('fieldLatOffset').innerHTML=val;
    fieldLatOffset = map(val,0,100,0,0.05);
}

function updateFieldLongOffset(val) {
    document.getElementById('fieldLongOffset').innerHTML=val;
    fieldLongOffset = map(val,0,100,0,5);
}

function updateFieldYScale(val) {
    document.getElementById('fieldYScale').innerHTML=val;
    fieldYScale = map(val,0,100,0,pgT.height);
}

///////////////////////////////////////////////////////////////////////////////// CASCADE
function updateCascadeRows(val) {
    document.getElementById('cascadeRows').innerHTML=val;
    cascadeRows = val;
}

function updateCascadeMirror(val) {
    document.getElementById('cascadeMirror').innerHTML=val;
    if(val==1){
      mirrorSwitch = false;
    } else {
      mirrorSwitch = true;
    }
}

function updateCasOffset(val) {
    document.getElementById('casOffset').innerHTML=val;
    casOffset = map(val,0,100,0,2);
}

function updateCasSlope(val) {
    document.getElementById('casSlope').innerHTML=val;
    casSlope = map(val,0,100,0,2*PI);
}

///////////////////////////////////////////////////////////////////////////////// COLORS
function setTC1(){
  setBCblack();
  backCselect = 5; document.getElementById("back5").checked = true;

  typeCselect = 1;
}

function setTC2(){
  setBCblack();
  backCselect = 5; document.getElementById("back5").checked = true;

  typeCselect = 2;
}

function setTC3(){
  setBCblack();
  backCselect = 5; document.getElementById("back5").checked = true;

  typeCselect = 3;
}

function setTC4(){
  setBCblack();
  backCselect = 5; document.getElementById("back5").checked = true;

  typeCselect = 4;
}

function setTC5(){
  setBCwhite();
  backCselect = 4; document.getElementById("back4").checked = true;

  typeCselect = 5;
}

function setBC1(){
  setBCblack();
  typeCselect = 4; document.getElementById("type4").checked = true;

  backCselect = 1;
}

function setBC2(){
  setBCblack();
  typeCselect = 4; document.getElementById("type4").checked = true;

  backCselect = 2;
}

function setBC3(){
  setBCblack();
  typeCselect = 4; document.getElementById("type4").checked = true;

  backCselect = 3;
}

function setBC4(){
  setBCwhite();
  typeCselect = 5; document.getElementById("type5").checked = true;

  backCselect = 4;
}

function setBC5(){
  setBCblack();
  typeCselect = 4; document.getElementById("type4").checked = true;

  backCselect = 5;
}

function setBCblack(){
  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  drawTextures()
  drawInds();
}

function setBCwhite(){
  bkgdColor = color('#ffffff');
  foreColor = color('#000000');

  drawTextures()
  drawInds();
}
///////////////////////////////////////////////////////////////////////////////// CAMERA
function updateXrot(val) {
    document.getElementById('cameraX').innerHTML=val;
    cameraXrot = val;
}

function updateYrot(val) {
    document.getElementById('cameraY').innerHTML=val;
    cameraYrot = val;
}

function updateZrot(val) {
    document.getElementById('cameraZ').innerHTML=val;
    cameraZrot = val;
}

function updateZzoom(val) {
    document.getElementById('cameraZoom').innerHTML=val;
    cameraZoom = val;
}

function showPresets(element){
  if(element.value==0){
    document.getElementById('button-group-cylinder').style.display = "block";
    document.getElementById('button-group-field').style.display = "none";
    document.getElementById('button-group-cascade').style.display = "none";

    document.getElementById('major-cylinder-slider-container').style.display = "flex";
    document.getElementById('major-field-slider-container').style.display = "none";
    document.getElementById('major-cascade-slider-container').style.display = "none";

    setSimple();

    generatorSelect = 0;
  } else if(element.value==1){
    document.getElementById('button-group-cylinder').style.display = "none";
    document.getElementById('button-group-field').style.display = "block";
    document.getElementById('button-group-cascade').style.display = "none";

    document.getElementById('major-cylinder-slider-container').style.display = "none";
    document.getElementById('major-field-slider-container').style.display = "flex";
    document.getElementById('major-cascade-slider-container').style.display = "none";

    setStacks();

    generatorSelect = 1;
  } else {
    document.getElementById('button-group-cylinder').style.display = "none";
    document.getElementById('button-group-field').style.display = "none";
    document.getElementById('button-group-cascade').style.display = "block";

    document.getElementById('major-cylinder-slider-container').style.display = "none";
    document.getElementById('major-field-slider-container').style.display = "none";
    document.getElementById('major-cascade-slider-container').style.display = "flex";

    setCascade();

    generatorSelect = 2;
  }
}
