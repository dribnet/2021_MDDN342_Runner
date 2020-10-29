/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */
// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;
// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 3;




// This where you define your own face object
function HowardFace() {
    const light = color(250, 200, 140);
    const middle = color(230, 155, 75);
    const dark = color(170, 125, 70);
    const tan = color(250, 235, 200);



    //this.mouth_value
    this.fur_colour = 1;
    this.ear_length = -1;
    this.blush = 0;

    /*
     * Draw the face with position lists that include:
     *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
     *    bottom_lip, top_lip, nose_tip, nose_bridge, 
     */
    this.draw = function(positions) {

        let left_eye = average_point(positions.left_eye);
        let right_eye = average_point(positions.right_eye);
        let left_eyebrow = average_point(positions.left_eyebrow);
        let right_eyebrow = average_point(positions.right_eyebrow);

        let left_d = dist(left_eye[0], left_eye[1], left_eyebrow[0], left_eyebrow[1]);
        let right_d = dist(right_eye[0], right_eye[1], right_eyebrow[0], right_eyebrow[1]);
        let left_eb_move = map(left_d, 0.4, 0.7, 0.6, 1.5, true);
        let right_eb_move = map(right_d, 0.4, 0.7, 0.6, 1.5, true);


        left_eye[0] *= 3;
        left_eye[1] *= 3;
        right_eye[0] *= 3;
        right_eye[1] *= 3;

        if (this.fur_colour == 1) {
            fill(light);

        } else if (this.fur_colour == 2) {
            fill(middle);

        } else {
            fill(dark);
        }
        noStroke();
        ellipse(0, 0.15, 5, 5.5);


        stroke(tan);


        noFill();
        strokeWeight(0.3);

        fill(tan);
        ellipse(0, 1.5, 3, 2.2);



        // head outline
        noFill();
        strokeWeight(0.25);
        stroke(60, 50, 50);
        beginShape();
        vertex(0, -2.625);


        //bezierVertex(3, -7.5, 7, -5, 8, 1);
        //bezierVertex(8, 1, 10, 8, 0, 9);


        bezierVertex(1.05, -2.625, 2.45, -1.75, 2.45, 0.35);
        bezierVertex(2.45, 0.35, 2.625, 2.8, 0, 2.8);
        bezierVertex(-2.625, 2.8, -2.625, 0.25, -2.55, 0.35);
        bezierVertex(-2.45, -1.75, -1.05, -2.625, 0, -2.625);
        endShape();

        //ears

        //Ear colour
        if (this.fur_colour == 1) {
            fill(light);

        } else if (this.fur_colour == 2) {
            fill(middle);

        } else {
            fill(dark);
        }
        //left ear
        beginShape();
        curveVertex(-2.4, -0.7);
        curveVertex(-2.4, -0.7);
        curveVertex(-2.8, -1.4 + this.ear_length);
        curveVertex(-2.45, -2.45 + this.ear_length);
        curveVertex(-1.05, -2.38);
        curveVertex(-1.05, -2.38);
        endShape();

        //right ear
        beginShape();
        curveVertex(2.345, -0.7);
        curveVertex(2.345, -0.7);
        curveVertex(2.8, -1.4 + this.ear_length);
        curveVertex(2.45, -2.45 + this.ear_length);
        curveVertex(1.05, -2.38);
        curveVertex(1.05, -2.38);
        endShape();



        fill(tan);
        stroke(tan);
        //left ear inside
        beginShape();
        curveVertex(-2.1, -1.4);
        curveVertex(-2.1, -1.4);
        curveVertex(-2.24, -1.225 + this.ear_length);
        curveVertex(-2.24, -1.75 + this.ear_length);
        curveVertex(-1.575, -2);
        curveVertex(-1.575, -2);
        endShape();


        //left ear inside line
        beginShape();
        curveVertex(-2.1, -1.4);
        curveVertex(-2.1, -1.4);
        curveVertex(-1.925, -1.645);
        curveVertex(-1.6625, -1.925);
        curveVertex(-1.575, -2);
        curveVertex(-1.575, -2);
        endShape();

        //right ear inside
        beginShape();
        curveVertex(2.1, -1.4);
        curveVertex(2.1, -1.4);
        curveVertex(2.24, -1.225 + this.ear_length);
        curveVertex(2.24, -1.75 + this.ear_length);
        curveVertex(1.575, -2);
        curveVertex(1.575, -2);
        endShape();

        //right ear inside line
        beginShape();
        curveVertex(2.1, -1.4);
        curveVertex(2.1, -1.4);
        curveVertex(1.925, -1.645);
        curveVertex(1.6625, -1.925);
        curveVertex(1.575, -2);
        curveVertex(1.575, -2);
        endShape();

        //left brow
        push();
        strokeWeight(0.375)
        translate(0, 1 - left_eb_move);
        beginShape();
        curveVertex(-1.225, -1.12);
        curveVertex(-1.225, -1.12);
        curveVertex(-1.05, -1.19);
        curveVertex(-0.91, -1.19);
        curveVertex(-0.805, -1.12);
        curveVertex(-0.805, -1.12);
        endShape();

        beginShape();
        curveVertex(-1.225, -1.12);
        curveVertex(-1.225, -1.12);
        curveVertex(-1.05, -1.085);
        curveVertex(-0.91, -1.085);
        curveVertex(-0.805, -1.12);
        curveVertex(-0.805, -1.12);
        endShape();

        //right brow

        beginShape();
        curveVertex(1.225, -1.12);
        curveVertex(1.225, -1.12);
        curveVertex(1.05, -1.19);
        curveVertex(0.91, -1.19);
        curveVertex(0.805, -1.12);
        curveVertex(0.805, -1.12);
        endShape();

        beginShape();
        curveVertex(1.225, -1.12);
        curveVertex(1.225, -1.12);
        curveVertex(1.05, -1.085);
        curveVertex(0.91, -1.085);
        curveVertex(0.805, -1.12);
        curveVertex(0.805, -1.12);
        endShape();
        pop();


        // eyes

        const green = color('#3bb44a');
        const darkGreen = color('#046538');
        const lightBlue = color('#9bcde1');
        const darkBlue = color('#0c76c1');
        const lightBrown = color('#8b5f3c');
        const pink = color('#ff9292');




        //outline
        noStroke();
        fill(40);
        ellipse(-1.05, -0.175, 0.735);
        ellipse(1.05, -0.175, 0.735);
        //iris
        if (this.blush < 5) {
            fill(lightBlue);
        } else {
            fill(pink);
        }
        ellipse(-1.05, -0.175, 0.7);
        ellipse(1.05, -0.175, 0.7);
        //
        fill(40);
        ellipse(-1.05, -0.175, 0.455);
        ellipse(1.05, -0.175, 0.455);
        //white reflection
        fill(255);
        ellipse(-1.225, -0.35, 0.175, 0.14);
        ellipse(0.875, -0.35, 0.175, 0.14);

        //mouth open
        let top_lip_point = positions.top_lip[9];
        let bottom_lip_point = positions.bottom_lip[9];
        // fill(255, 0, 0);
        let d = dist(top_lip_point[0], top_lip_point[1], bottom_lip_point[0], bottom_lip_point[1])

        let mouth = map(d, 0, 0.5, 0, 10);
        let mouth_size = map(mouth, 0, 10, 0, 1.5);

        fill(250, 100, 100);
        stroke(40);
        strokeWeight(0.15)
        ellipse(0, 1.2, 1.5, mouth_size);

        //tongue cover
        noStroke();
        fill(tan);

        ellipse(0.525, 1.12, 1.05, 0.77)
        ellipse(-0.525, 1.12, 1.05, 0.77)
        if (this.fur_colour == 1) {
            fill(light);

        } else if (this.fur_colour == 2) {
            fill(middle);

        } else {
            fill(dark);
        }
        ellipse(0, 0.2, 1.4, 1.5);
        fill(tan);
        ellipse(0, 0.7, 2.1, 0.9);



        //nose
        fill(40);
        ellipse(0, 0.875, 0.7, 0.525);

        //mouth
        stroke(40)
        noFill();
        strokeWeight(0.1575);
        beginShape();
        curveVertex(-0.07, 1.05);
        curveVertex(-0.07, 1.05);
        curveVertex(0.35, 1.505);
        curveVertex(0.77, 1.54);
        curveVertex(1.05, 1.33);
        curveVertex(1.05, 1.33);
        endShape();

        beginShape();
        curveVertex(0.07, 1.05);
        curveVertex(0.07, 1.05);
        curveVertex(-0.35, 1.505);
        curveVertex(-0.77, 1.54);
        curveVertex(-1.05, 1.33);
        curveVertex(-1.05, 1.33);
        endShape();


        //blush
        if (this.blush < 5) {

        } else {
            noStroke()
            fill(200, 50, 50, 180);
            ellipse(-1.4, 0.7, 0.8, 0.5);
            ellipse(1.4, 0.7, 0.8, 0.5);
        }


    }

    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {
        this.fur_colour = int(map(settings[0], 0, 100, 1, 4));
        this.ear_length = map(settings[1], 0, 100, 0, -1);
        this.blush = map(settings[2], 0, 100, 0, 10);
    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        let settings = new Array(4);
        settings[0] = map(this.fur_colour, 1, 4, 0, 100);
        settings[1] = map(this.ear_length, 0, -1, 0, 100);
        settings[2] = map(this.blush, 0, 10, 0, 100);
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