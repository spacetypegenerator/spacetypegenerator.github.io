function ribbonEngine(flip){
  let culmDist = 0;

  beginShape(TRIANGLE_STRIP);
  for(var i=0; i<count; i++){
    let radiusN = map(sin(i * ribbonWave),-1,1,radius - radius*ribbonAmp, radius + radius*ribbonAmp);
    let radiusNpre = map(sin((i-1) * ribbonWave),-1,1,radius - radius*ribbonAmp, radius + radius*ribbonAmp);

    //let radiusN = radius;

    let x0 = 0;
    let x0pre = 0;

    let y0 = i*stretch;
    let y0pre = (i-1)*stretch;

    let angle1 = frameCount * spinSpeed + i*ribbonLength + spinOffset;
    let x1 = radiusN * sin( -(angle1)/factor1 * factor2) * cos(angle1);
    let y1 = radiusN * sin( -(angle1)/factor1 * (factor2 - factor2*factor2B));
    let z1 = radiusN * cos( -(angle1)/factor1 * factor2) * cos(angle1);

    let angle1pre = frameCount * spinSpeed + (i-1)*ribbonLength + spinOffset;
    let x1pre = radiusNpre * sin( -(angle1pre)/factor1 * factor2 ) * cos(angle1pre);
    let y1pre = radiusNpre * sin( -(angle1pre)/factor1 * (factor2 - factor2*factor2B));
    let z1pre = radiusNpre * cos( -(angle1pre)/factor1 * factor2) * cos(angle1pre);

    let v1 = createVector(x1 + x0,y1 + y0,z1);
    let v2 = createVector(x1pre + x0pre,y1pre + y0pre,z1pre);

    if(frameCount==0){
      calculatedLength += v1.dist(v2);
    }

    let perpV = v1.cross(v2);
    perpV.limit(stripHeight/2);

    let heightRatio = pgT.width * stripHeight/pgT.height;

    let u;
    let v_1;
    let v_2;
    let uSeam;
    if(flip == false){
      u = map(culmDist%heightRatio,0,heightRatio,1,0);
      v_1 = 0;
      v_2 = 1;
      uSeam = 1;
    } else {
      u = map(culmDist%heightRatio,0,heightRatio,0,1);
      v_1 = 0;
      v_2 = 1;
      uSeam = 0;
    }

    vertex(v1.x + perpV.x, v1.y + perpV.y, v1.z + perpV.z,u,v_2);
    vertex(v1.x - perpV.x, v1.y - perpV.y, v1.z - perpV.z,u,v_1);

    let thisStepDist = dist(x1 + x0,y1 + y0,z1,  x1pre + x0pre,y1pre + y0pre,z1pre);

    if(culmDist%heightRatio > heightRatio - thisStepDist){
      vertex(v1.x + perpV.x, v1.y + perpV.y, v1.z + perpV.z, uSeam, v_2);
      vertex(v1.x - perpV.x, v1.y - perpV.y, v1.z - perpV.z, uSeam, v_1);
    }

    culmDist += thisStepDist;
  }
  endShape();
}

// create sliders for x,y,z waves along with radius of each
// build circles on top of each other
// create perpindicular for each


// function ribbonEngine(){
//   // let angleA = PI/count;
//   let spinNum = 25;
//   let foldFactor = 1;
//
//   beginShape(TRIANGLE_STRIP);
//   for(var i = 0; i<count; i++){
//     let angleA = map(i,0,count,PI/8,PI*7/8);
//     let angleApre = map(i-1,0,count,PI/8,PI*7/8);
//
//     let radiusWave = map(sin(angleA*6),-1,1,radius * 3/4,radius * 5/4);
//     let radiusWavePre = map(sin(angleApre*6),-1,1,radius * 3/4,radius * 5/4);
//
//     let x = radiusWave * sin(angleA) * cos(spinNum * angleA);
//     let y = radiusWave * sin(angleA) * sin(spinNum * angleA);
//     let z = radiusWave * cos(angleA);
//
//     let xPre = radiusWavePre * sin(angleApre) * cos(spinNum * angleApre);
//     let yPre = radiusWavePre * sin(angleApre) * sin(spinNum * angleApre);
//     let zPre = radiusWavePre * cos(angleApre);
//
//     let v1 = createVector(x,y,z);
//     let v2 = createVector(xPre, yPre, zPre);
//
//     let perpV = p5.Vector.cross(v1,v2);
//     perpV.limit(stripHeight);
//
//     vertex(v1.x + perpV.x,  v1.y + perpV.y,  v1.z + perpV.z);
//     vertex(v1.x - perpV.x,  v1.y - perpV.y,  v1.z - perpV.z);
//   }
//
//   endShape();
// }


// function ribbonEngine(scroll, flip, ribbonNumber) {
//   let x1pre, y1pre, z1pre;
//
//   beginShape(TRIANGLE_STRIP);
//   for(var i=0; i<count; i++){
//     let u;
////
//     // let radiusN = map(sin(i*0.02),-1,1,radius1/2,radius1);
//     // let radiusNpre = map(sin((i-1)*0.02),-1,1,radius1/2,radius1);
//
//     let radiusN = radius1;
//
//     let y0 = -i*stretch;
//     let x0 = map(sin(frameCount*0.02 + i*0.1),-1,1,-100,100);
//
// //    let angle1 = frameCount*0.005 + i*0.03;
//     let angle1 = frameCount*0.005 + i*0.02;
//     let x1 = radiusN * sin(PI/foldFactor - (angle1)/4*7) * cos(angle1);
//     let y1 = radiusN * sin(PI/foldFactor - (angle1)/4*5);
//     let z1 = radiusN * cos(PI/foldFactor - (angle1)/4*7) * cos(angle1);
//
//     // let angle1 = frameCount*0.005 + i*0.03 + ribbonNumber*stagger;
//     // let x1 = radiusN * sin(PI/foldFactor - (angle1)/4*7) * cos(angle1);
//     // let y1 = radiusN * sin(PI/foldFactor - (angle1)/4*4) * sin(angle1);
//     // let z1 = radiusN * cos(PI/foldFactor - (angle1)/4*7) * cos(angle1);
//
//     let v1 = createVector(x1,y1,z1);
//     let v2 = createVector(x1pre,y1pre,z1pre);
//
//     if(frameCount==0){
//       calculatedLength += v1.dist(v2);
//     }
//
//     let perpV = p5.Vector.cross(v1,v2);
//     perpV.limit(stripHeight*5);
//
//     vertex(x0 + x1 + perpV.x*ribbonCount - ribbonNumber*perpV.x, y0 + y1 + perpV.y*ribbonCount - ribbonNumber*perpV.y, z1 + perpV.z*ribbonCount - ribbonNumber*perpV.z,u,1);
//     vertex(x0 + x1 + perpV.x*ribbonCount - (ribbonNumber+1)*perpV.x, y0 + y1 + perpV.y*ribbonCount - (ribbonNumber+1)*perpV.y, z1 + perpV.z*ribbonCount - (ribbonNumber+1)*perpV.z,u,0);
//
//     x1pre = x1;
//     y1pre = y1;
//     z1pre = z1;
//   }
//   endShape();
// }
