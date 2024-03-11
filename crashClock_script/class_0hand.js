class Hand {
    constructor(x, y, w, h, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.type = type;

        let options = {
            friction: 0,
            restitution: 0.6,
            isStatic: true
        }

        // this.strkColor = accentColor;
        // if(type == 1 || type == 2){
        //     this.strkColor = fillColor;
        // }

        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
        Composite.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle; 
        
        push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);

            if(this.type == 1 || this.type == 2){
                fill(handColor);               
            } else {
                fill(accentColor);
            }
            noStroke();

            rect(0, 0, this.w, this.h);
        pop();
    }
}