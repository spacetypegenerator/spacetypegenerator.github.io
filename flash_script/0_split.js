class Split {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.direction = 1;
    if(random(10) < 5){
      this.direction = -1;
    }

    this.ticker = 0;

    this.ramp = ramp_;

    this.animShear = 0;
    this.animShearMax = this.direction * PI/8;

    this.splitR = [];
    this.splitR[0] = 0;
    this.splitR[1] = this.splitR[0] + random(0.1, 0.4);
    this.splitR[2] = this.splitR[1] + random(0.1, 0.6);
    this.splitR[3] = 1;


    this.animX = [];
    this.animXmax = [];
    this.animXmax[0] = this.direction * -100;
    this.animXmax[1] = this.direction * 50;
    this.animXmax[2] = this.direction * 25;
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

    this.animShear = map(tk1, 0, 1, 0, this.animShearMax);

    for(var m = 0; m < 3; m++){
      this.animX[m] = map(tk1, 0, 1, 0, this.animXmax[m]);
    }
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);

      scale(0.75);
      shearX(this.animShear);
      translate(-this.pgA.width/2, -this.pgA.height/2);

      texture(this.pgA);

      for(var m = 0; m < 3; m++){
        translate(this.animX[m], 0);
        beginShape(TRIANGLE_STRIP);
          vertex(0, this.pgA.height * this.splitR[m], 0, this.splitR[m]);
          vertex(0, this.pgA.height * this.splitR[m + 1], 0, this.splitR[m + 1]);
          vertex(this.pgA.width, this.pgA.height * this.splitR[m], 1, this.splitR[m]);
          vertex(this.pgA.width, this.pgA.height * this.splitR[m + 1], 1, this.splitR[m + 1]);
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
