class Box {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA, this.pgB;
    this.drawTextures();
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.stripH = this.pgA.height;
    
    this.xRot;
    this.xRotMax = random(-PI, PI);
    this.yRot;
    this.yRotMax = random(-PI/8, PI/8);
    this.zRot;
    this.zRotMax = random(-PI/2, PI/2);
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a0, b0;
    let a1, b1;
    let a2, b2;
    if(accelMode == 0){
      if(this.ramp==0){
        tk1 = easeOutCirc(tk0);
      } else if(this.ramp==1){
        tk1 = easeInCirc(tk0);
      }

      a0 = 0;
      b0 = this.xRotMax;
      a1 = 0;
      b1 = this.yRotMax;
      a2 = 0;
      b2 = this.zRotMax;
    } else {
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutCirc(tk0b);
        a0 = 0;
        b0 = this.xRotMax/2;
        a1 = 0;
        b1 = this.yRotMax/2;
        a2 = 0;
        b2 = this.zRotMax/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInCirc(tk0b);
        a0 = this.xRotMax/2;
        b0 = this.xRotMax;
        a1 = this.yRotMax/2;
        b1 = this.yRotMax;
        a2 = this.zRotMax/2;
        b2 = this.zRotMax;
      }
    }
    
    this.xRot = map(tk1, 0, 1, a0, b0);
    this.yRot = map(tk1, 0, 1, a1, b1);
    this.zRot = map(tk1, 0, 1, a2, b2);
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      rotateY(this.yRot);
      rotateX(this.xRot);
      rotateZ(this.zRot);

      for(var m = 0; m < 4; m++){
        if(m%2 == 0){
          texture(this.pgA);
        } else {
          texture(this.pgB);
        }

        push();
          rotateX(m * PI/2);
          beginShape(TRIANGLE_STRIP);  
              vertex(-this.pgA.width/2, -this.pgA.height/2, this.stripH/2, 0, 0);
              vertex(-this.pgA.width/2, this.pgA.height/2, this.stripH/2, 0, 1);
              vertex(this.pgA.width/2, -this.pgA.height/2, this.stripH/2, 1, 0);
              vertex(this.pgA.width/2, this.pgA.height/2, this.stripH/2, 1, 1);
          endShape();
        pop();

        push();
          fill(bkgdColor);
          noStroke();
          translate(-this.pgA.width/2, -this.pgA.height/2, this.stripH/2);
          rotateY(PI/2);
          rect(-1, -1, this.stripH + 2, this.stripH + 2);
          translate(0, 0, this.pgA.width);
          rect(-1, -1, this.stripH + 2, this.stripH + 2);
        pop();
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
    var repeatSize = round(textWidth(this.inp));
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.1));
    this.pgA.background(bkgdColor);
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width/2, thisAdjust);

    this.pgB = createGraphics(repeatSize, this.pgTextSize * 0.8);
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
