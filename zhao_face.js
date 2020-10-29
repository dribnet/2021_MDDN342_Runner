/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 4;

// other variables can be in here too
// here's some examples for colors used

// angleMode(DEGREES);
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
/*
 * s1:tilt_value is in degrees from -30 to 25 and controls how the lips rotate
 * s2:lipsHeight ranges from 0.3 to -1 and controls the distance between nose and mouth
 * s3:lipsSize ranges from 0.7 to 1.5 and controls the scale of the mouth
 * s4:browpeakX ranges from -7 to -4 and controls the x position of the browpeak
 * s5:browpeakY ranges from -3 to -5 and controls the y position of the browpeak
 * s6:eyelashLength ranges from 1 to 3.5 and controls the length of the eyelash and eyeshadows
 * s7:nevusX ranges from 3 to 5 and controls the x position of the nevus
 * s8:nevusY ranges from 1 to 6 and controls the y position of the nevus
 * s9: blurLength decides how long the eyeshadow flows down the face
 */
function ZhaoFace() {
  const green = [210,221,185];//green
  const blue = [179, 198, 193];
  const fg_color3 = [151, 102, 52];
  const red = [196, 29, 54];
  const pink = [240, 55, 144];
  const purple = [222, 199, 255];
  const faceColor = [217, 160, 143];
  const black = [0,0,0];
  const darkblue = [49, 50, 56];

  // these are state variables for a face

  this.eyelashLength = 0.56;
  this.eyeShape = 1;
  this.tearValue = 1;
  this.lipColor = 0.5;   


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
  }

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
  // scale(2.5/10) //a quarter of the original size
  let left_eye_pos = segment_average(positions.left_eye);
  let right_eye_pos = segment_average(positions.right_eye);
  //head----------------------------------------------------
  noStroke();
  push();
    translate(-2/4,0.5/4);
    rotate(-27);
    fill(blue);//blue
    ellipse(0,0, 30/2.2/4,5);
  pop();

  fill(faceColor);
  push();
    translate(2.3/4,0);
    rotate(15);
    ellipse(0,0, 30/2.2/4, 5);
  pop();

  //nose----------------------------------------------------
  let nose_top = positions.nose_bridge[0];
  let nose_bottom = positions.nose_bridge[3];
  let nose32 = positions.nose_tip[1];
  let nose34 = positions.nose_tip[3];
  let nose_apex = positions.nose_tip[2];

  let nd = nose_apex[1]-nose_bottom[1];

  // print(dist(nose_bottom[0],nose_bottom[1],nose_apex[0],nose_apex[1]));

  let nose_end = null;
  let nose_hole = null;
  let eyebrow_start = null;
  let eyebrow_end = null;
  let eyebrow_peak = null;
  let dx = null;
  let dy = null;
  let rightY = null;
  let leftY = null;


 
  noFill();
  beginShape();
  //turn right
  if(nose_top[0]<nose_bottom[0]&&abs(nose_top[0]-nose_bottom[0])>=0.05){
    if(nd >=0.33){
      nose_end = positions.nose_tip[2];
      nose_apex = positions.nose_tip[2]
    }
    else{
      nose_end = positions.nose_tip[0];      
    }
    eyebrow_start = positions.right_eyebrow[0];
    eyebrow_peak = positions.right_eyebrow[2];
    eyebrow_end = positions.right_eyebrow[4];
    // nose_hole = positions;
    dx = 0.55;
    rightY = right_eye_pos[1]+0.2;
    leftY = left_eye_pos[0]+0.7;
 
  }
  else if(abs(nose_top[0]-nose_bottom[0])<0.05){
    nose_end = positions.nose_tip[2];
    eyebrow_start = positions.right_eyebrow[0];
    eyebrow_peak = positions.right_eyebrow[2];
    eyebrow_end = positions.right_eyebrow[4];
    rightY = right_eye_pos[1]+0.4;
    leftY = left_eye_pos[0]+0.4;
    dx = 0.55;

  }
  //turn left
  else{
    if(nd > 0.33){
      nose_end = positions.nose_tip[3];
      nose_apex = positions.nose_tip[3];

    }
    else{
      nose_end = positions.nose_tip[4];      
    }
    eyebrow_start = positions.left_eyebrow[4];
    eyebrow_peak = positions.left_eyebrow[2];
    eyebrow_end = positions.left_eyebrow[1];
    dx = -0.55;
    rightY = right_eye_pos[1]+0.7;
    leftY = left_eye_pos[0]+0.2;
  }
  //right eyes ----------------------------------------------------
  var rightX = right_eye_pos[0]+0.2;

  

  if(this.eyeShape == 1){//quad
    var Dx = 2.5/4;
    var Dy = 0.3;
    var e1={x:rightX-Dx,y:rightY},e2={x:rightX,y:rightY-Dy},
        e3={x:rightX+Dx,y:rightY},e4={x:rightX,y:rightY+Dy};

    // eyelash-----------------------------------
    stroke(0);
    strokeWeight(0.075);
    push();
      translate(rightX,rightY);
      for(i=0;i<=7;i++){
          if (i == 3||i == 4) {
            stroke(faceColor);
          } 
          else {
            stroke(0);
          }
          rotate(45*i);
          strokeCap(SQUARE);
          strokeWeight(0.075);
          line(0,0,0,-this.eyelashLength);
      }
      push();
        noStroke();
        fill(faceColor);
        scale(this.eyelashLength*2);//0.25~0.875
        ellipse(0,0,0.7,0.6);
      pop();
    pop();
    
    fill(255,245,245);
    stroke(0);
    quad(e1.x,e1.y,e2.x,e2.y,e3.x,e3.y,e4.x,e4.y);
    fill(217, 184, 198);
    ellipse(rightX,rightY,0.5/4,0.5);

  }


  else if(this.eyeShape ==0){//cross
    noFill();
    stroke(0);
    push();
      var leftX = left_eye_pos[0]-0.3;//-0.4
      translate(rightX,rightY);
      rotate(45);
      for(i=0;i<=4;i++){
        rotate(90*i);
        strokeWeight(0.075);
        strokeCap(SQUARE);
        line(0,0,0,-1.7/4);
      }
    pop();


  }
  else{//ellipse

  // eyelash-----------------------------------
  stroke(0);
  strokeWeight(0.075);
  push();
    translate(rightX,rightY);
    for(i=0;i<=7;i++){
        if (i == 3||i == 4) {
          stroke(faceColor);
        } 
        else {
          stroke(0);
        }
        rotate(45*i);
        strokeCap(SQUARE);
        strokeWeight(0.075);
        line(0,0,0,-this.eyelashLength);
    }

    noStroke();
    push();
      fill(faceColor);
      scale(this.eyelashLength*2);//0.25~0.875
      ellipse(0,0,1,0.5);
    pop();
  pop();

    fill(255,245,245);
    stroke(0);
    ellipse(rightX,rightY,1,0.5);//right

    //pupils----------------------------------------------------
    fill(217, 184, 198);
    ellipse(rightX,rightY, 0.5/4, 0.5); 

  }
 
  

  //left cross eye----------------------------------------------------
  noFill();
  stroke(0);
  push();
    var leftX = left_eye_pos[0]-0.3;//-0.4
    translate(leftX,leftY);
    rotate(45);
    for(i=0;i<=4;i++){
        rotate(90*i);
        strokeWeight(0.3/4);
        strokeCap(SQUARE);
        line(0,0,0,-1.7/4);
    }
  pop();

  strokeWeight(0.075);
    curveVertex(eyebrow_end[0]+dx,eyebrow_end[1]);//eyebrow ends
    curveVertex(eyebrow_end[0]+dx,eyebrow_end[1]);
    curveVertex(eyebrow_peak[0]+dx/2,eyebrow_peak[1]);//browpeak
    curveVertex(eyebrow_start[0]+dx/3,eyebrow_start[1]);//browstart  
    curveVertex(nose_top[0],nose_top[1]);//connect brow and nose
    curveVertex(nose_bottom[0], nose_bottom[1]);
    curveVertex(nose_apex[0],nose_apex[1]);//nose apex
    curveVertex(nose_end[0],nose_end[1]);//nose end
    curveVertex(nose_end[0],nose_end[1]);//nose end
  endShape();


  // mouth----------------------------------------------------
  let mouth_left = positions.top_lip[0];//48
  let mouth_right = positions.top_lip[6];//54


  let lipbow1 = positions.top_lip[2];//50
  let lipbow2 = positions.top_lip[4];//52

  let lip62 = positions.top_lip[9];//62
  let lip66 = positions.bottom_lip[9];//66
  let lip61 = positions.bottom_lip[10];
  let lip65 = positions.bottom_lip[10];

  let lip57 = positions.bottom_lip[3];//57
  let lip51 = positions.top_lip[3];//51
  let lip56 = positions.bottom_lip[2];
  let lip58 = positions.bottom_lip[4];

  let mouthHei = lip57[1]-lipbow1[1];//57-50
  let mouthWid = mouth_right[0]-mouth_left[0];
  let mouthY = mouthHei/2+lip51[1];//57-50
  let mouthX = mouthWid/2+mouth_left[0];

  let openWid = mouthWid*0.85;
  let openHei = lip66[1]-lip62[1];
  let openY = lip62[1]+openHei/2;
  let openX = lip61[0]+(lip65[0]-lip61[0])/2;

  
  // // text---------------------------------------------------
  // textSize(0.08);
  // fill(0);
  // noStroke();
  // for(let i = 0;i<positions.bottom_lip.length;i++){
  //   let b = positions.bottom_lip[i];
  //   let t = positions.top_lip[i];
  //   text(i,t[0],t[1]);
  //   text(i,b[0],b[1]);
  // }

  //lips
  noStroke();
  if (this.lipColor == 0) {
    fill(red);

  } 
  else {
    fill(black);
  }
  beginShape();
    curveVertex(mouth_left[0],mouth_left[1]);
    curveVertex(lipbow1[0],lipbow1[1]);
    // curveVertex(lip51[0],lip51[1]);
    curveVertex(lipbow2[0],lipbow2[1]);
    curveVertex(mouth_right[0],mouth_right[1]);
    curveVertex(lip56[0],lip56[1]);
    // curveVertex(lip57[0],lip57[1]);
    curveVertex(lip58[0],lip58[1]);
  endShape(CLOSE);

  //open
  var ox = 0.2;
  fill(faceColor);
  beginShape();
    curveVertex(mouth_left[0]+ox,mouth_left[1]);
    curveVertex(lip62[0],lip62[1]);
    curveVertex(mouth_right[0]-ox,mouth_right[1]);
    curveVertex(lip66[0],lip66[1]);
  endShape(CLOSE);



  //tears----------------------------------------------------
  strokeWeight(0.05);
  let rEyeDis = 0.375;
  let q1 = {x:leftX, y:leftY+rEyeDis};
  let tW = 0.5/4;
  let tH = 1/4;
  let q2 = {x:q1.x-tW, y:q1.y+tH};
  let q3 = {x:q1.x, y:q1.y+2*tH};
  let q4 = {x:q1.x+tW, y:q1.y+tH};
  var tearD = 2.5/4;//diatance between each tear

      
      stroke(255);
      fill(purple);
      quad(q1.x,q1.y,q2.x,q2.y,q3.x,q3.y,q4.x,q4.y);

}

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.lipColor = int(map(settings[0], 0, 100, 0, 1));
    this.eyeShape = int(map(settings[1], 0, 100, 0, 2));
    this.tearValue = int(map(settings[2], 0, 100, 0, 3));
    this.eyelashLength = map(settings[3],0,100,0.25,0.875);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(2);
    settings[0] = int(map(this.lipColor,0, 1, 0, 100));
    settings[1] = int(map(this.eyeShape, 0, 2, 0, 100));
    settings[2] = int(map(this.tearValue, 0, 3, 0, 100));
    settings[3] = map(this.eyelashLength, 0.25,0.875, 0, 100);
    return settings;
  }
}
