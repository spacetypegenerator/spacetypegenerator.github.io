class ClockHour {
  constructor(){
    this.hourCount = 12;
    this.hours = [];

    for(var n = 0; n < this.hourCount; n++){
      this.hours[n] = new AnHour(n);
    }
  }

  update(){
    for(var n = 0; n < this.hourCount; n++){
      this.hours[n].update();
    }
  }

  display(){
    push();
      for(var n = 0; n < this.hourCount; n++){
        this.hours[n].display();
      }
    pop();
  }

  refresh(){
    for(var n = 0; n < this.hourCount; n++){
      this.hours[n].refresh();
    }
  }
}