function Particle(x,y,s,l){
  var options = {
    friction:0,
    frictionAir:0.06,
//    chamfer: { radius: [w*0.5, w*0.5, w*0.5, w*0.5] }
  }
  this.body  = Bodies.rectangle(x,y,s * 0.4,s * 1.25,options);
  this.l = l;
  this.s = s;

  World.add(world, this.body);

  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    if(wormState){
      fill(255);
    } else {
      fill(0);
    }
    if(l!=" "){
      ellipse(0,0,s/1.65);
    }
    pop();
  }

  this.letter = function(tangentLetter){
    var pos = this.body.position;
    this.tangentLetter = tangentLetter;

    push();
    translate(pos.x,pos.y);
    rotate(tangentLetter);
    rectMode(CENTER);
    noStroke();
    if(wormState){
      fill(0);
    } else {
      fill(255);
    }

    textAlign(CENTER);
    textSize(s);
    text(l,0,(s*0.75)/2);
    pop();
  }
}
