function italicWave0(){
  var sel = 0;

  var yPos = 0;
  for(var m = 0; m<wordCount.length; m++){
    var xPos = 0;
    for(var n = 0; n<wordCount[m]; n++){
      var thisX = xPos - xNudge[m]/2;
      var thisY = yPos;

      push();
        translate(thisX, thisY + sHarry[m]/2);
        pEntry[sel].display();
      pop();

      xPos += heightRatio[sel];
      sel ++;
    }
    yPos += sHarry[m];
  }
}
