class Cloud {
  constructor(ramp_, inp_){
    this.inp = inp_;
    
    this.pgTextSize = 2;
    this.findTextSize();

    this.x = [];
    this.xH = [];
    this.y = [];
    this.yH = [];
    this.yCore = [];
    this.yCoreMax = [];
    this.yCoreMax[0] = constrain(-this.pgTextSize, -height/2, 0);     /// back cloud
    this.yCoreMax[1] = this.pgTextSize * thisFontAdjust/2;     /// text
    this.yCoreMax[2] = constrain(this.pgTextSize, height/2, 0);     /// front cloud
    this.yCoreMin = [];
    this.yCoreMin[0] = constrain(-this.pgTextSize/2, -height/4, 0);
    this.yCoreMin[1] = this.pgTextSize * thisFontAdjust;
    this.yCoreMin[2] = constrain(this.pgTextSize/2, height/4, 0);


    this.cloudCount = 2;
    this.pointCount = 7;
    this.ang = 2*PI/this.pointCount;
    this.cloudW = width;
    this.cloudH = height/3;
    
    this.debrisCount = 10;

    this.xD = [];
    this.yD = [];
    this.xStart = [];
    this.yStart = [];
    this.xEnd = [];
    this.yEnd = [];
    this.rD = [];
    this.rStart = [];
    this.rEnd = [];

    this.sDw = [];
    this.sDh = [];

    this.cloudRefreshCount = 20;

    this.makeCloud();

    this.ticker = 0;

    this.ramp = ramp_;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    if(this.ramp==0){
      tk1 = easeOutCirc(tk0);
    } else if(this.ramp==1){
      tk1 = easeInCirc(tk0);
    }
    
    for(var m = 0; m < this.debrisCount; m++){
      this.xD[m] = map(tk1, 0, 1, this.xStart[m], this.xEnd[m]);
      this.yD[m] = map(tk1, 0, 1, this.yStart[m], this.yEnd[m]);
      this.rD[m] = map(tk1, 0, 1, this.rStart[m], this.rEnd[m]);
    }

    for(var m = 0; m < 3; m++){
      this.yCore[m] = map(tk1, 0, 1, this.yCoreMin[m], this.yCoreMax[m]);
    }
  }

  display(){
    background(bkgdColor);
    push();
      translate(width/2, height/2);
      
      //////////// BACK CLOUD

      push();
        translate(-50, this.yCore[0]);

        fill(bkgdColor);
        stroke(foreColor);
        strokeWeight(4);

        beginShape();
          vertex(this.x[0][0], this.y[0][0]);
          for(var n = 1; n < this.pointCount; n++){
            bezierVertex(this.xH[0][n-1], this.yH[0][n-1], this.xH[0][n], this.yH[0][n], this.x[0][n], this.y[0][n]);
          }
          bezierVertex(this.xH[0][this.pointCount-1], this.yH[0][this.pointCount-1], this.xH[0][0], this.yH[0][0], this.x[0][0], this.y[0][0]);
        endShape();
      pop();

      //////////// TEXT
      push();
        translate(0, this.yCore[1], 1);

        noStroke();
        fill(foreColor);
        textFont(currentFont);
        textAlign(CENTER);
        textSize(this.pgTextSize);
        text(this.inp, 0, 0);
      pop();

      //////////// DEBRIS
      for(var m = 0; m < this.debrisCount; m++){
        push();
          translate(this.xD[m], this.yD[m], 5);
          rotateZ(this.rD[m]);

          fill(bkgdColor);
          stroke(foreColor);
          strokeWeight(4);

          ellipse(0, 0, this.sDw[m], this.sDh[m]);
        pop();
      }

      //////////// TOP CLOUD
      push();
        translate(50, this.yCore[2], 10);

        fill(bkgdColor);
        stroke(foreColor);
        strokeWeight(4);

        beginShape();
          vertex(this.x[1][0], this.y[1][0]);
          for(var n = 1; n < this.pointCount; n++){
            bezierVertex(this.xH[1][n-1], this.yH[1][n-1], this.xH[1][n], this.yH[1][n], this.x[1][n], this.y[1][n]);
          }
          bezierVertex(this.xH[1][this.pointCount-1], this.yH[1][this.pointCount-1], this.xH[1][0], this.yH[1][0], this.x[1][0], this.y[1][0]);
        endShape();
      pop();
    pop();
  }

  findTextSize(){
    var measured = 0;
    while(measured < width){
      textSize(this.pgTextSize)
      textFont(currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if(this.pgTextSize * thisFontAdjust > height * 7/8){
      this.pgTextSize = (height * 7/8)/thisFontAdjust;
    }
  }

  makeCloud(){
    for(var m = 0; m < this.cloudCount; m++){
      this.x[m] = [];
      this.y[m] = [];
      this.xH[m] = [];
      this.yH[m] = [];

      for(var n = 0; n < this.pointCount; n++){
        var radRanX = random(width/8, width/4);
        var radRanY = random(height/8, height/4);
        var angRad = random(-PI/8, PI/8);
        var handleLength = random(200, 300);

        this.x[m][n] = cos(n * this.ang - angRad) * (this.cloudW - radRanX);
        this.y[m][n] = sin(n * this.ang - angRad) * (this.cloudH - radRanY);

        this.xH[m][n] = this.x[m][n] + cos(n*this.ang - angRad) * handleLength;
        this.yH[m][n] = this.y[m][n] + sin(n*this.ang - angRad) * handleLength;
      }
    }

    for(var m = 0; m < this.debrisCount; m++){
      var ang = m * 1.2;
      var radStart = random(width/8, width/4);
      var radEnd = radStart + random(width/8, width/2);

      this.xStart[m] = cos(ang) * radStart;
      this.yStart[m] = sin(ang) * radStart;

      this.xEnd[m] = cos(ang) * radEnd;
      this.yEnd[m] = sin(ang) * radEnd;

      var direction = 1;
      if(random(10) < 5){
        direction = -1;
      }
      this.rStart[m] = random(direction * PI);
      this.rEnd[m] = this.rStart[m] + random(direction * PI);

      this.sDw[m] = random(10, 80);
      this.sDh[m] = random(10, 80);
    }
  }

  removeGraphics(){
    
  }
}
