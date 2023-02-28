class Grid {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.xCount = 10;
    this.xSpace = this.pgA.width/this.xCount;
    this.yCount = 30;
    this.ySpace = this.pgA.height/this.yCount;

    this.yAnim = [];
    this.xAnim = [];
    this.yAnimTarget = [];
    this.xAnimTarget = [];
    this.findTargets();
  }

  update(){
    this.ticker ++;
    
    for(var m = 0; m <= this.yCount; m ++){
      for(var n = 0; n <= this.xCount; n++){
        var delayDist = dist(n, m, this.xCount/2, this.yCount/2);

        var tk00 = constrain(this.ticker - delayDist*0.5 + 10, 0, sceneLength);
        var tk0 = map(tk00, 0, sceneLength, 0, 1);
        var tk1;
        if(this.ramp==0){
          tk1 = easeOutQuad(tk0);
        } else if(this.ramp==1){
          tk1 = easeInQuad(tk0);
        }

        this.xAnim[m][n] = map(tk1, 0, 1, this.xAnimTarget[m][n], 0);
        this.yAnim[m][n] = map(tk1, 0, 1, this.yAnimTarget[m][n], 0);
      }
    }
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      translate(-this.pgA.width/2, -this.pgA.height/2);

      texture(this.pgA);
      // stroke(foreColor);
      // fill(bkgdColor);

      for(var m = 0; m < this.yCount; m ++){
        beginShape(TRIANGLE_STRIP);
        for(var n = 0; n <= this.xCount; n++){
          var xLeft = n * this.xSpace;
          var xRight = (n+1) * this.xSpace;
          var yTop = m * this.ySpace;
          var yBot = (m+1) * this.ySpace;

          var uLeft = map(xLeft + this.xAnim[m][n], 0, this.pgA.width, 0, 1);
          var uRight = map(xRight + this.xAnim[m][n], 0, this.pgA.width, 0, 1);
          var vTop = map(yTop + this.yAnim[m][n], 0, this.pgA.height, 0, 1);
          var vBot = map(yBot + this.yAnim[m][n], 0, this.pgA.height, 0, 1);

          vertex(xLeft, yTop, uLeft, vTop);
          vertex(xLeft, yBot, uLeft, vBot);
          vertex(xRight, yTop, uRight, vTop);
          vertex(xRight, yBot, uRight, vBot);
        }
        endShape();
      }
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

  findTargets(){
    for(var m = 0; m <= this.yCount; m ++){
      this.xAnim[m] = [];
      this.yAnim[m] = [];
      
      this.xAnimTarget[m] = [];
      this.yAnimTarget[m] = [];
      for(var n = 0; n <= this.xCount; n++){
        var pacer = dist(n, m, this.xCount/2, this.yCount/2);

        var xDirect = 1;
        var yDirect = 1;
        if(n > this.xCount/2){
          xDirect = -1;
        }
        if(m > this.yCount/2){
          yDirect = -1;
        }

        this.xAnimTarget[m][n] = xDirect * (5 * pacer) + random(-25, 25);
        this.yAnimTarget[m][n] = yDirect * (20 * pacer);
      }
    }
  }

  drawTextures(){
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp));
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * 0.8);
    this.pgA.background(bkgdColor);
  
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    this.pgA.text(this.inp, this.pgA.width/2, this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2);
  }

  removeGraphics(){
    this.pgA.remove();
  }
}
