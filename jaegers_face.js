/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

function JaegersFace() {


  // these are state variables for a face
  // (your variables may be different)
 // this.eye_value = 2;    // can be either 2 (eyes) or 3 (no eyes)
 // this.mouth_value = 1;  // range is 0.5 to 8
 // this.tilt_value = 0;   // range is -30 to 30

  this.length = 340;
  this.curly = 100;
  this.e = 100;
  this.eyeColour = 200;
  this.acc = 6;
  this.hair = 50;
  this.makeupStrength = 100;
  this.eyeBrowSize = 0.15;
  this.skin = 50;


  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    translate(0, -0.2);
    scale(1.3);
   scale(0.4, 0.4);

  let skew = this.turn;


  let superWhiteSkin = color(255, 230, 209);
  let whiteSkin = color(237, 203, 175);
  let tanSkin = color(217, 180, 141);
  let darkSkin = color(179, 146, 116);
  let skinColour;

  let whiteHair = color(232, 237, 237);
  let blondeHair = color(255, 218, 115);
  let gingerHair = color(230, 150, 90);
  let brownHair = color(181, 91, 58);
  let blackHair = color(100, 100, 100);
  let hairColour = color(100, 100, 100);

    //skin colour 
  if(this.skin < 33){
    skinColour = lerpColor(superWhiteSkin, whiteSkin, this.skin/33);
  } else if(this.skin < 66){
    skinColour = lerpColor(whiteSkin, tanSkin, (this.skin-33)/33);
  } else {
    skinColour = lerpColor(tanSkin, darkSkin, (this.skin-66)/33);
  }
  

  angleMode(DEGREES);
  let L = this.length;
  let eyeSize = this.e;
  fill(255, 218, 115);



  //hair colour
  if(this.hair < 25){
    hairColour = lerpColor(whiteHair, blondeHair, this.hair/25);
  } else if(this.hair < 50){
    hairColour = lerpColor(blondeHair, gingerHair, (this.hair-25)/25);
  } else if(this.hair < 75){
   hairColour = lerpColor(gingerHair, brownHair, (this.hair-50)/25);
 } else{
  hairColour = lerpColor(brownHair, blackHair, (this.hair-75)/25);
} 

fill(hairColour);
stroke(hairColour.red -50, green(hairColour) - 50, blue(hairColour) - 50);


//strokeWeight(width/960/10);
strokeWeight(0.04);
randomSeed(23);

  let cheekboneLeftX = positions.chin[4][0];
  let cheekboneLeftY = positions.chin[4][1];

  let cheekboneRightX = positions.chin[12][0];
  let cheekboneRightY = positions.chin[12][1];

  let eliSize = (positions.chin[16][0] - positions.chin[0][0])/2;
  let eliX = positions.chin[0][0] + eliSize;

  let eliY = positions.chin[0][1]+(positions.chin[16][1] - positions.chin[0][1])/2;






push();

translate(eliX*2.5, ((eliY-((eliSize*1.5)))*2.5)+9);

this.drawHair(L, this.curly, hairColour);

pop();

  //ears
  
  push();
  scale(2.5, 2.5);
  fill(skinColour);
  stroke(red(skinColour)-20, green(skinColour)-42, blue(skinColour)-58);


  let headTurn = (eliX - positions.nose_bridge[0][0])*0.3;
  

    push(); 
    translate(positions.chin[1][0]+0.3+headTurn, positions.chin[1][1]);
    ellipse(0, 0,  1,1.5 );
    pop();

    push();    
    translate(positions.chin[15][0]-0.3+headTurn, positions.chin[15][1]);
    ellipse(0, 0, 1,1.5 ); 
    pop();
  

  pop();


  //head

  fill(skinColour);
  stroke(red(skinColour)-20, green(skinColour)-42, blue(skinColour)-58);
  push();
  scale(2.5, 2.5);
  ellipse(eliX, eliY, eliSize*2);

  beginShape();

  vertex(positions.chin[0][0], positions.chin[0][1]);

  bezierVertex(positions.chin[0][0], positions.chin[0][1], 

  cheekboneLeftX+(positions.chin[0][0] - cheekboneLeftX)/2, positions.chin[3][1] , cheekboneLeftX, cheekboneLeftY); // cheekboneLeftX+(positions.chin[0][0] - cheekboneLeftX)/2.5, cheekboneLeftY

  vertex(cheekboneLeftX, cheekboneLeftY);  

  bezierVertex(cheekboneLeftX, cheekboneLeftY, cheekboneLeftX + 0, cheekboneLeftY*1.25 , positions.chin[7][0], positions.chin[7][1]); // cheekboneLeftX + 0.1, cheekboneLeftY*1.15


  vertex(positions.chin[7][0], positions.chin[7][1]); //CHIN


  bezierVertex(positions.chin[7][0], positions.chin[7][1], positions.chin[8][0], positions.chin[8][1] + 0.15, positions.chin[9][0], positions.chin[9][1]);


  vertex(positions.chin[9][0], positions.chin[9][1]); //CHIN


  bezierVertex(positions.chin[9][0], positions.chin[9][1], cheekboneRightX - 0, cheekboneRightY*1.25 , cheekboneRightX, cheekboneRightY); // cheekboneRightX - 0.1, cheekboneRightY*1.15

  vertex(cheekboneRightX, cheekboneRightY);  

  bezierVertex(cheekboneRightX, cheekboneRightY, cheekboneRightX+(positions.chin[16][0] - cheekboneRightX)/2, positions.chin[13][1]  , positions.chin[16][0], positions.chin[16][1]); // cheekboneRightX+(positions.chin[16][0] - cheekboneRightX)/2.5, cheekboneRightY

  vertex(positions.chin[16][0], positions.chin[16][1]);

  endShape();


 pop();
  //FACIAL FEATURES
  push();

  // eyes
  fill(255);
  
  push();
  push();
  this.makeup(this.makeupStrength, eyeSize, skew, positions);
  pop();


  push(); 
  scale(2.5, 2.5);

  let buffer = 0.5;

  let eyeShearLeft = (positions.left_eye[0][1] - positions.left_eye[3][1])*-100;
  let eyeShearRight = (positions.right_eye[0][1] - positions.right_eye[3][1])*-100;

  let scaleOffset = (eliX - positions.nose_bridge[0][0]);

  push(); //left eye

  stroke(255);

  translate(average_point(positions.left_eye)[0], average_point(positions.left_eye)[1] + buffer);
  //translate(average_point(positions.left_eye)[0], average_point(positions.left_eye)[1] + 0);

   this.eyeBrow(hairColour, positions, -0.1, this.eyeBrowSize);

  if(scaleOffset > 0){
    scale((eliSize*0.6)-(scaleOffset*0.5), eliSize*0.6);

  } else {
    scale(eliSize*0.6, eliSize*0.6);
  }

  rotate(eyeShearLeft);
  this.eye(-0.1, eyeSize, hairColour, this.eyeColour); //left eye
  pop();

  push(); //right eye

  stroke(255);

  translate(average_point(positions.right_eye)[0], average_point(positions.right_eye)[1] + buffer);


  this.eyeBrow(hairColour, positions, 0.1, this.eyeBrowSize);


  if(scaleOffset < 0){
    scale((eliSize*0.6)+(scaleOffset*0.5), eliSize*0.6);

  } else {
    scale(eliSize*0.6, eliSize*0.6);
  }
  rotate(eyeShearRight);

  this.eye(0.1, eyeSize, hairColour, this.eyeColour); //right eye  
  
  pop();
  pop();
  pop();
    


  //nose  
  noFill();

  strokeWeight(0.05);
  stroke(75);

  push();

  scale(2.5, 2.5);
  strokeWeight(0.05);
  stroke(204, 60, 35, 40);
  line(positions.nose_bridge[0][0],positions.nose_bridge[3][1], positions.nose_bridge[3][0], average_point(positions.nose_tip)[1]);

  push();
  noFill();
  strokeWeight(0.05);
  stroke(75);

  translate(0, -0.4);
  translate(positions.nose_tip[2][0], positions.nose_tip[2][1]+(buffer/2));
  scale(0.4, 0.4);

  bezier(-0.45, 1.05, -0.4, 1, -0.35, 1 ,-0.2, 1.15);
  bezier(0.45, 1.05, 0.4, 1, 0.35, 1 ,0.2, 1.15);

  noStroke();
  fill(204, 60, 35, 40);

  push();
  translate(0, 0.5);
  scale(0.6, 0.8);

  beginShape(); //nose shadow

  vertex(0.5, 0.4);
  bezierVertex(0.5, 0.4, 1.75, 0.75 ,0, 1.4); //bottomright
  vertex(0, 1.4); 
  bezierVertex(0, 1.4, -1.75, 0.75 , -0.5, 0.4); //bottomleft
  vertex(-0.5, 0.4); 
  bezierVertex(-0.5, 0.4, -0.4, 0.35,0,  0.5); //top left
  vertex(0, 0.5);
  bezierVertex(0, 0.5, 0.4, 0.35 ,0.5, 0.4); //top right

  endShape(CLOSE);
  pop();
  pop();
 
  pop();

  //mouth
  let lipsDiff= 
  (positions.bottom_lip[10][1] - positions.top_lip[8][1]) + (positions.bottom_lip[8][1] - positions.top_lip[10][1]);

  stroke(0);
  push();

  scale(2.5,2.5);  
  translate(0, buffer/1.5 );

  stroke(0);
  strokeWeight(0.015);
  let b1x = positions.top_lip[7][0]+(positions.top_lip[8][0]-positions.top_lip[7][0])/2;
  let b1y = positions.top_lip[7][1];

  let b4x = positions.top_lip[10][0]+(positions.top_lip[11][0]-positions.top_lip[10][0])/2;
  let b4y = positions.top_lip[11][1];

  fill(red(skinColour)-15, green(skinColour)-35, blue(skinColour)-35);
  //fill(222, 218, 213);
  beginShape();

  vertex(b1x, b1y);

  bezierVertex(b1x, b1y,positions.top_lip[9][0] , positions.top_lip[9][1] ,b4x, b4y);
  vertex(b4x, b4y);

  if(lipsDiff < 0.1) { 
    bezierVertex(b4x, b4y,positions.top_lip[9][0] , positions.top_lip[9][1] ,b1x, b1y);
  } else {
    bezierVertex(b4x, b4y,positions.bottom_lip[9][0] , positions.bottom_lip[9][1] + buffer/2 ,b1x, b1y);
  }

  vertex(b1x, b1y);

  endShape();

  //teeth
  
  if(lipsDiff > 0.1) { 
    fill(242, 228, 225);
    beginShape();

    vertex(b1x, b1y);

    bezierVertex(b1x, b1y,positions.top_lip[9][0] , positions.top_lip[9][1] ,b4x, b4y);
    vertex(b4x, b4y);
    bezierVertex(b4x, b4y,positions.bottom_lip[9][0] ,
     positions.top_lip[9][1]+((positions.bottom_lip[9][1] + buffer/2)-positions.top_lip[9][1])/3
     ,b1x, b1y);

    vertex(b1x, b1y);

    endShape();
  }
  pop();
  
  //mouth shadow
  fill(204, 60, 35, 30);
  noStroke();
  translate(0, buffer/2);
  beginShape();
  vertex(0, 3.25);
  bezierVertex(0, 3.25, 0.6, 3.25, 0.3, 3.5);
  vertex(0.3, 3.5);
  bezierVertex(0.3, 3.5, 0, 3.75, -0.3, 3.5);
  vertex(-0.3, 3.5);
  bezierVertex(-0.3, 3.5, -0.6, 3.25, 0, 3.25);

  endShape(CLOSE);
  
  pop();



  //hair
  noStroke();
  fill(255, 50);

  fill(255, 218, 115);
  stroke(230, 188, 73);
  fill(hairColour);
  stroke(red(hairColour) -50, green(hairColour) - 50, blue(hairColour) - 50);
  


  push();
  this.Fringe(L, this.curly, positions);
  pop();
  
  //accessories
  push(); //right accessories

  translate(eliX*2.5, ((eliY-((eliSize*1.5)))*2.5)+9);
  if(skew > 0){ //right getting shrunk
    scale(1-(skew*0.1), 1-(skew*0.1)); 
    translate(skew*0.8, -skew*0.25);
  } else {
    scale(1+(-skew*0.1), 1+(-skew*0.1)); 
   translate(skew*0.8, -skew*0.25);
  }

  if(this.acc > 2){ //2 flower RIGHT
    push();
    this.flower1(L, 1);
    pop();
  }
  if(this.acc > 3){ //3 flower RIGHT
    push();
    this.flower1(L, 0.8);
    pop();
  }
  if(this.acc > 0){ //0 bow  RIGHT
    push();
    this.bow(L, this.curly, 1);
    pop();
  }
  pop();

  push(); //left accessories
  translate(0, 0);
  translate(eliX*2.5, ((eliY-((eliSize*1.5)))*2.5)+9);

  if(skew < 0){ //right getting shrunk
    scale(1-(-skew*0.1), 1-(-skew*0.1)); 
    translate(skew*0.8, skew*0.25);
  } else {
    scale(1+(skew*0.1), 1+(skew*0.1)); 
   translate(skew*0.8, skew*0.25);
  }

  if(this.acc > 4){ //4 flower LEFT
      push();
      this.flower2(L, this.curly);
      pop();
  }

  if(this.acc > 1){ //1 bow LEFT
    push();
    this.bow(L, this.curly, -1);
    pop();
  }
pop();

 }

