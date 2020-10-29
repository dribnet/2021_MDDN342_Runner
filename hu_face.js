
//var DEBUG_MODE = true;


// var NUM_SLIDERS = 8;

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


function HuFace() {

    const face = [134, 89, 54];
    const brown = [96, 60, 16];
    const orange = [181, 135, 78];
    const yellow = [164, 116, 10];
    const grey = [129, 120, 101];
    const pink = [217, 194, 182];
    const horns_color = [254, 233, 217];
    const nose_color = [53, 37, 18];
    const ear_color = [234, 192, 158];

  this.earringc = 1;
  this.earDist = 0.3;
  this.eyeDist = 0;
  this.mouthDist = -0.1;
  this.faceColor = 1;
  this.fur = 1;
  this.furColor = 3;
  this.horns = -0.1;


  this.draw = function(positions) {
    noStroke();
    //horns
    fill(horns_color);
      beginShape();
      vertex(positions.chin[0][0]+0.5, positions.left_eyebrow[2][1]-0.3);
      vertex(positions.chin[0][0]-0.1,positions.left_eyebrow[2][1]+0.3);
      vertex(positions.chin[0][0]-0.5,positions.left_eyebrow[2][1]-1.3);
      vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[2][1]-3-this.horns);
      vertex(positions.chin[0][0], positions.left_eyebrow[2][1]-1.5);
      endShape();

      beginShape();
      vertex(positions.chin[16][0]-0.4, positions.right_eyebrow[2][1]-0.3);
      vertex(positions.chin[16][0]-1.4,positions.right_eyebrow[2][1]+1.3);
      vertex(positions.chin[16][0]-0.5,positions.right_eyebrow[2][1]-1.5);
      vertex(positions.right_eyebrow[4][0], positions.right_eyebrow[2][1]-3-this.horns);
      vertex(positions.chin[16][0], positions.right_eyebrow[2][1]-1.3);
      endShape();
      //earring
      if(this.earringc == 1) {
        fill(255, 255, 255);
      }
      else if (this.earringc == 2) {
        fill(pink);
      }
      else if (this.earringc == 3) {
        fill(ear_color);
      }
      else if (this.earringc == 4) {
        fill(yellow);
      }
      else {
        fill(horns_color);
      }
      ellipse(positions.chin[0][0]-0.3, positions.chin[0][1]-0.1, this.earDist, 0.6);

      //fur
      if(this.furColor == 1) {
        fill(brown);
      }
      else if (this.furColor == 2) {
        fill(pink);
      }
      else if (this.furColor == 3) {
        fill(grey);
      }
      else if (this.furColor == 4) {
        fill(face);
      }
      else {
        fill(horns_color);
      }

        bezier(positions.chin[0][0]-1.1, positions.chin[0][1]-0.7,positions.chin[0][0]-2, positions.chin[0][1]-this.fur, positions.chin[0][0], positions.chin[0][1], positions.chin[0][0]+1.5, positions.left_eyebrow[2][1]-0.1);
        bezier(positions.chin[16][0]+0.9, positions.chin[16][1]-0.7,positions.chin[16][0]+2, positions.chin[16][1]-this.fur, positions.chin[16][0], positions.chin[16][1], positions.chin[16][0]-1.5, positions.right_eyebrow[2][1]-0.1);


    //ear
    push();
    fill(ear_color);
    bezier(positions.chin[0][0]-1, positions.chin[0][1]-1,positions.chin[0][0]-2, positions.chin[0][1], positions.chin[0][0], positions.chin[0][1], positions.chin[0][0]+1.5, positions.left_eyebrow[2][1]-0.5);
    bezier(positions.chin[16][0]+0.8, positions.chin[16][1]-1,positions.chin[16][0]+2, positions.chin[16][1], positions.chin[16][0], positions.chin[16][1], positions.chin[16][0]-1.5, positions.right_eyebrow[2][1]-0.5);

    pop();


    // face
    if(this.faceColor == 1) {
      fill(face);
    }
    else if (this.faceColor== 2) {
      fill(orange);
    }
    else if (this.faceColor== 3) {
      fill(yellow);
    }
    else if (this.faceColor== 4) {
      fill(grey);
    }
    else {
      fill(brown);
    }

    noStroke();
    beginShape();
    vertex(positions.chin[0][0]-0.3, positions.chin[0][1]-0.8);
    vertex(positions.chin[16][0]-0.3, positions.chin[16][1]-0.8);
    vertex(positions.chin[8][0], positions.chin[8][1]);
    endShape();
    bezier(positions.chin[0][0]-0.3, positions.chin[0][1]-0.79,positions.left_eyebrow[0][0], positions.left_eyebrow[2][1]-1.2, positions.right_eyebrow[4][0], positions.right_eyebrow[2][1]-1.2,positions.chin[16][0]-0.3, positions.chin[16][1]-0.79);
    bezier(positions.chin[0][0]-0.29, positions.chin[0][1]-0.8, positions.chin[0][0]-0.4,positions.chin[1][1], positions.chin[7][0], positions.chin[8][1], positions.chin[8][0]+0.01, positions.chin[8][1]);
    bezier(positions.chin[16][0]-0.31, positions.chin[16][1]-0.8, positions.chin[16][0]+0.4, positions.chin[15][1],  positions.chin[9][0],  positions.chin[8][1], positions.chin[8][0]-0.01, positions.chin[8][1]);


    //nose bridge
    stroke(0);
    noFill();
    bezier(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]+0.2, positions.nose_bridge[0][0], positions.nose_bridge[0][1],positions.nose_bridge[2][0]+0.3, positions.nose_bridge[2][1], positions.nose_tip[4][0], positions.nose_tip[4][1]);
    bezier(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]+0.2, positions.nose_bridge[0][0], positions.nose_bridge[0][1],positions.nose_bridge[2][0]+0.3, positions.nose_bridge[2][1], positions.nose_tip[0][0], positions.nose_tip[0][1]);

    //up nose
    fill(nose_color);
    noStroke();
    let nose_up = positions.nose_tip[0];
    let nose_upr = positions.nose_tip[4];

    ellipse(nose_up[0], nose_up[1]+0.3,0.5, 0.3);
    ellipse(nose_upr[0], nose_up[1]+0.3,0.5, 0.3);
    stroke(2);
    noFill();
    bezier(positions.nose_tip[0][0]-0.1,positions.nose_tip[0][1]+0.1,positions.nose_tip[2][0],positions.nose_tip[2][1]+0.1,positions.nose_tip[2][0]+0.3,positions.nose_tip[2][1],positions.nose_tip[4][0]+0.1,positions.nose_tip[4][1]+0.1);


    //eyebows
    let left_eyebrow1 = positions.left_eyebrow[4];
    let left_eyebrow2 = positions.left_eyebrow[2];
    let left_eyebrow3 = positions.left_eyebrow[0];
    let right_eyebrow1 = positions.right_eyebrow[4];
    let right_eyebrow2 = positions.right_eyebrow[2];
    let right_eyebrow3 = positions.right_eyebrow[0];
    noFill();
    bezier(left_eyebrow1[0], left_eyebrow1[1], left_eyebrow2[0], left_eyebrow2[1], left_eyebrow2[0], left_eyebrow2[1], left_eyebrow3[0], left_eyebrow3[1]);
    bezier(right_eyebrow1[0], right_eyebrow1[1], right_eyebrow2[0], right_eyebrow2[1], right_eyebrow2[0], right_eyebrow2[1], right_eyebrow3[0], right_eyebrow3[1]);


    //eyes

    stroke(0);
    fill(255);
    ellipse(positions.left_eye[1][0], positions.left_eye[5][1], 0.8, 0.5);
    ellipse(positions.right_eye[2][0], positions.right_eye[4][1], 0.8, 0.5);
    noStroke();
    fill(0);
    ellipse(positions.left_eye[1][0]-this.eyeDist, positions.left_eye[5][1], 0.7, 0.48);
    ellipse(positions.right_eye[2][0]-this.eyeDist,positions.right_eye[4][1], 0.7, 0.48);

    //mouth
    let up_mouth = positions.top_lip[0];
    stroke(0);
    noFill();
    bezier(positions.top_lip[0][0]-this.mouthDist,positions.bottom_lip[5][1],positions.bottom_lip[4][0],positions.bottom_lip[4][1]+0.1, positions.bottom_lip[2][0],positions.bottom_lip[2][1]+0.1, positions.bottom_lip[0][0]+this.mouthDist,positions.bottom_lip[1][1]);


  }

  this.setProperties = function(settings) {
    this.earDist = map(settings[0], 0, 100, 0.1, 0.3);
    this.eyeDist = map(settings[1], 0, 100, -0.07, 0.08);
    this.faceColor = int(map(settings[2], 0, 100, 0, 4));
    this.earringc = int(map(settings[3], 0, 100, 0, 4));
    this.mouthDist = map(settings[4], 0, 100, -0.2, 0);
    this.fur = map(settings[5], 0, 100, 0, -0.6);
    this.furColor = int(map(settings[6], 0, 100, 0, 4));
    this.horns = map(settings[7], 0, 100, -0.5, 0.3);
  }

  this.getProperties = function() {
    let settings = new Array(7);
    settings[0] = map(this.earDist, 0.1, 0.3, 0, 100);
    settings[1] = map(this.eyeDist, -0.05, 0.06, 0, 100);
    settings[2] = map(this.faceColor, 0, 4, 0, 100);
    settings[3] = map(this.earringc, 0, 4, 0, 100);
    settings[4] = map(this.mouthDist, -0.2, -0.1, 0, 100);
    settings[5] = map(this.fur, 0, -0.6, 0, 100);
    settings[6] = map(this.furColor, 0, 4, 0, 100);
    settings[7] = map(this.horns, -0.5, 0.3,0, 100);
    return settings;
  }
}
