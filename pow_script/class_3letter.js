class SplodeLetter {
  constructor(index, letter, x, y){
    this.index = index;
    this.letter = letter;
    this.x = x;
    this.y = y;

    this.testPoints;
    this.points = [];
    this.module = [];
    this.burst = [];

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
    this.influMin = coreScale * 2.5 * blastFactor;
    this.influMax = this.influMin * 12;
  }

  run(){
    this.update();
    if(this.solidToggle){
      this.runLetter();
    } else {
      this.runBuldge();
    }

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
          this.module[p][m].xPHactual = this.module[p][m].xPre;
          this.module[p][m].yPHactual = this.module[p][m].yPre;
          this.module[p][m].xHactual = this.module[p][m].x;
          this.module[p][m].yHactual = this.module[p][m].y;
        } else if(this.ticker[p][m] < this.animWindow){
          this.module[p][m].xPHactual = map(easeOutExpo(tk0), 0, 1, this.module[p][m].xPre, this.module[p][m].xPH);
          this.module[p][m].yPHactual = map(easeOutExpo(tk0), 0, 1, this.module[p][m].yPre, this.module[p][m].yPH);
          this.module[p][m].xHactual = map(easeOutExpo(tk0), 0, 1, this.module[p][m].x, this.module[p][m].xH);
          this.module[p][m].yHactual = map(easeOutExpo(tk0), 0, 1, this.module[p][m].y, this.module[p][m].yH);

          // this.module[p][m] = p5.Vector.lerp(this.anchs[p][m], this.handsTarget[p][m], easeOutExpo(tk0));
        } else {
          this.module[p][m].xPHactual = this.module[p][m].xPH;
          this.module[p][m].yPHactual = this.module[p][m].yPH;
          this.module[p][m].xHactual = this.module[p][m].xH;
          this.module[p][m].yHactual = this.module[p][m].yH;
        }

        this.ticker[p][m] += this.tickerSpeed;

        if(this.ticker[p][m] > 0){
          this.solidToggle = false;
        }
      }

      for(var m = 0; m < this.burst[p].length; m++){
        var tk0 = map(this.ticker[p][m], 0, this.animWindow, 0, 1);

        if(this.ticker[p][m] < 0){
          this.burst[p][m].x1mover = this.burst[p][m].x1start;
          this.burst[p][m].y1mover = this.burst[p][m].y1start;
          this.burst[p][m].x2mover = this.burst[p][m].x2start;
          this.burst[p][m].y2mover = this.burst[p][m].y2start;
        } else if(this.ticker[p][m] < this.animWindow){
          this.burst[p][m].x1mover = map(easeOutExpo(tk0), 0, 1, this.burst[p][m].x1start, this.burst[p][m].x1end);
          this.burst[p][m].y1mover = map(easeOutExpo(tk0), 0, 1, this.burst[p][m].y1start, this.burst[p][m].y1end);
          this.burst[p][m].x2mover = map(easeOutExpo(tk0), 0, 1, this.burst[p][m].x2start, this.burst[p][m].x2end);
          this.burst[p][m].y2mover = map(easeOutExpo(tk0), 0, 1, this.burst[p][m].y2start, this.burst[p][m].y2end);
        } else {
          this.burst[p][m].x1mover = this.burst[p][m].x1end;
          this.burst[p][m].y1mover = this.burst[p][m].y1end;
          this.burst[p][m].x2mover = this.burst[p][m].x2end;
          this.burst[p][m].y2mover = this.burst[p][m].y2end;
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
        if(this.module[p][m].a == 0){
          vertex(this.module[p][m].x, this.module[p][m].y);
        } else if(this.module[p][m].a == 1){
          bezierVertex(
            this.module[p][m].xPHactual, this.module[p][m].yPHactual,
            this.module[p][m].xHactual, this.module[p][m].yHactual,
            this.module[p][m].x, this.module[p][m].y
          )
        } else if(this.module[p][m].a == 2){
          vertex(this.module[p][m].xHactual, this.module[p][m].yHactual);
          vertex(this.module[p][m].x, this.module[p][m].y);
        }
      }
      if(p != 0){
        endContour();
      }
    }
    endShape(CLOSE);

    for(var p = 0; p < this.points.length; p++){    
      for(var q = 0; q < this.burst[p].length; q++){
        noStroke();
        if(p == 0){
          fill(fillColor);
        } else {
          fill(bkgdColor);
        }

        quad( this.burst[p][q].x1start, this.burst[p][q].y1start,
              this.burst[p][q].x1mover, this.burst[p][q].y1mover,
              this.burst[p][q].x2mover, this.burst[p][q].y2mover,
              this.burst[p][q].x2start, this.burst[p][q].y2start,
              );

        noFill();
        stroke(strokeColor);
        line(this.burst[p][q].x1start, this.burst[p][q].y1start, this.burst[p][q].x1mover, this.burst[p][q].y1mover);
        line(this.burst[p][q].x2start, this.burst[p][q].y2start, this.burst[p][q].x2mover, this.burst[p][q].y2mover);
      }
    }
  }

  createPoints(){
    var holdPoints = tFont[fontSelect].textToPoints(this.letter, this.x, this.y, pgTextSize, {sampleFactor: 0.2});
    this.testPoints = tFont[fontSelect].textToPoints(this.letter, this.x, this.y, pgTextSize, {sampleFactor: 0.2});

    var pathCount = 0;
    var pointCount = 0;
    this.points[pathCount] = [];
    this.points[pathCount][pointCount] = holdPoints[0];
    pointCount++;
    var preX = holdPoints[0].x;
    var preY = holdPoints[0].y;
    for(var m = 1; m < holdPoints.length; m++){
      if(dist(preX, preY, holdPoints[m].x, holdPoints[m].y) > 10){
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
    this.burst = [];
    this.solidToggle = true;

    for(var p = 0; p < this.points.length; p++){
      this.module[p] = [];
      this.burst[p] = [];

      var filled = 0;
      var makerMode = 0;
      var process = true;
      var processCount = 0;
      var processClicker = 0;

      var prePoint = 0;

      // FILL THE REST OF PATH WITH ANCHOR AND HANDLS
      while(filled < this.points[p].length){
        if(process){
          if(makerMode == 0){              ///////////////////  straight
            processCount = int(random(5, 15) / ratioFactor);
          } else if(makerMode == 1){       ///////////////////  bumpers
            processCount = int(random(3, 7) * ratioFactor);
          } else if(makerMode == 2){       ///////////////////  poker
            processCount = 1;
          }
          process = false;    
          processClicker = 0;      
        }

        var runLength = 0;
        if(makerMode == 0){
          runLength = 1;
        } else if (makerMode == 1){
          runLength = int(random(this.bumpMin, this.bumpMax));
        } else if (makerMode == 2){
          runLength = 2;
        }
        
        // var randomLength = int(random(this.bumpMin, this.bumpMax));

        if(this.points[p][filled + runLength] != null){
          var thisPoint = this.points[p][filled + runLength];
          var thisPointPre = this.points[p][prePoint];

          if(makerMode == 0){
            this.module[p][this.module[p].length] = {
              x: thisPoint.x,
              y: thisPoint.y,
              a: 0
            }
          } else if(makerMode == 1){
            var ang = atan2(thisPoint.y - orgY, thisPoint.x - orgX);
            var influ = random(this.influMin, this.influMax);
            var xH_ = thisPoint.x + cos(ang) * influ;
            var yH_ = thisPoint.y + sin(ang) * influ;

            var angPre = atan2(thisPointPre.y - orgY, thisPointPre.x - orgX);
            var influPre = influ;
            var xPH_ = thisPointPre.x + cos(angPre) * influPre;
            var yPH_ = thisPointPre.y + sin(angPre) * influPre;

            this.module[p][this.module[p].length] = {
              x: thisPoint.x,
              y: thisPoint.y,
              a: 1,
              xPre: thisPointPre.x,
              yPre: thisPointPre.y,
              xPHactual: thisPointPre.x,
              xPHactual: thisPointPre.y,
              xPH: xPH_,
              yPH: yPH_,
              xHactual: thisPoint.x,
              xHactual: thisPoint.y,
              xH: xH_,
              yH: yH_
            }
          } else if(makerMode == 2){
            var midPoint = this.points[p][filled + runLength - 1];

            var ang = atan2(midPoint.y - orgY, midPoint.x - orgX);
            var influ = random(this.influMin, this.influMax);
            var xH_ = midPoint.x + cos(ang) * influ;
            var yH_ = midPoint.y + sin(ang) * influ;

            this.module[p][this.module[p].length] = {
              x: thisPoint.x,
              y: thisPoint.y,
              a: 2,
              xHactual: midPoint.x,
              xHactual: midPoint.y,
              xH: xH_,
              yH: yH_
            }
          }

          if(processClicker == 0){
            if(random(10) < 3){
              var thisPoint = this.points[p][filled + runLength];
              var prePoint = this.points[p][filled + runLength - 1];
              var postPoint = thisPoint;
              // if(this.points[p][filled + runLength + 1] != null){
              //   postPoint = this.points[p][filled + runLength + 1];
              // }
  
              var ang = atan2(thisPoint.y - orgY, thisPoint.x - orgX);
              var influ = random(this.influMin, this.influMax);

              var distToOrigin = dist(thisPoint.x, thisPoint.y, orgX, orgY);
              var midToOrigin = {
                x: thisPoint.x - cos(ang) * distToOrigin/(blastFactor),
                y: thisPoint.y - sin(ang) * distToOrigin/(blastFactor) //distToOrigin/8,
              }

              var postAng = atan2(postPoint.y - midToOrigin.y, postPoint.x - midToOrigin.x);
              var preAng = atan2(prePoint.y - midToOrigin.y, prePoint.x - midToOrigin.x);

              var x1start_ = prePoint.x - cos(preAng) * coreSW * 2;
              var y1start_ = prePoint.y - sin(preAng) * coreSW * 2;
              var x1end_ = prePoint.x + cos(preAng) * influ/2;
              var y1end_ = prePoint.y + sin(preAng) * influ/2;
              var x2start_ = postPoint.x - cos(postAng) * coreSW * 2;
              var y2start_ = postPoint.y - sin(postAng) * coreSW * 2
              var x2end_ = postPoint.x + cos(postAng) * influ/2;
              var y2end_ = postPoint.y + sin(postAng) * influ/2;
  
              this.burst[p][this.burst[p].length] = {
                x1start: x1start_,
                y1start: y1start_,
                x1end: x1end_,
                y1end: y1end_,
                x1mover: x1start_,
                y1mover: y1start_,
                x2start: x2start_,
                y2start: y2start_,
                x2end: x2end_,
                y2end: y2end_,
                x2mover: x2start_,
                y2mover: y2start_,
              }
            }
          }

          prePoint = filled + runLength;

          processClicker++;
        }

        if(processClicker == processCount){
          makerMode = round(random(2));
          // makerMode = 1;
          process = true;
        }

        filled += runLength;
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