this.eyeBrow = function(col, positions, pos, size){
  push();
  

  let hairColour = col;
  colorMode(HSB, 360, 100, 100, 100);  
  fill(hairColour);
  stroke(hue(hairColour), saturation(hairColour), brightness(hairColour)-20);
  strokeWeight(0.03);

  let browSize = size; //0 -> 0.25

  if(pos < 0){ //left eye
    translate(-average_point(positions.left_eye)[0], -average_point(positions.left_eye)[1]);

    beginShape();

    vertex(positions.left_eyebrow[0][0],positions.left_eyebrow[0][1]); //start
    
    bezierVertex(positions.left_eyebrow[0][0],positions.left_eyebrow[0][1],
      positions.left_eyebrow[0][0],positions.left_eyebrow[1][1]+(positions.left_eyebrow[0][1]-positions.left_eyebrow[1][1])/2,
      positions.left_eyebrow[1][0],positions.left_eyebrow[1][1]);  

    vertex(positions.left_eyebrow[1][0],positions.left_eyebrow[1][1]);
    
    bezierVertex(positions.left_eyebrow[1][0],positions.left_eyebrow[1][1], 
      positions.left_eyebrow[2][0],positions.left_eyebrow[3][1]*1.05,
      positions.left_eyebrow[4][0],positions.left_eyebrow[4][1]);  

    vertex(positions.left_eyebrow[4][0],positions.left_eyebrow[4][1]); //end

    vertex(positions.left_eyebrow[4][0],positions.left_eyebrow[4][1]-browSize);

    bezierVertex(positions.left_eyebrow[4][0],positions.left_eyebrow[4][1]-browSize, 
      positions.left_eyebrow[2][0],positions.left_eyebrow[3][1]*1.05-(browSize*1),
      positions.left_eyebrow[1][0]-(browSize*0.3),positions.left_eyebrow[1][1]-(browSize*0.4));  

    vertex(positions.left_eyebrow[1][0]-(browSize*0.3),positions.left_eyebrow[1][1]-(browSize*0.4));

     bezierVertex(positions.left_eyebrow[1][0]-(browSize*0.3),positions.left_eyebrow[1][1]-(browSize*0.4),
      positions.left_eyebrow[0][0],
      (positions.left_eyebrow[1][1]-(browSize*0.4))+(positions.left_eyebrow[0][1]-(positions.left_eyebrow[1][1]-(browSize*0.4)))/2,
      positions.left_eyebrow[0][0],positions.left_eyebrow[0][1]);

    vertex(positions.left_eyebrow[0][0],positions.left_eyebrow[0][1]); //start

    endShape();
  } else { //right eye

    translate(-average_point(positions.right_eye)[0], -average_point(positions.right_eye)[1]);

    beginShape();

    vertex(positions.right_eyebrow[4][0],positions.right_eyebrow[4][1]); //start
    
    bezierVertex(positions.right_eyebrow[4][0],positions.right_eyebrow[4][1],
      positions.right_eyebrow[4][0],positions.right_eyebrow[3][1]+(positions.right_eyebrow[4][1]-positions.right_eyebrow[3][1])/2, //average
      positions.right_eyebrow[3][0],positions.right_eyebrow[3][1]);  

    vertex(positions.right_eyebrow[3][0],positions.right_eyebrow[3][1]);
    
    bezierVertex(positions.right_eyebrow[3][0],positions.right_eyebrow[3][1], 
      positions.right_eyebrow[2][0],positions.right_eyebrow[1][1]*1.05,
      positions.right_eyebrow[0][0],positions.right_eyebrow[0][1]);  

    vertex(positions.right_eyebrow[0][0],positions.right_eyebrow[0][1]); //end

    vertex(positions.right_eyebrow[0][0],positions.right_eyebrow[0][1]-browSize);

    bezierVertex(positions.right_eyebrow[0][0],positions.right_eyebrow[0][1]-browSize, 
      positions.right_eyebrow[2][0],positions.right_eyebrow[1][1]*1.05-(browSize*1),
      positions.right_eyebrow[3][0]+(browSize*0.3),positions.right_eyebrow[3][1]-(browSize*0.4));  

    vertex(positions.right_eyebrow[3][0]+(browSize*0.3),positions.right_eyebrow[3][1]-(browSize*0.4)); 

     bezierVertex(positions.right_eyebrow[3][0]+(browSize*0.3),positions.right_eyebrow[3][1]-(browSize*0.4),
      positions.right_eyebrow[4][0],
      (positions.right_eyebrow[3][1]-(browSize*0.4))+(positions.right_eyebrow[4][1]-(positions.right_eyebrow[3][1]-(browSize*0.4)))/2, //average
      positions.right_eyebrow[4][0],positions.right_eyebrow[4][1]);

    vertex(positions.right_eyebrow[4][0],positions.right_eyebrow[4][1]); //start

    endShape();
  }

  colorMode(RGB, 255);
  pop();
}

