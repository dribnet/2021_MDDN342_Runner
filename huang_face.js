// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// tto set the number of sliders to show
var NUM_SLIDERS = 7;

//given a segment, this returns the average point of [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len, sum_y / s_len];
}

function drawSpots() { // draws the spots for the males
  noStroke();
  ellipse(0, -2.1, 0.22);
  ellipse(-0.2, -1.8, 0.22);
  ellipse(0.2, -1.8, 0.22);
}

function drawBlush() { //draws the blush for females
  noFill();
  strokeWeight(0.1);
  ellipse(-1, 0, 0.3);
  ellipse(1, 0, 0.3);
  strokeWeight(0.05);
  line(-1.2, 0, -0.8, 0);
  line(0.8, 0, 1.2, 0);
}

// colour variables
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

// defines face object
function HuangFace() {


  // face variables
  this.faceColor = 0; //range is 0 to 1

  this.blackEye = 0.5; //Black eyeSize range is 0.05 to 0.9
  this.eyeSize = 0.5 //White eyeSuze range is 0.2 to 0.5
  this.earShape = 1; //range is 0.6 to 1.5
  this.antennaColor = 0; //range is 0 to 1
  this.showBlush = 0; //range is 0 to 1
  this.showSpots = 0; //range is 0 to 1

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge,
   */  
  this.draw = function(positions) {

    //positions for the face
    let face_left = positions.chin[4]; 
    let face_chin = positions.chin[8];
    let face_right = positions.chin[16];
    let right_cheek = positions.chin[2];
    let left_cheek = positions.chin[4];

    //determines face colour by sliders
    if(this.faceColor == 0) {
      strokeWeight(0.2);
      stroke(255);
      fill(0);
    } else if (this.faceColor == 1) {
      strokeWeight(0.2);
      stroke(0);
      fill(255);
    }

    //custom head shape based on chin positions
    beginShape();
    vertex(face_left[0]-0.4, -0.7)
    bezierVertex(-2.5, -4, 2, -4.5, face_right[0], -1);
    bezierVertex(face_right[0], face_chin[0], 0, 5, face_left[0]-0.4, -0.7);
    endShape();

    //shows blush for females
    //if statement determines if blush is black or white depending on face colour
    if (this.faceColor == 0 && this.showBlush == 1) {
      push();
        fill(50);
        drawSpots();
      pop();
    } else if (this.faceColor == 1 && this.showBlush == 1) {
      push();
        fill(0);
        drawSpots();
      pop();
    }

    //gets average of the eyes
    fill(150);
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    ellipse(left_eye_pos[0], left_eye_pos[1], 0.1);
    ellipse(right_eye_pos[0], right_eye_pos[1], 0.1);

    //draws eyes
    let blackEye = map(this.eyeSize, 5, 100, 2, 4); //mapping eye boundary
    noStroke();
    fill(0);
    ellipse(left_eye_pos[0], left_eye_pos[1], this.blackEye); //size of eye is random
    ellipse(right_eye_pos[0], right_eye_pos[1], this.blackEye);
    fill(255);
    ellipse(left_eye_pos[0], left_eye_pos[1], this.eyeSize);
    ellipse(right_eye_pos[0], right_eye_pos[1], this.eyeSize);

    //positions for the nose
    let nose_top = positions.nose_bridge[0];
    let nose_bottom = positions.nose_bridge[3];
    let nose_middle = positions.nose_tip[0];

    //draws nose
    noFill();
    stroke(0);
    strokeWeight(0.2);
    curve(nose_top[0], nose_top[1], nose_top[0]-0.3, nose_top[1]+0.5, nose_bottom[0]+0.3, nose_bottom[1], nose_middle[0]+3, nose_middle[1]-5);

    //shows spots for males
    //if statement determines if spots are black or white depending on face colour
    if (this.faceColor == 0 && this.showSpots == 1) {
    push();
    stroke(255);
    drawBlush();
    pop();
    } else if (this.faceColor == 1 && this.showSpots == 1) {
    push();
    stroke(0);
    drawBlush();
    pop();
    }

    //positions for the mouth
    let mouth_left = positions.top_lip[0];
    let mouth_right = positions.bottom_lip[0];
    let mouth_middle = positions.bottom_lip[3];

    //draws mouth
    if(this.faceColor == 0) {
      stroke(255);
    } else {
      stroke(0);
    }
    strokeWeight(0.2);
    curve(0, 0, mouth_left[0], mouth_left[1], mouth_right[0], mouth_right[1], mouth_middle[0]+2, mouth_middle[1]-2); 

    //if statement determines if antennas are black or white
    if(this.antennaColor == 0) {
      stroke(255);
      fill(0);
    } else if (this.antennaColor == 1) {
      stroke(0);
      fill(255);

    }
  //draws ears
    rotate(-20, 0);
    ellipse(0, -2.8, 0.5, this.earShape); //changes the height of the ears
    ellipse(0, -3.8, 1, 0.4);
    rotate(45, 0);
    ellipse(0.1, -2.8, 0.5, this.earShape);
    ellipse(0.1, -3.8, 1, 0.4);
  } 


  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.faceColor = int(map(settings[0], 0, 100, 0, 1));
    this.blackEye = (map(settings[1], 0, 100, 0.05, 0.9));
    this.eyeSize = map(settings[2], 0, 100, 0.2, 0.5);
    this.earShape = map(settings[3], 0, 100, 0.6, 1.5);
    this.antennaColor = int(map(settings[4], 0, 100, 0, 1));
    this.showBlush = int(map(settings[5], 0, 100, 0, 1));
    this.showSpots = int(map(settings[6], 0, 100, 0, 1));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(7);
    settings[0] = map(this.faceColor, 0, 1, 0, 100);
    settings[1] = map(this.blackEye, 0.05, 0.9, 0, 100);
    settings[2] = map(this.eyeSize, 0.2, 0.5, 0, 100);
    settings[3] = map(this.earShape, 0.6, 1.5, 0, 100);
    settings[4] = map(this.antennaColor, 0, 1, 0, 100);
    settings[5] = map(this.showBlush, 0, 1, 0, 100);
    settings[6] = map(this.showSpots, 0, 1, 0, 100);
    return settings;
  }
}
