/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 7;


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
function PalmerFace() {
  // these are state variables for a face
  // (your variables should be different!)


 this.faceColour = 2.5; //between 1 and 3 - white orange and black cat face colour
 this.mouthValue = 3; // between 2 and 3,mouth closed mouth and open mouth
 this.pupilSize = 0.5; //how big the pupil is, between 0.4 and 0.8
 this.pupilRandX = 3; //this is not actually random - it is which direction the pupil is looking. left or right.
 this.earType = 1; //between 1 and 2, ears up or ears flat
 this.stripeNum = 2; //number of stripes between 2 and 3, 1 stripe or 3 stripes.
 //this.faceOffset = 0;
 this.mouthDrop = 1.5; //only works when mouthValue = 3, how far down the bottom of the mouth is. 

//******draws one eye*******
this.draw_eye = function(xPos,pupilRandX, pupilSize,yPos){
  push();
  let pupilPosX = pupilRandX //the pupil can move across the x axis.
  fill(235);//light grey
  noStroke();
  beginShape(); //shadows of the eye
    vertex(xPos, yPos); 
    bezierVertex(xPos + .2, yPos - 3, xPos + 6, yPos - 3, xPos + 7, yPos);
    bezierVertex(xPos + 6.5, yPos + 2.5, xPos + .2, yPos + 2.5, xPos, yPos);
  endShape();

  fill(255); //white
  noStroke();
  beginShape(); //normal white eye  
    vertex(xPos, yPos);
    bezierVertex(xPos + .2, yPos - 2.5, xPos + 6.3, yPos - 2.3, xPos + 6.95, yPos - .05);
    bezierVertex(xPos + 6.5, yPos + 2.5, xPos + .4, yPos + 2.5, xPos, yPos);
  endShape();

  fill(0);//black
  ellipse(xPos + pupilPosX, yPos, pupilSize); //draws the pupil
  fill(255);//white
  ellipse(xPos + pupilPosX + .1, yPos - .2, pupilSize * .6); //draws the pupil shine
  pop();
}
 //*****draws the mouth in both forms*****
 this.drawMouth = function(mouthValue, xCoM, yCoM, faceColours) {
  //xCoM and yCoM (for Coord Mouth) allow you to move the mouths position with only an x and y input
  //let this.mouthDrop = .7; //how far the bottom of the mouth drops down from the top
  var mouthStroke = color(0);

  if (faceColours <= 2) { //changes mouth stroke colour depending on face colour
    mouthStroke = color(43, 42, 42); //for black cat
  } else if (faceColours >= 2) {
    mouthStroke = color(107, 61, 31); //for ginger cat 
  } else if (faceColours >=3){
    mouthStroke = color(110, 106, 106); //for white cat
  }

  let mouthFill = color(161, 79, 84); //sets the colour inside cats mouth

  if (mouthValue == 2) {     //closed mouth
    noFill();
    strokeWeight(.2);
    stroke(mouthStroke);
    beginShape();
      vertex(xCoM, yCoM); //starts shape leftmost vertex
      bezierVertex(xCoM + .5, yCoM + 0.7, xCoM + 1.5, yCoM + 0.7, xCoM + 2, yCoM);
      bezierVertex(xCoM + 2.5, yCoM + 0.7, xCoM + 3.5, yCoM + 0.7, xCoM + 4, yCoM);
    endShape();
  } else if (mouthValue == 3) {    //open mouth
    noStroke();
    fill(mouthFill);
    //first bit is filling under the mouth
    beginShape();
      vertex(xCoM + 1, yCoM + 0.7);
      bezierVertex(xCoM + 1.5, yCoM + 0.7 + .3, xCoM + 2.4, yCoM + 0.7 + .5, xCoM + 2, yCoM);
    endShape();
    beginShape();
      vertex(xCoM + 2, yCoM);
      bezierVertex(xCoM + 1.8, yCoM + 0.7 + .5, xCoM + 2.5, yCoM + 0.7 + .5, xCoM + 3, yCoM + 0.7);
    endShape();

    noFill();
    stroke(mouthStroke);
    strokeWeight(.2);

    //this bit draws the open part of the mouth, this.mouthdrop moves it up and down.
    fill(mouthFill);
    beginShape();
      curveVertex(xCoM + 2, yCoM +1);
      curveVertex(xCoM + .7, yCoM +0.5);
      curveVertex(xCoM + 2, yCoM +this.mouthDrop);
      curveVertex(xCoM + 3.3, yCoM +0.5);
      curveVertex(xCoM + 2, yCoM +1);
    endShape();
    noFill();
    //this bit draws the closed mouth
    beginShape();
      vertex(xCoM, yCoM); //starts shape leftmost vertex
      bezierVertex(xCoM + .5, yCoM + 0.7, xCoM + 1.5, yCoM + 0.7, xCoM + 2, yCoM);
      bezierVertex(xCoM + 2.5, yCoM + 0.7, xCoM + 3.5, yCoM + 0.7, xCoM + 4, yCoM);
    endShape();
  }
}


  this.draw = function(positions) { ///draws with positions
    scale(4/10); //reset scale to fit this project.
    noStroke();
    //getting a point to determine which direction the facial features are pointing 
      let facedirec = positions.nose_bridge[3][0]; //this is the last x coordinate of the nose bridge.
      let facedirecUP = positions.nose_bridge[3][1]; //same point, but the y coordinate instead
      this.faceOffset= map(facedirec,0.82,0.2,3,1); ///mapping the nose to the cats face offset to determine if looking left or right
      this.faceOffsetUP = map(facedirecUP,0,.2,0,.2);//moves the face slightly up or down

      //*****determine if the mouth is OPEN or CLOSED***** 
      let toplipx = positions.top_lip[9][0];
      let toplipy = positions.top_lip[9][1];
      let bottomlipx = positions.bottom_lip[9][0];
      let bottomlipy = positions.bottom_lip[9][1];
      let lipdif = bottomlipy-toplipy;//difference between the two lip points

      //draw the mouth based on this 
       if(lipdif> 0.1 ){ //if the mouth is OPEN (lips are far enough apart)
        this.mouthValue = 3
      } else { //if the lips are too close together, draw the mouth closed
        this.mouthValue = 2
      }

  ///move the bottom of the mouth based on how far apart the lips are
    this.mouthDrop = map(lipdif,0.1,0.53,1,1.9);
    this.pupilRandX =map(facedirec,-0.82,0.5,1,6);


  //code to determine if person is SMILING or FROWNNING
    let mouthavetop = segment_average(positions.top_lip);
    let mouthavebottom = segment_average(positions.bottom_lip);
    let lipcorner = positions.top_lip[0][1];
    let lipcorner2 = positions.bottom_lip[6][1];
    let lipcornerAve = (lipcorner+lipcorner2)/2;
    let mouthavex = (mouthavetop[0]+mouthavebottom[0])/2;
    let mouthavey = (mouthavetop[1]+mouthavebottom[1])/2;

      //draw ears based on if the person is happy or not
  if (mouthavey-0.03>=lipcornerAve){ //if the person is similing, draw the ears upwards
    this.earType=1
  } else if (mouthavey-0.03<=lipcornerAve){ //if the person is frowning, draw the ears flat
    this.earType=2
  }

  //**draw pupil size based on how big their eyes are**
  let eyeTopY = positions.right_eye[1][1];
  let eyeBottomY = positions.right_eye[5][1];

  let eyedif = eyeBottomY- eyeTopY; //distance between the eyelinds
  this.pupilSize = map(eyedif,0.16,0.2,0.4,0.8); //distance mapped to pupil size

      
//this if statement changes various colours based on which face colour the cat has.
if (this.faceColour <= 2) {//black cat face
  faceFill = color(71, 72, 79); //darker grey face
  stripeFill = color(46, 47, 56);
  noseFill = color(235, 190, 220, 255);
  earFill = color(71, 72, 79);
  earInner = color(58, 53, 61);
} if (this.faceColour >= 2 ){ //orange cat face
    faceFill = color(240, 178, 108);
    stripeFill = color(196, 119, 51);
    earFill = faceFill;
    noseFill = color(0);
    earInner = color(217, 125, 113);
} if (this.faceColour >= 3) { //white cat face
    faceFill= color(214, 214, 214); //light grey
    stripeFill=color(171, 166, 159);
    noseFill= color(0);
    earFill = color(214, 214, 214);
    earInner = color(201, 180, 204);
  } 
  //draw the face using the colours determined above.
    fill(faceFill); //dark grey
    beginShape(); //oval face shape
      vertex(-7, 3);
      bezierVertex(-8.5, -1, 1, -10, 7.5, -3);
      bezierVertex(15, 10, -6.5, 8, -7, 3);
    endShape();

    beginShape(); //right cheek fluff
      curveVertex(8, 2);
      curveVertex(8, 2);
      curveVertex(10, 3);
      curveVertex(6, 5.5);
      curveVertex(6, 5.5);
    endShape();

    beginShape();
      curveVertex(6, 3.5);
      curveVertex(6, 3.5);
      curveVertex(10, 4.5);
      curveVertex(5.9, 6.1);
      curveVertex(5.9, 6.1);
    endShape();

    beginShape(); //left cheek fluff
      curveVertex(-7, 2);
      curveVertex(-7, 2);
      curveVertex(-8, 3);
      curveVertex(-4, 5);
      curveVertex(-4, 5);
    endShape();

    beginShape();
      curveVertex(-4, 2);
      curveVertex(-4, 2);
      curveVertex(-7.2, 4.5);
      curveVertex(-3, 6);
      curveVertex(-3, 6);
    endShape();

//draws one or three stripes on the cat - based on gender of the person.
fill(stripeFill);
  if (this.stripeNum <= 2) { //if only 1 stripe
      var xStripe = 1+this.faceOffset; //offset depending on which way they are looking
      var yStripe = -4+this.faceOffsetUP;
      var yDrop = 3.9;//how far down the stripe is
      beginShape(); //middle stripe
        vertex(xStripe, yStripe);
        bezierVertex(xStripe -.9, yStripe + (yStripe * -.4), xStripe - 1.1, yStripe + (yStripe * -.7), xStripe - .7, yStripe + yDrop);
        bezierVertex(xStripe + (yDrop * .125), yStripe + (yStripe * -.45), xStripe + .3, yStripe + (yStripe * -.5), xStripe, yStripe);
      endShape();
  } else if (this.stripeNum >= 2) { //else if 3 stripes
    var xStripe = 1+this.faceOffset;
    var yStripe = -4+this.faceOffsetUP;
    var yDrop = 3.9;
    beginShape(); //middle stripe
      vertex(xStripe, yStripe);
      bezierVertex(xStripe -.9, yStripe + (yStripe * -.4), xStripe - 1.1, yStripe + (yStripe * -.7), xStripe - .7, yStripe + yDrop);
      bezierVertex(xStripe + (yDrop * .125), yStripe + (yStripe * -.45), xStripe + .3, yStripe + (yStripe * -.5), xStripe, yStripe);
    endShape();

    var xStripe = -1+this.faceOffset;
    var yStripe = -4+this.faceOffsetUP;
    var yDrop = 2.4;
    beginShape(); //left shape
      vertex(xStripe, yStripe);
      bezierVertex(xStripe - .9, yStripe + (yStripe * -.4), xStripe - 1.1, yStripe + (yStripe * -.7), xStripe - .7, yStripe + yDrop);
      bezierVertex(xStripe + (yDrop * .125), yStripe + (yStripe * -.45), xStripe + .3, yStripe - .2 + (yStripe * -.5), xStripe, yStripe);
    endShape();

    var xStripe = 3+this.faceOffset;
    var yStripe = -4+this.faceOffsetUP;
    var yDrop = 2.6;
    beginShape(); //right shape
      vertex(xStripe, yStripe);
      bezierVertex(xStripe - .9, yStripe + (yStripe * -.4), xStripe - 1.1, yStripe + (yStripe * -.7), xStripe - .05, yStripe + yDrop);
      bezierVertex(xStripe + (yDrop * .125), yStripe + (yStripe * -.45), xStripe + .3, yStripe - .2 + (yStripe * -.5), xStripe, yStripe);
    endShape();
  }

  //**draw both eyes with offsets**  
  this.draw_eye(-8+this.faceOffset, this.pupilRandX, this.pupilSize, 1.5+this.faceOffsetUP); //LEFT EYE
    
  this.draw_eye(1.5+this.faceOffset, this.pupilRandX, this.pupilSize, 1.5+this.faceOffsetUP); //right eye

  //nose 
  fill(noseFill);
  ellipse(0+this.faceOffset, 3.2+this.faceOffsetUP, 1.4, .8); //draws the main nose, added eye offset so it moves with the rest of the face
  fill(255, 255, 255, 200); //slightly transparent white
  ellipse(.2+this.faceOffset, 3.1+this.faceOffsetUP, .7, .4); //draws nose highlight
  //mouth
  this.drawMouth(this.mouthValue, -2+this.faceOffset, 4.3+this.faceOffsetUP, this.faceColour);

  noStroke();
  if (this.earType ==1) { //ear type 0 is normal upright ears
    //left ear shape
    fill(earFill);
    beginShape();
      curveVertex(-4, -3);
      curveVertex(-4, -3);
      curveVertex(-.5, -10);
      curveVertex(1, -5);
      curveVertex(1, -5);
    endShape();
    //left ear inner
    fill(earInner);
    beginShape();
      curveVertex(-2.5, -4);
      curveVertex(-2.5, -4);
      curveVertex(-.5, -8.5);
      curveVertex(.1, -5.2);
      curveVertex(.1, -5.2);
    endShape();

    fill(earFill);
    //right ear shape
    beginShape()
      curveVertex(3, -4.4);
      curveVertex(3, -4.4);
      curveVertex(6.5, -9.5);
      curveVertex(7.5, -3);
      curveVertex(7.5, -3);
    endShape();
    //right ear inner
    fill(earInner);
    beginShape();
      curveVertex(4.3, -4.8);
      curveVertex(4.3, -4.8);
      curveVertex(6.2, -8.2);
      curveVertex(6.6, -3.7);
      curveVertex(6.6, -3.7);
    endShape();

  } else if (this.earType == 2) { //ear type 1 is 'airplane ears' where the cats ears are flat
    fill(earFill);
    beginShape();
      curveVertex(1, -5.5);
      curveVertex(1, -5.5);
      curveVertex(-9, -5);
      curveVertex(-5, -1.5);
      curveVertex(-5, -1.5);
    endShape();

    beginShape();
      curveVertex(3, -5.5);
      curveVertex(3, -5.5);
      curveVertex(12, -4);
      curveVertex(7.5, -1);
      curveVertex(7.5, -1);
    endShape();

    fill(earInner); //left ear inner
    beginShape();
      curveVertex(-3.7, -3.5);
      curveVertex(-3.7, -3.5);
      curveVertex(-7.5, -4);
      curveVertex(-5.2, -2.2);
      curveVertex(-5.2, -2.2);
    endShape();

    beginShape(); //right ear inner
      curveVertex(7.1, -3.5);
      curveVertex(7.1, -3.5);
      curveVertex(10.3, -3.4);
      curveVertex(8, -2);
      curveVertex(8, -2);
    endShape();
  }

//****DEBUG for mouth open/close determining******* 
// fill (0,255,0); //bright green
// ellipse (mouthavex,mouthavey,.1,.1); //circle where the mouth average point is
// ellipse (mouthavex,lipcornerAve,.1,.1); //circle where the corner of the lip is


  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.faceColour = map(settings[0], 0, 100, 1, 3.9);
    this.stripeNum = map(settings[1], 0, 100, 1, 2.9);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(0);
      settings[0] = map(this.faceColour, 1, 3.9, 0, 100);
      settings[1] = map(this.stripeNum, 1, 2.9, 0, 100);
    return settings;
  }
}
