function keyboardEngine() {
//  if (letter_select >= inpText.length) {
//      letter_space( strecherX,  strecherY, strecherShear);
//  } else {

     c1 = inpText.charAt(letter_select);            

    if (c1 == 'A' || c1 == 'a') {
      letter_A();
    } else if (c1 == 'B' || c1 == 'b') {
      letter_B();
    } else if (c1 == 'C' || c1 == 'c') {
      letter_C();
    } else if (c1 == 'D' || c1 == 'd') {
      letter_D();
    } else if (c1 == 'E' || c1 == 'e') {
      letter_E();
    } else if (c1 == 'F' || c1 == 'f') {
      letter_F();
    } else if (c1 == 'G' || c1 == 'g') {
      letter_G();
    } else if (c1 == 'H' || c1 == 'h') {
      letter_H();
    } else if (c1 == 'I' || c1 == 'i') {
      letter_I();
    } else if (c1 == 'J' || c1 == 'j') {
      letter_J();
    } else if (c1 == 'K' || c1 == 'k') {
      letter_K();
    } else if (c1 == 'L' || c1 == 'l') {
      letter_L();
    } else if (c1 == 'M' || c1 == 'm') {
      letter_M();
    } else if (c1 == 'N' || c1 == 'n') {
      letter_N();
    } else if (c1 == 'O' || c1 == 'o') {
      letter_O();
    } else if (c1 == 'P' || c1 == 'p') {
      letter_P();
    } else if (c1 == 'Q' || c1 == 'q') {
      letter_Q();
    }  else if (c1 == 'R' || c1 == 'r') {
      letter_R();
    } else if (c1 == 'S' || c1 == 's') {
      letter_S();
    } else if (c1 == 'T' || c1 == 't') {
      letter_T();
    } else if (c1 == 'U' || c1 == 'u') {
      letter_U();
    } else if (c1 == 'V' || c1 == 'v') {
      letter_V();
    } else if (c1 == 'W' || c1 == 'w') {
      letter_W();
    } else if (c1 == 'X' || c1 == 'x') {
      letter_X();
    } else if (c1 == 'Y' || c1 == 'y') {
      letter_Y();
    } else if (c1 == 'Z' || c1 == 'z') {
      letter_Z();
    } else if (c1 == '_') {
      letter_underscore();
    } else if (c1 == '-') {
      letter_dash();
    } else if (c1 == '?') {
      letter_question();
    } else if (c1 == '.') {
      letter_period();
    } else if (c1 == '!') {
      letter_exclaim();
    } else if (c1 == ' ') {
      letter_space( );
    } else if (c1 == ':') {
      letter_colon( );
    } else if (c1 == ';') {
      letter_semicolon();
    } else if (c1 == ',') {
      letter_comma();
    } else if (c1 == '/') {
      letter_slash();
    } else if (c1 == '&') {
      letter_amp();
    } else if (c1 == '1') {
      one();
    } else if (c1 == '2') {
      two();
    } else if (c1 == '3') {
      three();
    } else if (c1 == '4') {
      four();
    } else if (c1 == '5') {
      five();
    } else if (c1 == '6') {
      six();
    } else if (c1 == '7') {
      seven();
    } else if (c1 == '8') {
      eight();
    } else if (c1 == '9') {
      nine();
    } else if (c1 == '0') {
      zero();
    } else if (c1 == '\"') {
      double_quote();
    } else if (c1 == '\'') {
      single_quote();
    } else if (c1 == '#') {
      hash();
    } else if (c1 == '$') {
      cash();
    } else if (c1 == '%') {
      percentage();
    } else if (c1 == '=') {
      equal();
    } else if (c1 == '+') {
      plus();
    } else if (c1 == '*') {
      asterisk();
    } else if (c1 == '@') {
      at();
    } 
//  }
}
/////////////////////////////////////////////////// LETTERS

function letter_A () {
  push();
   
  beginShape();
		vertex(SA,typeY);
  	vertex(SA,typeY-SA);
  	vertex(SA,typeY-SA/2);
  
  	vertex(typeX/2,SA);
  	vertex(typeX/2-SA,SA);
  	vertex(typeX/2+SA,SA);
  	vertex(typeX/2,SA);
  	
    vertex(typeX-SA,typeY-SA/2);
    vertex(typeX-SA,typeY-SA);
    vertex(typeX-SA,typeY);
  endShape();

   ang = atan((typeX/2)/(typeY));
   angX = tan(ang)*(typeY/3);

  line(angX-SA/2, 21*typeY/28, typeX-angX+SA/2, 21*typeY/28);
  pop();
}

