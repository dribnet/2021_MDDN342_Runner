/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 6;


// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// other variables can be in here too
// here's some examples for colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]


// This where you define your own face object
function LeeFace() {
  // these are state variables for a face
  // (your variables should be different!)


this.mouth_value= 4;
this.petal_colour = 1;
this.petal_layer = 1;
this.petal_length = 2;
this.eye_size_y = 1.5;
this.eye_colour = 1;
this.face_colour =1;


/* Slider 1 - Hair colour - blue for dark hair, cyan for lgiht hair or no hair, red for red hair
   Slider 2 - Petal Layers - 1 for feminine, 2 for masculine
   Slider 3 - Petal Shape - Pointy for short hair, rounded for long hair
   Slider 4 - Eye size
   Slider 5 -Eye colour - purple for blue eyes, green for green eyes, brown for brown eyes
   Slider 6 -Skin Colour - light for lighter skin, dark for darker skin.
*/

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true

  this.draw = function(positions) {

//VARIABLES

    const blue = color(83, 40, 237,180);
    const cyan_bonus = color(48, 252, 255, 220);
    const red = color(227, 29, 23,180);
    const red_stroke = color(235, 62, 56 );

    const blue_stroke = color(68, 21, 171);
    const cyan_b_stroke = color(48, 252, 255);
    const purple_eyes = color(92, 0, 163);
    const green_eyes = color(0, 122, 104);
    const brown_eyes = color(166, 91, 0);
    const darker = color(255, 131, 8);
    const lighter = color(255, 166, 0);

    let bottom_lip3 = positions.bottom_lip[2];
    let bottom_lip4 = positions.bottom_lip[3];
    let bottom_lip5 = positions.bottom_lip[4];

    let top_lip1 = positions.top_lip[1];
    let top_lip2 = positions.top_lip[2];
    let top_lip3 = positions.top_lip[3];
    let top_lip4 = positions.top_lip[4];
    let top_lip6 = positions.top_lip[5];

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos= segment_average(positions.right_eye);

    let nose_pos = positions.nose_bridge[0];
    let mouth_top = positions.top_lip[3];
    let mouth_bottom = positions.bottom_lip[3];

    let right_eyebrow = positions.right_eyebrow;
    let left_eyebrow = positions.left_eyebrow;

    let right_brow_0 = positions.right_eyebrow[0];
    let right_brow_1 = positions.right_eyebrow[1];
    let right_brow_2 = positions.right_eyebrow[2];
    let right_brow_3 = positions.right_eyebrow[3];
    let right_brow_4 = positions.right_eyebrow[4];

    let left_brow_0 = positions.left_eyebrow[0];
    let left_brow_1 = positions.left_eyebrow[1];
    let left_brow_2 = positions.left_eyebrow[2];
    let left_brow_3 = positions.left_eyebrow[3];
    let left_brow_4 = positions.left_eyebrow[4];


// rotation in degrees
 angleMode(DEGREES);
 //rotate(tilt_value);
 strokeWeight(0.05);



 //PETAL COLOURS--BLUE, CYAN OR RED------------------------------
 if(this.petal_colour == 1) {
   fill(blue);
   stroke(blue_stroke);
 }

 else if(this.petal_colour ==2) {
   fill(cyan_bonus);
   stroke(cyan_b_stroke);
  }
  else if(this.petal_colour ==3) {
    fill(red);
    stroke(red_stroke);
   }


//PETAL LAYERS  -- ONE OR TWO------------------------------
if(this.petal_layer == 1) {

  beginShape();
   curveVertex(0,0);
   curveVertex(0, 0);
   curveVertex(-2.8, 1.2);
   curveVertex(-this.petal_length,-0.8);
   curveVertex(-2.8, -2.8);
   curveVertex(0,-1.6);
   curveVertex(0,-1.6);
  endShape();


  beginShape();
   curveVertex(0,-1.6);
   curveVertex(0, -1.6);
   curveVertex(2.8, -2.8);
   curveVertex(this.petal_length,-0.8);
   curveVertex(2.8, 1.2);
   curveVertex(0,0);
   curveVertex(0,0);
  endShape();

  beginShape();
   curveVertex(-0.8,-0.8);
   curveVertex(-0.8,-0.8);
   curveVertex(-2, -3.6);
   curveVertex(0, -this.petal_length-0.8);
   curveVertex(2, -3.6);
   curveVertex(0.8, -0.8);
   curveVertex(0.8,-0.8);
  endShape();


  beginShape();
   curveVertex(-0.8,-0.8);
   curveVertex(-0.8,-0.8);
   curveVertex(-2, 2);
   curveVertex(0, this.petal_length-0.8);
   curveVertex(2, 2);
   curveVertex(0.8, -0.8);
   curveVertex(0.8,-0.8);
  endShape();


}
else if(this.petal_layer ==2){

  beginShape();
   curveVertex(0,0);
   curveVertex(0, 0);
   curveVertex(-2.8, 1.2);
   curveVertex(-this.petal_length,-0.8);
   curveVertex(-2.8, -2.8);
   curveVertex(0,-1.6);
   curveVertex(0,-1.6);
  endShape();


  beginShape();
   curveVertex(0,-1.6);
   curveVertex(0, -1.6);
   curveVertex(2.8, -2.8);
   curveVertex(this.petal_length,-0.8);
   curveVertex(2.8, 1.2);
   curveVertex(0,0);
   curveVertex(0,0);
  endShape();

  beginShape();
   curveVertex(-0.8,-0.8);
   curveVertex(-0.8,-0.8);
   curveVertex(-2, -3.6);
   curveVertex(0, -this.petal_length-0.8);
   curveVertex(2, -3.6);
   curveVertex(0.8, -0.8);
   curveVertex(0.8,-0.8);
  endShape();


  beginShape();
   curveVertex(-0.8,-0.8);
   curveVertex(-0.8,-0.8);
   curveVertex(-2, 2);
   curveVertex(0, this.petal_length-0.8);
   curveVertex(2, 2);
   curveVertex(0.8, -0.8);
   curveVertex(0.8,-0.8);
  endShape();

 fill(174, 82, 255, 170);

//SECOND LAYER OF PETALS
beginShape();
 curveVertex(-0.8, 0);
 curveVertex(-0.8, 0);
 curveVertex(-2, 0.4);
 curveVertex(-this.petal_length/1.2, -0.8);
 curveVertex(-2, -2);
 curveVertex(-0.8, -1.6);
 curveVertex(-0.8, -1.6);
endShape();

beginShape();
 curveVertex(0.8, 0);
 curveVertex(0.8, 0);
 curveVertex(2, 0.4);
 curveVertex(this.petal_length/1.2, -0.8);
 curveVertex(2, -2);
 curveVertex(0.8, -1.6);
 curveVertex(0.8, -1.6);
endShape();


beginShape();
 curveVertex(0.8, 0);
 curveVertex(0.8, 0);
 curveVertex(1.2, 1.2);
 curveVertex(0, this.petal_length/1.2 -0.8);
 curveVertex(-1.2, 1.2);
 curveVertex(-0.8, 0);
 curveVertex(-0.8, 0);
endShape();


beginShape();
 curveVertex(0.8, -1.6);
 curveVertex(0.8, -1.6);
 curveVertex(1.2, -2.8);
 curveVertex(0, -this.petal_length/1.2 -0.8);
 curveVertex(-1.2, -2.8);
 curveVertex(-0.8, -1.6);
 curveVertex(-0.8, -1.6);
endShape();
}


//FACE COLOUR--LIGHTER OR DARKER----------------------------------------------------------------------

if(this.face_colour ==1){
  fill(lighter);
  stroke(255, 83, 3);

}
else if(this.face_colour ==2){
  fill(darker);
  stroke(255, 83, 3);
}

//HEAD
 ellipse(0, -0.8, 2.4);

//EYES

//WHITE
fill(255);
strokeWeight(0.05);
stroke(255, 224, 153);
noStroke();

ellipse(left_eye_pos[0], left_eye_pos[1]+0.05,0.6, this.eye_size_y);
ellipse(right_eye_pos[0], right_eye_pos[1]+0.05, 0.6, this.eye_size_y);

//EYE COLOUR
if (this.eye_colour == 1){
  fill(purple_eyes);

}
else if(this.eye_colour ==2){
  fill(green_eyes);
}
else if( this.eye_colour ==3){
  fill(brown_eyes);
}

//IRIS
noStroke();
 ellipse(left_eye_pos[0],left_eye_pos[1]+0.05,0.4,this.eye_size_y/2);
 ellipse(right_eye_pos[0], right_eye_pos[1]+0.05,0.4,this.eye_size_y/2);

//HIGHLIGHTS------------------
noStroke();
fill(255);

//left hl
ellipse(left_eye_pos[0]+0.1,left_eye_pos[1],this.eye_size_y/6);

//right hl
ellipse(right_eye_pos[0]+0.1,right_eye_pos[1],this.eye_size_y/6);

//MOUTH
noStroke();
 if(this.face_colour ==1){
 fill(224, 108, 0);
}
else if(this.face_colour ==2){
  fill(184, 61, 0);
}


push();
scale(0.8);
translate(0, -0.8);
beginShape();
   curveVertex(top_lip1[0], top_lip1[1]);
   curveVertex(top_lip1[0], top_lip1[1]);
   curveVertex(bottom_lip3[0] - 0.4, bottom_lip3[1] );
   curveVertex(bottom_lip4[0], bottom_lip4[1] +0.02);
   curveVertex(bottom_lip5[0] + 0.4, bottom_lip5[1]);
   curveVertex(top_lip6[0], top_lip6[1]);
   curveVertex(top_lip4[0], top_lip4[1]-0.1);
   curveVertex(top_lip3[0]+0.1, top_lip3[1]-0.15);
   curveVertex(top_lip3[0]-0.1, top_lip3[1]-0.15);
   curveVertex(top_lip2[0], top_lip2[1]-0.1);
   curveVertex(top_lip2[0], top_lip2[1]-0.1);
   endShape();
 endShape();
 pop();

 //EYEBROWS --------------------------


stroke(15, 33, 92);
strokeWeight(0.3);
noFill();

beginShape();
curveVertex(left_brow_0[0], left_brow_0[1]),
curveVertex(left_brow_1[0], left_brow_1[1]),
curveVertex(left_brow_2[0], left_brow_2[1]),
curveVertex(left_brow_3[0], left_brow_3[1]),
curveVertex(left_brow_4[0], left_brow_4[1]),
endShape();

beginShape();
curveVertex(right_brow_0[0], right_brow_0[1]),
curveVertex(right_brow_1[0], right_brow_1[1]),
curveVertex(right_brow_2[0], right_brow_2[1]),
curveVertex(right_brow_3[0], right_brow_3[1]),
curveVertex(right_brow_4[0], right_brow_4[1]),
endShape();


//NOSE -----------------------------
//NOSE COLOUR -- BASED ON SKIN COLOUR
if(this.face_colour ==1){
  fill(224, 108, 0);

}
else if (this.face_colour ==2){
  fill(194, 78, 0);
}

//DRAW NOSE
 noStroke();
 ellipse(nose_pos[0], nose_pos[1]+0.4, 0.2, 0.1);


  }


  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
   this.petal_colour = int(map(settings[0], 0, 100, 1, 3));
  this.petal_layer = int(map(settings[1], 0, 100, 1, 2));
  this.petal_length = map(settings[2], 0, 100, 2, 3);
  this.eye_size_y = map(settings[3], 0, 100, 0.4, 1);
  this.eye_colour = int(map(settings[4], 0, 100, 1, 3));
  this.face_colour = int(map(settings[5], 0, 100, 1, 2));


  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
   settings[0] = map(this.petal_colour, 1,3, 0, 100);
   settings[1] = map(this.petal_layer, 1, 2, 0, 100);
   settings[2] = map(this.petal_length, 2, 3, 0, 100);
   settings[3] = map(this.eye_size_y, 0.4, 1, 0, 100);
   settings[4] = map(this.eye_colour, 1, 3, 0, 100);
   settings[5] = map(this.face_colour, 1, 2, 0, 100);


    return settings;

  }
}
