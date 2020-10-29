/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 7;

// other variables can be in here too
// here's some examples for colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

const cooper_brown =[250, 155, 117];
const brown1 =[209, 131, 100];
const brown2 =[135, 85, 65];
const brown3 = [79, 50, 38];
const brown4 = [43, 29, 21];

const lip = [247, 134, 89];
const lip1 = [204, 108, 69];
const lip2 = [107, 67, 51];
const lip3 = [79, 40, 25];
const lip4 = [33, 19, 10];

this.show_points = function (segment){
      for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        var number = i.toString();
        textAlign(CENTER, CENTER);
        textSize(0.2);
        fill(0);
        text(number, px, py, 0.1);
      }
  }

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

// This where you define your own face object
function CooperFace() {
  // these are state variables for a face
  // (your variables should be different!)
   this.faceSize = 3;
   this.eye = 0.5;
   this.lip = 1 ;
   this.tooth = 2;
   this.mouth = 1;
   this.num_eyes = 2;
   this.eye_shift = -1;
   this.face_colour = 1;


  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };
  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge,
   */

  this.draw = function(positions) {

   let left_eye = segment_average(positions.left_eye);
   let right_eye = segment_average(positions.right_eye);
   let nose_tip = positions.nose_tip[2];
   let top_lip = positions.top_lip[3];
   let bottom_lip = positions.bottom_lip[0];
   let whiskers = positions.nose_bridge[2];
   let nostrils = positions.nose_bridge[2];
   let tooth =  positions.nose_bridge[3];
   
   noStroke();

    //head
      if(this.face_colour == 0){
      fill(cooper_brown);
    }else
      if(this.face_colour == 1){
      fill(brown1);
    }else
    if(this.face_colour == 2){
      fill(brown2);
    }else
    if(this.face_colour == 3){
      fill(brown3);
    }else
    if(this.face_colour == 4){
      fill(brown4);
    }

    ellipse(0, -0.3,this.faceSize,4);    
 
    // eyes
    fill(255);
    ellipse(left_eye[0], left_eye[1], 1,this.eye);
    ellipse(right_eye[0], right_eye[1],1, this.eye);

        let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {

      fill(0);
      ellipse(left_eye[0] + curEyeShift, left_eye[1], 0.5);
      ellipse(right_eye[0] + curEyeShift, right_eye[1], 0.5);
    }
    else {
      let eyePosX = (left_eye[0] + right_eye[0]) / 2;
      let eyePosY = (left_eye[1] + right_eye[1]) / 2;

      fill(0);
      ellipse(eyePosX, eyePosY, 0.45, 0.27);

      fill(0);
      ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    }
  
    //mouth
    fill(255, 201, 251);
    ellipse(top_lip[0],top_lip[1],bottom_lip[0],this.mouth);

   //teeth
   if(this.tooth == 2){
    noStroke();
    push();
    translate(tooth[0],tooth[1]);
    fill(255);
    triangle(0.25, 0.5, 0.5, 2, 0.75, 0.5);
    triangle(-0.75, 0.5, -0.5, 2, -0.25, 0.5);
     pop();
   }else
    if(this.tooth == 0){
         noStroke();
    push();
    translate(tooth[0],tooth[1]);
    fill(255);
    triangle(0.25, 0.5, 0.5, 0, 0.75, 0.5);
    triangle(-0.75, 0.5, -0.5, 0, -0.25, 0.5);
     pop();
    }


    //lip
    if(this.face_colour == 0){
      fill(lip);
    }else
      if(this.face_colour == 1){
      fill(lip1);
    }else
    if(this.face_colour == 2){
      fill(lip2);
    }else
    if(this.face_colour == 3){
      fill(lip3);
    }else
    if(this.face_colour == 4){
      fill(lip4);
    }

    ellipse(nose_tip[0],nose_tip[1], 4, 1);
 
    //nostrils
     fill(0);
    ellipse(nostrils[0],nostrils[1],this.lip, 0.5);
 
    //whiskers
    noFill();
    stroke(255, 194, 115);
    push();
    translate(whiskers[0],whiskers[1]);
    angleMode(DEGREES);
    strokeWeight(0.05);
    arc(0.4, 1, 1.6, 1.2, 290, 50);
    arc(0.6, 1, 1.6, 1.2, 290, 50);
    arc(0.8, 1, 1.6, 1.2, 290, 50);
    arc(0, 1, 1.6, 1.2, 320, 50);
    arc(0, 0.52, 0.8, 1.2, 360, 50);
    arc(0, 0.6, 0.4, 1.2, 340, 50);
    arc(-0.2, 0.6, 0.4, 1.2, 340, 50);
    arc(-0.4, 0.6, 0.4, 1.2, 340, 50);

    arc(-0.4, 1, 1.6, 1.2, 135, 250);
    arc(-0.6, 1, 1.6, 1.2, 135, 250);
    arc(-0.8, 1, 1.6, 1.2, 135, 250);
    arc(-0.32, 0.96,1, 1.08, 120, 250);
    arc(-0.2, 0.88, 0.4, 1.2, 180, 250);
    pop();


  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.faceSize = map(settings[0], 0, 100, 2.8, 4);
    this.eye = map(settings[1], 0, 100, 0.5, 0.8);
    this.lip = map(settings[2], 0, 100, 0.5, 2);
    this.tooth = int(map(settings[3], 0, 100, 0, 2));
    this.mouth = map(settings[4], 0, 100, 0.5, 1.5);
    this.eye_shift = map(settings[5], 0, 100, -2, 2);
    this.face_colour = int(map(settings[6], 0, 100, 0, 4));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.faceSize, 2.8, 4, 0, 100);
    settings[1] = map(this.eye, 0.5, 0.8, 0, 100);
    settings[2] = map(this.lip, 0.5, 2, 0, 100);
    settings[3] = int(map(this.tooth, 0, 2, 0, 100));
    settings[4] = map(this.mouth,0.5,1.5,0,100);
    settings[5] = map(this.eye_shift, -2, 2, 0, 100);
    settings[6] = int(map(this.face_colour, 0, 4, 0, 100));

    return settings;
  }
}