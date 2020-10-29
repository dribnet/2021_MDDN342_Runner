/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

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

// This where you define your own face object
function NuescaFace() {
  const female_col = color(189,125,106);
  const male_col = color(80, 119, 122);
  const light_col = color(247, 240, 244);
  const med_col = color(221,148,192);
  const dark_col = color(13, 32, 33);
  const eye_light = color(153, 201, 196);
  const eye_med = color(237, 185, 126);
  const eye_dark = color(54, 29, 1);


  // these are state variables for a face
  this.nose_value = 1;  // range is 0.8 to 1.5
  this.lash_brow_value = 1; //range is 0 to 1
  this.eye_size = 1; //range is 0.8 to 1
  this.ear_color = 1; // range is 0 to 1
  this.skin_color =1; //range is 0 to 2
  this.eye_color =1; //range is 0 to 2

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

    //ears
    if (this.ear_color == 0){
      fill(female_col);
    }
    else{
      fill(male_col);
    }
    strokeWeight(0.05);
    triangle(-1.6, -1.6, -2.3, -3.2, -0.28, -2.2);
    triangle(1.6, -1.6, 2.3, -3.2, 0.28, -2.2);
    //inner ear
    if (this.skin_color == 0){
      fill(light_col);
    }
    else if (this.skin_color == 1){
      fill(med_col);
    }
    else{
      fill(dark_col);
    }
    triangle(-1.4, -1.7, -1.9, -2.8, -0.6, -2.1);
    triangle(1.4, -1.7, 1.9, -2.8, 0.6, -2.1);

    stroke(0);
    strokeWeight(0.05);

    if(this.lash_brow_value == 0){
      //brows
      let left_brow_pos = positions.left_eyebrow[0];
      let left_brow_pos2 = positions.left_eyebrow[4];
      let right_brow_pos = positions.right_eyebrow[0];
      let right_brow_pos2 = positions.right_eyebrow[4];
      stroke(0);
      strokeWeight(0.2);
      line(left_brow_pos[0], left_brow_pos[1] + 0.1, left_brow_pos2[0], left_brow_pos2[1] + 0.1);
      line(right_brow_pos[0], right_brow_pos[1] + 0.1, right_brow_pos2[0], right_brow_pos2[1] + 0.1);
    }
    //eyes
    let left_eye_pos = segment_average(positions.left_eye);
    let left_eye_pos2 = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    let right_eye_pos2 = segment_average(positions.right_eye);

    //eyelashes 
    stroke(0);
    if(this.lash_brow_value == 0){
      strokeWeight(0);
    }
    else if(this.lash_brow_value == 1){
      strokeWeight(0.1);
    }
    //left
    line(left_eye_pos[0]- 0.3, left_eye_pos[1] + 0.3, left_eye_pos2[0] -0.5, left_eye_pos2[1]- 0.3);
    line(left_eye_pos[0], left_eye_pos[1] + 0.2, left_eye_pos2[0], left_eye_pos2[1]- 0.4);
    line(left_eye_pos[0]+ 0.3, left_eye_pos[1] + 0.3, left_eye_pos2[0] +0.5, left_eye_pos2[1]- 0.3);
    //right
    line(right_eye_pos[0]- 0.3, right_eye_pos[1] + 0.3, right_eye_pos2[0] -0.5, right_eye_pos2[1]- 0.3);
    line(right_eye_pos[0], right_eye_pos[1] + 0.2, right_eye_pos2[0], right_eye_pos2[1]- 0.4);
    line(right_eye_pos[0]+ 0.3, right_eye_pos[1] + 0.3, right_eye_pos2[0] +0.5, right_eye_pos2[1]- 0.3);

    //eye_shape
    fill(255);
    strokeWeight(0.05);
    ellipse(left_eye_pos[0], left_eye_pos[1]+0.3, 1, this.eye_size);
    ellipse(right_eye_pos[0], right_eye_pos[1]+0.3, 1, this.eye_size);
    //eyeColour
    noStroke();
    if (this.eye_color == 0){
      fill(eye_light);
    }
    else if (this.eye_color == 1){
      fill(eye_med);
    }
    else{
      fill(eye_dark);
    }
    ellipse(left_eye_pos[0], left_eye_pos[1]+0.3, 0.5, this.eye_size);
    ellipse(right_eye_pos[0], right_eye_pos[1]+0.3, 0.5, this.eye_size);
    //pupil
    fill(0);
    ellipse(left_eye_pos[0], left_eye_pos[1]+0.3, 0.2, this.eye_size - 0.2);
    ellipse(right_eye_pos[0], right_eye_pos[1]+0.3, 0.2, this.eye_size - 0.2);

    
    // nose setup
    let nose_center = positions.nose_tip[2];

    //mouth setup
    let inner_left_lip = positions.top_lip[2];
    let outer_left_lip = positions.top_lip[0];
    let inner_right_lip = positions.top_lip[4];
    let outer_right_lip = positions.top_lip[7];
    let right_bottom_lip = positions.bottom_lip[2];
    let center_bottom_lip = positions.bottom_lip[4];
    let left_bottom_lip = positions.bottom_lip[7];
    //mouth draw
    fill(0);
    stroke(0);
    beginShape();
    vertex(outer_left_lip[0], outer_left_lip[1]);
    vertex(inner_left_lip[0] - 0.1, inner_left_lip[1] + 0.2);
    vertex(nose_center[0], nose_center[1] + 0.4);
    vertex(nose_center[0], nose_center[1] + 0.1);
    vertex(nose_center[0], nose_center[1] + 0.4);
    vertex(inner_right_lip[0] + 0.1, inner_right_lip[1] +0.2);
    vertex(outer_right_lip[0] - 0.1, outer_right_lip[1]);
    vertex(right_bottom_lip[0], right_bottom_lip[1]);
    vertex(center_bottom_lip[0], center_bottom_lip[1]);
    vertex(left_bottom_lip[0], left_bottom_lip[1]);
    endShape(CLOSE);
    //teeth
    fill(255);
    noStroke();
    ellipse(inner_left_lip[0], inner_left_lip[1] + 0.32, 0.1, 0.34);
    ellipse(inner_right_lip[0], inner_right_lip[1] + 0.32, 0.1, 0.34);
    
    //nose draw
    stroke(0);
    strokeWeight(0.05);
    if (this.skin_color == 0){
      fill(light_col);
    }
    else if (this.skin_color == 1){
      fill(med_col);
    }
    else{
      fill(dark_col);
    }
    ellipse(nose_center[0], nose_center[1], 0.5 * this.nose_value, 0.25 * this.nose_value);

    //whiskers
    noFill();
    strokeWeight(0.04);
    line(left_eye_pos[0] - 1.8, left_eye_pos[1] + 1, left_eye_pos2[0], nose_center[1] + 0.04);
    line(left_eye_pos[0] - 1.8, left_eye_pos[1] + 1.4, left_eye_pos2[0], nose_center[1] + 0.04);
    line(right_eye_pos[0] + 1.8, left_eye_pos[1] + 1, right_eye_pos2[0], nose_center[1] + 0.04);
    line(right_eye_pos[0] + 1.8, left_eye_pos[1] + 1.4, right_eye_pos2[0], nose_center[1] + 0.04);

  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.nose_value = map(settings[0], 0, 100, 1, 1.5);
    this.lash_brow_value=int(map(settings[1], 0, 100, 0, 1));
    this.eye_size = map(settings[2], 0, 100, 0.6, 1);
    this.ear_color=int(map(settings[3], 0, 100, 0, 1));
    this.skin_color=int(map(settings[4], 0, 100, 0, 2));
    this.eye_color=int(map(settings[5], 0, 100, 0, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    settings[0] = map(this.nose_value, 1, 1.5, 0, 100);
    settings[1] = int(map(this.lash_brow_value, 0, 1, 0, 100));
    settings[2] = map(this.eye_size, 0.6, 1, 0, 100);
    settings[3] = int(map(this.ear_color, 0, 1, 0, 100));
    settings[4] = int(map(this.skin_color, 0, 2, 0, 100));
    settings[5] = int(map(this.eye_color, 0, 2, 0, 100));
    return settings;
  }
}
