//////////////////////////////////////////////
/////////////////////////////       TEXT
//////////////////////////////////////////////

function pgTexture(m, n, blendStep, makeMode){
  var thisText = setKeyText(m, n);

  var thisFontSize = pgFontSize;
  var fontYbump = 0;
  if(fontMode == 2){
    // thisFontSize = pgFontSize * 0.7;
    // fontYbump = -pgFontSize * 0.0575;
    thisFontSize = pgFontSize - 7;
    fontYbump = 0;
  }
  textSize(thisFontSize);
  textFont(pgFontMax);
  var coreSizeMax = round(textWidth(thisText));
  textFont(pgFontMin);
  var coreSizeMin = round(textWidth(thisText));

  if(makeMode){
    pgT[m][n] = createGraphics(pgWidth, pgHeight);
  }

  var centerSpacerX = map(blendStep, 0, 1, coreSizeMin, coreSizeMax);
  var centerSpacerY = pgHeight/2 + thisFontSize * 0.7/2;

  // pgT[m][n].background(0,0,255);

  pgT[m][n].clear();

  var thisColor;
  if(textColorMode == 0){
    thisColor = colorA[0];
  } else if(textColorMode == 1){
    thisColor = lerpColor(colorA[0], colorA[3], blendStep);
  } else if(textColorMode == 2){
    if(blendStep < 0.25){
      thisColor = lerpColor(colorA[0], colorA[2], blendStep/0.25);
    } else {
      thisColor = lerpColor(colorA[2], colorA[3], (blendStep - 0.25)/0.75);
    }
  } else if(textColorMode == 3){
    if(blendStep < 0.2){
      thisColor = lerpColor(colorA[0], colorA[1], blendStep/0.2);
    } else if(blendStep < 0.6){
      thisColor = lerpColor(colorA[1], colorA[2], (blendStep - 0.2)/0.4);
    } else {
      thisColor = lerpColor(colorA[2], colorA[3], (blendStep - 0.6)/0.4);
    }
  }

  pgT[m][n].fill(thisColor);
  pgT[m][n].noStroke();

  if(fontMode == 0){
    pathMin = fFontMinCW.getPath(thisText, 0, 0, thisFontSize);
    pathMax = fFontMaxCW.getPath(thisText, 0, 0, thisFontSize);
  } else if(fontMode == 1){
    pathMin = fFontMinRight.getPath(thisText, 0, 0, thisFontSize);
    pathMax = fFontMaxRight.getPath(thisText, 0, 0, thisFontSize);
  } else if(fontMode == 2){
    pathMin = fFontMinSharp.getPath(thisText, 0, 0, thisFontSize);
    pathMax = fFontMaxSharp.getPath(thisText, 0, 0, thisFontSize);
  }

  var newCmdsMin = groupByContour(pathMin.commands);
  var newCmdsMax = groupByContour(pathMax.commands);
  newBlend = blendPaths(newCmdsMin, newCmdsMax, blendStep/1);

  pgT[m][n].push();
    // pgT.translate(pgT.width/2, pgT.height/2);
    pgT[m][n].translate(pgT[m][n].width/2, 0);
    pgT[m][n].translate(0, fontYbump);

    pgT[m][n].translate(-centerSpacerX/2, centerSpacerY);

    drawFinalLettersTexture(m, n, newBlend);
  pgT[m][n].pop();

}

function drawPathShapesTexture(m, n, cmds) {
  // start position of current contour
  let startX = 0;
  let startY = 0;

  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':       // MOVE TO THIS SPOT
        // beginShape();
        pgT[m][n].vertex(cmd.x, cmd.y)
        startX = cmd.x;
        startY = cmd.y;
        break;
      case 'L':     // LINE TO THIS SPOT
        pgT[m][n].vertex(cmd.x, cmd.y);
        break;
      case 'C':     // BEZIER TO THIS SPOT
        pgT[m][n].bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        break;
      case 'Q':
        pgT[m][n].quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        break;
      case 'Z':     // CLOSE AT THIS SPOT
        pgT[m][n].vertex(startX, startY);
        // endShape();
        break;
    }
  }
}

function drawFinalLettersTexture(m, n, newCmds){
  for(var p = 0; p<newCmds.length; p++){
    if(clockwise(newCmds[p])){
      pgT[m][n].beginShape();
      drawPathShapesTexture(m, n, newCmds[p]);
      if(p != newCmds.length-1 && !clockwise(newCmds[p+1])){
        pgT[m][n].beginContour();
        drawPathShapesTexture(m, n, newCmds[p+1]);
        pgT[m][n].endContour();
        if(p != newCmds.length-2 && !clockwise(newCmds[p+2])){
          pgT[m][n].beginContour();
          drawPathShapesTexture(m, n, newCmds[p+2]);
          pgT[m][n].endContour();
        }
      }
    }
    if(clockwise(newCmds[p])){
      pgT[m][n].endShape();
    }
  }
}

