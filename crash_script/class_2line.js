class DropLine {
  constructor(lineIndex){
    this.lineIndex = lineIndex;
    this.lineLength = inputText[this.lineIndex].length;
    
    this.letterCounter = 0;
    this.dropLetters = [];
    this.dropConstraints = [];

    this.dropDebris = [];

    this.setUnits();
  }

  run(){
    for(var m = 0; m < this.dropLetters.length; m++){
      this.dropLetters[m].run();
    }
  }

  setUnits(){
    textFont(tFont[fontSelect]);
    textSize(pgTextSize);

    var thisY = (pgTextSize * pgTextFactor[fontSelect] + leading) * this.lineIndex;
    thisY += height/2 - (inputText.length - 2) * (pgTextSize * pgTextFactor[fontSelect] + leading)/2;
    thisY -= leading/2;

    var xCulm = 0;

    for(var m = 0; m < unitCore[this.lineIndex].length; m++){
      if(unitCore[this.lineIndex][m].mode == 0){ ///////////////////////////////////////////// INSERT TEXT
        var thisWord = unitCore[this.lineIndex][m].content;

        for(var n = 0; n < thisWord.length; n++){
          var thisLetter = thisWord.charAt(n);

          var thisX = 0;
          if(n > 0){
            var holdX = textWidth(thisWord.substring(0, n + 1));
            thisX = holdX - textWidth(thisWord.charAt(n));
          }
    
          thisX += width/2;
          thisX += xCulm;
          thisX -= lineWidths[this.lineIndex]/2;

          var dropIndex = this.dropLetters.length;
          this.dropLetters[dropIndex] = new DropLetter(thisLetter, thisX, thisY);
        
          if(n > 0 && constrainMode != 0){
            this.configureConstraint(this.letterCounter);
          }

          this.letterCounter ++;
        } 

        xCulm += textWidth(thisWord + " ");

      } else if(unitCore[this.lineIndex][m].mode == 1){ ///////////////////////////////////// INSERT IMAGE
        var thisX = 0;
        thisX += width/2;
        thisX += xCulm;
        thisX -= lineWidths[this.lineIndex]/2;
        
        var thisDebris = debrisGroup.length;
        var thisDebrisIndex = unitCore[this.lineIndex][m].content.index;
        debrisGroup[thisDebris] = new DropDebris(thisDebrisIndex, thisX, thisY);

        xCulm += debrisGroup[thisDebris].w + textWidth(" ");
      } else if(unitCore[this.lineIndex][m].mode == 2){ ///////////////////////////////////// TYPE BLOCK
        var thisX = 0;
        thisX += width/2;
        thisX += xCulm;
        thisX -= lineWidths[this.lineIndex]/2;
        
        var thisDebris = debrisGroup.length;
        var thisWord = unitCore[this.lineIndex][m].content;
        var thisWordWidth = textWidth(thisWord);
        debrisGroup[thisDebris] = new DropWord(thisWord, thisWordWidth, thisX, thisY);

        xCulm += debrisGroup[thisDebris].w + textWidth(" ");
      }
    }
  }

  configureConstraint(m){
    // if(constrainMode == 1){
    //   if(this.dropLetters[m].thisLetter != " "){
    //     if(this.dropLetters[m - 1].thisLetter != " "){
    //       ///////// ONE CONSTRAINT
    //       let optionsA = {
    //         bodyA: this.dropLetters[m].bodyLetter,
    //         bodyB: this.dropLetters[m - 1].bodyLetter,
    //         stiffness: 0.05,
    //         damping: 0.1
    //       }
    //       this.dropConstraints[this.dropConstraints.length] = Constraint.create(optionsA);
    //       var thisConA = this.dropConstraints[this.dropConstraints.length - 1];
    //       World.add(world, thisConA);
    //     }
    //   }
    // } else if (constrainMode == 2){
      if(this.dropLetters[m].thisLetter != " "){
        if(this.dropLetters[m - 1].thisLetter != " "){
          ///////// FIRST CONSTRAINT
          let optionsA = {
            bodyA: this.dropLetters[m].bodyLetter,
            bodyB: this.dropLetters[m - 1].bodyLetter,
            pointA: {x: 0, y: -(pgTextSize * pgTextFactor[fontSelect])/2},
            pointB: {x: 0, y: -(pgTextSize * pgTextFactor[fontSelect])/2},
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
            pointA: {x: 0, y: (pgTextSize * pgTextFactor[fontSelect])/2},
            pointB: {x: 0, y: (pgTextSize * pgTextFactor[fontSelect])/2},
            stiffness: 0.1,
            damping: 0.05
          }
          this.dropConstraints[this.dropConstraints.length] = Constraint.create(optionsC);
          var thisConC = this.dropConstraints[this.dropConstraints.length - 1];
          World.add(world, thisConC);
        }
      }
    // }
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