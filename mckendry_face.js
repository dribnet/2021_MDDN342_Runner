/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = false;
// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 9;

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i = 0; i < s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len, sum_y / s_len];
}

// This where you define your own face object
function McKendryFace() {
//colours:
  this.purple = color(210, 160, 200, 200);
  this.pink = color(250, 225, 250, 200);
  this.light_red = color(240, 180, 170, 200);
  this.dark_red = color(185, 120, 115, 200);
  this.orange = color(240, 190, 145, 200);
  this.yellow = color(255, 250, 210, 200);
  this.light_green = color(230, 250, 220, 200);
  this.dark_green = color(150, 175, 135, 200);
  this.dark_blue = color(135, 135, 180, 200);
  this.light_blue = color(200, 230, 245, 200);
  this.other_turq = color(195, 245, 225, 200);
//positions/states:
  this.mouthX = 0;
  this.mouthY = 0;
  this.male_female = 1;
  this.chinX = 0;
  this.chinY = 0;
  this.shapeScale = 1;
  this.eye_height = .25;
  this.faceColor = 1;
  this.eyesX = 0;
  this.mouth_OpenClose = 2

this.show_points = function(segment) {
    for (let i = 0; i < segment.length; i++) {
      let px = segment[i][0];
      let py = segment[i][1];
      var number = i.toString();
      textAlign(CENTER, CENTER);
      textSize(0.2);
      fill(0);
      text(number, px, py, 0.1);
    }
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for (let i = 0; i < segment.length; i++) {
      let px = segment[i][0];
      let py = segment[i][1];
      ellipse(px, py, 0.1);
      if (i < segment.length - 1) {
        let nx = segment[i + 1][0];
        let ny = segment[i + 1][1];
        line(px, py, nx, ny);
      } else if (do_loop) {
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
    //this array takes the colours called in the variables above, then I get a random colour from the array to be the fill for the background shapes
    this.colourFillArray = [this.purple, this.pink, this.light_red, this.dark_red, this.orange, this.yellow, this.light_green, this.dark_green, this.dark_blue, this.light_blue, this.other_turq];
    this.colourFill = random(this.colourFillArray);

//If statement decides if the face is male or female, dictated by slider5.
if (this.male_female < 2) {
      //FEMALE SHAPES
      fill(this.colourFill);
      noStroke();
      push();
      //scales shapes to size of the face
      scale(this.shapeScale);
      ellipse(0, 0, 2, 3);
      ellipse(0, .5, 3.75, 3.25);
      ellipse(-1.25, -1.5, 2, 4);
      ellipse(.75, -2.5, 2.5, 2);
      ellipse(-.5, 1.75, 2.5, 2);
      ellipse(1, -1.5, 2, 2.5);
      ellipse(-.75, -2.5, 2, 3);
//HAIRLINE
      noFill();
      stroke(0);
      strokeWeight(0.035);
      beginShape();
      vertex(-.3, -2.9);
      quadraticVertex(1.5, -4, 1.9, -2.5);
      endShape();
      pop();

//FEMALE MOUTH
      //if-else statement decides if the mouth is closed (only a line, no fill) or open (area of mouth filled)
      if (this.mouth_OpenClose == 1) {
        stroke(0);
        noFill();
        strokeWeight(0.03);
        beginShape();
        vertex(positions.bottom_lip[7][0], positions.bottom_lip[7][1]);
        quadraticVertex(positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY, positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
        endShape();
      } else  {
        stroke(0);
        fill(200, 200, 200, 100);
        strokeWeight(0.03);
        beginShape();
        vertex(positions.bottom_lip[7][0], positions.bottom_lip[7][1]);
        quadraticVertex(positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY, positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
        endShape();
        strokeWeight(0.01);
        line(positions.bottom_lip[7][0], positions.bottom_lip[7][1], positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      }

//FEMALE JAWLINE
      stroke(0);
      strokeWeight(0.035);
      //if statement decides what side of the jaw the face is on, using the tip of the nose as a center point to figure out if the person is looking left or right
      if (positions.nose_tip[2][0] < 0) {
        beginShape();
        noFill();
        vertex(positions.chin[8][0], positions.chin[8][1])
        quadraticVertex(positions.chin[12][0] + this.chinX, positions.chin[12][1] + this.chinY, positions.chin[16][0], positions.chin[16][1])
        endShape();
      } else {
        beginShape();
        noFill();
        vertex(positions.chin[0][0], positions.chin[0][1])
        quadraticVertex(positions.chin[4][0] + this.chinX, positions.chin[5][1] + this.chinY, positions.chin[8][0], positions.chin[8][1])
        endShape();
      }

//FEMALE EYEBROWS
      noFill();
      stroke(0);
      strokeWeight(0.02);
      beginShape();
      vertex(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1]);
      quadraticVertex(positions.nose_bridge[1][0], positions.nose_bridge[1][1] - 1.2, positions.right_eyebrow[3][0], positions.right_eyebrow[3][1])
      endShape();

//FEMALE NOSE
      noFill();
      stroke(0);
      strokeWeight(0.03);
      //same as the jawline if statement- decides which way the nose should be pointing
      if (positions.nose_tip[2][0] < 0) {
        beginShape();
        vertex(positions.nose_bridge[1][0], positions.nose_bridge[1][1])
        quadraticVertex(positions.nose_tip[1][0], positions.nose_tip[1][1] + .5, positions.nose_tip[4][0], positions.nose_tip[4][1])
        endShape();
      } else {
        beginShape();
        vertex(positions.nose_bridge[1][0], positions.nose_bridge[1][1])
        quadraticVertex(positions.nose_tip[3][0], positions.nose_tip[3][1] + .5, positions.nose_tip[1][0], positions.nose_tip[1][1])
        endShape();
      }
    } else {
////MALE FACE////

//MALE SHAPES
      this.colourFillArray = [this.purple, this.pink, this.light_red, this.dark_red, this.orange, this.yellow, this.light_green, this.dark_green, this.dark_blue, this.light_blue, this.other_turq];
      this.colourFill = random(this.colourFillArray);
      noStroke();
      fill(this.colourFill);
      push();
      //scales shapes to size of the face
      scale(this.shapeScale);
      rect(.75, -2.25, 2, 3.5);
      rect(-2.25, -3.25, 2.5, 1.5);
      rect(-.75, -2, 2, 2);
      rect(-1.75, -1.25, 3, 3.5);
      rect(-1.25, -2.75, 1, 5.5);
      rect(0, -3.5, 1.5, 1.5);
//HAIRLINE
      stroke(0);
      strokeWeight(0.035);
      line(-1.75, -1.75, -1.75, -2.9);
      line(-1.9, -2.75, 1.5, -2.75);
      noStroke();
      pop();

//MALE MOUTH
      if (this.mouth_OpenClose == 1) {
        stroke(0);
        noFill();
        strokeWeight(0.03);
        line(positions.bottom_lip[7][0], positions.bottom_lip[7][1], positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY);
        line(positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY, positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      } else  {
        stroke(0);
        fill(200, 200, 200, 100);
        stroke(0);
        strokeWeight(0.02);
        triangle(positions.bottom_lip[7][0], positions.bottom_lip[7][1], positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY, positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
        strokeWeight(0.03);
        line(positions.bottom_lip[7][0], positions.bottom_lip[7][1], positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY);
        line(positions.bottom_lip[3][0] + this.mouthX, positions.bottom_lip[3][1] + this.mouthY, positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      }

//MALE JAWLINE
      stroke(0);
      strokeWeight(0.035);
      if (positions.nose_tip[2][0] < 0) {
        line(positions.chin[8][0], positions.chin[8][1], positions.chin[12][0] + this.chinX, positions.chin[12][1] + this.chinY);
        line(positions.chin[12][0] + this.chinX, positions.chin[12][1] + this.chinY, positions.chin[16][0], positions.chin[16][1]);
      } else {
        line(positions.chin[0][0], positions.chin[0][1], positions.chin[4][0] + this.chinX, positions.chin[4][1] + this.chinY);
        line(positions.chin[4][0] + this.chinX, positions.chin[4][1] + this.chinY, positions.chin[8][0], positions.chin[8][1]);
      }

//MALE EYEBROWS
      stroke(0);
      strokeWeight(0.02);
      line(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1], positions.right_eyebrow[3][0], positions.right_eyebrow[3][1]);

//MALE NOSE
      noFill();
      stroke(0);
      strokeWeight(0.03);
      if (positions.nose_tip[2][0] < 0) {
        line(positions.nose_bridge[1][0], positions.nose_bridge[1][1], positions.nose_tip[1][0], positions.nose_tip[1][1]);
        line(positions.nose_tip[1][0], positions.nose_tip[1][1], positions.nose_tip[3][0], positions.nose_tip[3][1])
      } else {
        line(positions.nose_bridge[1][0], positions.nose_bridge[1][1], positions.nose_tip[3][0], positions.nose_tip[3][1]);
        line(positions.nose_tip[3][0], positions.nose_tip[3][1], positions.nose_tip[1][0], positions.nose_tip[1][1])
      }
    }

//EYES//
    fill(240, 240, 240, 100);
    stroke(0)
    strokeWeight(0.025);
    if (positions.nose_tip[2][0] < 0) {
      rect(positions.left_eye[0][0] + this.eyesX, positions.left_eye[0][1], 1, this.eye_height)
      ellipse(positions.right_eye[4][0] + this.eyesX, positions.right_eye[4][1], 1.25, .25 + this.eye_height);
    } else {
      rect(positions.left_eye[0][0] + this.eyesX, positions.left_eye[0][1], 1, this.eye_height)
      ellipse(positions.right_eye[4][0] + this.eyesX, positions.right_eye[4][1], 1.25, .25 + this.eye_height);
    }
}

/* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.mouthX = map(settings[0], 0, 100, -1.25, 1.25);
    this.mouthY = map(settings[1], 0, 100, -1.25, 1.25);
    this.eyesX = map(settings[2], 0, 100, -1, 1);
    this.eye_height = map(settings[3], 0, 100, 0, .75);
    this.chinX = map(settings[4], 0, 100, -1.5, 1.5);
    this.chinY = map(settings[5], 0, 100, -1.5, 1.5);
    this.mouth_OpenClose = int(map(settings[6], 0, 100, 1, 3));
    this.shapeScale = map(settings[7], 0, 100, .5, 1.25);
    this.male_female = map(settings[8], 0, 100, 1, 3);
  }
/* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.mouthX, -1.25, 1.25, 0, 100);
    settings[1] = map(this.mouthY, -1.25, 1.25, 0, 100);
    settings[2] = map(this.eyesX, -1, 1, 0, 100);
    settings[3] = map(this.eye_height, 0, .75, 0, 100);
    settings[4] = map(this.chinX, -1.5, 1.5, 0, 100);
    settings[5] = map(this.chinY, -1.5, 1.5, 0, 100);
    settings[6] = int(map(this.mouth_OpenClose, 1, 3, 0, 100));
    settings[7] = map(this.shapeScale, .5, 1.25, 0, 100);
    settings[8] = map(this.male_female, 1, 3, 0, 100);
    return settings;
  }
}
