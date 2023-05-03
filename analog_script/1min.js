class AnMin {
  constructor(n_){
    this.n = n_;

    this.baseAng = PI/6 * this.n;
    this.currentAng = this.baseAng;

    this.res = 50;
    
    this.section = minSpread;
    this.crust = this.section * mainMinRadius
    this.secDist = this.crust/this.res;

    this.ang = this.section/this.res;

    this.stripH = minSecStripH;

    // this.resil = 0.001;
    this.influFront = 0;
    this.borderFront = 0;
    this.influBack = 0;
    this.borderBack = 0;

    this.pgSelect = pgT[1][this.n];
    this.heightRatio = pgWidth * this.stripH/pgHeight;

    var maxPerc = hrMinMax[this.n]/pgWidth;
    var minPerc = hrMinMin[this.n]/pgWidth;

    this.angMax = (this.section * maxPerc);
    this.angMin = (this.section * minPerc);

    this.secAng = 0;

    this.bump = (this.heightRatio - this.section * mainMinRadius)/2;

    this.resil = 0.0001;
    this.driftStrength = 0.000005;
  }

  update(){
    // get pushed by outside
    if(this.n == 0){
      if(this.borderBack - 2*PI < minClock.mins[minClock.minCount-1].borderFront + spreadMinAng){
        this.currentAng = minClock.mins[minClock.minCount-1].borderFront + this.secAng/2 - 2*PI + spreadMinAng;
      }
    } else {
      if(this.borderBack < minClock.mins[this.n - 1].borderFront + spreadMinAng){
        this.currentAng = minClock.mins[this.n - 1].borderFront + this.secAng/2 + spreadMinAng;
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
    var nowX = cos(this.baseAng) * mainMinRadius;
    var nowY = sin(this.baseAng) * mainMinRadius;
    var thisDist = dist(minX, minY, nowX, nowY);
    var thisBlend = map(thisDist, 0, mainMinRadius*2, 0, 1);

    pgTexture(1, this.n, thisBlend, false);

    this.secAng = map(thisDist, 0, mainMinRadius*2, this.angMax, this.angMin);

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
      // line(0, 0, cos(this.section/2) * mainMinRadius, sin(this.section/2) * mainMinRadius);

      // strokeWeight(0.5);
      // stroke(255, 0, 0);
      // line(0, 0, cos(this.section/2 - this.secAng/2) * mainMinRadius, sin(this.section/2 - this.secAng/2) * mainMinRadius);
      // line(0, 0, cos(this.section/2 + this.secAng/2) * mainMinRadius, sin(this.section/2 + this.secAng/2) * mainMinRadius);

      // strokeWeight(0.5);
      // stroke(0, 255, 0);
      // line(0, 0, cos(0) * mainMinRadius, sin(0) * mainMinRadius);
      // line(0, 0, cos(this.section) * mainMinRadius, sin(this.section) * mainMinRadius);

      texture(this.pgSelect);

      beginShape(TRIANGLE_STRIP);
      for(var n = 0; n < this.res; n++){
        var thisAng = n * this.ang;

        var xBot = cos(thisAng) * (mainMinRadius - this.stripH/2);
        var yBot = sin(thisAng) * (mainMinRadius - this.stripH/2);
        var xTop = cos(thisAng) * (mainMinRadius + this.stripH/2);
        var yTop = sin(thisAng) * (mainMinRadius + this.stripH/2);
      
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
    this.crust = this.section * mainMinRadius
    this.secDist = this.crust/this.res;

    this.stripH = minSecStripH;

    this.heightRatio = pgWidth * this.stripH/pgHeight;

    this.bump = (this.heightRatio - this.section * mainMinRadius)/2;
  }
}
