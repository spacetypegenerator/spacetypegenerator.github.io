class Box {
  constructor(w, h, sel){
    this.w = w;
    this.h = h;
    this.sel = sel;

    this.ver;
    var rs = random(12);
    if(rs<4){
      this.ver = 0;
    } else if(rs<8){
      this.ver = 1;
    } else {
      this.ver = 2;
    }
  }

  display(){
    push();
      translate(-this.w/2, -this.h/2);
      stroke(foreColor);
      strokeJoin(ROUND);
      noFill();
      rect(0,0, this.w, this.h);
      line(0, 0, this.h/2, -this.h/2);
      line(this.w, 0, this.w + this.h/2, -this.h/2);
      line(0, this.h, this.h/2, this.h - this.h/2);
      line(this.w, this.h, this.w + this.h/2, this.h - this.h/2);
      // fill(bkgdColor);
      rect(this.h/2, - this.h/2, this.w, this.h);
    pop();
  }
}
