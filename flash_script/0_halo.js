class Halo {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.res = 100;
    this.ang = 2*PI/this.res;
    this.radius = width/2;
    this.sec = (2 * PI * this.radius)/this.res;
    this.stripH = this.pgA.height;
    
    this.xRot;
    this.xRotMax = random(-PI/4, PI/4);

    this.zRot;
    this.zRotMax = random(-PI/4, PI/4);

    this.heightRatio = this.pgA.width * this.stripH/this.pgA.height;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a0, b0;
    let a1, b1;
    if(accelMode == 0){
      if(this.ramp==0){
        tk1 = easeOutCirc(tk0);
      } else if(this.ramp==1){
        tk1 = easeInCirc(tk0);
      }

      a0 = 0;
      b0 = this.xRotMax;
      a1 = 0;
      b1 = this.zRotMax;
    } else {
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = 0;
        b0 = this.xRotMax/2;
        a1 = 0;
        b1 = this.zRotMax/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = this.xRotMax/2;
        b0 = this.xRotMax;
        a1 = this.zRotMax/2;
        b1 = this.zRotMax;
      }
    }
    
    this.xRot = map(tk1, 0, 1, a0, b0);
    this.zRot = map(tk1, 0, 1, a1, b1);
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      rotateX(this.xRot);
      rotateZ(this.zRot);

      for(var m = 0; m < 2; m++){
        if(m==0){
          texture(this.pgA);
        } else {
          texture(this.pgB);
        }

        beginShape(TRIANGLE_STRIP);
          for(var n = 0; n <= this.res; n++){
            var x = cos(n * this.ang + PI) * (this.radius - m/2);
            var z = sin(n * this.ang + PI) * (this.radius - m/2);
            var yTop = -this.stripH/2 + m;
            var yBot = this.stripH/2 - m;
  
            var thisDist = (n * this.sec + this.ticker * 2 + 600) % this.heightRatio;
            var u = map(thisDist, 0, this.heightRatio, 1, 0);
  
            vertex(x, yTop, z, u, 0);
            vertex(x, yBot, z, u, 1);
  
            if(thisDist > this.heightRatio - this.sec){
              vertex(x, yTop, z, 1, 0);
              vertex(x, yBot, z, 1, 1);
            }
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

  drawTextures(){
    textSize(this.pgTextSize);
    textFont(currentFont);
    var repeatSize = round(textWidth(this.inp)) + 200;
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.1));
    this.pgA.background(bkgdColor);
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width/2, thisAdjust);

    this.pgB = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.1));
    this.pgB.background(foreColor);
    this.pgB.fill(bkgdColor);
    this.pgB.noStroke();
    this.pgB.textSize(this.pgTextSize);
    this.pgB.textAlign(CENTER);
    this.pgB.textFont(currentFont);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgB.text(this.inp, this.pgA.width/2, thisAdjust);
  }

  removeGraphics(){
    this.pgA.remove();
    this.pgB.remove();
  }
}
