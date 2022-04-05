class Zigzag {
  constructor(w, h, sel){
    this.w = w;
    this.h = h;
    this.sel = sel;

    this.pointCount = 3;
    this.res = 20;
    this.xSpace = this.w/this.pointCount;

    this.x = [];
    this.y = [];
    this.xH = [];
    this.yH = [];

    this.ver;
    var rs = random(10);
    if(rs < 2.5){
      this.ver = 0;
    } else if(rs < 5){
      this.ver = 1;
    } else if(rs < 7.5){
      this.ver = 2;
    } else {
      this.ver = 3;
    }

    this.emphColor = colorA[int(random(3))];

    this.refreshZigzag();
  }

  display(){
    if(this.ver == 0){
      this.gradientStroke();
    } else if(this.ver == 1){
      this.gradientStroke2();
    } else if(this.ver == 2){
      this.outlineStroke();
    } else {
      this.thinStroke();
    }

    if((frameCount - this.sel)%10 == 0){
      this.refreshZigzag();
    }
  }

  refreshZigzag(){
    for(var n = 0; n<=this.pointCount; n++){
      this.x[n] = n*this.xSpace + random(-5, 5);
      this.y[n] = random(-5, 5);
      var a = PI/4 + random(-PI/8, PI/8);
      var influ = random(this.h/2, this.h*3/2);
      this.xH[n] = cos(a) * influ;
      this.yH[n] = sin(a) * influ;
    }
  }

  gradientStroke(){
    noFill();
    strokeWeight(10);
    strokeJoin(ROUND);
    strokeCap(ROUND);

    var preX = 0;
    var preY = 0;

    push();
      translate(-this.w/2, 0);
      for(var m = 1; m<=this.pointCount; m++){
        for(var n = 0; n<=this.res; n++){
          var t = n/this.res;

          var rampColor = lerpColor(colorA[m-1], colorA[m], t);
          stroke(rampColor);

          let x = bezierPoint(this.x[m-1], this.x[m-1] - this.xH[m-1], this.x[m] + this.xH[m], this.x[m], t);
          let y = bezierPoint(this.y[m-1], this.y[m-1] - this.yH[m-1], this.y[m] + this.yH[m], this.y[m], t);
          line(preX, preY, x, y);
          preX = x;
          preY = y;
        }
      }
    pop();
  }

  gradientStroke2(){
    noFill();
    strokeWeight(10);
    strokeJoin(ROUND);
    strokeCap(ROUND);

    var preX = 0;
    var preY = 0;
    var ticker = 0;
    push();
      translate(-this.w/2, 0);
      for(var m = 1; m<=this.pointCount; m++){
        for(var n = 0; n<=this.res; n++){
          var t2 = ticker/(this.res * this.pointCount);
          var rampColor = lerpColor(this.emphColor, bkgdColor, t2);
          stroke(rampColor);

          var t = n/this.res;
          let x = bezierPoint(this.x[m-1], this.x[m-1] - this.xH[m-1], this.x[m] + this.xH[m], this.x[m], t);
          let y = bezierPoint(this.y[m-1], this.y[m-1] - this.yH[m-1], this.y[m] + this.yH[m], this.y[m], t);
          line(preX, preY, x, y);
          preX = x;
          preY = y;
          ticker ++;
        }
      }
    pop();
  }

  outlineStroke(){
    push();
      translate(-this.w/2, 0);
      noFill();

      for(var m = 0; m<2; m++){
        if(m==0){
          stroke(this.emphColor);
        } else {
          stroke(bkgdColor);
        }
        strokeWeight(26 - 3*m);
        strokeJoin(ROUND);
        strokeCap(PROJECT);
        beginShape();
          vertex(this.x[0], this.y[0]);
          for(var n = 1; n<=this.pointCount; n++){
            bezierVertex(
              // this.x[n-1], this.y[n-1],
              this.x[n-1] - this.xH[n-1], this.y[n-1] - this.yH[n-1],
              this.x[n] + this.xH[n], this.y[n] + this.yH[n],
              this.x[n], this.y[n]
            )
          }
        endShape();
      }
    pop();
  }

  thinStroke(){
    push();
      translate(-this.w/2, 0);
      noFill();
      stroke(this.emphColor);
      strokeWeight(2);
      strokeJoin(ROUND);
      beginShape();
        vertex(this.x[0], this.y[0]);
        for(var n = 1; n<=this.pointCount; n++){
          bezierVertex(
            // this.x[n-1], this.y[n-1],
            this.x[n-1] - this.xH[n-1], this.y[n-1] - this.yH[n-1],
            this.x[n] + this.xH[n], this.y[n] + this.yH[n],
            this.x[n], this.y[n]
          )
        }
      endShape();
    pop();
  }

}



// display(){
//   push();
//     translate(-this.w/2, 0);
//     stroke(0,0,255);
//     line(0,0,this.w,0);
//     noFill();
//     stroke(foreColor);
//     strokeWeight(5);
//     strokeJoin(ROUND);
//     beginShape();
//       vertex(this.x[0], this.y[0]);
//       for(var n = 1; n<=this.pointCount; n++){
//         bezierVertex(
//           // this.x[n-1], this.y[n-1],
//           this.x[n-1] - this.xH[n-1], this.y[n-1] - this.yH[n-1],
//           this.x[n] + this.xH[n], this.y[n] + this.yH[n],
//           this.x[n], this.y[n]
//         )
//       }
//     endShape();
//   pop();
//
//   if((frameCount - this.sel)%5 == 0){
//     this.refreshZigzag();
//   }
// }
