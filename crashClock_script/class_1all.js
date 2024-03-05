class DropAll {
  constructor(mode){
    this.dropLines = [];

    this.count;
    if(mode == 0){              ///////////////// HOURS
      this.count = inputTextHour.length;
      for(var m = 0; m < this.count; m++){
        this.dropLines[m] = new DropLine(mode, m, 0);
      }
    } else if(mode == 1){       ///////////////// MIN
      this.count = inputTextMin.length;
      for(var m = 0; m < this.count; m++){
        this.dropLines[m] = new DropLine(mode, m, 0);
      }
    } else {                       ///////////////// TEXTOP
      this.count = inputTextTop.length + inputTextBottom.length;
      for(var m = 0; m < inputTextTop.length; m++){
        this.dropLines[m] = new DropLine(mode, m, 0);
      }
      for(var m = inputTextTop.length; m < this.count; m++){
        this.dropLines[m] = new DropLine(mode, m - inputTextTop.length, 1);
      }
    }
  }

  run(){
    for(var m = 0; m < this.count; m++){
      this.dropLines[m].run();
    }
    
    // for(var m = 0; m < debrisGroup.length; m++){
    //   debrisGroup[m].run();
    // }
  }

  refresh(){
    for(var m = 0; m < this.count; m++){
      this.dropLines[m].refresh();
    }
  }

  resetPos(){
    for(var m = 0; m < this.count; m++){
      this.dropLines[m].resetPos();
    }

    // for(var m = 0; m < debrisGroup.length; m++){
    //   debrisGroup[m].resetPos();
    // }
  }

  removeIt(){
    for(var m = this.count - 1; m >= 0; m--){
      this.dropLines[m].removeIt();
    }

    // for(var m = debrisGroup.length - 1; m >= 0; m--){
    //   debrisGroup[m].removeIt();
    // }
  }

  removeConstraint(){
    for(var m = this.count - 1; m >=0 ; m--){
      this.dropLines[m].removeConstraint();
    }
  }
}