function letter_B () {
	beginShape();
  	vertex(0,SA);
  	vertex(typeX/2,SA);
  	bezierVertex(3*typeX/4,SA,	26*typeX/28,2*typeY/28,  26*typeX/28,6*typeY/28);
  	vertex(26*typeX/28,7*typeY/28);
  	bezierVertex(26*typeX/28,11*typeY/28,  22*typeX/28,13*typeY/28,	 typeX/2,13*typeY/28);
    vertex(0,13*typeY/28);
  endShape();
  beginShape();
  	vertex(0,13*typeY/28);
    vertex(typeX/2,13*typeY/28);
    bezierVertex(3*typeX/4,13*typeY/28,  typeX-SA,15*typeY/28,	typeX-SA,20*typeY/28);
  	vertex(typeX-SA,3*typeY/4);
  	bezierVertex(typeX-SA,7*typeY/8,	5*typeX/6,typeY-SA,  typeX/2, typeY-SA);
    vertex(0,typeY-SA);
  endShape();
  
  line(SA,0,  SA,typeY);
}

function letter_C () {
  beginShape();
    vertex(typeX-SA,3*typeY/4);
		bezierVertex(typeX-SA,7*typeY/8,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,typeY/3);
  	bezierVertex(SA,typeY/6,  typeX/6,SA,  typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/8,  typeX-SA,typeY/4);
  endShape();
}

