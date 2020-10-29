/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 4;

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
function McSweeneyFace() {


    //frameRate(1);
    // these are state variables for a face
    // (your variables should be different!)

    this.num_eyes = 2; // can be either 1 (cyclops) or 2 (two eyes)
    this.eye_shift = -1; // range is -10 to 10
    this.mouth_value = 4; // range is 0.5 to 8

    //variables between 0-100;
    this.jaw = 50;
    this.eyes = 50;
    this.cheek1 = 50;

    this.mouth = 50;
    this.cheek2 = 50;

    this.colour_picker = 80;
    this.horn_size = 50;
    this.jaw_ang = 50;
    this.eye_evil = 50;


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

    // fill(255);
    // ellipse(0, 0, 4);
    // return;


        /*

            // draw segments of face using points
            fill(128);
            stroke(128);
            this.draw_segment(positions.chin);

            fill(100, 0, 100);
            stroke(100, 0, 100);
            this.draw_segment(positions.nose_bridge);
            this.draw_segment(positions.nose_tip);

            strokeWeight(0.03);

            fill(200, 0, 0);
            stroke(200, 0, 0);
            this.draw_segment(positions.top_lip);
            this.draw_segment(positions.bottom_lip);

            fill(255);
            stroke(255);

            let left_eye_pos = segment_average(positions.left_eye);
            let right_eye_pos = segment_average(positions.right_eye);   */


        //---------------------------------------------------------------------------
        //scale(4/10);

        let colour_pic = int(map(this.colour_picker, 0, 100, 1, 3))

        
        let colour = [];
        let strokeCol = [];



        if (colour_pic == 1) {
            colour = [165, 146, 126];
            strokeCol = [20];


        } else if (colour_pic == 2) {
            colour = [227, 218, 201];
            strokeCol = [150];
        } else if (colour_pic == 3) {
            colour = [222, 202, 176];
            strokeCol = [255];

        }




        // head

        let cheek = 5;
        let cheek_dist = 4;

        let cheek_out = 5.5;
        let cheek_height = map(this.cheek1, 0, 100, -1.5, -0.7, true);

        let cheek_end_x = 4;
        let cheek_end_y = 2;


        var jaw_width = map(this.jaw, 0, 100, 3, 5);
        var jaw_height = 3.5;


        var chin_width = 1.5;
        var chin_height = 6;

        let mouthweight = 0.1;
        let genstroke = 0.15;

        let eyeposL = segment_average(positions.left_eye);
        let eyeposR = segment_average(positions.right_eye);
        let eyesizeL = (positions.left_eye[3][0] - positions.left_eye[0][0]);
        let eyesizeR = (positions.right_eye[3][0] - positions.right_eye[0][0]);

        let eyesizeRV = ((positions.right_eye[2][1] - positions.right_eye[4][1])) * 3;
        let eyesizeLV = ((positions.right_eye[1][1] - positions.right_eye[5][1])) * 3;

      


        //fill(colour);

    

        stroke(strokeCol);

    //stroke(145,136,116);
    
    strokeCap(ROUND);
    smooth();
    strokeJoin(ROUND);
    strokeWeight(genstroke);

    //Crainium ------------------------------------------------------
    //Horns ------------------------------------------------------

        push();
        noFill();

        let nosl = positions.nose_bridge[0][1] - positions.nose_bridge[3][1];

        let hornpos = ((eyeposR[1] + eyeposL[1])/2) + (nosl)

        let horn_height =(map(this.horn_size, 0, 100, 0.75, 2));

        //Fill -----
        push();
        fill(strokeCol);
        stroke(strokeCol);

        strokeWeight(genstroke/3)

        triangle(positions.right_eyebrow[1][0],hornpos*1.1, positions.right_eyebrow[3][0],hornpos, 
            positions.chin[12][0]*0.95, hornpos + (nosl*horn_height ) );

                triangle(positions.left_eyebrow[1][0],hornpos, positions.left_eyebrow[3][0],hornpos*1.1, 
                positions.chin[4][0]*0.95, (hornpos + (nosl*horn_height)) );


        /*//if (horn_desc ==)
        fill(255,0,0);
        stroke(255,0,0);

                triangle(positions.right_eyebrow[1][0]*1.4,hornpos*1.9, positions.right_eyebrow[3][0],hornpos*1.8, 
            positions.chin[12][0]*0.95, hornpos + (nosl*horn_height ) );

                triangle(positions.left_eyebrow[1][0],hornpos*1.8, positions.left_eyebrow[3][0]*1.4,hornpos*1.9, 
                positions.chin[4][0]*0.95, (hornpos + (nosl*horn_height)) );
        */
        pop();




        //Top Horn --------
        noFill();

        


        beginShape();
        curveVertex(positions.right_eyebrow[3][0]*0.8, eyeposR[1]); //

        curveVertex(positions.right_eyebrow[3][0],hornpos);

        curveVertex(positions.chin[12][0], hornpos + (nosl*horn_height ));

        curveVertex(positions.chin[12][0]*1.5, hornpos + (nosl*horn_height)); //

        endShape();


        beginShape();
        curveVertex(positions.right_eyebrow[1][0]*0.8, eyeposR[1]); //


        curveVertex(positions.right_eyebrow[1][0],hornpos*1.1);
        curveVertex(positions.chin[12][0], hornpos + (nosl*horn_height));

        curveVertex(positions.chin[12][0]*2, hornpos + (nosl*horn_height)); //
        endShape();

        //Bottom horn ----

        beginShape();
        curveVertex(positions.right_eyebrow[1][0]*0.6,hornpos*1.5); //

        curveVertex(positions.right_eyebrow[1][0],hornpos*1.1);
        curveVertex(positions.right_eyebrow[3][0],hornpos);

        
        curveVertex(positions.right_eyebrow[3][0]*1.4,hornpos*1.4); //
        endShape();





        //Left 

        beginShape();
        curveVertex(positions.left_eyebrow[1][0]*0.8, eyeposL[1]); //

        curveVertex(positions.left_eyebrow[1][0],hornpos);
        curveVertex(positions.chin[4][0], hornpos + (nosl*horn_height));

        curveVertex(positions.chin[4][0]*1.5, hornpos + (nosl*horn_height)); //

        endShape();


        beginShape();
        curveVertex(positions.left_eyebrow[3][0]*0.8 , eyeposL[1]); //


        curveVertex(positions.left_eyebrow[3][0],hornpos*1.1);
        curveVertex(positions.chin[4][0], hornpos + (nosl*horn_height) );

        curveVertex(positions.chin[4][0]*2, hornpos + (nosl*horn_height)); //
        endShape();

        //Bottom horn ----

        beginShape();
        curveVertex(positions.left_eyebrow[1][0]*1.4,hornpos*1.4); //

        curveVertex(positions.left_eyebrow[1][0],hornpos);
        curveVertex(positions.left_eyebrow[3][0],hornpos*1.1);

        
        curveVertex(positions.left_eyebrow[3][0]*0.6,hornpos*1.5); //
        endShape();





        pop();
      //Chin





        //Chin


      

      push();

        let jaw_stroke = 0.3;
        strokeWeight(genstroke);
        noFill();

        let jawrightx = (positions.chin[12][0] * 1.2)
        let jawrighty = (positions.chin[12][1] * 1.1)

        let jawleftx = (positions.chin[4][0] * 1.2)
        let jawlefty = (positions.chin[4][1] * 1.1)

        let jaw_angle = int(map(this.jaw_ang, 0, 100, 1, 2));




        beginShape();
        curveVertex(jawrightx + 1 * jaw_angle, jawrighty * jaw_angle);
        curveVertex(jawrightx, jawrighty);
        curveVertex(positions.chin[9][0], positions.chin[8][1]);
        curveVertex(positions.chin[7][0], positions.chin[8][1]);
        curveVertex(jawleftx, jawlefty);
        curveVertex(jawleftx - 1* jaw_angle, jawlefty * jaw_angle);
        endShape();

        //Jaw Side Left ----

        beginShape();
        curveVertex(positions.chin[2][0] - 1, positions.chin[2][1] - 1);

        curveVertex(positions.chin[2][0], positions.chin[2][1]);

        curveVertex(jawleftx, jawlefty);

        curveVertex(jawleftx - 1, jawlefty + 1);
        endShape();

        //Jaw Side Right ----

        beginShape();
        curveVertex(positions.chin[14][0] + 1, positions.chin[14][1] - 1);

        curveVertex(positions.chin[14][0], positions.chin[14][1]);

        curveVertex(jawrightx, jawrighty);

        curveVertex(jawrightx + 1, jawrighty + 1);
        endShape();




      pop();




        //Cheeks-------------------------



        strokeWeight(genstroke);
        noFill();

        let cheekinnerY = (positions.chin[14][1] - positions.chin[15][1]) + positions.chin[15][1]
        let cheekinnerX = (positions.chin[14][0] - (positions.chin[14][0] - positions.chin[12][0]));


        beginShape();
        curveVertex(positions.chin[16][0] - 1, positions.chin[16][1] - 1);
        curveVertex(positions.chin[16][0] * 0.9, positions.chin[16][1]);
        curveVertex(positions.chin[15][0] * 1.1, positions.chin[15][1]);
        curveVertex(positions.chin[14][0] * 1.05, positions.chin[14][1]);
        curveVertex(cheekinnerX, cheekinnerY);
        curveVertex(cheekinnerX - 1, cheekinnerY + 0.5);

        endShape();


        let cheekinnerLY = (positions.chin[14][1] - positions.chin[1][1]) + positions.chin[1][1]
        let cheekinnerLX = (positions.chin[2][0] - (positions.chin[2][0] - positions.chin[4][0]));

        beginShape();
        curveVertex(positions.chin[0][0] + 1, positions.chin[0][1] - 1);
        curveVertex(positions.chin[0][0] * 0.9, positions.chin[0][1]);
        curveVertex(positions.chin[1][0] * 1.1, positions.chin[1][1]);
        curveVertex(positions.chin[2][0] * 1.05, positions.chin[2][1]);
        curveVertex(cheekinnerLX, cheekinnerLY);
        curveVertex(cheekinnerLX + 1, cheekinnerLY + 0.5);

        endShape();
    
    
    



        //Eyes-----------------------------------------------

    push();

        let eye_evil2 = map(this.eye_evil,0,100,0,3);

        let smalleyeS = 4;
      fill(200/eye_evil2,0,0);
      strokeWeight(genstroke);
      stroke('black');
      
      ellipse(eyeposR[0],eyeposR[1], eyesizeR, eyesizeRV);
      ellipse(eyeposL[0],eyeposL[1], eyesizeL, eyesizeLV);

      noStroke();
      fill(255,33*eye_evil2);


      ellipse(eyeposR[0],eyeposR[1], eyesizeR/smalleyeS, eyesizeRV/smalleyeS);
      ellipse(eyeposL[0],eyeposL[1], eyesizeL/smalleyeS, eyesizeLV/smalleyeS);

    pop();




        //mouth ------------------------------

              let mouthcurveRy = positions.bottom_lip[0][1] - (positions.bottom_lip[10][1] - positions.bottom_lip[0][1])*3
      let mouthcurveLy = positions.bottom_lip[6][1] - (positions.bottom_lip[8][1] - positions.bottom_lip[6][1])*3


        let mouthfracLX = (positions.bottom_lip[2][0] + positions.top_lip[4][0]) / 2;
        let mouthfracRX = (positions.bottom_lip[4][0] + positions.top_lip[2][0]) / 2;

        let mouthfracRX2 = (positions.bottom_lip[6][0] + mouthfracRX) / 2
        let mouthfracLX2 = (positions.bottom_lip[0][0] + mouthfracLX) / 2

              let mouthheight = (positions.bottom_lip[3][1] - positions.top_lip[3][1])/2;
      let mouthcenterheight = positions.bottom_lip[9][1] - ((positions.bottom_lip[9][1] - positions.top_lip[9][1])/2);

        push();

        noFill();

      let check = 6;
    translate(0,mouthweight*1/3)
      stroke(200,0,0)

       
      strokeWeight(mouthweight)
      


        beginShape();
        curveVertex(positions.bottom_lip[0][0] + 0.5, mouthcurveRy);
        curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
        curveVertex(positions.bottom_lip[6][0], positions.bottom_lip[6][1]);
        curveVertex(positions.bottom_lip[6][0] - 0.5, mouthcurveLy);
        endShape();

    line(mouthfracRX,mouthcenterheight-mouthheight, mouthfracRX, mouthcenterheight+mouthheight);
      line(mouthfracRX2,mouthcenterheight-mouthheight, mouthfracRX2, mouthcenterheight+mouthheight);

      line(mouthfracLX,mouthcenterheight-mouthheight, mouthfracLX, mouthcenterheight+mouthheight);
      line(mouthfracLX2,mouthcenterheight-mouthheight, mouthfracLX2, mouthcenterheight+mouthheight);


      pop();





    //inner -----

      push();

      strokeWeight(mouthweight);
       stroke(0);


        beginShape();
        curveVertex(positions.bottom_lip[0][0]+0.5, mouthcurveRy);
          curveVertex(positions.bottom_lip[0][0],positions.bottom_lip[0][1]);
          curveVertex(positions.bottom_lip[6][0], positions.bottom_lip[6][1]);
        curveVertex(positions.bottom_lip[6][0]-0.5, mouthcurveLy);
      endShape();


      line(mouthfracRX,mouthcenterheight-mouthheight, mouthfracRX, mouthcenterheight+mouthheight);
      line(mouthfracRX2,mouthcenterheight-mouthheight, mouthfracRX2, mouthcenterheight+mouthheight);

      line(mouthfracLX,mouthcenterheight-mouthheight, mouthfracLX, mouthcenterheight+mouthheight);
      line(mouthfracLX2,mouthcenterheight-mouthheight, mouthfracLX2, mouthcenterheight+mouthheight);

      pop();



        //Nose -------------
        push();
        fill(colour);
        //fill(strokeCol);
        strokeWeight(genstroke);

        let nose_width = map(jaw_width, 3, 5, 0.5, 1);

        let nose_top = positions.nose_bridge[1][1] - positions.nose_bridge[0][1];

        triangle(positions.nose_bridge[0][0], positions.nose_bridge[1][1] - nose_top / 2, positions.nose_tip[0][0], positions.nose_tip[0][1], positions.nose_tip[4][0], positions.nose_tip[4][1])
        pop();








    }

    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {
        this.colour_picker = int(map(settings[0], 0, 100, 0, 100));
        this.horn_size = map(settings[1], 0, 100, 0, 100);
        this.jaw_ang = map(settings[2], 0, 100, 0, 100);
        this.eye_evil = map(settings[3], 0, 100, 0, 100);
    }

    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        let settings = new Array(0);
        settings[0] = map(this.colour_picker, 0, 100, 0, 100);
        settings[1] = map(this.horn_size, 0,100, 0, 100);
        settings[2] = map(this.jaw_ang, 0, 100, 0, 100);
        settings[3] = map(this.eye_evil, 0, 100, 0, 100);
        return settings;
    }
}