function ribbonEngine(currentGraphic,flip){
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

    let heightRatio = currentGraphic.width * stripHeight/currentGraphic.height;

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
