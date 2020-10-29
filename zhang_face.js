/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */



// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 10;

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
function ZhangFace() {

    //head color/////////////////////////////
   const orange1 = color (252, 128, 18); //front face color
    const oranget = color(158, 85, 11); //texture's color when orange1
   const orange2 = color (176, 94, 12);//darker orange
    const oranget2 = color(122, 66, 10); //texture's color when orange2
   const orange3 = color (252, 84, 18);//darker that orange2
    const oranget3 = color(126, 41, 7); //texture's color when orange3
   const orange4 = color (44, 5, 49);//most dark orange 94, 49, 4 25, 31, 10
    const oranget4 = color(18, 3, 16); //texture's color when orange3 13, 18, 1

  const evilgreen = color(74, 140, 43);
  const cutevil = color(128, 209, 116);

   const cut = color (242, 151, 61); //color of nose, eyes, mouth


   //vein color
   const green = color(105, 125, 16);
   const dry_vein = color (45, 47, 5);
   const dryer_vein = color (49, 30, 0);




  this.earSize = 5;
  this.earDist = 5;
  this.faceColor = 0;
  this.vein = 5;
  this.vein2 = 5;
  this.mouthshape = -2;
  this.mouth_value = -1;
  this.veinx = 5
  this.vein2x = 5
  this.veingreen = 5;
  this.pupil = 5;
  this.pupily = 5;

  this.leave_num = 0;
    this.blush = 0;

  angleMode(DEGREES);

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge,
   */
  this.draw = function(positions) {
  // lip variables///////////////////////////
  let top_lip0 = positions.top_lip[0];
  let top_lip1 = positions.top_lip[3];
  let top_lip2 = positions.top_lip[6];

  let bottom_lip0 = positions.bottom_lip[0];
  let bottom_lip1 = positions.bottom_lip[3];
  let bottom_lip2 = positions.bottom_lip[6];

  //Eyebrow variables///////////////////////////
  let eyebrow0 = positions. left_eyebrow[0];
  let eyebrow1 = positions. left_eyebrow[1];
  let eyebrow2 = positions. left_eyebrow[2];
  let eyebrow3 = positions. left_eyebrow[3];
  let eyebrow4 = positions. left_eyebrow[4];

  let eyebrow_right0 = positions. right_eyebrow[0];
  let eyebrow_right1 = positions. right_eyebrow[1];
  let eyebrow_right2 = positions. right_eyebrow[2];
  let eyebrow_right3 = positions. right_eyebrow[3];
  let eyebrow_right4 = positions. right_eyebrow[4];

  //head//////////////////////
  let face_pos = segment_average(positions.chin);
    strokeWeight(0.05);
    stroke(0);
    if(this.faceColor == 0) {
      fill(oranget);
    }
    else if (this.faceColor==1) {
      fill(oranget2);
    }
    else if (this.faceColor==2) {
      fill(oranget3);
    }
    else {
      fill(oranget4);
    }

    push();
    rectMode(CENTER);
    rect(face_pos[0]-0.05, face_pos[0],4, 4,1 );
    pop();

      //main vein/////////////////////////////////////////change based on length of hair
      let vein_length = map (this. veingreen, 0, 100, 0, -12);

      if (this.leave_num >= 0 && this.leave_num<1 ) {
        fill(dryer_vein);

      }else if (this.leave_num >= 1 && this.leave_num<2) {
        fill(dry_vein);
      }else {
        fill(green);
      }

      push();
      translate(0, vein_length);
        beginShape();
        vertex(-0.25, -2.25);
        vertex(0.1, -2);
        quadraticVertex(0.4, -1.5, 0.2, -0.5);
        vertex(-0.25, -0.5);
        quadraticVertex(0.3, -0.55, -0.2, -2.25);
        endShape();
      pop();


      let eyebrow_pos = segment_average(positions. right_eyebrow);
      let eyebrow_pos_l = segment_average(positions. left_eyebrow);


  // head///////////////////////////////////////////////////////
    if(this.faceColor == 0) {
      fill(orange1);
    }
    else if (this.faceColor==1) {
      fill(orange2);
    }
    else if (this.faceColor==2) {
      fill(orange3);
    }
    else {
      fill(orange4);
    }

    push();
    rectMode(CENTER);
    rect(0, 0, 4, 4,1);
    pop();


    //pumpkin texture, long stripes//////////////////////////////////////////////////////

    noFill();
    if(this.faceColor == 0) {
      stroke(oranget);
    }
    else if (this.faceColor==1) {
      stroke(oranget2);
    }
    else if (this.faceColor==2) {
      stroke(oranget3);

    }
    else {
      stroke(oranget4);
    }


    strokeWeight(0.15);
    let texture = segment_average(positions.nose_bridge);
    let texture1 = positions.chin[10];
    let texture2 = positions.chin[9];
    let texture3 = positions.chin[7];
    let texture4 = positions.chin[6];

    let short_texture1 = positions.chin[5];
    let short_texture2 = positions.chin[11];

    //long stripes
    arc (texture1[0], 0, 1.5, 3.8,270, 90);
    arc (texture2[0], 0, 1, 3.8,270, 90);

    arc (texture3[0], 0, 1, 3.8, 90, 270);
    arc (texture4[0], 0, 1.5, 3.8, 90, 270);

    stroke(0);
    strokeWeight(0.05);
    arc (texture1[0], 0, 1.5, 4,270, 90);
    arc (texture2[0], 0, 1, 4,270, 90);


    arc (texture3[0], 0, 1, 4, 90, 270);
    arc (texture4[0], 0, 1.5, 4, 90, 270);


    //pupil position//////////////////////////////////////////////////
  let left_eye_pos = segment_average(positions.left_eye);
  let right_eye_pos = segment_average(positions.right_eye);

  let pupil_pos = map (this.pupil, -40,40, -2, 1.5);
  let pupil_posy = map (this.pupily, -40,50, -1.5, 1.5);


  //When draw purple color///////////////////////////////////////
    if (this.faceColor == 3){
          let left = positions. left_eye [0];
          let left1 = positions. left_eye [1];
          let left2 = positions. left_eye [2];
          let left3 = positions. left_eye [3];
          let left4 = positions. left_eye [4];
          let left5 = positions. left_eye [5];



          //purple face, draw green eyes//////////////////
          push();
          translate(-1*left_eye_pos[0],-1*left_eye_pos[1]);
          fill(cutevil);
          scale(2);
          strokeWeight(0.03);
          beginShape();
          vertex(left[0], left[1]);
          vertex(left1[0], left1[1]);
          vertex(left2[0], left2[1]);
          vertex(left3[0], left3[1]);
          vertex(left4[0], left4[1]);
          vertex(left5[0], left5[1]);
          vertex(left[0], left[1]);
          endShape();
          pop();


          push();
          scale(1);
          strokeWeight(0.05);
          stroke(evilgreen);
          fill(evilgreen);
          beginShape();
          vertex(left[0], left[1]);
          vertex(left1[0], left1[1]);
          vertex(left2[0], left2[1]);
          vertex(left3[0], left3[1]);
          vertex(left4[0], left4[1]);
          vertex(left5[0], left5[1]);
          vertex(left[0], left[1]);
          endShape();
          pop();


          let right = positions. right_eye [0];
          let right1 = positions. right_eye [1];
          let right2 = positions. right_eye [2];
          let right3 = positions. right_eye [3];
          let right4 = positions. right_eye [4];
          let right5 = positions. right_eye [5];


          push();
          fill(cutevil);
          strokeWeight(0.03);
          translate(-right_eye_pos[0],-right_eye_pos[1]);
          scale(2);
          beginShape();
          vertex(right1[0]+0.1, right1[1]);
          vertex(right2[0], right2[1]);
          vertex(right3[0], right3[1]);
          vertex(right4[0], right4[1]);
          vertex(right5[0], right5[1]);
          vertex(right[0]+0.1, right[1]);
          endShape(CLOSE);
          pop();


          push();
          stroke(evilgreen);
          strokeWeight(0.01);
          fill(evilgreen);
          noStroke();
          beginShape();
          vertex(right1[0]+0.1, right1[1]);
          vertex(right2[0], right2[1]);
          vertex(right3[0], right3[1]);
          vertex(right4[0], right4[1]);
          vertex(right5[0], right5[1]);
          vertex(right[0], right[1]);
          endShape();
          pop();


    //evil smile/////////////////////////////////////////////////
    stroke(0);
    strokeWeight(0.05);
    fill(cutevil);

    beginShape();
    vertex(top_lip0[0]-0.6,top_lip0[1]-0.8);
    quadraticVertex(top_lip1[0],top_lip1[1]+0.5, top_lip2[0]+0.6,top_lip2[1]-0.8);
    quadraticVertex(bottom_lip0[0]+0.6, bottom_lip0[1]+0.5,bottom_lip1[0],bottom_lip1[1]+0.5);
    quadraticVertex(bottom_lip2[0]-0.6,bottom_lip2[1]+0.5, top_lip0[0]-0.6,top_lip0[1]-0.8);
    endShape();

    fill(evilgreen);
    push();
    beginShape();
    vertex(top_lip0[0]-0.6,top_lip0[1]-0.8);
    quadraticVertex(top_lip1[0]-0.1,top_lip1[1]+0.8, top_lip2[0]+0.55,top_lip2[1]-0.7);
    quadraticVertex(bottom_lip0[0]+0.4, bottom_lip0[1]+0.4,bottom_lip1[0],bottom_lip1[1]+0.3 );
    quadraticVertex(bottom_lip2[0]-0.4,bottom_lip2[1]+0.3, top_lip0[0]-0.6,top_lip0[1]-0.8);
    endShape();
    pop();


    //nose////////////////////////////

    fill(cutevil);
    let nose1 = positions.nose_bridge[1];
    let nose2 = positions.nose_tip[0];
    let nose3 = positions.nose_tip[4];
    beginShape();
    vertex(nose1[0],nose1[1]);
    vertex(nose2[0],nose2[1]);
    vertex(nose3[0],nose3[1]);
    vertex(nose1[0],nose1[1]);
    endShape();

    //nose, the dark part//////////////////////
    fill(evilgreen);
    push();
    noStroke();
    scale(0.8);
    beginShape();
    vertex(nose1[0],nose1[1]);
    vertex(nose2[0],nose2[1]);
    vertex(nose3[0],nose3[1]);
    vertex(nose1[0],nose1[1]);
    endShape();
    pop();

    push();
    noFill();
    beginShape();
    vertex(nose1[0],nose1[1]);
    vertex(nose2[0],nose2[1]);
    vertex(nose3[0],nose3[1]);
    vertex(nose1[0],nose1[1]);
    endShape();
    pop();
    }
    else {

      //when orange face color, draw normal face expression///////////////
      let left_eyepoint = positions.left_eye[5];
      let eye_d = dist (eyebrow2[0], eyebrow2[1], left_eyepoint[0], left_eyepoint[1]);
      if(eye_d<0.1){
        eye_d=0;
      }
      left_eye = map(eye_d, 0, 0.6, 0, 10);
      let eye_size = map(left_eye, 0, 10, 0.1,1);


      fill(cut); // dark orange shadow
      strokeWeight(0.05);
      stroke(0);

      ellipse(left_eye_pos[0], left_eye_pos[1], eye_size/2, eye_size);
      ellipse(right_eye_pos[0], right_eye_pos[1], eye_size/2, eye_size);



      //pupil
      noStroke();
      fill(0);
      ellipse(left_eye_pos[0]+ pupil_pos, left_eye_pos[1]+pupil_posy, eye_size/3, eye_size/1.2);
      ellipse(right_eye_pos[0] +pupil_pos, right_eye_pos[1]+pupil_posy, eye_size/3, eye_size/1.2);

      if(this.faceColor == 0) {
        fill(oranget);
      }
      else if (this.faceColor==1) {
        fill(oranget2);
      }
      else if (this.faceColor==2) {
        fill(oranget3);

      }
      else {
        fill(oranget4);
      }

      stroke(0);
      strokeWeight(0.05);
      ellipse(left_eye_pos[0]- pupil_pos, left_eye_pos[1]-pupil_posy, eye_size/4, eye_size/2);
      ellipse(right_eye_pos[0]- pupil_pos, right_eye_pos[1]-pupil_posy, eye_size/4, eye_size/2);


    //smile mouth//////////////////////////////////////////////
    stroke(0);
    strokeWeight(0.05);
    fill(cut);
    beginShape();
    vertex(top_lip0[0]-0.5,top_lip0[1]-0.5);
    quadraticVertex(top_lip1[0],top_lip1[1]+0.5, top_lip2[0]+0.5,top_lip2[1]-0.5);
    quadraticVertex(bottom_lip0[0], bottom_lip0[1]+0.5,bottom_lip1[0],bottom_lip1[1]);
    quadraticVertex(bottom_lip2[0],bottom_lip2[1]+0.5, top_lip0[0]-0.5,top_lip0[1]-0.5);
    endShape();

    fill(0);
    push();
    beginShape();
    vertex(top_lip0[0]-0.5,top_lip0[1]-0.5);
    quadraticVertex(top_lip1[0],top_lip1[1]+0.7, top_lip2[0]+0.5,top_lip2[1]-0.5);
    quadraticVertex(bottom_lip0[0], bottom_lip0[1]+0.4,bottom_lip1[0],bottom_lip1[1]-0.2 );
    quadraticVertex(bottom_lip2[0],bottom_lip2[1]+0.4, top_lip0[0]-0.5,top_lip0[1]-0.5);
    endShape();
    pop();


    //nose////////////////////////////

    fill(cut);
    let nose1 = positions.nose_bridge[1];
    let nose2 = positions.nose_tip[0];
    let nose3 = positions.nose_tip[4];
    beginShape();
    vertex(nose1[0],nose1[1]);
    vertex(nose2[0],nose2[1]);
    vertex(nose3[0],nose3[1]);
    vertex(nose1[0],nose1[1]);
    endShape();

    //nose, the dark part/////////////////////
    fill(0);
    push();
    noStroke();
    scale(0.8);
    beginShape();
    vertex(nose1[0],nose1[1]);
    vertex(nose2[0],nose2[1]);
    vertex(nose3[0],nose3[1]);
    vertex(nose1[0],nose1[1]);
    endShape();
    pop();
    }


    //eyebrow and small, curve vein////////////////////////////////////////////////////////////////

    let veinlefty = map (this.vein, 0, 100, -1, 10);
    let veinleftx = map (this.veinx, 0, 100, -1, 10);

    let veinrighty = map (this.vein2, 0, 100, -1, 10);
    let veinrightx = map (this.vein2x, 0, 100, -1, 10);
    stroke(1);
    strokeWeight(0.1);

    strokeWeight(0.05);
    push();
    translate(-eyebrow_pos_l[0]+veinleftx,-eyebrow_pos_l[0]+veinlefty );
    scale(2);
    noFill();
    beginShape();
    curveVertex(eyebrow0[0],eyebrow0[1]);
    curveVertex(eyebrow0[0],eyebrow0[1]);
    curveVertex(eyebrow1[0],eyebrow1[1]);
    curveVertex(eyebrow2[0],eyebrow2[1]);
    curveVertex(eyebrow3[0],eyebrow3[1]);
    curveVertex(eyebrow4[0],eyebrow4[1]);
    curveVertex(eyebrow4[0],eyebrow4[1]);
    endShape();
      ellipse(eyebrow_pos_l[0], eyebrow_pos_l[1], 0.3, 0.15);
    pop();

    push();
    translate(-eyebrow_pos[0]+veinrightx ,eyebrow_pos[0]+veinrighty );
    scale(2);
    noFill();
    beginShape();
    curveVertex(eyebrow_right0[0],eyebrow_right0[1]);
    curveVertex(eyebrow_right1[0],eyebrow_right1[1]);
    curveVertex(eyebrow_right2[0],eyebrow_right2[1]);
    curveVertex(eyebrow_right3[0],eyebrow_right3[1]);
    curveVertex(eyebrow_right4[0],eyebrow_right4[1]);
    curveVertex(eyebrow_right4[0],eyebrow_right4[1]);
    ellipse(eyebrow_pos[0], eyebrow_pos[1], 0.3, 0.15);

    endShape();
    strokeWeight(0.03);
    pop();


  //leave number represent the age/////////////////////////////////
    if (this.leave_num >= 0 && this.leave_num<1 ) {


      //draw one leaf represent old face//////////////////
      if(this.faceColor == 0) {
        stroke(oranget);
      }
      else if (this.faceColor==1) {
        stroke(oranget2);
      }
      else if (this.faceColor==2) {
        stroke(oranget3);

      }
      else {
        stroke(oranget4);
      }


      //draw wrinkle/////////////////////////////////////
      noFill();
      push();
      rotate(180);
      arc(texture2[0]-0.5, 2*texture2[0],1.5,1, 50, 130);
      arc(texture2[0]-0.5, 1.5*texture2[0],1.5,1, 50, 130);
      arc(texture2[0]-0.5, texture2[0],1.5,1, 50, 130);
      pop();

      //draw one leaf////////////////////////////
      fill(dryer_vein);
      stroke(0);
        push();
        translate(2*eyebrow2[0], 2* eyebrow2[1]);
        beginShape();
        vertex(0.2,0.2);
        quadraticVertex(0.2, 0.8, 0.8, 0.8);
        quadraticVertex(0.8, 0.2, 0.2, 0.2);
        endShape();
        pop();
    }else if (this.leave_num >= 1 && this.leave_num<2) {

      //draw two leave, represent mature face////////////////////////////
      fill(dry_vein);
        push();
        translate(2*eyebrow2[0], 2* eyebrow2[1]);
        beginShape();
        vertex(0.2,0.2);
        quadraticVertex(0.2, 0.8, 0.8, 0.8);
        quadraticVertex(0.8, 0.2, 0.2, 0.2);
        endShape();
        pop();

        push();
         translate(2*eyebrow_right2[0], 2* eyebrow_right2[1]);
         rotate(90);
         beginShape();
         vertex(0.8,0.8);
         quadraticVertex(0.8, 0, 0, 0);
         quadraticVertex(0, 0.8, 0.8, 0.8);
         endShape();
         pop();

    }else {

      //three leave, yound faces/////////////////////////////////////
      fill(green);
        push();
        translate(2*eyebrow2[0], 2* eyebrow2[1]);
        beginShape();
        vertex(0.2,0.2);
        quadraticVertex(0.2, 0.8, 0.8, 0.8);
        quadraticVertex(0.8, 0.2, 0.2, 0.2);
        endShape();
        pop();

        push();
        translate(2*eyebrow_right2[0], 2* eyebrow_right2[1]);
        rotate(90);
        beginShape();
        vertex(0.8,0.8);
        quadraticVertex(0.8, 0, 0, 0);
        quadraticVertex(0, 0.8, 0.8, 0.8);
        endShape();
        pop();

        push();
        translate(texture[0], -2);
        rotate(120);
        beginShape();
        vertex(0.6,0.6);
        quadraticVertex(0.6, 0, 0, 0);
        quadraticVertex(0, 0.6, 0.6, 0.6);
        endShape();

        beginShape();
        noFill();
        strokeWeight(0.1);
        vertex(0, 0);
        bezierVertex(0, -1, 1, 0, 1, -1);
        endShape();
        pop();
    }


//When people with big smile will have a blush
    if (this.blush >= 0 && this.blush <1.5){
      const blush = color(222, 157, 237);
      fill(blush);
      ellipse(top_lip2[0]+0.8, top_lip2[1]-0.8, 0.5,0.3);
      ellipse(top_lip1[0]-1.4, top_lip2[1]-0.8, 0.5,0.3);

    }

  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.faceColor = int(map(settings[4], 0, 100, 0, 3));
    this.vein = map(settings[3], 0, 100, 0, 10);
    this.veinx = map(settings[5], 0, 100, 0, 10);
    this.vein2 = map(settings[1], 0, 100, 0, 10);
    this.vein2x = map(settings[2], 0, 100, 0, 10);
    this.veingreen = map(settings[0], 0, 100, 0, 10);
    this.pupil = map(settings[6], 0, 100, 0, 10);
    this.pupily = map(settings[7], 0, 100, 0, 10);
    this.leave_num = int(map(settings[8], 0, 100, 0, 3));
    this.blush = int(map(settings[9], 0, 100, 0, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(10);
      settings[0] = map(this.veingreen,0, 10, 0, 100);
      settings[1] = map(this.vein2,0, 10, 0, 100);
      settings[2] = map(this.vein2x,0, 10, 0, 100);
      settings[3] = map(this.vein,0, 10, 0, 100);
      settings[4] = map(this.faceColor, 0,3, 0, 100);
      settings[5] = map(this.veinx,0, 10, 0, 100);
      settings[6] = map(this.pupil,0, 10, 0, 100);
      settings[7] = map(this.pupily,0, 10, 0, 100);
      settings[8] = map(this.leave_num,0, 3, 0, 100);
      settings[9] = map(this.blush,0, 2, 0, 100);
    return settings;
  }
}