this.makeup = function(strength, eyeSize ,skew, positions){


  let buffer = 0.5;

  //blush

  let eliSize = (positions.chin[16][0] - positions.chin[0][0])/2;
  let scaleOffset = ((positions.chin[0][0] + eliSize) - positions.nose_bridge[0][0]);

  
  for(let i = 0; i < 10; i++){
    noStroke();
    fill(255, 64, 118, 0.05*strength); //0.05

    push();

    if(scaleOffset > 0){
      scale((eliSize*0.6)-(scaleOffset*0.5), (eliSize*0.6)-(scaleOffset*0.3));
      translate(scaleOffset*-1, 0);
    } else {
      scale(eliSize*0.6, eliSize*0.6);
    }

    translate(0, buffer/2);

    ellipse(-2.75, 0, i*0.3, i*0.3); //left blush    

    pop();

    push();    
      
    if(scaleOffset < 0){
      scale((eliSize*0.6)-(scaleOffset*-0.5), (eliSize*0.6)-(scaleOffset*-0.3));
      translate(scaleOffset*-1, 0);
    } else {
      scale(eliSize*0.6, eliSize*0.6);
    }

    translate(0, buffer/2);
    ellipse(2.75, 0, i*0.3, i*0.3); //right blush
    pop();
  }

  //cheek lines
  strokeWeight(0.05);
  stroke(199, 143, 107, strength*2.55);
    push();

    if(scaleOffset > 0){
      scale((eliSize*0.6)-(scaleOffset*0.5), (eliSize*0.6)-(scaleOffset*0.3));
      translate(scaleOffset*-1,0);
    } else {
      scale(eliSize*0.6, eliSize*0.6);
    }
    //left lines
    line(-3, 0, -3.2, 0.5);
    line(-2.75, 0.05, -2.95, 0.55);
    line(-2.5, 0.1, -2.7, 0.6);
    line(-2.25, 0.15, -2.45, 0.65);

    pop();

    push();    
      
    if(scaleOffset < 0){
      scale((eliSize*0.6)-(scaleOffset*-0.5), (eliSize*0.6)-(scaleOffset*-0.3));
      translate(scaleOffset*-1, 0);
    } else {
      scale(eliSize*0.6, eliSize*0.6);
    }


    //right lines
    line(3.2, 0, 3, 0.5);
    line(2.95, 0.05, 2.75, 0.55);
    line(2.7, 0.1, 2.5, 0.6);
    line(2.45, 0.15, 2.25, 0.65);

    pop();

  //lipstick
  push();   

   let lipsDiff= (positions.bottom_lip[10][1] - positions.top_lip[8][1]) + (positions.bottom_lip[8][1] - positions.top_lip[10][1]);

   scale(2.5,2.5);

  
  translate(0, buffer/1.5 );

  stroke(0);
  strokeWeight(0.02);
  let b4x = positions.top_lip[7][0]+(positions.top_lip[8][0]-positions.top_lip[7][0])/2;
  let b4y = positions.top_lip[7][1];

  let b1x = positions.top_lip[10][0]+(positions.top_lip[11][0]-positions.top_lip[10][0])/2;
  let b1y = positions.top_lip[11][1];

  let topMid;
  if(b4y - b1y < 0){
    topMid = b4y+(b1y - b4y)/2;
  } else {
    topMid = b1y+(b4y - b1y)/2;
  }


  fill(255, 64, 118, 1.5*strength); //0.75
  stroke(255, 64, 118, 3*strength);

  beginShape();

  vertex(b1x, b1y);

  bezierVertex(b1x, b1y, positions.top_lip[2][0],positions.top_lip[2][1]-(0.15*buffer) ,positions.top_lip[3][0], topMid);

  vertex(positions.top_lip[3][0], topMid);

  bezierVertex(positions.top_lip[3][0], topMid, positions.top_lip[4][0],positions.top_lip[4][1]-(0.15*buffer), b4x, b4y);

  vertex(b4x, b4y);

  if(lipsDiff < 0.1) { 
    bezierVertex(b4x, b4y, average_point(positions.bottom_lip)[0], positions.bottom_lip[3][1]+ buffer*0.25, b1x, b1y);
  } else {
    bezierVertex(b4x, b4y, average_point(positions.bottom_lip)[0], positions.bottom_lip[3][1] + buffer*0.75,b1x, b1y);
  }
  

  vertex(b1x, b1y);

  endShape();

  pop();


}


