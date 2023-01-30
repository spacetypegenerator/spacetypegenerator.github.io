class KineticWord {
  constructor(x_, y_, p_, m_){
    this.p = p_;
    this.m = m_;
    this.x0 = x_;
    this.y0 = y_;
    this.y1 = map(this.m, 0, keyArray.length-1, -newHeight/4, newHeight/4);
    this.yAnim = 0;
    
    this.kinetics = [];

    textSize(pgTextSize);
    textFont(currentFont);

    var thisTracking = pgTextSize * 0.15;
    var fullMainWidth = textWidth(keyArray[this.m]) - (keyArray[this.m].length - 1) * (thisTracking - 5);

    this.budgeCenter = 0;

    for(var n = 0; n < keyArray[this.m].length; n++){
      var tempMain0 = textWidth(keyArray[this.m].slice(0, n+1));
      var tempMain1 = textWidth(keyArray[this.m].charAt(n));

      var thisX = tempMain0 - tempMain1 - thisTracking * n - fullMainWidth/2;
      this.kinetics[n] = new KineticLetter(thisX, this.p, this.m, n);
    }

    this.influ = 10;
    this.ticker = -this.m * 1;
  }

  update(){
    this.ticker ++;

    if(this.ticker < 0){
      this.yAnim = this.y1;
    } else if(this.ticker < 60){
      var tick0 = map(this.ticker, 0, 60, 0, 1);
      var tick1 = aSet(tick0, this.influ);

      this.yAnim = map(tick1, 0, 1, this.y1, 0);
    } else {
      this.yAnim = 0;
    }
  }

  run(){
    push();
      translate(-this.budgeCenter/2, 0);
      translate(this.x0, this.y0);
      translate(0, this.yAnim);

      this.budgeCenter = 0;
      for(var n = 0; n < this.kinetics.length; n++){

        this.kinetics[n].update();
        this.kinetics[n].display();
      }
    pop();
  }
}
