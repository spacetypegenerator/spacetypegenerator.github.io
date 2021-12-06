class M_Ring {
  constructor(sel) {
    this.sel = sel;

    this.glideWindow = 0;

    this.gSpeed = random(50,140);
    this.gAccel = 0.15;

    this.r = 0;

    this.rColor3D = grabRandomColor();
  }

  glide(){
    this.gSpeed -= this.gSpeed * this.gAccel;
    this.r += this.gSpeed;

    this.glideWindow ++;
  }

  display(){
    push();
      translate(circ[this.sel].body.position.x, circ[this.sel].body.position.y);
      rotateX(PI/2);
      rotateY(atan2(circ[this.sel].body.position.y - height/2, circ[this.sel].body.position.x - width/2) + PI/2);

      noFill();
      stroke(this.rColor3D);
      strokeWeight(1);
      ellipse(0,0,this.r, this.r);
    pop();
  }
}
