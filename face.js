/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 5;

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
  this.lash_scale = 2;
  this.eye_col_index = 0;
  this.lip_style = 0;
  this.shade = 0;
  this.hue = 0;

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

    colorMode(HSL);

    let eye_col1 = color(255,100,50);
    let eye_col2 = color(125,100,50);
    let eye_col3 = color(50,100,50);
    let eye_colours = [eye_col1,eye_col2,eye_col3];

    let s1 = color((255 + this.hue)%360,80,30,0.4);
    let s2 = color((280 + this.hue)%360,80,40,0.1);
    let s3 = color((300 + this.hue)%360,80,60,0.1);
    let s4 = color((310 + this.hue)%360,80,80,0.1);
    let shadow_colours = [s1,s2,s3,s4];

    
    let face_base_colour = color((200 + this.hue)%360, 50, 100 - this.shade/3);
    let outline_colour = color(150,100,5);


    //let face_col = color();

    // positive = looking left
    // negative = looking right
    let direction = (nose_bridge[0][0] - (chin[chin.length-1][0] - (chin[0][0] - chin[chin.length-1][0])/2))/((chin[0][0] - chin[chin.length-1][0])/2)-2;
    // print(direction);


    // FACE BASE
    let brow_h = -0.2;
    push();
      beginShape();
        noStroke();
        fill(face_base_colour);
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


    // WATERCOLOURING ////////////////////////////////////

    // nose/eyelid
    noStroke(); // could make fringe effect w/o?
    push();
      beginShape();
      fill(shadow_colours[0]);
        curveVertex(right_eyebrow[0][0], right_eyebrow[0][1] + brow_h/2);
        curveVertex(nose_bridge[0][0], nose_bridge[0][1]);
        curveVertex(nose_bridge[3][0], nose_bridge[3][1]);
        curveVertex(nose_tip[2][0], nose_tip[2][1]);
        curveVertex(nose_tip[4][0], nose_tip[4][1]);
        // curveVertex(nose_tip[4][0], nose_tip[2][1] + (nose_tip[2][1]-nose_tip[4][1]));
        curveVertex(nose_tip[4][0] + abs(nose_tip[4][0] - nose_tip[2][0])/2,
                     right_eye[4][1] + 0.7 );
        curveVertex(right_eye[0][0] - 0.1, right_eye[0][1] + brow_h/4);
        curveVertex(right_eye[1][0], right_eye[1][1] + brow_h/4);
        // curveVertex(right_eye[2][0], right_eye[2][1] + brow_h/4);
        curveVertex(right_eyebrow[2][0], right_eyebrow[2][1]);
        curveVertex(right_eyebrow[1][0], right_eyebrow[1][1] + brow_h/2);

        curveVertex(right_eyebrow[0][0], right_eyebrow[0][1] + brow_h/2);
        curveVertex(nose_bridge[0][0], nose_bridge[0][1]);
      endShape();
    pop();

    // under nose / keep this or not?
    push();
      fill(shadow_colours[0]);
      beginShape();
        curveVertex(nose_tip[0][0] - 0.01, nose_tip[0][1]);
        curveVertex(nose_tip[4][0] + 0.01, nose_tip[4][1]);
        curveVertex(nose_tip[2][0] - direction/4, nose_tip[2][1] + 0.2);
        curveVertex(nose_tip[0][0] - 0.01, nose_tip[0][1]);
        curveVertex(nose_tip[4][0] + 0.01, nose_tip[4][1]);
      endShape();
    pop();

    // eyelid
    push();
      fill(shadow_colours[0]);
      beginShape();
        curveVertex(left_eye[3][0] + 0.15, left_eye[3][1] - 0.05);
        curveVertex(left_eye[2][0], left_eye[2][1] - 0.1);
        curveVertex(left_eyebrow[2][0], left_eyebrow[2][1] + (left_eye[1][0] - left_eyebrow[2][1])/2);
        //curveVertex(left_eyebrow[2][0], left_eyebrow[2][1] + brow_h/4);
        curveVertex(left_eyebrow[3][0], left_eyebrow[3][1] + brow_h/4);
        curveVertex(left_eyebrow[4][0], left_eyebrow[4][1] + brow_h/4);

        curveVertex(left_eye[3][0] + 0.15, left_eye[3][1] - 0.05);
        curveVertex(left_eye[2][0], left_eye[2][1] - 0.05);
      endShape();
    pop();
    
    // chin
    push();
      fill(shadow_colours[0]);
      beginShape();
        curveVertex(bottom_lip[2][0], bottom_lip[2][1] + 0.05);
        // curveVertex(bottom_lip[3][0], bottom_lip[3][1] + 0.05);
        curveVertex(bottom_lip[4][0], bottom_lip[4][1] + 0.05);
        curveVertex(chin[8][0] - direction/1.5, chin[8][1] - (chin[8][1] - bottom_lip[3][1])/1.5);

        curveVertex(bottom_lip[2][0], bottom_lip[2][1] + 0.05);
        curveVertex(bottom_lip[4][0], bottom_lip[4][1] + 0.05);

        // curveVertex(bottom_lip[3][0], bottom_lip[3][1] + 0.05);
      endShape();
    pop();

    // face side
    push();
      fill(shadow_colours[0]);
      beginShape();
        curveVertex(right_eyebrow[3][0], right_eyebrow[3][1] + brow_h/2);
        curveVertex(right_eyebrow[4][0], right_eyebrow[4][1] + brow_h/2);
        curveVertex(chin[15][0], chin[15][1]);
        curveVertex(chin[13][0], chin[13][1]);
        curveVertex(chin[11][0], chin[11][1]);
        curveVertex(chin[9][0], chin[9][1]);
        curveVertex(top_lip[6][0] + (chin[12][0] - top_lip[6][0])/2 , top_lip[6][1]);
        curveVertex(nose_bridge[1][0] + (chin[15][0] - nose_bridge[1][0])/1.5, nose_bridge[2][1]);
        curveVertex(right_eye[3][0] + (chin[15][0] - right_eye[3][0])/2, right_eye[3][1]);


        curveVertex(right_eyebrow[3][0], right_eyebrow[3][1] + brow_h/2);
        curveVertex(right_eyebrow[4][0], right_eyebrow[4][1] + brow_h/2);
      endShape();
    pop();

    ///////////////////////////////////////////////////////////////////////////////////////////

    // LIPS
    print(top_lip[9][1] - bottom_lip[9][1]);
    fill(outline_colour);
    noStroke();
    if(abs(top_lip[9][1] - bottom_lip[9][1]) < 0.1){ // if lip close
      if(this.lip_style == 0){
        beginShape();
          for(let i = 0; i< int(top_lip.length/2) ; i++){
            vertex(top_lip[i][0], top_lip[i][1]);
          }
          for(let i = 0; i< int(bottom_lip.length/2) ; i++){
            vertex(bottom_lip[i][0], bottom_lip[i][1]);
          }
        endShape();
      }
      else{
        push();
          noStroke();
          fill(outline_colour);
          beginShape();
            for(let i = 0; i< top_lip.length; i++){
              vertex(top_lip[i][0], top_lip[i][1]);
            }
          endShape();
          stroke(outline_colour);
          strokeWeight(0.08);
          strokeCap(ROUND);
          noFill();
          beginShape();
          curveVertex(bottom_lip[1][0], bottom_lip[1][1]);
          curveVertex(bottom_lip[2][0], bottom_lip[2][1]);
          curveVertex(bottom_lip[3][0], bottom_lip[3][1]);
          curveVertex(bottom_lip[4][0], bottom_lip[4][1]);
          curveVertex(bottom_lip[5][0], bottom_lip[5][1]);
          endShape();
        pop();
          
      }
    }
    else{ // mouth open
      if(this.lip_style == 0){
        push();
        noStroke();
        fill(outline_colour);
        beginShape();
          curveVertex(top_lip[top_lip.length-1][0], top_lip[top_lip.length-1][1]);
          for(let i = 0; i <top_lip.length; i++){
            curveVertex(top_lip[i][0], top_lip[i][1]);
          }
          curveVertex(top_lip[0][0], top_lip[0][1]);
          curveVertex(top_lip[1][0], top_lip[1][1]);
        endShape();
      pop();
      push();
        noStroke();
        fill(outline_colour);
        beginShape();
          curveVertex(bottom_lip[bottom_lip.length-1][0], bottom_lip[bottom_lip.length-1][1]);
          for(let i = 0; i <bottom_lip.length; i++){
            curveVertex(bottom_lip[i][0], bottom_lip[i][1]);
          }
          curveVertex(bottom_lip[0][0], bottom_lip[0][1]);
          curveVertex(bottom_lip[1][0], bottom_lip[1][1]);
        endShape();
      pop();  
      }
      else{
        push();
          noStroke();
          fill(outline_colour);
          strokeWeight(0.04);
          strokeCap(ROUND);
          beginShape();
            for(let i = 0; i< top_lip.length; i++){
              vertex(top_lip[i][0], top_lip[i][1]);
            }
          endShape();

          noFill();
          stroke(outline_colour);
          beginShape();
            for(let i = int(bottom_lip.length/2) + 1; i < bottom_lip.length; i++){
              vertex(bottom_lip[i][0], bottom_lip[i][1]);
            }
          endShape();

          beginShape();
            curveVertex(bottom_lip[1][0], bottom_lip[1][1]);
            curveVertex(bottom_lip[2][0], bottom_lip[2][1]);
            curveVertex(bottom_lip[3][0], bottom_lip[3][1]);
            curveVertex(bottom_lip[4][0], bottom_lip[4][1]);
            curveVertex(bottom_lip[5][0], bottom_lip[5][1]);
          endShape();
        pop();
      }
    }


    // EYEBROWS
    let eyebrow_thicknessR = (right_eye[0][1] - right_eyebrow[0][1])/8 + 0.02;
    let eyebrow_thicknessL = (left_eye[4][1] - left_eyebrow[4][1])/8 + 0.02;
    push();
      translate(0,-0.1);
      fill(outline_colour);
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

    ///// right eye /////////
    
    let tempRY = right_eye[3][1]+(right_eye[3][1] - right_eye[2][1])/2
    let tempRX = right_eye[3][0] + 0.05;
    
    // under eye right watercolor
    push();
      beginShape();
        fill(shadow_colours[0]);
        translate(right_eye_pos[0], right_eye_pos[1]);
        scale(1.5,2);
        translate(-right_eye_pos[0], -right_eye_pos[1]);
        curveVertex(right_eye[5][0], right_eye[5][1] + 0.04);
        curveVertex(right_eye[4][0], right_eye[4][1]);
        curveVertex(right_eye[3][0], right_eye[3][1] + 0.05);
        curveVertex(tempRX + 0.05,tempRY);
        curveVertex(right_eye[4][0], right_eye[4][1] + 0.1);
        
        curveVertex(right_eye[5][0], right_eye[5][1] + 0.04);
        curveVertex(right_eye[4][0], right_eye[4][1]);
      endShape();
    pop();

    push();
      strokeCap(SQUARE);
      translate(right_eye_pos[0], right_eye_pos[1]);
      scale(1.5,2);
      translate(-right_eye_pos[0], -right_eye_pos[1]);

      beginShape();
        stroke(outline_colour);
        strokeWeight(this.lash_scale * 0.04);
        noFill();
        curveVertex(right_eye[0][0], right_eye[0][1]);
        curveVertex(right_eye[0][0], right_eye[0][1]);
        curveVertex(right_eye[1][0], right_eye[1][1]);
        curveVertex(right_eye[2][0], right_eye[2][1]);
        curveVertex(right_eye[3][0], right_eye[3][1]);
        curveVertex(tempRX + 0.05,tempRY);
        curveVertex(tempRX + 0.05,tempRY);
      endShape();
      
      fill(outline_colour);
      noStroke();
      let e_height = dist(right_eye[4][0],right_eye[4][1],right_eye[2][0],right_eye[2][1]);
      ellipse(right_eye_pos[0],right_eye_pos[1],0.25, e_height);
      fill(eye_colours[this.eye_col_index]);
      ellipse(right_eye_pos[0],right_eye_pos[1]+0.03,0.2,e_height/2);
      fill(255,150);
      ellipse(right_eye_pos[0],right_eye_pos[1]+0.03,0.15,e_height/2);
      fill(outline_colour);
      ellipse(right_eye_pos[0],right_eye_pos[1],0.15,e_height/2);
      fill(outline_colour);

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
    let tempY = left_eye[0][1]+(left_eye[0][1] - left_eye[1][1])/2
    let tempX = left_eye[0][0] - 0.05;

    push(); // left under eye watercolour
      fill(shadow_colours[0]);
      translate(left_eye_pos[0], left_eye_pos[1]);
      scale(1.5,2);
      translate(-left_eye_pos[0], -left_eye_pos[1]);
      beginShape();
        curveVertex(left_eye[5][0], left_eye[5][1] + 0.02);
        curveVertex(left_eye[4][0], left_eye[4][1] + 0.02);
        let x2 = min(left_eye[3][0], left_eyebrow[4][0] +(nose_bridge[0][0] - left_eyebrow[4][0])/2); // 2 or 1.1?
        curveVertex(x2,left_eye[3][1] + 0.08);
        curveVertex(left_eye[4][0], left_eye[4][1] + 0.08);

        curveVertex(left_eye[5][0], left_eye[5][1] + 0.02);
        curveVertex(left_eye[4][0], left_eye[4][1] + 0.02);
      endShape();
    pop();


    push();
      strokeCap(SQUARE);
      translate(left_eye_pos[0], left_eye_pos[1]);
      scale(1.5,2);
      translate(-left_eye_pos[0], -left_eye_pos[1]);

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
      stroke(outline_colour);
      strokeWeight(this.lash_scale * 0.04);
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
      fill(outline_colour);
      noStroke();
      e_height = dist(positions.left_eye[4][0],positions.left_eye[4][1],positions.left_eye[2][0],positions.left_eye[2][1]);
      ellipse(left_eye_pos[0],left_eye_pos[1],0.25, e_height);
      fill(eye_colours[this.eye_col_index]);
      ellipse(left_eye_pos[0],left_eye_pos[1]+0.03,0.2,e_height/2);
      fill(255,150);
      ellipse(left_eye_pos[0],left_eye_pos[1]+0.03,0.15,e_height/2);
      fill(outline_colour);
      ellipse(left_eye_pos[0],left_eye_pos[1],0.15,e_height/2);
      fill(outline_colour);


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




    // NOSE
    stroke(outline_colour);
    noFill();
    strokeWeight(0.08);
    if(abs(nose_tip[2][0] - nose_bridge[3][0]) > 0.08){
      if(nose_tip[2][0] - nose_bridge[3][0] > 0){
        // //line(nose_bridge[0][0],nose_bridge[0][1], nose_tip[0][0], nose_tip[0][1]);
        // beginShape();
        //   curveVertex(left_eyebrow[4][0],left_eyebrow[4][1] + brow_h/2);
        //   curveVertex(left_eyebrow[4][0],left_eyebrow[4][1] + brow_h/2);
        //   curveVertex(left_eyebrow[4][0] +(nose_bridge[0][0] - left_eyebrow[4][0])/1.1, nose_bridge[0][1]);
        //   // curveVertex(nose_bridge[0][0], nose_bridge[0][1]);
        //   //curveVertex(nose_bridge[1][0], nose_bridge[1][1]);
        //   curveVertex(nose_bridge[2][0], nose_bridge[2][1]);
        //   //curveVertex(nose_bridge[3][0], nose_bridge[3][1]);
        //   //curveVertex(nose_bridge[3][0], nose_bridge[3][1]);
        //    curveVertex(nose_tip[0][0], nose_tip[0][1]);
        //   // curveVertex(nose_tip[1][0], nose_tip[1][1]);
        //   // curveVertex(nose_tip[2][0], nose_tip[2][1]);
        //   // curveVertex(nose_tip[2][0], nose_tip[2][1]);
          
        // endShape();
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
        beginShape();
          curveVertex(right_eyebrow[0][0], right_eyebrow[0][1] + brow_h/2);
          curveVertex(right_eyebrow[0][0], right_eyebrow[0][1] + brow_h/2);
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

    colorMode(RGB);
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    // eye col?
    this.lash_scale = int(map(settings[0], 0, 100, 1, 2));
    this.eye_col_index = int(map(settings[1], 0, 100, 0, 2));
    this.lip_style = int(map(settings[2], 0, 100, 0, 1));
    this.shade = settings[3];
    this.hue = settings[4];
    // this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    // this.eye_shift = map(settings[1], 0, 100, -2, 2);
    //this.mouth_value = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.lash_scale, 1, 2, 0, 100);
    settings[1] = map(this.eye_col_index, 0, 2, 0, 100);
    settings[2] = map(this.lip_style, 0, 1, 0, 100);
    settings[3] = this.shade;
    settings[4] = this.hue;
    return settings;
  }
}
