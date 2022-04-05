class Grad {
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
    if(this.ver == 1){
      image(pGradV, -this.w/2, -this.h/2, this.w, this.h);
    } else if(this.ver == 2){
      image(pGradH, -this.w/2, -this.h/2, this.w, this.h);
    } else {
      image(pGradCH, -this.w/2, -this.h/2, this.w, this.h);
    }
  }
}
