/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 5;

// other variables can be in here too
// these control the colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

function LuoFace() {

  // these are state variables for a face
  // (your variables may be different)
  this.face = 4;    // 1-5
  this.spot = 5;      // 0-10
  this.shape = 1;

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

      let face = this.face;
      let mouth = 5;
      let blush = 5;
      let spot = this.spot;
      let spot_col = 5;
      let spot_size = 1;
      let eyebrows_rotate = 50;
      let glasses = 5;
     

      // Colour Sets
      let face1 = '#ffe3fc'; //white
      let face2 = '#f5ad8e'; //pink
      let face3 = '#fcf06a'; //yellow
      let face4 = '#d9764c'; //brown
      let face5 = '#66756a'; //grey
      let face6 = '#315070'; //blue
      let face7 = '#8a5189'; //purple
      let face8 = '#a65561'; //red
      let face9 = '#5b8a5a'; //green
      let face10 = '#de4e26'; //orange
      


      let faceColour;

      let left_eye = average_point(positions.left_eye);
      let right_eye = average_point(positions.right_eye);
      let left_eyebrow = average_point(positions.left_eyebrow);
      let right_eyebrow = average_point(positions.right_eyebrow);

      let left_d = dist(left_eye[0], left_eye[1], left_eyebrow[0], left_eyebrow[1]);
      let right_d = dist(right_eye[0], right_eye[1], right_eyebrow[0], right_eyebrow[1]);
      let left_eb_move = map(left_d, 0.4, 0.7, 0, 2, true);
      let right_eb_move = map(right_d, 0.4, 0.7, 0, 2, true);


      // print(left_d); 

      left_eye[0] *= 3;
      left_eye[1] *= 3;
      right_eye[0] *= 3;
      right_eye[1] *= 3;

      push();
      scale(0.33);

      // Rabbit (Brown)
      //fill(221,168,128);
      strokeWeight(0.3);
      stroke(0);
      beginShape();
      endShape();

      if(this.shape <2){
     //soft SHAPES
     noStroke();

    // Face Colour
      if(face == 1){
        faceColour = face1; //***WHITE***//

      }else if (face == 2){
        faceColour = face2; //***dark***//

      }else if (face == 3){
        faceColour = face3; //***Yellow***//

      }else if (face == 4){
        faceColour = face4; //***Brown***//

      }else{
        faceColour = face5; //***Grey***//
      } 

    
      fill(faceColour);
      strokeWeight(0.3);
      stroke(0);
      ellipse(-0.5, 1.8, 15, 11);
    
      push();
      angleMode(RADIANS);
      arc(-3.9, -3, 4.5, 16, -4, -0.4);//ear left
      arc(2.4, -3.2, 5, 16, -2.8, 0.65);//ear right
      pop();

    } else {
      //unsoft shape
      if(face == 1){
        faceColour = face6; //***WHITE***//

      }else if (face == 2){
        faceColour = face8; //***dark***//

      }else if (face == 3){
        faceColour = face7; //***Yellow***//

      }else if (face == 4){
        faceColour = face9; //***Brown***//

      }else{
        faceColour = face10; //***Grey***//
      } 

      fill(faceColour);
      strokeWeight(0.2);
      stroke(0);
      rect(-8, -4, 15, 11);
    
      push();
      angleMode(RADIANS);
      rect(-3, -4, -2.5, -9.5);
      rect(5, -4, -3, -6.5);

      //arc(-3.9, -3, 4.5, 16, -4, -0.4);//ear left
      //arc(2.4, -3.2, 5, 16, -2.8, 0.65);//ear right

      

      pop();
    }


      // spot (Colour, Spot)
      let amount = map(spot_col, 0, 10, 0, 1);
      let colourWhite = color('#dbdbdb');
      let colourDark = color('#e6655c');
      let spotColour = lerpColor(colourWhite, colourDark, amount);

      let spotFace = map(spot, 0, 100, 0, 100);

      let spotS = map(spot_size, 0, 100, 1.3, 15);

      strokeWeight(spotS);
      stroke(spotColour);

      if (spotFace == 0){
      }

      if (spotFace >= 2){

        line(-0.5, -3, -0.5, -2);
      }
      if (spotFace >=4){
        line(-6.5, 3, -3, 3);
      }
      if (spotFace >=6){
      line(2.5, 2, 5.5, 2);
      }
      if (spotFace >=8){
      line(3, 0, 5.5, 0);
      }
      if (spotFace >=10){
      line(-6.5, 0.5, -4.5, 0.5);
      }

      // Mouth
      strokeWeight(0.4);
      stroke(0);
      line(-1.55, -1, -0.05, -1); 

      let top_lip_point = positions.top_lip[9];
      let bottom_lip_point = positions.bottom_lip[9];
      // fill(255, 0, 0);
      let d = dist(top_lip_point[0], top_lip_point[1], bottom_lip_point[0], bottom_lip_point[1])
      // print(d);

      // Mouth Open
      if(d < 0.1) {
        d = 0;
      }
      mouth = map(d, 0, 0.5, 0, 10);
      let mouth_size = map(mouth, 0, 10, 0, 3.5);
      strokeWeight(0.3);
      fill('#fffcf7');
      rect(-1.6, 2, 1.6, mouth_size, 0.08);

      // Blush
      noStroke();
      if (blush > 3 && blush < 6){ 
      fill('#ed4415'); //red
      ellipse(-3.6, 0.5, 1.5, 1);
      ellipse(2.3, 0.5, 1.5, 1);
      } 

      // Eyes
      noStroke();
      fill(0);
      // ellipse(-2.2, -2, 1.1, 1.1);
      // ellipse(0.5, -2, 1.1, 1.1);
      ellipse(left_eye[0], left_eye[1]+ 1.5, 2, 2); //eye size left
      ellipse(right_eye[0] - 1.6, right_eye[1] + 1.7, 2, 2);

 

      // Eyebrows
      strokeWeight(0.5);
      stroke(0);

      push();
      angleMode(DEGREES);
      //translate(left_eye[0]-0.1, left_eye[1]-1);
      //translate(0, -left_eb_move);
      //rotate(eyebrows_rotate);
      line(0.5, -2.5, 2.5, -2.5);
     
      pop();

      push();
      angleMode(DEGREES);
      //translate(right_eye[0]-0.2, right_eye[1]-1);
      //translate(0, -right_eb_move);
      //rotate(-eyebrows_rotate);
      line(-3.5, -2.5, -1.5, -2.5);
      pop();



      // Glasses
       if (glasses > 5 && glasses < 8){
      stroke(0);
      strokeWeight(0.35);
      noFill();
      ellipse(-2.3, -2.4, 2.6, 2.6);
      ellipse(0.6, -2.4, 2.6, 2.6);
      }

      // Sunglasses
      else if (glasses > 7 && glasses <= 10){
        stroke(0);
        strokeWeight(0.3);
        fill('white');
        ellipse(-2.6, -2.4, 3, 2.6);
        ellipse(1, -2.4, 3, 2.6);
        noStroke();
        fill('black');
        ellipse(-2.6, -2.37, 2.4, 2);
        ellipse(1, -2.37, 2.4, 2);
        stroke(0);
        strokeWeight(0.3);
        line(-1.1, -2.5, -0.65, -2.5);
    }
    pop();
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.face = int(map(settings[0], 0, 100, 1, 5));
    this.spot = int(map(settings[1], 0, 100, 0, 10));
    this.shape = map(settings[2],0,100,1,2);
   
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(2);
    settings[0] = map(this.face, 1, 5, 0, 100);
    settings[1] = map(this.spot, 0, 10, 0, 100);
    settings[82] = map(this.shape, 1, 2, 0, 100);
    
    return settings;
  }
}

// given an array of [x,y] points, return the average
function average_point(list) {
  var sum_x = 0;
  var sum_y = 0;
  var num_points = 0;
  for(var i=0; i<list.length; i++) {
    sum_x += list[i][0];
    sum_y += list[i][1];
    num_points += 1; 
  }
  return [sum_x / num_points, sum_y / num_points];
}