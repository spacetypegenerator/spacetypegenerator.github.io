function createBkgdLinear(){
  var hCount = height/2;
  var hSpace = height/hCount;
  bkgdGradLinear = createGraphics(width, height);

  bkgdGradLinear.background(colorA[2]);
  for(var n = 0; n < hCount; n++){
    var gradColor;
    if(n < hCount/2){
      gradColor = lerpColor(colorA[2], colorA[1], n/(hCount/2));
    } else {
      gradColor = lerpColor(colorA[1], colorA[0], (n - hCount/2)/(hCount/2));
    }
    bkgdGradLinear.noFill();
    bkgdGradLinear.stroke(gradColor);
    bkgdGradLinear.strokeWeight(2);
    bkgdGradLinear.line(0, n * hSpace, width, n * hSpace);
  }
}

function createBkgdRadial(){
  var circCount = width/2;
  bkgdGradRadial = createGraphics(width, height);

  bkgdGradRadial.background(bkgdColor);
  for(var n = 0; n < circCount; n++){
    var gradColor;
    if(n < circCount/2){
      gradColor = lerpColor(bkgdColor, colorA[0], n/(circCount/2));
    } else {
      gradColor = lerpColor(colorA[0], colorA[1], (n - circCount/2)/(circCount/2));
    }
    bkgdGradRadial.noStroke();
    bkgdGradRadial.fill(gradColor);
    var thisRad = map(n, 0, circCount, width * 1.5, width * 0.0);
    bkgdGradRadial.ellipse(width/2, height/2, thisRad, thisRad);
  }
}