function letter_D () {
  beginShape();
    vertex(0,SA);
    vertex(typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/6,  typeX-SA,typeY/3);
    vertex(typeX-SA,2*typeY/3);
		bezierVertex(typeX-SA,5*typeY/6,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
    vertex(0,typeY-SA);
  endShape();
  
  line(SA,0,SA,typeY);
}

function letter_E () {
	line(0,SA,	typeX,SA);
  line(SA,0,	SA,typeY);
  line(0,typeY-SA,	typeX,typeY-SA);
  line(0,15*typeY/28,	7*typeX/8,15*typeY/28);
}

function letter_F () {
	line(0,SA,	typeX,SA);
  line(SA,0,	SA,typeY);
  line(0,15*typeY/28,	7*typeX/8,15*typeY/28);
}

function letter_G () {
  beginShape();
    vertex(typeX-SA,3*typeY/4);
		bezierVertex(typeX-SA,7*typeY/8,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,typeY/3);
  	bezierVertex(SA,typeY/6,  typeX/6,SA,  typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/8,  typeX-SA,typeY/4);
  endShape();
  
  line(typeX-SA,typeY,  typeX-SA,15*typeY/28);
  line(5*typeX/8-SA,15*typeY/28,  typeX,15*typeY/28);
}

function letter_H () {
	line(SA,0,	SA,typeY);
  line(typeX-SA,0,  typeX-SA,typeY);
  line(0,typeY/2,  typeX,typeY/2);
}

function letter_I () {
	line(0,SA,	typeX,SA);
  line(0,typeY-SA,	typeX,typeY-SA);
  line(typeX/2,0,	typeX/2,typeY);
}

function letter_J () {
  line(typeX/2,SA,	typeX,SA);
  beginShape();
  	vertex(typeX-SA,SA);
    vertex(typeX-SA,2*typeY/3);
		bezierVertex(typeX-SA,5*typeY/6,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
  endShape();
}

function letter_K () {  
  line(SA, 0, SA, typeY);
  beginShape();
    vertex(SA, 2*typeY/3);
    vertex(27*typeX/28-SA, SA/2);
    vertex(27*typeX/28-SA, SA);
    vertex(27*typeX/28-SA, 0);
  endShape();
  
   ang = atan((2*typeY/3)/(typeX));
   angX = (13/28*typeY)/tan(ang);

  beginShape();
	  vertex(typeX-angX, 13/28*typeY);
    vertex(typeX-SA, typeY-SA/2);
    vertex(typeX-SA, typeY-SA);
    vertex(typeX-SA, typeY);
  endShape();
}

function letter_L () {
	line(SA,0,  SA,typeY);
  line(0,typeY-SA,  typeX,typeY-SA);
}

function letter_M () {
	line(SA,0,  SA,typeY);
  line(typeX-SA,0,  typeX-SA,typeY);
  
  beginShape();
    vertex(0,SA);
    vertex(SA,SA);

  	vertex(typeX/2,22*typeY/28-SA);
  	vertex(typeX/2-SA,22*typeY/28-SA);
  	vertex(typeX/2+SA,22*typeY/28-SA);
  	vertex(typeX/2,22*typeY/28-SA);
    
  
  	vertex(typeX-SA,SA);
  	vertex(typeX,SA);
  endShape();
}

function letter_N () {
	line(SA,0,  SA,typeY);
  line(typeX-SA,0,  typeX-SA,typeY);
  
  beginShape();
		vertex(0,SA);
  	vertex(SA,SA);
  	vertex(SA,SA/2);
  	vertex(typeX-SA,typeY-SA/2);
  	vertex(typeX-SA,typeY-SA);
  	vertex(typeX,typeY-SA);
  endShape();
}

function letter_O () {
  beginShape();
    vertex(typeX-SA, typeY/3);
    vertex(typeX-SA,2*typeY/3);
		bezierVertex(typeX-SA,5*typeY/6,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,typeY/3);
  	bezierVertex(SA,typeY/6,  typeX/6,SA,  typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/6,  typeX-SA,typeY/3);
  endShape();
}

function letter_P () {
	beginShape();
  	vertex(0,SA);
    vertex(typeX/2,SA);
  	bezierVertex(5*typeX/6,SA,	typeX-SA,typeY/8,	 typeX-SA,typeY/4);
    vertex(typeX-SA,8*typeY/28);
    bezierVertex(typeX-SA,8*typeY/28 + typeY/8,  5*typeX/6,15*typeY/28,  typeX/2,15*typeY/28);
  	vertex(0,15*typeY/28);
  endShape();
  
  line(SA,0,SA,typeY);
}

function letter_Q () {
  beginShape();
    vertex(typeX-SA, typeY/3);
    vertex(typeX-SA,2*typeY/3);
		bezierVertex(typeX-SA,5*typeY/6,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,typeY/3);
  	bezierVertex(SA,typeY/6,  typeX/6,SA,  typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/6,  typeX-SA,typeY/3);
  endShape();

  beginShape();
  	vertex(typeX/2,15*typeY/28);
  	vertex(typeX-SA,typeY-SA/2);
	  vertex(typeX-SA,typeY-SA);
  	vertex(typeX-SA,typeY);
  endShape();
}

function letter_R () {
	beginShape();
  	vertex(0,SA);
    vertex(typeX/2,SA);
  	bezierVertex(5*typeX/6,SA,	typeX-SA,typeY/8,	 typeX-SA,typeY/4);
    vertex(typeX-SA,8*typeY/28);
    bezierVertex(typeX-SA,8*typeY/28 + typeY/8,  5*typeX/6,15*typeY/28,  typeX/2,15*typeY/28);
  	vertex(0,15*typeY/28);
  endShape();
  
  line(SA,0,SA,typeY);
  
  beginShape();
  	vertex(typeX/2,15*typeY/28);
  	vertex(typeX-SA,typeY-SA/2);
	  vertex(typeX-SA,typeY-SA);
  	vertex(typeX-SA,typeY);
  endShape();
}

function letter_S () {
	beginShape();
    vertex(27*typeX/28-SA,typeY/4);
  	vertex(27*typeX/28-SA,13*typeY/56);
  	bezierVertex(27*typeX/28-SA,4*typeY/28,  7*typeX/8,SA,  typeX/2,SA);
    bezierVertex(typeX/4,SA,  typeX/28+SA,2*typeY/28,  typeX/28+SA,11*typeY/56);
    vertex(typeX/28+SA,6*typeY/28);
  	bezierVertex(typeX/28+SA,17*typeY/56,  typeX/8,21*typeY/56,  typeX/3,12*typeY/28);
  	vertex(20*typeX/28,29*typeY/56);
  	bezierVertex(26*typeX/28,16*typeY/28,  typeX-SA,18*typeY/28,	typeX-SA,41*typeY/56);
    vertex(typeX-SA,3*typeY/4);
  	bezierVertex(typeX-SA,26*typeY/28,  22*typeX/28,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/4,typeY-SA,  SA,53*typeY/56,  SA,3*typeY/4);
  	vertex(SA,41*typeY/56);
  endShape();
}

function letter_T () {
	line(0,SA,	typeX,SA);
  line(typeX/2,0,	typeX/2,typeY);
}

function letter_U () {
  beginShape();
		vertex(typeX-SA,0);
  	vertex(typeX-SA,2*typeY/3);
		bezierVertex(typeX-SA,5*typeY/6,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,0);
  endShape();
}

function letter_V () {
	beginShape();
    vertex(SA,0);
    vertex(SA,SA);
    vertex(SA,SA/2)
  
    vertex(typeX/2,typeY-SA);
  	vertex(typeX/2-SA,typeY-SA);
  	vertex(typeX/2+SA,typeY-SA);
  	vertex(typeX/2,typeY-SA);
  
  	vertex(typeX-SA,SA/2);
  	vertex(typeX-SA,SA);
    vertex(typeX-SA,0);
  endShape();
}

function letter_W () {
	beginShape();
    vertex(SA,0);
    vertex(SA,SA);
    vertex(SA,SA/2)
  
    vertex(typeX/4,typeY-SA);
    vertex(typeX/4-SA,typeY-SA);  
    vertex(typeX/4+SA,typeY-SA);  
    vertex(typeX/4,typeY-SA);
  
  	vertex(typeX/2,8*typeY/28);
  	vertex(typeX/2-SA,8*typeY/28);
  	vertex(typeX/2+SA,8*typeY/28);
  	vertex(typeX/2,8*typeY/28);
  
  	vertex(3*typeX/4,typeY-SA);
  	vertex(3*typeX/4-SA,typeY-SA);
  	vertex(3*typeX/4+SA,typeY-SA);
  	vertex(3*typeX/4,typeY-SA);
    
  	vertex(typeX-SA,SA/2);
  	vertex(typeX-SA,SA);
  	vertex(typeX-SA,0);
  endShape();
}

function letter_X () {
	beginShape();
  	vertex(SA,0);
    vertex(SA,SA);
    vertex(SA,SA/2);
    vertex(typeX-SA,typeY-SA/2);
    vertex(typeX-SA,typeY-SA);
    vertex(typeX-SA,typeY);
  endShape();
  beginShape();
    vertex(typeX-SA,0);
    vertex(typeX-SA,SA);
    vertex(typeX-SA,SA/2);
  	vertex(SA,typeY-SA/2);
    vertex(SA,typeY-SA);
    vertex(SA,typeY);
  endShape();
}

function letter_Y () {
	beginShape();
  	vertex(SA,0);
  	vertex(SA,SA);
  	vertex(SA,SA/2);
    vertex(typeX/2,2*typeY/3);
    vertex(typeX-SA,SA/2);
    vertex(typeX-SA,SA);
    vertex(typeX-SA,0);
  endShape();
  
  line(typeX/2,2*typeY/3,  typeX/2,typeY);
}

function letter_Z () {
	line(0,SA,	typeX,SA);
  line(0,typeY-SA,  typeX,typeY-SA);
  
  beginShape();
  	vertex(typeX-SA,0);
    vertex(typeX-SA,SA);
    vertex(SA,typeY-SA);
    vertex(SA,typeY);
  endShape();
}

function one () {
	beginShape();
//  	vertex(typeX/8,6/28*typeY+SA);
  	vertex(typeX/8,6/28*typeY);
  	vertex(typeX/2-SA/4,SA);
  endShape();
  
  line(typeX/2,0,  typeX/2,typeY);
  line(0,typeY-SA,typeX,typeY-SA);
}

function two () {
  beginShape();
    vertex(SA,typeY/4);
		bezierVertex(SA,typeY/8,	typeX/6,SA,  typeX/2,SA);
  	bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/8,  typeX-SA,typeY/4);
    bezierVertex(typeX-SA,5*typeY/8,  SA,2*typeY/3,  SA,typeY);
  endShape();

  line(0,typeY-SA,  typeX,typeY-SA);
}

function three () {
	line(0,SA,  typeX,SA);
  beginShape();
		vertex(typeX-SA,0);
  	vertex(typeX-SA,SA);
    vertex(typeX*12/28+SA,typeY*10/28);
    vertex(typeX*12/28,typeY*10/28);
    bezierVertex(24/28*typeX,typeY*10/28,  typeX-SA,15/28*typeY,  typeX-SA,19/28*typeY);
  	vertex(typeX-SA,3/4*typeY);
    bezierVertex(typeX-SA,24/28*typeY,  24/28*typeX,typeY-SA,  typeX/2,typeY-SA);
    bezierVertex(4/28*typeX,typeY-SA,  SA,24/28*typeY,	SA,3/4*typeY);
  endShape();
}

function four () {
  beginShape();
    vertex(typeX/3,0);
    vertex(typeX/3,SA);
    vertex(typeX/3,SA/2);
  	vertex(SA,2*typeY/3);
    vertex(SA,2*typeY/3-SA);
    vertex(typeX,2*typeY/3-SA);
  endShape();
    line(21/28*typeX,0,  21/28*typeX,typeY);
}

function five () {
	line(typeX*2/28+SA,SA,  typeX*7/8,SA);
  line(typeX*2/28+SA,0,  typeX*2/28+SA,11/28*typeY);
	beginShape();
  	vertex(typeX*2/28,11/28*typeY);
    vertex(typeX/2,11/28*typeY);
    bezierVertex(24/28*typeX,11/28*typeY,  typeX-SA,15/28*typeY,  typeX-SA,19/28*typeY);
  	vertex(typeX-SA,3/4*typeY);
    bezierVertex(typeX-SA,24/28*typeY,  24/28*typeX,typeY-SA,  typeX/2,typeY-SA);
    bezierVertex(4/28*typeX,typeY-SA,  SA,24/28*typeY,	SA,3/4*typeY);
  endShape();
}

function six () {
  beginShape();
    vertex(1/2*typeX,SA);
    quadraticVertex(SA,1/4*typeY,  SA,3/4*typeY);
  endShape();
	beginShape();
    vertex(typeX/2,12/28*typeY);
    bezierVertex(24/28*typeX,12/28*typeY,  typeX-SA,16/28*typeY,  typeX-SA,20/28*typeY);
  	vertex(typeX-SA,3/4*typeY);
    bezierVertex(typeX-SA,24/28*typeY,  24/28*typeX,typeY-SA,  typeX/2,typeY-SA);
    bezierVertex(4/28*typeX,typeY-SA,  SA,24/28*typeY,	SA,3/4*typeY);
    vertex(SA,20/28*typeY);
    bezierVertex(SA,16/28*typeY,  4/28*typeX,12/28*typeY,  typeX/2,12/28*typeY);
  endShape();
}

function seven () {
	line(0,SA,  typeX,SA);
  
  beginShape();
    vertex(typeX-SA,0);
    vertex(typeX-SA,SA);
  	vertex(typeX/2,typeY-SA);
    vertex(typeX/2,typeY);
  endShape();
}

function eight () {
  beginShape();
    vertex(typeX/2,SA);
  	bezierVertex(23*typeX/28,SA,  27*typeX/28-SA,3*typeY/28, 27*typeX/28-SA,6*typeY/28);
  	vertex(27*typeX/28-SA,typeY/4);
  	bezierVertex(27*typeX/28-SA,10*typeY/28,  23*typeX/28,13*typeY/28,  typeX/2,13*typeY/28);
  	bezierVertex(5*typeX/28,13*typeY/28,  typeX/28+SA,10*typeY/28,  typeX/28+SA,typeY/4);
  	vertex(typeX/28+SA,6*typeY/28);
  	bezierVertex(typeX/28+SA,3*typeY/28,  5*typeX/28,SA,  typeX/2,SA);
  endShape();
	beginShape();
    vertex(typeX/2,13/28*typeY);
    bezierVertex(24/28*typeX,13/28*typeY,  typeX-SA,16/28*typeY,  typeX-SA,20/28*typeY);
  	vertex(typeX-SA,3/4*typeY);
    bezierVertex(typeX-SA,24/28*typeY,  24/28*typeX,typeY-SA,  typeX/2,typeY-SA);
    bezierVertex(4/28*typeX,typeY-SA,  SA,24/28*typeY,	SA,3/4*typeY);
    vertex(SA,20/28*typeY);
    bezierVertex(SA,16/28*typeY,  4/28*typeX,13/28*typeY,  typeX/2,13/28*typeY);
  endShape();
    
}

function nine () {
  push();
  translate(typeX,typeY);
  rotateZ(PI);
  
  beginShape();
    vertex(1/2*typeX,SA);
    quadraticVertex(SA,1/4*typeY,  SA,3/4*typeY);
  endShape();
	beginShape();
    vertex(typeX/2,12/28*typeY);
    bezierVertex(24/28*typeX,12/28*typeY,  typeX-SA,16/28*typeY,  typeX-SA,20/28*typeY);
  	vertex(typeX-SA,3/4*typeY);
    bezierVertex(typeX-SA,24/28*typeY,  24/28*typeX,typeY-SA,  typeX/2,typeY-SA);
    bezierVertex(4/28*typeX,typeY-SA,  SA,24/28*typeY,	SA,3/4*typeY);
    vertex(SA,20/28*typeY);
    bezierVertex(SA,16/28*typeY,  4/28*typeX,12/28*typeY,  typeX/2,12/28*typeY);
  endShape();
  
  pop();
}

function zero () {
  beginShape();
    vertex(typeX-SA, typeY/3);
    vertex(typeX-SA,2*typeY/3);
		bezierVertex(typeX-SA,5*typeY/6,  5*typeX/6,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,typeY/3);
  	bezierVertex(SA,typeY/6,  typeX/6,SA,  typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/6,  typeX-SA,typeY/3);
  endShape();

  line(2*typeX/3,typeY/3,typeX/3,2*typeY/3);
}

function letter_underscore () {
  line(0, typeY-SA, typeX, typeY-SA);
}

function letter_dash () {
  line(0, typeY/2, typeX, typeY/2);
}

function letter_question () {
  beginShape();
    vertex(SA,typeY/4);
		bezierVertex(SA,typeY/8,	typeX/6,SA,  typeX/2,SA);
  	bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/8,  typeX-SA,typeY/4);
		bezierVertex(typeX-SA,typeY/2,	typeX/2, 12/28*typeY,	typeX/2,3/4*typeY);
  endShape();

  line(typeX/2, 7*typeY/8-SA, typeX/2, typeY);
}

