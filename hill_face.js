/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 8;

// other variables can be in here too
// here's some examples for colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

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
function HillFace() {

  const eye_position = 0.85;
  const eye_size1 = 0.6;
  const eye_size2 = 0.8;
  const pupil_size1 = 0.25;
  const pupil_size2 = 0.25;
  const rect_height = 4;
  const rect_width = 3.5;
  const mouth_wide = 1.25;
 //BAG COLOURS//
  const bag_light = [209, 182, 150];
  const bag_mid = [187, 145, 100];
  const bag_dark = [144, 102, 73];
  const side_shadow_light = [163, 138, 107];
  const side_shadow_mid = [140, 109, 75];
  const side_shadow_dark = [108, 77, 55];
  const top_shadow_light = [182, 158, 129];
  const top_shadow_mid = [164, 127, 88];
  const top_shadow_dark = [126, 89, 64];

  this.eye_value = 2;     //1-2
  this.eye_brow = 2;      //1-2
  this.nose_value = 1;    //1-2
  this.bag_colour = 1;    //1-3

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  

  this.draw = function(positions) {
    rectMode(CENTER);
    scale(1.5);
    noStroke();
    
    ///HEAD//////

    //front
    let face_pos = segment_average(positions.chin);

    if (this.bag_colour == 1) {
      fill(bag_light);
    }
    else if (this.bag_colour == 2) {
     fill(bag_mid);
    }
    else if (this.bag_colour == 3) {
     fill(bag_dark);
    }
    rect(0, -0.25, rect_width, rect_height);

    //pointy detail
    triangle(-1.75, 1.74, -1.75, 2.25, -1.25, 1.74);
    push();
      triangle(-0.6, 1.74, -0.95, 2.25, -1.3, 1.74);
      translate(0.5, 0);
      triangle(-0.4, 1.74, -0.75, 2.25, -1.1, 1.74);
      translate(0.7, 0);
      triangle(-0.4, 1.74, -0.75, 2.25, -1.1, 1.74);
      translate(0.6, 0);
      triangle(-0.4, 1.74, -0.75, 2.25, -1.1, 1.74);
    pop();
    triangle(1.25, 1.74, 1.75, 2.25, 1.75, 1.74);

    //top
    if (this.bag_colour == 1) {
      fill(top_shadow_light);
    }
    else if (this.bag_colour == 2) {
     fill(top_shadow_mid);
    }
    else if (this.bag_colour == 3) {
     fill(top_shadow_dark);
    }
    quad(-2.5, -2.5, -1.75, -2.25, 1.75, -2.25, 1, -2.5);

    //side
    if (this.bag_colour == 1) {
      fill(side_shadow_light);
    }
    else if (this.bag_colour == 2) {
     fill(side_shadow_mid);
    }
    else if (this.bag_colour == 3) {
     fill(side_shadow_dark);
    }
    quad(-2.5, 1.25, -2.5, -2.5, -1.75, -2.25, -1.75, 1.75);
    triangle(-1.75, 1.7, -1.75, 2.25, -2.25, 1.4);
    triangle(-2.5, 1.9, -2.5, 1.25, -2, 1.4);

    noFill();
    stroke(0);
    strokeWeight(0.06);


    ///NOSE//////

    let nose_top = positions.nose_bridge[1];
    let nose_bottom = positions.nose_bridge[3];
    let nose_center = positions.nose_tip[2];

    if (this.nose_value == 1) {
      line(nose_top[0], nose_top[1], nose_bottom[0], nose_bottom[1]);
      line(nose_top[0] - 0.02, nose_top[1], nose_bottom[0], nose_bottom[1]);
      arc(nose_center[0], nose_center[1], 0.5, 0.5, 0, 180);
      arc(nose_center[0], nose_center[1], 0.5, 0.55, 0, 180);
    }
    else if (this.nose_value == 2) {
      arc(nose_center[0], nose_center[1], 0.5, 0.5, 0, 180);
      arc(nose_center[0], nose_center[1], 0.5, 0.55, 0, 180);
    }


    ///MOUTH/////

    let mouth_pos = segment_average(positions.bottom_lip);
    let lip_top = positions. top_lip[9];
    let lip_bottom = positions. bottom_lip[9];
    let d = dist(lip_top[0], lip_top[1], lip_bottom[0], lip_bottom[1]);
    let mouth = map(d, 0, 1, 0, 10);
    let mouth_open = map(mouth, 0, 10, 0, 1);

    if (d < 0.2) {
      d = 0;
    }
    ellipse(mouth_pos[0], mouth_pos[1] + 0.1, mouth_wide, mouth_open);
    ellipse(mouth_pos[0], mouth_pos[1] + 0.1, mouth_wide, mouth_open + 0.05);


    ///EYEBROWS/////

    let left_eyebrow_pos = segment_average(positions.left_eyebrow);
    let right_eyebrow_pos = segment_average(positions.right_eyebrow);

    if (this.eye_brow == 1) {
      rect(left_eyebrow_pos[0], left_eyebrow_pos[1], 0.7, 0.01);
      rect(right_eyebrow_pos[0], right_eyebrow_pos[1], 0.7, 0.01);
    }
    else if (this.eye_brow == 2) {
      fill(0);
      rect(left_eyebrow_pos[0], left_eyebrow_pos[1], 0.5, 0.06);
      rect(right_eyebrow_pos[0], right_eyebrow_pos[1], 0.5, 0.06);
    }


    ///EYES//////

    noFill();

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    if (this.eye_value == 1) {
      ellipse(left_eye_pos[0], left_eye_pos[1], eye_size1 - 0.1, eye_size1);
      ellipse(right_eye_pos[0], right_eye_pos[1], eye_size1 - 0.1, eye_size1);
      ellipse(left_eye_pos[0], left_eye_pos[1], eye_size1 - 0.1, eye_size1 + 0.05);
      ellipse(right_eye_pos[0], right_eye_pos[1], eye_size1 - 0.1, eye_size1 + 0.05);
      fill(0);
      ellipse(left_eye_pos[0], left_eye_pos[1], pupil_size1);
      ellipse(right_eye_pos[0], right_eye_pos[1], pupil_size1);
    }
    else if (this.eye_value == 2) {
      arc(left_eye_pos[0], left_eye_pos[1], eye_size2 - 0.2, eye_size2, 0, 180, CHORD);
      arc(right_eye_pos[0], right_eye_pos[1], eye_size2 - 0.2, eye_size2, 0, 180, CHORD);
      arc(left_eye_pos[0], left_eye_pos[1], eye_size2 - 0.2, eye_size2 + 0.05, 0, 180, CHORD);
      arc(right_eye_pos[0], right_eye_pos[1], eye_size2 - 0.2, eye_size2 + 0.05, 0, 180, CHORD);
      fill(0);
      ellipse(left_eye_pos[0], left_eye_pos[1] + 0.15, pupil_size2);
      ellipse(right_eye_pos[0], right_eye_pos[1] + 0.15, pupil_size2);
    }
  }



  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.eye_value = int(map(settings[0], 0, 100, 1, 2));
    this.eye_brow = int(map(settings[1], 0, 100, 1, 2));
    this.nose_value = int(map(settings[2], 0, 100, 1, 2));
    this.bag_colour = int(map(settings[3], 0, 100, 1, 3));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(4);
    settings[0] = map(this.eye_value, 1, 2, 0, 100);
    settings[1] = map(this.eye_brow, 1, 2 , 0, 100);
    settings[2] = map(this.nose_value, 1, 2, 0, 100);
    settings[3] = map(this.bag_colour, 1, 3, 0, 100);
    return settings;
  }
}
