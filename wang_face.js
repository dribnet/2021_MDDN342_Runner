/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 7;

// other variables can be in here too
// here's some examples for colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
    let sum_x = 0;
    let sum_y = 0;
    let s_len = segment.length;
    for (let i = 0; i < s_len; i++) {
        sum_x = sum_x + segment[i][0];
        sum_y = sum_y + segment[i][1];
    }
    return [sum_x / s_len, sum_y / s_len];
}



// This where you define your own face object
function WangFace() {
    // these are state variables for a face
    // (your variables should be different!)

    this.blush = 1;
    this.eye_type = 1;
    this.ear_color = 1;
    this.guys_faceColor = 1;
    this.girls_faceColor = 1;
    this.lip_color = 1;
    this.pupil_color = 1;

    /*
     * Draw the face with position lists that include:
     *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
     *    bottom_lip, top_lip, nose_tip, nose_bridge, 
     */


    this.draw = function(positions) {

        //*****Positions*****/
        let nose = positions.nose_bridge[3];
        let nose_bridge = positions.nose_bridge[1];
        let left_chin = positions.chin[1];
        let right_chin = positions.chin[15];
        let face_centre = positions.nose_bridge[0];
        let nose_tip = positions.nose_tip[2];
        let lefteye_pos = segment_average(positions.left_eye)
        let righteye_pos = segment_average(positions.right_eye)
        let face_centreX = lefteye_pos[0] + (righteye_pos[0] - lefteye_pos[0]) / 2;
        let face_centreY = face_centre[1];

        let left_eyebrow0 = positions.left_eyebrow[0];
        let left_eyebrow1 = positions.left_eyebrow[1];
        let left_eyebrow2 = positions.left_eyebrow[2];
        let left_eyebrow3 = positions.left_eyebrow[3];
        let left_eyebrow4 = positions.left_eyebrow[4];

        let right_eyebrow0 = positions.right_eyebrow[0];
        let right_eyebrow1 = positions.right_eyebrow[1];
        let right_eyebrow2 = positions.right_eyebrow[2];
        let right_eyebrow3 = positions.right_eyebrow[3];
        let right_eyebrow4 = positions.right_eyebrow[4];

        let bottom_lip3 = positions.bottom_lip[2];
        let bottom_lip4 = positions.bottom_lip[3];
        let bottom_lip5 = positions.bottom_lip[4];
        let bottom_lip9 = positions.bottom_lip[8];
        let bottom_lip10 = positions.bottom_lip[9];
        let bottom_lip11 = positions.bottom_lip[10];

        let top_lip2 = positions.top_lip[1];
        let top_lip3 = positions.top_lip[2];
        let top_lip5 = positions.top_lip[4];
        let top_lip6 = positions.top_lip[5];
        let top_lip8 = positions.top_lip[7];
        let top_lip9 = positions.top_lip[8];
        let top_lip10 = positions.top_lip[9];
        let top_lip11 = positions.top_lip[10];


        const white = color(255, 255, 255);
        const pink0 = color(240, 187, 230);
        const pink4 = color(235, 225, 233);
        const blue = color(14, 55, 120);
        const lightblue = color(168, 192, 230);
        const gold = color(247, 224, 15);
        const blondish = color(240, 208, 113);
        const brown = color(61, 48, 1);
        const red = color(196, 15, 6);
        const darkRed = color(133, 13, 4);
        const bloodyhell = color(107, 39, 48);
        const lightGrey = color(204, 198, 198);


        //*****Colors*****/
        let innerGuyface = lerpColor(white, gold, this.guys_faceColor);
        let innerGirlface = lerpColor(pink0, pink4, this.girls_faceColor);
        let innerEye = lerpColor(lightGrey, brown, this.pupil_color);
        let innerHair = lerpColor(blondish, darkRed, this.ear_color);
        let innerLip = lerpColor(white, red, this.lip_color);


        //*******World settings*****//
        var hw = 6;
        var hh = 5;

        angleMode(DEGREES);
        stroke(0);
        strokeWeight(0.15);


        /////****Ears****////
        //****left
        push();

        translate(left_chin[0], left_chin[1]);
        let eyebrow_lengthL = dist(left_eyebrow0[0], left_eyebrow0[1], left_eyebrow4[0], left_eyebrow4[1]);
        let ear_scaleL = map(eyebrow_lengthL, 0.5, 1, 0.7, 1);
        if (eyebrow_lengthL > 1) {
            ear_scaleL = 1;
        }
        scale(ear_scaleL);


        //gender threshold
        let gender = 1.61;

        //left back
        if (this.eye_type < gender) {
            fill(innerGirlface);
        } else if (this.eye_type > gender) {
            fill(innerGuyface);
        }
        beginShape();
        curveVertex((-3 + 0.5) * 0.4, (-5.5) * 0.4);
        curveVertex((-3 + 0.5) * 0.4, (-5.5) * 0.4);
        curveVertex((-2.3 + 0.5) * 0.4, (-1.5) * 0.4);
        curveVertex((1.5 + 0.5) * 0.4, (-4.5) * 0.4);
        curveVertex((-2 + 0.5) * 0.4, (-6.5) * 0.4);
        curveVertex((-3 + 0.5) * 0.4, (-5.5) * 0.4);
        curveVertex((-3 + 0.5) * 0.4, (-5.5) * 0.4);
        endShape();

        //left front
        fill(innerHair);
        stroke(0);
        strokeWeight(0.15);
        beginShape();
        curveVertex((-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        curveVertex((-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        curveVertex((-5.8 + 4.5) * 0.3, (-4 + 2) * 0.3);
        curveVertex((-2 + 4.5) * 0.3, (-7 + 2) * 0.3);
        curveVertex((-5.5 + 4.5) * 0.3, (-9 + 2) * 0.3);
        curveVertex((-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        curveVertex((-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        endShape();
        pop();

        //****Right
        push();
        stroke(0);
        strokeWeight(0.15);
        translate(right_chin[0], right_chin[1]);

        let eyebrow_lengthR = dist(right_eyebrow0[0], right_eyebrow0[1], right_eyebrow4[0], right_eyebrow4[1]);
        let ear_scaleR = map(eyebrow_lengthR, 0.5, 1, 0.7, 1);
        if (eyebrow_lengthR > 1) {
            ear_scaleR = 1;
        }
        scale(ear_scaleR);

        //right back
        if (this.eye_type < gender) {
            fill(innerGirlface);
        } else if (this.eye_type > gender) {
            fill(innerGuyface);
        }
        beginShape();
        curveVertex(-(-3 + 0.5) * 0.4, (-5.5) * 0.4);
        curveVertex(-(-3 + 0.5) * 0.4, (-5.5) * 0.4);
        curveVertex(-(-2.3 + 0.5) * 0.4, (-1.5) * 0.4);
        curveVertex(-(1.5 + 0.5) * 0.4, (-4.5) * 0.4);
        curveVertex(-(-2 + 0.5) * 0.4, (-6.5) * 0.4);
        curveVertex(-(-3 + 0.5) * 0.4, (-5.5) * 0.4);
        curveVertex(-(-3 + 0.5) * 0.4, (-5.5) * 0.4);
        endShape();

        //right front
        fill(innerHair);
        beginShape();
        curveVertex(-(-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        curveVertex(-(-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        curveVertex(-(-5.8 + 4.5) * 0.3, (-4 + 2) * 0.3);
        curveVertex(-(-2 + 4.5) * 0.3, (-7 + 2) * 0.3);
        curveVertex(-(-5.5 + 4.5) * 0.3, (-9 + 2) * 0.3);
        curveVertex(-(-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        curveVertex(-(-6.5 + 4.5) * 0.3, (-8 + 2) * 0.3);
        endShape();

        pop();

        /////****Collar****////
        push();
        fill(blue);
        ellipse(left_chin[0] + (right_chin[0] - left_chin[0]) / 2, left_chin[1] + 2.2, ((right_chin[0] - left_chin[0])), 1);
        pop();


        /////****Bell****////
        push();
        fill(255, 200, 30);
        ellipse((right_chin[0] - left_chin[0]) / 2 + left_chin[0], left_chin[1] + 3.1 - 0.1, 0.8);

        noFill();
        arc((right_chin[0] - left_chin[0]) / 2 + left_chin[0], left_chin[1] + 3 - 0.45 - 0.1, 1, 1, 60, 120);

        noFill();
        arc((right_chin[0] - left_chin[0]) / 2 + left_chin[0] - 0.5, left_chin[1] + 3.6 - 0.45 - 0.1, 1, 1, -10, 20);
        pop();


        /////****Head****////
        if (this.eye_type < gender) {
            fill(innerGirlface);
        } else if (this.eye_type > gender) {
            fill(innerGuyface);
        }
        ellipse((right_chin[0] - left_chin[0]) / 2 + left_chin[0], left_chin[1], ((right_chin[0] - left_chin[0])) * 1.6, hh - 0.35);

        /////****Coin****////
        push();
        fill(255, 200, 30);

        let looking_dist = (positions.nose_tip[2][1] - positions.left_eyebrow[4][1]) - (positions.chin[8][1] - positions.nose_tip[2][1]);
        let coin_scale = map(looking_dist, -0.5, 0.3, 0.3, 0.9);

        translate((right_chin[0] - left_chin[0]) / 2 + left_chin[0], left_chin[1] - (hh - 0.35) / 2 + 0.1);
        scale(1, coin_scale);
        let shear_angle = map(nose[0], -0.82, 0.66, -45, 45);
        shearX(shear_angle);

        var a = face_centre[0] - ((right_chin[0] - left_chin[0]) / 2 + left_chin[0]) * 5;
        arc(0, 0, 0.8, 0.8, 0 + a, 180 + a);
        arc(0, 0, 0.3, 0.3, 0 + a, 180 + a);
        pop();


        /////****Eyes****////

        //leftBigeye
        noStroke();
        fill(innerEye);
        if (a < 0) {
            ellipse(left_eyebrow2[0], left_eyebrow2[1] + 0.5, 0.9 + a / 30, 1);
        } else {
            ellipse(left_eyebrow2[0], left_eyebrow2[1] + 0.5, 0.9, 1);
        }

        //rightBigeye
        noStroke();
        fill(innerEye);
        if (a > 0) {
            ellipse(right_eyebrow2[0], right_eyebrow2[1] + 0.5, 0.9 - a / 30, 1);
        } else {
            ellipse(right_eyebrow2[0], right_eyebrow2[1] + 0.5, 0.9, 1);
        }

        if (this.eye_type <= gender) {
            ////girls pupil

            //leftCoinPupil
            fill(gold);
            noStroke();
            stroke(255, 141, 24, 50);
            strokeWeight(0.1);

            ellipse(left_eyebrow2[0], lefteye_pos[1] - 0.1, 0.4 * sin(frameCount * 2), 0.5);

            //leftShine
            noFill();
            stroke(255);
            strokeWeight(0.08);

            if (220 + sin(frameCount * 4 + 90) * 10 < 226) {
                arc(left_eyebrow2[0], lefteye_pos[1] - 0.1, 0.4 * sin(frameCount * 2), 0.5, 220 + sin(frameCount * 4 + 90) * 10, 230);
            }

            //rightCoinPupil
            fill(gold);
            noStroke();
            stroke(255, 141, 24, 50);
            strokeWeight(0.1);

            ellipse(right_eyebrow2[0], righteye_pos[1] - 0.1, 0.4 * sin(frameCount * 2), 0.5);

            //rightShine
            stroke(255);
            strokeWeight(0.08);

            if (220 + sin(frameCount * 4 + 90) * 10 < 226) {
                arc(right_eyebrow2[0], righteye_pos[1] - 0.1, 0.4 * sin(frameCount * 2), 0.5, 220 + sin(frameCount * 4 + 90) * 10, 230);
            }
        }

        if (this.eye_type > gender) {
            //guys
            //leftCoinPupil
            fill(gold);
            strokeWeight(0.1);
            stroke(255, 141, 24, 50);
            ellipse(right_eyebrow2[0], righteye_pos[1], 0.3 * sin(frameCount * 2), 0.4);

            //rightCoinPupil
            fill(gold);
            strokeWeight(0.1);
            stroke(255, 141, 24, 50);
            ellipse(left_eyebrow2[0], lefteye_pos[1], 0.3 * sin(frameCount * 2), 0.4);
        }


        //left eyeframe
        //up
        noFill();
        beginShape();
        strokeWeight(0.2);
        stroke(0);
        curveVertex(left_eyebrow0[0] - 0.15, left_eyebrow0[1] - 0.1);
        curveVertex(left_eyebrow0[0] - 0.15, left_eyebrow0[1] - 0.1);
        curveVertex(left_eyebrow0[0], left_eyebrow0[1] - 0.1);

        curveVertex(left_eyebrow1[0], left_eyebrow1[1] - 0.05);
        curveVertex(left_eyebrow2[0], left_eyebrow2[1] - 0.05);
        curveVertex(left_eyebrow3[0], left_eyebrow3[1] - 0.05);
        curveVertex(left_eyebrow4[0], left_eyebrow4[1]);
        curveVertex(left_eyebrow4[0] + 0.1, left_eyebrow4[1] + 0.1);
        curveVertex(left_eyebrow4[0] + 0.1, left_eyebrow4[1] + 0.1);
        endShape();

        //down
        beginShape()
        curveVertex(left_eyebrow1[0], left_eyebrow1[1] + 1);
        curveVertex(left_eyebrow1[0], left_eyebrow1[1] + 1);
        curveVertex(left_eyebrow2[0], left_eyebrow2[1] + 1);
        curveVertex(left_eyebrow3[0], left_eyebrow3[1] + 1);
        curveVertex(left_eyebrow4[0], left_eyebrow4[1] + 1);
        curveVertex(left_eyebrow4[0], left_eyebrow4[1] + 1);
        endShape()

        //right eyeframe
        //up
        noFill();
        beginShape();
        strokeWeight(0.2);
        curveVertex(right_eyebrow0[0] - 0.15, right_eyebrow0[1] + 0.1);
        curveVertex(right_eyebrow0[0] - 0.15, right_eyebrow0[1] + 0.1);
        curveVertex(right_eyebrow0[0], right_eyebrow0[1]);

        curveVertex(right_eyebrow1[0], right_eyebrow1[1]);
        curveVertex(right_eyebrow2[0], right_eyebrow2[1]);
        curveVertex(right_eyebrow3[0], right_eyebrow3[1]);
        curveVertex(right_eyebrow4[0], right_eyebrow4[1]);
        curveVertex(right_eyebrow4[0] + 0.1, right_eyebrow4[1]);
        curveVertex(right_eyebrow4[0] + 0.1, right_eyebrow4[1]);
        endShape();

        //down
        beginShape();
        curveVertex(right_eyebrow0[0], right_eyebrow0[1] + 1);
        curveVertex(right_eyebrow0[0], right_eyebrow0[1] + 1);
        curveVertex(right_eyebrow1[0], right_eyebrow1[1] + 1);
        curveVertex(right_eyebrow2[0], right_eyebrow2[1] + 1);
        curveVertex(right_eyebrow3[0], right_eyebrow3[1] + 1);
        curveVertex(right_eyebrow3[0], right_eyebrow3[1] + 1);
        endShape();

        /////****Eye lashes****////
        //left
        stroke(0);
        strokeWeight(0.12);
        line(left_eyebrow0[0], left_eyebrow0[1] - 0.2, left_eyebrow0[0] - 0.05, left_eyebrow0[1] - 0.3);
        line(left_eyebrow1[0], left_eyebrow1[1] - 0.2, left_eyebrow1[0] - 0.05, left_eyebrow1[1] - 0.3);
        line(left_eyebrow2[0], left_eyebrow2[1] - 0.2, left_eyebrow2[0] - 0.05, left_eyebrow2[1] - 0.3);

        //right
        stroke(0);
        strokeWeight(0.12);
        line(right_eyebrow4[0], right_eyebrow4[1] - 0.15, right_eyebrow4[0] + 0.06, right_eyebrow4[1] - 0.25);
        line(right_eyebrow3[0], right_eyebrow3[1] - 0.15, right_eyebrow3[0] + 0.06, right_eyebrow3[1] - 0.25);
        line(right_eyebrow2[0], right_eyebrow2[1] - 0.15, right_eyebrow2[0] + 0.06, right_eyebrow2[1] - 0.25);


        /////****Lips****////
        //BottomLip
        strokeCap(ROUND);
        fill(innerLip);
        beginShape();
        curveVertex(top_lip2[0], top_lip2[1] + 0.05);
        curveVertex(top_lip2[0], top_lip2[1] + 0.05);
        curveVertex(bottom_lip3[0] - 0.4, bottom_lip3[1] - 0.05);
        curveVertex(bottom_lip4[0], bottom_lip4[1]);
        curveVertex(bottom_lip5[0] + 0.4, bottom_lip5[1] - 0.05);
        curveVertex(top_lip6[0], top_lip6[1] + 0.05);
        curveVertex(top_lip6[0], top_lip6[1] + 0.05);
        endShape();


        if (abs(top_lip10[1] - bottom_lip10[1]) < 0.1) {
            fill(innerLip);
        } else {
            fill(white);
        }

        beginShape();
        strokeCap(ROUND);

        curveVertex(top_lip9[0] + 0.2, top_lip9[1]);
        curveVertex(top_lip9[0] + 0.2, top_lip9[1]);
        curveVertex(top_lip10[0], top_lip10[1] - 0.1);
        curveVertex(top_lip11[0] - 0.1, top_lip11[1]);

        curveVertex(bottom_lip9[0] + 0.05, bottom_lip9[1]);
        curveVertex(bottom_lip10[0], bottom_lip10[1]);
        curveVertex(bottom_lip11[0], bottom_lip11[1]);
        curveVertex(top_lip9[0] + 0.2, top_lip9[1]);
        endShape(CLOSE);


        //TopLip
        fill(innerLip);
        strokeWeight(0.06);
        beginShape();
        curveVertex(top_lip3[0] + 0.05, top_lip3[1] - 0.05);
        curveVertex(top_lip3[0] + 0.05, top_lip3[1] - 0.05);
        curveVertex(top_lip9[0] + 0.2, top_lip9[1]);
        curveVertex(top_lip10[0], top_lip10[1] - 0.1);
        curveVertex(top_lip11[0] - 0.1, top_lip11[1]);
        curveVertex(top_lip5[0] - 0.05, top_lip5[1] - 0.05);
        curveVertex(top_lip5[0] - 0.05, top_lip5[1] - 0.05);
        endShape();

        push();
        noFill();
        strokeWeight(0.15)
        stroke(0)
        beginShape();
        strokeCap(ROUND);
        curveVertex(nose[0], nose[1]);
        curveVertex(nose[0], nose[1]);
        curveVertex(nose_tip[0], nose_tip[1]);
        curveVertex(top_lip3[0] + 0.05, top_lip3[1] - 0.05); //
        curveVertex(top_lip2[0], top_lip2[1]);
        curveVertex(top_lip2[0], top_lip2[1]);
        endShape();

        noFill();
        beginShape();
        strokeCap(ROUND);
        curveVertex(nose[0], nose[1]);
        curveVertex(nose[0], nose[1]);
        curveVertex(nose_tip[0], nose_tip[1]);
        curveVertex(top_lip5[0] - 0.05, top_lip5[1] - 0.05); //
        curveVertex(top_lip6[0] + 0.05, top_lip6[1]);
        curveVertex(top_lip6[0] + 0.05, top_lip6[1]);
        endShape();
        pop();

        /////****Nose****////
        fill(255, 200, 30);
        stroke(0);
        strokeWeight(0.12);
        ellipse(nose[0], nose[1], 0.4, 0.3);

        //blush or whiskers
        if (this.blush <= gender) {
            ///****Blush****////
            fill(171, 69, 58, 150);
            stroke(171, 69, 58, 150);

            //left
            push();
            if (a < 0) {
                ellipse(left_eyebrow2[0] - 0.5, left_eyebrow2[1] + 1.5, 0.9 + a / 10, 0.5);
            } else {
                ellipse(left_eyebrow2[0] - 0.5, left_eyebrow2[1] + 1.5, 0.9, 0.5);
            }
            pop();

            //right
            push();
            if (a > 0) {
                ellipse(right_eyebrow2[0] + 0.5, right_eyebrow2[1] + 1.5, 0.9 - a / 30, 0.5);
            } else {
                ellipse(right_eyebrow2[0] + 0.5, right_eyebrow2[1] + 1.5, 0.9, 0.5);
            }
            pop();
        }

        if (this.blush > gender) {
            ///****Whiskers****////
            arc(left_chin[0] + (nose_bridge[0] - left_chin[0]) / 2 - 1, nose_bridge[1] - 0.5, (nose_bridge[0] - left_chin[0]) / 2 + 1, 2.5, 60, 140);
            arc(left_chin[0] + (nose_bridge[0] - left_chin[0]) / 2 - 1, nose_bridge[1] - 0.2, (nose_bridge[0] - left_chin[0]) / 2 + 1, 2.5, 60, 140);
            arc(left_chin[0] + (nose_bridge[0] - left_chin[0]) / 2 - 1, nose_bridge[1] + 0.1, (nose_bridge[0] - left_chin[0]) / 2 + 1, 2.5, 60, 140);

            arc(right_chin[0] - (right_chin[0] - nose_bridge[0]) / 2 + 1, nose_bridge[1] - 0.5, (right_chin[0] - nose_bridge[0]) / 2 + 1, 2.5, 50, 130);
            arc(right_chin[0] - (right_chin[0] - nose_bridge[0]) / 2 + 1, nose_bridge[1] - 0.2, (right_chin[0] - nose_bridge[0]) / 2 + 1, 2.5, 50, 130);
            arc(right_chin[0] - (right_chin[0] - nose_bridge[0]) / 2 + 1, nose_bridge[1] + 0.1, (right_chin[0] - nose_bridge[0]) / 2 + 1, 2.5, 50, 130);
        }

        ///////ref points
        // stroke(white);
        // ellipse(left_eyebrow0[0], left_eyebrow0[1], 0.05);
        // ellipse(left_eyebrow1[0], left_eyebrow1[1], 0.05);
        // ellipse(left_eyebrow2[0], left_eyebrow2[1], 0.05);
        // ellipse(left_eyebrow3[0], left_eyebrow3[1], 0.05);
        // ellipse(left_eyebrow4[0], left_eyebrow4[1], 0.05);//left ref points

        // ellipse(right_eyebrow0[0], right_eyebrow0[1], 0.05);
        // ellipse(right_eyebrow1[0], right_eyebrow1[1], 0.05);
        // ellipse(right_eyebrow2[0], right_eyebrow2[1], 0.05);
        // ellipse(right_eyebrow3[0], right_eyebrow3[1], 0.05);
        // ellipse(right_eyebrow4[0], right_eyebrow4[1], 0.05);// right ref points

        //  ellipse(left_chin[0], left_chin[1], 0.05)
        // ellipse(right_chin[0], left_chin[1], 0.05)//chin ref points

        //  stroke(255, 255, 255)
        //  ellipse(righteye_pos[0], righteye_pos[1], 0.05)
        //  ellipse(lefteye_pos[0], lefteye_pos[1], 0.05)  //pupilref

        //ellipse(face_centreX, face_centreY, 0.05);//faceCenter ref
    }


    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {
        this.blush = map(settings[0], 0, 100, 1, 2);
        this.eye_type = map(settings[1], 0, 100, 1, 2);
        this.ear_color = map(settings[2], 0, 100, 0, 1);
        this.guys_faceColor = map(settings[3], 0, 100, 0, 1);
        this.lip_color = map(settings[4], 0, 100, 0, 1);
        this.pupil_color = map(settings[5], 0, 100, 0, 1);
        this.girls_faceColor = map(settings[6], 0, 100, 0, 1);
    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        let settings = new Array(7);
        settings[0] = map(this.blush, 1, 2, 0, 100);
        settings[1] = map(this.eye_type, 1, 2, 0, 100);
        settings[2] = map(this.ear_color, 0, 1, 0, 100);
        settings[3] = map(this.guys_faceColor, 0, 1, 0, 100);
        settings[4] = map(this.lip_color, 0, 1, 0, 100);
        settings[5] = map(this.pupil_color, 0, 1, 0, 100);
        settings[6] = map(this.girls_faceColor, 0, 1, 0, 100);
        return settings;
    }
}