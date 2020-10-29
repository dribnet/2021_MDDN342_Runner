/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */
// other variables can be in here too
// these control the colors used

function FelizardoFace() {
    const bg_color = [225, 206, 187];
    const fg_color = [151, 102, 52];
    const stroke_color = [95, 52, 8];

    // these are state variables for a face
    // (your variables may be different)
    this.tilt_value = 0;
    this.mouth_value = 1;
    this.eye_size = 0;
    this.eyelid = 0;
    this.mouth_open = 1;

    /*
     * Draw a face with position lists that include:
     *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
     *    bottom_lip, top_lip, nose_tip, nose_bridge, 
     */
    this.draw = function(positions) {

        colorMode(HSL, 360, 100, 100, 1);

        //head
        let head_location = average_point(positions.chin)

        //eyes
        let eye_L = average_point(positions.left_eye)
        let eye_R = average_point(positions.right_eye)

        //mouth points 
        
        //*top
        let m_left = positions.top_lip[0];
        let m_m_left = positions.top_lip[1];
        let m_top = positions.top_lip[3];
        let m_m_right = positions.top_lip[5]
        let m_right = positions.top_lip[6];
        let m_bot = positions.bottom_lip[9];

        //bottom
        let m_b1 = positions.bottom_lip[0];
        let m_b2 = positions.bottom_lip[1];
        let m_b3 = positions.bottom_lip[4];
        let m_b4 = positions.bottom_lip[6];
        //mouth pts for teeth
        let m_teeth = positions.top_lip[10];
        let m_teeth2 = positions.top_lip[8];
        let m_teeth3 = positions.top_lip[7];
        let m_teeth4 = positions.top_lip[11];

        //brow points
        let b_r1 = positions.right_eyebrow[0];
        let b_r2 = positions.right_eyebrow[4];
        let b_l1 = positions.left_eyebrow[0];
        let b_l2 = positions.left_eyebrow[4];

        //cheek pts
        let ch_1 = positions.chin[2];
        let ch_2 = positions.chin[14];

        //CHIN PTS

        let b_ch_1 = positions.chin[5];
        let b_ch_2 = positions.chin[7];
        let b_ch_3 = positions.chin[8];
        let b_ch_4 = positions.chin[9];
        let b_ch_5 = positions.chin[11];



        //*******************************************************************************
        //**********************		E 	Y 	E 	S 		************************************
        //*******************************************************************************



        //**************** e 	y 	e 	 s 	h 	a 	p 	e **************************

        noStroke();
        fill(255);
        ellipse(eye_L[0], eye_L[1], .9 * this.eye_size, .9 * this.eye_size);
        ellipse(eye_R[0], eye_R[1], .9 * this.eye_size, .9 * this.eye_size);

        //**************** e 	y 	e 	 c 	o 	l 	o 	u 	r  **************************

        //******cornea
        fill(1 * this.eye_colour, 75, 50, 1); // eye colour
        ellipse(eye_L[0], eye_L[1], .6 * this.eye_size, .6 * this.eye_size);
        ellipse(eye_R[0], eye_R[1], .6 * this.eye_size, .6 * this.eye_size);

        //********* iris
        fill(0);
        ellipse(eye_L[0], eye_L[1], .2 * this.eye_size, .2 * this.eye_size);
        ellipse(eye_R[0], eye_R[1], .2 * this.eye_size, .2 * this.eye_size);

        //************* e 	y 	e 	l 	i 	d 	s 	*******************

        //**********	SURPRISED

        if (this.eyelid == 0) {
            fill(0);
            arc(eye_L[0], eye_L[1], 1 * this.eye_size, 1 * this.eye_size, 15, 165, CHORD);
            arc(eye_R[0], eye_R[1], 1 * this.eye_size, 1 * this.eye_size, 15, 165, CHORD);
        }

        //*********** MELLOW
        if (this.eyelid == 1) {
            fill(0);
            arc(eye_L[0], eye_L[1], 1 * this.eye_size, 1 * this.eye_size, -180, 0, CHORD);
            arc(eye_R[0], eye_R[1], 1 * this.eye_size, 1 * this.eye_size, -180, 0, CHORD);
        }

        //*********** ANGRY
        if (this.eyelid == 2) {
            fill(0);
            arc(eye_L[0], eye_L[1], 1 * this.eye_size, 1 * this.eye_size, -150, 20, CHORD);
            arc(eye_R[0], eye_R[1], 1 * this.eye_size, 1 * this.eye_size, 160, -30, CHORD);
            //lower lids
            arc(eye_L[0], eye_L[1], 1 * this.eye_size, 1 * this.eye_size, -150, 20, CHORD);
            arc(eye_R[0], eye_R[1], 1 * this.eye_size, 1 * this.eye_size, 160, -30, CHORD);
        }
        //*********** SCHLEEP
        if (this.eyelid == 3) {
            fill(0);
            arc(eye_L[0], eye_L[1], 1 * this.eye_size, 1 * this.eye_size, -180, 0, CHORD);
            arc(eye_R[0], eye_R[1], 1 * this.eye_size, 1 * this.eye_size, -180, 0, CHORD);
            //lower lids
            arc(eye_L[0], eye_L[1], 1 * this.eye_size, 1 * this.eye_size, 20, 160, CHORD);
            arc(eye_R[0], eye_R[1], 1 * this.eye_size, 1 * this.eye_size, 20, 160, CHORD);

        }

        //*******************************************************************************
        //**********************		C 	H 	I 	N 		******************************
        //*******************************************************************************



        stroke(0);
        strokeWeight(.02);
        line(b_ch_2[0], b_ch_2[1], ch_1[0], ch_1[1]); //cheek to jaw connector
        line(b_ch_4[0], b_ch_4[1], ch_2[0], ch_2[1]);

        fill(20, 0, this.skin);
        noStroke();
        beginShape();
        vertex(b_ch_1[0], b_ch_1[1]);
        vertex(b_ch_2[0], b_ch_2[1] + 1 * this.chin);
        vertex(b_ch_3[0], b_ch_3[1] + 1 * this.chin);
        vertex(b_ch_4[0], b_ch_4[1] + 1 * this.chin);
        vertex(b_ch_5[0], b_ch_5[1]);
        endShape();

        fill(0);
        ellipse(b_ch_2[0], b_ch_2[1] - .08, .07, .07); //peg
        ellipse(b_ch_4[0], b_ch_4[1] - .08, .07, .07);



        //*******************************************************************************
        //**********************		M 	O 	U 	T 	H 		**************************
        //*******************************************************************************



        //********** bottom lip *check if working properly.


        //cheek pivot
        fill(0);
        ellipse(ch_2[0], ch_2[1], .2, .2);
        ellipse(ch_1[0], ch_1[1], .2, .2);

        //cheek wires
        strokeWeight(.02);
        stroke(0);
        noFill();
        line(ch_2[0], ch_2[1], m_b1[0], m_b1[1]);
        line(ch_2[0], ch_2[1], m_b1[0], (m_b1[1] * this.mouth_open) + .05);
        line(ch_1[0], ch_1[1], m_b4[0], m_b4[1]);
        line(ch_1[0], ch_1[1], m_b4[0], (m_b4[1] * this.mouth_open) + .05);
      
        stroke(360, 70, 60, 1); //bottom lip colour
        strokeWeight(.4);
        noFill();
        bezier(m_b1[0], m_b1[1], m_b2[0], m_b2[1] * this.mouth_open, m_b3[0], m_b3[1] * this.mouth_open, m_b4[0], m_b4[1]);

        //********** top_lip

        noFill();
        strokeWeight(.5);
        stroke(360, 100, 60, 1); //thick top lip colour
        bezier(m_left[0], m_left[1], m_m_left[0], m_m_left[1] - .2, m_m_right[0], m_m_right[1] - .2, m_right[0], m_right[1]);
        strokeWeight(.3);
        stroke(360, 100, 40, 1); //top lip shade
        bezier(m_left[0], m_left[1] + .1, m_m_left[0], m_m_left[1], m_m_right[0], m_m_right[1], m_right[0], m_right[1] + .1);


        //************* top teeth

        fill(225);
        noStroke();
        arc(m_teeth3[0], m_teeth3[1], .45 * .5, .7 * .5, 15 + 20, 165, CHORD); //right back
        arc(m_teeth3[0] - .2, m_teeth3[1], .45 * .5, .7 * .5, 15, 165, CHORD); //right back 2
		arc(m_teeth4[0], m_teeth4[1], .45 * .5, .7 * .5, 15 - 20, 165 - 10, CHORD); //left back
        arc(m_teeth4[0] + .2, m_teeth4[1], .45 * .5, .7 * .5, 15, 165, CHORD); //left back 2
        fill(255);
        arc(m_teeth[0], m_teeth[1] - .15, .45, .7, 15, 165, CHORD);
        arc(m_teeth2[0], m_teeth2[1] - .15, .45, .7, 15, 165, CHORD);



        //*******************************************************************************
        //**********************		M or F		**************************************
        //*******************************************************************************


        if (this.horn == 0) {
            fill(100, 0, 50);

            ellipse(head_location[0], head_location[1] - 3.29, .5, .25);
            fill(20, 0, this.skin);
            ellipse(head_location[0], head_location[1] - 3.31, .5, .2);
            stroke(200, 0, this.skin - 10);
            strokeWeight(.1);
            line(head_location[0], head_location[1] - 3.4, head_location[0], head_location[1] - 4.5)
            noStroke(0);
            fill(20, 0, this.skin + 10);
            ellipse(head_location[0], head_location[1] - 4.5, .3, .3);

        }

        //*******************************************************************************
        //**********************		B 	R 	O 	W 	S		**************************
        //*******************************************************************************


        //eyebrow background mechanics
        fill(0);
        strokeWeight(.02);
        stroke(0);
        ellipse(head_location[0], head_location[1] - 3, .2, .2);
        line(head_location[0], head_location[1] - 3, b_l1[0] * .8, b_l1[1] * 1.4 * this.eyebrows);
        line(head_location[0], head_location[1] - 3, b_l2[0] * .8, b_l2[1] * 1.1 * this.eyebrows);
        line(head_location[0], head_location[1] - 3, b_r1[0] * .8, b_r1[1] * 1.1 * this.eyebrows);
        line(head_location[0], head_location[1] - 3, b_r2[0] * .8, b_r2[1] * 1.4 * this.eyebrows);

        strokeWeight(.55);
        stroke(20, 0, this.skin);
        line(b_l1[0] * .8, b_l1[1] * 1.4 * this.eyebrows, b_l2[0] * .8, b_l2[1] * 1.1 * this.eyebrows); // left eyebrow
        line(b_r1[0] * .8, b_r1[1] * 1.1 * this.eyebrows, b_r2[0] * .8, b_r2[1] * 1.4 * this.eyebrows); // right eyebrow


        fill(0)
        noStroke();
        ellipse(b_l1[0] * .8, b_l1[1] * 1.4 * this.eyebrows, .06, .06);
        ellipse(b_l2[0] * .8, b_l2[1] * 1.1 * this.eyebrows, .06, .06);
        ellipse(b_r1[0] * .8, b_r1[1] * 1.1 * this.eyebrows, .06, .06);
        ellipse(b_r2[0] * .8, b_r2[1] * 1.4 * this.eyebrows, .06, .06);



        //*******************************************************************************
        //*******************************************************************************
        //*******************************************************************************
    }




    /* set internal properties based on list numbers 0-100 */
    //put all slider elements here first
    this.setProperties = function(settings) {
        this.eye_size = map(settings[0], 0, 100, .9, 1.1);
        this.eyelid = int(map(settings[1], 0, 100, 0, 4));
        this.eyebrows = map(settings[2], 0, 100, .9, 1.1);
        this.mouth_open = map(settings[4], 0, 100, 1, 1.5);
        this.eye_colour = map(settings[3], 0, 100, 1, 359);
        this.horn = int(map(settings[5], 0, 100, 0, 1));
        this.skin = map(settings[6], 0, 100, 100, 50);
        this.chin = map(settings[7], 0, 100, 0, 1);

    }

    /* get internal properties as list of numbers 0-100 */
    //then wire them up here in this order (flip it round)

    this.getProperties = function() {
        let settings = new Array(8);

        settings[0] = map(this.eye_size, .9, 1.1, 0, 100);
        settings[1] = map(this.eyelid, 0, 4, 0, 100);
        settings[2] = map(this.eyebrows, 1, 1.5, 0, 100);
        settings[4] = map(this.mouth_open, 1, 1.5, 0, 100);
        settings[3] = map(this.eye_colour, 1, 359, 0, 100);
        settings[5] = map(this.horn, 0, 1, 0, 100);
        settings[6] = map(this.skin, 100, 50, 0, 100);
        settings[7] = map(this.chin, 0, 1, 0, 100);

        return settings;
    }
}

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