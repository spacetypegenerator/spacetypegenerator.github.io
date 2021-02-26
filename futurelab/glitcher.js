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

  glitchWindow = int(random(40/glitch,80/glitch));
  glitchPace = int(random(10,30));
}

function cylinderGlitch(){
  let pieAngle = -2*PI/pieSlices;
  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  radius = (heightRatio * textureRepeats)/(2*PI);
  let latWaveOffset = (2*PI*waveCount)/pieSlices;
  let segmentLength = (2*PI*radius)/pieSlices;

  if(glitchClicker<glitchPace){
    push();
    translate(0,-(stackCount*stackHeight + (stackCount-1)*stackSpace)/2,0);

    // glitch jump
    if(glitchSelect[0][0]<glitchProb*1.5){
      let oX = map(glitchAmount[0][0],0,100,-radius/16,radius/16);
      let oY = map(glitchAmount[0][1],0,100,-stackHeight/2,stackHeight/2);
      let oZ = map(glitchAmount[0][2],0,100,-radius/16,radius/16);
      translate(oX,oY,oZ);
    }

    let spinSection = (2*PI)/textureRepeats;
    rotateY(-(frameCount)*speedWave);

    textureMode(NORMAL);

    for(var p = 0; p<2; p++){ // 0 back, 1 front
        let neuR = radius + 1;

          for(var st = 0; st< stackCount; st++){
            if(glitchSelect[1][st]<glitchProb){

            if(glitchSelect[2][st]<glitchProb){
              blendMode(BLEND);
            } else {
              blendMode(SCREEN);
            }

            if(glitchSelect[3][st]<glitchProb/5){
              texture(pgTG[st]);
            } else if(glitchSelect[3][st]<glitchProb*2/5){
              fill(255);
            } else if(glitchSelect[3][st]<glitchProb*3/5){
              fill(0);
            } else if(glitchSelect[3][st]<glitchProb*4/5){
              texture(pgTransp);
            } else {
              texture(pgT);
            }

            push();
            let oX = map(glitchAmount[1][st],0,100,-radius/16,radius/16);
            let oY = map(glitchAmount[2][st],0,100,-stackHeight/4,stackHeight/4);
            let oZ = map(glitchAmount[3][st],0,100,-radius/16,radius/16);
            translate(oX,oY,oZ);

            if(glitchSelect[8][st]<glitchProb){
              neuR += map(glitchAmount[10][st],0,100,-radius/32,radius/32);
            }

            beginShape(TRIANGLE_STRIP);

            var neuStart = ((frameCount + 10)*speedWave)/pieAdjust - cameraYrot/pieAdjust;
            neuStart += map(glitchAmount[8][st] + glitchBuild,0,100,0,pieSlices/2);

            var neuEnd = map(glitchAmount[9][st] + glitchBuild,0,100,0,pieSlices/2);

            for(var ps = p*(pieSlices/2) + neuStart;  ps<= (p+1)*(pieSlices/2) + neuStart - neuEnd; ps++){
              var waverTop = sinEngine(ps, latWaveOffset, st, stWaveOffset, speedWave, 1) * cylLatWave;
              var waverBot = sinEngine(ps, latWaveOffset, st+1, stWaveOffset, speedWave, 1) * cylLatWave;

              var waverTopLong = sinEngine(0, 0, st, stWaveOffset, speedWave, 1) * cylLongWave;
              var waverBotLong = sinEngine(0, 0, st+1, stWaveOffset, speedWave, 1) * cylLongWave;

              var waverSurface = sinEngine2(ps, latWaveOffset, st, stWaveOffset, (st%2)*secretSwitch, PI, speedWave, 1) * surfaceWave;

              var xTop = cos(ps*pieAngle) * (neuR + waverTop + waverTopLong);
              var xBot = cos(ps*pieAngle) * (neuR + waverBot + waverBotLong);
              var yTop = st * stackHeight + st*stackSpace + waverSurface;
              var yBot = (st+1) * stackHeight + st*stackSpace + waverSurface;
              var zTop = sin(ps*pieAngle) * (neuR + waverTop);
              var zBot = sin(ps*pieAngle) * (neuR + waverBot);

              if(glitchSelect[5][st]<glitchProb){
                yTop += map(glitchAmount[4][st] + glitchBuild,0,100,0,stackHeight);
              }
              if(glitchSelect[6][st]<glitchProb){
                yBot += map(glitchAmount[5][st] + glitchBuild,0,100,0,-stackHeight/4);
              }

              let u = map((ps*segmentLength + st*stackOffset)%heightRatio,0,heightRatio,0,1);

              if(glitchSelect[7][st]<glitchProb){
                vertex(xTop,yTop,zTop,u,0);
                vertex(xBot,yBot,zBot,u,0.5);
              } else {
                vertex(xTop,yTop,zTop,u,0);
                vertex(xBot,yBot,zBot,u,1);
              }

              if((ps*segmentLength + st*stackOffset)%heightRatio > heightRatio - segmentLength){
                vertex(xTop,yTop,zTop,0,0);
                vertex(xBot,yBot,zBot,0,1);
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

function fieldGlitch(){
  let pgW = pgT.width; let pgH = pgT.height;
  let heightRatio = pgW * stackHeight/pgH;
  let stripLength = heightRatio * fieldTextureRepeats;
  let xCount = pieSlices * fieldTextureRepeats;
  let xSpace = stripLength/xCount;
  let ySpace = stackHeight;

  if(glitchClicker<glitchPace){
    push();
    translate(-stripLength/2, -(fieldStackCount*stackHeight + (fieldStackCount-1)*fieldStackSpace)/2,0);

    for(var y = 0; y<fieldStackCount; y++){
      if(glitchSelect[y][0]<glitchProb){
        // glitch jump
        if(glitchSelect[y][1]<glitchProb){
          let oX = map(glitchAmount[y][0],0,100,-stackHeight/4,stackHeight/16);
          let oY = map(glitchAmount[y][1],0,100,-stackHeight/2,stackHeight/2);
          let oZ = map(glitchAmount[y][2],0,100,-stackHeight,stackHeight);
          translate(oX,oY,oZ);
        }

        textureMode(NORMAL);

        if(glitchSelect[2][y]<glitchProb){
          blendMode(BLEND);
        } else {
          blendMode(SCREEN);
        }

        if(glitchSelect[4][y]<glitchProb/4){
          texture(pgTG[y]);
        } else if(glitchSelect[4][y]<glitchProb/2){
          fill(255);
        } else if(glitchSelect[4][y]<glitchProb*3/4){
          fill(0);
        } else if(glitchSelect[4][y]<glitchProb*4/5){
           texture(pgTransp);
        } else {
          texture(pgT);
        }

        beginShape(TRIANGLE_STRIP);

        var neuStart = map(glitchAmount[8][y] + glitchBuild,0,100,0,xCount/2);

        var neuEnd = map(glitchAmount[9][y] + glitchBuild,0,100,0,xCount/2);

        for(var x = 0 + neuStart; x <= xCount - neuEnd; x++){
          let yScaleWave = sinEngine2(x,fieldLatOffset,y,fieldLongOffset, (y%2)*secretSwitch, PI, speedWave, 1) * fieldYScale/2;

          let mainX = x * xSpace;
          let mainY = y * ySpace + sinEngine(x,fieldLatOffset,y,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace + yScaleWave;
          let mainZ = sinEngine(x,fieldLatOffset,y,fieldLongOffset, speedWave, 1) * zAxisWave;

          let mainYbot = (y+1) * ySpace + sinEngine(x,fieldLatOffset,y+1,fieldLongOffset, speedWave, 1) * yAxisWave + y * fieldStackSpace -yScaleWave;
          let mainZbot = sinEngine(x,fieldLatOffset,y+1,fieldLongOffset, speedWave, 1) * zAxisWave;

          if(glitchSelect[5][y]<glitchProb){
            mainY += map(glitchAmount[4][y] + glitchBuild,0,100,0,stackHeight);
          }
          if(glitchSelect[6][y]<glitchProb){
            mainYbot += map(glitchAmount[5][y] + glitchBuild,0,100,0,-stackHeight/4);
          }

          let u = map((x*xSpace + y*fieldStackOffset)%heightRatio,0,heightRatio,0,1);

          if(glitchSelect[7][y]<glitchProb){
            vertex(mainX,mainY,mainZ,u,0);
            vertex(mainX,mainYbot,mainZbot,u,0.5);
          } else {
            vertex(mainX,mainY,mainZ,u,0);
            vertex(mainX,mainYbot,mainZbot,u,1);
          }

          if((x*xSpace + y*fieldStackOffset)%heightRatio >= heightRatio-xSpace){
            vertex(mainX,mainY,mainZ, 0,0);
            vertex(mainX,mainYbot,mainZbot, 0,1);
          }
        }
        endShape();
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

        if(glitchSelect[(k*3)%30][(i*3)%30]<glitchProb){
          if(glitchSelect[k%30][i%30]<glitchProb/3){
            fill(0);
            var xBump = map(glitchAmount[(k+3)%30][(i+3)%30],0,100,0,30);
            var yBump = map(glitchAmount[(k+4)%30][(i+4)%30],0,100,0,30);
            var xScaleBump = map(glitchAmount[(k+7)%30][(i+7)%30],0,100,-2,2);
            var yScaleBump = map(glitchAmount[(k+8)%30][(i+8)%30],0,100,-2,2);

            rect(xBump, typeYfigure + glitchBuild + yBump, mainInd[k][i].width * xScaleBump, typeYfigure * yScaleBump);
          } else if(glitchSelect[k%30][i%30]<glitchProb * 2/3){
            fill(255);
            var xBump = map(glitchAmount[(k+5)%30][(i+5)%30],0,100,0,30);
            var yBump = map(glitchAmount[(k+6)%30][(i+6)%30],0,100,0,30);
            var xScaleBump = map(glitchAmount[(k+9)%30][(i+9)%30],0,100,-2,2);
            var yScaleBump = map(glitchAmount[(k+10)%30][(i+10)%30],0,100,-2,2);

            rect(xBump, yBump + glitchBuild, mainInd[k][i].width * xScaleBump, typeYfigure * yScaleBump);
          } else {
            image(mainInd[k][i],0,glitchBuild,mainInd[k][i].width,typeYfigure);
          }
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

          if(glitchSelect[(m*3)%30][((rows-n)*3)%30]<glitchProb){
            if(glitchSelect[m%30][(rows-n)%30]<glitchProb/3){
              fill(0);
              var xBump = map(glitchAmount[(m+3)%30][((rows-n)+3)%30],0,100,0,30);
              var yBump = map(glitchAmount[(m+4)%30][((rows-n)+4)%30],0,100,0,30);
              var xScaleBump = map(glitchAmount[(m+7)%30][((rows-n)+7)%30],0,100,-2,2);
              var yScaleBump = map(glitchAmount[(m+8)%30][((rows-n)+8)%30],0,100,-2,2);

              rect(xBump, typeYfigure + glitchBuild + yBump, mainInd[m][(rows-n)].width * xScaleBump, typeYfigure * yScaleBump);
            } else if(glitchSelect[m%30][(rows-n)%30]<glitchProb * 2/3){
              fill(255);
              var xBump = map(glitchAmount[(m+5)%30][((rows-n)+5)%30],0,100,0,30);
              var yBump = map(glitchAmount[(m+6)%30][((rows-n)+6)%30],0,100,0,30);
              var xScaleBump = map(glitchAmount[(m+9)%30][((rows-n)+9)%30],0,100,-2,2);
              var yScaleBump = map(glitchAmount[(m+10)%30][((rows-n)+10)%30],0,100,-2,2);

              rect(xBump, yBump + glitchBuild, mainInd[m][(rows-n)].width * xScaleBump, typeYfigure * yScaleBump);
            } else {
              image(mainInd[m][(rows-n)],0,glitchBuild,mainInd[m][(rows-n)].width,typeYfigure);
            }
          }
          translate(0,typeYfigure);
        }
        pop();
        translate(mainInd[m][0].width,0);
      }
    }
  }
}
