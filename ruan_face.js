/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 3;

// other variables can be in here too
// these control the colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

function RuanFace() {

  // these are state variables for a face
  // (your variables may be different)
  this.skin = 3;    // 1-5
  this.ear = 1;    // 1-3
  this.blushType = 1; // Can be either 1 or 2


//   * Draw a face with position lists that include:

  this.draw = function(positions) {

      let skin = this.skin;
      let ear = this.ear;
      let mouth = 5;
      let blush = 5;
      let eyebrows_rotate=10;
      let glasses = 5;
      let pupil = 5;

      // Colour Sets
      let skin1 = '#fffaf5';
      let skin2 = '#fff1e4';
      let skin3 = '#fde3cb';
      let skin4 = '#dfb791';
      let skin5 = '#7a5540';

//      let ear1 = '#fffef2';//white
      let ear1 = '#f5deb4';//yellow
      let ear2 = '#4a2e21';//brown
      let ear3 = 'black';//black
//      let ear4 = '#b83835';//red



      let skinColour;
      let earColour;

      let left_eye = average_point(positions.left_eye);
      let right_eye = average_point(positions.right_eye);
      let left_eyebrow = average_point(positions.left_eyebrow);
      let right_eyebrow = average_point(positions.right_eyebrow);

      let left_d = dist(left_eye[0], left_eye[1], left_eyebrow[0], left_eyebrow[1]);
      let right_d = dist(right_eye[0], right_eye[1], right_eyebrow[0], right_eyebrow[1]);
      let left_eb_move = map(left_d, 0.4, 0.7, 0, 2, true);
      let right_eb_move = map(right_d, 0.4, 0.7, 0, 2, true);

      left_eye[0] *= 3;
      left_eye[1] *= 3;
      right_eye[0] *= 3;
      right_eye[1] *= 3;

      push();
      scale(0.33);

       // head
        noStroke();
        fill('#f2a8b9');//babypink
        beginShape();
        curveVertex(0, -3);
        curveVertex(0, -3);
        curveVertex(- 6.3, -3);
        curveVertex(-6.7, 3.5);
        curveVertex(0,5.7);
        curveVertex(6.7, 3.5);
        curveVertex(6.3, -3);
        curveVertex(0, 0);
        curveVertex(0, 0);
        ellipse(0, -1, 14,10);
        endShape();
        bezier(-5, -3, -14, -8, -7, -12, -4, -4);
        bezier(5, -3, 14, -8, 7, -12, 4, -4);


    // Skin Colour
      if(skin == 1){
        skinColour = skin1; //***ALMOST WHITE***//

      }else if (skin == 2){
        skinColour = skin2; //***Light***//

      }else if (skin == 3){
        skinColour = skin3; //***Light2***//

      }else if (skin == 4){
        skinColour = skin4; //***Mild***//

      }else{
        skinColour = skin5; //***Dark***//
      }

      fill(skinColour);
   noStroke();
   beginShape();
   curveVertex(0, -2);
   curveVertex(0, -2);
   curveVertex(- 5.1, -1.2);
   curveVertex(-5.2, 3.2);
   curveVertex(0,5);
   curveVertex(5.2, 3.2);
   curveVertex(5.1, -1.2);
   curveVertex(0, 0);
   curveVertex(0, 0);
   ellipse(0, 0, 11,8);
   endShape();

   // ear Colour
     if(ear == 1){
       earColour = ear1; //***white***//

     }else if (ear == 2){
       earColour = ear2; //***yellow***//

     }else{
       earColour = ear3; //***dark brown***//
     }

   //ear
   fill(earColour);
   noStroke();
   bezier(-5.2, -3.7, -10.5, -7, -8, -10, -4.7, -4.25);
   bezier(5.2, -3.7, 10.5, -7, 8, -10, 4.7, -4.25);

      // Mouth
      stroke('#ce8483');

      let top_lip_point = positions.top_lip[9];
      let bottom_lip_point = positions.bottom_lip[9];
      let d = dist(top_lip_point[0], top_lip_point[1], bottom_lip_point[0], bottom_lip_point[1])

      // Mouth Open
      if(d < 0.1) {
        d = 0;
      }
      mouth = map(d, 0, 0.5, 0, 10);
      let mouth_size = map(mouth, 0, 10, 0, 3);
      strokeWeight(0.2);
      fill('#ee9b90');
      rect(-1, 1.8, 1.6, mouth_size, 2);

      // Eyes
       noStroke();
       fill(0);
       ellipse(left_eye[0], left_eye[1]+3, 0.8, 1.2);
       ellipse(right_eye[0], right_eye[1]+3, 0.8, 1.2);

       // Pupil
       fill('white');
         ellipse(left_eye[0]-0.1, left_eye[1]-0.1+3, 0.3, 0.3); //***LEFT TOP***//
         ellipse(left_eye[0]+0.15, left_eye[1]+0.1+3, 0.2, 0.2); //***LEFT BOTTOM***//
         ellipse(right_eye[0]-0.1, right_eye[1]-0.1+3, 0.3, 0.3); //***RIGHT TOP***//
         ellipse(right_eye[0]+0.15, right_eye[1]+0.1+3, 0.2, 0.2); //***RIGHT BOTTOM***//

       // Eyebrows
       strokeWeight(0.4);
       stroke(90,59,32);//brown

       push();
       angleMode(DEGREES);
       translate(left_eye[0]-0.1, left_eye[1]+2.5);
       translate(0, -left_eb_move);
       rotate(eyebrows_rotate);
       line(-0.3, 0, 0.5, 0);
       pop();

       push();
       angleMode(DEGREES);
       translate(right_eye[0]-0.2, right_eye[1]+2.5);
       translate(0, -right_eb_move);
       rotate(-eyebrows_rotate);
       line(-0.3, 0, 0.5, 0);
       pop();

      // Glasses
       if (glasses > 5 && glasses < 8){
      noStroke();
      }

      // Sunglasses
      else if (glasses > 7 && glasses <= 10){
        noStroke();
    }
    pop();

    if (this.blushType == 1) { // Female blush
    stroke('#f8c2b6');
    strokeWeight(0.08);
    line(left_eye[0]+0.8, left_eye[1]+3.7, left_eye[0]+1, left_eye[1]+3.4);
    line(left_eye[0]+1, left_eye[1]+3.7, left_eye[0]+1.2, left_eye[1]+3.4);
    line(left_eye[0]+1.2, left_eye[1]+3.7, left_eye[0]+1.4, left_eye[1]+3.4);//left
    line(right_eye[0]-1.4, right_eye[1]+3.7, right_eye[0]-1.2, right_eye[1]+3.4);
    line(right_eye[0]-1.2, right_eye[1]+3.7, right_eye[0]-1, right_eye[1]+3.4);
    line(right_eye[0]-1, right_eye[1]+3.7, right_eye[0]-0.8, right_eye[1]+3.4);//right
} else if (this.blushType == 2) { // Male blush
    noStroke();
    fill(255, 176, 120,98);
    ellipse(left_eye[0]+1.2, left_eye[1]+3.7, 0.7);
    ellipse(right_eye[0]-1, right_eye[1]+3.7, 0.7);
}

  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
  this.skin = int(map(settings[0], 0, 100, 1, 5));
  this.blushType = int(map(settings[1], 0, 100, 1, 2));
  this.ear = int(map(settings[2], 0, 100, 1, 3));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(2);
    settings[0] = map(this.skin, 1, 5, 0, 100);
    settings[1] = map(this.blushType, 1, 2, 0, 100);
    settings[2] = map(this.ear, 1, 3, 0, 100);
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
