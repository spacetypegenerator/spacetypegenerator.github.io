class BugEyesEE {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.repeats;
    this.pgTextSize = 2;
    this.findTextSize();
    
    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.xSpots = [];
    this.shutterAnim = [];
    this.shutterAnimBot = [];
    this.findXpos();

    this.xAnim = [];

    this.ramp = ramp_;

    this.pacer = (sceneLength/2)/this.inp.length;
  }

  update(){
    this.ticker ++;

    for(var n = 0; n < this.inp.length; n++){
      for(var p = 0; p < this.repeats; p++){
        var thisDist = dist(n, p, this.inp.length/2, this.repeats/2);
        var tk00 = constrain(this.ticker - (this.pacer * thisDist), 0, sceneLength);
        var tk0 = map(tk00, 0, sceneLength, 0.0, 1.0);
        
        var tk1;
        var a0, b0;
        var a1, b1;
        if(tk0 < 0.5){
          var tk0b = map(tk0, 0, 0.5, 0, 1);
          tk1 = easeOutCirc(tk0b);
          a0 = this.pg[n].height;
          b0 = 0;
          a1 = this.pg[n].height;
          b1 = this.pg[n].height;
        } else {
          var tk0b = map(tk0, 0.5, 1, 0, 1);
          tk1 = easeInCirc(tk0b);
          a0 = 0;
          b0 = 0;
          a1 = this.pg[n].height;
          b1 = 0;
        }

        this.shutterAnim[n][p] = map(tk1, 0, 1, a0, b0);
        this.shutterAnimBot[n][p] = map(tk1, 0, 1, a1, b1);
      }
    }
  }

  display(){
    background(bkgdColor);
    push();
      translate(0, height/2);
      translate(0, -this.pg[0].height/2);

      textSize(this.pgTextSize);
      textAlign(LEFT);

      fill(foreColor);
      noStroke();

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(0, -this.repeats * this.pg[n].height/2);

          translate(0, (n%2)*this.pg[n].height/2);

          for(var p = 0; p < this.repeats; p++){
            push();
              translate(this.xSpots[n], p * this.pg[n].height);
              texture(this.pg[n]);

              var vTop = map(this.shutterAnimBot[n][p], 0, this.pg[n].height, 1, 0);
              var vBot = map(this.pg[n].height - this.shutterAnim[n][p], 0, this.pg[n].height, 0, 1);
    
              beginShape(TRIANGLE_STRIP);
                vertex(0, this.shutterAnim[n][p], 0, vTop);
                vertex(0, this.shutterAnimBot[n][p], 0, vBot);
                vertex(this.pg[n].width, this.shutterAnim[n][p], 1, vTop);
                vertex(this.pg[n].width, this.shutterAnimBot[n][p], 1, vBot);
              endShape();
            pop();
          }
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
      this.shutterAnim[n] = [];
      this.shutterAnimBot[n] = [];

      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0,n+1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference;
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

  makeTextures(){
    textSize(this.pgTextSize);
    textFont(currentFont);

    for(var n = 0; n < this.inp.length; n++){
      var repeatSize = round(textWidth(this.inp.charAt(n)));
    
      this.pg[n] = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.05));
      this.pg[n].background(bkgdColor);
    
      this.pg[n].fill(foreColor);
      this.pg[n].noStroke();
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(currentFont);
      var thisAdjust = this.pg[n].height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width/2, thisAdjust);
    }

    this.repeats = floor((height)/this.pg[0].height) + 2;
  }

  removeGraphics(){
    for(var n = 0; n < this.inp.length; n++){
      this.pg[n].remove();
    }
  }
}