function letter_period () {
  line(typeX/2, 7*typeY/8-SA, typeX/2, typeY);
}

function letter_colon () {
  line(typeX/2, typeY/2-typeY/8-SA, typeX/2, typeY/2);
  line(typeX/2, 7*typeY/8-SA, typeX/2, typeY);
}

function letter_semicolon () {
  line(typeX/2, typeY/2-typeY/8-SA, typeX/2, typeY/2);
  line(typeX/2, 7*typeY/8-SA, typeX/2 - typeX/4, typeY);
}

function letter_comma () {
  line(typeX/2, 7*typeY/8-SA, typeX/2 - typeX/4, typeY);
}

function letter_exclaim () {
  line(typeX/2, 0, typeX/2, 3*typeY/4);

  line(typeX/2, 7*typeY/8-SA, typeX/2, typeY);
}

function letter_slash () {
  line(0, typeY, typeX, 0);
}

function double_quote () {
  if(doubleQuoteSwitch == 1){
  	beginShape();
      vertex(typeX/3-SA/2,typeY/4);
      vertex(typeX/3-SA/2,5*typeY/28);
      vertex(typeX/3-SA/2,5*typeY/28+SA/2);
      vertex(typeX/2-SA/2,SA);
    endShape();
    beginShape();
      vertex(typeX/2+SA/2,typeY/4);
      vertex(typeX/2+SA/2,5*typeY/28);
      vertex(typeX/2+SA/2,5*typeY/28+SA/2);
      vertex(typeX*2/3+SA/2,SA);
    endShape();
  } else if(doubleQuoteSwitch == -1){
    beginShape();
      vertex(typeX/3-SA/2,typeY/4);
  	  vertex(typeX/2-SA/2,typeY*2/28-SA/2);
      vertex(typeX/2-SA/2,typeY*2/28);
    	vertex(typeX/2-SA/2,0);
    endShape();
    beginShape();
      vertex(typeX/2+SA/2,typeY/4);
  	  vertex(typeX*2/3+SA/2,typeY*2/28-SA/2);
      vertex(typeX*2/3+SA/2,typeY*2/28);
    	vertex(typeX*2/3+SA/2,0);
    endShape();
  }
  doubleQuoteSwitch *= -1;
}

