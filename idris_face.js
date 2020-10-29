/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 4;

// other variables can be in here too
// here's some examples for colors used
// const bg_color = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

//skin colour

//brown 
const brownS = [74, 52, 33];
//white
const whiteS = [232, 223, 218];
//tan
const tanS = [191, 148, 107];


//hair colour

//red
const redH = [181, 63, 16];
//blonde
const blondeH = [214, 171, 77];
//brown
const brownH = [51, 29, 0];
//black
const blackH = [28, 27, 26];



this.show_points = function(segment) {
    for (let i = 0; i < segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        var number = i.toString();
        textAlign(CENTER, CENTER);
        textSize(0.2);
        fill(0);
        text(number, px, py, 0.1);
    }
}

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
function IdrisFace() {
    // these are state variables for a face
    // (your variables should be different!)

    //all to max, chnage later

    this.green = 3;
    this.flower = 1.8;
    this.facex = 3;
    this.bflower = 1.4;
    this.skin = 2;
    this.hair = 4;


    // example of a function *inside* the face object.
    // this draws a segment, and do_loop will connect the ends if true
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

    /*
     * Draw the face with position lists that include:
     *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
     *    bottom_lip, top_lip, nose_tip, nose_bridge, 
     */
    this.draw = function(positions) {

        // outer fuzz for female hair

        //red
        if (this.hair == 1) {
            if (this.green == 3 || this.green === 2) {
                fill(redH);
                push();
                angleMode(DEGREES);
                translate(0, -1.4);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1.8, 1.44);
                    rotate(20);

                }
                pop();
            }
        }

        //blonde
        if (this.hair == 2) {
            if (this.green == 3 || this.green === 2) {
                fill(blondeH);
                push();
                angleMode(DEGREES);
                translate(0, -1.4);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1.8, 1.44);
                    rotate(20);

                }
                pop();
            }
        }

        //brown
        if (this.hair == 3) {
            if (this.green == 3 || this.green === 2) {
                fill(brownH);
                push();
                angleMode(DEGREES);
                translate(0, -1.4);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1.8, 1.44);
                    rotate(20);

                }
                pop();
            }
        }

        //black
        if (this.hair == 4) {
            if (this.green == 3 || this.green === 2) {
                fill(blackH);
                push();
                angleMode(DEGREES);
                translate(0, -1.4);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1.8, 1.44);
                    rotate(20);

                }
                pop();
            }
        }

        //female hair

        //red
        if (this.hair == 1) {
            if (this.green == 3 || this.green === 2) {

                noStroke();
                fill(redH);
                ellipse(0, -1.4, 4.68);

                fill(50, 168, 82);
                push();
                angleMode(DEGREES);
                translate(-0.72, -2.7);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.8, -2);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.72, -3);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();
            }
        }

        //blonde
        if (this.hair == 2) {
            if (this.green == 3 || this.green === 2) {

                noStroke();
                fill(blondeH);
                ellipse(0, -1.4, 4.68);

                fill(23, 158, 191);
                push();
                angleMode(DEGREES);
                translate(-0.72, -2.7);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.8, -2);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.72, -3);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();
            }
        }

        //brown
        if (this.hair == 3) {
            if (this.green == 3 || this.green === 2) {

                noStroke();
                fill(brownH);
                ellipse(0, -1.4, 4.68);

                fill(204, 8, 96);
                push();
                angleMode(DEGREES);
                translate(-0.72, -2.7);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.8, -2);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.72, -3);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();
            }
        }

        //black
        if (this.hair == 4) {
            if (this.green == 3 || this.green === 2) {

                noStroke();
                fill(blackH);
                ellipse(0, -1.4, 4.68);

                fill(255);
                push();
                angleMode(DEGREES);
                translate(-0.72, -2.7);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.8, -2);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.72, -3);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.4);
                    rotate(180 / 5);

                }
                pop();
            }
        }




        // head code
        if (this.skin == 1) {
            fill(brownS);
            noStroke();
            ellipse(0, -0.4, this.facex, 3.6);
        }

        if (this.skin == 2) {
            fill(tanS);
            noStroke();
            ellipse(0, -0.4, this.facex, 3.6);
        }

        if (this.skin == 3) {
            fill(whiteS);
            noStroke();
            ellipse(0, -0.4, this.facex, 3.6);
        }


        //beard

        //red
        if (this.hair == 1) {
            fill(redH);

            if (this.green < 2) {

                ellipse(0, 1.75, 2.5, 2.5);
                push();
                angleMode(DEGREES);
                translate(0, 1.75);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1, 1);
                    rotate(20);

                }

                //flowers for beard
                pop();

                fill(50, 168, 82);
                push();
                angleMode(DEGREES);
                translate(-0.9, 2);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.2, 1.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.3, 2.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();
            }
        }

        //blonde
        if (this.hair == 2) {
            fill(blondeH);

            if (this.green < 2) {

                ellipse(0, 1.75, 2.5, 2.5);
                push();
                angleMode(DEGREES);
                translate(0, 1.75);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1, 1);
                    rotate(20);

                }

                //flowers for beard
                pop();

                fill(23, 158, 191);
                push();
                angleMode(DEGREES);
                translate(-0.9, 2);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.2, 1.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.3, 2.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();
            }
        }

        //brown
        if (this.hair == 3) {
            fill(brownH);

            if (this.green < 2) {

                ellipse(0, 1.75, 2.5, 2.5);
                push();
                angleMode(DEGREES);
                translate(0, 1.75);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1, 1);
                    rotate(20);

                }

                //flowers for beard
                pop();

                fill(204, 8, 96);
                push();
                angleMode(DEGREES);
                translate(-0.9, 2);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.2, 1.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.3, 2.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();
            }
        }

        //black
        if (this.hair == 4) {
            fill(blackH);

            if (this.green < 2) {

                ellipse(0, 1.75, 2.5, 2.5);
                push();
                angleMode(DEGREES);
                translate(0, 1.75);
                noStroke();
                for (let i = 0; i < 20; i++) {
                    ellipse(0, 1, 1);
                    rotate(20);

                }

                //flowers for beard
                pop();

                fill(255);
                push();
                angleMode(DEGREES);
                translate(-0.9, 2);
                noStroke();

                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);
                }
                pop();
                push();

                angleMode(DEGREES);
                translate(1.2, 1.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();

                push();

                angleMode(DEGREES);
                translate(0.3, 2.5);
                noStroke();
                for (let i = 0; i < 10; i++) {
                    ellipse(0, 0, 0.36, 1.2);
                    rotate(180 / 5);

                }
                pop();
            }
        }


        let left_eye_pos = segment_average(positions.left_eye);
        let right_eye_pos = segment_average(positions.right_eye);


        //blush 
        if (this.green == 3 || this.green === 2) {
            fill(196, 118, 118, 60);
            noStroke();
            ellipse(left_eye_pos[0], left_eye_pos[1] + 1, 0.7, 0.5);
            ellipse(right_eye_pos[0], right_eye_pos[1] + 1, 0.7, 0.5);
        }

        //nose
        let nose_top = positions.nose_bridge[0];
        let nose_bottom = positions.nose_bridge[2];
        let nose_bottom2 = positions.nose_bridge[3];

        // print(nose_top, nose_bottom);
        stroke(59, 41, 26);
        strokeWeight(0.1);
        line(nose_top[0], nose_top[1], nose_bottom[0], nose_bottom[1]);


        fill(255);
        stroke(59, 41, 26);

        let nose_end = null;
        if (nose_top[0] < nose_bottom[0]) {
            nose_end = positions.nose_tip[0];
        } else {
            nose_end = positions.nose_tip[4];
        }
        let nose_center = positions.nose_tip[2];


        push();
        noFill()
        strokeWeight(0.1);
        angleMode(DEGREES);

        arc(nose_bottom2[0], nose_bottom2[1], 0.5, 0.5, 180, 0, OPEN);

        pop();
        noStroke();
        fill(59, 41, 26);
        ellipse(nose_bottom2[0] - 0.07, nose_bottom2[1], 0.07, 0.1);
        ellipse(nose_bottom2[0] + 0.07, nose_bottom2[1], 0.07, 0.1);


        //glasses code

        fill(40, 43, 43);
        stroke(122, 122, 122);
        strokeWeight(0.072);
        ellipse(left_eye_pos[0], left_eye_pos[1], 1.2);
        ellipse(right_eye_pos[0], right_eye_pos[1], 1.2);



        //middlerim

        fill(0);
        push();
        stroke(122, 122, 122);
        rectMode(CENTER);
        rect(nose_top[0], nose_top[1], 0.72, 0.108);
        pop();


        //mouth code
        let mouthstart = positions.top_lip[0];
        let mouthstart2 = positions.top_lip[7];

        let mouthbot = positions.bottom_lip[0];
        let mouthbot2 = positions.bottom_lip[7];


        let mouth = segment_average(positions.top_lip);
        let mouth2 = segment_average(positions.bottom_lip);

        fill(92, 40, 19);
        noStroke();

        stroke(64, 27, 27);
        strokeWeight(0.07);


        push();

        //bottom lip
        translate(mouth2[0], mouth2[1]);
        angleMode(DEGREES)
        arc(0, mouth[0], mouthbot[0], 0.5, 0, 180, OPEN);

        //top lip
        strokeWeight(0.2);
        arc(0, mouth[0], mouthbot[0], 0.2, 180, 0, OPEN);


        pop();
        noStroke();


    }


    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {

        this.facex = map(settings[1], 0, 100, 2.52, 3);
        this.green = int(map(settings[0], 0, 100, 1, 3));
        this.flower = map(settings[0], 0, 100, 0.36, 1.8);
        this.earingsy = map(settings[3], 0, 100, 0.72, 2);
        this.bflower = map(settings[0], 0, 100, 0.36, 1.4);
        this.skin = int(map(settings[2], 0, 100, 1, 3));
        this.hair = int(map(settings[3], 0, 100, 1, 4));


    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        let settings = new Array(4);

        settings[1] = map(this.facex, 2.52, 3, 0, 100);
        settings[0] = map(this.green, 1, 3, 0, 100);
        settings[0] = map(this.flower, 0.36, 1.8, 0, 100);
        settings[3] = map(this.earingsy, 0.72, 2, 0, 100);
        settings[0] = map(this.bflower, 0.36, 1.4, 0, 100);
        settings[2] = map(this.skin, 1, 3, 0, 100);
        settings[3] = map(this.hair, 1, 4, 0, 100);


        return settings;
    }
}