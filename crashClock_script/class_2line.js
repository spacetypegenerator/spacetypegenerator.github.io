class DropLine {
  constructor(mode, lineIndex, topBot){
    this.mode = mode;

    this.lineIndex = lineIndex;
    this.topBot = topBot;
    this.lineLength;
    this.input;
    this.nowSize;

    this.rad;
    if(this.mode == 0){
      this.input = inputTextHour;
      this.nowSize = pgTextSizeHour;
      this.rad = borderRadius/2 - this.nowSize * 3/4;
    } else if(this.mode == 1){
      this.input = inputTextMin;
      this.nowSize = pgTextSizeMin;
      this.rad = borderRadius/2 - pgTextSizeHour - pgTextSizeMin * 2;
    } else {
      if(this.topBot == 0){
        this.input = inputTextTop;
      } else {
        this.input = inputTextBottom;
      }
      this.nowSize = pgTextSizeHead;
      this.rad = borderRadius/2 - this.nowSize * 3/4;
    }
    this.lineLength = this.input.length;
    
    this.ang;
    if(this.mode == 2){
      this.ang = PI/(this.input.length + 1);
    } else {
      this.ang = TWO_PI/this.input.length;
    }
    this.letterCounter = 0;
    this.dropLetters = [];
    this.dropConstraints = [];

    this.dropDebris = [];

    this.debugX = 0;
    this.debugY = 0;

    this.setUnits();
  }

  run(){
    for(var m = 0; m < this.dropLetters.length; m++){
      this.dropLetters[m].run();
    }
    // this.debug();
  }

  setUnits(){
    textFont(tFont[fontSelect]);
    textSize(this.nowSize);

    var thisWord = this.input[this.lineIndex];
    for(var n = 0; n < thisWord.length; n++){
      var thisLetter = thisWord.charAt(n);

      var thisX = 0;
      var thisY = this.nowSize * pgTextFactor[fontSelect]/2;
      if(n > 0){
        var holdX = textWidth(thisWord.substring(0, n + 1));
        thisX = holdX - textWidth(thisWord.charAt(n));
      }

      var orgX, orgY;
      if(this.mode == 0){
        orgX = width/2 + cos(-PI/2 + (this.lineIndex + 1)*(this.ang)) * this.rad;
        orgY = height/2 + sin(-PI/2 + (this.lineIndex + 1)*(this.ang)) * this.rad;
      } else if(this.mode == 1){
        orgX = width/2 + cos(-PI/2 + (this.lineIndex + 0.5)*(this.ang)) * this.rad;
        orgY = height/2 + sin(-PI/2 + (this.lineIndex + 0.5)*(this.ang)) * this.rad;
      } else if (this.mode == 2){
        if(this.topBot == 0){
          orgX = width/2 + cos(-PI/2 + (this.lineIndex - this.lineLength/2 + 0.5)*(this.ang)) * this.rad;
          orgY = height/2 + sin(-PI/2 + (this.lineIndex - this.lineLength/2 + 0.5)*(this.ang)) * this.rad;
        } else {
          orgX = width/2 + cos(PI/2 + (-this.lineIndex + this.lineLength/2 - 0.5)*(this.ang)) * this.rad;
          orgY = height/2 + sin(PI/2 + (-this.lineIndex + this.lineLength/2 - 0.5)*(this.ang)) * this.rad;
        }
      }

      this.debugX = orgX;
      this.debugY = orgY;

      thisX += orgX;
      thisX -= textWidth(thisWord)/2;
      thisY += orgY;

      var dropIndex = this.dropLetters.length;
      this.dropLetters[dropIndex] = new DropLetter(thisLetter, this.nowSize, thisX, thisY);
      // this.dropLetters[dropIndex] = new DropLetter(thisLetter, width/2, height/2);
    
      if(n > 0){
        this.configureConstraint(this.letterCounter);
      }

      this.letterCounter ++;
    } 
  }

  debug(){
    noStroke();
    fill(0,0,255);
    ellipse(this.debugX, this.debugY, 10, 10);
  }

  configureConstraint(m){
    if(constrainMode == 1){
      if(this.dropLetters[m].thisLetter != " "){
        if(this.dropLetters[m - 1].thisLetter != " "){
          ///////// ONE CONSTRAINT
          let optionsA = {
            bodyA: this.dropLetters[m].bodyLetter,
            bodyB: this.dropLetters[m - 1].bodyLetter,
            stiffness: 0.05,
            damping: 0.1
          }
          this.dropConstraints[this.dropConstraints.length] = Constraint.create(optionsA);
          var thisConA = this.dropConstraints[this.dropConstraints.length - 1];
          World.add(world, thisConA);
        }
      }
    } else if (constrainMode == 2){
      if(this.dropLetters[m].thisLetter != " "){
        if(this.dropLetters[m - 1].thisLetter != " "){
          ///////// FIRST CONSTRAINT
          let optionsA = {
            bodyA: this.dropLetters[m].bodyLetter,
            bodyB: this.dropLetters[m - 1].bodyLetter,
            pointA: {x: 0, y: -(this.nowSize * pgTextFactor[fontSelect])/2},
            pointB: {x: 0, y: -(this.nowSize * pgTextFactor[fontSelect])/2},
            stiffness: 0.1,
            damping: 0.05
          }
          this.dropConstraints[this.dropConstraints.length] = Constraint.create(optionsA);
          var thisConA = this.dropConstraints[this.dropConstraints.length - 1];
          World.add(world, thisConA);
          
          ///////// SECOND CONSTRAINT
          let optionsB = {
            bodyA: this.dropLetters[m].bodyLetter,
            bodyB: this.dropLetters[m - 1].bodyLetter,
            stiffness: 0.1,
            damping: 0.05
          }
          this.dropConstraints[this.dropConstraints.length] = Constraint.create(optionsB);
          var thisConB = this.dropConstraints[this.dropConstraints.length - 1];
          World.add(world, thisConB);

          ///////// THIRD CONSTRAINT
          let optionsC = {
            bodyA: this.dropLetters[m].bodyLetter,
            bodyB: this.dropLetters[m - 1].bodyLetter,
            pointA: {x: 0, y: (this.nowSize * pgTextFactor[fontSelect])/2},
            pointB: {x: 0, y: (this.nowSize * pgTextFactor[fontSelect])/2},
            stiffness: 0.1,
            damping: 0.05
          }
          this.dropConstraints[this.dropConstraints.length] = Constraint.create(optionsC);
          var thisConC = this.dropConstraints[this.dropConstraints.length - 1];
          World.add(world, thisConC);
        }
      }
    }
  }

  refresh(){
    for(var m = 0; m < this.dropLetters.length; m++){
      this.dropLetters[m].refresh();
    }
    this.setOriginalOrder();
  }

  resetPos(){
    for(var m = 0; m < this.dropLetters.length; m++){
      this.dropLetters[m].resetPos();
    }
  }

  removeIt(){
    for(var m = this.dropLetters.length - 1; m >= 0; m--){
      this.dropLetters[m].removeIt();
    }
  }

  removeConstraint(){
    for(var m = this.dropConstraints.length - 1; m >=0; m--){
      var removeThisOne = this.dropConstraints[m];
      Composite.remove(world, removeThisOne);
    }
  }
}