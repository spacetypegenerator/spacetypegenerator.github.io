class KineticLetter {
  constructor(x_, p_, m_, n_){
    this.p = p_
    this.m = m_;
    this.n = n_;

    this.x0 = x_;
    this.y0 = 0;
    this.w = textWidth(keyArray[this.m].charAt(this.n));
    this.h = pgTextSize * 0.7;

    this.yA = 0;
    this.yAmax = (1 - this.n%2 * 2) * random(20, 140);
    this.xA = 0;
    this.xAmax;
    if(this.n == 0){
      this.xAmax = -random(40, 160);
      this.yAmax = 0;
    } else if(this.n == keyArray[this.m].length - 1){
      this.xAmax = random(40, 160);
      this.yAmax = 0;
    } else {
      this.xAmax = 0;
    }

    this.flicker = 255;

    this.xScale = 1;
    this.xScaleMax = random(1, 5);
    this.xScaleMaxB = random(0.5, 1.5);

    this.xShear = 0;
    this.xShearMax = random(-PI/3, PI/3);
    // this.xShearMaxB = -random(-PI/4, PI/4);
    this.xShearMaxB = 0;

    var rs0 = random(100);
    if(rs0 < 100 * (1/keyArray[this.m].length)){
      this.xShearMaxB = random(-PI/4, PI/4);
    }

    this.ticker = -this.n * 3 - this.m * 3 - 0;

    this.anim01 = 30;          // INTRO
    this.anim12 = this.anim01 + 30;
    this.anim23 = this.anim12 + 30;

    this.xBudgeScale = 0;

    this.xBudgePre = 0;
    this.xBudgePost = 0;

    this.xTrack = 5;

    this.visible = false;

    this.influ = 8;
  }

  update(){
    if(this.ticker == 0){
      this.visible = true;
    }

    // if(this.ticker < this.anim34){
      this.ticker ++;
    // }

    if(this.ticker < this.anim01){
      var tick0 = map(this.ticker, 0, this.anim01, 0.5, 1);
      var tick1 = aSet(tick0, this.influ);

      this.xA = map(tick1, 0.5, 1, this.xAmax, 0);
      this.yA = map(tick1, 0.5, 1, this.yAmax, 0);

      this.xScale = map(tick1, 0.5, 1, this.xScaleMax, 1);
      this.xShear = map(tick1, 0.5, 1, this.xShearMax, 0);
    } else if(this.ticker < this.anim12){
      tick0 = map(this.ticker, this.anim01, this.anim12, 0, 1);
      tick1 = aSet(tick0, this.influ);

      this.xScale = map(tick1, 0, 1, 1, this.xScaleMaxB);
      this.xBudgeScale = (this.xScale * this.w) - this.w;

      this.xShear = map(tick1, 0, 1, 0, this.xShearMaxB);
      if(this.xShear < 0){
        this.xBudgePost = -tan(this.xShear) * pgTextSize * 0.65;
      } else {
        this.xBudgePre = tan(this.xShear) * pgTextSize * 0.65;
      }
    } else {
      tick0 = map(this.ticker, this.anim12, this.anim23, 0, 0.5);
      tick1 = aSet(tick0, this.influ);

      this.yA = map(tick1, 0, 0.5, 0, -20);

      // if(this.ticker > this.anim23 - 4 && this.ticker%3 == 0){
      //   this.flicker = 125;
      // } else {
      //   this.flicker = 255;
      // }

      this.xScale = map(tick1, 0, 0.5, this.xScaleMaxB, 1);
      this.xBudgeScale = (this.xScale * this.w) - this.w;

      this.xShear = map(tick1, 0, 0.5, this.xShearMaxB, 0);
      if(this.xShear < 0){
        this.xBudgePost = -tan(this.xShear) * pgTextSize * 0.65;
      } else {
        this.xBudgePre = tan(this.xShear) * pgTextSize * 0.65;
      }
    }

    if(this.n < keyArray[this.m].length - 1){
      kineticGroups[this.p].kineticWords[this.m].budgeCenter += (this.xBudgeScale + this.xBudgePost + this.xBudgePre);
    }

    if(this.ticker > this.anim23-1){
      this.visible = false;

      if(this.m == keyArray.length - 1 &&
        this.n == keyArray[this.m].length - 1 &&
        this.p == groupCount - 1){
        resetAnim();
      }
    }
  }

  display(){
    translate(this.xBudgePre, 0);

    if(this.visible){
      push();
        translate(this.x0, this.y0);
        translate(this.xA, this.yA);
        // ellipse(0, 0, 3, 3);
        shearX(this.xShear);
        scale(this.xScale, 1);
        noStroke();
        fill(foreColor);
        textFont(currentFont);
        textSize(pgTextSize);
        text(keyArray[this.m].charAt(this.n), 0, 0);
      pop();
    }
    translate(this.xBudgeScale, 0);
    translate(this.xBudgePost, 0);

    translate(this.xTrack, 0);
  }

}
