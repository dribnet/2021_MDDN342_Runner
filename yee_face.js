/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 7;

// other variables can be in here too
// here's some examples for colors used
// const yee_bg_color = [225, 206, 187];
// const yee_fg_color = [151, 102, 52];
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
function YeeFace() {
  // these are state variables for a face
  // (your variables should be different!)

  this.gender = 1;
  this.suits = 0;
  this.eyeball_move = 0;
  this.eye_color = 0;
  this.blush_color = 0;
  this.mouth_open = 0;
  this.hair_bun = 0;
  this.hair_color = 0;

  const skin = [255, 229, 184];
  const gold = [255, 227, 82];
  const mustache = [204, 150, 82];
  const red = [250, 80, 80];
  const black = [50];
  const pink = [255, 200, 200];
  const orange = [255, 140, 0];
  const brown = [130, 90, 5];
  const grey = [120];
  const blue = [52, 141, 224];
  const shadow = [180, 130, 10];

  const hair_black = [30];
  const hair_yellow = [219, 175, 39];
  const hair_brown = [105, 76, 29];
  const hair_red = [128, 44, 23];

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
   this.draw = function(positions) {

    let crown_dist = dist(positions.left_eye[0][0], positions.left_eye[0][1], positions.right_eye[3][0], positions.right_eye[3][1]);
    let crown_1 = dist(positions.right_eye[3][0], positions.right_eye[3][1], positions.chin[16][0], positions.chin[16][1]);
    let crown_2 = dist(positions.chin[0][0], positions.chin[0][1], positions.left_eye[0][0], positions.left_eye[0][1]);
    let map_crown1 = map(crown_1, 0.2, 1.8, 0.1, -0.2);
    let map_crown2 = map(crown_2, 0.2, 1.5, 0.1, -0.2);
    let map_hairbun1 = map(crown_1, 0.2, 1.8, 1.5, 0.5);
    let map_hairbun2 = map(crown_2, 0.2, 1.8, 0.5, 1.5);


    noStroke();
    angleMode(DEGREES);

    //Face
    fill(skin);
    beginShape();
    noStroke();
    curveVertex(positions.chin[0][0], positions.chin[0][1]-0.8);
    curveVertex(positions.chin[4][0]-0.5, positions.chin[4][1]);
    curveVertex(positions.chin[8][0], positions.chin[8][1]);
    curveVertex(positions.chin[12][0]+0.1, positions.chin[12][1]+0.1);
    curveVertex(positions.chin[16][0]-0.2, positions.chin[16][1]-0.8);
    curveVertex(positions.chin[0][0], positions.chin[0][1]-0.8);
    curveVertex(positions.chin[4][0]-0.5, positions.chin[4][1]);
    curveVertex(positions.chin[8][0], positions.chin[8][1]);
    curveVertex(positions.chin[12][0], positions.chin[12][1]);
    endShape();
    
    //Left_eye
    fill(255);
    push();
    translate(0, 0.3);
    beginShape();
    noStroke();
    curveVertex(positions.left_eye[0][0]-0.5, positions.left_eye[0][1]+0.2);
    curveVertex(positions.left_eye[1][0]-0.3, positions.left_eye[1][1]);
    curveVertex(positions.left_eye[2][0], positions.left_eye[2][1]);
    curveVertex(positions.left_eye[3][0], positions.left_eye[3][1]);
    curveVertex(positions.left_eye[4][0], positions.left_eye[4][1]+0.3);
    curveVertex(positions.left_eye[5][0]-0.4, positions.left_eye[5][1]+0.3);
    curveVertex(positions.left_eye[0][0]-0.5, positions.left_eye[0][1]+0.1);
    curveVertex(positions.left_eye[1][0]-0.3, positions.left_eye[1][1]);
    curveVertex(positions.left_eye[2][0], positions.left_eye[2][1]);
    endShape();
    pop();

    //Right_eye
    push();
    translate(0, 0.3);
    beginShape();
    noStroke();
    curveVertex(positions.right_eye[0][0], positions.right_eye[0][1]);
    curveVertex(positions.right_eye[1][0], positions.right_eye[1][1]);
    curveVertex(positions.right_eye[2][0]+0.3, positions.right_eye[2][1]);
    curveVertex(positions.right_eye[3][0]+0.3, positions.right_eye[3][1]+0.1);
    curveVertex(positions.right_eye[4][0]+0.3, positions.right_eye[4][1]+0.25);
    curveVertex(positions.right_eye[5][0], positions.right_eye[5][1]+0.25);
    curveVertex(positions.right_eye[0][0], positions.right_eye[0][1]);
    curveVertex(positions.right_eye[1][0], positions.right_eye[1][1]);
    curveVertex(positions.right_eye[2][0]+0.3, positions.right_eye[2][1]);
    endShape();
    pop();

    //Eyeball color
    if(this.eye_color >0 && this.eye_color <= 1){
      fill(brown);
    }else
    if(this.eye_color >1 && this.eye_color <= 2){
      fill(black);
    }else
    if(this.eye_color >2 && this.eye_color <= 3){
      fill(grey);
    }else
    if(this.eye_color >3 && this.eye_color <= 4){
      fill(blue);
    }

    //Eyeball
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    ellipse(left_eye_pos[0]+this.eyeball_move, left_eye_pos[1]+0.4, 0.2, 0.3);
    ellipse(right_eye_pos[0]+this.eyeball_move, right_eye_pos[1]+0.35, 0.2, 0.3);

    //Blush
    let from = color(pink);
    let to = color(orange);
    colorMode(RGB);
    let inter = lerpColor(from, to, this.blush_color);
    fill(inter);
    ellipse(positions.top_lip[0][0]-0.5, positions.top_lip[0][1]-0.2, 0.8);
    ellipse(positions.top_lip[6][0]+0.5, positions.top_lip[6][1]-0.2, 0.8);

    //nose
    fill(100);
    if(positions.nose_tip[2][1] < 0.1){
      ellipse(positions.nose_tip[1][0], positions.nose_tip[1][1], 0.2, 0.15);
      ellipse(positions.nose_tip[3][0], positions.nose_tip[3][1], 0.2, 0.15);
    }


    if (this.gender < 0 && this.gender <= 0.5){

    ///QUEEN///

      //Hair color
      if(this.hair_color > 0 && this.hair_color <= 1){
        fill(hair_black);
      }else
      if(this.hair_color > 1 && this.hair_color <= 2){
        fill(hair_brown);
      }else
      if(this.hair_color > 2 && this.hair_color <= 3){
        fill(hair_red);
      }else
      if(this.hair_color > 3 && this.hair_color <= 4){
        fill(hair_yellow);
      }

      //Queen hair
      push();
      beginShape();
      curveVertex(positions.chin[0][0]-0.5, positions.chin[0][1]-1);
      curveVertex(positions.chin[1][0]-0.5, positions.chin[1][1]-0.5);
      curveVertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-0.3);
      curveVertex(positions.chin[15][0]+0.1, positions.chin[15][1]-0.3);
      curveVertex(positions.chin[16][0]+0.1, positions.chin[16][1]-1);
      curveVertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1]-1.2);
      curveVertex(positions.left_eyebrow[1][0], positions.left_eyebrow[2][1]-1);
      curveVertex(positions.chin[0][0]-0.5, positions.chin[0][1]-1);
      curveVertex(positions.chin[1][0]-0.5, positions.chin[1][1]-0.5);
      curveVertex(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1]-0.3);
      endShape();
      pop();

      //Hair 'bun'
      let bun = segment_average(positions.chin);
      if(positions.nose_bridge[0][0] < -0.17){
        push();
        translate(positions.nose_bridge[0][0]+map_hairbun2, positions.nose_bridge[0][1]-2.6);
        beginShape();
        curveVertex(bun[0], bun[1]);
        curveVertex(bun[0], bun[1]-1);
        curveVertex(bun[0]+1, bun[1]-1);
        curveVertex(bun[0]+1, bun[1]);
        curveVertex(bun[0], bun[1]);
        curveVertex(bun[0], bun[1]-1);
        curveVertex(bun[0]+1, bun[1]-1);
        endShape();
        pop();
      }else{
        push();
        translate(positions.nose_bridge[0][0]-map_hairbun1, positions.nose_bridge[0][1]-2.6);
        beginShape();
        curveVertex(bun[0], bun[1]);
        curveVertex(bun[0], bun[1]-1);
        curveVertex(bun[0]+1, bun[1]-1);
        curveVertex(bun[0]+1, bun[1]);
        curveVertex(bun[0], bun[1]);
        curveVertex(bun[0], bun[1]-1);
        curveVertex(bun[0]+1, bun[1]-1);
        endShape();
        pop();
      }

      //Queen crown_left shadow
      if (positions.nose_bridge[0][0] < -0.05){
        push();
        fill(shadow);
        translate(positions.nose_bridge[0][0]+0.4, positions.nose_bridge[0][1]-0.8);
        beginShape();
        vertex(-crown_dist/2, -0.5-map_crown2);
        vertex(0.2+crown_dist/2, -0.5-map_crown1);
        vertex(0.2+crown_dist/2, 0);
        vertex(-crown_dist/2, 0);
        endShape();

        triangle(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-0.2, 
         positions.nose_bridge[0][0]-0.6, positions.nose_bridge[0][1]+0.7, 
         positions.nose_bridge[0][0]+0.6, positions.nose_bridge[0][1]+0.7);
        pop();
      }

      //Queen crown_right shadow
      if (positions.nose_bridge[0][0] > 0.05){
        push();
        fill(shadow);
        translate(positions.nose_bridge[0][0]+0.2, positions.nose_bridge[0][1]-0.8);
        beginShape();
        vertex(-crown_dist/2, -0.5-map_crown2);
        vertex(0.2+crown_dist/2, -0.5-map_crown1);
        vertex(0.2+crown_dist/2, 0);
        vertex(-crown_dist/2, 0);
        endShape();

        triangle(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-0.2, 
         positions.nose_bridge[0][0]-0.6, positions.nose_bridge[0][1]+0.7, 
         positions.nose_bridge[0][0]+0.6, positions.nose_bridge[0][1]+0.7);
        pop();
      }

      //Queen crown  
      push();
      fill(gold);
      translate(positions.nose_bridge[0][0]+0.3, positions.nose_bridge[0][1]-0.8);
      beginShape();
      vertex(-crown_dist/2, -0.5-map_crown2);
      vertex(0.2+crown_dist/2, -0.5-map_crown1);
      vertex(0.2+crown_dist/2, 0);
      vertex(-crown_dist/2, 0);
      endShape();

      triangle(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-0.2, 
       positions.nose_bridge[0][0]-0.6, positions.nose_bridge[0][1]+0.7, 
       positions.nose_bridge[0][0]+0.6, positions.nose_bridge[0][1]+0.7);
      
      //Suits
      fill(red);
      translate(positions.nose_bridge[0][0]+0.1, positions.nose_bridge[0][1]+1.7);
      scale(0.5);
      if(this.suits > 0 && this.suits <= 1){
         draw_diamond();
      }
      if(this.suits > 1 && this.suits <= 2){
        draw_heart();
      }
      if(this.suits > 2 && this.suits <= 3){
        draw_spade();
      }
      if(this.suits > 3 && this.suits <=4){
        draw_club();
      }
      pop();

      //Queen mouth
      push();
      fill(255);
      translate(0, 0.2);
      beginShape();
      curveVertex(positions.top_lip[7][0], positions.top_lip[6][1]);
      curveVertex(positions.top_lip[8][0], positions.top_lip[8][1]);
      curveVertex(positions.top_lip[9][0], positions.top_lip[9][1]);
      curveVertex(positions.top_lip[10][0], positions.top_lip[10][1]);
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]);

      curveVertex(positions.bottom_lip[7][0], positions.bottom_lip[6][1]);
      curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]);
      curveVertex(positions.bottom_lip[9][0], positions.bottom_lip[9][1]);
      curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]);
      endShape();
      pop();

      //Queen lips
      fill(red);
      push();
      translate(0, 0.2);
      beginShape();
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]+0.05);
      curveVertex(positions.top_lip[2][0], positions.top_lip[2][1]-0.03);
      curveVertex(positions.top_lip[3][0], positions.top_lip[3][1]);
      curveVertex(positions.top_lip[4][0], positions.top_lip[4][1]);
      curveVertex(positions.top_lip[6][0], positions.top_lip[6][1]+0.05);
      curveVertex(positions.top_lip[8][0], positions.top_lip[8][1]+0.05);
      curveVertex(positions.top_lip[10][0], positions.top_lip[10][1]+0.05);
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]+0.05);
      curveVertex(positions.top_lip[2][0], positions.top_lip[2][1]-0.03);
      curveVertex(positions.top_lip[3][0], positions.top_lip[3][1]);
      endShape();
      beginShape();
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      curveVertex(positions.bottom_lip[1][0], positions.bottom_lip[1][1]);
      curveVertex(positions.bottom_lip[2][0], positions.bottom_lip[2][1]);
      curveVertex(positions.bottom_lip[3][0], positions.bottom_lip[3][1]);
      curveVertex(positions.bottom_lip[5][0], positions.bottom_lip[5][1]);
      curveVertex(positions.bottom_lip[6][0], positions.bottom_lip[6][1]);
      curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]);
      curveVertex(positions.bottom_lip[9][0], positions.bottom_lip[9][1]);
      curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      curveVertex(positions.bottom_lip[1][0], positions.bottom_lip[1][1]);
      curveVertex(positions.bottom_lip[3][0], positions.bottom_lip[3][1]);
      endShape();
      pop();
    }else{

    ///KING///

      //King crown_left shadow
      if (positions.nose_bridge[0][0] > 0.1){
        push();
        fill(shadow);
        translate(-0.1, -0.05);
        beginShape();
        vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]-map_crown1);
        vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]-map_crown2);
        vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]-1.5-map_crown1);
        vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]-1);
        vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-2.3-map_crown1);
        vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]-1);
        vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]-1.5-map_crown2);
        endShape();
        pop();
      }

      //King crown_right shadow
      if (positions.nose_bridge[0][0] < -0.1){
        push();
        fill(shadow);
        translate(0.1, -0.05);
        beginShape();
        vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]-map_crown1);
        vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]-map_crown2);
        vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]-1.5-map_crown1);
        vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]-1);
        vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-2.3-map_crown1);
        vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]-1);
        vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]-1.5-map_crown2);
        endShape();
        pop();
      }

      //King crown
      fill(gold);
      push();
      beginShape();
      vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]-map_crown1);
      vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]-map_crown2);
      vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]-1.5-map_crown1);
      vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]-1);
      vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]-2.3-map_crown1);
      vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]-1);
      vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]-1.5-map_crown2);
      endShape();
      pop();

      push();
      fill(red);
      translate(positions.nose_bridge[0][0]+0.1, positions.nose_bridge[0][1]+0.1);
      scale(0.5);
      if(this.suits > 0 && this.suits <= 1){
         draw_diamond();
      }
      if(this.suits > 1 && this.suits <= 2){
        draw_heart();
      }
      if(this.suits > 2 && this.suits <= 3){
        draw_spade();
      }
      if(this.suits > 3 && this.suits <=4){
        draw_club();
      } 
      pop();

      //King mustache
      fill(mustache);
      beginShape();
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]+0.1);
      curveVertex(positions.top_lip[6][0], positions.top_lip[6][1]+0.1);
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[1][1]+0.8);
      curveVertex(positions.bottom_lip[5][0], positions.bottom_lip[5][1]+0.8);
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]+0.1);
      curveVertex(positions.top_lip[6][0], positions.top_lip[6][1]+0.1);
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[1][1]+0.8);
      endShape();

      fill(255);
      //King mouth
      translate(0, 0.3);
      beginShape();
      curveVertex(positions.bottom_lip[7][0]+0.2, positions.bottom_lip[7][1]);
      curveVertex(positions.top_lip[7][0]-0.2, positions.top_lip[7][1]);
      curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]+this.mouth_open);
      curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]+this.mouth_open);
      curveVertex(positions.bottom_lip[7][0]+0.2, positions.bottom_lip[7][1]);
      curveVertex(positions.top_lip[7][0]-0.2, positions.top_lip[7][1]);
      curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]+this.mouth_open);
      endShape();
    }
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.gender = map(settings[0],0, 1, 0.5, 0);
    this.suits = map(settings[1], 0, 100, 1, 4);
    this.eyeball_move = map(settings[2], 0, 100, -0.1, 0.1);
    this.eye_color = map(settings[3], 0, 100, 1, 4);
    this.blush_color = map(settings[4], 0, 100, 0, 1);
    this.mouth_open = map(settings[5], 0, 100, 0.05, 0.3);
    this.hair_color = map(settings[6], 0, 100, 1, 4);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(7);
    settings[0] = map(this.gender, 0.5, 0, 0, 1);
    settings[1] = map(this.suits, 0, 4, 0, 100);
    settings[2] = map(this.eyeball_move, -0.1, 0.1, 0, 100);
    settings[3] = map(this.eye_color, 1, 4, 0, 100);
    settings[4] = map(this.blush_color, 0, 1, 0, 100);
    settings[5] = map(this.mouth_open, 0.05, 0.3, 0, 100);
    settings[6] = map(this.hair_color, 1, 4, 0, 100);
    return settings;
  }
}

