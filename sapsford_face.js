/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// Number of required sliders
var NUM_SLIDERS = 9;


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

// Defining Face object
function SapsfordFace() {
  //my variables to test
  this.eye_type = 0; //which style of eye
  this.head_width = 10; //head width (also used to proportionately calculate the size of certain features)
  this.head_height = 5; //head height (also used to proportionately calculate the size of certain features)
  this.lash = 0; //whether or not the eyes have eyelashes
  this.helmet_colour = 0; //colour of the helmet
  this.skin_colour = 0; //skin tone
  this.hair_colour = 0; //hair colour, also for eyebrow colour
  this.mouth_type = 0; //which style of mouth
  this.hairstyle = 0; //which style of hair

  //the colour of the helmet: cyan to yellow on a gradient
  const primaryColours = ['#1cf3ff','#55E9BF','#8EE080','#C6D640','#FFCC00']
  //the corresponding colours used for the 'ears' of the helmet. Darker, muted shades of the above colours
  const secondaryColours = ['#2b8084','#427B63','#597642','#707121','#876C00']
  //skin colours, from fairest, to darkest
  const skinColours = ['#ffedd6','#ffdbac','#f1c27d','#e0ac69','#c68642','#8d5524'] //credit for this palette goes to 'messrskoonyfootseven' on color-hex.com
  //hair colours: light blonde, dark blonde, light brown, dark brown, black.
  const hairColours = ['#ffd54d','#c4a335','#876132','#2D2315','#0f0e0b']


  this.draw = function(positions) {
    //setting my preferred draw modes for various methods
    rectMode(RADIUS);
    ellipseMode(RADIUS);
    colorMode(RGB);
    angleMode(DEGREES);

    //internal variables to solve 'scope' problem
    let headW = map(this.head_height,0,100,3,9)
    let headH = map(this.head_width,0,100,2,6.5)
    let eye = this.eye_type;
    let lashes = this.lash
    let helmC = this.helmet_colour
    let skin = this.skin_colour
    let hairC = this.hair_colour
    let mouth = this.mouth_type
    let hair = this.hairstyle
    //Mapped positions
    let leftEye = segment_average(positions.left_eye)
    let rightEye = segment_average(positions.right_eye)
    let leftLip = positions.top_lip[0] //left corner of top lip
    let rightLip = positions.top_lip[5] //right corner of top lip
    let lipMid = positions.bottom_lip[9] //middle of bottom lip
    let browS = positions.left_eyebrow[0] //start of eyebrow
    let browE = positions.left_eyebrow[4] //end of eyebrow
    //ear covers for the helmet
    fill(secondaryColours[helmC]);
    noStroke();
    ellipse(headW*0.9,0,headW*0.35,headH*0.5)
    ellipse(-headW*0.9,0,headW*0.35,headH*0.5)
    //helmet
    fill(primaryColours[helmC]);
    rect(0,0,headW,headH,headH*0.6);
    //face
    fill(skinColours[skin])
    circle(0,0,headH-0.2)
    //blush
    fill(247,178,197)
    circle(headW*0.35,headH*0.4,0.75)
    circle(-headW*0.35,headH*0.4,0.75)
    //eyes
    if (eye < 1){ //wide open
      if(lashes == 1){
        stroke(0)
        strokeWeight(0.175)
        line(leftEye[0],-headH*0.175,leftEye[0]-1.2,-headH*0.175)
        line(leftEye[0],-headH*0.05,leftEye[0]-1.3,-headH*0.05)
        line(rightEye[0],-headH*0.175,rightEye[0]+1.2,-headH*0.175)
        line(rightEye[0],-headH*0.05,rightEye[0]+1.3,-headH*0.05)

      }
      fill(255)
      stroke(0)
      strokeWeight(0.1);
      circle(leftEye[0]-0.25,0,headH*0.3)
      circle(rightEye[0]+0.25,0,headH*0.3)
      fill(0);
      noStroke();
      circle(leftEye[0]-0.15,headH*0.05,headH*0.22)
      circle(rightEye[0]+0.35,headH*0.05,headH*0.22)
    } if (eye == 1){ //square
        if(lashes == 1){
          stroke(0)
          strokeWeight(0.175)
          line(leftEye[0],headH*0.175,leftEye[0]-1.2,headH*0.175)
          line(leftEye[0],headH*0.05,leftEye[0]-1.3,headH*0.05)
          line(rightEye[0],headH*0.175,rightEye[0]+1.2,headH*0.175)
          line(rightEye[0],headH*0.05,rightEye[0]+1.3,headH*0.05)
        }
        fill(255)
        stroke(0)
        strokeWeight(0.1);
        rect(leftEye[0]-0.25,headH*0.05,headH*0.3,headH*0.25,headW*0.15)
        rect(rightEye[0]+0.25,headH*0.05,headH*0.3,headH*0.25,headW*0.15)
        fill(0);
        noStroke();
        circle(leftEye[0]-0.25,headH*0.1,headH*0.22)
        circle(rightEye[0]+0.25,headH*0.1,headH*0.22)
      } if (eye == 2){ //half open
          if(lashes == 1){
            stroke(0)
            strokeWeight(0.175)
            line(leftEye[0],0,leftEye[0]-1.5,headH*0.175)
            line(leftEye[0],headH*0.05,leftEye[0]-1.6,headH*0.05)
            line(rightEye[0],0,rightEye[0]+1.5,headH*0.175)
            line(rightEye[0],headH*0.05,rightEye[0]+1.6,headH*0.05)
          }
          fill(255)
          stroke(0)
          strokeWeight(0.1);
          arc(leftEye[0]-0.35,-headH*0.1,headH*0.4,headH*0.4,355,185,CHORD)
          arc(rightEye[0]+0.35,-headH*0.1,headH*0.4,headH*0.4,355,185,CHORD)
          fill(0);
          noStroke();
          circle(leftEye[0]-0.35,(headH*0.1),headH*0.22)
          circle(rightEye[0]+0.35,(headH*0.1),headH*0.22)
      }
    //mouth
    if (mouth == 0){ //neutral
      stroke(0)
      strokeWeight(0.2);
      line(leftLip[0],1,rightLip[0],1)
    } if (mouth == 1){ //smile
      stroke(0)
      strokeWeight(0.2);
      beginShape()
      curveVertex(leftLip[0],1)
      curveVertex(leftLip[0],1)
      curveVertex(lipMid[0],1.1)
      curveVertex(rightLip[0],1)
      curveVertex(rightLip[0],1)
      endShape()
    } if (mouth == 2){ //wide grin
        stroke(0);
        fill(186, 89, 116)
        strokeWeight(0.1);
        arc(lipMid[0],headH*0.35,headH*0.2,headH*0.3,360,180,CHORD)
    }
    //hair (if 0, draw nothing)
    if (hair == 1){ //sprig style
      stroke(hairColours[hairC])
      strokeWeight(0.25)
      noFill()
      beginShape()
      curveVertex(headW*0.2,-headH-0.4)
      curveVertex(headW*0.15,-headH-0.4)
      curveVertex(headW*0.05,-headH-0.3)
      curveVertex(0,-headH+0.2)
      curveVertex(headW*0.1,-headH-0.1)
      curveVertex(headW*0.15,-headH)
      endShape()
    }if (hair == 2){ //tuft style
      stroke(hairColours[hairC])
      strokeWeight(0.25)
      line(0,-headH+0.3,0,-headH+0.9)
      line(0,-headH+0.3,0.2,-headH+0.7)
      line(0,-headH+0.3,-0.2,-headH+0.7)
    }
    //eyebrows
    stroke(hairColours[hairC])
    strokeWeight(0.4)
    line(-headW*0.45,browS[1]+0.5,-headW*0.2,browE[1]+0.5)//draws symmetrically to keep the style consistent 
    line(headW*0.45,browS[1]+0.5,headW*0.2,browE[1]+0.5)

    rectMode(CORNER);
    ellipseMode(CENTER);
    // colorMode(RGB);
    // angleMode(RADIANS);
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.head_width = map(settings[0], 0, 100, 1, 10);
    this.head_height = map(settings[1], 0, 100, 1, 10);
    this.eye_type = int(map(settings[2], 0, 100, 0, 2));
    this.lash = int(map(settings[3], 0, 100, 0, 1));
    this.helmet_colour = int(map(settings[4], 0, 100, 0, 4));
    this.skin_colour = int(map(settings[5], 0, 100, 0, 5));
    this.hair_colour = int(map(settings[6], 0, 100, 0, 4));
    this.mouth_type = int(map(settings[7], 0, 100, 0, 2));
    this.hairstyle = int(map(settings[8], 0, 100, 0, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(9);
    settings[0] = map(this.head_width, 0, 10, 0, 100);
    settings[1] = map(this.head_height, 0, 10, 0, 100);
    settings[2] = int(map(this.eye_type, 0, 2, 0, 100));
    settings[3] = int(map(this.lash, 0, 1, 0, 100));
    settings[4] = int(map(this.helmet_colour, 0, 4, 0, 100));
    settings[5] = int(map(this.skin_colour, 0, 5, 0, 100));
    settings[6] = int(map(this.hair_colour, 0, 4, 0, 100));
    settings[7] = int(map(this.mouth_type, 0, 2, 0, 100));
    settings[8] = int(map(this.hairstyle, 0, 2, 0, 100));
    return settings;
  }
}
