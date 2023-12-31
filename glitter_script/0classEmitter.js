class Emitter {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.glitterCount = 2;
    this.glitter = [];
    for(var m = 0; m < this.glitterCount; m++){
      this.glitter[m] = new Glitter();
    }
  }

  run(){
    push();
      translate(this.x, this.y);
      for(var m = 0; m < this.glitterCount; m++){
        this.glitter[m].run();
      }
    pop();
  }
}
