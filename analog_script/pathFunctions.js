function groupByContour(cmds) {
  contours = [];
  current = [];
  for (let cmd of cmds) {
    current.push(cmd);
    if (cmd.type == 'Z') {
      contours.push(current);
      current = [];
    }
  }
  return contours;
}

function drawPathShapes(cmds) {
  // start position of current contour
  let startX = 0;
  let startY = 0;

  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':       // MOVE TO THIS SPOT
        // beginShape();
        vertex(cmd.x, cmd.y)
        startX = cmd.x;
        startY = cmd.y;
        break;
      case 'L':     // LINE TO THIS SPOT
        vertex(cmd.x, cmd.y);
        break;
      case 'C':     // BEZIER TO THIS SPOT
        bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        break;
      case 'Q':
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        break;
      case 'Z':     // CLOSE AT THIS SPOT
        vertex(startX, startY);
        // endShape();
        break;
    }
  }
}

function clockwise(cmds) {
  let sum = 0;
  for (let i = 0; i < cmds.length - 1; i++) {
    let a = cmds[i];
    let b = cmds[i+1];
    if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
      continue;
    }
    sum += (b.x - a.x) * (b.y + a.y);
  }
  return sum < 0;
}


function drawFinalLetters(newCmds){
  for(var n = 0; n<newCmds.length; n++){
    if(clockwise(newCmds[n])){
      beginShape();
      drawPathShapes(newCmds[n]);
      if(n != newCmds.length-1 && !clockwise(newCmds[n+1])){
        beginContour();
        drawPathShapes(newCmds[n+1]);
        endContour();
        if(n != newCmds.length-2 && !clockwise(newCmds[n+2])){
          beginContour();
          drawPathShapes(newCmds[n+2]);
          endContour();
        }
      }
    }
    if(clockwise(newCmds[n])){
      endShape();
    }
  }
}

function blendPaths(cmd1, cmd2, blendValue){
  var thisBlend = cmd1;

  // print(thisBlend[0][0].type);
  for(var p = 0; p < thisBlend.length; p++){
    for(var n = 0; n < thisBlend[p].length; n++){
      switch (thisBlend[p][n].type) {
        case 'M':       // MOVE TO THIS SPOT
          // beginShape();
          // vertex(cmd.x, cmd.y);
          thisBlend[p][n].x = lerp(cmd1[p][n].x, cmd2[p][n].x, blendValue);
          thisBlend[p][n].y = lerp(cmd1[p][n].y, cmd2[p][n].y, blendValue);
          break;
        case 'L':     // LINE TO THIS SPOT
          // vertex(cmd.x, cmd.y);
          thisBlend[p][n].x = lerp(cmd1[p][n].x, cmd2[p][n].x, blendValue);
          thisBlend[p][n].y = lerp(cmd1[p][n].y, cmd2[p][n].y, blendValue) ;
          break;
        case 'C':     // BEZIER TO THIS SPOT
          // bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
          thisBlend[p][n].x1 = lerp(cmd1[p][n].x1, cmd2[p][n].x1, blendValue);
          thisBlend[p][n].y1 = lerp(cmd1[p][n].y1, cmd2[p][n].y1, blendValue);
          thisBlend[p][n].x2 = lerp(cmd1[p][n].x2, cmd2[p][n].x2, blendValue);
          thisBlend[p][n].y2 = lerp(cmd1[p][n].y2, cmd2[p][n].y2, blendValue);
          thisBlend[p][n].x = lerp(cmd1[p][n].x, cmd2[p][n].x, blendValue);
          thisBlend[p][n].y = lerp(cmd1[p][n].y, cmd2[p][n].y, blendValue);
          break;
        case 'Q':
          // quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
          thisBlend[p][n].x1 = lerp(cmd1[p][n].x1, cmd2[p][n].x1, blendValue);
          thisBlend[p][n].y1 = lerp(cmd1[p][n].y1, cmd2[p][n].y1, blendValue);
          thisBlend[p][n].x = lerp(cmd1[p][n].x, cmd2[p][n].x, blendValue);
          thisBlend[p][n].y = lerp(cmd1[p][n].y, cmd2[p][n].y, blendValue);
          break;
        case 'Z':     // CLOSE AT THIS SPOT
          break;
      }
    }
  }

  return thisBlend;
}
