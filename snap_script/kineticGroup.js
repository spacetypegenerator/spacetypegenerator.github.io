class KineticGroup {
  constructor(x_, y_, p_){
    this.p = p_;
    this.x0 = x_;
    this.y0 = y_;
    this.xAnim = 0;

    this.kineticWords = [];
    for(var m = 0; m < keyArray.length; m++){
      this.kineticWords[m] = new KineticWord(0, m * lineHeight, this.p, m);
    }

    this.ticker = -this.p * 2;

    this.influ = 5;
  }

  update(){
    this.ticker ++;

    if(this.ticker < 45){
      this.xAnim = 0;
    } else if(this.ticker < 105){
      var tick0 = map(this.ticker, 45, 105, 0, 1);
      var tick1 = aSet(tick0, this.influ);

      this.xAnim = map(tick1, 0, 1, 0, horzSpacer);
    }
  }

  run(){
    push();
      translate(this.x0, this.y0);
      translate(this.xAnim, 0);
      for(var m = 0; m < keyArray.length; m++){
        this.kineticWords[m].update();
        this.kineticWords[m].run();
      }
    pop();
  }
}