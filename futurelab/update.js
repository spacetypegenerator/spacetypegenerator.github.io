///////////////////////////////////////////////////////////////////////////////// BUTTONS

function change_showHideClass() {
  var modalChange = document.getElementById("about");
  var currentClass = modalChange.className; // Check the current class name
  if (currentClass == "show") {
    // if it is set to show,
    modalChange.className = "hide"; // then now set it to hide
  } else {
    modalChange.className = "show"; // Otherwise, show it!
  }
}

function initializeRecord(){
  if(saveSize==0){
    wWidth = 1080;
    wHeight = 1080;
  } else if (saveSize==1){
    wWidth = 1536;
    wHeight = 864; //1536,864
  }

  resizeCanvas(wWidth,wHeight);

  recordSwitch = true;

  if(generatorSelect==2){
    recordStop = (2*PI)/(speedWave/2) + frameCount + 2;
  } else {
    recordStop = (2*PI)/speedWave + frameCount + 2;
    //recordStop = frameCount + 10;
  }

  startRecording({
    // preset:"veryfast",
    crf:26,
    // we're passing in 'onProgress' as a parameter to get status feedback on-screen - this is completely optional and you'd also get this info on the console!
    // onProgress: (progress) => document.querySelector('#download').textContent = `PROGRESS: ${(100 * progress).toFixed(1)}%`,
    onProgress: function(progress){
      document.querySelector('#download').textContent = `PROGRESS: ${(100 * progress).toFixed(1)}%`;
      // if(progress>0.99){
      //   print(true);
      //   document.querySelector('#download').textContent = 'DOWNLOAD LOOP';
      // }
    },
    onFinish: (recordedBlobs) => downloadThis(recordedBlobs),
  });
}
//
function downloadThis(recordedBlobs){
  const name = 'futurelab_stg_recording.mp4';
  const blob = new Blob([recordedBlobs.buffer], { type: 'video/mp4' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  }, 100);
  document.querySelector('#download').textContent = 'DOWNLOAD LOOP';
}

///////////////////////////////////////////////////////////////////////////////// RESETS

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
  textureRepeats = 2; document.getElementById('textureRepeats').value = 2;
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

function redrawStackCylinder(){
  for(let r = 0; r<stackCount; r++){
    createTextGradient(r,stackCount);
    createTextGradientInside(r,stackCount);
  }
}

function redrawStackField(){
  for(let r = 0; r<fieldStackCount; r++){
    createTextGradient(r,fieldStackCount);
    createTextGradientInside(r,fieldStackCount);
  }
}

function redrawStackCascade(){
  drawInds();
}

///////////////////////////////////////////////////////////////////////////////// CYLINDER PRESETS

function setSingle(){
  resetView();
  resetCylinder();

  document.getElementById('glitch1').value=glitch;

  // mainText1 = "BEYOND IMMEDIATE HORIZONS"; document.getElementById('mainText').value = "BEYOND IMMEDIATE HORIZONS";
  drawTextures();

  textureRepeats = 1; document.getElementById('textureRepeats').value = 1;
  stackCount = 1; document.getElementById('stackCount').value = 1;
  stackSpace = 0; document.getElementById('stackSpace').value = 0;
  waveCount = 0; document.getElementById('waveCount').value = 0;

  cameraXrot = PI/16; document.getElementById('cameraX').value = PI/16;

  redrawStackCylinder();
}

function setSimple(){
  resetView();
  resetCylinder();

  cylLatWave = map(33,0,100,0,radius); document.getElementById('cylLatWave').value=33;
  stWaveOffset = map(40,0,100,0,1); document.getElementById('stWaveOffset').value = 40;

  cameraXrot = PI/8; document.getElementById('cameraX').value = PI/8;

  redrawStackCylinder();
}

function setJellyfish(){
  resetView();
  resetCylinder();

  stackOffset = map(15,0,100,0,pgT.width); document.getElementById('stackOffset').value = 15;
  cylLatWave = map(40,0,100,0,radius); document.getElementById('cylLatWave').value=40;
  waveCount = 0; document.getElementById('waveCount').value = 0;
  stWaveOffset = map(33,0,100,0,1); document.getElementById('stWaveOffset').value = 33;

  cameraXrot = PI/8; document.getElementById('cameraX').value = PI/8;

  redrawStackCylinder();
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

  redrawStackCylinder();
}

function setWeave(){
  resetView();
  resetCylinder();

  textureRepeats = 1; document.getElementById('textureRepeats').value = 1;
  stackCount = 7; document.getElementById('stackCount').value = 7;
  stackSpace = 160; document.getElementById('stackSpace').value = 160;
  waveCount = 4; document.getElementById('waveCount').value = 4;
  surfaceWave = 80;  document.getElementById('surfaceWave').value=80;

  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;

  secretSwitch = 1;

  redrawStackCylinder();
}