function single_quote () {
  if(singleQuoteSwitch == 1){
  	beginShape();
      vertex(typeX*3/8-SA/2,typeY/4);
      vertex(typeX*3/8-SA/2,5*typeY/28);
      vertex(typeX*3/8-SA/2,5*typeY/28+SA/2);
      vertex(typeX*5/8-SA/2,SA);
    endShape();
  } else if(singleQuoteSwitch == -1){
    beginShape();
      vertex(typeX*3/8-SA/2,typeY/4);
  	  vertex(typeX*5/8-SA/2,typeY*2/28-SA/2);
      vertex(typeX*5/8-SA/2,typeY*2/28);
    	vertex(typeX*5/8-SA/2,0);
    endShape();
  }
  singleQuoteSwitch *= -1;
}

function hash () {
	beginShape();
  	vertex(typeX/8,typeY);
  	vertex(typeX/8,typeY-SA);
  	vertex(typeX/8,typeY-SA/2);
  	vertex(typeX/2,SA/2);
  	vertex(typeX/2,SA);
  	vertex(typeX/2,0);
  endShape();
  beginShape();
  	vertex(typeX/2,typeY);
  	vertex(typeX/2,typeY-SA);
  	vertex(typeX/2,typeY-SA/2);
  	vertex(typeX*7/8,SA/2);
  	vertex(typeX*7/8,SA);
  	vertex(typeX*7/8,0);
  endShape();
  
  line(typeX*2/28,typeY/3,	typeX,typeY/3);
  line(0,typeY*2/3,	26/28*typeX,typeY*2/3);
}

