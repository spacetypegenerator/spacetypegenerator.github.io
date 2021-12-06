function Circ(x,y,d){
  var options = {
    friction:1.0,
    frictionAir:0.05,

    force:{x:random(-0.22,0.22), y:random(-0.22,0.22)}
  }
  this.body = Bodies.circle(x, y, d/2, options);
  this.d = d;

  Composite.add(engine.world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
      translate(pos.x,pos.y);

      noFill();
      stroke(255,0,255);
      strokeWeight(alphaStep);
      ellipse(0,0,this.d, this.d);
    pop();
  }
}