function setKeyText(m, n){
  var selectedText;

  if(fontMode == 0){
    if(m == 0){
      if(n == 0){
        selectedText = "12";
      } else if(n == 1){
        selectedText = "1";
      } else if(n == 2){
        selectedText = "2";
      } else if(n == 3){
        selectedText = "3";
      } else if(n == 4){
        selectedText = "4";
      } else if(n == 5){
        selectedText = "5";
      } else if(n == 6){
        selectedText = "6";
      } else if(n == 7){
        selectedText = "7";
      } else if(n == 8){
        selectedText = "8";
      } else if(n == 9){
        selectedText = "9";
      } else if(n == 10){
        selectedText = "10";
      } else if(n == 11){
        selectedText = "11";
      }
    } else if(m == 1 || m == 2){
      if(n == 0){
        selectedText = "60";
      } else if(n == 1){
        selectedText = "5";
      } else if(n == 2){
        selectedText = "10";
      } else if(n == 3){
        selectedText = "15";
      } else if(n == 4){
        selectedText = "20";
      } else if(n == 5){
        selectedText = "25";
      } else if(n == 6){
        selectedText = "30";
      } else if(n == 7){
        selectedText = "35";
      } else if(n == 8){
        selectedText = "40";
      } else if(n == 9){
        selectedText = "45";
      } else if(n == 10){
        selectedText = "50";
      } else if(n == 11){
        selectedText = "55";
      }
    }
  } else if(fontMode == 1){
    if(m == 0){
      if(n == 0){
        selectedText = "TWELVE";
      } else if(n == 1){
        selectedText = "ONE";
      } else if(n == 2){
        selectedText = "TWO";
      } else if(n == 3){
        selectedText = "THREE";
      } else if(n == 4){
        selectedText = "FOUR";
      } else if(n == 5){
        selectedText = "FIVE";
      } else if(n == 6){
        selectedText = "SIX";
      } else if(n == 7){
        selectedText = "SEVEN";
      } else if(n == 8){
        selectedText = "EIGHT";
      } else if(n == 9){
        selectedText = "NINE";
      } else if(n == 10){
        selectedText = "TEN";
      } else if(n == 11){
        selectedText = "ELEVEN";
      }
    } else {
      if(n == 0){
        selectedText = "SIXTY";
      } else if(n == 1){
        selectedText = "FIVE";
      } else if(n == 2){
        selectedText = "TEN";
      } else if(n == 3){
        selectedText = "FIFTEEN";
      } else if(n == 4){
        selectedText = "TWENTY";
      } else if(n == 5){
        selectedText = "TWENTY-FIVE";
      } else if(n == 6){
        selectedText = "THIRTY";
      } else if(n == 7){
        selectedText = "THIRTY-FIVE";
      } else if(n == 8){
        selectedText = "FORTY";
      } else if(n == 9){
        selectedText = "FORTY-FIVE";
      } else if(n == 10){
        selectedText = "FIFTY";
      } else if(n == 11){
        selectedText = "FIFTY-FIVE";
      }
    }
  } else if(fontMode == 2){
    if(m == 0){
      if(n == 0){
        selectedText = "Twelve";
      } else if(n == 1){
        selectedText = "One";
      } else if(n == 2){
        selectedText = "Two";
      } else if(n == 3){
        selectedText = "Three";
      } else if(n == 4){
        selectedText = "Four";
      } else if(n == 5){
        selectedText = "Five";
      } else if(n == 6){
        selectedText = "Six";
      } else if(n == 7){
        selectedText = "Seven";
      } else if(n == 8){
        selectedText = "Eight";
      } else if(n == 9){
        selectedText = "Nine";
      } else if(n == 10){
        selectedText = "Ten";
      } else if(n == 11){
        selectedText = "Eleven";
      }
    } else {
      if(n == 0){
        selectedText = "Sixty";
      } else if(n == 1){
        selectedText = "Five";
      } else if(n == 2){
        selectedText = "Ten";
      } else if(n == 3){
        selectedText = "Fifteen";
      } else if(n == 4){
        selectedText = "Twenty";
      } else if(n == 5){
        selectedText = "TwentyFive";
      } else if(n == 6){
        selectedText = "Thirty";
      } else if(n == 7){
        selectedText = "ThirtyFive";
      } else if(n == 8){
        selectedText = "Forty";
      } else if(n == 9){
        selectedText = "FortyFive";
      } else if(n == 10){
        selectedText = "Fifty";
      } else if(n == 11){
        selectedText = "FiftyFive";
      }
    }
    selectedText = selectedText.toUpperCase();
  }
  return selectedText;
}