class Boundary {
    constructor(x, y, w, h, a) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;

        let options = {
            friction: 0,
            restitution: 0.6,
            angle: a,
            isStatic: true
        }
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
        Composite.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        
        strokeWeight(1);
        stroke(0,0,255);
        noFill();
        ellipse(pos.x,pos.y,20,20);        
        
        push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);

            rect(0, 0, this.w, this.h);
        pop();
    }
}