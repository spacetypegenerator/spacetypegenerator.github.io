class Starburst {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();

    this.res = round(random(2,10)) * 4;
    this.ang = 2*PI/this.res;
    this.radiusX;
    this.radiusY;
    this.radiusMinX = 0;
    this.radiusMaxX = width/2;
    this.radiusMinY = 0;
    this.radiusMaxY = height/2;
    this.radiusXinner = width/8;
    this.radiusYinner = height/8;

    this.xCenter = width/2;
    this.yCenter = height/2;
    this.yMin = height * 3/4;
    this.yMax = height/2

    this.rotZ = 0
    this.rotZmax = random(-PI, PI);

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
    var a1, b1;
    var a2, b2;
    var a3, b3;
    if(accelMode == 0){
      if(this.ramp==0){
        tk1 = easeOutCirc(tk0);
      } else if(this.ramp==1){
        tk1 = easeInCirc(tk0);
      }
      a0 = this.radiusMinX;
      b0 = this.radiusMaxX;
      a1 = this.radiusMinY;
      b1 = this.radiusMaxY;
      a2 = 0;
      b2 = this.rotZmax;
      a3 = this.yMin;
      b3 = this.yMax;
    } else {
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = this.radiusMinX;
        b0 = (this.radiusMinX + this.radiusMaxX)/2;
        a1 = this.radiusMinY;
        b1 = (this.radiusMinY + this.radiusMaxY)/2;
        a2 = 0;
        b2 = this.rotZmax/2;
        a3 = this.yMin;
        b3 = (this.yMin + this.yMax)/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = (this.radiusMinX + this.radiusMaxX)/2;
        b0 = this.radiusMaxX;
        a1 = (this.radiusMinY + this.radiusMaxY)/2;
        b1 = this.radiusMaxY;
        a2 = this.rotZmax/2;
        b2 = this.rotZmax;
        a3 = (this.yMin + this.yMax)/2;
        b3 = this.yMax;
      }
    }

    this.radiusX = map(tk1, 0, 1, a0, b0);
    this.radiusY = map(tk1, 0, 1, a1, b1);
    this.rotZ = map(tk1, 0, 1, 0, a2, b2);

    this.yCenter = map(tk1, 0, 1, a3, b3);
  }

  display(){
    image(this.pgA, 0, 0);

    texture(this.pgB);
    // stroke(0, 0, 255);

    beginShape(TRIANGLE_FAN);
      vertex(this.xCenter, this.yCenter, 0.5, 0.5);
      for(var n = 0; n <= this.res; n++){
        var nowRadiusX = this.radiusXinner;
        var nowRadiusY = this.radiusYinner;
        if(n%2 == 0){
          nowRadiusX = this.radiusX;
          nowRadiusY = this.radiusY;
        }

        var x = this.xCenter + cos(n*this.ang + this.rotZ) * nowRadiusX;
        var y = this.yCenter + sin(n*this.ang + this.rotZ) * nowRadiusY;

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
