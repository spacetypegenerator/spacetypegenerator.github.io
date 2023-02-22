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
    var innerFactor = random(0.1, 0.3);
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
    if(this.ramp==0){
      tk1 = easeOutCirc(tk0);
    } else if(this.ramp==1){
      tk1 = easeInCirc(tk0);
    }

    this.radiusX = map(tk1, 0, 1, this.radiusMinX, this.radiusMaxX);
    this.radiusY = map(tk1, 0, 1, this.radiusMinY, this.radiusMaxY);
    this.rotZ = map(tk1, 0, 1, 0, this.rotZmax);

    this.yCenter = map(tk1, 0, 1, this.yMin, this.yMax)
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
    this.pgA.translate(width/2, height/2 + this.pgTextSize * thisFontAdjust/2);
    this.pgA.text(this.inp, 0, 0);

    this.pgB = createGraphics(width, height);
    this.pgB.background(bkgdColor);
    this.pgB.noStroke();
    this.pgB.fill(foreColor);
    this.pgB.textFont(currentFont);
    this.pgB.textAlign(CENTER);
    this.pgB.textSize(this.pgTextSize);
    this.pgB.translate(width/2, height/2 + this.pgTextSize * thisFontAdjust/2);
    this.pgB.text(this.inp, 0, 0);
  }
}
