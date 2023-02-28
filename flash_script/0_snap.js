class Snap {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();
    
    this.xKern = [];
    this.xWidths = [];
    this.xScaleMax = 0.2;
    this.xScale = [];
    this.xShear = [];
    this.xShearMax = -PI/8;
    this.findSpacing();

    this.ticker = 0;

    this.ramp = ramp_;

    this.pacer = (sceneLength/1.5)/this.inp.length;

  }

  update(){
    this.ticker ++;

    for(var n = 0; n < this.inp.length; n++){
      var tk00 = constrain(this.ticker - n*this.pacer, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1);
      var tk1;
      var a0, b0;
      var a1, b1;
      if(accelMode == 0){
        if(this.ramp==0){
          tk1 = easeOutQuad(tk0);
        } else if(this.ramp==1){
          tk1 = easeInQuad(tk0);
        }
        a0 = this.xScaleMax;
        b0 = 1;
        a1 = this.xShearMax;
        b1 = 0;
      } else {
        if(tk0 < 0.5){
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a0 = this.xScaleMax;
          b0 = (this.xScaleMax + 1)/2;
          a1 = this.xShearMax;
          b1 = this.xShearMax/2;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a0 = (this.xScaleMax + 1)/2;
          b0 = 1;
          a1 = this.xShearMax/2;
          b1 = 0;
        }
      }

      this.xScale[n] = map(tk1, 0, 1, a0, b0);
      this.xShear[n] = map(tk1, 0, 1, a1, b1);

      this.xWidths[n] = textWidth(this.inp.charAt(n)) * this.xScale[n];
    }

    var fullSize = 0;
    for(var n = 0; n < this.inp.length-1; n++){
      this.xKern[n] = this.xWidths[n]/2 + this.xWidths[n+1]/2;
      fullSize += this.xKern[n];
    }
    this.xKern[this.inp.length-1] = 0;

    this.xStart = -fullSize/2;
  }

  display(){
    background(bkgdColor);

    fill(foreColor);
    noStroke();

    push();
      translate(width/2, height/2);
      translate(this.xStart, 0);
      translate(0, this.pgTextSize * thisFontAdjust/2);

      textFont(currentFont);
      textSize(this.pgTextSize);
      textAlign(CENTER);
      for(var n = 0; n < this.inp.length; n++){
        push();
          fill(foreColor);
          noStroke();
          shearX(this.xShear[n]);
          scale(this.xScale[n], 1);
          text(this.inp.charAt(n), 0, 0);
        pop();
        translate(this.xKern[n], 0);
      }
    pop();
  }

  findSpacing(){
    textFont(currentFont);
    textSize(this.pgTextSize);

    for(var n = 0; n < this.inp.length; n++){
      this.xWidths[n] = textWidth(this.inp.charAt(n));
    }
    var fullSize = 0;
    for(var n = 0; n < this.inp.length-1; n++){
      this.xKern[n] = this.xWidths[n]/2 + this.xWidths[n+1]/2;
      fullSize += this.xKern[n];
    }
    this.xKern[this.inp.length-1] = 0;

    this.xStart = -fullSize/2;
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

  removeGraphics(){

  }
}
