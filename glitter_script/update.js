function setText(){
  // print("text set!");

  var enteredText = document.getElementById("text0").value;
  // inputText = enteredText;

  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    print("SHORT EXECUTED! and inputText is " + inputText);
    inputText = [];
    inputText[0] = " ";
  }

  findMaxSize();

  emitters = [];
  for(var m = 0; m < inputText.length; m++){
    // drawText(m, inputText[m], tFont[0]);
    // makeNode(m);

    makePoints(m);
  }

  print(emitters.length);
}

//////////////////////////////////////////////
////////////////////////////       MAKE POINTS
//////////////////////////////////////////////

function makePoints(m){
  textSize(pgTextSize);
  textFont(tFont[0]);

  let thesePoints = tFont[0].textToPoints(inputText[m], 0, 0, pgTextSize, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });

  // print("TEXT IS: " + inputText[m] + " and this many points were made: " + thesePoints.length);

  var lineHeight = pgTextSize * pgTextFactor[fontSelect];
  
  var nudgeY = lineHeight - typeCoreH/2 + m * (lineHeight + leading);

  

  var nudgeX = -textWidth(inputText[m])/2;

  for(var n = 0; n < thesePoints.length; n++){
    var x = thesePoints[n].x + nudgeX;
    var y = thesePoints[n].y + nudgeY;
    // node[node.length] = {
    //   x: thesePoints[n].x - textWidth(inputText[m])/2,
    //   y: thesePoints[n].y + (pgTextSize * pgTextFactor)/2
    // }
    emitters[emitters.length] = new Emitter(x, y);
  }
}

//////////////////////////////////////////////
//////////////////////////////       FIND SIZE
//////////////////////////////////////////////

function findMaxSize(){
  textSize(100);
  textFont(tFont[fontSelect])
  
  ///////// FIND THE LONGEST LINE
  var longestLine = 0;
  var measurer = 0;
  for(var m = 0; m < inputText.length; m++){
    if(textWidth(inputText[m]) > measurer){
      longestLine = m;
      measurer = textWidth(inputText[m]);
    }
  }

  ///////// FIND THE SIZE THAT FILLS TO THE MAX WIDTH
  var widthTest = (width - 30) - inputText[longestLine].length;

  let sizeHolder = 10;
  textSize(sizeHolder);
  let holdW = textWidth(inputText[longestLine]);

  while(holdW < widthTest){
    textSize(sizeHolder);    
    holdW = textWidth(inputText[longestLine]);

    sizeHolder += 2;
  }

  ///////// MAKE SURE THE HEIGHT DOESN'T BRAKE THE HEIGHT
  var heightTest = (height - 30) - inputText.length * leading;
  let holdH = inputText.length * sizeHolder * pgTextFactor[fontSelect];
  while(holdH > heightTest){
    holdH = inputText.length * sizeHolder * pgTextFactor[fontSelect];
    sizeHolder -= 2;
  }

  pgTextSize = constrain(sizeHolder * textScaler, 12, 1000);

  textSize(pgTextSize);
  typeCoreW = textWidth(inputText[longestLine]);
  typeCoreH = (inputText.length * pgTextSize * pgTextFactor[fontSelect]) + (inputText.length) * leading;
}


function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}