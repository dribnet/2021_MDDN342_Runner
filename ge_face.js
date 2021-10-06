/*
 * FaceMap class - holds all information about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 8;

// other variables can be in here too
const noiseVal = 0.03; // constant for the hand-drawn looking algorithm

// skin colors
const skin_col_1 = [240, 215, 214];
const skin_col_2 = [245, 201, 168];
const skin_col_3 = [227, 170, 135];
const skin_col_4 = [208, 169, 120];
const skin_col_5 = [194, 137, 99];
const skin_col_6 = [131, 85, 48];
const skin_cols = [skin_col_1, skin_col_2, skin_col_3, skin_col_4, skin_col_5, skin_col_6];

// hair colors
const hair_col_1 = [242,217,111];
const hair_col_2 = [130,78,43];
const hair_col_3 = [168,60,21];
const hair_col_4 = [94,48,48];
const hair_col_5 = [34,33,40];
const hair_cols = [hair_col_1, hair_col_2, hair_col_3, hair_col_4, hair_col_5];

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
function GeFace() {
  // these are state variables for a face
  this.skin_value = 1; // 0 - 5
  this.facing = 0; // 0: facing right/front, 1: facing left
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_value = 1;  // range is 0.5 to 8
  this.eye_lash = 0; // 0: no eye lashes, 1: has eye lashes
  this.eye_height = 1.3; // how big the eyes are opened
  this.eye_gap = 0.3; // range is 0 - 0.5
  this.hair_value = 0; // 0 - 4
  this.hair_length = 0; // 0: short hair, 1: long hair

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    // head
    fill(skin_cols[this.skin_value]);
    stroke(25);
    strokeWeight(0.1);
    this.drawFace(positions.chin);

    // mouth
    noFill();
    stroke(25);
    strokeWeight(0.03);
    this.drawMouth(positions);

    // nose
    this.drawShape(positions.nose_tip);

    // eyes
    this.drawEyes(positions);
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.skin_value = int(map(settings[0], 0, 100, 0, 5.99));
    this.eye_shift = map(settings[1], 0, 100, -0.6, 0.6);
    this.hair_value = int(map(settings[2], 0, 100, 0, 4.99));
    this.facing = int(map(settings[3], 0, 100, 0, 2));
    this.eye_height = map(settings[4], 0, 100, 0.2, 1.3);
    this.eye_lash = int(map(settings[5], 0, 100, 0, 2));
    this.eye_gap = map(settings[6], 0, 100, 0, 0.5);
    this.hair_length = int(map(settings[7], 0, 100, 0, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(8);
    settings[0] = map(this.skin_value, 0, 5.99, 0, 100);
    settings[1] = map(this.eye_shift, -0.6, 0.6, 0, 100);
    settings[2] = map(this.hair_value, 0, 4.99, 0, 100);
    settings[3] = map(this.facing, 0, 2, 0, 100);
    settings[4] = map(this.eye_height, 0.2, 1.3, 0, 100);
    settings[5] = map(this.eye_lash, 0, 2, 0, 100);
    settings[6] = map(this.eye_gap, 0, 0.5, 0, 100);
    settings[7] = map(this.hair_length, 0, 2, 0, 100);
    return settings;
  }

  /* draw the face with the provided face value and slider values */
  this.drawFace = function(segment) {
    let facePos = this.analyzeFace(segment);
    let front = facePos[0];
    let back = facePos[1];
    let chin = facePos[2];
    let pos = [];
    facePos[0] = front[0] * 0.2 + back[0] * 0.8;
    facePos[1] = (front[1] + back[1])/2;
    let faceWidth = abs(front[0]-back[0])/12.0
    push();
      if(this.facing >= 1) { // facing left
        scale(-faceWidth, abs(front[1]-chin[1])/8.0);
      } else {
        scale(faceWidth, abs(front[1]-chin[1])/8.0);
      }
      
      translate(facePos[0], facePos[1]);
      
      this.drawBackHair();

      fill(skin_cols[this.skin_value]);
      let face = this.computeBezier(-6.2, -7, -3, -8, -1, -8, 2, -7);
      face.push(...this.computeBezier(2, -7, 5, -6, 3, -4, 4, -2));
      face.push(...this.computeBezier(4, -2, 6, 1, 6, 4, 4, 5.5));
      face.push(...this.computeBezier(4, 5.5, 2, 7, -1, 8, -6, 5));
      face.push(...this.computeBezier(-6, 5, -8, 4, -8, 3, -8, 1));
      face.push(...this.computeBezier(-8, 1.5, -10, 2, -11, -2, -8, 0));
      face.push(...this.computeBezier(-8, -1, -8, -3, -8, -5, -6, -7));
      this.drawShape(face);

      this.drawFrontHair();
    pop();
  }

  /* draw the eyes, which can open and close */
  this.drawEyes = function(positions) {
    let eyeLPos = segment_average(positions.left_eye);
    let eyeRPos = segment_average(positions.right_eye);
    let yPos = positions.nose_bridge[1];
    let eyeWidth = 1.3;
    let eyeMPos = [];
    eyeMPos[0] = (eyeLPos[0] + eyeRPos[0])/2;

    let curEyeShift = this.eye_shift;

    lerpVal = this.eye_gap;
    eyeLPos[0] = lerp(eyeLPos[0], eyeMPos[0], lerpVal);
    eyeRPos[0] = lerp(eyeRPos[0], eyeMPos[0], lerpVal);
    eyeLPos[1] = yPos[1];
    eyeRPos[1] = yPos[1];
      
    // left eye
    stroke(25);
    fill(220);
    this.drawOval(eyeLPos[0], eyeLPos[1], eyeWidth, this.eye_height);
    fill(25);
    noStroke();
    this.drawOval(eyeLPos[0]+this.eye_shift, eyeLPos[1], 0.15, 0.15);

    // right eye
    stroke(25);
    fill(220);
    this.drawOval(eyeRPos[0], eyeRPos[1], eyeWidth, this.eye_height);
    fill(25);
    noStroke();
    this.drawOval(eyeRPos[0]+this.eye_shift, eyeRPos[1], 0.15, 0.15);

    // eyebrows, it follows the eyes without intersecting with one another
    stroke(25);
    noFill();
    this.drawShape(this.computeBezier(eyeLPos[0]-eyeWidth*0.4, eyeLPos[1]-this.eye_height*0.6, 
                                      eyeLPos[0]-eyeWidth*0.2, eyeLPos[1]-this.eye_height*0.85, 
                                      eyeLPos[0]+eyeWidth*(0.5-lerpVal), eyeLPos[1]-this.eye_height*0.85, 
                                      eyeLPos[0]+eyeWidth*(0.6-lerpVal), eyeLPos[1]-this.eye_height*0.6));
    this.drawShape(this.computeBezier(eyeRPos[0]-eyeWidth*0.4, eyeRPos[1]-this.eye_height*0.6, 
                                      eyeRPos[0]-eyeWidth*0.2, eyeRPos[1]-this.eye_height*0.85, 
                                      eyeRPos[0]+eyeWidth*(0.5-lerpVal), eyeRPos[1]-this.eye_height*0.85, 
                                      eyeRPos[0]+eyeWidth*(0.6-lerpVal), eyeRPos[1]-this.eye_height*0.6));

    // eyelash
    if (this.eye_lash >= 1) {
      this.drawLine(eyeLPos[0]-eyeWidth*0.4, eyeLPos[1]-this.eye_height*0.3, eyeLPos[0]-eyeWidth*0.6, eyeLPos[1]-this.eye_height*0.4);
      this.drawLine(eyeRPos[0]+eyeWidth*0.4, eyeRPos[1]-this.eye_height*0.3, eyeRPos[0]+eyeWidth*0.6, eyeRPos[1]-this.eye_height*0.4);
    }
  }

  /* draw the mouth, either closed or open */
  this.drawMouth = function(positions) {
    let mouth = subset(positions.top_lip, 6); // get the lower half of the top lip
    let length = mouth.length; // get the initial top lip length 
    mouth.push(...reverse(subset(positions.bottom_lip, 0, 7))); // get the lower half of the bottom lip
    let pos = segment_average(positions.top_lip); // find the position of the mouth
    push();
      scale(1, 1.3); // scale up the y axis to exaggerate the expression
      if (this.facing >= 1){
        translate(-0.2, -0.1);
      } else {
        translate(0.2, -0.1);
      }

      let mouthHeight = this.findHeight(mouth);

      // if the mouth is opened, draw a mouth, teeth and tongue
      if (mouthHeight > 0.4) {
        fill(103,38,54);
        this.drawShape(mouth);
        fill(255);

        // teeth
        let top = this.combineCurve(subset(mouth, 0, length+1)); // get a more detailed array with points
        top = subset(top, top.length*0.2, top.length-(top.length*0.3)); 
        // draw the lower points of the teeth, use the mouth height as the guidance
        loop = top[0];
        let tmp = [];
        tmp[0] = top[top.length-3][0];
        tmp[1] = top[top.length-3][1]+ mouthHeight*0.2;
        append(top, tmp)
        tmp = [];
        tmp[0] = top[2][0];
        tmp[1] = top[2][1]+ mouthHeight*0.2;
        append(top, tmp)
        append(top, loop);
        this.drawShape(top);

        // tongue
        let bottom = this.combineCurve(subset(mouth, length)); 
        tongue = subset(bottom, bottom.length*0.3, bottom.length-(bottom.length*0.5));
        let x = lerp(tongue[0][0], tongue[tongue.length-1][0], 0.45);
        let y = lerp(tongue[0][1], tongue[tongue.length-1][1], 0.45);
        stroke(255, 0, 0);
        fill(180,85,118);
        noStroke();
        this.drawShape(tongue);
        this.drawOval(x, y, dist(tongue[0][0], tongue[tongue.length-1][0], tongue[0][1], tongue[tongue.length-1][1])*0.45, mouthHeight*0.3);
        
        // redraw the outline
        stroke(25);
        noFill();
        this.drawShape(mouth);

      } else {
        // if the mouth is not opened
        noFill();
        this.drawShape(subset(positions.bottom_lip, 6));
      }
      noFill();
    pop();
  }

  /**
   * helper method to draw the front hair
   */
  this.drawFrontHair = function() {
    fill(hair_cols[this.hair_value]);
    let hair = this.computeBezier(4, -3, 1, -4, -1, -5, -1, -7.5);
    hair.push(...this.computeBezier(-1, -7.5, -2, -2, -4, -4, -8, -1));
    hair.push(...this.computeBezier(-8, -1, -8, -3, -8, -5, -6, -7));
    hair.push(...this.computeBezier(-6.2, -7, -3, -8, -1, -8, 2, -7));
    hair.push(...this.computeBezier(2, -7, 5, -6, 3, -4, 4, -3));
    this.drawShape(hair); 
  }

  /**
   * helper method to draw the back hair
   */
  this.drawBackHair = function(){
    fill(hair_cols[this.hair_value]);
    if (this.hair_length >= 1) { // long hair
      let hair = this.computeBezier(-6, -7, -9, -5, -10, -2, -9, 2);
      hair.push(...this.computeBezier(-9, 2, -8, 4, -12, 6, -10, 7));
      hair.push(...this.computeBezier(-10, 7, -7, 9, -5, 7, -2, 8.5));
      hair.push(...this.computeBezier(-1.7, 8.5, 0, 9, 4, 10, 7, 6));
      hair.push(...this.computeBezier(7, 6, 5, 5, 5, 3, 5, 1));
      hair.push(...this.computeBezier(5, 1, 8, -2, 4, -5, 3, -6.5));
      this.drawShape(hair); 
    } else { // short hair
      let hair = this.computeBezier(-6, -7, -9, -5, -10, -2, -9, 2);
      hair.push(...this.computeBezier(-9, 2, -8, 4, -8, 4, -9, 5));
      hair.push(...this.computeBezier(-9, 5, -8.5, 5, -8, 6, -5, 5));
      hair.push(...this.computeBezier(-5, 5, -2, 6, -2, 5, 6, 6));
      hair.push(...this.computeBezier(6, 6, 5, 3, 7, 0, 3, -6.6));
      this.drawShape(hair); 
    }

  }

  /**
   * helper method to draw an array of points with curveVertex and noise
   */
  this.drawShape = function(segment) {
    beginShape();
      curveVertex(segment[0][0], segment[0][1]);
      for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        curveVertex(px, py);
      }
      curveVertex(segment[segment.length-1][0], segment[segment.length-1][1]);
    endShape();
  }

  /**
   * helper method to draw a line with noise
   */
  this.drawLine = function(x1, y1, x2, y2){
    var dis = dist(x1, y1, x2, y2);
    beginShape();
      curveVertex(x1, y1);
      for (var i = 0; i < dis; i+=0.1) {
        var p = i / dis;
        var x = lerp(x1, x2, p);
        var y = lerp(y1, y2, p);
        var offset = getNoiseValue(x, y, 1, "face", -noiseVal, noiseVal, 10);
        curveVertex(x+offset, y+offset);
      }
      curveVertex(x2, y2);
    endShape();
  }

  /**
   * helper method to draw an arc with start to end in degree
   * x, y - the middle of the arc
   */
  this.drawOval = function(x, y, width, height){
    var a = width/2, b = height/2;
    var dis = 2 * PI * b + 4 * (a - b); 
    beginShape();
      curveVertex(x+a, y);
      for (var i = 0; i <= dis; i+=0.1) {
        var t = map(i, 0, dis, 0, 360);
        var offset = getNoiseValue(0, 0, map(i, 0, dis, 0, 1), "face", -noiseVal, noiseVal, 10);
        var newX = (a + offset) * cos(t) + x;
        var newY = (b + offset) * sin(t) + y;
        curveVertex(newX, newY);
      }
      curveVertex(x+a, y);
    endShape(CLOSE);
   
  }

  /**
   * helper method to draw a bezier curve with noise
   */
  this.computeBezier = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    let vertices = [];
    let j = 2;
    vertices[0] = []; vertices[1] = [];
    vertices[0][0] = x1; vertices[0][1] = y1;
    vertices[1][0] = x1; vertices[1][1] = y1;
    // estimate how long the curve is from point to point dist
    let estimateDist = dist(x1, y1, x2, y2) + dist(x2, y2, x3, y3) + dist(x3, y3, x4, y4); 
    // loop through the bezier and add them into the array with noise offset
    for (let i = 0; i <= estimateDist; i += 0.3) {
      let t = i / estimateDist; // t is [0,1], the ratio in the curve that we can get the vector point
      let x = bezierPoint(x1, x2, x3, x4, t); 
      let y = bezierPoint(y1, y2, y3, y4, t);
      let offset = getNoiseValue(0, 0, t, "face", -noiseVal, noiseVal, 10);
      vertices[j] = [];
      vertices[j][0] = x + offset;
      vertices[j][1] = y + offset;
      j++;
    }
    vertices[j] = []; vertices[j+1] = [];
    vertices[j][0] = x4; vertices[j][1] = y4;
    vertices[j+1][0] = x4; vertices[j+1][1] = y4;
    return vertices;
  }

  /**
   * analyze the face center position, its width and height
   * and return an array of the leftest, rightest and lowest point
   */
  this.analyzeFace = function(segment){
    let result = [];
    result[0] = segment[0];
    result[1] = segment[segment.length-1];
    result[2] = segment[0];
    for(let i = 0; i < segment.length; i++) {
      if (result[2][1] < segment[i][1]) result[2] = segment[i];
    }
    return result;
  }

  /**
   * find the height of the given point array
   * used for calculating if the mouth is opened
   */
  this.findHeight = function(segment) {
    let minY = segment[0][1];
    let maxY = segment[0][1];
    for (let i = 0; i < segment.length; i++) {
      if(minY > segment[i][1]) minY = segment[i][1];
      if(maxY < segment[i][1]) maxY = segment[i][1];
    }
    return abs(maxY - minY);
  }

  /**
   * helper method to calculate a more detailed points array for a given array
   * which is a continuous curve
   */
  this.combineCurve = function(segment){
    let result = [];
    for (let i = 0; i < segment.length-1; i++) {
      let dis = dist(segment[i][0], segment[i][1], segment[i+1][0], segment[i+1][1]);
      for (let j = 0; j < dis; j+=0.05) {
        let t = j/dis;
        let point = [];
        point[0] = lerp(segment[i][0], segment[i+1][0], t);
        point[1] = lerp(segment[i][1], segment[i+1][1], t);
        append(result, point);
      }
    }
    return result;
  }
}