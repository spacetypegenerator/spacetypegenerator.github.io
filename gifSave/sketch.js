var gifLength = 90;
var gifStart, gifEnd;
var gifRecord = false;
var canvas;

var capturer = new CCapture( {
     framerate: 60,
     format:'gif',
     workersPath: 'js/',
    verbose: true
} );

var TL, TR, BR, BL;

function setup() {
    var p5Canvas = createCanvas(windowWidth, windowHeight,WEBGL);
    canvas = p5Canvas.canvas;
    
    saveLoopSet = createButton('Save Loop'); saveLoopSet.position(150,height-60); saveLoopSet.mousePressed(saveLoop);
}

function draw() {
    background(0);
    
    TL = createVector(sin(frameCount*0.01)*20+10,0,cos(frameCount*0.01)*20+10);
    TR = createVector(sin(frameCount*0.01+PI)*20,0,cos(frameCount*0.01+PI)*20);
    BR = createVector(20,40,0);
    BL = createVector(0,40,0);
    
    stroke(255);
    strokeWeight(2);
    noFill();
    
    frame();

    if(gifRecord == true && frameCount==(gifStart+1)){
        capturer.start();
        capturer.capture(canvas);
        print("start");
    } else if(gifRecord == true && frameCount<gifEnd){
        capturer.capture(canvas);
        print("record");
    } else if (gifRecord == true && frameCount==gifEnd) {
        capturer.stop();
       capturer.save();
        print("stop");
    }

}

function frame() {
  beginShape();
	vertex(TL.x,TL.y,TL.z);
	vertex(TR.x,TR.y,TR.z);
	vertex(BR.x,BR.y,BR.z);
	vertex(BL.x,BL.y,BL.z);
	vertex(TL.x,TL.y,TL.z);
  endShape();
}

function saveLoop() {
    gifStart = frameCount;
    gifEnd = gifStart + gifLength;
    gifRecord = true;
    print(frameCount);
    print(gifEnd);
}