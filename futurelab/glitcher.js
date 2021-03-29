function generateRandom(){
  for(var s = 0; s<30; s++){
    glitchSelect[s] = [];
    glitchAmount[s] = [];
    for(var r = 0; r<30; r++){
      var rs = random(100);
      glitchSelect[s][r] = rs;
      var rs2 = random(100);
      glitchAmount[s][r] = rs2;
    }
  }

  // glitchWindow = int(random(50/glitch,100/glitch));
  glitchPace = int(random(20,50));
}

//// Version Two
function cylinderGlitch(){
   if(glitchClicker<glitchPace){

    let pieAngle = -2*PI/pieSlices;
    let pgW = pgT.width; let pgH = pgT.height;
    let heightRatio = pgW * stackHeight/pgH;
    radius = (heightRatio * textureRepeats)/(2*PI);
    let latWaveOffset = (2*PI*waveCount)/pieSlices;
    let segmentLength = (2*PI*radius)/pieSlices;

    push();
    translate(0,-(stackCount*stackHeight + (stackCount-1)*stackSpace)/2,0);

    // glitch jump
    if(glitchSelect[10][0]<glitchProb){
      let oY = map(glitchAmount[10][1],0,100,-stackHeight/8,stackHeight/8);
      translate(0,oY,0);
    }

    let spinSection = (2*PI)/textureRepeats;
    rotateY(-(frameCount)*speedWave);

    textureMode(NORMAL);

    for(var st = 0; st< stackCount; st++){
      if(glitchSelect[st][0]<glitchProb){
        var neuRadius = radius + map(glitchAmount[st][2],0,100,0,radius/50);

        for(var t = 0; t<3; t++){ // repeats
          var neuStackStart = map(glitchAmount[st][3],0,100,0,stackHeight/2);
          var neuStackHeight = map(glitchAmount[st][4],0,100,0,(stackHeight - neuStackStart)/3);

          texture(pgTG[st]);

          push();

          beginShape(TRIANGLE_STRIP);

          var neuStart = ((frameCount + 10)*speedWave)/pieAdjust - cameraYrot/pieAdjust;
          var neuEnd = 0;

          var topSt = map(neuStackStart + t*neuStackHeight,0,stackHeight,0,1);
          var botSt = map(neuStackStart + (t+1)*neuStackHeight,0,stackHeight,0,1);

          for(var ps = neuStart;  ps<= pieSlices + neuStart - neuEnd; ps++){
            var waverTop = sinEngine(ps, latWaveOffset, st + topSt, stWaveOffset, speedWave, 1) * cylLatWave;
            var waverBot = sinEngine(ps, latWaveOffset, st + botSt, stWaveOffset, speedWave, 1) * cylLatWave;

            var waverTopLong = sinEngine(0, 0, st + topSt, stWaveOffset, speedWave, 1) * cylLongWave;
            var waverBotLong = sinEngine(0, 0, st + botSt, stWaveOffset, speedWave, 1) * cylLongWave;

            var waverSurface = sinEngine2(ps, latWaveOffset, st, stWaveOffset, (st%2)*secretSwitch, PI, speedWave, 1) * surfaceWave;

            var xTop = cos(ps*pieAngle) * (neuRadius + waverTop + waverTopLong);
            var xBot = cos(ps*pieAngle) * (neuRadius + waverBot + waverBotLong);
            var yTop = neuStackStart + st * stackHeight + t * neuStackHeight + st*stackSpace + waverSurface;
            var yBot = neuStackStart + st * stackHeight + (t+1) * neuStackHeight + st*stackSpace + waverSurface;
            var zTop = sin(ps*pieAngle) * (neuRadius + waverTop);
            var zBot = sin(ps*pieAngle) * (neuRadius + waverBot);

            let u = map((ps*segmentLength + st*stackOffset + glitchBuild*t)%heightRatio,0,heightRatio,0,1);

            let vTop = topSt;
            let vBot = botSt;
            vertex(xTop, yTop, zTop, u, vTop);
            vertex(xBot, yBot, zBot, u, vBot);

            if((ps*segmentLength + st*stackOffset + glitchBuild*t)%heightRatio > heightRatio - segmentLength){
              vertex(xTop,yTop,zTop,0, vTop);
              vertex(xBot,yBot,zBot,0, vBot);
              }
            }
            endShape();

            pop();
          }
        }
      }
    pop();
  }
}

