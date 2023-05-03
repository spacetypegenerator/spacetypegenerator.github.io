class AnHour {
  constructor(n_){
    this.n = n_;

    this.baseAng = PI/6 * this.n;
    this.currentAng = this.baseAng;

    this.res = 60;
    
    this.section = hourSpread;
    this.crust = this.section * mainHourRadius
    this.secDist = this.crust/this.res;

    this.ang = this.section/this.res;

    this.stripH = hourSecStripH;

    // this.resil = 0.001;
    this.influFront = 0;
    this.borderFront = 0;
    this.influBack = 0;
    this.borderBack = 0;

    this.pgSelect = pgT[0][this.n];
    this.heightRatio = pgWidth * this.stripH/pgHeight;

    var maxPerc = hrHourMax[this.n]/pgWidth;
    var minPerc = hrHourMin[this.n]/pgWidth;

    this.angMax = (this.section * maxPerc);
    this.angMin = (this.section * minPerc);

    this.secAng = 0;

    this.bump = (this.heightRatio - this.section * mainHourRadius)/2;

    this.resil = 0.0001;
    this.driftStrength = 0.000005;
  }

  update(){
    // get pushed by outside
    if(this.n == 0){
      if(this.borderBack - 2*PI < hourClock.hours[hourClock.hourCount-1].borderFront + spreadHourAng){
        this.currentAng = hourClock.hours[hourClock.hourCount-1].borderFront + this.secAng/2 - 2*PI + spreadHourAng;
      }
    } else {
      if(this.borderBack < hourClock.hours[this.n - 1].borderFront + spreadHourAng){
        this.currentAng = hourClock.hours[this.n - 1].borderFront + this.secAng/2 + spreadHourAng;
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
    var nowX = cos(this.baseAng) * mainHourRadius;
    var nowY = sin(this.baseAng) * mainHourRadius;
    var thisDist = dist(hourX, hourY, nowX, nowY);
    var thisBlend = map(thisDist, 0, mainHourRadius*2, 0, 1);

    pgTexture(0, this.n, thisBlend, false);
    // this.pgSelect = pgT[0][this.n];

    this.secAng = map(thisDist, 0, mainHourRadius*2, this.angMax, this.angMin);

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
      // line(0, 0, cos(this.section/2) * mainHourRadius, sin(this.section/2) * mainHourRadius);

      // strokeWeight(0.5);
      // stroke(255, 0, 0);
      // line(0, 0, cos(this.section/2 - this.secAng/2) * mainHourRadius, sin(this.section/2 - this.secAng/2) * mainHourRadius);
      // line(0, 0, cos(this.section/2 + this.secAng/2) * mainHourRadius, sin(this.section/2 + this.secAng/2) * mainHourRadius);

      // strokeWeight(0.5);
      // stroke(0, 255, 0);
      // line(0, 0, cos(0) * mainHourRadius, sin(0) * mainHourRadius);
      // line(0, 0, cos(this.section) * mainHourRadius, sin(this.section) * mainHourRadius);

      texture(this.pgSelect);

      beginShape(TRIANGLE_STRIP);
      for(var n = 0; n < this.res; n++){
        var thisAng = n * this.ang;

        var xBot = cos(thisAng) * (mainHourRadius - this.stripH/2);
        var yBot = sin(thisAng) * (mainHourRadius - this.stripH/2);
        var xTop = cos(thisAng) * (mainHourRadius + this.stripH/2);
        var yTop = sin(thisAng) * (mainHourRadius + this.stripH/2);
      
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
    this.crust = this.section * mainHourRadius
    this.secDist = this.crust/this.res;

    this.stripH = hourSecStripH;

    this.heightRatio = pgWidth * this.stripH/pgHeight;

    this.bump = (this.heightRatio - this.section * mainHourRadius)/2;
  }
}
