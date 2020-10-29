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
let cluster = new Cluster();


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
function NgFace() {
    // these are state variables for a face
    // (your variables should be different!)

    this.numOfSq = 7;
    this.numOfTri = focusedRandom(0, 15);
    this.numOfEll = 7;
    this.hairColorSelector = 5;
    this.faceColorSelector = 5;
    this.eyeColorSelector = 5;
    this.eye_shift = -1;
    this.makeUp = 0;


    // example of a function *inside* the face object.
    // this draws a segment, and do_loop will connect the ends if true
    //
    this.draw_segment = function (segment, scaleX, scaleY) {

        for (let i = 0; i < segment.length; i += 1) {
            let px = segment[i][0];
            let py = segment[i][1];
            push()
                translate(px, py);
                scale(scaleX, scaleY);
                rotate(focusedRandom(10, 350));
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop();
        }

    };

    /*
     * Draw the face with position lists that include:
     *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
     *    bottom_lip, top_lip, nose_tip, nose_bridge, 
     */
    this.draw = function (positions) {

    //Colour initialization
        let faceColor = 0;
        let faceShad = 0;
        let hairColor = 0;
        let eyeColor = 0;
        let eyeBallColor = 255;
        let mouthColor = 255;

    //Hair colour range using lerpColor() function
        let fromHair = color(0, 0, 0);
        let toHair = color(252, 226, 91);
        let interHair = lerpColor(fromHair, toHair, this.hairColorSelector);

    //Face colour range using lerpColor() function
        let fromFace = color(105, 64, 29);
        let toFace = color(255, 219, 172);
        let interFace = lerpColor(fromFace, toFace, this.faceColorSelector);

    //FaceShad colour range using lerpColor() function
        let fromFaceShad = color(64, 39, 17);
        let toFaceShad = color(227, 195, 154);
        let interFaceShad = lerpColor(fromFaceShad, toFaceShad, this.faceColorSelector);

    //Eye colour range using lerpColor() function
        let fromEye = color(0, 0, 0);
        let toEye = color(0, 255, 247);
        let interEye = lerpColor(fromEye, toEye, this.eyeColorSelector);

    //Shared Variable
        let left_eye_pos = segment_average(positions.left_eye);
        let right_eye_pos = segment_average(positions.right_eye);
        let top_mouth_pos = segment_average(positions.top_lip);
        let bottom_mouth_pos = segment_average(positions.bottom_lip);
        let avgBrowLine = (positions.left_eyebrow[2][1] + positions.right_eyebrow[2][1]) / 2
        const makeupThreshold = 0.475;

        noStroke()
    //face
        let faceback_midpt_x = ((positions.chin[16][0] - positions.chin[0][0]) / 2) + positions.chin[0][0];
        let faceback_midpt_y = ((positions.chin[8][1] - avgBrowLine) / 2) + avgBrowLine;
        let faceback_height = dist(positions.chin[8][0], avgBrowLine, positions.chin[8][0], positions.chin[8][1]);
        let faceback_y_scale = map(faceback_height, 0.01, 3.78, 0.01, 1.85);
        let faceback_width = dist(positions.chin[0][0], positions.chin[0][1], positions.chin[16][0], positions.chin[16][1]);
        let faceback_x_scale = map(faceback_width, 0.01, 3.31, 0.1, 1.25);
        //Cheeks to show face direction
        push()
            translate(faceback_midpt_x + 0, faceback_midpt_y - 0.55);
            scale(faceback_x_scale, faceback_y_scale);
            fill(interFaceShad);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
        pop()

        let faceMidPtX = ((right_eye_pos[0] - left_eye_pos[0]) / 2) + left_eye_pos[0];
        let faceMidPtY = ((positions.chin[8][1] - avgBrowLine) / 2) + avgBrowLine;
        let face_height = dist(positions.chin[8][0], avgBrowLine, positions.chin[8][0], positions.chin[8][1]);
        let face_y_scale = map(face_height, 0.01, 3.5, 0.01, 1.3);
        let face_width = dist(left_eye_pos[0], left_eye_pos[1], right_eye_pos[0], right_eye_pos[1]);
        let face_x_scale = map(face_width, 0.01, 1.4, 0.1, 0.8);

        push()
            fill(interFace)
            translate(faceMidPtX, faceMidPtY + 0.1);
            scale(face_x_scale, face_y_scale);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);//Lower face
            translate(0, -1);
            scale(1.2, 1);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);//Upper face
        pop()

    //eyeball 
        //Eye shadow   
        if (this.makeUp > makeupThreshold) {
            fill(50, 50);
            //Left Eye
            push();
                translate(left_eye_pos[0], left_eye_pos[1] - 0.1);
                scale(0.2, 0.1);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop();

            //Right Eye
            push();
                translate(right_eye_pos[0], right_eye_pos[1] - 0.1);
                scale(0.2, 0.1);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop();
        }
        //Eyes
        fill(255);
        push();
            translate(left_eye_pos[0], left_eye_pos[1]);
            scale(0.2, 0.1);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
        pop();

        push();
            translate(right_eye_pos[0], right_eye_pos[1]);
            scale(0.2, 0.1);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
        pop();

    //eyebrow
        fill(interHair);
        //Left Eyebrow
        for (let j = 0; j < positions.left_eyebrow.length - 1; j++) {
            let v1 = createVector(positions.left_eyebrow[j][0], positions.left_eyebrow[j][1]);
            let v2 = createVector(positions.left_eyebrow[j + 1][0], positions.left_eyebrow[j + 1][1]);
            let angleBetweenL = v1.angleBetween(v2);
            push();
                translate(positions.left_eyebrow[j][0], positions.left_eyebrow[j][1]);
                rotate(-angleBetweenL);
                scale(0.15, 0.05);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop();
        }
        //Right Eyebrow
        for (let k = 0; k < positions.right_eyebrow.length - 1; k++) {
            let v3 = createVector(positions.right_eyebrow[k][0], positions.right_eyebrow[k][1]);
            let v4 = createVector(positions.right_eyebrow[k + 1][0], positions.right_eyebrow[k + 1][1]);
            let angleBetweenR = v3.angleBetween(v4);
            push();
                translate(positions.right_eyebrow[k][0], positions.right_eyebrow[k][1]);
                rotate(angleBetweenR);
                scale(0.15, 0.05);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop()
        }

    // pupils
        let curEyeShift = 0.04 * this.eye_shift;
        fill(interEye);
        //Left pupil
        push()
            translate(left_eye_pos[0] + curEyeShift, left_eye_pos[1]);
            scale(0.07);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
        pop();
        //Right pupil
        push();
            translate(right_eye_pos[0] + curEyeShift, right_eye_pos[1]);
            scale(0.07);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
        pop();

    //mouth
        let mouth_midpt_y = ((positions.bottom_lip[9][1] - positions.top_lip[9][1]) / 2) + positions.top_lip[9][1];
        let mouth_midpt_x = ((positions.top_lip[6][0] - positions.top_lip[0][0]) / 2) + positions.top_lip[0][0];
        let mouth_height = dist(positions.top_lip[9][0], positions.top_lip[9][1], positions.bottom_lip[9][0], positions.bottom_lip[9][1]);
        let mouth_y_scale = map(mouth_height, 0.1, 0.35, 0.005, 0.1);
        let mouth_width = dist(positions.top_lip[0][0], positions.top_lip[0][1], positions.top_lip[6][0], positions.top_lip[6][1]);
        let mouth_x_scale = map(mouth_width, 0.01, 1.5, 0.01, 0.35);

        //Turn mouth black when it is "closed"

        if (mouth_height <= 0.1) {
            mouthColor = 0;
        }

        //lipstick
        if (this.makeUp > makeupThreshold) {
            push()
                translate(mouth_midpt_x, mouth_midpt_y);
                scale(mouth_x_scale + 0.05, mouth_y_scale + 0.05);
                fill(235, 64, 52);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop()
        }


        push()
            translate(mouth_midpt_x, mouth_midpt_y);
            scale(mouth_x_scale, mouth_y_scale);
            fill(mouthColor);
            cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
        pop()


    //nose
        blendMode(MULTIPLY)
        fill(100, 0, 100);
        let noseq1 = color(150);
        let noseq2 = color(50);

        if (positions.nose_bridge[3][0] <= positions.nose_tip[2][0]) {
            noseq1 = color(50);
            noseq2 = color(150);
        }

        fill(noseq1);
        beginShape();
            vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
            vertex(positions.nose_tip[0][0], positions.nose_tip[0][1]);
            vertex(positions.nose_tip[2][0], positions.nose_tip[2][1]);
            vertex(positions.nose_bridge[3][0], positions.nose_bridge[3][1]);
        endShape(CLOSE);


        fill(noseq2);
        beginShape();
            vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1]);
            vertex(positions.nose_bridge[3][0], positions.nose_bridge[3][1]);
            vertex(positions.nose_tip[2][0], positions.nose_tip[2][1]);
            vertex(positions.nose_tip[4][0], positions.nose_tip[4][1]);
        endShape(CLOSE);

    //Blush
        if (this.makeUp > makeupThreshold) {

            push();
                fill(255, 233, 232, 20);
                translate(left_eye_pos[0], positions.nose_bridge[3][1] + 0.2);
                scale(0.3, 0.5);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop();

            push();
                fill(255, 233, 232, 15);
                translate(right_eye_pos[0], positions.nose_bridge[3][1] + 0.2);
                scale(0.3, 0.5);
                cluster.draw(this.numOfSq, this.numOfTri, this.numOfEll);
            pop();
        }
    }

    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function (settings) {
        this.faceColorSelector = map(settings[0], 0, 100, 0, 1);
        this.eye_shift = map(settings[1], 0, 100, -4, 4);
        this.eyeColorSelector = map(settings[2], 0, 100, 0, 1);
        this.hairColorSelector = map(settings[3], 0, 100, 0, 1);
        this.makeUp = map(settings[4], 0, 100, 0, 1);
        this.numOfSq = int(map(settings[5], 0, 100, 0, 15));
        this.numOfEll = int(map(settings[6], 0, 100, 0, 15));
    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function () {
        let settings = new Array(6)
        settings[0] = map(this.faceColorSelector, 0, 1, 0, 100);
        settings[1] = map(this.eye_shift, -4, 4, 0, 100);
        settings[2] = map(this.eyeColorSelector, 0, 1, 0, 100);
        settings[3] = map(this.hairColorSelector, 0, 1, 0, 100);
        settings[4] = map(this.makeUp, 0, 1, 0, 100);
        settings[5] = map(this.numOfSq, 0, 15, 0, 100);
        settings[6] = map(this.numOfEll, 0, 15, 0, 100);
        return settings;
    }
}