//// Version Two
function fieldGlitch(){
  if(glitchClicker<glitchPace){

    let pgW = pgT.width; let pgH = pgT.height;
    let heightRatio = pgW * stackHeight/pgH;
    let stripLength = heightRatio * fieldTextureRepeats;
    let xCount = pieSlices * fieldTextureRepeats;
    let xSpace = stripLength/xCount;
    let ySpace = stackHeight;

    push();
    translate(-stripLength/2, -(fieldStackCount*stackHeight + (fieldStackCount-1)*fieldStackSpace)/2,0);

    for(var y = 0; y<fieldStackCount; y++){
      if(glitchSelect[y][0]<glitchProb){
        // glitch jump
        if(glitchSelect[y][1]<glitchProb){
          let oX = map(glitchAmount[y][0],0,100,-stackHeight/16,stackHeight/16);
          let oY = map(glitchAmount[y][1],0,100,-stackHeight/16,stackHeight/16);
          let oZ = map(glitchAmount[y][2],0,100,0,stackHeight/8);
          translate(oX,oY,oZ);
        }

        for(var t = 0; t<3; t++){
          var neuYStart = map(glitchAmount[y][3],0,100,0,ySpace/2);
          var neuYSpace = map(glitchAmount[y][4],0,100,0,(ySpace - neuYStart)/3);

          textureMode(NORMAL);
          texture(pgTG[y]);


          beginShape(TRIANGLE_STRIP);

          // var neuStart = map(glitchAmount[8][y] + glitchBuild,0,100,0,xCount/2);
          // var neuEnd = map(glitchAmount[9][y] + glitchBuild,0,100,0,xCount/2);
          var neuStart = 0;
          var neuEnd = 0;

          var topSt = map(neuYStart + t*neuYSpace,0,ySpace,0,1);
          var botSt = map(neuYStart + (t+1)*neuYSpace,0,ySpace,0,1);

          for(var x = 0 + neuStart; x <= xCount - neuEnd; x++){
            let yScaleWave = sinEngine2(x, fieldLatOffset, y, fieldLongOffset, (y%2)*secretSwitch, PI, speedWave, 1) * fieldYScale/2;

            let mainX = x * xSpace;
            let mainY = y*ySpace + neuYStart + t * neuYSpace + sinEngine(x,fieldLatOffset, y + topSt,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace + yScaleWave;
            let mainZ = sinEngine(x,fieldLatOffset, y + topSt, fieldLongOffset, speedWave, 1) * zAxisWave;

            let mainYbot = y*ySpace + neuYStart + (t+1) * neuYSpace+ sinEngine(x,fieldLatOffset, y + botSt,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace - yScaleWave;
            let mainZbot = sinEngine(x,fieldLatOffset, y + botSt, fieldLongOffset, speedWave, 1) * zAxisWave;

            let u = map((x*xSpace + y*fieldStackOffset + glitchBuild*t)%heightRatio,0,heightRatio,0,1);

            let vTop = topSt;
            let vBot = botSt;

            vertex(mainX,mainY,mainZ,u,vTop);
            vertex(mainX,mainYbot,mainZbot,u,botSt);

            if((x*xSpace + y*fieldStackOffset + glitchBuild*t)%heightRatio >= heightRatio-xSpace){
              vertex(mainX,mainY,mainZ, 0,vTop);
              vertex(mainX,mainYbot,mainZbot, 0,botSt);
            }
          }
          endShape();
        }
      }
    }
    pop();
  }
}

function cascadeGlitch(){
  let rows = parseInt(cascadeRows);
  let step = (sq(rows)+rows)/2;
  waveBlock = 2*PI/rows;
  if(mirrorSwitch == true){
    yBlock = height/(step*2);
  } else {
     yBlock = height/step;
  }

  if(glitchClicker<glitchPace){
    push();
    translate(-pgT.width/2,0);
    translate(0,-height/2);

    for(var k = 0; k<mainText1.length; k++){
      push();
      for(var i = 0; i<rows; i++){
        typeYfigure = map(sinEngine(i,waveBlock,k,casOffset,speedWave/2,casSlope),-1,1,yBlock,rows*yBlock);

        var xBump = map(glitchAmount[(k*3)%30][(i*3)%30],0,100,-mainInd[k][i].width/4,mainInd[k][i].width/4);

        if(glitchSelect[(k*3)%30][(i*3)%30]<glitchProb/2){
          image(mainInd[k][i],xBump,glitchBuild/2,mainInd[k][i].width,typeYfigure);
        }
        translate(0,typeYfigure);
      }
      pop();
      translate(mainInd[k][0].width,0);
    }
    pop();

    if(mirrorSwitch){
      push();
      translate(-pgT.width/2,0);
      for(var m = 0; m<mainText1.length; m++){
        push();
        for(var n = 1; n<rows+1; n++){
          typeYfigure = map(sinEngine(rows-n,waveBlock,m,casOffset,speedWave/2,casSlope),-1,1,yBlock,rows*yBlock);

          var xBump = map(glitchAmount[(m*3)%30][((rows-n)*3)%30],0,100,-mainInd[m][rows-n].width/4,mainInd[m][rows-n].width/4);

          if(glitchSelect[(m*3)%30][((rows-n)*3)%30]<glitchProb/2){
            image(mainInd[m][(rows-n)],0,glitchBuild,mainInd[m][(rows-n)].width,typeYfigure);
          }
          translate(0,typeYfigure);
        }
        pop();
        translate(mainInd[m][0].width,0);
      }
      pop();
    }
  }
}

///////// VERSION one
// function cylinderGlitch(){
//   let pieAngle = -2*PI/pieSlices;
//   let pgW = pgT.width; let pgH = pgT.height;
//   let heightRatio = pgW * stackHeight/pgH;
//   radius = (heightRatio * textureRepeats)/(2*PI);
//   let latWaveOffset = (2*PI*waveCount)/pieSlices;
//   let segmentLength = (2*PI*radius)/pieSlices;
//
//   if(glitchClicker<glitchPace){
//     push();
//     translate(0,-(stackCount*stackHeight + (stackCount-1)*stackSpace)/2,0);
//
//     // glitch jump
//     if(glitchSelect[0][0]<glitchProb){
//       let oX = map(glitchAmount[0][0],0,100,-radius/32,radius/32);
//       let oY = map(glitchAmount[0][1],0,100,-stackHeight/8,stackHeight/8);
//       let oZ = map(glitchAmount[0][2],0,100,-radius/32,radius/32);
//       translate(oX,oY,oZ);
//     }
//
//     let spinSection = (2*PI)/textureRepeats;
//     rotateY(-(frameCount)*speedWave);
//
//     textureMode(NORMAL);
//
//     for(var t = 0; t<3; t++){ // repeats
//       for(var p = 0; p<2; p++){ // 0 back, 1 front
//         let neuR = radius + 1;
//
//           for(var st = 0; st< stackCount; st++){
//             let glitchPixel = map(glitchAmount[6][st],0,100,0,stackHeight/4);
//
//             if(glitchSelect[1][st]<glitchProb){
//               texture(pgTG[st]);
//
//               push();
//               let oX = map(glitchAmount[1][st],0,100,-radius/32,radius/32);
//               let oY = map(glitchAmount[2][st],0,100,-stackHeight/16,stackHeight/16);
//               let oZ = map(glitchAmount[3][st],0,100,-radius/32,radius/32);
//               translate(oX,oY,oZ);
//
//               // if(glitchSelect[8][st]<glitchProb){
//               //   neuR += map(glitchAmount[10][st],0,100,-radius/32,radius/32);
//               // }
//
//               beginShape(TRIANGLE_STRIP);
//
//               var neuStart = ((frameCount + 10)*speedWave)/pieAdjust - cameraYrot/pieAdjust;
//               neuStart += map(glitchAmount[8][st] + glitchBuild,0,100,0,pieSlices/2);
//
//               var neuEnd = map(glitchAmount[9][st] + glitchBuild,0,100,0,pieSlices/2);
//
//               for(var ps = p*(pieSlices/2) + neuStart;  ps<= (p+1)*(pieSlices/2) + neuStart - neuEnd; ps++){
//                 var waverTop = sinEngine(ps, latWaveOffset, st, stWaveOffset, speedWave, 1) * cylLatWave;
//                 var waverBot = sinEngine(ps, latWaveOffset, st+1, stWaveOffset, speedWave, 1) * cylLatWave;
//
//                 var waverTopLong = sinEngine(0, 0, st, stWaveOffset, speedWave, 1) * cylLongWave;
//                 var waverBotLong = sinEngine(0, 0, st+1, stWaveOffset, speedWave, 1) * cylLongWave;
//
//                 var waverSurface = sinEngine2(ps, latWaveOffset, st, stWaveOffset, (st%2)*secretSwitch, PI, speedWave, 1) * surfaceWave;
//
//                 var xTop = cos(ps*pieAngle) * (neuR + waverTop + waverTopLong);
//                 var xBot = cos(ps*pieAngle) * (neuR + waverBot + waverBotLong);
//                 var yTop = st * stackHeight + st*stackSpace + waverSurface;
//                 var yBot = yTop + stackHeight;
//                 var zTop = sin(ps*pieAngle) * (neuR + waverTop);
//                 var zBot = sin(ps*pieAngle) * (neuR + waverBot);
//
//                 yTop += map(glitchAmount[4][st] + glitchBuild,0,100,0,stackHeight/2);
//                 yTop += t * glitchPixel;
//
//                 yBot = yTop + glitchPixel;
//
//                 let u = map((ps*segmentLength + st*stackOffset + t * glitchBuild)%heightRatio,0,heightRatio,0,1);
//
//                 let vTop = t * 0.1;
//                 let vBot = (t+1) * 0.1;
//                 vertex(xTop, yTop, zTop, u, vTop);
//                 vertex(xBot, yBot, zBot, u, vBot);
//
//                 if((ps*segmentLength + st*stackOffset + t * glitchBuild)%heightRatio > heightRatio - segmentLength){
//                   vertex(xTop,yTop,zTop,0, vTop);
//                   vertex(xBot,yBot,zBot,0, vBot);
//                   }
//                 }
//                 endShape();
//
//                 pop();
//               }
//             }
//           }
//         }
//     pop();
//   }
// }

///////// VERSION one
// function fieldGlitch(){
//   let pgW = pgT.width; let pgH = pgT.height;
//   let heightRatio = pgW * stackHeight/pgH;
//   let stripLength = heightRatio * fieldTextureRepeats;
//   let xCount = pieSlices * fieldTextureRepeats;
//   let xSpace = stripLength/xCount;
//   let ySpace = stackHeight;
//
//   if(glitchClicker<glitchPace){
//     push();
//     translate(-stripLength/2, -(fieldStackCount*stackHeight + (fieldStackCount-1)*fieldStackSpace)/2,0);
//
//     for(var y = 0; y<fieldStackCount; y++){
//       if(glitchSelect[y][0]<glitchProb){
//         // glitch jump
//         if(glitchSelect[y][1]<glitchProb){
//           let oX = map(glitchAmount[y][0],0,100,-stackHeight/4,stackHeight/16);
//           let oY = map(glitchAmount[y][1],0,100,-stackHeight/2,stackHeight/2);
//           let oZ = map(glitchAmount[y][2],0,100,-stackHeight,stackHeight);
//           translate(oX,oY,oZ);
//         }
//
//         textureMode(NORMAL);
//
//         if(glitchSelect[2][y]<glitchProb){
//           blendMode(BLEND);
//         } else {
//           blendMode(SCREEN);
//         }
//
//         if(glitchSelect[4][y]<glitchProb/4){
//           texture(pgTG[y]);
//         } else if(glitchSelect[4][y]<glitchProb/2){
//           fill(255);
//         } else if(glitchSelect[4][y]<glitchProb*3/4){
//           fill(0);
//         } else {
//           texture(pgT);
//         }
//
//         beginShape(TRIANGLE_STRIP);
//
//         var neuStart = map(glitchAmount[8][y] + glitchBuild,0,100,0,xCount/2);
//
//         var neuEnd = map(glitchAmount[9][y] + glitchBuild,0,100,0,xCount/2);
//
//         for(var x = 0 + neuStart; x <= xCount - neuEnd; x++){
//           let yScaleWave = sinEngine2(x,fieldLatOffset,y,fieldLongOffset, (y%2)*secretSwitch, PI, speedWave, 1) * fieldYScale/2;
//
//           let mainX = x * xSpace;
//           let mainY = y * ySpace + sinEngine(x,fieldLatOffset,y,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace + yScaleWave;
//           let mainZ = sinEngine(x,fieldLatOffset,y,fieldLongOffset, speedWave, 1) * zAxisWave;
//
//           let mainYbot = (y+1) * ySpace + sinEngine(x,fieldLatOffset,y+1,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace -yScaleWave;
//           let mainZbot = sinEngine(x,fieldLatOffset,y+1,fieldLongOffset, speedWave, 1) * zAxisWave;
//
//           if(glitchSelect[5][y]<glitchProb){
//             mainY += map(glitchAmount[4][y] + glitchBuild,0,100,0,stackHeight);
//           }
//           if(glitchSelect[6][y]<glitchProb){
//             mainYbot += map(glitchAmount[5][y] + glitchBuild,0,100,0,-stackHeight/4);
//           }
//
//           let u = map((x*xSpace + y*fieldStackOffset)%heightRatio,0,heightRatio,0,1);
//
//           if(glitchSelect[7][y]<glitchProb){
//             vertex(mainX,mainY,mainZ,u,0);
//             vertex(mainX,mainYbot,mainZbot,u,0.5);
//           } else {
//             vertex(mainX,mainY,mainZ,u,0);
//             vertex(mainX,mainYbot,mainZbot,u,1);
//           }
//
//           if((x*xSpace + y*fieldStackOffset)%heightRatio >= heightRatio-xSpace){
//             vertex(mainX,mainY,mainZ, 0,0);
//             vertex(mainX,mainYbot,mainZbot, 0,1);
//           }
//         }
//         endShape();
//       }
//     }
//     pop();
//   }
// }
