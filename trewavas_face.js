/*
 * FaceMap class - holds all information about one mapped
 * face and is able to draw itself.
 */

// other variables can be in here too
// these control the colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

function TrewavasFace() {

  // these are state variables for a face
  // (your variables may be different)
  this.eye_value = 2;    // can be either 2 (eyes) or 3 (no eyes)
  this.mouth_value = 1;  // range is 0.5 to 8
  this.tilt_value = 0;   // range is -30 to 30

  this.chin_val = 5; //1, 5
  this.head_width = 5; //5, 10
  this.eye_pos = 3; // 3, 6
  this.mouthEmo = 1; // 0.5, 1.5
  this.noseX = 1; // 0.5, 2
  this.eyebrow_y = -3; // -4, -2.5
  this.eyebrow_emo = 1; // 0.8, 1.2
  this.skin_val = 0; // 0, 5
  this.age = 0;   // 0, 6
  this.face_size = 1;   // 0.5, 1
  this.eyebrow_thick = 0.5;
  this.eyebrowTween = 0.5;

  this.skinColor = [];

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge,
   */
  this.draw = function(positions) {

  push();
  scale(0.45);
    angleMode(DEGREES);
    rectMode(CENTER);
    ellipseMode(CENTER);
    strokeCap(ROUND);
    colorMode(RGB);
    noStroke();
    noFill();

  //Skin Colours
  this.light_light_tone = color(244, 212, 187);
  this.light_tone =  color(248, 196, 161);
  this.light_mid_tone = color(229, 202, 155);
  this.mid_tone = color(219, 169, 116);
  this.mid_dark_tone = color(145, 96, 56);
  this.dark_tone = color(110,64,28);
  this.dark_dark_tone = color(87, 69, 57);

  this.skinColor = [this.light_light_tone, this.light_tone, this.light_mid_tone, this.mid_tone, this.mid_dark_tone, this.dark_tone, this.dark_dark_tone];
  fill(this.skinColor[this.skin_val])

  push();
  strokeWeight(0.2);
  stroke(50);

  //Ears
  ellipse(-this.eye_pos - 2, -1, 2, 2)
  ellipse(this.eye_pos + 2, -1, 2, 2)

  //Inner Ear
  push();
  strokeWeight(0.1)
  ellipse(-this.eye_pos - 1.8, -1 , 1, 1 )
  ellipse(this.eye_pos + 1.8, -1 , 1, 1 )
  pop();

  //Head
  rect(0,0, 5 + this.head_width,12,5,5,this.chin_val,this.chin_val);
  pop();

  //eyes
  fill(50);
  strokeWeight(2);
  translate(0,-1);
  ellipse(this.eye_pos,-1,0.7,0.9);
  ellipse(-this.eye_pos,-1,0.7,0.9);

  noFill();
  stroke(50);

  strokeWeight(0.08);
  if (this.age >= 1) {
  push();
  beginShape();
  curveVertex(-this.eye_pos + 0.5, -3);
  curveVertex(-this.eye_pos + 0.5, -0.5);
  curveVertex(-this.eye_pos - 0.5, -0.3);
  curveVertex(-this.eye_pos - 0.5, -3);
  endShape();
  pop();

  //Right
  push();
  beginShape();
  curveVertex(this.eye_pos - 0.5, -2);
  curveVertex(this.eye_pos - 0.5, -0.5);
  curveVertex(this.eye_pos + 0.5, -0.3);
  curveVertex(this.eye_pos + 0.5, -2);
  endShape();
  pop();

  push();
  translate(0.2, 0.4)
  beginShape();
  curveVertex(-this.eye_pos + 0.5, -2);
  curveVertex(-this.eye_pos + 0.5, -0.5);
  curveVertex(-this.eye_pos - 0.8, -0.4);
  curveVertex(-this.eye_pos - 0.8, -4);
  endShape();

  push();
  translate(-0.2, 0)
  beginShape();
  curveVertex(this.eye_pos - 0.5, -2);
  curveVertex(this.eye_pos - 0.5, -0.5);
  curveVertex(this.eye_pos + 0.8, -0.4);
  curveVertex(this.eye_pos + 0.8, -4);
  endShape();
  pop();
  pop();

  } else {

  //Eye Details
  //Left
  push();
  beginShape();
  curveVertex(-this.eye_pos + 0.5, -3);
  curveVertex(-this.eye_pos + 0.5, -0.5);
  curveVertex(-this.eye_pos - 0.5, -0.3);
  curveVertex(-this.eye_pos - 0.5, -3);
  endShape();
  pop();

  //Right
  push();
  beginShape();
  curveVertex(this.eye_pos - 0.5, -3);
  curveVertex(this.eye_pos - 0.5, -0.5);
  curveVertex(this.eye_pos + 0.5, -0.3);
  curveVertex(this.eye_pos + 0.5, -3);
  endShape();
  pop();
  }

  //If Female Add Eyelashes
  if(this.gender >= 1){
  push();
  strokeWeight(0.1);
  translate(0, -0.7)
  push();
  line(this.eye_pos, -1, this.eye_pos, -0.1)
  pop();
  
  push();
  line(this.eye_pos + 0.4, -1, this.eye_pos, -0.1)
  pop();

  push();
  line(this.eye_pos - 0.4, -1, this.eye_pos, -0.1)
  pop();

  push();
  line(-this.eye_pos, -1, -this.eye_pos, -0.1)
  pop();
  
  push();
  line(-this.eye_pos + 0.4, -1, -this.eye_pos, -0.1)
  pop();

  push();
  line(-this.eye_pos - 0.4, -1, -this.eye_pos, -0.1)
  pop();
  pop();
  }

  //Eyebrows
  push();
  if(this.age >= 3) {
    //If Elderly add grey eyebrows
    translate(this.eye_pos,this.eyebrow_y);
    stroke(200);
  } else {
  translate(this.eye_pos,this.eyebrow_y);
  stroke(50);
  }
  strokeWeight(this.eyebrow_thick);
  beginShape();
  curveVertex(-this.eye_pos /4, 1);
  curveVertex(-this.eye_pos/4, 1);
  curveVertex(-this.eye_pos/4 + this.eyebrowTween, this.eyebrow_emo);
  curveVertex(this.eye_pos/4 - this.eyebrowTween, this.eyebrow_emo);
  curveVertex(this.eye_pos/4, 1);
  curveVertex(this.eye_pos/4, 1);
  endShape();
  pop();

    push();
  if(this.age >= 3) {
    translate(-this.eye_pos,this.eyebrow_y);
    stroke(200);
  } else {
  translate(-this.eye_pos,this.eyebrow_y);
  stroke(50);
  }
  //stroke(233,130,114);
  noFill();
  strokeWeight(this.eyebrow_thick);
  beginShape();
  curveVertex(-this.eye_pos/4, 1);
  curveVertex(-this.eye_pos/4, 1);
  curveVertex(-this.eye_pos/4 + this.eyebrowTween, this.eyebrow_emo);
  curveVertex(this.eye_pos/4 - this.eyebrowTween, this.eyebrow_emo);
  curveVertex(this.eye_pos/4, 1);
  curveVertex(this.eye_pos/4, 1);
  endShape();
  pop();

//Mouth Region

//Correcting mouth location to target
 translate(0,1);

//If female, add lipstick(1 colour)
if(this.gender >= 1) {
  //Feminine Lips/Lipstick
  push();
  translate(0.5,1);
  stroke(255,20,20);
  noFill();
  strokeWeight(0.9);
  beginShape();
  curveVertex(-this.eye_pos + 1.1 , 1);
  curveVertex(-this.eye_pos + 1.1, 1);
  curveVertex(-this.eye_pos + 2.1, this.mouthEmo);
  curveVertex(this.eye_pos - 3.1 ,this.mouthEmo);
  curveVertex(this.eye_pos - 2.1, 1);
  curveVertex(this.eye_pos - 2.1, 1);
  endShape();
  pop();
}

//Default Mouth
  push();
  translate(0.5,1);
  strokeWeight(0.5);
  beginShape();
  curveVertex(-this.eye_pos + 0.1 , 1);
  curveVertex(-this.eye_pos + 0.1, 1);
  curveVertex(-this.eye_pos + 1.1, this.mouthEmo);
  curveVertex(this.eye_pos - 2.1 ,this.mouthEmo);
  curveVertex(this.eye_pos - 1.1, 1);
  curveVertex(this.eye_pos - 1.1, 1);
  endShape();
  pop();

  //Mouth detail
  push();
  scale(0.3);
  translate(0.5, 7 + this.mouthEmo * 2);
  stroke(50);
  strokeWeight(0.3);
  beginShape();
  curveVertex(-this.eye_pos + 1.1 , 1);
  curveVertex(-this.eye_pos + 1.1, 1);
  curveVertex(-this.eye_pos + 0.1, 1);
  curveVertex(this.eye_pos - 1.1 ,1);
  curveVertex(this.eye_pos - 2.1, 1);
  curveVertex(this.eye_pos - 2.1, 1);
  endShape();
  pop();


  //Head wrinkles
  if(this.age >= 2){
  push();
  scale(0.9);
  strokeWeight(0.1);
  stroke(50);
    line(-this.eye_pos + 1.5, -3.5, this.eye_pos - 1.5, -3.5);
    line(-this.eye_pos + 1.7, -3.2, this.eye_pos -1.7, -3.2);
  pop();
  }
  pop();

  //Create nose based on target image landmarks of nose
  push();
    noFill();
  scale(0.9)
  strokeWeight(0.08);
  beginShape();
  curveVertex(positions.nose_tip[0][0], -1)
  curveVertex(positions.nose_tip[0][0] + -this.noseX, -1)
  curveVertex(positions.nose_tip[0][0], positions.nose_tip[0][1])
  curveVertex(positions.nose_tip[1][0], positions.nose_tip[1][1])
  curveVertex(positions.nose_tip[2][0], positions.nose_tip[2][1])
  curveVertex(positions.nose_tip[3][0], positions.nose_tip[3][1])
  curveVertex(positions.nose_tip[4][0], positions.nose_tip[4][1])
  curveVertex(positions.nose_tip[4][0] + this.noseX, -1)
  curveVertex(positions.nose_tip[4][0], -1)
  endShape();
  pop();
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.chin_val = map(settings[0], 0, 100, 1, 5);
    this.head_width = map(settings[1], 0, 100, 3, 6);
    this.eye_pos = map(settings[1], 0, 100, 2, 4);
    this.eyebrowTween = map(settings[1], 0, 100, 0.2, 0.5);
    this.mouthEmo = map(settings[2], 0, 100, 0.8, 1.2);
    this.noseX = map(settings[3], 0, 100, -0.3, -0.1)
    this.eyebrow_y = map(settings[4], 0, 100, -4, -2.5);
    this.eyebrow_thick = map(settings[5], 0, 100, 0.1, 0.8);
    this.eyebrow_emo = map(settings[6], 0, 100, 0.8, 1.2);
    this.skin_val = floor(map(settings[7], 0, 100, 0, 5));
    this.age = floor(map(settings[8], 0, 100, 0, 6));
    this.gender = floor(map(settings[9], 0, 100, 0, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.chin_val, 1, 5, 0, 100);
    settings[1] = map(this.head_width, 3, 6, 0, 100);
    settings[1] = map(this.eye_pos, 2, 4, 0, 100);
    settings[1] = map(this.eyebrowTween, 0.2, 0.5, 0, 100);
    settings[2] = map(this.mouthEmo, 0.8, 1.2, 0, 100);
    settings[3] = map(this.noseX, -0.3, -0.1, 0, 100);
    settings[4] = map(this.eyebrow_y, -4, -2.5, 0, 100);
    settings[5] = map(this.eyebrow_thick, 0.1, 0.8, 0, 100);
    settings[6] = map(this.eyebrow_emo, 0.8, 1.2, 0, 100);
    settings[7] = floor(map(this.skin_val, 0, 5, 0, 100));
    settings[8] = floor(map(this.age, 0, 6, 0, 100));
    settings[9] = floor(map(this.gender, 0, 2, 0, 100));
    return settings;
  }
}
