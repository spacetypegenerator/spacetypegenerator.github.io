class Scribble {
  constructor(w, h, sel){
    this.w = w;
    this.h = h;
    this.sel = sel;

    this.pointCount = 7;

    this.xM = [];
    this.yM = [];
    this.xH = [];
    this.yH = [];

    this.refreshScribble();
  }

  display(){
    noFill();
    stroke(foreColor);
    strokeWeight(1);
    beginShape();
      vertex(-heightRatio[this.sel]/2, 0);
      for(var n = 1; n<this.pointCount; n++){
        bezierVertex( this.xM[n-1] - this.xH[n-1], this.yM[n-1] - this.yH[n-1],
                      this.xM[n] + this.xH[n], this.yM[n] + this.yH[n],
                      this.xM[n], this.yM[n]);
      }
    endShape();

    if((frameCount - this.sel)%5 == 0){
      this.refreshScribble();
    }
  }

  refreshScribble(){
    for(var n = 0; n<this.pointCount; n++){
      var xR = random(-20, 20);
      var yR = random(-10, 10);
      var ang = random(-PI/8, PI/8);
      var influ = this.w/2 + random(40);

      this.xM[n] = cos(-PI/2 + n*PI) * this.h/2 + xR;
      this.yM[n] = sin(-PI/2 + n*PI) * this.h/2 + yR;

      this.xH[n] = cos(n*PI + ang) * influ;
      this.yH[n] = sin(n*PI + ang) * influ;
    }
  }
}