function cash() {
  beginShape();
    vertex(27*typeX/28-SA,typeY/4);
  	vertex(27*typeX/28-SA,13*typeY/56);
  	bezierVertex(27*typeX/28-SA,4*typeY/28,  7*typeX/8,SA,  typeX/2,SA);
    bezierVertex(typeX/4,SA,  typeX/28+SA,2*typeY/28,  typeX/28+SA,11*typeY/56);
    vertex(typeX/28+SA,6*typeY/28);
  	bezierVertex(typeX/28+SA,17*typeY/56,  typeX/8,21*typeY/56,  typeX/3,12*typeY/28);
  	vertex(20*typeX/28,29*typeY/56);
  	bezierVertex(26*typeX/28,16*typeY/28,  typeX-SA,18*typeY/28,	typeX-SA,41*typeY/56);
    vertex(typeX-SA,3*typeY/4);
  	bezierVertex(typeX-SA,26*typeY/28,  22*typeX/28,typeY-SA,  typeX/2,typeY-SA);
  	bezierVertex(typeX/4,typeY-SA,  SA,53*typeY/56,  SA,3*typeY/4);
  	vertex(SA,41*typeY/56);
  endShape();
  
  line(typeX/2,-typeY/16-SA,typeX/2,typeY*17/16+SA);
}