this.flower2 = function(len, curl){
  if(len > 190){
    translate(map(len, 190, 340, -5.5,-6.5+curl/200), map(len, 190, 340, -1, 5+curl/50));
  }else {
    translate(map(len, 0, 190, -5, -5.5),
    map(len, 0, 190, -3.5, -1));

  }
  
  stroke(163, 120, 57);
  for(let i = 0; i < 5; i++){

    rotate(72);
    push();
    translate(0, -1);
    fill(250, 236, 192);
    bezier(-0.25, 0.5, -1.5, -1.25, 1.5, -1.25 ,0.25, 0.5);

    fill(237, 196, 135);
    noStroke();
    bezier(-0.15, 0.5, -1, -0.75, 1, -0.75 ,0.15, 0.5);

    pop();
  }
  fill(222, 178, 113);

  ellipse(0, 0, 1, 1);
}

this.flower1 = function(len, sc){
  scale(sc, sc);

  if(sc < 1){
    translate(2, -1);
  }
  if(len > 190){
    translate(6, map(len, 190, 340, -2, 3));
  } else {
    translate(map(len, 0, 190, 4, 6), 
      map(len, 0, 190, -6.5, -2));
  }

  if(sc < 1){
    stroke(131, 87, 173);
  } else {
    stroke(78, 127, 207);
  }

  for(let i = 0; i < 5; i++){
    rotate(72);
    if(sc < 1){
     fill(180-i*10, 140-i*10, 219);
   } else {
     fill(166-i*10, 200-i*10, 255);
   }
   push();
   translate(0, -0.75);

   ellipse(0, 0, 1.5, 1.5);
   pop();
 }

 if(sc < 1){
  fill(230, 172, 110);
} else {
  fill(245, 208, 115);
} 

ellipse(0, 0, 1, 1);
}

