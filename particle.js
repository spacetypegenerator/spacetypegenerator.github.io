class Particle {
  constructor(x,y,a,hl) {

    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.draggingHandle = false;
    this.draggingHandleAlt = false;

    this.x = x;
    this.y = y;
    this.a = a;

    this.hl = hl;
    this.althl = hl;

    this.hx = cos(this.a) * this.hl + this.x;
    this.hy = sin(this.a) * this.hl + this.y;
    this.althx = -cos(this.a) * this.althl + this.x;
    this.althy = -sin(this.a) * this.althl + this.y;

    // Dimensions
    this.w = stripHeight/2;
    this.h = stripHeight/2;
    this.hw = 10;
    this.hh = 10;
  }

  over() {
    if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }

  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.hx = mouseX + this.offsetHoldX;
      this.althx = mouseX + this.offsetHoldXalt;
      this.y = mouseY + this.offsetY;
      this.hy = mouseY + this.offsetHoldY;
      this.althy = mouseY + this.offsetHoldYalt;
    }

    if (this.draggingHandle) {
      this.hx = mouseX - this.offsetHX;
      this.hy = mouseY - this.offsetHY;

      this.hl = dist(this.x,this.y,this.hx,this.hy);
      this.a = atan2(this.hy-this.y,this.hx-this.x);

      this.althx = -cos(this.a) * this.althl + this.x;
      this.althy = -sin(this.a) * this.althl + this.y;
    }

    if (this.draggingHandleAlt) {
      this.althx = mouseX - this.offsetHXalt;
      this.althy = mouseY - this.offsetHYalt;

      this.althl = dist(this.x,this.y,this.althx,this.althy);
      this.a = atan2(this.althy-this.y,this.althx-this.x);

      this.hx = -cos(this.a) * this.hl + this.x;
      this.hy = -sin(this.a) * this.hl + this.y;
    }

    if(this.dragging || this.draggingHandle || this.draggingHandleAlt){
      handleAlpha = 255;
    }
  }

  show() {
    strokeWeight(1);
    stroke(handleColor);
    if(this.dragging || this.draggingHandle || this.draggingHandleAlt){
      fill(0,0,255);
    } else {
      noFill();
    }

    ellipse(this.x, this.y, this.w, this.h);
    rect(this.hx,this.hy, this.hw, this.hh);
    rect(this.althx,this.althy,this.hw,this.hh);
    fill(255);
    line(this.hx,this.hy,this.althx,this.althy);

  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetHoldX = this.hx - mouseX;
      this.offsetHoldXalt = this.althx - mouseX;
      this.offsetY = this.y - mouseY;
      this.offsetHoldY = this.hy - mouseY;
      this.offsetHoldYalt = this.althy - mouseY;
    }

    if (mouseX > this.hx - this.hw && mouseX < this.hx + this.hw && mouseY > this.hy - this.hh && mouseY < this.hy + this.hh) {
      this.draggingHandle = true;
      this.offsetHX = this.hx - mouseX;
      this.offsetHY = this.hy - mouseY;
    }

    if (mouseX > this.althx - this.hw && mouseX < this.althx + this.hw && mouseY > this.althy - this.hh && mouseY < this.althy + this.hh) {
      this.draggingHandleAlt = true;
      this.offsetHXalt = this.althx - mouseX;
      this.offsetHYalt = this.althy - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
    this.draggingHandle = false;
    this.draggingHandleAlt = false;
  }
}