function letter_amp () {
    beginShape();
      vertex(typeX-SA,typeY);
  		vertex(typeX-SA,typeY-SA);
  		vertex(typeX-SA,typeY-SA/2);
      quadraticVertex(typeX/8+SA,typeY*11/28,  typeX/8+SA,typeY*6/28);
      bezierVertex(typeX/8+SA,typeY/8,  typeX/4,SA,  12/28*typeX,SA);
      bezierVertex(5*typeX/8,SA,  typeX*2/3,typeY/8,  typeX*2/3,typeY*5/28);
      bezierVertex(typeX*2/3,typeY*11/28,	 SA,typeY/2,		SA,3*typeY/4);
      quadraticVertex(SA,typeY,  typeX/2,typeY-SA);
      vertex(typeX/2,typeY-SA);
      quadraticVertex(typeX-SA,typeY-SA,  typeX-SA,typeY/2);
    endShape();
  
  line(typeX,typeY/2,	typeX*3/4,typeY/2);
}

function percentage() {
  beginShape();
  	vertex(SA,typeY);
  	vertex(SA,typeY-SA);
  	vertex(SA,typeY-SA/2);
  	vertex(typeX-SA,SA/2);
  	vertex(typeX-SA,SA);
  	vertex(typeX-SA,0);
  endShape();
  
  beginShape();
		vertex(typeX/4,SA);
  	bezierVertex(typeX*3/8,SA,	typeX/2-SA,typeY/12, 	typeX/2-SA,typeY/6);
  	bezierVertex(typeX/2-SA,3/12*typeY,	typeX*3/8,typeY/3-SA,  typeX/4,typeY/3-SA);
  	bezierVertex(typeX/8,typeY/3-SA,  SA,3/12*typeY,	SA,typeY/6);
  	bezierVertex(SA,typeY/12,  typeX/8,SA,	typeX/4,SA);
  endShape();
  
  push();
	translate(typeX,typeY);
	rotateZ(PI);
    beginShape();
      vertex(typeX/4,SA);
      bezierVertex(typeX*3/8,SA,	typeX/2-SA,typeY/12, 	typeX/2-SA,typeY/6);
      bezierVertex(typeX/2-SA,3/12*typeY,	typeX*3/8,typeY/3-SA,  typeX/4,typeY/3-SA);
      bezierVertex(typeX/8,typeY/3-SA,  SA,3/12*typeY,	SA,typeY/6);
      bezierVertex(SA,typeY/12,  typeX/8,SA,	typeX/4,SA);
    endShape();
	pop();
}

