 /*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
 var NUM_SLIDERS = 8;

// other variables can be in here too
// here's some examples for colors used

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
function WeiFace() {
  // these are state variables for a face
  // (your variables should be different!)
  const yellow = color(255,255,0);
  const blue = color(255,255,0);
  const red = color(200,0,0);
  const violet = color(150,0,150);
  const error_green = color(150,0,150);

  this.ecolor = 1;
  this.mood = 1;
  this.color = 2;
  this.eye_shift = -1;   
  this.fcolor = 1;
  this.eyedist = 0;
  this.eu = 0;


  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  


  this.draw = function(positions) {
   

   //body
  
   strokeWeight(0.05);
   noStroke();
   push();
    if (this.fcolor == 0 ){
        fill(247, 247, 247);

    }else if (this.fcolor == 1 ){
       fill(245, 201, 135);

    } else if (this.fcolor == 2){
       fill(143, 89, 60);

    } else if (this.fcolor == 3){
        fill(23, 23, 22);

    } else if (this.fcolor == 4){
        fill(74, 47, 48);

    }
   scale(0.8);
        beginShape();
        curveVertex(-3.4, 1.5);
        curveVertex(-3.4, 1.5);
        curveVertex(-2, -3.9);
        curveVertex(1, -3.95);
        curveVertex(3, 0.5);
         vertex(2.5,0.5);
         vertex(2,1.5);
         vertex(1.5,2);
         vertex(0.5,1.5);
         vertex(0,2);
         vertex(-0.5,1.5);
         vertex(-1,1.2);
         vertex(-1.4,1.4);
         vertex(-1.8,1.2);
         vertex(-2.2,1.7);
         vertex(-2.8,1.2);
         vertex(-3.4, 1.5);
         vertex(-3.4, 1.5);
         endShape();
         pop();
     
   


   

   let top_lip = positions.top_lip[0];
    let top2_lip = positions.top_lip[9];
   let bottom_lip = positions.top_lip[6];
   let coner_lip = positions.bottom_lip[4];
   let conertwo_lip = positions.bottom_lip[1];
   let chin  = positions.chin[3];
   let chintwo = positions.chin[13]; 
   let chinsix = positions.chin[6];
   let left_eyebrow = positions.left_eyebrow[2];
   let lefttwo_eyebrow = positions.left_eyebrow[3];
   let leftthree_eyebrow = positions.left_eyebrow[4];
   let right_eyebrow = positions.right_eyebrow[0];
   let righttwo_eyebrow = positions.right_eyebrow[1];
   let rightthree_eyebrow = positions.right_eyebrow[2];
  
   let nose_tip = positions.nose_tip[1];
   let nosetwo_tip = positions.nose_tip[3];
   let nose_bridge = positions.nose_bridge[3];

   // print(top_lip,bottom_lip);

 //mouth
  stroke(10,10,10);
  strokeWeight(0.25); 
  stroke(10,10,10);
  push();
  strokeWeight(0.05); 
   scale(2);
   noFill();
   beginShape();
   curveVertex(chin[0]-0.1, chin[1]-0.5);
   curveVertex(chin[0]-0.1, chin[1]-0.5);
   curveVertex(top_lip[0], top_lip[1]-0.7);
   curveVertex(coner_lip[0], coner_lip[1]-0.7);
   curveVertex(conertwo_lip[0], conertwo_lip[1]-0.7);
   curveVertex(chintwo[0], chintwo[1]-0.7);
   curveVertex(chintwo[0], chintwo[1]-0.7);
   endShape();
   pop();

   //eye
   noStroke();
  if (this.ecolor == 0 ){
        fill(92, 132, 181);

    }else if (this.ecolor == 1 ){
       fill(171, 111, 85);

    } else if (this.ecolor == 2){
       fill(13, 12, 12);

    } 
  let left_eye_pos = segment_average(positions.left_eye);
  let right_eye_pos = segment_average(positions.right_eye); 

   ellipse(left_eye_pos[0],left_eye_pos[1],1.2,0.4);
   ellipse(right_eye_pos[0],right_eye_pos[1],1.2,0.4);
   noStroke();


   //eye ball 
   fill(255);
    ellipse(left_eye_pos[0]+this.eyedist,left_eye_pos[1]+this.eu,0.3);
   ellipse(right_eye_pos[0]+this.eyedist,right_eye_pos[1]+this.eu,0.3);

  for (let i = 0; i<positions.left_eye.length; i++){
    let pos = positions.left_eye[i];
   
  }

 
   //nose
 push();
 noStroke();
 fill(0,0,0);
 triangle(nose_tip[0], nose_tip[1], nosetwo_tip[0], nosetwo_tip[1], nose_bridge[0], nose_bridge[1]);
 pop();
 
  //eyebrow
  stroke(135,134,130);
  strokeWeight(0.1); 
  beginShape();
  curveVertex(left_eyebrow[0], left_eyebrow[1]);
  curveVertex(left_eyebrow[0], left_eyebrow[1]);
  curveVertex(lefttwo_eyebrow[0], lefttwo_eyebrow[1]);
  curveVertex(leftthree_eyebrow[0], leftthree_eyebrow[1]);
  curveVertex(leftthree_eyebrow[0], leftthree_eyebrow[1]);
  endShape();
 
  beginShape();
  curveVertex(right_eyebrow[0], right_eyebrow[1]);
  curveVertex(right_eyebrow[0], right_eyebrow[1]);
  curveVertex(righttwo_eyebrow[0], righttwo_eyebrow[1]);
  curveVertex(rightthree_eyebrow[0], rightthree_eyebrow[1]);
  curveVertex(rightthree_eyebrow[0], rightthree_eyebrow[1]);
  endShape();
  noStroke();

  

  //float 
     strokeWeight(0.5);
     push();
     noFill();
 //float color
    if (this.color == 0 ){
        stroke(247, 247, 247);

    }else if (this.color == 1 ){
       stroke(245, 201, 135);

    } else if (this.color == 2){
       stroke(143, 89, 60);

    } else if (this.color == 3){
        stroke(23, 23, 22);

    } else if (this.color == 4){
        stroke(23, 23, 22);

    }
    
 // float setting (happy or not)
   if ( top_lip[1] < top2_lip[1] || this.mood == 2){      
   
   ellipse(nose_tip[0],-3.5,3,1.5);       

    } else if ( top_lip[1] > top2_lip[1] || this.mood == -2)

    {    
        strokeWeight(0.1)
        if (this.color == 0 ){
        fill(247, 247, 247);

    }else if (this.color == 1 ){
       fill(245, 201, 135);

    } else if (this.color == 2){
       fill(143, 89, 60);

    } else if (this.color == 3){
        fill(23, 23, 22);

    } else if (this.color == 4){
        fill(23, 23, 22);

    } 

        triangle(chinsix[0]-1,-2.5,chinsix[0]-0.9,-4,chinsix[0],-3.2);
       

    }

    
    
    pop();
        

 
  }


  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.color = int(map(settings[0], 0, 100, 0, 5));
    this.fcolor = int(map(settings[1], 0, 100, 0, 4));
    this.mood = int(map(settings[2], 0, 100, -2, 2));
    this.ecolor = int(map(settings[3], 0, 100, 0, 2));
    this.eyedist = map(settings[4], 0, 100, -1, 1);
    this.eu = map(settings[5], 0, 100, -2, 2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    settings[0] = map(this.color, 0, 5, 0, 100);
    settings[1]  = map(this.fcolor,0, 4, 0, 100);
    settings[2]  = map(this.mood,-2, 2, 0, 100);
    settings[3]  = map(this.ecolor,0, 2, 0, 100);
    settings[4] = map(this.eyedist, -1, 1, 0, 100);
    settings[5] = map(this.eu, -2, 2, 0, 100);
    return settings;
  }
}
