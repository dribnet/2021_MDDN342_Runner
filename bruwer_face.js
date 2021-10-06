/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 7;

// other variables can be in here too
// here's some examples for colors used


// This where you define your own face object
function BruwerFace() {

  this.thinnessValue = 5;
  this.eyeSpaceValue = 2;
  this.headHeightValue = 5;
  this.eyeSizeValue = 5;
  this.mouthHeightValue = 5;
  this.mouthScaleValue = 5;

  this.draw_segment = function(segment, do_loop) {
    for (let i = 0; i < segment.length; i++) {
      let px = segment[i][0];
      let py = segment[i][1];
      ellipse(px, py, 0.1);
      if (i < segment.length - 1) {
        let nx = segment[i + 1][0];
        let ny = segment[i + 1][1];
        line(px, py, nx, ny);
      } else if (do_loop) {
        let nx = segment[0][0];
        let ny = segment[0][1];
        line(px, py, nx, ny);
      }
    }
  }

  /*
   * Draw the face with position lists
   */
  this.draw = function(positions) {
    // print(positions);
    //Basic variable set up
    scale(0.3);
    angleMode(DEGREES);
    const bg_color = [225, 206, 187];
    const fg_color = [151, 102, 52];
    const strokeColor = [0];
    const offWhite = [225, 225, 255, 90];

    //For the eyelashes
    let symmetry = 12;
    let angle = 360 / 12;

    //For drawing custom shapes
    var x = 0;
    var y = 0;

    //Face and Hair colors 
    let hairColor1 = color(229, 182, 90); //Blonde
    let hairColor2 = color(218, 53, 50); //Orange
    let hairColor3 = color(180, 33, 65); //Red
    let hairColor4 = color(107, 66, 39); //Brown
    let hairColor5 = color(36, 37, 40); //Black
    let noHairColor = color(183, 183, 183); //Grey

    let faceColor1 = color(255, 226, 197); //Light skin tone
    let faceColor2 = color(255, 221, 170); //Warmer skin tone
    let faceColor4 = color(179, 129, 88); //Darker skin tone
    let faceColor5 = color(137, 96, 65); //Darkest skin tone

    const cheekColour = [255, 108, 126, 60];
    const contourColour = [0, 0, 0, 30];

    let ethnicity = this.faceColor;
    let skinTone;

    let hairTone = this.hairColor;
    let hairColor;

    //Setting up the face color for the slider
    if (ethnicity == 1) {
      skinTone = faceColor1 //Fare skin tone
    } else if (ethnicity == 2) {
      skinTone = faceColor2 //Olive skin tone
    } else if (ethnicity == 3) {
      skinTone = faceColor4 //Warm skin tone
    } else {
      skinTone = faceColor5 //Dark skin tone
    }

    //Setting up the hair color for the slider
    if (hairTone == 1) {
      hairColor = hairColor1 //Blonde
    } else if (hairTone == 2) {
      hairColor = hairColor2 //orange
    } else if (hairTone == 3) {
      hairColor = hairColor3 //Red
    } else if (hairTone == 4) {
      hairColor = hairColor4 //Brown
    } else if (hairTone == 5) {
      hairColor = hairColor5 //Black
    } else {
      hairColor = noHairColor;
    }

    //Face mappings mouth
    let mouthPosX = average_point(positions.top_lip);
    let mouthPosY = average_point(positions.bottom_lip);

    let max = this.mouthHeightValue;

    let dMouth = dist(mouthPosX[0], mouthPosX[1], mouthPosY[0], mouthPosY[1]);
    let mouthWidth = map(dMouth, 0, max, 0, 10);
    let mouthHeight = map(dMouth, 0, max, 0, 25);

    let topLipPos = positions.top_lip[9];
    let bottomLipPos = positions.bottom_lip[9];

    let d = dist(topLipPos[0], topLipPos[1], bottomLipPos[0], bottomLipPos[1]);

    //How big the smile is
    if (d < 0.1) {
      d = 0.02;
    }

    mouth = map(d, 0, 0.5, 0, 10);
    let mouthSize = map(mouth, 0, 10, 0, 2);

    //Face mappings nose + eyes + eyebrows
    let leftEye1 = positions.left_eye[0];
    let leftEye2 = positions.left_eye[5];

    let rightEye1 = positions.left_eye[0];
    let rightEye2 = positions.left_eye[5];

    let noseTop = positions.nose_bridge[0];
    let noseBottom = positions.nose_bridge[3];

    let leftEyePos = average_point(positions.left_eye);
    let rightEyePos = average_point(positions.right_eye);

    let leftEyebrow = average_point(positions.left_eyebrow);
    let rightEyebrow = average_point(positions.right_eyebrow);

    //Position of eyes
    leftEyePos[0] *= 3;
    leftEyePos[1] *= 0.8;
    rightEyePos[0] *= 3;
    rightEyePos[1] *= 0.8;

    //Positions for the face
    let facePosition = average_point(positions.chin);

    /////////////////////////////////////////////////////////////////////////////////
    if (this.gender > 0 && this.gender <= 1) { //Masculine
      fill(skinTone);

      //Hair
      push();
      fill(hairColor);
      noStroke();
      ellipse(facePosition[0], facePosition[1] - 1.5, this.thinnessValue + 1, this.headHeightValue - 2);
      pop();

      //Head
      push();
      noStroke();
      ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue);
      pop();

      //Eyes
      fill(0);
      ellipse(leftEyePos[0], leftEyePos[1], leftEye2[0], leftEye2[1]);
      ellipse(rightEyePos[0], rightEyePos[1], rightEye2[0], leftEye2[1]);

      //Eye shine details
      push();
      noStroke();
      fill(255, 255, 255, 50);
      ellipse(leftEyePos[0] - 0.2, leftEye1[1], 0.3, 0.3); //Left eye
      ellipse(rightEyePos[0] - 0.2, rightEye1[1] + 0.1, 0.3, 0.3); //Right eye
      pop();

      //Nose
      push();
      stroke(contourColour);
      strokeWeight(0.20);
      line(noseTop[0], noseTop[1] + 1.3, noseBottom[0], noseBottom[1] + 1.7);
      pop();

      //Eyebrows
      push();
      rotate(-20);
      noFill();
      stroke(0);
      strokeWeight(0.15);
      arc(leftEyePos[0] + .5, leftEyePos[1] - 2, 2, 0.2, 180, 0); //Left eyebrow
      pop();
      push();
      rotate(20);
      noFill();
      stroke(0);
      strokeWeight(0.15);
      arc(rightEyePos[0] - .5, rightEyePos[1] - 2, 2, 0.2, 180, 0); //Right eyebrow
      pop();

      //The Moustach
      fill(hairColor);
      noStroke();
      push();
      translate(noseBottom[1] + 1, noseBottom[1] + 2.2);
      rotate(10);
      ellipse(0, 0, 2.5, 1.2);
      pop();
      push();
      translate(-noseBottom[1] - 1, noseBottom[1] + 2.2);
      rotate(-10);
      ellipse(0, 0, 2.5, 1.2);
      pop();

      //Mouth
      noFill();
      stroke(0);
      strokeWeight(0.2);
      noFill();
      arc(0, this.mouthScaleValue, mouthWidth, mouthSize, 0, 180);

      //Creates a outline of the shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //Head outline
        push();
        translate(0 - 0.3, 0 + 0.5);
        ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue, this.headRoundnessValue);
        pop();
      }
      pop();

      //Hair
      //Left hair
      push();
      fill(hairColor);
      noStroke();
      triangle(-7.5, -3.5, -4.5, -9, 5, -3.5);
      pop();

      //Hair middle cover up
      push();
      fill(hairColor);
      noStroke();
      translate(1.2, -4.8);
      rotate(30);
      ellipse(0, -1, 6.5, 3.2);
      pop();

      //Right hair
      push();
      fill(hairColor);
      noStroke();
      translate(0.5, -4);
      rotate(55);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      //middle hair
      push();
      fill(hairColor);
      noStroke();
      translate(-2, -4);
      rotate(40);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      //middle hair
      push();
      fill(hairColor);
      noStroke();
      translate(2, -1);
      rotate(40);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      //Hair detail
      push();
      fill(hairColor);
      noStroke();
      translate(0.5, -1.5);
      rotate(35);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      //Hair detail
      push();
      fill(hairColor);
      noStroke();
      translate(-0, -1.5);
      rotate(-35);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      //Hair detail
      push();
      fill(hairColor);
      noStroke();
      translate(-3.2, -4);
      rotate(45);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      //Hair detail
      push();
      fill(hairColor);
      noStroke();
      translate(-1.5, -1);
      rotate(-40);
      triangle(-3, -3.5, 1, -5.5, 3, -3.5);
      pop();

      /////////////////////////////////////////////////////////////////////////////////
    } else if (this.gender > 1 && this.gender <= 2) { //Gender neuteral
      fill(skinTone);

      //Hair
      push();
      fill(hairColor);
      noStroke();
      ellipse(facePosition[0], facePosition[1] - 1.5, this.thinnessValue + 1, this.headHeightValue - 2);
      pop();

      //Head
      push();
      noStroke();
      ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue);
      pop();

      //Eyes
      fill(0);
      ellipse(leftEyePos[0], leftEyePos[1], leftEye2[0], leftEye2[1]);
      ellipse(rightEyePos[0], rightEyePos[1], rightEye2[0], leftEye2[1]);

      //Eye shine details
      push();
      noStroke();
      fill(255, 255, 255, 50);
      ellipse(leftEyePos[0] - 0.2, leftEye1[1], 0.3, 0.3); //Left eye
      ellipse(rightEyePos[0] - 0.2, rightEye1[1] + 0.1, 0.3, 0.3); //Right eye
      pop();

      //Nose
      push();
      stroke(contourColour);
      strokeWeight(0.20);
      line(noseTop[0], noseTop[1] + 1.3, noseBottom[0], noseBottom[1] + 1.7);
      pop();

      //Eyebrows
      push();
      rotate(-20);
      noFill();
      stroke(0);
      strokeWeight(0.15);
      arc(leftEyePos[0] + .5, leftEyePos[1] - 2, 2, 0.2, 180, 0); //Left eyebrow
      pop();
      push();
      rotate(20);
      noFill();
      stroke(0);
      strokeWeight(0.15);
      arc(rightEyePos[0] - .5, rightEyePos[1] - 2, 2, 0.2, 180, 0); //Right eyebrow
      pop();

      //Mouth
      noFill();
      stroke(0);
      strokeWeight(0.2);
      noFill();
      arc(0, this.mouthScaleValue, mouthWidth, mouthSize, 0, 180);

      //Creates a outline of the shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //Head outline
        push();
        translate(0 - 0.3, 0 + 0.5);
        ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue, this.headRoundnessValue);
        pop();
      }
      pop();

      //Hair
      push();
      scale(1);
      noStroke();
      translate(facePosition[0], facePosition[1] - 1.6);
      fill(hairColor);
      beginShape();
      curveVertex(x, y - 6.2);
      curveVertex(x, y - 6.2);
      curveVertex(x - 3.2, y - 5);
      curveVertex(x - 5, y - 2.5);
      curveVertex(x, y - 1.5);
      curveVertex(x + 5, y - 2.5);
      curveVertex(x + 3.2, y - 5);
      curveVertex(x, y - 6.2);
      endShape(CLOSE);
      pop();

      //Hair texture
      push();
      translate(facePosition[0] + 3.1, facePosition[1] - 12);
      rotate(200);
      fill(hairColor);
      noStroke();
      beginShape();
      curveVertex(x - 1, y - 8);
      curveVertex(x - 1, y - 8);
      curveVertex(x + 0.5, y - 6);
      curveVertex(x + 2, y - 5);
      endShape(CLOSE);
      pop();

      //Hair texture
      push();
      translate(facePosition[0] + 4.7, facePosition[1] - 11);
      rotate(220);
      fill(hairColor);
      noStroke();
      beginShape();
      curveVertex(x - 1, y - 8);
      curveVertex(x - 1, y - 8);
      curveVertex(x + 0.5, y - 6);
      curveVertex(x + 2, y - 5);
      endShape(CLOSE);
      pop();

      //Right Cheek details
      push();
      strokeWeight(0.1);
      translate(6, 0.7);
      line(-2.5, 0.5, -2.25, 0.25);
      line(-2.9, 0.5, -2.65, 0.25);
      pop();

      //Left Cheek details
      push();
      strokeWeight(0.1);
      translate(-6, 0.7);
      line(2.5, 0.25, 2.25, 0.5);
      line(2.9, 0.25, 2.65, 0.5);
      pop();

      /////////////////////////////////////////////////////////////////////////////////
    } else if (this.gender > 2 && this.gender <= 3) { //Plain Jane also gender neuteral

      fill(skinTone);

      push();
      translate(0, 0);
      fill(hairColor);
      stroke(strokeColor);
      strokeWeight(0.15);
      rect(-6.95, -9.1, 13.9, 14, 25, 25, 0, 0);
      pop();

      //Hair
      push();
      translate(0, 0);
      fill(hairColor);
      noStroke();
      beginShape();
      curveVertex(x, y - 8);
      curveVertex(x, y - 8);
      curveVertex(x - 5, y - 7);
      curveVertex(x - 7.8, y);
      curveVertex(x - 8, y + 10);
      curveVertex(x, y + 9.8);
      curveVertex(x + 8, y + 10);
      curveVertex(x + 7.8, y);
      curveVertex(x + 5, y - 7);
      curveVertex(x, y - 8);
      endShape(CLOSE);
      pop();

      //Head
      push();
      noStroke();
      ellipse(0, 0, this.thinnessValue, this.headHeightValue);
      pop();

      //Mouth
      noFill();
      stroke(0);
      strokeWeight(0.2);
      noFill();
      arc(0, this.mouthScaleValue, mouthWidth, mouthSize, 0, 180);

      //Creates a outline of the shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //Head outline
        push();
        translate(0 - 0.3, 0 + 0.5);
        ellipse(0, 0, this.thinnessValue, this.headHeightValue, this.headRoundnessValue);
        pop();

        //Hair
        push();
        translate(-0.3, 0.3);
        beginShape();
        curveVertex(x, y - 8);
        curveVertex(x - 5, y - 7);
        curveVertex(x - 7.8, y);
        curveVertex(x - 8, y + 10);
        curveVertex(x, y + 9.8);
        curveVertex(x + 8, y + 10);
        curveVertex(x + 7.8, y);
        curveVertex(x + 5, y - 7);
        curveVertex(x, y - 8);
        endShape();
        pop();
      }
      pop();

      //Hair
      push();
      translate(0, 0);
      fill(hairColor);
      noStroke();
      rect(-4, -8, 8, 2.4, 25, 25, 0, 0);
      pop();

      //Part of the hair right
      push();
      translate(0.7, 4.3);
      rotate(50);
      fill(hairColor);
      noStroke();
      ellipse(-4, -8, 7, 2.5);
      pop();

      //Part of the hair left
      push();
      translate(4.2, -2.2);
      rotate(-55);
      fill(hairColor);
      noStroke();
      ellipse(-4, -8, 7, 2.5);
      pop();

      //Fringe details
      push();
      fill(hairColor);
      translate(0, 1.8);
      noStroke();

      //Left fringe
      beginShape();
      curveVertex(x, y - 8);
      curveVertex(x, y - 8);
      curveVertex(x - 2, y - 5);
      curveVertex(x - 6, y - 2);
      curveVertex(x - 7, y - 2);
      curveVertex(x - 4, y - 7);
      endShape(CLOSE);

      //Left fringe individual hair stroke
      push();
      translate(0.1, 0.6);
      rotate(-14);
      fill(hairColor);
      beginShape();
      curveVertex(x + 1, y - 8);
      curveVertex(x + 1, y - 8);
      curveVertex(x - 0.5, y - 6);
      curveVertex(x - 2, y - 5);
      endShape(CLOSE);
      pop();

      //Left fringe individual hair stroke
      push();
      translate(2, -1);
      rotate(-20);
      fill(hairColor);
      beginShape();
      curveVertex(x + 1, y - 8);
      curveVertex(x + 1, y - 8);
      curveVertex(x - 0.5, y - 6);
      curveVertex(x - 2, y - 5);
      endShape(CLOSE);
      pop();

      //Right fringe
      push();
      beginShape();
      curveVertex(x - 0.5, y - 8);
      curveVertex(x - 0.5, y - 8);
      curveVertex(x + 2, y - 5);
      curveVertex(x + 6, y - 2);
      curveVertex(x + 6.8, y - 2);
      curveVertex(x + 4, y - 7);
      endShape(CLOSE);
      pop();

      //Right fringe individual hair stroke
      push();
      noStroke();
      translate(-1, 0);
      rotate(13);
      fill(hairColor);
      beginShape();
      curveVertex(x - 1, y - 8);
      curveVertex(x - 1, y - 8);
      curveVertex(x + 0.5, y - 6);
      curveVertex(x + 2, y - 5);
      endShape(CLOSE);
      pop();
      pop();

      //Eyes
      fill(0);
      ellipse(leftEyePos[0], leftEyePos[1], leftEye2[0], leftEye2[1]);
      ellipse(rightEyePos[0], rightEyePos[1], rightEye2[0], leftEye2[1]);

      //Eye shine details
      push();
      noStroke();
      fill(offWhite);
      ellipse(leftEyePos[0] - 0.2, leftEye1[1], 0.3, 0.3); //Left eye
      ellipse(rightEyePos[0] - 0.2, rightEye1[1] + 0.1, 0.3, 0.3); //Right eye
      pop();

      //Creates a outline of the fringe details shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //Fringe details
        //Left fringe
        push();
        translate(-0.5, 1.8);
        beginShape();
        curveVertex(x - 3, y - 4);
        curveVertex(x - 3, y - 4);
        curveVertex(x - 6, y - 2);
        curveVertex(x - 7, y - 2);
        endShape();
        pop();

        translate(-0.5, 0.1);
        //Left strands of hair
        push();
        translate(0.5, 1.8);
        rotate(-6);
        beginShape();
        curveVertex(x + 0.6, y - 7.8);
        curveVertex(x + 0.6, y - 7.8);
        curveVertex(x - 0.5, y - 6);
        curveVertex(x - 1.5, y - 5.9);
        endShape();
        pop();

        //Right fringe
        push();
        translate(0.1, 1.1);
        beginShape();
        curveVertex(x + 2, y - 5);
        curveVertex(x + 2, y - 5);
        curveVertex(x + 6, y - 2);
        curveVertex(x + 6.8, y - 2);
        endShape();
        pop();

        //Right strands of hair
        push();
        translate(0.6, 2.5);
        rotate(10);
        beginShape();
        curveVertex(x - 1.5, y - 8.5);
        curveVertex(x - 1.5, y - 8.5);
        curveVertex(x - 1.2, y - 8);
        curveVertex(x + 0.5, y - 6);
        curveVertex(x + 2.2, y - 5);
        endShape();
        pop();
        pop();
      }
      /////////////////////////////////////////////////////////////////////////////////
    } else if (this.gender > 3 && this.gender <= 4) { //Fem

      fill(skinTone);

      //Hair
      push();
      translate(facePosition[0], facePosition[1]);
      fill(hairColor);
      noStroke();
      beginShape();
      curveVertex(x, y - 8.3);
      curveVertex(x, y - 8.3);
      curveVertex(x - 3, y - 8.7);
      curveVertex(x - 7, y - 5);
      curveVertex(x - 8, y);
      curveVertex(x - 9, y + 9);
      curveVertex(x, y + 8.5);
      curveVertex(x + 9, y + 9);
      curveVertex(x + 8, y);
      curveVertex(x + 7, y - 5);
      curveVertex(x + 3, y - 8.9);
      curveVertex(x, y - 8.3);
      endShape(CLOSE);
      pop();

      //Head
      push();
      noStroke();
      ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue);
      pop();

      //Mouth
      noFill();
      stroke(0);
      strokeWeight(0.2);
      noFill();
      arc(0, this.mouthScaleValue, mouthWidth, mouthSize, 0, 180);

      //Creates a outline of the shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //Head outline
        push();
        translate(0 - 0.3, 0 + 0.5);
        ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue, this.headRoundnessValue);
        pop();

        //Hair outline
        push();
        translate(facePosition[0] - 0.3, facePosition[1] + 0.3);
        beginShape();
        curveVertex(x, y - 8.3);
        curveVertex(x, y - 8.3);
        curveVertex(x - 3, y - 8.7);
        curveVertex(x - 7, y - 5);
        curveVertex(x - 8, y);
        curveVertex(x - 9, y + 9);
        curveVertex(x, y + 8.5);
        curveVertex(x + 9, y + 9);
        curveVertex(x + 8, y);
        curveVertex(x + 7, y - 5);
        curveVertex(x + 3, y - 8.9);
        curveVertex(x, y - 8.3);
        endShape(CLOSE);
        pop();
      }
      pop();

      //Fringe
      push();
      noStroke();
      translate(facePosition[0], facePosition[1] - 0.5);
      fill(hairColor);
      beginShape();
      curveVertex(x, y - 7.5);
      curveVertex(x, y - 7.5);
      curveVertex(x - 5, y - 6.5);
      curveVertex(x - 5.5, y - 1);
      curveVertex(x, y - 2);
      curveVertex(x + 5.5, y - 1);
      curveVertex(x + 4.5, y - 6.5);
      curveVertex(x, y - 7.5);
      endShape(CLOSE);
      pop();

      //Fringe details
      //Right texture
      push();
      translate(facePosition[0] + 7, facePosition[1] + 2.8);
      rotate(-45);
      fill(skinTone);
      noStroke();
      beginShape();
      curveVertex(x + 1, y - 8);
      curveVertex(x + 1, y - 8);
      curveVertex(x - 0.5, y - 6);
      curveVertex(x - 2, y - 5);
      endShape(CLOSE);
      pop();

      //Right texture
      push();
      translate(facePosition[0] + 9, facePosition[1] + 2);
      rotate(-50);
      fill(skinTone);
      noStroke();
      beginShape();
      curveVertex(x + 1, y - 8);
      curveVertex(x + 1, y - 8);
      curveVertex(x - 0.5, y - 6);
      curveVertex(x - 2, y - 5);
      endShape(CLOSE);
      pop();

      //Left texture
      push();
      translate(facePosition[0] - 6.5, facePosition[1] + 2.8);
      rotate(45);
      fill(skinTone);
      noStroke();
      beginShape();
      curveVertex(x - 1, y - 8);
      curveVertex(x - 1, y - 8);
      curveVertex(x + 0.5, y - 6);
      curveVertex(x + 2, y - 5);
      endShape(CLOSE);
      pop();

      //Left texture
      push();
      translate(facePosition[0] - 9, facePosition[1] + 2);
      rotate(50);
      fill(skinTone);
      noStroke();
      beginShape();
      curveVertex(x - 1, y - 8);
      curveVertex(x - 1, y - 8);
      curveVertex(x + 0.5, y - 6);
      curveVertex(x + 2, y - 5);
      endShape(CLOSE);
      pop();

      //Eyes
      fill(0);
      ellipse(leftEyePos[0], leftEyePos[1], leftEye2[0], leftEye2[1]);
      ellipse(rightEyePos[0], rightEyePos[1], rightEye2[0], leftEye2[1]);

      //Eye shine details
      push();
      noStroke();
      fill(offWhite);
      ellipse(leftEyePos[0] - 0.2, leftEye1[1], 0.3, 0.3); //Left eye
      ellipse(rightEyePos[0] - 0.2, rightEye1[1] + 0.1, 0.3, 0.3); //Right eye
      pop();

      //Cheeks
      push();
      fill(cheekColour);
      noStroke();
      ellipse(-3, 1.1, 1.5, 0.8);
      ellipse(3, 1.1, 1.5, 0.8);
      pop();

      //Right Cheek details
      push();
      strokeWeight(0.1);
      translate(5.6, 0.7);
      line(-2.5, 0.5, -2.25, 0.25);
      line(-2.9, 0.5, -2.65, 0.25);
      pop();

      //Left Cheek details
      push();
      strokeWeight(0.1);
      translate(-5.6, 0.7);
      line(2.5, 0.25, 2.25, 0.5);
      line(2.9, 0.25, 2.65, 0.5);
      pop();
      /////////////////////////////////////////////////////////////////////////////////
    } else if (this.gender > 4 && this.gender <= 5) { //Most Fem

      fill(skinTone);

      //Hair
      push();
      translate(facePosition[0], facePosition[1]);
      fill(hairColor);
      noStroke();
      beginShape();
      curveVertex(x + 2.5, y - 8);
      curveVertex(x + 2.5, y - 8);
      curveVertex(x + 0.5, y - 9.4);
      curveVertex(x - 4, y - 9.4);
      curveVertex(x - 6, y - 7);
      curveVertex(x - 8, y - 1);
      curveVertex(x - 9.7, y + 2);
      curveVertex(x - 9, y + 4);
      curveVertex(x - 10, y + 7);
      curveVertex(x - 9, y + 9);
      curveVertex(x - 5.7, y + 8.5);
      curveVertex(x - 1, y + 9.5);
      curveVertex(x + 4, y + 8.5);
      curveVertex(x + 8, y + 9);
      curveVertex(x + 10, y + 6);
      curveVertex(x + 8.5, y + 4);
      curveVertex(x + 9, y + 2);
      curveVertex(x + 7, y - 1);
      curveVertex(x + 6, y - 7.5);
      curveVertex(x + 2.5, y - 8);
      endShape(CLOSE);
      pop();

      //Head
      push();
      noStroke();
      ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue);
      pop();

      //Mouth
      noFill();
      stroke(0);
      strokeWeight(0.2);
      noFill();
      arc(0, this.mouthScaleValue, mouthWidth, mouthSize, 0, 180);

      //Creates a outline of the shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //Head outline
        push();
        translate(0 - 0.3, 0 + 0.5);
        ellipse(facePosition[0], facePosition[1], this.thinnessValue, this.headHeightValue, this.headRoundnessValue);
        pop();

        //Hair outline
        push();
        translate(facePosition[0] - 0.3, facePosition[1] + 0.3);
        beginShape();
        curveVertex(x + 2.5, y - 8);
        curveVertex(x + 2.5, y - 8);
        curveVertex(x + 0.5, y - 9.4);
        curveVertex(x - 4, y - 9.4);
        curveVertex(x - 6, y - 7);
        curveVertex(x - 8, y - 1);
        curveVertex(x - 9.7, y + 2);
        curveVertex(x - 9, y + 4);
        curveVertex(x - 10, y + 7);
        curveVertex(x - 9, y + 9);
        curveVertex(x - 5.7, y + 8.5);
        curveVertex(x - 1, y + 9.5);
        curveVertex(x + 4, y + 8.5);
        curveVertex(x + 8, y + 9);
        curveVertex(x + 10, y + 6);
        curveVertex(x + 8.5, y + 4);
        curveVertex(x + 9, y + 2);
        curveVertex(x + 7, y - 1);
        curveVertex(x + 6, y - 7.5);
        endShape(CLOSE);
        pop();
      }
      pop();

      //Fringe
      //Left fringe
      push();
      fill(hairColor);
      noStroke();
      translate(facePosition[0], facePosition[1] + 2);
      beginShape();
      curveVertex(x + 1.8, y - 8);
      curveVertex(x + 1.8, y - 8);
      curveVertex(x + 0.5, y - 4.8);
      curveVertex(x - 4, y - 4);
      curveVertex(x - 7, y - 1);
      curveVertex(x - 7, y - 4);
      curveVertex(x - 6, y - 8.1);
      curveVertex(x - 9, y - 6);
      endShape();
      pop();

      //Right fridge
      push();
      fill(hairColor);
      noStroke();
      translate(facePosition[0], facePosition[1] + 2);
      beginShape();
      curveVertex(x + 1.5, y - 8.5);
      curveVertex(x + 1.5, y - 8.5);
      curveVertex(x + 2, y - 5);
      curveVertex(x + 6, y - 3);
      curveVertex(x + 5.7, y - 6.9);
      endShape(CLOSE);
      pop();

      push();
      fill(hairColor);
      translate(facePosition[0], facePosition[1]);
      noStroke();
      rect(-5, -7.5, 10, 3);
      pop();

      //Creates a outline of the shape to give the rough drawn technique
      push();
      var outline = true;
      if (outline) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.15);

        //fringe details
        push();
        translate(facePosition[0] - 0.4, facePosition[1] + 1.8);
        //Left frindge
        beginShape();
        curveVertex(x + 1.35, y - 6);
        curveVertex(x + 1.35, y - 6);
        curveVertex(x + 0.4, y - 4.8);
        curveVertex(x - 4, y - 4);
        curveVertex(x - 6, y - 2);
        curveVertex(x - 6, y - 3);
        endShape();
        pop();

        //Right fringe
        push();
        translate(facePosition[0] + 0.2, facePosition[1] + 1.8);
        beginShape();
        curveVertex(x + 1.5, y - 7);
        curveVertex(x + 1.5, y - 7);
        curveVertex(x + 2, y - 5);
        curveVertex(x + 6, y - 3);
        curveVertex(x + 5, y - 6);
        endShape();
        pop();
      }
      pop();

      //Left eyelashes
      push();
      translate(leftEyePos[0], leftEyePos[1] - 0.2);
      for (i = 0; i < 12; i++) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.1);
        rotate(angle);
        line(0, 0, 0.6, 0);
      }
      pop();

      //Right eyelashes
      push();
      translate(rightEyePos[0], rightEyePos[1] - 0.2);
      for (i = 0; i < 12; i++) {
        noFill();
        stroke(strokeColor);
        strokeWeight(0.1);
        rotate(angle);
        line(0, 0, 0.6, 0);
      }
      pop();

      //Eyes
      fill(0);
      ellipse(leftEyePos[0], leftEyePos[1], leftEye2[0], leftEye2[1]);
      ellipse(rightEyePos[0], rightEyePos[1], rightEye2[0], leftEye2[1]);

      //Eye shine details
      push();
      noStroke();
      fill(offWhite);
      ellipse(leftEyePos[0] - 0.2, leftEye1[1], 0.3, 0.3); //Left eye
      ellipse(rightEyePos[0] - 0.2, rightEye1[1] + 0.1, 0.3, 0.3); //Right eye
      pop();

      //Cheeks
      push();
      fill(cheekColour);
      noStroke();
      ellipse(-3, 1.1, 1.5, 0.8);
      ellipse(3, 1.1, 1.5, 0.8);
      pop();

      //Right Cheek details
      push();
      strokeWeight(0.1);
      translate(5.6, 0.7);
      line(-2.5, 0.5, -2.25, 0.25);
      line(-2.9, 0.5, -2.65, 0.25);
      pop();

      //Left Cheek details
      push();
      strokeWeight(0.1);
      translate(-5.6, 0.7);
      line(2.5, 0.25, 2.25, 0.5);
      line(2.9, 0.25, 2.65, 0.5);
      pop();
    }
  }

  //Sliders 
  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.thinnessValue = map(settings[0], 0, 100, 10.5, 12.5);
    this.headHeightValue = map(settings[1], 0, 100, 13, 15);
    this.mouthHeightValue = map(settings[2], 0, 100, 1, 4);
    this.mouthScaleValue = map(settings[3], 0, 100, 2.5, 4);
    this.faceColor = int(map(settings[4], 0, 100, 1, 4));
    this.hairColor = int(map(settings[5], 0, 100, 1, 6));
    this.gender = map(settings[6], 0, 100, 1, 5);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(1);
    settings[0] = map(this.thinnessValue, 10.5, 12.5, 0, 100);
    settings[1] = map(this.headHeightValue, 13, 15, 0, 100);
    settings[2] = map(this.mouthHeightValue, 1, 4, 0, 100);
    settings[3] = map(this.mouthScaleValue, 2.5, 4, 0, 100);
    settings[4] = map(this.faceColor, 1, 4, 0, 100);
    settings[5] = map(this.hairColor, 1, 6, 0, 100);
    settings[6] = map(this.gender, 1, 5, 0, 100);
    return settings;
  }
}

// given an array of [x,y] points, return the average
function average_point(list) {
  var sum_x = 0;
  var sum_y = 0;
  var num_points = 0;
  for (var i = 0; i < list.length; i++) {
    sum_x += list[i][0];
    sum_y += list[i][1];
    num_points += 1;
  }
  return [sum_x / num_points, sum_y / num_points];
}