this.bow = function(len,curl, pos){
  c = curl/100;

  let scale1 = map(len, 0, 340, 0.7, 1);
  if(pos < 0){
    translate(-6*(1-scale1), -3*(1-scale1));
  } else {
   translate(6*(1-scale1), -3*(1-scale1));
 }
 scale(scale1, scale1);

 scale(pos, 1);
 scale(0.8, 0.8);


 if(len > 190){
  translate(7.25+map(len, 190, 340, 0, c), 
    -4+map(len, 190, 340, 0, c)); 
} else {
  translate(7.25-map(len, 0, 190, 2, 0), -4-map(len, 0, 190, 3, 0)); //short

  scale(map(len, 0, 190, 0.75, 1), map(len, 0, 190, 0.75, 1));

}

rotate(0);

fill(255, 204, 225);
stroke(171, 65, 108);
strokeWeight(0.05);

beginShape();
vertex(0, 1);
bezierVertex(0, 1, 0.25, 3, 1.5, 5);
vertex(3, 5);
bezierVertex(3, 5, 1, 3.5, 0.5, 1);
endShape();

beginShape();
vertex(0.25, 1);
bezierVertex(0.25, 1, 0.75, 3, 4, 5);

vertex(5, 4);
bezierVertex(5, 4, 1.5, 3.5, 0.75, 1);
endShape();

  //big left
  beginShape();

  vertex(0, 0);
  bezierVertex(0, 0,-3, -3, -3, -2);
  vertex(-2, 0);
  bezierVertex(-2, 0, -3, 1, -2, 1.5);
  vertex(0, 1);

  endShape();

  //big right
  beginShape();

  vertex(1, 0);
  bezierVertex(1, 0,3, -3, 3, -2);
  vertex(3, -2);
  vertex(2.25, 0);
  bezierVertex(2, 0, 3, 1, 2, 1.5);
  vertex(2, 1.5);
  vertex(1, 1);

  endShape();
  //outline
  fill(255, 150, 193);
  noStroke();
  bezier(2, 1.5, 2.5, 0.75, 1, 0.5 ,1, 1);

  //outline2
  bezier(-2, 1.5, -2, 0.5, 0, 0.3 ,0, 1);

  //upper outline
  beginShape();

  vertex(1, 0);
  bezierVertex(1, 0 ,3, -3, 3, -2);
  vertex(1, 0.25);
  endShape();

  beginShape();
  vertex(0, 0);
  bezierVertex(0, 0,-3, -3, -3, -2);
  vertex(0, 0.25);
  endShape();

  //shadow
  fill(171, 65, 108);
  stroke(171, 65, 108);
  bezier(2, 1.5, 2, 1, 1.5, 1 ,1, 1);
  line(2, 1.5, 1, 1);

  //shadow2
  bezier(-2, 1.5, -1.5, 0.75, -0.5, 0.75 ,0, 1);
  line(-2, 1.5, 0, 1);

  fill(255, 204, 225);
  rect(-0.1, -0.1, 1.1,1.1, 0.3);

}