//Suits
function draw_diamond(){
  beginShape();
  vertex(-0.7, -2.5);
  vertex(-0.2, -3);
  vertex(0.3, -2.5);
  vertex(-0.2, -2);
  endShape();
}

function draw_heart(){
  beginShape();
  vertex(-0.7, -2.5);
  vertex(-0.4, -2.8);
  vertex(-0.2, -2.6);
  vertex(0, -2.8);
  vertex(0.3, -2.5);
  vertex(-0.2, -2);
  endShape();
}

function draw_spade(){
  beginShape();
  vertex(-0.7, -2.5);
  vertex(-0.2, -3);
  vertex(0.3, -2.5);
  vertex(0, -2.3);
  vertex(-0.2, -2.5);
  vertex(-0.4, -2.3);
  endShape();
  triangle(-0.2, -2.5, -0.05, -2.1, -0.35, -2.1);
}

function draw_club(){
  beginShape();
  vertex(-0.2, -2.5);
  vertex(-0.35, -2.75);
  vertex(-0.2, -3);
  vertex(-0.05, -2.75);

  vertex(-0.2, -2.5);
  vertex(-0.45, -2.35);
  vertex(-0.7, -2.5);
  vertex(-0.45, -2.65);

  vertex(-0.2, -2.5);
  vertex(0, -2.65);
  vertex(0.3, -2.5);
  vertex(0, -2.35);
  endShape();
  triangle(-0.2, -2.5, -0.05, -2.1, -0.35, -2.1);
}