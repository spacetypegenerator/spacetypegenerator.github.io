class Twist {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.yOutside = (height - this.pgA.height)/2;

    this. d = 1;
    if(random(10) < 5){
      this.d = -1;
    }

    this.res = 300;
    this.tl = createVector(0, 0);
    this.bl = createVector(0, this.pgA.height);
    this.tml = createVector(this.pgA.width/3, 0);
    this.bml = createVector(this.pgA.width/3, this.pgA.height);
    this.tmr = createVector(this.pgA.width * 2/3, 0);
    this.bmr = createVector(this.pgA.width * 2/3, this.pgA.height);
    this.tr = createVector(this.pgA.width, 0);
    this.br = createVector(this.pgA.width, this.pgA.height);
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    if(this.ramp==0){
      tk1 = easeOutCirc(tk0);
    } else if(this.ramp==1){
      tk1 = easeInCirc(tk0);
    }

    if(this.d == 1){
      this.tl.y = map(tk1, 0, 1, 0, -this.yOutside);
      this.tml.y = map(tk1, 0, 1, 0, -this.yOutside);
      this.bmr.y = map(tk1, 0, 1, this.pgA.height, this.pgA.height + this.yOutside);
      this.br.y = map(tk1, 0, 1, this.pgA.height, this.pgA.height + this.yOutside);
    } else {
      this.bl.y = map(tk1, 0, 1, this.pgA.height, this.pgA.height + this.yOutside);
      this.bml.y = map(tk1, 0, 1, this.pgA.height, this.pgA.height + this.yOutside);
      this.tmr.y = map(tk1, 0, 1, 0, this.d * this.yOutside);
      this.tr.y = map(tk1, 0, 1, 0, this.d * this.yOutside);
    }
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      translate(-this.pgA.width/2, -this.pgA.height/2);

      texture(this.pgA);
      stroke(foreColor);
      // fill(bkgdColor);

      beginShape(TRIANGLE_STRIP);
        for(var n = 0; n <= this.res; n++){
          let t = n / this.res;

          let xTop = bezierPoint(this.tl.x, this.tml.x, this.tmr.x, this.tr.x, t);
          let yTop = bezierPoint(this.tl.y, this.tml.y, this.tmr.y, this.tr.y, t);

          let xBot = bezierPoint(this.bl.x, this.bml.x, this.bmr.x, this.br.x, t);
          let yBot = bezierPoint(this.bl.y, this.bml.y, this.bmr.y, this.br.y, t);

          var u = map(xTop, 0, this.pgA.width, 0, 1);

          vertex(xTop, yTop, u, 0);
          vertex(xBot, yBot, u, 1);
        }
      endShape();
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
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * 0.8);
    this.pgA.background(bkgdColor);
  
    this.pgA.fill(foreColor);
    this.pgA.noStroke();
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(currentFont);
    this.pgA.text(this.inp, this.pgA.width/2, this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2);
  }
}
