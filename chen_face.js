/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

// other variables can be in here too

//helmet colors 
const chen_red = [197, 17, 18];
const lime = [100, 255, 51];
const cyan = [0, 255, 232];
const yellow = [255, 243, 0];
const brown = [95, 60, 12]; 
const chen_black = [50];
const white = [210];
//eye colors 
const eye_blue = [0, 182, 255, 75];
const eye_black = [4, 27, 30, 30];
const eye_green = [20, 135, 49, 75];
const eye_brown = [74, 35, 6, 50];
//mask colors
const mask = [157, 200, 217];
const mask_shade = [76, 95, 109];

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
function ChenFace() {
  // these are state variables for a face
  // (your variables should be different!)

  this.helmet_color = 2;    // variations of hair colors
  this.eye_color = 4;  // variations of eye colors
  this.gender = 1;  
  this.ref_shift = 1.5; //location of reflection
  this.ref_shift_2 = 1;

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

    //helmet
    stroke(0, 150);
    strokeWeight(0.2);
    if (this.helmet_color >= 0 && this.helmet_color <= 1){
        fill(chen_black);

    } else if (this.helmet_color > 1 && this.helmet_color <= 2){
        fill(brown);

    } else if (this.helmet_color > 2 && this.helmet_color <= 3){
        fill(chen_red);

    } else if (this.helmet_color > 3 && this.helmet_color <= 4){
        fill(yellow);

    } else if (this.helmet_color > 4 && this.helmet_color <= 5){
        fill(white);

    }
    beginShape();
    curveVertex(positions.chin[0][0]-0.2, positions.chin[0][1]-0.5);
    curveVertex(positions.chin[0][0]-0.2, positions.chin[0][1]-0.5);
    curveVertex(positions.chin[0][0]-0.2, positions.chin[0][1]+2.5);
    curveVertex(positions.chin[16][0]+0.2, positions.chin[16][1]+2.5);
    curveVertex(positions.chin[16][0]+0.2, positions.chin[16][1]-0.5);
    curveVertex(positions.chin[16][0]+0.2, positions.chin[16][1]-0.5);
    endShape();
    beginShape();
    vertex(positions.chin[0][0]-0.2, positions.chin[0][1]-0.45);
    quadraticVertex(0, positions.nose_bridge[0][1]-4, positions.chin[16][0]+0.2, positions.chin[16][1]-0.45)
    endShape();

    //mask
    noStroke();
    fill(mask);
    beginShape();
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    curveVertex(positions.chin[2][0], positions.chin[2][1]);
    curveVertex(positions.chin[3][0]-0.1, positions.chin[3][1]);
    curveVertex(positions.nose_tip[2][0], positions.nose_tip[2][1]+0.6);
    curveVertex(positions.chin[13][0]-0.1, positions.chin[13][1]);
    curveVertex(positions.chin[14][0], positions.chin[14][1]);
    curveVertex(positions.chin[16][0], positions.chin[16][1]);
    curveVertex(positions.right_eyebrow[4][0]-0.2, positions.right_eyebrow[4][1]);
    curveVertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-1);
    curveVertex(positions.left_eyebrow[0][0]+0.2, positions.left_eyebrow[0][1]);
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    curveVertex(positions.chin[2][0], positions.chin[2][1]);
    curveVertex(positions.chin[3][0], positions.chin[3][1]);
    endShape();

    //eyes
    noStroke();
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    if (this.eye_color > 0 && this.eye_color <= 1){
        fill(eye_black);

    } else if (this.eye_color >1 && this.eye_color <= 2){
        fill(eye_brown);

    } else if (this.eye_color >2 && this.eye_color <= 3){
        fill(eye_green);

    } else if (this.eye_color >3 && this.eye_color <= 4) {
        fill(eye_blue);
    }
    if (this.gender >= 0 && this.gender <= 0.5){      //softer edges for female
        ellipse(left_eye_pos[0], left_eye_pos[1]+0.25, 0.38, 0.28);
        ellipse(right_eye_pos[0], right_eye_pos[1]+0.25, 0.38, 0.28);
        fill(255, 50);       // eye reflection
        ellipse(left_eye_pos[0]+0.1, left_eye_pos[1]+0.2, 0.1);
        ellipse(right_eye_pos[0]+0.1, right_eye_pos[1]+0.2, 0.1);

    } else{     //harder edges for male
    beginShape();       //left eye
    vertex(positions.left_eye[0][0], positions.left_eye[0][1]+0.25);
    vertex(positions.left_eye[1][0],positions.left_eye[1][1]+0.25);
    vertex(positions.left_eye[2][0], positions.left_eye[2][1]+0.25);
    vertex(positions.left_eye[3][0], positions.left_eye[3][1]+0.25);
    vertex(positions.left_eye[4][0], positions.left_eye[4][1]+0.25);
    vertex(positions.left_eye[5][0], positions.left_eye[5][1]+0.25);
    endShape();
    beginShape();       //right eye
    vertex(positions.right_eye[0][0], positions.right_eye[0][1]+0.25);
    vertex(positions.right_eye[1][0],positions.right_eye[1][1]+0.25);
    vertex(positions.right_eye[2][0], positions.right_eye[2][1]+0.25);
    vertex(positions.right_eye[3][0], positions.right_eye[3][1]+0.25);
    vertex(positions.right_eye[4][0], positions.right_eye[4][1]+0.25);
    vertex(positions.right_eye[5][0], positions.right_eye[5][1]+0.25);
    endShape();
    // eye reflection
    fill(255, 25);
    ellipse(left_eye_pos[0]-0.08, left_eye_pos[1]+0.21, 0.15, 0.11);
    ellipse(right_eye_pos[0]-0.08, right_eye_pos[1]+0.21, 0.15, 0.11);   

    }
    
    //blush
    if (this.gender >= 0 && this.gender <= 0.5){
        fill(255, 222, 254);
        ellipse(positions.left_eye[0][0], positions.left_eye[0][1]+0.6, 0.5, 0.1);
        ellipse(positions.right_eye[3][0], positions.right_eye[3][1]+0.6, 0.5, 0.1);

    } else {
        fill(255, 222, 254, 150);
        ellipse(positions.left_eye[0][0], positions.left_eye[0][1]+0.6, 0.4, 0.08);
        ellipse(positions.right_eye[3][0], positions.right_eye[3][1]+0.6, 0.4, 0.08);
    }

    //nose
    let nose_top = positions.nose_bridge[1];
    let nose_bottom = positions.nose_bridge[3];
    let nose_end = null;
    stroke(76, 95, 109, 25);
    strokeWeight(0.08);
    line(nose_top[0], nose_top[1], nose_bottom[0], nose_bottom[1]-0.15);

    //mouth
    noStroke();
    fill(255, 25);
    beginShape();
    vertex(positions.top_lip[1][0],positions.top_lip[1][1]-0.2);
    vertex(positions.top_lip[2][0], positions.top_lip[2][1]-0.2);
    vertex(positions.top_lip[3][0], positions.top_lip[3][1]-0.2);
    vertex(positions.top_lip[4][0], positions.top_lip[4][1]-0.2);
    vertex(positions.top_lip[5][0], positions.top_lip[5][1]-0.2);
    vertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]-0.3);
    vertex(positions.bottom_lip[9][0], positions.bottom_lip[9][1]-0.3);
    vertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]-0.3);
    endShape();

    //reflection
    let curRefShift = this.ref_shift;
    let curRefShift_2 = this.ref_shift_2;
    fill(254, 252, 255, 220);
    if(nose_top[0] > nose_bottom[0]){
        ellipse(positions.nose_bridge[3][0] + curRefShift, right_eye_pos[1]+0.22, 1, 0.5);
        ellipse(positions.top_lip[3][0] - curRefShift_2 , positions.top_lip[1][1]-0.2, 0.2, 0.1);

    } else{
        ellipse(positions.nose_bridge[3][0] - curRefShift, right_eye_pos[1]+0.22, 1, 0.5);
        ellipse(positions.top_lip[3][0] + curRefShift_2 , positions.top_lip[1][1]-0.2, 0.2, 0.1);
    }
    
    //mask outline
    noFill();
    stroke(0, 200);
    strokeWeight(0.2);
    beginShape();
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    curveVertex(positions.chin[2][0], positions.chin[2][1]);
    curveVertex(positions.chin[3][0]-0.1, positions.chin[3][1]);
    curveVertex(positions.nose_tip[2][0], positions.nose_tip[2][1]+0.6);
    curveVertex(positions.chin[13][0]-0.1, positions.chin[13][1]);
    curveVertex(positions.chin[14][0], positions.chin[14][1]);
    curveVertex(positions.chin[16][0], positions.chin[16][1]);
    curveVertex(positions.right_eyebrow[4][0]-0.2, positions.right_eyebrow[4][1]);
    curveVertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-1);
    curveVertex(positions.left_eyebrow[0][0]+0.2, positions.left_eyebrow[0][1]);
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    curveVertex(positions.chin[2][0], positions.chin[2][1]);
    curveVertex(positions.chin[3][0], positions.chin[3][1]);
    endShape();

    //decorations
    if (this.gender >= 0 && this.gender <= 0.5){      //flower hat for female
        stroke(0, 200);
        strokeWeight(0.1);
        fill(255, 192, 183);
        push();
        angleMode(DEGREES);
        if (nose_top[0] > nose_bottom[0]){
            translate(positions.chin[16][0]-0.1, positions.chin[16][1]-0.5);

        } else {
            translate(positions.chin[0][0]+0.1, positions.chin[0][1]-0.5);
        }
        for (let i = 0; i < 5; i++){
            ellipse(0, 0.35, 0.37, 0.75);
            rotate(360/5);

        }
        noStroke();
        fill(236, 180, 172, 200);
        ellipse(0, 0, 0.3);
        pop();

    } else {        //plant hat for male
        stroke(0, 200);
        strokeWeight(0.1);
        push();
        translate(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-1.3);
        fill(3, 77, 13);
        if (nose_top[0] > nose_bottom[0]){
            beginShape();
            vertex(-0.2, -0.4);
            vertex(-0.2, -0.7);
            quadraticVertex(-1.1, -0.85, -1.5, -1.4);
            quadraticVertex(-0.6, -1.9, -0.1, -1.05);
            quadraticVertex(0.55, -2.4, 1.4, -1.8);
            quadraticVertex(0.9, -0.7, 0.2, -0.7);
            vertex(0.2, -0.4);
            vertex(-0.2, -0.4);
            endShape();

        } else {
            beginShape();
            vertex(0.2, -0.4);
            vertex(0.2, -0.7);
            quadraticVertex(1.1, -0.85, 1.5, -1.4);
            quadraticVertex(0.6, -1.9, 0.1, -1.05);
            quadraticVertex(-0.55, -2.4, -1.4, -1.8);
            quadraticVertex(-0.9, -0.7, -0.2, -0.7);
            vertex(-0.2, -0.4);
            vertex(0.2, -0.4);
            endShape();
        } 
        pop();
    }

   
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.helmet_color = map(settings[0], 0, 100, 0, 5);
    this.eye_color = map(settings[1], 0, 100, 1, 4);
    this.gender = map(settings[2], 0, 100, 0, 1);
    this.ref_shift = map(settings[3], 0, 100, 1, 1.8);
    this.ref_shift_2 = map(settings[4], 0, 100, 0.3, 1.2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    settings[0] = map(this.helmet_color, 0, 5, 0, 100);
    settings[1] = map(this.eye_color, 1, 4, 0, 100);
    settings[2] = map(this.gender, 0, 1, 0, 100);
    settings[3] = map(this.ref_shift, 1, 1.8, 0, 100);
    settings[4] = map(this.ref_shift_2, 0.3, 1.2, 0, 100);
    return settings;
  }
}