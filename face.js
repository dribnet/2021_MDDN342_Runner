/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used
const bg_color = [225, 206, 187];
const fg_color = [151, 102, 52];
const stroke_color = [95, 52, 8];

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
function Face() {
  // these are state variables for a face
  // (your variables should be different!)

  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_value = 1;  // range is 0.5 to 8

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
    // head
    //print(positions);
    let chin = positions.chin;
    let right_eye = positions.right_eye;
    let left_eye = positions.left_eye;
    let right_eyebrow = positions.right_eyebrow;
    let left_eyebrow = positions.left_eyebrow;
    let nose_bridge = positions.nose_bridge;
    let nose_tip = positions.nose_tip;
    let top_lip = positions.top_lip;
    let bottom_lip = positions.bottom_lip;


    // eyebrows
    fill(0);
    stroke(0);
    strokeWeight(0.08);
    //this.draw_segment(positions.left_eyebrow);
    //this.draw_segment(positions.right_eyebrow);

    // draw segments of face using points
    fill(128);
    stroke(128);
    this.draw_segment(positions.chin);

    fill(100, 0, 100);
    stroke(100, 0, 100);
    //this.draw_segment(positions.nose_bridge);
    stroke(255,0,0);
    //this.draw_segment(positions.nose_tip);

    strokeWeight(0.03);

    fill(200, 0, 0);
    stroke(200, 0, 0);
    this.draw_segment(positions.top_lip);
    this.draw_segment(positions.bottom_lip);

    fill(255);
    stroke(255);

    //let left_eye_pos = segment_average(positions.left_eye);
    //let right_eye_pos = segment_average(positions.right_eye);

    // eyes
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {
      // fill(bg_color);
      // ellipse(left_eye_pos[0], left_eye_pos[1], 0.45, 0.27);
      // ellipse(right_eye_pos[0], right_eye_pos[1], 0.45, 0.27);

      // fill(fg_color);
      // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
      // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    }
    else {
      // let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      // let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      // fill(bg_color);
      // ellipse(eyePosX, eyePosY, 0.45, 0.27);

      // fill(fg_color);
      // ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    }

    // positive = looking left
    // negative = looking right
    let direction = (nose_bridge[0][0] - (chin[chin.length-1][0] - (chin[0][0] - chin[chin.length-1][0])/2))/((chin[0][0] - chin[chin.length-1][0])/2)-2;
    // print(direction);


    // face

    let brow_h = -0.2;
    push();
      beginShape();
        noStroke();
        fill(255,150);
        curveVertex(left_eyebrow[4][0], left_eyebrow[4][1] + brow_h);
        curveVertex(left_eyebrow[2][0], left_eyebrow[2][1] + brow_h);
        // curveVertex(left_eyebrow[1][0], left_eyebrow[1][1] + brow_h);
        curveVertex(left_eyebrow[0][0], left_eyebrow[0][1] + brow_h);
        for(let i = 1; i < chin.length-1; i += 2){ // ++ or 2?
          curveVertex(chin[i][0], chin[i][1]);
        }
        curveVertex(right_eyebrow[4][0], right_eyebrow[4][1] + brow_h);
        // curveVertex(right_eyebrow[3][0], right_eyebrow[3][1] + brow_h);
        // curveVertex(right_eyebrow[1][0], right_eyebrow[1][1] + brow_h);
        curveVertex(right_eyebrow[2][0], right_eyebrow[2][1] + brow_h);
        curveVertex(right_eyebrow[0][0], right_eyebrow[0][1] + brow_h);
        curveVertex(nose_bridge[0][0], 0.1 + right_eyebrow[0][1] + (right_eyebrow[0][1] - left_eyebrow[4][1])/2 + brow_h);
        curveVertex(left_eyebrow[4][0], left_eyebrow[4][1] + brow_h);
        curveVertex(left_eyebrow[2][0], left_eyebrow[2][1] + brow_h);
        // curveVertex(left_eyebrow[1][0], left_eyebrow[1][1] + brow_h);

      endShape();
    pop();


    //nose
    stroke(0);
    noFill();
    strokeWeight(0.08);
    print(abs(nose_tip[2][0] - nose_bridge[3][0]) );
    if(abs(nose_tip[2][0] - nose_bridge[3][0]) > 0.08){
      if(nose_tip[2][0] - nose_bridge[3][0] > 0){
        //line(nose_bridge[0][0],nose_bridge[0][1], nose_tip[0][0], nose_tip[0][1]);
        beginShape();
          curveVertex(left_eyebrow[4][0],left_eyebrow[4][1]);
          curveVertex(left_eyebrow[4][0],left_eyebrow[4][1]);
          curveVertex(left_eyebrow[4][0] +(nose_bridge[0][0] - left_eyebrow[4][0])/1.1, nose_bridge[0][1]);
          // curveVertex(nose_bridge[0][0], nose_bridge[0][1]);
          //curveVertex(nose_bridge[1][0], nose_bridge[1][1]);
          curveVertex(nose_bridge[2][0], nose_bridge[2][1]);
          //curveVertex(nose_bridge[3][0], nose_bridge[3][1]);
          //curveVertex(nose_bridge[3][0], nose_bridge[3][1]);
           curveVertex(nose_tip[0][0], nose_tip[0][1]);
          // curveVertex(nose_tip[1][0], nose_tip[1][1]);
          // curveVertex(nose_tip[2][0], nose_tip[2][1]);
          // curveVertex(nose_tip[2][0], nose_tip[2][1]);
          
        endShape();
        if(direction > 0.5){
          line(nose_tip[2][0],nose_tip[2][1],nose_bridge[3][0],nose_bridge[3][1]);
        }
        else{
          beginShape();
            vertex(nose_tip[0][0], nose_tip[0][1]);
            vertex(nose_tip[2][0], nose_tip[2][1]);
            vertex(nose_tip[4][0], nose_tip[4][1]);
          endShape();
        }
      }
      else{
        //line(nose_bridge[0][0],nose_bridge[0][1], nose_tip[4][0], nose_tip[4][1]);

        beginShape();
          curveVertex(right_eyebrow[0][0], right_eyebrow[0][1]);
          curveVertex(right_eyebrow[0][0], right_eyebrow[0][1]);
          curveVertex(right_eyebrow[0][0] + (nose_bridge[0][0] - right_eyebrow[0][0])/1.1, nose_bridge[0][1]);
          curveVertex(nose_bridge[2][0], nose_bridge[2][1]);
          curveVertex(nose_tip[4][0], nose_tip[4][1]);
        endShape();

        beginShape();
          vertex(nose_tip[0][0], nose_tip[0][1]);
          vertex(nose_tip[2][0], nose_tip[2][1]);
          vertex(nose_tip[4][0], nose_tip[4][1]);
        endShape();
      }
    }
    else{
      beginShape();
        vertex(nose_tip[0][0], nose_tip[0][1]);
        vertex(nose_tip[2][0], nose_tip[2][1]);
        vertex(nose_tip[4][0], nose_tip[4][1]);
      endShape();
    }

   fill(255,1,1);
    noStroke();
    //ellipse(top_lip[11][0],top_lip[11][1],0.1);




    // eyebrows

    let eyebrow_thicknessR = (right_eye[0][1] - right_eyebrow[0][1])/8 + 0.02;
    let eyebrow_thicknessL = (left_eye[4][1] - left_eyebrow[4][1])/8 + 0.02;
    push();
      translate(0,-0.1);
      fill(0);
      noStroke();
      beginShape();
        vertex(right_eyebrow[0][0] - abs(direction/5), right_eyebrow[0][1] + eyebrow_thicknessR);
        vertex(right_eyebrow[0][0] ,right_eyebrow[0][1] - eyebrow_thicknessR);
        vertex(right_eyebrow[3][0], right_eyebrow[3][1] - eyebrow_thicknessR);
        vertex(right_eyebrow[4][0], right_eyebrow[4][1]);
        vertex(right_eyebrow[3][0], right_eyebrow[3][1] + eyebrow_thicknessR);
  
      endShape();

      beginShape();
      vertex(left_eyebrow[4][0] + abs(direction/5), left_eyebrow[4][1] + eyebrow_thicknessL);
      vertex(left_eyebrow[4][0], left_eyebrow[4][1] - eyebrow_thicknessL);
      vertex(left_eyebrow[1][0], left_eyebrow[1][1] - eyebrow_thicknessL);
      vertex(left_eyebrow[0][0], left_eyebrow[0][1]);
      vertex(left_eyebrow[1][0], left_eyebrow[1][1] + eyebrow_thicknessL);
      endShape();
    pop();










    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    let lash_scale = 0.08;

    ///// right eye /////////
    push();
      strokeCap(SQUARE);
      translate(right_eye_pos[0], right_eye_pos[1]);
      scale(1.5,2);
      translate(-right_eye_pos[0], -right_eye_pos[1]);
      let tempRY = right_eye[3][1]+(right_eye[3][1] - right_eye[2][1])/2
      let tempRX = right_eye[3][0] + 0.05;
      beginShape();
        stroke(0);
        strokeWeight(lash_scale);
        noFill();
        curveVertex(right_eye[0][0], right_eye[0][1]);
        curveVertex(right_eye[0][0], right_eye[0][1]);
        curveVertex(right_eye[1][0], right_eye[1][1]);
        curveVertex(right_eye[2][0], right_eye[2][1]);
        curveVertex(right_eye[3][0], right_eye[3][1]);
        curveVertex(tempRX + 0.05,tempRY);
        curveVertex(tempRX + 0.05,tempRY);
      endShape();
      
      fill(0);
      noStroke();
      ellipse(right_eye_pos[0],right_eye_pos[1],0.25, dist(right_eye[4][0],right_eye[4][1],right_eye[2][0],right_eye[2][1]));
      

      strokeWeight(0.05);
      beginShape();
       translate(0,0.03);
        curveVertex(tempRX,tempRY - 0.02);
        curveVertex(tempRX,tempRY-0.02);
        curveVertex(tempRX,tempRY);
        curveVertex(right_eye[4][0] - (right_eye[4][0] - (tempRX))/2,tempRY + (right_eye[4][1] - tempRY)/2);
        curveVertex(right_eye[4][0], right_eye[4][1]);
        curveVertex(right_eye[5][0], right_eye[5][1]);
        curveVertex(right_eye[5][0], right_eye[5][1]);
      endShape();
    pop();


    ////// left eye //////////
    push();
      strokeCap(SQUARE);
      translate(left_eye_pos[0], left_eye_pos[1]);
      scale(1.5,2);
      translate(-left_eye_pos[0], -left_eye_pos[1]);

      let tempY = left_eye[0][1]+(left_eye[0][1] - left_eye[1][1])/2
      let tempX = left_eye[0][0] - 0.05;
      noStroke();
      fill(255);
      // beginShape();
      //   curveVertex(left_eye[5][0],left_eye[5][1]);
      //   curveVertex(left_eye[5][0] - (left_eye[5][0] - (tempX))/2,tempY + (left_eye[5][1] - tempY)/2);
      //   curveVertex(tempX,tempY);
      //   curveVertex(left_eye[1][0],left_eye[1][1]);
      //   curveVertex(left_eye[4][0],left_eye[4][1]);
      //   curveVertex(left_eye[3][0],left_eye[3][1]);
      //   curveVertex(left_eye[2][0],left_eye[2][1]);
      //   curveVertex(left_eye[5][0],left_eye[5][1]);
      //   curveVertex(left_eye[5][0] - (left_eye[5][0] - tempX)/2,tempY + (left_eye[5][1] - tempY)/2);
      //   curveVertex(tempX,tempY);
      // endShape();
      noFill();
      stroke(0);
      strokeWeight(lash_scale);
        beginShape();
        curveVertex(tempX - 0.05,tempY);
        curveVertex(tempX - 0.05,tempY);
        //curveVertex(positions.left_eye[0][0],positions.left_eye[0][1]);
        curveVertex(left_eye[1][0],left_eye[1][1]);
        curveVertex(left_eye[2][0],left_eye[2][1]);
        let x = min(left_eye[3][0], left_eyebrow[4][0] +(nose_bridge[0][0] - left_eyebrow[4][0])/2); // 2 or 1.1?
        curveVertex(x,left_eye[3][1]);
        curveVertex(x,left_eye[3][1]);
        // curveVertex(left_eye[3][0],left_eye[3][1]); 
        // curveVertex(left_eyebrow[4][0] +(nose_bridge[0][0] - left_eyebrow[4][0])/1.1, nose_bridge[0][1]);
     
      endShape();
      
      fill(0);
      noStroke();
      ellipse(left_eye_pos[0],left_eye_pos[1],0.25, dist(positions.left_eye[4][0],positions.left_eye[4][1],positions.left_eye[2][0],positions.left_eye[2][1]));
      
      strokeWeight(0.05);
      beginShape();
        translate(0,0.03);
        curveVertex(left_eye[4][0],left_eye[4][1]);
        curveVertex(left_eye[4][0],left_eye[4][1]);
        curveVertex(left_eye[5][0],left_eye[5][1]);
        curveVertex(left_eye[5][0] - (left_eye[5][0] - (tempX))/2,tempY + (left_eye[5][1] - tempY)/2);
        curveVertex(tempX,tempY);
        curveVertex(tempX,tempY - 0.02);
        curveVertex(tempX,tempY - 0.02);
      endShape();

    pop();
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    // eye col?
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_value = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_value, 0.5, 8, 0, 100);
    return settings;
  }
}