this.eye = function(pos, size, col, eyeCol){
  colorMode(HSB, 360, 100, 100, 100);
  let coll = eyeCol;
  let bright;
  if(size > 25){
   bright =  map(size, 25, 100, 1, 0);
 } else {
  bright = 1;
}

  let Med = color(coll, 83 - (59*bright), 79 - (30*bright)); //59
  let Dark = color(coll, 53- (29*bright), 52 - (30*bright)); //29

  let Light = color(coll, 68 - (44*bright), 92 - (30*bright)); //44

  let hairColour = col;

  push();
  scale(0.24, 0.24);
  translate(pos, 0);



  let sc = 0.57;

  stroke(0);
  strokeWeight(0.2*sc);
  strokeCap(SQUARE);

  push();
  if(pos < 0){
    scale(-1, 1);
    translate(-0.15, 0);
  }

  //eyebrow
  strokeWeight(0.2*sc);  

  //outter white eye //3
  if(size > 50 && size < 75){
    sc = map(size, 50, 75, 0, 0.57);
  } else if(size >= 75){
    sc = 0.57;
  } else {
    sc = 0;
  }
  noStroke();
  beginShape();
  fill(255);

  vertex(-3.5*sc, -0.5*sc);
  bezierVertex(-3.5*sc, -1*sc, 1.5*sc, -5.5*sc , 4.5*sc , 0);

  vertex(4.5*sc, 0);
  bezierVertex(5*sc, 0, 1.5*sc, 5*sc, -2.5*sc, 2*sc);
  
  endShape();

  //outline
  stroke(0);
  noFill();
  beginShape();

  vertex(-3.5*sc, -0.5*sc);
  bezierVertex(-3.5*sc, -1*sc, 1.5*sc, -5.5*sc , 4.5*sc , 0);

  vertex(4.5*sc, 0);
  
  endShape();
  pop();
  strokeWeight(0.3*sc);

  //bulk blue //2
  if(size > 25 && size < 50){
    sc = map(size, 25, 50, 0, 0.57);
  } else if(size >= 50){
    sc = 0.57;
  } else {
    sc = 0;
  }

  stroke(Dark);
  fill(Dark);

  ellipse(0.1*sc, 0, 5*sc, 5*sc);
  noStroke();

  //blue shading //2  
  fill(Med);
  ellipse(0, 0.5*sc, 4.5*sc, 3*sc);

  fill(Light);
  ellipse(0, 1*sc, 4*sc, 2.5*sc);

  //noisey dots //4
  if(size > 75){
    sc = map(size, 75, 100, 0, 0.57);
  } else {
    sc = 0;
  }

  //lines from center //4
  stroke(0);  
  strokeWeight(0.1*sc);
  rotate(30);
  let cent;
  for(let i = 0; i < 16; i++){ 
    cent = map(i, 0, 15, -1, 1);
    if(cent < 0){cent = cent*-1;}
    if(i % 2 == 0){
      stroke(0); 
      line(-1*sc, 1*sc, (-1.75+cent/3)*sc, (1.75-cent/3)*sc);
    } else {
      stroke(100); 
      line(-1.4*sc, 1.4*sc, (-1.25+cent/3)*sc, (1.25-cent/3)*sc);
    }
    rotate(-10);
  }

  //lower white cirles //4
  fill(255, 50);
  noStroke();
  rotate(-160);
  for(let j = 0; j < 6; j++){
    ellipse(1.25*sc, 1.5*sc, 0.6*sc, 0.6*sc);
    rotate(-12);
  }
   //black center //1
   sc = 0.57;
   fill(0);

   push();  
   translate(0, -0.25);
   ellipse(0, 0, 1.5*sc, 2.25*sc);

   if(size > 75){
    sc = map(size, 75, 100, 0, 0.57);
  } else {
    sc = 0;
  }

  pop();

  //white circles highlight //2
  if(size > 25 && size < 50){
    sc = map(size, 25, 50, 0, 0.57);
  } else if(size >= 50){
    sc = 0.57;
  } else {
    sc = 0;
  }

  fill(255);
  ellipse(0.75*sc, -0.75*sc, 0.75*sc, 0.75*sc);

  ellipse(1.75*sc, -1.5*sc, 1.25*sc, 1*sc);
  ellipse(-2*sc, 1*sc, 1*sc, 1*sc);  

  pop();

  colorMode(RGB, 255);
}


