/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 5;

// other variables can be in here too
// here's some examples for colors used
// const bg_color = [225, 206, 187];
// const fg_color = [60];
// const stroke_color = [95, 52, 8];
const spikeRan = 11;

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
function OBrienFace() {
  // these are state variables for a face
  // (your variables should be different!)

  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_value = 1;  // range is 0.5 to 8
  this.face_shape = 1;
  this.hair_length = 1;
  this.emotion = 1;
  this.hair_colour = 1;

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
    angleMode(DEGREES);
    // head
    let jaw_dist = positions.chin[16][0] - positions.chin[0][0];
    let faceWidth = map(jaw_dist, 3, 4.2, 3.75, 4.5);
    noStroke();

    //body colour (hair colour)
    if(this.hair_colour == 1){
      //black hair
      fill(15);
    }
    else if(this.hair_colour == 2){
      //grey
      fill(80);
    }
    else if(this.hair_colour == 3){
      //brunette light
      fill(120, 103, 96);
    }
    else if(this.hair_colour == 4){
      //brunette dark
      fill(66, 60, 57);
    }
    else if(this.hair_colour == 5){
      //blonde
      fill(224, 205, 164);
    }
    else if(this.hair_colour == 6){
      //red orange
      fill(199, 119, 66);
    }
    else if(this.hair_colour == 7){
      //red
      fill(204, 73, 73);
    }

    //spikes
    push();

    scale(0.25);
    translate(0,0.2);

    if(this.hair_colour == 1){
      //black hair
      stroke(15);
    }
    else if(this.hair_colour == 2){
      //grey
      stroke(80);
    }
    else if(this.hair_colour == 3){
      //brunette light
      stroke(120, 103, 96);
    }
    else if(this.hair_colour == 4){
      //brunette dark
      stroke(66, 60, 57);
    }
    else if(this.hair_colour == 5){
      //blonde
      stroke(224, 205, 164);
    }
    else if(this.hair_colour == 6){
      //red orange
      stroke(199, 119, 66);
    }
    else if(this.hair_colour == 7){
      //red
      stroke(204, 73, 73);
    }

    strokeWeight(0.5);
    line(0,-this.hair_length,0,0); //12 //11.5
    line(0,this.hair_length,0,0); //6
    line(0,0,this.hair_length,0); //3
    line(0,0,-this.hair_length,0); //3
    rotate(15);
    line(0,-this.hair_length,0,0); //12
    line(0,this.hair_length,0,0); //6
    line(0,0,this.hair_length,0); //3
    line(0,0,-this.hair_length,0); //3
    rotate(-15);
    rotate(30);
    line(0,-this.hair_length,0,0); //12
    line(0,this.hair_length,0,0); //6
    line(0,0,this.hair_length,0); //3
    line(0,0,-this.hair_length,0); //3
    rotate(-30);
    rotate(45);
    line(0,-this.hair_length,0,0); //12
    line(0,this.hair_length,0,0); //6
    line(0,0,this.hair_length,0); //3
    line(0,0,-this.hair_length,0); //3
    rotate(-45);
    rotate(60);
    line(0,-this.hair_length,0,0); //12
    line(0,this.hair_length,0,0); //6
    line(0,0,this.hair_length,0); //3
    line(0,0,-this.hair_length,0); //3
    rotate(-60);
    rotate(75);
    line(0,-this.hair_length,0,0); //12
    line(0,this.hair_length,0,0); //6
    line(0,0,this.hair_length,0); //3
    line(0,0,-this.hair_length,0); //3
    rotate(-75);
  pop();

    //face shape
    if(this.face_shape == 1){
      ellipse(0, 0, faceWidth, 4.5);
    }else if(this.face_shape == 2){
      rect(0-(faceWidth/2), -2, faceWidth, faceWidth,1);
    }else if(this.face_shape == 3){
      ellipse(0, 0, faceWidth/1.15, 4.5);
    }

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    //--------------------------------[Eyes]--------------------------------
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
    if(this.emotion == 1) {

      // normal
      noStroke();
      push();
      scale(0.221);
      fill(255);
      ellipse(left_eye_pos[0]-3, left_eye_pos[1], 6.5, 8);
      ellipse(right_eye_pos[0]+3, right_eye_pos[1], 6.5, 8);
      push();
        fill(0);
        ellipse(left_eye_pos[0]-3,left_eye_pos[1], 2, 2);
        ellipse(right_eye_pos[0]+3,right_eye_pos[1], 2, 2);
      pop();
      pop();
    }
    else if(this.emotion == 2) {
      //side eye left
      noStroke();
      push();
      scale(0.221);
      fill(255);
      ellipse(left_eye_pos[0]-3, left_eye_pos[1], 6.5, 8);
      ellipse(right_eye_pos[0]+3, right_eye_pos[1], 6.5, 8);
      push();
        fill(0);
        ellipse(left_eye_pos[0]-5,left_eye_pos[1], 2, 2);
        ellipse(right_eye_pos[0]+1,right_eye_pos[1], 2, 2);
      pop();
      pop();
    }
    else if(this.emotion == 3){
      //side eye right
      noStroke();
      push();
      scale(0.221);
      fill(255);
      ellipse(left_eye_pos[0]-3, left_eye_pos[1], 6.5, 8);
      ellipse(right_eye_pos[0]+3, right_eye_pos[1], 6.5, 8);
      push();
        fill(0);
        ellipse(left_eye_pos[0]-1,left_eye_pos[1], 2, 2);
        ellipse(right_eye_pos[0]+5,right_eye_pos[1], 2, 2);
      pop();
      pop();
    }
    else if(this.emotion == 4){
      //happy
      push();
      scale(0.221);
      noStroke();
      fill(255);
      ellipse(-3+left_eye_pos[0],left_eye_pos[1], 6.5, 8);
      ellipse(3+right_eye_pos[0],right_eye_pos[1], 6.5, 8);
      stroke(0);
      strokeWeight(0.7);
      noFill();
      //right
      bezier(4+right_eye_pos[0]+1,0+right_eye_pos[1],4+right_eye_pos[0]+1,-3+right_eye_pos[1],0+right_eye_pos[0]+1,-3+right_eye_pos[1],0+right_eye_pos[0]+1,0+right_eye_pos[1]);
      //left
      bezier(4+left_eye_pos[0]-5,0+left_eye_pos[1],4+left_eye_pos[0]-5,-3+left_eye_pos[1],0+left_eye_pos[0]-5,-3+left_eye_pos[1],0+left_eye_pos[0]-5,0+left_eye_pos[1]);
      push();
      //body colour (hair colour)
      if(this.hair_colour == 1){
        //black hair
        fill(15);
      }
      else if(this.hair_colour == 2){
        //grey
        fill(80);
      }
      else if(this.hair_colour == 3){
        //brunette light
        fill(120, 103, 96);
      }
      else if(this.hair_colour == 4){
        //brunette dark
        fill(66, 60, 57);
      }
      else if(this.hair_colour == 5){
        //blonde
        fill(224, 205, 164);
      }
      else if(this.hair_colour == 6){
        //red orange
        fill(199, 119, 66);
      }
      else if(this.hair_colour == 7){
        //red
        fill(204, 73, 73);
      }
      noStroke();
        scale(2);
        //right
        translate(-1.5,3);
        bezier(4+right_eye_pos[0]-3,0+right_eye_pos[1],4+right_eye_pos[0]-3,-3+right_eye_pos[1],0+right_eye_pos[0]-3,-3+right_eye_pos[1],0+right_eye_pos[0]-3,0+right_eye_pos[1]);
        translate(5,0);
        //body colour (hair colour)
        if(this.hair_colour == 1){
          //black hair
          fill(15);
        }
        else if(this.hair_colour == 2){
          //grey
          fill(80);
        }
        else if(this.hair_colour == 3){
          //brunette light
          fill(120, 103, 96);
        }
        else if(this.hair_colour == 4){
          //brunette dark
          fill(66, 60, 57);
        }
        else if(this.hair_colour == 5){
          //blonde
          fill(224, 205, 164);
        }
        else if(this.hair_colour == 6){
          //red orange
          fill(199, 119, 66);
        }
        else if(this.hair_colour == 7){
          //red
          fill(204, 73, 73);
        }
        bezier(4+left_eye_pos[0]-3,0+left_eye_pos[1],4+left_eye_pos[0]-3,-3+left_eye_pos[1],0+left_eye_pos[0]-3,-3+left_eye_pos[1],0+left_eye_pos[0]-3,0+left_eye_pos[1]);
      pop();
      pop();
    }
    else if(this.emotion == 5){
      push();
      //sad
      //left
      push();
      scale(0.221);
      translate(-2,3.8);
      beginShape();
      fill(255);
      bezier(2.5+left_eye_pos[0],-7+left_eye_pos[1],1+left_eye_pos[0],0.5+left_eye_pos[1],0+left_eye_pos[0],2+left_eye_pos[1],-4+left_eye_pos[0],-5+left_eye_pos[1]); //big
      //body colour (hair colour)
      if(this.hair_colour == 1){
        //black hair
        fill(15);
      }
      else if(this.hair_colour == 2){
        //grey
        fill(80);
      }
      else if(this.hair_colour == 3){
        //brunette light
        fill(120, 103, 96);
      }
      else if(this.hair_colour == 4){
        //brunette dark
        fill(66, 60, 57);
      }
      else if(this.hair_colour == 5){
        //blonde
        fill(224, 205, 164);
      }
      else if(this.hair_colour == 6){
        //red orange
        fill(199, 119, 66);
      }
      else if(this.hair_colour == 7){
        //red
        fill(204, 73, 73);
      }
      bezier(3+left_eye_pos[0],-7.5+left_eye_pos[1],1+left_eye_pos[0],-2.5+left_eye_pos[1],-4+left_eye_pos[0],-2.5+left_eye_pos[1],-5+left_eye_pos[0],-5.5+left_eye_pos[1]); //small
      endShape()

      beginShape();
      translate(4.2,0)
      fill(255);
      bezier(-2.5+right_eye_pos[0],-7+right_eye_pos[1],-1+right_eye_pos[0],0.5+right_eye_pos[1],0+right_eye_pos[0],2+right_eye_pos[1],4+right_eye_pos[0],-5+right_eye_pos[1]); //big
      //body colour (hair colour)
      if(this.hair_colour == 1){
        //black hair
        fill(15);
      }
      else if(this.hair_colour == 2){
        //grey
        fill(80);
      }
      else if(this.hair_colour == 3){
        //brunette light
        fill(120, 103, 96);
      }
      else if(this.hair_colour == 4){
        //brunette dark
        fill(66, 60, 57);
      }
      else if(this.hair_colour == 5){
        //blonde
        fill(224, 205, 164);
      }
      else if(this.hair_colour == 6){
        //red orange
        fill(199, 119, 66);
      }
      else if(this.hair_colour == 7){
        //red
        fill(204, 73, 73);
      }
      bezier(-3+right_eye_pos[0],-7.5+right_eye_pos[1],-1+right_eye_pos[0],-2.5+right_eye_pos[1],4+right_eye_pos[0],-2.5+right_eye_pos[1],5+right_eye_pos[0],-5.5+right_eye_pos[1]); //small
      endShape();
      pop();

      //pupils
      scale(0.221);
      fill(0);
      noStroke();
      ellipse( 4+left_eye_pos[0], 2.5+left_eye_pos[1], 1.5, 1.5);
      ellipse(-3.8+right_eye_pos[0], 2.2+right_eye_pos[1], 1.5, 1.5);
      pop();
    }
    else if(this.emotion == 6){
      push();
      //angry
      //left
      push();
      scale(0.221);
      translate(-3,3.8);
      beginShape();
      fill(255);
      bezier(-2.5+left_eye_pos[0],-7+left_eye_pos[1],-1+left_eye_pos[0],0.5+left_eye_pos[1],0+left_eye_pos[0],2+left_eye_pos[1],4+left_eye_pos[0],-5+left_eye_pos[1]); //big
      //body colour (hair colour)
      if(this.hair_colour == 1){
        //black hair
        fill(15);
      }
      else if(this.hair_colour == 2){
        //grey
        fill(80);
      }
      else if(this.hair_colour == 3){
        //brunette light
        fill(120, 103, 96);
      }
      else if(this.hair_colour == 4){
        //brunette dark
        fill(66, 60, 57);
      }
      else if(this.hair_colour == 5){
        //blonde
        fill(224, 205, 164);
      }
      else if(this.hair_colour == 6){
        //red orange
        fill(199, 119, 66);
      }
      else if(this.hair_colour == 7){
        //red
        fill(204, 73, 73);
      }
      bezier(-3+left_eye_pos[0],-7.5+left_eye_pos[1],-1+left_eye_pos[0],-2.5+left_eye_pos[1],4+left_eye_pos[0],-2.5+left_eye_pos[1],5+left_eye_pos[0],-5.5+left_eye_pos[1]); //small
      endShape()

      beginShape();
      translate(6.5,0)
      fill(255);
      bezier(2.5+right_eye_pos[0],-7+right_eye_pos[1],1+right_eye_pos[0],0.5+right_eye_pos[1],0+right_eye_pos[0],2+right_eye_pos[1],-4+right_eye_pos[0],-5+right_eye_pos[1]); //big
      //body colour (hair colour)
      if(this.hair_colour == 1){
        //black hair
        fill(15);
      }
      else if(this.hair_colour == 2){
        //grey
        fill(80);
      }
      else if(this.hair_colour == 3){
        //brunette light
        fill(120, 103, 96);
      }
      else if(this.hair_colour == 4){
        //brunette dark
        fill(66, 60, 57);
      }
      else if(this.hair_colour == 5){
        //blonde
        fill(224, 205, 164);
      }
      else if(this.hair_colour == 6){
        //red orange
        fill(199, 119, 66);

      }
      else if(this.hair_colour == 7){
        //red
        fill(204, 73, 73);
      }
      bezier(3+right_eye_pos[0],-7.5+right_eye_pos[1],1+right_eye_pos[0],-2.5+right_eye_pos[1],-4+right_eye_pos[0],-2.5+right_eye_pos[1],-5+right_eye_pos[0],-5.5+right_eye_pos[1]); //small
      endShape();
      pop();

      //pupils
      scale(0.221);
      fill(0);
      noStroke();
      translate(0,2.5);
      ellipse(-2.8+left_eye_pos[0], left_eye_pos[1], 1.5, 1.5);
      ellipse(3.2+right_eye_pos[0], right_eye_pos[1], 1.5, 1.5);
      pop();
    }
    if(this.blushes == 1){
      push();
      scale(0.4,0.35);
      fill(255,184,184);
      ellipse(left_eye_pos[0]-2,left_eye_pos[1]+3.5,2,1.5);
      ellipse(right_eye_pos[0]+2,right_eye_pos[1]+3.5,2,1.5);
      pop();
    }else{
    }
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.face_shape = int(map(settings[0], 0, 100, 1, 3));
    this.hair_length = map(settings[1], 0, 100, 5, 15);
    this.emotion = int(map(settings[2], 0, 100, 1, 6));
    this.hair_colour = int(map(settings[3], 0, 100, 1, 7));
    this.blushes = int(map(settings[4], 0, 100, 1, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(5);
    settings[0] = map(this.face_shape, 1, 3, 0, 100);
    settings[1] = map(this.hair_length, 5, 15, 0, 100);
    settings[2] = map(this.emotion, 1, 6, 0, 100);
    settings[3] = map(this.hair_colour,1, 7, 0, 100);
    settings[4] = map(this.blushes, 1, 2, 0, 100);
    return settings;
  }
}
