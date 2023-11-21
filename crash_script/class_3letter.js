class DropLetter {
  constructor(thisLetter, thisX, thisY, thisW){
    this.thisLetter = thisLetter;
    
    this.orgX = thisX;
    this.orgY = thisY;
    
    this.coreOrg;

    this.minPoint;
    this.maxPoint;
    this.diff;

    this.points;
    this.bodyLetter;

    if(this.thisLetter != " "){
      this.textPointMaker();
      this.physicsPointMaker();
    }
  }

  textPointMaker(){
    this.points = tFont[fontSelect].textToPoints(this.thisLetter, this.orgX, this.orgY, pgTextSize, {
      sampleFactor: 0.1,
      simplifyThreshold: 0
    });
  }

  physicsPointMaker(){
    var newX = this.orgX + textWidth(this.thisLetter)/2;
    var newY = this.orgY - pgTextSize * pgTextFactor[fontSelect]/2;

    this.bodyLetter = Bodies.fromVertices(newX, newY, this.points);
    Composite.add(world, this.bodyLetter);

    this.minPoint = createVector(this.bodyLetter.bounds.min.x, this.bodyLetter.bounds.min.y);
    this.maxPoint = createVector(this.bodyLetter.bounds.max.x, this.bodyLetter.bounds.max.y);

    var pos = this.bodyLetter.position;
    this.diff = createVector(-(pos.x - this.minPoint.x), -(pos.y - this.maxPoint.y));

    Matter.Body.setPosition(this.bodyLetter, {x: pos.x, y: this.orgY - this.diff.y});
    
    this.coreOrg = createVector(pos.x, this.orgY - this.diff.y);
  }

  run(){
    this.update();
    this.display();
  }

  update(){

  }

  display(){
    var pos = this.bodyLetter.position;
    var ang = this.bodyLetter.angle;

    noStroke();
    // fill(fillColor);

    // for(var m = 0; m < this.points.length; m++){
    //   ellipse(this.points[m].x, this.points[m].y, 3, 3);
    // }

    var verts = this.bodyLetter.vertices;
    // fill(255, 0, 0); 
    // for(var m = 0; m < verts.length; m++){
    //   ellipse(verts[m].x, verts[m].y, 10, 10);
    // }

    // fill(0,255,255);
    // ellipse(this.minPoint.x, this.minPoint.y, 20, 20);
    // ellipse(this.maxPoint.x, this.maxPoint.y, 20, 20);
    // ellipse(this.minPoint.x, this.maxPoint.y, 20, 20);
    
    push();
      translate(pos.x, pos.y);
      rotate(ang);
      // translate(this.diff.x, this.diff.y);
      translate(0, this.diff.y);

      // fill(0,255,0);
      // ellipse(0, 0, 20, 20);

      fill(fillColor);
      textAlign(CENTER);
      text(this.thisLetter, 0, 0);
    pop();

    // fill(0,0,255);
    // ellipse(pos.x, pos.y, 20, 20);
  }
  
  resetPos(){
    if(this.thisLetter != " "){
      Matter.Body.setPosition(this.bodyLetter, {x: this.coreOrg.x, y: this.coreOrg.y});
      Matter.Body.setAngle(this.bodyLetter, 0);
      Matter.Body.setAngularSpeed(this.bodyLetter, 0);
      Matter.Body.setAngularVelocity(this.bodyLetter, 0);
      Matter.Body.setSpeed(this.bodyLetter, 0);
    }
  }

  removeIt(){
    if(this.thisLetter != " "){
      Composite.remove(world, this.bodyLetter);
    }
  }
}