this.Fringe = function(Len, cur, positions){
  rectMode(CORNERS);  

  let L;
  if(Len > 140){
    L = 340;
  } else if(Len > 106){
    L = map(Len, 105, 140, 0, 340);
  } else {
    L = 0;
  }

  let skew = positions.nose_bridge[0][0]*3.5;

  push();

  let eliSize = (positions.chin[16][0] - positions.chin[0][0])/2;
  let eliX = positions.chin[0][0] + eliSize;


  let eliY = positions.chin[0][1]+(positions.chin[16][1] - positions.chin[0][1])/2;

  fill(255);

  pop();


  let tr = -positions.right_eyebrow[2][0];
  let trMultiplier = map(L, 0, 340, -1, 1);

  translate(0, 7);
  translate(0, eliY*2.5-(eliSize*2.5));
  if(L > 0){
    let xSc = map(L, 0, 340, 0.4-(cur/250), map(cur, 0, 100, 1.5, 1.25)); 
    let ySc = map(L, 0, 340, 0, map(cur, 0, 100, 2, 1.4)); 
    let c = map(cur, 0, 100, 0.8*ySc, 0); 
    let c2 = cur/100;

    translate(0, map(L, 0, 340, -6.5, map(cur, 0, 100, -4.5, -4))); 


    for(let i = 0; i <5; i++){

      push();
 


   if((i+1) % 2 == 0){ //even, left
     translate((map(i-1, 0, 4, 4, 0)), ((-0.55-cur/400)+(i-1)*0.09)*(i-1)); //2, 4   

   } else { //odd, right
    translate((map(i, 0, 4, -4, 0)), ((-0.55-cur/400)+i*0.09)*i); //1, 3, 5
    }

    if(i == 0){ //left 1
      if(skew > 0){
        scale(1+(skew*0.5), 1+(skew*0.3));
        translate(skew*0, 0);
      } else {
        scale(1-(0.2*-skew), 1);
        translate(-0.5*skew, 0.15*-skew);
      }
    } else if(i ==1){ //right 1
     if(skew > 0){
        scale(1-(0.2*skew), 1);
        translate(-0.5*skew, 0.15*skew);
      } else {
        scale(1+(-skew*0.5), 1+(-skew*0.3));
        translate(skew*0, 0);
      }
    } else if(i ==2){ //left 2
      if(skew > 0){
        scale(1+(skew*0.25), 1+(skew*0.1));
        translate((skew*0.1), 0);
      } else {
        scale(1-(-skew*0.15), 1);
        translate(0.5*skew , 0.3*-skew);
      }
    }else if(i ==3){ //right 2
      if(skew > 0){
        scale(1-(skew*0.1), 1);
        translate(0.5*skew , 0.3*skew);
      } else {
        scale(1+(-skew*0.25), 1+(-skew*0.1));
        translate((skew*0.1), 0);
      }
    }else if(i ==4){ //middle
      if(skew > 0){
        scale(1, 1);
        translate(1*skew, 0);
      } else {
        scale(1, 1);
        translate(1*skew, 0);
      }
    }

  beginShape();
  let test = 1;
  vertex(-xSc, -ySc);
    bezierVertex(-xSc, -ySc, 0, -2*(ySc)+c, xSc, -ySc); //top curve

    vertex(xSc, -ySc);
    bezierVertex(xSc, -ySc, 2*xSc-c, 0, xSc, ySc); //east curve

    vertex(xSc, ySc);
    bezierVertex(xSc, ySc, 0, 2*(ySc)-c, -xSc, ySc); //bottom curve

    vertex(-xSc, ySc);
    bezierVertex(-xSc, ySc, -2*xSc+c, 0, -xSc, -ySc); //west curve

    endShape(CLOSE);
    pop();
  } 
}
}