function equal() {
	line(0,typeY*3/8,	typeX,typeY*3/8);
  line(0,typeY*5/8,	typeX,typeY*5/8);
}

function plus() {
	line(0,typeY/2,	typeX,typeY/2);
  line(typeX/2,typeY/4,	typeX/2,typeY*3/4);
}

function asterisk() {
	push();
  translate(typeX/2,typeY/6);
  for(var i=0; i<5; i++){
  	rotateZ(2*PI/5);
    line(0,0,0,typeY/6);
  }
  pop();
}


function at() {
  beginShape();
		vertex(17/28*typeX,typeY-SA);
  	vertex(typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,12/28*typeY);
  	bezierVertex(SA,typeY/4,  typeX/6,2/28*typeY+SA,  typeX/2,2/28*typeY+SA);
    bezierVertex(5*typeX/6,2/28*typeY+SA,  typeX-SA,typeY/4,  typeX-SA,12/28*typeY);
    vertex(typeX-SA,23/28*typeY);
  endShape();
  beginShape();
		vertex(typeX-SA,17/28*typeY);
  	bezierVertex(typeX-SA,21/28*typeY,  3/4*typeX,24/28*typeY,	16/28*typeX,24/28*typeY);
  	bezierVertex(11/28*typeX,24/28*typeY,  8/28*typeX,3/4*typeY,  8/28*typeX,17/28*typeY);
  	bezierVertex(8/28*typeX,13/28*typeY,  11/28*typeX,10/28*typeY,  16/28*typeX,10/28*typeY);
  	bezierVertex(3/4*typeX,10/28*typeY,  typeX-SA,13/28*typeY,  typeX-SA,17/28*typeY);
  endShape();
}
/*
function at() {
  beginShape();
		vertex(typeX/2,typeY-SA);
  	bezierVertex(typeX/6,typeY-SA,  SA,5*typeY/6,  SA,2*typeY/3);
    vertex(SA,typeY/3);
  	bezierVertex(SA,typeY/6,  typeX/6,SA,  typeX/2,SA);
    bezierVertex(5*typeX/6,SA,  typeX-SA,typeY/6,  typeX-SA,typeY/3);
 	  vertex(typeX-SA, typeY/3);
    vertex(typeX-SA,3/4*typeY);
  	bezierVertex(typeX-SA,24/28*typeY,	3/4*typeX, 24/28*typeY,  3/4*typeX,3/4*typeY);
    vertex(3/4*typeX,11/28*typeY);
  	bezierVertex(3/4*typeX,8/28*typeY,	20/28*typeX,6/28*typeY,  typeX/2,6/28*typeY);
  	bezierVertex(12/28*typeX,6/28*typeY,  11/28*typeX,6/28*typeY,  1/3*typeX,1/4*typeY);
  endShape();
  beginShape();
	  vertex(typeX/2,11/28*typeY);
    bezierVertex(18/28*typeX, 11/28*typeY,  3/4*typeX,13/28*typeY,  3/4*typeX,16/28*typeY);
    bezierVertex(3/4*typeX,19/28*typeY,  18/28*typeX,21/28*typeY,  typeX/2,21/28*typeY);
    bezierVertex(10/28*typeX,21/28*typeY,  typeX/4,19/28*typeY,  typeX/4,16/28*typeY);
  	bezierVertex(typeX/4,13/28*typeY,  10/28*typeX,11/28*typeY,  typeX/2,11/28*typeY);
  endShape();
}
*/
function letter_space () {
}