function setHoops(){
  resetView();
  resetCylinder();

  textureRepeats = 1; document.getElementById('textureRepeats').value = 1;
  stackCount = 7; document.getElementById('stackCount').value = 7;
  stackSpace = 180; document.getElementById('stackSpace').value = 180;
  waveCount = 1; document.getElementById('waveCount').value = 1;
  surfaceWave = 200;  document.getElementById('surfaceWave').value = 200;
  stWaveOffset = map(95,0,100,0,1); document.getElementById('stWaveOffset').value = 95;

  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;

  redrawStackCylinder();
}

///////////////////////////////////////////////////////////////////////////////// FIELD PRESETS


function setStacks(){
  resetView();
  resetField();

  document.getElementById('glitch2').value=glitch;

  // mainText1 = "BEYOND IMMEDIATE HORIZONS"; document.getElementById('mainText').value = "BEYOND IMMEDIATE HORIZONS";
  drawTextures();

  fieldTextureRepeats = 1; document.getElementById('fieldTextureRepeats').value = 1;
  fieldStackCount = 8; document.getElementById('fieldStackCount').value = 8;
  fieldStackSpace = 25; document.getElementById('fieldStackSpace').value = 25;
  fieldStackOffset = map(15,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 15;

  yAxisWave = 250; document.getElementById('yAxisWave').value = 250;
  fieldLatOffset = map(60,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 60;

  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;

  redrawStackField();
}

function setSimpleField(){
  resetView();
  resetField();

  fieldTextureRepeats = 1; document.getElementById('fieldTextureRepeats').value = 1;
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

  redrawStackField();
}

function setComplexField(){
  resetView();
  resetField();

  fieldTextureRepeats = 1; document.getElementById('fieldTextureRepeats').value = 1;
  fieldStackCount = 12; document.getElementById('fieldStackCount').value = 12;
  fieldStackSpace = 25; document.getElementById('fieldStackSpace').value = 25;
  fieldStackOffset = map(10,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 10;

  yAxisWave = 220; document.getElementById('yAxisWave').value = 220;
  zAxisWave = 50; document.getElementById('zAxisWave').value = 50;
  fieldLatOffset = map(33,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 33;
  fieldLongOffset = map(15,0,100,0,5); document.getElementById('fieldLongOffset').value = 15;

  cameraXrot = 0.65; document.getElementById('cameraX').value = 0.65;
  cameraZrot = 0.6; document.getElementById('cameraZ').value = 0.6;
  cameraZoom = -2000; document.getElementById('cameraZoom').value = -2000;

  redrawStackField();
}

function setHarlequin(){
  resetView();
  resetField();

  fieldTextureRepeats = 1; document.getElementById('fieldTextureRepeats').value = 1;
  fieldStackCount = 11; document.getElementById('fieldStackCount').value = 11;
  fieldStackSpace = 10; document.getElementById('fieldStackSpace').value = 10;
  fieldStackOffset = map(0,0,100,0,pgT.width); document.getElementById('fieldStackOffset').value = 0;

  yAxisWave = 0; document.getElementById('yAxisWave').value = 0;
  zAxisWave = 0; document.getElementById('zAxisWave').value = 0;
  fieldYScale = map(50,0,100,0,pgT.height); document.getElementById('fieldYScale').value = 50;
  fieldLatOffset = map(100,0,100,0,0.05); document.getElementById('fieldLatOffset').value = 100;
  fieldLongOffset = map(0,0,100,0,5); document.getElementById('fieldLongOffset').value = 0;

  cameraZoom = -1000; document.getElementById('cameraZoom').value = -1000;

  redrawStackField();
}

///////////////////////////////////////////////////////////////////////////////// CASCADE PRESETS

function setCascade(){
  resetView();

  // mainText1 = "FUTURE"; document.getElementById('mainText').value = "FUTURE";
  drawInds();
  drawTextures();

  document.getElementById('glitch3').value=glitch;

  cascadeRows = 30; document.getElementById('cascadeRows').value = 30;
  casOffset = map(50,0,100,0,2); document.getElementById('casOffset').value = 50;
  casSlope = map(80,0,100,0,2*PI); document.getElementById('casSlope').value = 80;
  mirrorSwitch = false; document.getElementById('cascadeMirror').value = 1;

  cameraZoom = -800; document.getElementById('cameraZoom').value = -800;

  redrawStackCascade();
}

function setRun(){
  resetView();

  // mainText1 = "FUTURE LAB"; document.getElementById('mainText').value = "FUTURE LAB";
  drawInds();
  drawTextures();

  cascadeRows = 16; document.getElementById('cascadeRows').value = 16;
  casOffset = map(0,0,100,0,2); document.getElementById('casOffset').value = 0;
  casSlope = map(50,0,100,0,2*PI); document.getElementById('casSlope').value = 50;
  mirrorSwitch = true; document.getElementById('cascadeMirror').value = 2;

  cameraZoom = 0; document.getElementById('cameraZoom').value = 0;

  redrawStackCascade();
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

function updateTextureRepeats(val) {
    document.getElementById('textureRepeats').innerHTML=val;
    textureRepeats = val;
}

function updateStackCount(val) {
    document.getElementById('stackCount').innerHTML=val;
    stackCount = val;

    redrawStackCylinder();
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

    redrawStackField();
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

    drawInds();
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
  typeCselect = 1;
  redrawAllStacks();
}

function setTC2(){
  typeCselect = 2;
  redrawAllStacks();
}

function setTC3(){
  typeCselect = 3;
  redrawAllStacks();
}

function setTC4(){
  typeCselect = 4;
  redrawAllStacks();
}

function setTC5(){
  typeCselect = 5;
  redrawAllStacks();
}

function redrawAllStacks(){
  if(generatorSelect==0){
    redrawStackCylinder();
  } else if(generatorSelect==1){
    redrawStackField();
  } else if(generatorSelect==2){
    redrawStackCascade();
  }
}

function setBC1(){
  invertCSS(1);
  backCselect = 1;
}

function setBC2(){
  invertCSS(1);
  backCselect = 2;
}

function setBC3(){
  invertCSS(1);
  backCselect = 3;
}

function setBC4(){
  invertCSS(0);
  backCselect = 4;
}

function setBC5(){
  invertCSS(1);
  backCselect = 5;
}

function invertCSS(toggle){
  if(toggle==0){
    document.getElementById('inverter').style.filter = "invert(100%)";
    document.getElementById('invertertopleft').style.filter = "invert(100%)";
    document.getElementById('invertertopright').style.filter = "invert(100%)";
    document.getElementById('inverterbottomleft').style.filter = "invert(100%)";
    document.getElementById('inverterbottomright').style.filter = "invert(100%)";
    document.getElementById('invertertoggle1').style.filter = "invert(100%)";
    document.getElementById('invertertoggle2').style.filter = "invert(100%)";
    document.getElementById('invertertoggle3').style.filter = "invert(100%)";
    document.getElementById('invertertoggle4').style.filter = "invert(100%)";
    document.getElementById('invertertoggle5').style.filter = "invert(100%)";
    document.getElementById('invertertoggle6').style.filter = "invert(100%)";
    document.getElementById('invertertoggle7').style.filter = "invert(100%)";
    document.getElementById('invertertoggle8').style.filter = "invert(100%)";
    document.getElementById('invertertoggle9').style.filter = "invert(100%)";
    document.getElementById('invertertoggle10').style.filter = "invert(100%)";
  } else if(toggle==1){
    document.getElementById('inverter').style.filter = "invert(0%)";
    document.getElementById('invertertopleft').style.filter = "invert(0%)";
    document.getElementById('invertertopright').style.filter = "invert(0%)";
    document.getElementById('inverterbottomleft').style.filter = "invert(0%)";
    document.getElementById('inverterbottomright').style.filter = "invert(0%)";
    document.getElementById('invertertoggle1').style.filter = "invert(0%)";
    document.getElementById('invertertoggle2').style.filter = "invert(0%)";
    document.getElementById('invertertoggle3').style.filter = "invert(0%)";
    document.getElementById('invertertoggle4').style.filter = "invert(0%)";
    document.getElementById('invertertoggle5').style.filter = "invert(0%)";
    document.getElementById('invertertoggle6').style.filter = "invert(0%)";
    document.getElementById('invertertoggle7').style.filter = "invert(0%)";
    document.getElementById('invertertoggle8').style.filter = "invert(0%)";
    document.getElementById('invertertoggle9').style.filter = "invert(0%)";
    document.getElementById('invertertoggle10').style.filter = "invert(0%)";

  }

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

///////////////////////////////////////////////////////////////////////////////// GLITCH
function updateGlitch1(val) {
    document.getElementById('glitch1').innerHTML=val;
    glitch = val;

    refreshGlitch();
}

function updateGlitch2(val) {
    document.getElementById('glitch2').innerHTML=val;
    glitch = val;

    refreshGlitch();
}

function updateGlitch3(val) {
    document.getElementById('glitch3').innerHTML=val;
    glitch = val;

    refreshGlitch();
}

function refreshGlitch(){
  if(glitch==0){
    glitchOn = false;
  } else {
    glitchOn = true;
  }

  glitchProb = map(glitch,0,10,50,85);
  glitchWindow = map(glitch,0,10,80,20);

  generateRandom();
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

function changeSizes(element){
  saveSize = element.value;
  print(saveSize);
  alphaSave = 200;
}

function changeLogo(a){
  if(a==0){
    document.getElementById("fllogo").src="resources/houseBlue.png";
  } else if(a==1){
    document.getElementById("fllogo").src="resources/houseWhite.png";
  } else if(a==2){
    document.getElementById("fllogo").src="resources/houseBlueInv.png";
  }
}
