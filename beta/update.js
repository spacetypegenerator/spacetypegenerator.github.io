$( function() {
  $( "#drag0" ).draggable(    {
          drag: function(){
              var offset = $(this).offset();
              xPos[0] = offset.left;
              yPos[0] = offset.top;
          }
  });
} );

$( function() {
  $( "#drag1" ).draggable(    {
          drag: function(){
              var offset = $(this).offset();
              xPos[1] = offset.left;
              yPos[1] = offset.top;
          }
  });
} );

$( function() {
  $( "#drag2" ).draggable(    {
          drag: function(){
              var offset = $(this).offset();
              xPos[2] = offset.left;
              yPos[2] = offset.top;
          }
  });
} );

$( function() {
  $( "#drag3" ).draggable(    {
          drag: function(){ var offset = $(this).offset(); xPos[3] = offset.left; yPos[3] = offset.top; } }); } );

$( function() {
  $( "#drag4" ).draggable(    {
          drag: function(){ var offset = $(this).offset(); xPos[4] = offset.left; yPos[4] = offset.top; } }); } );

$( function() {
  $( "#drag5" ).draggable(    {
          drag: function(){ var offset = $(this).offset(); xPos[5] = offset.left; yPos[5] = offset.top; } }); } );

$( function() {
  $( "#drag6" ).draggable(    {
          drag: function(){ var offset = $(this).offset(); xPos[6] = offset.left; yPos[6] = offset.top; } }); } );

$( function() {
  $( "#drag7" ).draggable(    {
          drag: function(){ var offset = $(this).offset(); xPos[7] = offset.left; yPos[7] = offset.top; } }); } );

$( function() {
  $( "#drag8" ).draggable(    {
          drag: function(){ var offset = $(this).offset(); xPos[8] = offset.left; yPos[8] = offset.top; } }); } );


