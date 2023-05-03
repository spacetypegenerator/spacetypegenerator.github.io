class ClockMin {
  constructor(){
    this.minCount = 12;
    this.mins = [];

    for(var n = 0; n < this.minCount; n++){
      this.mins[n] = new AnMin(n);
    }
  }

  update(){
    for(var n = 0; n < this.minCount; n++){
      this.mins[n].update();
    }
  }

  display(){
    push();
      for(var n = 0; n < this.minCount; n++){
        this.mins[n].display();
      }
    pop();
  }

  refresh(){
    for(var n = 0; n < this.minCount; n++){
      this.mins[n].refresh();
    }
  }
}