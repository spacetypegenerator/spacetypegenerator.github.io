class PartPac{
  constructor() {
    print(clockBorder);
    this.min = clockBorder * 0.015;
    this.max = clockBorder * 0.06;

    this.parts = [];
    this.partsPhysics = [];

    this.buffer = 500;

    this.packer();
  }

  packer(){
    var currentBuffer = 0;
    while(currentBuffer < this.buffer){
      var dia_ = random(this.min, this.max);
      var rad = random(clockBorder/2);
      var ang = random(TWO_PI);

      var x_ = width/2 + cos(ang) * rad;
      var y_ = height/2 + sin(ang) * rad;

      var make = true;

      // print(this.parts.length);
      for(var n = 0; n < this.parts.length; n++){
        var distCheck = dist(x_, y_, this.parts[n].x, this.parts[n].y);
        var diaCheck = dia_/2 + this.parts[n].dia/2;

        if(distCheck < diaCheck){
          make = false;
        }
      }

      if(make){
        var circ = {
          x: x_,
          y: y_,
          dia: dia_
        }
        this.parts.push(circ);

        currentBuffer = 0;
      } else {
        currentBuffer ++;
      }
    }

    for(var n = 0; n < this.parts.length; n++){
      let options = {
          friction: 0.1,
          restitution: 0.95,
      }
      this.partsPhysics[n] = Bodies.circle(this.parts[n].x, this.parts[n].y, this.parts[n].dia/2, options);
      Composite.add(world, this.partsPhysics[n]);
    }

    print(this.partsPhysics.length)
  }

  run(){
    // this.update();
    this.display();
  }

  display() {
    // for(var m = 0; m < this.parts.length; m++){
    //   push();
    //     noStroke();
    //     fill(0,0,255);
    //     ellipse(this.parts[m].x, this.parts[m].y, this.parts[m].dia);
    //   pop();
    // }

    for(var n = 0; n < this.partsPhysics.length; n++){
      let pos = this.partsPhysics[n].position;
      push();
        translate(pos.x, pos.y);
        noStroke();
        fill(fillColor);
        ellipse(0, 0, this.parts[n].dia);
      pop();
    }
  }

  resetIt(){
    print("PARTICLE RESET!");
    for(var n = this.partsPhysics.length - 1; n >= 0; n--){
      Matter.Body.setPosition(this.partsPhysics[n], {x: this.parts[n].x + random(-5, 5), y: this.parts[n].y + random(-5, 5)});

    }
  }

  removeIt(){
    for(var n = this.partsPhysics.length - 1; n >= 0; n--){
      Composite.remove(world, this.partsPhysics[n]);
    }
  }
}