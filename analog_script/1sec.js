class AnSec {
  constructor(n_){
    this.n = n_;

    this.baseAng = PI/6 * this.n;
    this.currentAng = this.baseAng;

    this.res = 40;
    
    this.section = secSpread;
    this.crust = this.section * mainSecRadius;
    this.secDist = this.crust/this.res;

    this.ang = this.section/this.res;

    this.stripH = secSecStripH;

    // this.resil = 0.001;
    this.influFront = 0;
    this.borderFront = 0;
    this.influBack = 0;
    this.borderBack = 0;

    this.pgSelect = pgT[2][this.n];
    this.heightRatio = pgWidth * this.stripH/pgHeight;

    var maxPerc = hrMinMax[this.n]/pgWidth;
    var minPerc = hrMinMin[this.n]/pgWidth;

    this.angMax = (this.section * maxPerc);
    this.angMin = (this.section * minPerc);

    this.secAng = 0;

    this.bump = (this.heightRatio - this.section * mainSecRadius)/2;

    this.resil = 0.0001;
    this.driftStrength = 0.000005;
  }

  update(){
    // get pushed by outside
    if(this.n == 0){
      if(this.borderBack - 2*PI < secClock.secs[secClock.secCount-1].borderFront + spreadSecAng){
        this.currentAng = secClock.secs[secClock.secCount-1].borderFront + this.secAng/2 - 2*PI + spreadSecAng;
      }
    } else {
      if(this.borderBack < secClock.secs[this.n - 1].borderFront + spreadSecAng){
        this.currentAng = secClock.secs[this.n - 1].borderFront + this.secAng/2 + spreadSecAng;
      }
    }

    // drift to normal
    if(this.currentAng < this.baseAng - this.driftStrength || this.currentAng > this.baseAng + this.driftStrength){
      var direction = 1;
      if(this.currentAng > this.baseAng + this.driftStrength){
        direction = -1;
      }
      this.currentAng += direction * this.resil;
    } else {
      this.currentAng = this.baseAng;
    }

    // for clocking actual pie size/frame
    var nowX = cos(this.baseAng) * mainSecRadius;
    var nowY = sin(this.baseAng) * mainSecRadius;
    var thisDist = dist(secX, secY, nowX, nowY);
    var thisBlend = map(thisDist, 0, mainSecRadius*2, 0, 1);

    pgTexture(2, this.n, thisBlend, false);

    this.secAng = map(thisDist, 0, mainSecRadius*2, this.angMax, this.angMin);

    this.figureInflu();
  }

  figureInflu(){
    this.borderBack = this.currentAng - this.secAng/2
    this.borderFront = this.currentAng + this.secAng/2;
    this.influBack = this.borderBack;
    this.influFront = this.borderFront;
  }

  display(){
    push();
      rotateZ(this.currentAng);
      rotateZ(-this.section/2);

      // strokeWeight(1);
      // stroke(0,0,255);
      // line(0, 0, cos(this.section/2) * mainSecRadius, sin(this.section/2) * mainSecRadius);

      // strokeWeight(0.5);
      // stroke(255, 0, 0);
      // line(0, 0, cos(this.section/2 - this.secAng/2) * mainSecRadius, sin(this.section/2 - this.secAng/2) * mainSecRadius);
      // line(0, 0, cos(this.section/2 + this.secAng/2) * mainSecRadius, sin(this.section/2 + this.secAng/2) * mainSecRadius);

      // strokeWeight(0.5);
      // stroke(0, 255, 0);
      // line(0, 0, cos(0) * mainSecRadius, sin(0) * mainSecRadius);
      // line(0, 0, cos(this.section) * mainSecRadius, sin(this.section) * mainSecRadius);

      texture(this.pgSelect);

      beginShape(TRIANGLE_STRIP);
      for(var n = 0; n < this.res; n++){
        var thisAng = n * this.ang;

        var xBot = cos(thisAng) * (mainSecRadius - this.stripH/2);
        var yBot = sin(thisAng) * (mainSecRadius - this.stripH/2);
        var xTop = cos(thisAng) * (mainSecRadius + this.stripH/2);
        var yTop = sin(thisAng) * (mainSecRadius + this.stripH/2);
        
        if(flipBottomOn){
          if(this.n >= 4 && this.n <= 8){
            var u = map(n * this.secDist + this.bump, 0, this.heightRatio, 1, 0);
            vertex(xBot, yBot, u, 0);
            vertex(xTop, yTop, u, 1);
          } else {
            var u = map(n * this.secDist + this.bump, 0, this.heightRatio, 0, 1);
            vertex(xBot, yBot, u, 1);
            vertex(xTop, yTop, u, 0);
          }
        } else {
          var u = map(n * this.secDist + this.bump, 0, this.heightRatio, 0, 1);
          vertex(xBot, yBot, u, 1);
          vertex(xTop, yTop, u, 0);
        }
      }
      endShape();
    pop();
  }

  refresh(){
    this.crust = this.section * mainSecRadius
    this.secDist = this.crust/this.res;

    this.stripH = secSecStripH;

    this.heightRatio = pgWidth * this.stripH/pgHeight;

    this.bump = (this.heightRatio - this.section * mainSecRadius)/2;
  }
}
