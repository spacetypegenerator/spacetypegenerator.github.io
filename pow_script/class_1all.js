class SplodeAll {
  constructor(){
    this.splodeLines = [];
    for(var m = 0; m < inputText.length; m++){
      this.splodeLines[m] = new SplodeLine(m);
    }
  }

  run(){
    for(var m = 0; m < inputText.length; m++){
      this.splodeLines[m].run();
    }
  }

  refresh(){
    for(var m = 0; m < inputText.length; m++){
      this.splodeLines[m].refresh();
    }
  }
}