class Cloud {
  constructor(w, h, sel){
    this.w = w;
    this.h = h;
    this.sel = sel;

    this.pointCount = 7;

    this.cloudAng = 2*PI/this.pointCount;
    this.cloudX = [];
    this.cloudXr = [];
    this.cloudY = [];
    this.cloudYr = [];
    this.cloudA = [];
    this.cloudInfl = [];

    this.refreshCloud();
  }

  display(){
    fill(bkgdColor);
    stroke(foreColor);
    strokeWeight(1);

    for(var p = 1; p < this.pointCount; p++){
      bezier(
        this.cloudX[p-1] + this.cloudXr[p-1], this.cloudY[p-1] + this.cloudYr[p-1],
        this.cloudX[p-1] + cos(this.cloudA[p-1]) * this.cloudInfl[p-1], this.cloudY[p-1] + sin(this.cloudA[p-1]) * this.cloudInfl[p-1],
        this.cloudX[p] + cos(this.cloudA[p]) * this.cloudInfl[p], this.cloudY[p] + sin(this.cloudA[p]) * this.cloudInfl[p],
        this.cloudX[p] + this.cloudXr[p], this.cloudY[p] + this.cloudYr[p]);
    }
    bezier(
      this.cloudX[this.pointCount-1] + this.cloudXr[this.pointCount-1], this.cloudY[this.pointCount-1] + this.cloudYr[this.pointCount-1],
      this.cloudX[this.pointCount-1] + cos(this.cloudA[this.pointCount-1]) * this.cloudInfl[this.pointCount-1], this.cloudY[this.pointCount-1] + sin(this.cloudA[this.pointCount-1]) * this.cloudInfl[this.pointCount-1],
      this.cloudX[0] + cos(this.cloudA[0]) * this.cloudInfl[0], this.cloudY[0] + sin(this.cloudA[0]) * this.cloudInfl[0],
      this.cloudX[0] + this.cloudXr[0], this.cloudY[0] + this.cloudYr[0]);

    if((frameCount - this.sel)%10 == 0){
      this.refreshCloud();
    }
  }

  refreshCloud(){
    for(var n = 0; n<this.pointCount; n++){
      this.cloudA[n] = n * this.cloudAng;
      this.cloudX[n] = cos(this.cloudA[n]) * this.w/2.25;
      this.cloudXr[n] = random(-20, 20);
      this.cloudY[n] = sin(this.cloudA[n]) * this.h/2.25;
      this.cloudYr[n] = random(-20, 20);
      this.cloudInfl[n] = random(40,60);
    }
  }
}
