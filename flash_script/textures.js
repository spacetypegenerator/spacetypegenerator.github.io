//////////////////////////////////////////////
/////////////////////////////       STRIP
//////////////////////////////////////////////

function drawText(p, inp, tFont){   // straight text
  textSize(pgTextSize);
  textFont(tFont);
  var repeatSize = round(textWidth(inp)) + 100;

  pg[p] = createGraphics(repeatSize, pgTextSize);

  pg[p].background(bkgdColor);
  pg[p].fill(foreColor);

  pg[p].noStroke();
  pg[p].textSize(pgTextSize);
  pg[p].textAlign(CENTER);
  pg[p].textFont(tFont);
  pg[p].text(inp, pgStrip[p].width/2, pgStrip[p].height/2 + pgTextSize*0.7/2);
}