this.drawHair = function(Len, cur, col){
  let hairColour = col;

  let L = Len
  //let curl = map(cur, 0, 100, 180, -90);
  let curl;
  if(L > 240){
    curl = map(cur, 0, 100, 180, map(L, 240, 340, 180, -90));
  } else {
    curl = 180;
  }

  let curly = cur;
  let curlScale;

  if (L < 139){

    curlScale = map(
      curly, 0, 100, 0, 
      map(L, 0, 139, 0.1, 2));
  } else {
    curlScale = map(curly, 0, 100, 0, map(L, 139, 340, 2, 3));
  }


  push();  
  translate(0, -3);
  rotate(10); 
  for(let i = 0; i < 5; i++){    
    rotate(28);
    if(L < 139){
      if(L > 90){
        ellipse(-4, 0, 4, map(curly, 0, 100, map(L, 90, 139, 0.01, 8), map(L, 90, 139,  2.5, 4)));
      } else {
        ellipse(map(L, 0, 90, -2.9, -4), 0, 4, map(curly, 0, 100, 0.01, 2.5));
      }
    }
    else {
     ellipse(-4, 0, 4, map(curly, 0, 100, 8, 4));   
   }    
 }
 pop();

  if(L < 139){ //shorter hair

    translate(0, map(L, 0, 139, 7, 0));
    scale(map(L, 0, 139, 0.2, 1), map(L, 0, 139, 0.5, 1));

    arc(3+0, -5, 6, 6, 170, 221+L, CHORD); //ARAAC
    arc(-3-0, -5, 6, 6, 320-L, 371, CHORD); //mirror




    let HairLength = -5+map(L, 0, 139, -130, 0);

    push();  //right curl
    translate(3 + ((3+curlScale) * cos(221+L)) +0 , -5 + ((3+curlScale) * sin(221+L)));
    rotate(HairLength);
    
    beginShape();



   let cX = map(HairLength, -135, -5, -0.2, -0.9);
   let cY = map(HairLength, -135, -5, -0.0, -0.8);
   let radiuss = map(HairLength, -135, -5, 0.1, curlScale*1.5)/2;
   let anglee = -20;

   endShape();
   fill(225, 206, 187);

   fill(hairColour);
    
    pop();

    HairLength = -5+map(L, 0, 139, 160, 30);
    push();  //left curl

    translate(-3 - ((3+curlScale) * cos(221+L)) -0 , -5 + ((3+curlScale) * sin(221+L)));
    rotate(HairLength);

    beginShape();

    cX = map(HairLength, 155, 25, 0.2, 0.4);
    cY =  map(HairLength, 155, 25, -0.0, -1.1 );
    radiuss = map(HairLength, 155, 25, 0.1, curlScale*1.4)/2;
    anglee = 170;



   endShape();
   fill(225, 206, 187);

   fill(hairColour);
    pop();

  } else { //longer hair


    fill(255, 218, 115);

    fill(hairColour);
    arc(3, -5, 6, 6, 170, 360, CHORD); //top hair ARAAC
    arc(-3-0, -5, 6, 6, 180, 370, CHORD);

    let HairLength = -5+map(L, 139, 360, 0, 14*1);
 
    //big curls 
    let x1 = (6+0 + 2+0)/2;
    let y1 = (-5-6.5)/2;
    let x2 = (6+map(L, 139,  360,0, 1)+0-map(HairLength, -5, 9, 0, curlScale) + (6+0)-map(HairLength, -5, 9, 0, curlScale))/2;
    let y2 = (-5+map(L, 139, 360, 0, 14*1)+-5+map(L, 139, 360, 0, 14*1))/2;
    for(let i = 0; i < 3; i++){
      ellipse(lerp(x1, x2,  0.2 + (0.3*i)), lerp(y1, y2, 0.2 + (0.3*i)), 
        map(curly, 0, 100, 0, map(L, 139, 360, 0.5, 9-i)), 
        map(L, 139, 360, 0, 8-i));
    }

    beginShape(); //long strands
      vertex(6+0, -5); //1
      vertex(6+map(L, 139,  360,0, 1)+0-map(HairLength, -5, 9, 0, curlScale), //2
        -5+map(L, 139, 360, 0, 14*1));    
      vertex((6+0)-map(HairLength, -5, 9, 0, curlScale), //3
        -5+map(L, 139, 360, 0, 14*1));
      vertex(2+0, -6.5); //4
      endShape();

    //big curls Mirror
    x1 = (-6-0 + -2-0)/2;
    y1 = (-5 + -6.5)/2;
    x2 = (-6-map(L, 139,  360,0, 1)-0+map(HairLength, -5, 9, 0, curlScale) + -6-0+map(HairLength, -5, 9, 0, curlScale))/2;
    y2 = (-5+map(L, 139, 360, 0, 14*1) + -5+map(L, 139, 360, 0, 14*1))/2;

    for(let i = 0; i < 3; i++){
      ellipse(lerp(x1, x2,  0.2 + (0.3*i)), lerp(y1, y2, 0.2 + (0.3*i)), 
        map(curly, 0, 100, 0, map(L, 139, 360, 0.5, 9-i)), 
        map(L, 139, 360, 0, 8-i));
    }

    beginShape(); //long strands mirror
    vertex(-6-0, -5);
    vertex(-6-map(L, 139,  360,0, 1)-0+map(HairLength, -5, 9, 0, curlScale), 
      -5+map(L, 139, 360, 0, 14*1));

    vertex(-6-0+map(HairLength, -5, 9, 0, curlScale), 
      -5+map(L, 139, 360, 0, 14*1));
    vertex(-2-0, -6.5);

    endShape();


    beginShape();
    for(let i = 0; i < 50; i++){ //outer curl
      vertex((5.95+0)-map(HairLength, -5, 9+0, 0, curlScale)+curlScale+
        curlScale*cos(map(curl, 180, -90, 180, 180-(4.5*i))), 
        HairLength-map(L, 139, 340, 0, 0.75)+
        curlScale*sin(map(curl, 180, -90, 180, 180-(4.5*i))));
    } 

    for(let i = 15; i > 0; i--){ //inner curl
      let shrink = 1;
      shrink = map(i, 15, 0, 1.2, 5);
        vertex(
        (6+map(L, 139,  360,0, 1)+0)-map(HairLength, -5, 9+0, 0, curlScale)+curlScale/shrink+
        curlScale/shrink*cos(map(curl, 180, -90, 180, 180-(17*i))), 
        HairLength-map(L, 139, 340, 0, 0.75)+
        curlScale/shrink*sin(map(curl, 180, -90, 180, 180-(15 *i)))
        );
    }    

    endShape();

    beginShape();
    for(let i = 0; i < 50; i++){ //outer curl mirror
      vertex((-5.95-0)+map(HairLength, -5, 9+0, 0, curlScale)-curlScale+
        curlScale*cos(map(curl, 180, -90, 0, (4.5*i))), 
        HairLength-map(L, 139, 340, 0, 0.75)+
        curlScale*sin(map(curl, 180, -90, 0, (4.5 *i))));
    }

    for(let i = 15; i > 0; i--){ //inner curl mirror
      let shrink = 1;
      shrink = map(i, 15, 0, 1.2, 5);
      vertex(
        (-6-map(L, 139,  360,0, 1)-0)+map(HairLength, -5, 9+0, 0, curlScale)-curlScale/shrink+
        curlScale/shrink*cos(map(curl, 180, -90, -10, (17*i))), 

        HairLength-map(L, 139, 340, 0, 0.75)+curlScale/shrink*sin(map(curl, 180, -90, -10, (15 *i)))
        );
    }    

    endShape();

  }


}

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
  //  this.eye_value = int(map(settings[0], 0, 100, 2, 3));
  //  this.mouth_value = map(settings[1], 0, 100, 0.5, 8);
  //  this.tilt_value = map(settings[2], 0, 100, -30, 30);

  this.length = map(settings[0], 0, 100, 0, 340);
  this.curly = settings[1];
  this.e = settings[2];
  this.eyeColour = map(settings[3], 0, 100, 0, 360);
  this.acc = int(map(settings[4], 0, 100, 0, 8))
  this.hair = settings[5];
  this.makeupStrength = settings[6];
  this.eyeBrowSize = map(settings[7], 0, 100, 0, 0.4);
  this.skin = settings[8];
  }



  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(8);
    settings[0] = map(this.length, 0, 340, 0, 100);    
    settings[1] = this.curly;
    settings[2] = this.e;
    settings[3] = map(this.eyeColour, 0, 360, 0, 100);    
    settings[4] = map(this.acc, 0, 8, 0, 100);   
    settings[5] = this.hair;
    settings[6] = this.makeupStrength;
    settings[7] = map(this.eyeBrowSize, 0, 0.4, 0, 100);
    settings[8] = this.skin;


    return settings;
  }
}

// given an array of [x,y] points, return the average
function average_point(list) {
  var sum_x = 0;
  var sum_y = 0;
  var num_points = 0;
  for(var i=0; i<list.length; i++) {
    sum_x += list[i][0];
    sum_y += list[i][1];
    num_points += 1; 
  }
  return [sum_x / num_points, sum_y / num_points];
}