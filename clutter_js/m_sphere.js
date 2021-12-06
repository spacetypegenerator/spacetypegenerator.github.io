class M_Sphere {
  constructor(sel) {
    this.sel = sel;

    this.latCount = 10;
    this.latAng = 2*PI/this.latCount/2;

    this.glideWindow = 0;

    this.gSpeed = random(50,140);
    this.gAccel = 0.125;

    this.r = 0;

    this.rColor3D = grabRandomColor();

    this.mode = round(random(2));
  }

  glide(){
    this.gSpeed -= this.gSpeed * this.gAccel;
    this.r += this.gSpeed;

    this.glideWindow ++;
  }

  display(){
    if(this.mode==0){
      push();
        translate(circ[this.sel].body.position.x, circ[this.sel].body.position.y);
        rotateX(PI/2);
        rotateY(atan2(circ[this.sel].body.position.y, circ[this.sel].body.position.x) + PI/2);

        noFill();
        stroke(this.rColor3D);
        strokeWeight(1);
        var animateP = (frameCount/120)%1

        for(var p = animateP; p<this.latCount; p++){
          push();
            rotateY(-p*this.latAng);
            ellipse(0,0,this.r, this.r);
          pop();
        }
      pop();
    } else if(this.mode==1){
      push();
        translate(circ[this.sel].body.position.x, circ[this.sel].body.position.y);
        rotateX(PI/2);
        rotateY(atan2(circ[this.sel].body.position.y, circ[this.sel].body.position.x) + PI/2);

        noFill();
        stroke(this.rColor3D);
        strokeWeight(1);

        var animateP = (frameCount/120)%1

        for(var p = animateP; p<this.latCount; p++){
          var stepR = map(p, 0, this.latCount, 0, PI);
          var newRadius = sin(stepR) * this.r;

          var newY = map(p, 0, this.latCount, this.r/2, -this.r/2);
          push();
            translate(0, 0, newY);
            ellipse(0, 0, newRadius, newRadius);
          pop();
        }
      pop();
    } else if(this.mode==2){
      push();
        translate(circ[this.sel].body.position.x, circ[this.sel].body.position.y);
        rotateX(PI/2);
        rotateY(atan2(circ[this.sel].body.position.y, circ[this.sel].body.position.x) + PI/2);

        noFill();
        stroke(this.rColor3D);
        strokeWeight(1);

        var animateP = (frameCount/120)%1

        for(var p = animateP; p<this.latCount; p++){
          var stepR = map(p, 0, this.latCount, 0, PI);
          var newRadius = sin(stepR) * this.r;

          var newY = map(cos(stepR), 1, -1, -this.r/2, this.r/2);
          push();
            translate(0, 0, newY);
            ellipse(0, 0, newRadius, newRadius);
          pop();

          push();
            rotateX(PI/2);
            rotateY(p*this.latAng);
            ellipse(0,0,this.r, this.r);
          pop();
        }
      pop();
    }
  }
}
