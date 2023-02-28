class Arcer {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();
    
    this.xSpots = [];
    this.findXpos();

    this.yAnim = [];
    this.yTarget = [];
    this.yStart = 50;
    this.yMin = 0;
    this.yMax = -150;
    this.setYtarget();

    this.ticker = 0;

    this.blPadding = 25;
    this.blSpacing = (width - 2*this.blPadding)/(keyArray.length - 1);

    this.ramp = ramp_;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    for(var n = 0; n < this.inp.length; n++){
      var tk1;
      if(accelMode == 0){
        if(this.ramp==0){
          tk1 = easeOutCirc(tk0);
        } else if(this.ramp==1){
          tk1 = easeInCirc(tk0);
        }
        this.yAnim[n] = map(tk1, 0, 1, this.yStart, this.yTarget[n]);
      } else {
        let a, b;
        if(tk0 < 0.5){
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a = this.yStart;
          b = this.yTarget[n]/2;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a = this.yTarget[n]/2;
          b = this.yTarget[n];
        }
        this.yAnim[n] = map(tk1, 0, 1, a, b);
      }
    }
  }

  display(){
    background(bkgdColor);
    push();
      translate(0, (this.pgTextSize * thisFontAdjust)/2);
      textSize(this.pgTextSize);
      textAlign(LEFT);

      fill(foreColor);
      noStroke();

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xSpots[n], height/2);
          translate(0, this.yAnim[n]);
          text(this.inp.charAt(n), 0, 0);
        pop();
      }
    pop();
  }

  findXpos(){
    textFont(currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width/2 - fullSize/2;

    for(var n = 0; n < this.inp.length; n++){
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0,n+1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
    }
  }

  setYtarget(){
    for(var n = 0; n < this.inp.length; n++){
      this.yAnim[n] = this.yMin;
      
      var tk0 = map(n, 0, this.inp.length - 1, 0, 2*PI);
      this.yTarget[n] = map(cos(tk0), 1, -1, this.yMin, this.yMax);
    }
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