function Cluster() {
    this.arrayXSq = [];
    this.arrayYSq = [];
    this.arraySSq = [];
    this.arrayXTri = [];
    this.arrayYTri = [];
    this.arraySTri = [];
    this.arrayXEll = [];
    this.arrayYEll = [];
    this.arraySEll = [];

    for (let i = 0; i < 20; i++) {
        this.xPosSq = focusedRandom(-3, 3) * 0.4;
        this.yPosSq = focusedRandom(-3, 3) * 0.4;
        this.sSizeSq = focusedRandom(4, 7) * 0.3;
        this.arrayXSq.push(this.xPosSq);
        this.arrayYSq.push(this.yPosSq);
        this.arraySSq.push(this.sSizeSq);

        this.xPosTri = focusedRandom(-3, 3) * 0.4;
        this.yPosTri = focusedRandom(-3, 3) * 0.4;
        this.sSizeTri = focusedRandom(4, 7) * 0.2;
        this.arrayXTri.push(this.xPosTri);
        this.arrayYTri.push(this.yPosTri);
        this.arraySTri.push(this.sSizeTri);

        this.xPosEll = focusedRandom(-3, 3) * 0.4;
        this.yPosEll = focusedRandom(-3, 3) * 0.4;
        this.sSizeEll = focusedRandom(4, 7) * 0.3;
        this.arrayXEll.push(this.xPosEll);
        this.arrayYEll.push(this.yPosEll);
        this.arraySEll.push(this.sSizeEll);
    }

    this.draw = function (testValue1, testValue2, testValue3) {
        rectMode(CENTER);

        noStroke();
        beginShape();
        for (let j = 0; j < testValue1; j++) {
            let x = this.arrayXSq[j];
            let y = this.arrayYSq[j];
            if (x < 0 && y < 0) {
                x += ((5 / 3) * 0.4);
                y += ((5 / 4) * 0.4);
            } else if (x < 0 && y > 0) {
                x += ((5 / 3) * 0.4);
                y -= ((5 / 4) * 0.4);
            } else if (x > 0 && y > 0) {
                x -= ((5 / 3) * 0.4);
                y -= ((5 / 4) * 0.4);
            } else if (x > 0 && y < 0) {
                x -= ((5 / 3) * 0.4);
                y += ((5 / 4) * 0.4);
            }

            push();
            translate(x, y);
            //vertex(x, y);
            square(0, 0, this.arraySSq[j]);
            pop();
        }
        endShape(CLOSE);

        beginShape();
        for (let k = 0; k < testValue2; k++) {
            let x = this.arrayXTri[k];
            let y = this.arrayYTri[k];
            if (x < 0 && y < 0) {
                x += ((5 / 3) * 0.4);
                y += ((5 / 4) * 0.4);
            } else if (x < 0 && y > 0) {
                x += ((5 / 3) * 0.4);
                y -= ((5 / 4) * 0.4);
            } else if (x > 0 && y > 0) {
                x -= ((5 / 3) * 0.4);
                y -= ((5 / 4) * 0.4);
            } else if (x > 0 && y < 0) {
                x -= ((5 / 3) * 0.4);
                y += ((5 / 4) * 0.4);
            }

            push();
            translate(x, y);
            //vertex(x, y);
            cusTriangle(0, 0, this.arraySTri[k]);
            pop();
        }
        endShape(CLOSE);

        beginShape();
        for (let l = 0; l < testValue3; l++) {
            let x = this.arrayXEll[l];
            let y = this.arrayYEll[l];
            if (x < 0 && y < 0) {
                x += ((5 / 3) * 0.4);
                y += ((5 / 4) * 0.4);
            } else if (x < 0 && y > 0) {
                x += ((5 / 3) * 0.4);
                y -= ((5 / 4) * 0.4);
            } else if (x > 0 && y > 0) {
                x -= ((5 / 3) * 0.4);
                y -= ((5 / 4) * 0.4);
            } else if (x > 0 && y < 0) {
                x -= ((5 / 3) * 0.4);
                y += ((5 / 4) * 0.4);
            }

            push();
            translate(x, y);
            //vertex(x, y);
            ellipse(0, 0, this.arraySEll[l]);
            pop();
        }
        endShape(CLOSE);
    };
}

function cusTriangle(x, y, radius) {
    let angle = 360 / 3;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);

}