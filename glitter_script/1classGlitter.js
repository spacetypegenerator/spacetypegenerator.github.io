class Glitter {
  constructor(){
    this.yDrop = 0;

    this.scaleDrop = 1;
    this.scaleGrow = 1;
    this.rotDrop = 0;
    this.extendDrop = 0;
    this.extendDropMax;
    // print(this.mode);

    this.burstCount = 8;
    this.burstAng = TWO_PI/this.burstCount;
    this.burstRad = 5;
    this.burstRadMax;

    this.animLength = random(150, 350);
    this.ticker = int(random(this.animLength));

    this.createSpecs();
  }

  createSpecs(){
    this.yDropMax = random(200, 400);

    this.rotStart = random(-PI/2, PI/2);
    this.rotMax = this.rotStart + random(-PI, PI);
    this.rSize = random(2, 15);
    this.extendDropMax = random(5, 40);
    this.animGrowLength = random(30, 100);

    this.burstRadMax = random(2,10)

    this.mode = int(random(7));
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, this.animLength, 0, 1);
    this.yDrop = map(easeInQuint(tk0), 0, 1, 0, this.yDropMax);
    this.scaleDrop = map(easeInExpo(tk0), 0, 1, 1, 0);
    this.rotDrop = map(easeInExpo(tk0), 0, 1, this.rotStart, this.rotMax);
    this.extendDrop = map(easeInExpo(tk0), 0, 1, 0, this.extendDropMax);

    if(this.mode == 6){    ////////// figure out Burst
      if(this.ticker < this.animLength * 2/5){
        this.burstRad = 0;  
      } else if(this.ticker < this.animLength * 4/5){
        var tk0 = map(this.ticker, this.animLength * 2/5, this.animLength * 4/5, 0, 1);
        this.burstRad = map(easeInExpo(tk0), 0, 1, 0, this.burstRadMax);
      } else {
        this.burstRad = this.burstRadMax;
      }
    }

    if(this.ticker < this.animGrowLength){
      var tk0 = map(this.ticker, 0, this.animGrowLength, 0, 1);
      this.scaleGrow = map(easeOutQuad(tk0), 0, 1, 0, 1);
    }
    
    if(this.ticker > this.animLength - 1){
      this.ticker = 0;
      // this.createSpecs();
    }
  }

  display(){
    if(this.mode == 0){
      this.single();
    } else if(this.mode == 1){
      this.singleSquare();
    } else if(this.mode == 2){
      this.singleStarFour();
    } else if(this.mode == 3){
      this.singleStarSix();
    } else if(this.mode == 4){
      this.singleStarEight();
    } else if(this.mode == 5){
      this.singleLine();
    } else if(this.mode == 6){
      this.singleBurst();
    }
  }

  single(){
    push();
      translate(0, this.yDrop);
      scale(this.scaleGrow);
      scale(this.scaleDrop);
      
      noStroke();
      fill(foreColor);
      ellipse(0, 0, this.rSize/4, this.rSize/4);
    pop();
  }

  singleSquare(){
    push();
      translate(0, this.yDrop);
      scale(this.scaleGrow);
      scale(this.scaleDrop);
      rotate(this.rotDrop);

      noStroke();
      fill(foreColor);
      rect(0, 0, this.rSize/3, this.rSize/3);
    pop();
  }

  singleStarFour(){
    push();
      translate(0, this.yDrop);
      // scale(this.scaleDrop);
      rotate(this.rotDrop);

      noStroke();
      fill(foreColor);
      
      for(var m = 0; m < 2; m++){
        rotate(PI/2);
        beginShape();
          vertex(0, -this.rSize * this.scaleGrow);
          vertex(0.5 * this.scaleDrop, 0);
          vertex(0, this.rSize * this.scaleGrow);
          vertex(-0.5 * this.scaleDrop, 0);
        endShape(CLOSE);
      }
    pop();
  }

  singleStarSix(){
    push();
      translate(0, this.yDrop);
      // scale(this.scaleDrop);
      rotate(this.rotDrop);

      noStroke();
      fill(foreColor);
      
      for(var m = 0; m < 3; m++){
        rotate(PI/3);
        beginShape();
          vertex(0, -this.rSize * this.scaleGrow);
          vertex(0.5 * this.scaleDrop, 0);
          vertex(0, this.rSize * this.scaleGrow);
          vertex(-0.5 * this.scaleDrop, 0);
        endShape(CLOSE);
      }
    pop();
  }

  singleStarEight(){
    push();
      translate(0, this.yDrop);
      // scale(this.scaleDrop);
      rotate(this.rotDrop);

      noStroke();
      fill(foreColor);
      
      for(var m = 0; m < 4; m++){
        rotate(PI/4);
        beginShape();
          vertex(0, -this.rSize * this.scaleGrow/(2 - (m%2)));
          vertex(0.5 * this.scaleDrop, 0);
          vertex(0, this.rSize * this.scaleGrow/(2 - (m%2)));
          vertex(-0.5 * this.scaleDrop, 0);
        endShape(CLOSE);
      }
    pop();
  }

  singleLine(){
    push();
      translate(0, this.yDrop);
      
      noFill();
      stroke(foreColor);
      strokeWeight(this.scaleDrop);

      line(0, 0, 0, -this.extendDrop);

      // for(var m = cap - 1; m >= 0; m -= 3){
      //   var lerpSize = map(m, 0, cap, 0, 2 * this.scaleDrop);

      //   noStroke();
      //   fill(foreColor);
      //   rect(0, m, lerpSize, 2*lerpSize)
      // }
      // line(0, 0, 0, 10);
    pop();
  }

  singleBurst(){
    push();
      translate(0, this.yDrop);
      // scale(this.scaleDrop);
      rotate(this.rotDrop);

      noFill();
      stroke(foreColor);
      strokeWeight(this.scaleDrop);
      
      for(var m = 0; m < this.burstCount; m++){
        push();
          rotate(m * this.burstAng);
          translate(this.burstRad, 0);

          line(0, 0, this.burstRad, 0);
        pop();
      }
    pop();
  }
}
