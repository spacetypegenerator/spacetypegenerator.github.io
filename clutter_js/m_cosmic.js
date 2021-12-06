class M_Cosmic {
  constructor(sel) {
    this.sel = sel;

    this.partCount = 20;

    this.glideWindow = 0;

    this.angY = [];
    this.angZ = [];
    this.gSpeed = [];
    this.dist = [];

    this.gAccel = 0.15;

    this.xSpace = [];
    this.ySpace = [];
    this.zSpace = [];
    for(var p = 0; p<this.partCount; p++){
      this.xSpace[p] = 0;
      this.ySpace[p] = 0;
      this.zSpace[p] = 0;
      this.angY[p] = random(2*PI);
      this.angZ[p] = random(2*PI);
      this.gSpeed[p] = random(5,60);
    }

    this.rot1 = random(-0.005,0.005);
    this.rot2 = random(-0.005,0.005);

    this.rColor3D = grabRandomColor();
  }

  glide(){
    for(var p = 0; p<this.partCount; p++){
      this.gSpeed[p] -= this.gSpeed[p] * this.gAccel;
      var nowDist = this.gSpeed[p];

      this.xSpace[p] += nowDist * sin(this.angZ[p]) * cos(this.angY[p]);
      this.ySpace[p] += nowDist * sin(this.angZ[p]) * sin(this.angY[p]);
      this.zSpace[p] += nowDist * cos(this.angZ[p]);
    }
    this.glideWindow ++;
  }

  display(){
    push();
      translate(circ[this.sel].body.position.x, circ[this.sel].body.position.y);

      rotateY(frameCount * this.rot1);
      rotateX(frameCount * this.rot2);

      for(var p = 0; p<this.partCount; p++){
        stroke(this.rColor3D);
        strokeWeight(1);
        line(0,0,0,this.xSpace[p], this.ySpace[p], this.zSpace[p]);

        fill(foreColor);
        noStroke();
        push();
          translate(this.xSpace[p], this.ySpace[p], this.zSpace[p]);
          rotateX(-frameCount * this.rot2);
          rotateY(-frameCount * this.rot1);
          ellipse(0,0,10,10);
        pop();
      }

    pop();
  }
}
