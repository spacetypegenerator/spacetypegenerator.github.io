class RiseSun {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();

    this.res = 50;
    this.ang = 2*PI/this.res;
    this.radiusX = height * 1.25;
    this.radiusY = height;

    this.xCenter = width/2;
    this.direction = 1;
    if(random(10) < 5){
      this.direction = 1;
    } else {
      this.direction = -1;      
    }
    this.direction2 = 1;
    if(random(10) < 5){
      this.direction2 = 1;
    } else {
      this.direction2 = -1;      
    }
    this.yCenterStart = (height/2 + this.direction * (this.radiusY - 25));
    this.yCenterEnd = (this.yCenterStart + 100);
  
    this.ticker = 0;

    this.ramp = ramp_;
  }

  update(){
    // this.yCenter += (this.direction2 * 0.5);
    // this.yCenter += 0.5;

    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, b0;
    if(accelMode == 0){
      if(this.ramp==0){
        tk1 = easeOutCirc(tk0);
      } else if(this.ramp==1){
        tk1 = easeInCirc(tk0);
      }
      a0 = this.yCenterStart;
      b0 = this.yCenterEnd;
    } else {
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = this.yCenterStart;
        b0 = (this.yCenterStart + this.yCenterEnd)/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = (this.yCenterStart + this.yCenterEnd)/2;
        b0 = this.yCenterEnd;
      }
    }

    this.yCenter = map(tk1, 0, 1, a0, b0);
  }

  display(){
    image(this.pgA, 0, 0);

    texture(this.pgB);
    // stroke(0, 0, 255);

    beginShape(TRIANGLE_FAN);
      // vertex(this.xCenter, this.yCenter);
      for(var n = 0; n < this.res; n++){
        var x = this.xCenter + cos(n*this.ang) * this.radiusX;
        var y = this.yCenter + sin(n*this.ang) * this.radiusY;

        var u = map(x, 0, width, 0, 1);
        var v = map(y, 0, height, 0, 1);

        vertex(x,y,u,v);
      }
    endShape();
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

  drawTextures(){
    this.pgA = createGraphics(width, height);
    this.pgA.background(foreColor);
    this.pgA.noStroke();
    this.pgA.fill(bkgdColor);
    this.pgA.textFont(currentFont);
    this.pgA.textAlign(CENTER);
    this.pgA.textSize(this.pgTextSize);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgA.translate(width/2, thisAdjust);
    this.pgA.text(this.inp, 0, 0);

    this.pgB = createGraphics(width, height);
    this.pgB.background(bkgdColor);
    this.pgB.noStroke();
    this.pgB.fill(foreColor);
    this.pgB.textFont(currentFont);
    this.pgB.textAlign(CENTER);
    this.pgB.textSize(this.pgTextSize);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgB.translate(width/2, thisAdjust);
    this.pgB.text(this.inp, 0, 0);
  }

  removeGraphics(){
    this.pgA.remove();
    this.pgB.remove();
  }
}