function hideWidget(){
  widgetOn = !widgetOn;
  if(widgetOn==true){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function add_wc(){
  widgetCount++;

  if(widgetCount > maxWidgetCount){
    widgetCount = maxWidgetCount;
  }

  visibleWidgets();
}

function minus_wc(){
  widgetCount--;

  if(widgetCount<0){
    widgetCount = 0;
  }
  visibleWidgets();
}

function visibleWidgets(){
  if(widgetCount==0){
    document.getElementById('drag0').style.display = "none";
  } else if(widgetCount==1){
    document.getElementById('drag0').style.display = "block";
    document.getElementById('drag1').style.display = "none";
  } else if(widgetCount==2){
    document.getElementById('drag1').style.display = "block";
    document.getElementById('drag2').style.display = "none";
  } else if(widgetCount==3){
    document.getElementById('drag2').style.display = "block";
    document.getElementById('drag3').style.display = "none";
  } else if(widgetCount==4){
    document.getElementById('drag3').style.display = "block";
    document.getElementById('drag4').style.display = "none";
  } else if(widgetCount==5){
    document.getElementById('drag4').style.display = "block";
    document.getElementById('drag5').style.display = "none";
  } else if(widgetCount==6){
    document.getElementById('drag5').style.display = "block";
    document.getElementById('drag6').style.display = "none";
  } else if(widgetCount==7){
    document.getElementById('drag6').style.display = "block";
    document.getElementById('drag7').style.display = "none";
  } else if(widgetCount==8){
    document.getElementById('drag7').style.display = "block";
    document.getElementById('drag8').style.display = "none";
  } else if(widgetCount==9){
    document.getElementById('drag8').style.display = "block";
  }

  drawTextures();
}

///////////////////////////////// set 0 unit
function setText(keyNum, val){
  // document.getElementById('text'+keyNum).value=val;
  textEntry[keyNum] = val + " ";
  pgTexture(keyNum);
  pgTextureInside(keyNum);

  for(var c = 0; c<textEntry[keyNum].length; c++){
    pgTextureInd(keyNum,c);
  }
}

function setGenerator(keyNum, val){
  // document.getElementById('generator'+keyNum).value=val;
  generatorSelect[keyNum] = val;
}

function setFont(keyNum, val){
  // document.getElementById('font'+keyNum).value=val;
  fontSelect[keyNum] = val;
  pgTexture(keyNum);
  pgTextureInside(keyNum);

  for(var c = 0; c<textEntry[keyNum].length; c++){
    pgTextureInd(keyNum,c);
  }
}

function setRepeat(keyNum, val){
  // document.getElementById('repeats'+keyNum).value=val;
  repeats[keyNum] = val;
}

function setGenScale(keyNum, val){
  // document.getElementById('genScale'+keyNum).value=val;
  genScale[keyNum] = map(val,0,100,0,4);
}

function setOptA(keyNum,val){
  // document.getElementById('optA'+keyNum).value=val;
  optA[keyNum] = val;
}
function setOptB(keyNum,val){
  // document.getElementById('optB'+keyNum).value=val;
  optB[keyNum] = val;
}

function setTColor(keyNum,val){
  // document.getElementById('tColor'+keyNum).value=val;
  tColor[keyNum] = val;
  pgTexture(keyNum);
  pgTextureInside(keyNum);
  drawIndividuals(keyNum);
}

function setUMove(keyNum){
  uMove[keyNum] = !uMove[keyNum];
}

function swapSet(keyNum, val){
  if(val.value==0){
    document.getElementById('textMode' + keyNum).style.display = "block";
    document.getElementById('imageMode' + keyNum).style.display = "none";
    imageOn[keyNum]  = false;
  } else if(val.value==1){
    document.getElementById('imageMode' + keyNum).style.display = "block";
    document.getElementById('textMode' + keyNum).style.display = "none";
    if(img[keyNum]){
      imageOn[keyNum]  = true;
    }
  }
}

function setBColorOn(keyNum){
  bColorOn[keyNum] =! bColorOn[keyNum];
  pgTexture(keyNum);
  pgTextureInside(keyNum);
  drawIndividuals(keyNum);
}

function setBColor(keyNum,val){
  bColor[keyNum] = val;
  pgTexture(keyNum);
  pgTextureInside(keyNum);
  drawIndividuals(keyNum);
}

function setImageSize(keyNum, val){
  // document.getElementById('imageSize' + keyNum).value=val;
  imageSize[keyNum] = map(val,1,100,1,1000);
}

function setImageWaveCount(keyNum, val){
  // document.getElementById('imageWaveCount' + keyNum).value=val;
  imageWaveCount[keyNum] = map(val,1,100,0,10);
}

function setImageWaveSize(keyNum, val){
  // document.getElementById('imageWaveSize' + keyNum).value=val;
  imageWaveSize[keyNum] = map(val,1,100,0,400);
}

function setImageRot(keyNum, val){
  // document.getElementById('imageRot' + keyNum).value=val;
  imageRot[keyNum] = map(val,1,100,-PI,PI);
}


/////////// load files
var loadFile0 = function(event) {
  var image0 = document.getElementById('output');
  image0.src = URL.createObjectURL(event.target.files[0]);
  imageOn[0] = true;  img[0] = loadImage(image0.src);
}

var loadFile1 = function(event) {
  var image1 = document.getElementById('output');
  image1.src = URL.createObjectURL(event.target.files[0]);
  imageOn[1] = true;  img[1] = loadImage(image1.src);
}

var loadFile2 = function(event) {
  var image2 = document.getElementById('output');
  image2.src = URL.createObjectURL(event.target.files[0]);
  imageOn[2] = true;  img[2] = loadImage(image2.src);
}

var loadFile3 = function(event) {
  var image3 = document.getElementById('output');
  image3.src = URL.createObjectURL(event.target.files[0]);
  imageOn[3] = true;  img[3] = loadImage(image3.src);
}

var loadFile4 = function(event) {
  var image4 = document.getElementById('output');
  image4.src = URL.createObjectURL(event.target.files[0]);
  imageOn[4] = true;  img[4] = loadImage(image4.src);
}

var loadFile5 = function(event) {
  var image5 = document.getElementById('output');
  image5.src = URL.createObjectURL(event.target.files[0]);
  imageOn[5] = true;  img[5] = loadImage(image5.src);
}

var loadFile6 = function(event) {
  var image6 = document.getElementById('output');
  image6.src = URL.createObjectURL(event.target.files[0]);
  imageOn[6] = true;  img[6] = loadImage(image6.src);
}

var loadFile7 = function(event) {
  var image7 = document.getElementById('output');
  image7.src = URL.createObjectURL(event.target.files[0]);
  imageOn[7] = true;  img[7] = loadImage(image7.src);
}

var loadFile8 = function(event) {
  var image8 = document.getElementById('output');
  image8.src = URL.createObjectURL(event.target.files[0]);
  imageOn[8] = true;  img[8] = loadImage(image8.src);
}

/////////// bkgdColor
function setCcolor(val){
  bkgdColor = color(val);
}

function refreshTextures(){
  drawTextures();
}
