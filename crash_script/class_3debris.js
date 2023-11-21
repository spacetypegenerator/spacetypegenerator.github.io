class DropDebris {
  constructor(m, x, y){
    // print("CREATED WITH THIS M: " + m);

    this.m = m;

    this.hr = pgImage[this.m].width/pgImage[this.m].height;

    this.w = this.hr * pgTextSize * pgTextFactor[fontSelect];
    this.h = pgTextSize * pgTextFactor[fontSelect];

    // this.coreX = x;
    // this.coreY = y;

    this.x = x + this.w/2;
    this.y = y - this.h/2;

    let options = {
      friction: 0,
      restitution: 0.6,
    }

    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    Composite.add(world, this.body);
  }

  run() {
    this.update();
    this.display();
  }
  
  update() {

  }

  display() {
    if(debrisData[this.m].mode == 0){
      this.displayFrame();
    } else if(debrisData[this.m].mode == 1){
      this.displayImage();
    }

  }

  displayFrame(){
    strokeWeight(1)
    stroke(strokeColor);
    noFill();

    let pos = this.body.position;
    let angle = this.body.angle;
    push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        line(-this.w/2, -this.h/2, this.w/2, this.h/2);
        line(-this.w/2, this.h/2, this.w/2, -this.h/2);
    pop();
  }

  displayImage(){
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
      translate(pos.x, pos.y);
      rotate(angle);

      imageMode(CENTER);
      image(pgImage[this.m], 0, 0, this.w, this.h);

      // noStroke();
      // fill(0,0,255);
      // textSize(20);
      // text(this.m, 0, 40);
    pop();
  }

  resetPos(){
    Matter.Body.setPosition(this.body, {x: this.x, y: this.y});
    Matter.Body.setAngle(this.body, 0);
    Matter.Body.setAngularSpeed(this.body, 0);
    Matter.Body.setAngularVelocity(this.body, 0);
    Matter.Body.setSpeed(this.body, 0);
  }

  removeIt(){
    Composite.remove(world, this.body);
  }
}