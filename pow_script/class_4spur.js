class SpurLetter {
  constructor(index, letter, x, y){
    this.index = index;
    this.letter = letter;
    this.x = x;
    this.y = y;

    this.testPoints;
    this.points = [];
    this.module = [];

    this.bumpMin, this.bumpMax, this.influMin, this.influMax;

    this.ticker = [];
    this.animWindow = 60;

    this.tickerSpeed = 2;

    this.solidToggle = true;

    this.isLetter = true;
    if(this.letter == ' '){
      this.isLetter = false;      
    }
    
    this.setValue();

    if(this.isLetter){
      this.createPoints();
      this.createModules();
    }
  }

  setValue(){
    this.bumpMin = coreScale * 2 * detailFactor;
    this.bumpMax = this.bumpMin * 5;
    this.influMin = coreScale * 3.0 * blastFactor;
    this.influMax = this.influMin * 12;
  }

  run(){
    this.update();
    // if(this.solidToggle){
      // this.runLetter();
    // } else {
      this.runBuldge();
    // }

    // this.runPoints();
  }

  runPoints(){
    for(var m = 0; m < this.testPoints.length; m++){
      fill(0);
      noStroke();
      
      ellipse(this.testPoints[m].x, this.testPoints[m].y, 5, 5); 
    }
  }

  update(){
    for(var p = 0; p < this.points.length; p++){
      for(var m = 0; m < this.module[p].length; m++){
        var tk0 = map(this.ticker[p][m], 0, this.animWindow, 0, 1);

        if(this.ticker[p][m] < 0){
          this.module[p][m].x = this.module[p][m].xStart;
          this.module[p][m].y = this.module[p][m].yStart;
          this.module[p][m].xH = 0;
          this.module[p][m].yH = 0; 
        } else if(this.ticker[p][m] < this.animWindow){
          this.module[p][m].x = map(easeOutExpo(tk0), 0, 1, this.module[p][m].xStart, this.module[p][m].xEnd);
          this.module[p][m].y = map(easeOutExpo(tk0), 0, 1, this.module[p][m].yStart, this.module[p][m].yEnd);
          this.module[p][m].xH = map(easeOutExpo(tk0), 0, 1, 0, this.module[p][m].xHend);
          this.module[p][m].yH = map(easeOutExpo(tk0), 0, 1, 0, this.module[p][m].yHend);
        } else {
          this.module[p][m].x = this.module[p][m].xEnd;
          this.module[p][m].y = this.module[p][m].yEnd;
          this.module[p][m].xH = this.module[p][m].xHend;
          this.module[p][m].yH = this.module[p][m].yHend; 
        }

        this.ticker[p][m] += this.tickerSpeed;

        if(this.ticker[p][m] > 0){
          this.solidToggle = false;
        }
      }
    }
  }

  runLetter(){
    fill(fillColor);
    stroke(strokeColor);
    strokeWeight(coreSW * 2);
    text(this.letter, this.x, this.y);
  }

  runBuldge(){
    fill(fillColor);
    stroke(strokeColor);
    strokeWeight(coreSW);

    beginShape();

    for(var p = 0; p < this.points.length; p++){
      
      if(p != 0){
        beginContour();
      }

      // beginShape();
      vertex(this.module[p][0].x, this.module[p][0].y);

      for(var m = 1; m < this.module[p].length; m++){
        var thisMod = this.module[p][m];
        var preMod = this.module[p][m - 1];

        // vertex(thisMod.x, thisMod.y);
        if((m%2) == 0){     /////// IN
          bezierVertex(
            preMod.x, preMod.y,
            preMod.xStart, preMod.yStart,
            thisMod.x, thisMod.y
          )
        } else {            /////// OUT
          bezierVertex(
            thisMod.xStart, thisMod.yStart,
            thisMod.x, thisMod.y,
            thisMod.x, thisMod.y
          )
        }
      }
      if(p != 0){
        endContour();
      }
    }
    endShape(CLOSE);
  }

  createPoints(){
    var sampleFac = map(detailFactor, 1.5, 0.3, 0.04, 0.175)

    var holdPoints = tFont[fontSelect].textToPoints(this.letter, this.x, this.y, pgTextSize, {sampleFactor: sampleFac}); // 0.085
    this.testPoints = tFont[fontSelect].textToPoints(this.letter, this.x, this.y, pgTextSize, {sampleFactor: sampleFac}); // 0.085

    var pathCount = 0;
    var pointCount = 0;
    this.points[pathCount] = [];
    this.points[pathCount][pointCount] = holdPoints[0];
    pointCount++;
    var preX = holdPoints[0].x;
    var preY = holdPoints[0].y;
    for(var m = 1; m < holdPoints.length; m++){
      if(dist(preX, preY, holdPoints[m].x, holdPoints[m].y) > 30){
        pathCount ++;
        pointCount = 0;
        this.points[pathCount] = [];
        this.points[pathCount][pointCount] = holdPoints[m];
        pointCount ++;
      } else {
        this.points[pathCount][pointCount] = holdPoints[m];
        pointCount++;
      }

      preX = holdPoints[m].x;
      preY = holdPoints[m].y;
    }
  }

  createModules(){
    this.module = [];
    this.solidToggle = true;

    for(var p = 0; p < this.points.length; p++){
      this.module[p] = [];

      var prePoint = 0;

      // FILL THE REST OF PATH WITH ANCHOR AND HANDLS
      for(var n = 0; n < this.points[p].length; n++){
        var thisPoint = this.points[p][n];

        var ang = atan2(thisPoint.y - orgY, thisPoint.x - orgX);
        
        // var splashDist = random(10,60) * (n%2);
        var splashDist = random(this.influMin, this.influMax) * (this.module[p].length%2);
        var xEnd_ = thisPoint.x + cos(ang) * splashDist;
        var yEnd_ = thisPoint.y + sin(ang) * splashDist;

        this.module[p][this.module[p].length] = {
          x: thisPoint.x,
          y: thisPoint.y,
          xStart: thisPoint.x,
          yStart: thisPoint.y,
          xEnd: xEnd_,
          yEnd: yEnd_,
        }

        prePoint = n;

        if(random(10) < 3.5 && n < this.points[p].length - 4 && spurMessyToggle){
          n++;
        }
      }
    }
    this.ticker = [];

    for(var p = 0; p < this.module.length; p++){
      this.ticker[p] = [];
      for(var m = 0; m < this.module[p].length; m++){
        var delayDist = dist(orgX, orgY, this.module[p][m].x, this.module[p][m].y);
        this.ticker[p][m] = map(delayDist, 0, width/2, 0, -15);
      }
    }
  }

  refresh(){
    this.setValue();

    if(this.isLetter){
      // this.createPoints();
      this.createModules();
    }
  }
}