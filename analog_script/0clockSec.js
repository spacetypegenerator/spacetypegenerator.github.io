class ClockSec {
  constructor(){
    this.secCount = 12;
    this.secs = [];

    for(var n = 0; n < this.secCount; n++){
      this.secs[n] = new AnSec(n);
    }
  }

  update(){
    for(var n = 0; n < this.secCount; n++){
      this.secs[n].update();
    }
  }

  display(){
    push();
      for(var n = 0; n < this.secCount; n++){
        this.secs[n].display();
      }
    pop();
  }

  refresh(){
    for(var n = 0; n < this.secCount; n++){
      this.secs[n].refresh();
    }
  }
}