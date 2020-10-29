// Remove or set to false to enable full program
//var DEBUG_MODE = true;

// Set the number of sliders to show
// var NUM_SLIDERS = 7;

// Given a segment, this returns the average point [x, y]
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

function ToFace() {
    // State variables
    const purpleEyes = color(222, 181, 255);
    const pinkEyes = color(255, 181, 227);
    const blueEyes = color(158, 196, 255);
    const aquaEyes = color(161, 224, 230);

    // Set default slider values
    this.bubbleSize = 4.6; // Range is from 4 - 5
    this.faceTone = 50; // Range is from 0 - 100
    this.browType = 1; // Can be either 1 or 2
    this.browTilt = 5; // Range is from 0 - 10
    this.eyeColor = 1; // Can be either 1, 2, 3 or 4
    this.blushType = 1; // Can be either 1 or 2
    this.cheekPos = 21; // Range is from 0 - 100

    // Draws a segment, do_loop will connect the ends if true
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
    };

    this.draw = function(positions) {
        let redValue = map(this.faceTone, 0, 100, 227, 196);
        let greenValue = map(this.faceTone, 0, 100, 238, 219);
        let facePos = segment_average(positions.chin);

        // Draw bubble
        stroke(196, 219, 255);
        strokeWeight(0.3);
        fill(redValue, greenValue, 255);
        ellipse(facePos[0], facePos[0], -this.bubbleSize, this.bubbleSize);

        // Draw upper bubble shine
        noStroke();
        strokeWeight(0.05);
        fill(255);
        beginShape();
        vertex(facePos[0] + 0.1 * this.bubbleSize, facePos[0] - 0.4 * this.bubbleSize);
        bezierVertex(facePos[0] + 0.15 * this.bubbleSize, facePos[0] - 0.45 * this.bubbleSize, facePos[0] + 0.35 * this.bubbleSize, facePos[0] - 0.3 * this.bubbleSize, facePos[0] + 0.4 * this.bubbleSize, facePos[0] - 0.15 * this.bubbleSize);
        bezierVertex(facePos[0] + 0.27 * this.bubbleSize, facePos[0] - 0.3 * this.bubbleSize, facePos[0] + 0.24 * this.bubbleSize, facePos[0] - 0.28 * this.bubbleSize, facePos[0] + 0.2 * this.bubbleSize, facePos[0] - 0.3 * this.bubbleSize);
        bezierVertex(facePos[0] + 0.2 * this.bubbleSize, facePos[0] - 0.3 * this.bubbleSize, facePos[0] + 0.02 * this.bubbleSize, facePos[0] - 0.35 * this.bubbleSize, facePos[0] + 0.1 * this.bubbleSize, facePos[0] - 0.4 * this.bubbleSize);
        endShape();
        // Draw lower bubble shine
        push();
        translate(-0.45, 0.45)
        scale(0.7);
        beginShape();
        vertex(facePos[0] - 0.1 * this.bubbleSize, facePos[0] + 0.4 * this.bubbleSize);
        bezierVertex(facePos[0] - 0.15 * this.bubbleSize, facePos[0] + 0.45 * this.bubbleSize, facePos[0] - 0.35 * this.bubbleSize, facePos[0] + 0.3 * this.bubbleSize, facePos[0] - 0.4 * this.bubbleSize, facePos[0] + 0.15 * this.bubbleSize);
        bezierVertex(facePos[0] - 0.27 * this.bubbleSize, facePos[0] + 0.3 * this.bubbleSize, facePos[0] - 0.24 * this.bubbleSize, facePos[0] + 0.28 * this.bubbleSize, facePos[0] - 0.2 * this.bubbleSize, facePos[0] + 0.3 * this.bubbleSize);
        bezierVertex(facePos[0] - 0.2 * this.bubbleSize, facePos[0] + 0.3 * this.bubbleSize, facePos[0] - 0.02 * this.bubbleSize, facePos[0] + 0.35 * this.bubbleSize, facePos[0] - 0.1 * this.bubbleSize, facePos[0] + 0.4 * this.bubbleSize);
        endShape();
        pop();


        // Draw brows
        let leftBrowLeft = positions.left_eyebrow[0];
        let leftBrowTop = positions.left_eyebrow[2];
        let leftBrowRight = positions.left_eyebrow[4];
        let rightBrowLeft = positions.right_eyebrow[0];
        let rightBrowTop = positions.right_eyebrow[2];
        let rightBrowRight = positions.right_eyebrow[4];
        stroke(162, 191, 235);
        strokeWeight(0.15);

        if (this.browType == 1) { // Feminine brows
            push();
            rotate(-this.browTilt);
            line(leftBrowLeft[0], leftBrowLeft[1] + 0.3, leftBrowTop[0], leftBrowTop[1]); // Left pointed brow
            line(leftBrowTop[0], leftBrowTop[1], leftBrowRight[0], leftBrowRight[1] + 0.3);
            rotate(this.browTilt * 2);
            line(rightBrowLeft[0], rightBrowLeft[1] + 0.3, rightBrowTop[0], rightBrowTop[1]); // Right pointed brow
            line(rightBrowTop[0], rightBrowTop[1], rightBrowRight[0], rightBrowRight[1] + 0.3);
            pop();
        } else if (this.browType == 2) { // Masculine brows
            push();
            strokeWeight(0.4);
            rotate(-this.browTilt); // Left brow
            line(leftBrowLeft[0], leftBrowLeft[0] + 0.3, leftBrowRight[0], leftBrowRight[1] + 0.3);
            rotate(this.browTilt * 2); // Right brow
            line(rightBrowLeft[0], rightBrowLeft[1] + 0.3, rightBrowRight[0], rightBrowRight[1] + 0.3);
            pop();
        }


        // Draw eyes
        let leftEyePos = segment_average(positions.left_eye);
        let rightEyePos = segment_average(positions.right_eye);
        let leftEyeShine = positions.left_eye[4];
        let rightEyeShine = positions.right_eye[4];

        if (this.eyeColor == 1) { // 1 = purple eyes (feminine brown eyes)
            fill(purpleEyes);
        } else if (this.eyeColor == 2) { // 2 = pink eyes (feminine other colour)
            fill(pinkEyes);
        } else if (this.eyeColor == 3) { // 3 = blue eyes (masculine brown eyes)
            fill(blueEyes);
        } else if (this.eyeColor == 4) { // 4 = aqua eyes (masculine other colour)
            fill(aquaEyes);
        }

        stroke(255); // Eyes
        strokeWeight(0.2)
        ellipse(leftEyePos[0], leftEyePos[0] + 0.8, 1);
        ellipse(rightEyePos[0], leftEyePos[0] + 0.8, 1);
        fill(255); // Eye shine
        ellipse(leftEyeShine[0], leftEyeShine[0] + 0.5, 0.15);
        ellipse(rightEyeShine[0], leftEyeShine[0] + 0.5, 0.15);


        // Draw blush
        let blushShift = map(this.cheekPos, 0, 100, -1, 1);
        let leftBlush = positions.chin[4];
        let rightBlush = positions.chin[12];

        if (this.blushType == 1) { // Feminine blush
            noStroke();
            fill(255, 181, 227);
            ellipse(leftBlush[0] + blushShift, leftBlush[1] - 0.1, 0.6, 0.25);
            ellipse(rightBlush[0] + blushShift, rightBlush[1] - 0.1, 0.6, 0.25);
        } else if (this.blushType == 2) { // Masculine blush
            stroke(162, 191, 235);
            strokeWeight(0.1);
            noFill();
            beginShape(); // Left cheek squiggle blush
            curveVertex(-1.7 + blushShift, 0.8);
            curveVertex(-1.7 + blushShift, 0.8);
            curveVertex(-1 + blushShift, 0.8);
            curveVertex(-1.4 + blushShift, 1);
            curveVertex(-1 + blushShift, 1);
            curveVertex(-1 + blushShift, 1);
            endShape();
            beginShape(); // Right cheek squiggle blush
            curveVertex(1.7 + blushShift, 0.8);
            curveVertex(1.7 + blushShift, 0.8);
            curveVertex(1 + blushShift, 0.8);
            curveVertex(1.4 + blushShift, 1);
            curveVertex(1 + blushShift, 1);
            curveVertex(1 + blushShift, 1);
            endShape();
        }


        // Draw mouth
        let mouthPos = segment_average(positions.bottom_lip);
        noFill(); // Mouth
        stroke(162, 191, 235);
        strokeWeight(0.2);
        arc(mouthPos[0] - 0.4, mouthPos[1] + 0.2, 0.6, 0.6, 0, 180);
        arc(mouthPos[0] + 0.2, mouthPos[1] + 0.2, 0.6, 0.6, 0, 180);
    }

    // Set internal properties based on list numbers 0-100 
    this.setProperties = function(settings) {
        this.bubbleSize = map(settings[0], 0, 100, 4.2, 5);
        this.faceTone = map(settings[1], 0, 100, 0, 100);
        this.browType = int(map(settings[2], 0, 100, 1, 2));
        this.browTilt = map(settings[3], 0, 100, 0, 10);
        this.eyeColor = int(map(settings[4], 0, 100, 1, 4));
        this.blushType = int(map(settings[5], 0, 100, 1, 2));
        this.cheekPos = map(settings[6], 0, 100, 0, 100);
    }
    // Get internal properties as list of numbers 0-100 
    this.getProperties = function() {
        let settings = new Array(7);
        settings[0] = map(this.bubbleSize, 4.2, 5, 0, 100);
        settings[1] = map(this.faceTone, 0, 100, 0, 100);
        settings[2] = map(this.browType, 1, 2, 0, 100);
        settings[3] = map(this.browTilt, 0, 10, 0, 100);
        settings[4] = map(this.eyeColor, 1, 4, 0, 100);
        settings[5] = map(this.blushType, 1, 2, 0, 100);
        settings[6] = map(this.cheekPos, 0, 100, 0, 100);
        return settings;
    }
}