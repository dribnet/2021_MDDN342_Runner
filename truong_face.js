/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 7;

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
function TruongFace() {
  // these are state variables for a face
  // (your variables should be different!)

/*
 * earSize can vary from 0 to 4
 * earDist is the distance between ears and varies from 0 to 4
 * faceColor is 1,2,3,4 for yellow,blue,red, or violet respectively
 */
  
  this.faceColor = 1;
  this.eyeColor = 1;
  this.hairColor = 1;
  this.blush = 1;
  this.mouth_type = 1;
  this.brow_tilt = 5;
  this.browsColor = 1;

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    noStroke();
    

    //hair
    let facePos = segment_average(positions.chin);
    push();
    if (this.hairColor == 1) { //light blonde
        fill("#d6ad5a");
    } else if (this.hairColor == 2) { //mid blonde
        fill("#ad8c49");
    } else if (this.hairColor == 3) { //dark blonde
        fill("#997b46");
    } else if (this.hairColor == 4) { //brown
        fill("#3b2f19");
    } else if (this.hairColor == 5) { //black
        fill("#1a140a");
    }
    ellipse(facePos[0],facePos[0]-0.5,4);
    ellipse(facePos[0],facePos[0]-3,0.5);
    ellipse(facePos[0],facePos[0]-2.55,0.5);
    ellipse(facePos[0],facePos[0]-3.5,1);
    pop();

    // head
    push();
    if (this.faceColor == 1) { 
        fill("#f7ebe4"); //white tone
    } else if (this.faceColor == 2) { 
        fill("#cfb4a5"); //tan tone
    } else if (this.faceColor == 3) { 
        fill("#997560"); //dark tone
    }
    ellipse(facePos[0],facePos[0],3.5);
    pop();

    //eyes
    let leftEyePos = segment_average(positions.left_eye);
    let rightEyePos = segment_average(positions.right_eye);
    let leftPupil = positions.left_eye[4];
    let rightPupil = positions.right_eye[4];
    push();
    if (this.eyeColor == 1) { 
        fill("#855740"); //brow
    } else if (this.eyeColor == 2) { 
        fill("#331b0e"); //dark brow
    } else if (this.eyeColor == 3) { 
        fill("#3a85ba"); //blue
    }
    stroke(255); 
    strokeWeight(0.05)
    ellipse(leftEyePos[0],0,0.5);
    ellipse(rightEyePos[0],0,0.5);
    fill(255); 
    ellipse(leftPupil[0],-0.1,0.1); 
    ellipse(rightPupil[0],-0.1,0.1);
    pop();

    //blush
    let leftBlush = positions.right_eye[0];
    let rightBlush = positions.left_eye[0];
    if (this.blush == 1){ 
     noStroke();
     fill("#f7a6a6");
     ellipse(leftBlush[0]+0.4,leftBlush[1]+1.6,0.5,0.25);
     ellipse(rightBlush[0]+0.1,rightBlush[1]+1.6,0.5,0.25);
     stroke("#e38f8f");
     strokeWeight(0.03);
     line(leftBlush[0]+0.5,leftBlush[1]+1.65,leftBlush[0]+0.45,leftBlush[1]+1.55);
     line(leftBlush[0]+0.35,leftBlush[1]+1.65,leftBlush[0]+0.3,leftBlush[1]+1.55);
     line(rightBlush[0]+0.05,rightBlush[1]+1.65,rightBlush[0],rightBlush[1]+1.55);
     line(rightBlush[0]+0.2,rightBlush[1]+1.65,rightBlush[0]+0.15,rightBlush[1]+1.55);
   }

    //nose
    noStroke();
    let nose = color("#d6b4a1")
    let nose_shadow = color("#c2a391")
    if (positions.nose_bridge[3][0] <= positions.nose_tip[2][0]) {
      nose = color("#d6b4a1")
      nose_shadow = color("#c2a391")
    }
    fill(nose);
    triangle(positions.nose_bridge[0][0],positions.nose_bridge[0][1]+0.5,positions.nose_tip[0][0]-0.1,positions.nose_tip[0][1]+0.4,positions.nose_tip[2][0]+0.3,positions.nose_tip[2][1]+0.4);
    fill(nose_shadow);
    triangle(positions.nose_bridge[0][0],positions.nose_bridge[0][1]+0.5,positions.nose_tip[0][0]+0.1,positions.nose_tip[0][1]+0.35,positions.nose_tip[2][0]+0.3,positions.nose_tip[2][1]+0.4);
    

    //mouth
    noStroke();
    let mouthPos = segment_average(positions.top_lip);
    let mouthPos2 = segment_average(positions.bottom_lip);
    if (this.mouth_type == 1){ //smile
      fill("#edb4b4");
      rect(mouthPos[0]-0.3,mouthPos2[1],0.8,0.4,0,0,40,40);
    }
    else if (this.mouth_type == 2){ //little smile
      fill("#edb4b4");
      rect(mouthPos[0]-0.3,mouthPos2[1],0.8,0.2,0,0,40,40);
    }
    else if (this.mouth_type == 3){ //lips
      fill("#000000");
      stroke("#9c5454");
      strokeWeight(0.05);
      rect(mouthPos[0]-0.3,mouthPos2[1],0.8,0.1,0,0,40,40);
    }

    //brows
    let leftBrowLeft = positions.left_eyebrow[0];
    let leftBrowArc = positions.left_eyebrow[2];
    let leftBrowRight = positions.left_eyebrow[4];
    let rightBrowLeft = positions.right_eyebrow[0];
    let rightBrowArc = positions.right_eyebrow[2];
    let rightBrowRight = positions.right_eyebrow[4];
    strokeWeight(0.08);
    push();
    if (this.browsColor == 1) { 
        stroke("#d6ad5a");
    } else if (this.browsColor == 2) { 
        stroke("#ad8c49");
    } else if (this.browsColor == 3) { 
        stroke("#997b46");
    } else if (this.browsColor == 4) { 
        stroke("#3b2f19");
    } else if (this.browsColor == 5) { 
        stroke("#1a140a");
    }
    rotate(-this.brow_tilt);
    line(leftBrowLeft[0]+0.25,leftBrowLeft[1]+1,leftBrowArc[0],leftBrowArc[1]+1); 
    line(leftBrowArc[0],leftBrowArc[1]+1,leftBrowRight[0],leftBrowRight[1]+1);
    rotate(this.brow_tilt*2);
    line(rightBrowLeft[0],rightBrowLeft[1]+1,rightBrowArc[0],rightBrowArc[1]+1);
    line(rightBrowArc[0],rightBrowArc[1]+1,rightBrowRight[0]-0.4,rightBrowRight[1]+1);
    pop();
  

  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.faceColor = int(map(settings[0],0,100,1,3));
    this.hairColor = int(map(settings[1],0,100,1,5));
    this.eyeColor = int(map(settings[2],0,100,1,3));
    this.blush = (map(settings[3],0,100,0,1));
    this.mouth_type = int(map(settings[4],0,100,1,3));
    this.brow_tilt = map(settings[5],0,100,0,8);
    this.browsColor = int(map(settings[6],0,100,1,5));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.faceColor,1,3,0,100);
    settings[1] = map(this.hairColor,1,5,0,100);
    settings[2] = map(this.eyeColor,1,3,0,100);
    settings[3] = map(this.blush,0,1,0,100);
    settings[4] = map(this.mouth_type,1,3,0,100);
    settings[5] = map(this.brow_tilt,0,8,0,100);
    settings[6] = map(this.browsColor,1,5,0,100);
    return settings;
  }
}
