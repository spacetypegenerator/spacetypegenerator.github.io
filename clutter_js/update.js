function setText(){
  var enteredText = document.getElementById("textArea").value;
  keyText = enteredText;
  keyArray = enteredText.match(/[^\r\n]+/g);

  if(keyArray == null){
    keyArray = "";
  }

  for(var k = 0; k<keyArray.length; k++){
    var rs = random(10);
    if(rs<2){
      pgTexture2(keyArray[k], k);
    } else {
      pgTexture1(keyArray[k], k);
    }
  }
}

function setPGsize(val){
  pgTextSize = round(val);
  pgStripH =  val * 0.8;

  setText();
}

function newPalette(){
  var rs = random(100);

  if(rs<10){
    print("PALETTE 1");
    bkgdColor = color('#f28599');
    foreColor = color('#122459');
    typeColor = color('#ffffff');
    color1 = color('#f2ca50');
    color2 = color('#1c4aa6');
    color3 = color('#d94625');
  } else if(rs<20){
    print("PALETTE 2");
    bkgdColor = color('#000000');
    foreColor = color('#F25e6B');
    typeColor = color('#04BF9D');
    color1 = color('#A6468C');
    color2 = color('#3321A6');
    color3 = color('#04BF9D');
  } else if(rs<30){
    print("PALETTE 3");
    bkgdColor = color('#ffffff');
    foreColor = color('#010440');
    typeColor = color('#000000');
    color1 = color('#2D7359');
    color2 = color('#f2B33D');
    color3 = color('#F25749');
  } else if(rs<40){
    print("PALETTE 4");
    bkgdColor = color('#262626');
    foreColor = color('#ffffff'); // bfbdb8
    typeColor = color('#ffffff');
    color1 = color('#735c40');
    color2 = color('#d9d6d0');
    color3 = color('#000000');
  } else if(rs<50){
    print("PALETTE 5");
    bkgdColor = color('#0511f2');
    foreColor = color('#010326');
    typeColor = color('#ffffff');
    color1 = color('#0ff2c9');
    color2 = color('#030a8c');
    color3 = color('#f2bb13');
  } else if(rs<60){
    print("PALETTE 6");
    bkgdColor = color('#f2916d');
    foreColor = color('#233d8c');
    typeColor = color('#102540');
    color1 = color('#102540');
    color2 = color('#025959');
    color3 = color('#f2911b');
  } else if(rs<70){
    print("PALETTE 7");
    bkgdColor = color('#f2f2f2');
    foreColor = color('#f2a7a7');
    typeColor = color('#d90404');
    color1 = color('#f2dd72');
    color2 = color('#d90404');
    color3 = color('#000000');
  } else if(rs<80){
    print("PALETTE 8");
    bkgdColor = color('#0a3a40');
    foreColor = color('#f2eadf');
    typeColor = color('#ffffff');
    color1 = color('#d9857e');
    color2 = color('#d9042B');
    color3 = color('#f2c84b');
  } else if(rs<90){
    print("PALETTE 9");
    bkgdColor = color('#f2f2f2');
    foreColor = color('#404040');
    typeColor = color('#8c8c8c');
    color1 = color('#8c8c8c');
    color2 = color('#bfbfbf');
    color3 = color('#000000');
  } else {
    print("PALETTE 10");
    bkgdColor = color('#038c65');
    foreColor = color('#f2ebdf');
    typeColor = color('#8c0303');
    color1 = color('#f2811d');
    color2 = color('#f20505');
    color3 = color('#8c0303');
  }

  setText();

  for(var g = 0; g<grfx.length; g++){
    grfx[g] = new M_Grfx(g);
  }
}

function clearAll(){
  document.getElementById("textArea").value = '';
  setText();

  grfx = [];

  // for(var m = circ.length-1; m>0; m--){
  //   Composite.remove(engine.world, circ[m]);
  // }
  //
  // circ = [];

  for(var i = 0; i< circ.length; i++){
    Composite.remove(engine.world, circ[i]);
    circ.splice(i,1);
    i--;
  }
}

function hideWidget(){
  widgetOn = !widgetOn;
  if(widgetOn==true){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}
