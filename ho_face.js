
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 8;



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
function HoFace() {
  // these are state variables for a face
  // (your variables should be different!)

  //pumpkin colour (Hair)
  const yellow = color(255, 255, 0);
  const mid_yellow = color(255, 117, 24);
  const dark_yellow = color(127, 51, 0);
  const error_green = color(0, 255, 0);

  //eye colour
  const brown = color(69,24,0);
  const blue = color(135,206,250);
  const grey = color(128,128,128);

  const pink = color(255,182,193);


/*
 * earSize can vary from 0 to 4
 * earDist is the distance between ears and varies from 0 to 4
 * faceColor is 1,2,3,4 for yellow,blue,red, or violet respectively
 */
  this.leafSize = 5;
  this.leafDist = 5;
  this.hairColor = 1;
  this.eyeColor = 1;
  this.blushColor = 1;

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    noStroke();

    push();
    if(this.hairColor == 0) {
      fill(yellow);
    }
    else if (this.hairColor==1) {
      fill(mid_yellow);
    }
    else if (this.hairColor==2) {
      fill(dark_yellow);
    }
    else {
      fill(error_green);
    }

    // head
  push();
  scale(1/3);
  translate(-4,0);
  noStroke();
  ellipse(0, 0, 7,10);
  ellipse(2, 0, 5,10);
  ellipse(4, 0, 8,10);
  ellipse(6, 0, 5,10);
  ellipse(8, 0, 7,10);
  pop();

  pop();

    //leaf//
    push();
    scale(1/3);
    let leafRadius = map(this.leafSize, 0, 10, 0.3, 2);
    let leafXPos = map(this.leafDist, 0, 10, 0.5, 2);
    fill(58,23,11);
    noStroke();
    rect(-2+leafXPos,-8.5,leafRadius+1.5,4,0.2,1,1,1);
    pop();
    //leaf//
    push();
    //nose//
    let nose_top =  positions.nose_bridge[0];
    let nose_bottom = positions.nose_bridge[3];

    stroke(0);
    strokeWeight(0.15);
    // line(nose_top[0], nose_top[1], nose_bottom[0], nose_bottom[1]); //top
    fill(0);
    triangle(nose_bottom[0], nose_bottom[1], nose_top[0], nose_top[0],nose_bottom[1], nose_bottom[1]);

    let nose_end = null;
    if(nose_top[0] < nose_bottom[0]) {
      nose_end = positions.nose_tip[0];
    }
    else {
      nose_end = positions.nose_tip[4];
    }
    // let nose_end = positions.nose_tip[4];
    let nose_center = positions.nose_tip[2];
    pop();
    // line(nose_end[0], nose_end[1], nose_center[0], nose_center[1]); //bottom
    //nose//

    //mouth//
    // let top_lip = positions.top_lip[0];
    // let bottom_lip = positions.bottom_lip[]

    push();
    push();
      fill(0);
      noStroke();
      ellipse(positions.bottom_lip[7][0], positions.bottom_lip[6][1],0.2);
      ellipse(positions.bottom_lip[8][0], positions.bottom_lip[8][1],0.2);
      ellipse(positions.bottom_lip[9][0], positions.bottom_lip[9][1],0.2);
      ellipse(positions.bottom_lip[10][0], positions.bottom_lip[10][1],0.2);
      ellipse(positions.bottom_lip[0][0], positions.bottom_lip[0][1],0.2);

      pop();
    pop();


    push();
    if(this.eyeColor == 0) {
      fill(brown);
    }
    else if (this.eyeColor==1) {
      fill(blue);
    }
    else if (this.eyeColor==2) {
      fill(grey);
    }
    else {
      fill(error_green);
    }

    //eyes//
    noStroke();
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    push();
    translate(0,0.5);
    push();
    fill(255);
    ellipse(left_eye_pos[0], left_eye_pos[1], 0.5);
    ellipse(right_eye_pos[0], right_eye_pos[1], 0.5);
    pop();

    push();
    translate(0,0);
    ellipse(left_eye_pos[0], left_eye_pos[1], 0.3);
    ellipse(right_eye_pos[0], right_eye_pos[1], 0.3);
    pop();

    pop();
    pop();
    //eyes//


    if(this.blushColor == 0) {
      fill(pink);
    }
    else if (this.eyeColor==1) {
      noFill();
    }
    else if (this.eyeColor==2) {
      noFill();
    }
    else {
      noFill();
    }
    //blush
    ellipse(1.5,0,0.5,0.25);
    ellipse(-1.5,0,0.5,0.25);


  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.leafSize = map(settings[0], 0, 100, 0, 10);
    this.leafDist = map(settings[1], 0, 100, 0, 10);
    this.hairColor = int(map(settings[2], 0, 100, 0, 3));
    this.eyeColor = int(map(settings[3], 0, 100, 0, 3));
    this.blushColor = int(map(settings[4], 0, 100, 0, 3));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(5);
    settings[0] = map(this.leafSize, 0, 10, 0, 100);
    settings[1] = map(this.leafDist, 0, 10, 0, 100);
    settings[2] = map(this.hairColor, 0, 4, 0, 100);
    settings[3] = map(this.eyeColor, 0, 4, 0, 100);
    settings[4] = map(this.blushColor, 0, 4, 0, 100);
    return settings;
  }
}