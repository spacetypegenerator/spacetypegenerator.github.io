class Particle{
    constructor(x, y, r, fixed) {
      this.x = x;
      this.y = y;
      this.r = r;
      let options = {
          friction: 0.1,
          restitution: 0.95,
          isStatic: fixed
      }
      this.body = Bodies.circle(this.x, this.y, this.r,  options);
      Composite.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255)
        fill(127);
        ellipse(0, 0, this.r*2);
        line(0,0,this.r,0);
        pop();
    }
}