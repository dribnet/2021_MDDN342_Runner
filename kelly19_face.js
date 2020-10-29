/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// other variables can be in here too
// these control the colors used
const core_colour = [240, 200, 10];
const light_colour = [240, 215, 24];
const shadow_colour = [165, 42, 42, 15];
const hair_light = [255, 204, 0];

function Kelly19Face() {
    // these are state variables for a face
    // (your variables may be different)
    this.eye_type = 1; // defines eye type
    this.hair_colour = color(255, 200, 100); // eyebrow colour
    this.eyebrow_width = 0.1;
    this.eyelid_type = 1;
    this.teeth = 50;
    this.lip_colour = 0;
    this.facial_hair = 0;
    this.eye_colour = 255;
    this.makeup = 1;

    //size variables
    this.x_percentage = 1;
    this.y_percentage = 1;

    let hair_light = color("#fabc37");
    let hair_dark = color("#302E23");

    /*
     * Draw a face with position lists that include:
     *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
     *    bottom_lip, top_lip, nose_tip, nose_bridge, 
     */
    this.draw = function(positions) {
        //shifts face to the left/right to approximate rotation
        let face_rotate = map(positions.nose_bridge[3][0], -1, 1, 1.5, -1.5);

        //eye values -------------------------------------------------------------------------------------------------------------- //
        //eye centers
        let left_eye = average_point(positions.left_eye);
        let right_eye = average_point(positions.right_eye);
        //eye size
        let left_eye_size = abs(positions.left_eye[0][0] - positions.left_eye[3][0]);
        let right_eye_size = abs(positions.right_eye[0][0] - positions.right_eye[3][0]);
        // calculate average eye angle
        let left_eye_angle = average_angle(positions.left_eye);
        let right_eye_angle = average_angle(positions.right_eye);
        //eye squint
        let left_eye_squint = constrain(average_distance(positions.left_eye) * 6, 1, 8);
        let right_eye_squint = constrain(average_distance(positions.right_eye) * 6, 1, 8);

        let hair_colour = lerpColor(hair_light, hair_dark, this.hair_colour);

        head(face_rotate, -0.5);

        if (this.eye_type <= 1) {
            open_eye(left_eye, left_eye_size, left_eye_angle, left_eye_squint, this.eyelid_type, this.eye_colour, this.makeup);
            open_eye(right_eye, right_eye_size, right_eye_angle, right_eye_squint, this.eyelid_type, this.eye_colour, this.makeup);

            // eye_detail(left_eye, left_eye_size, left_eye_angle, -1);
            // eye_detail(right_eye, right_eye_size, right_eye_angle, 1);

            eyebrows_flow(positions.left_eyebrow, this.eyebrow_width, hair_colour);
            eyebrows_flow(positions.right_eyebrow.reverse(), this.eyebrow_width, hair_colour);
        } else if (this.eye_type <= 2) {
            classic_eye(left_eye, left_eye_size);
            classic_eye(right_eye, right_eye_size);

            eyebrows_flow(positions.left_eyebrow, this.eyebrow_width, hair_colour);
            eyebrows_flow(positions.right_eyebrow.reverse(), this.eyebrow_width, hair_colour);
        } else if (this.eye_type <= 3) {
            cross_eye(left_eye, left_eye_size, left_eye_angle);
            cross_eye(right_eye, right_eye_size, right_eye_angle);

            eyebrows_flow(positions.left_eyebrow, this.eyebrow_width, hair_colour);
            eyebrows_flow(positions.right_eyebrow.reverse(), this.eyebrow_width, hair_colour);
        } else if (this.eye_type <= 4) {
            eyebrows_flow(positions.left_eyebrow, this.eyebrow_width, hair_colour);
            eyebrows_flow(positions.right_eyebrow.reverse(), this.eyebrow_width, hair_colour);

            heart_eye(left_eye, left_eye_size, left_eye_angle);
            heart_eye(right_eye, right_eye_size, right_eye_angle);
        }

        open_mouth(positions.top_lip, positions.bottom_lip, this.teeth, this.lip_colour);

        let left_backup = positions.left_eye;
        let eyelid_left = positions.left_eye.slice();
        let eyelid_right = positions.right_eye.slice();

        let left_removed = eyelid_left.splice(1, 2);
        let left_1 = eyelid_left[1];
        let left_2 = eyelid_left[3];
        let left_3 = eyelid_left[2];
        let left_4 = eyelid_left[0];
        eyelid_left = [left_1, left_2, left_3, left_4];

        eye_shadow(positions.left_eyebrow, eyelid_left);

        let right_removed = eyelid_right.splice(1, 2);
        let right_1 = eyelid_right[0];
        let right_2 = eyelid_right[2];
        let right_3 = eyelid_right[3];
        let right_4 = eyelid_right[1];
        eyelid_right = [right_1, right_2, right_3, right_4];

        eye_shadow(positions.right_eyebrow.reverse(), eyelid_right.reverse());

        //glasses(left_eye, right_eye, left_eye_angle,right_eye_angle,left_eye_size,right_eye_size);


        nose(positions.nose_bridge, positions.nose_tip);

        //glasses_bridge(left_eye, right_eye, left_eye_angle,right_eye_angle,left_eye_size,right_eye_size,face_rotate);



        //light reflection
        push();
        noFill();
        scale(0.9);
        translate(face_rotate, -0.5);
        rectMode(CENTER);
        scale(0.3);
        strokeWeight(0.5);
        stroke(255, 70);
        arc(-4.5, -4.5, 3, 3, 180, 270);
        pop();
    }

    /* set internal properties based on list numbers 0-100 */
    this.setProperties = function(settings) {
        this.hair_colour = map(settings[0], 0, 100, 0, 1);
        this.eyebrow_width = map(settings[1], 0, 100, 0.05, 0.25);
        this.eyelid_type = map(settings[2], 0, 100, 0, 4);
        this.eye_colour = map(settings[3], 0, 100, 0, 360);
        this.lip_colour = map(settings[4], 0, 100, 0, 1);
        this.teeth = map(settings[5], 0, 100, 0, 100);
        this.makeup = map(settings[6], 0, 100, 0, 5);
        this.eye_type = map(settings[7], 0, 100, 0, 4);
    }


    /* get internal properties as list of numbers 0-100 */
    this.getProperties = function() {
        let settings = new Array(8);
        settings[0] = map(this.hair_colour, 0, 1, 0, 100);
        settings[1] = map(this.eyebrow_width, 0.05, 0.25, 0, 100);
        settings[2] = map(this.eyelid_type, 0, 4, 0, 100);
        settings[3] = map(this.eye_colour, 0, 360, 0, 100);
        settings[4] = map(this.lip_colour, 0, 1, 0, 100);
        settings[5] = map(this.teeth, 0, 100, 0, 100);
        settings[6] = map(this.makeup, 0, 5, 0, 100);
        settings[7] = map(this.eye_type, 0, 4, 0, 100);
        return settings;
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
}

function head(center_x, center_y) {
    push();
    noStroke();
    scale(0.9);
    translate(center_x, center_y);
    this.x_percentage = 1;
    this.y_percentage = 1;
    rectMode(CENTER);
    scale(0.3);

    push();
    fill(0, 10);

    rect(0, 0, 17 * this.x_percentage, 14 * this.y_percentage, 2.5); //core
    rect(0, 8, 10 * this.x_percentage, 2 * this.y_percentage); // bottom
    rect(0, -8.5, 7 * this.x_percentage, 3 * this.y_percentage, 0.5, 0.5, 0, 0); // top
    pop();
    //fill core colour
    fill(core_colour);

    rect(0, 0, 17 * this.x_percentage, 14 * this.y_percentage, 2.5); //core
    rect(0, 8, 10 * this.x_percentage, 2 * this.y_percentage); // bottom
    rect(0, -8.5, 7 * this.x_percentage, 3 * this.y_percentage, 0.5, 0.5, 0, 0); // top

    //fill highlight
    fill(light_colour);
    rect(0, 0, 17 * 0.8 * this.x_percentage, 14 * this.y_percentage, 2.5); //core
    rect(0, 8, 10 * 0.8 * this.x_percentage, 2 * this.y_percentage); // bottom
    rect(0, -8.5, 7 * 0.64 * this.x_percentage, 3 * this.y_percentage, 0.5, 0.5, 0, 0); // top

    //fill shadow
    fill(shadow_colour);
    rect(0, 7.5 * this.x_percentage, 10 * this.y_percentage, 1);


    pop();
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    theta = theta - 90;
    return theta;
}

function average_angle(eye) {
    let a1 = angle(eye[1][0], eye[1][1], eye[5][0], eye[5][1]);
    let a2 = angle(eye[2][0], eye[2][1], eye[4][0], eye[4][1]);
    let average = (a1 + a2) / 2;
    return average;
}

function distance(x1, y1, x2, y2) {
    var dy = abs(y2 - y1);
    var dx = abs(x2 - x1);
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return dist;
}

function average_distance(eye) {
    let d1 = distance(eye[1][0], eye[1][1], eye[5][0], eye[5][1]);
    let d2 = distance(eye[2][0], eye[2][1], eye[4][0], eye[4][1]);
    let average = (d1 + d2) / 2;
    return average;
}


function eye_shadow(eyebrow, eye) {
    push();
    fill(0, 10);
    noStroke();
    beginShape();
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[1][0], eyebrow[1][1]);
    curveVertex(eyebrow[2][0], eyebrow[2][1]);
    curveVertex(eyebrow[3][0], eyebrow[3][1]);
    curveVertex(eyebrow[4][0], eyebrow[4][1]);
    curveVertex(eye[0][0], eye[0][1]);
    curveVertex(eye[1][0], eye[1][1]);
    curveVertex(eye[2][0], eye[2][1]);
    curveVertex(eye[3][0], eye[3][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[1][0], eyebrow[1][1]);
    endShape(CLOSE);
    pop();
}

function nose(nose_bridge, nose_tip) {
    let nose_offset = 0.5;

    //backing
    fill(light_colour);
    noStroke();
    beginShape()
    vertex(nose_bridge[0][0], nose_bridge[0][1] - nose_offset);
    vertex(nose_tip[0][0], nose_tip[0][1] - nose_offset);
    vertex(nose_tip[nose_tip.length - 1][0], nose_tip[nose_tip.length - 1][1] - nose_offset);
    endShape(CLOSE);

    //bridge
    strokeWeight(0.07);
    noFill();
    stroke(core_colour);
    beginShape();
    curveVertex(nose_bridge[0][0], nose_bridge[0][1] - nose_offset);
    for (var i = 0; i < nose_bridge.length; i++) {
        curveVertex(nose_bridge[i][0], nose_bridge[i][1] - nose_offset);
    }
    curveVertex(nose_bridge[nose_bridge.length - 1][0], nose_bridge[nose_bridge.length - 1][1] - nose_offset);
    endShape();

    stroke(core_colour);
    beginShape();
    curveVertex(nose_bridge[2][0], nose_bridge[2][1] - nose_offset);
    for (var i = 2; i < nose_bridge.length; i++) {
        curveVertex(nose_bridge[i][0], nose_bridge[i][1] - nose_offset);
    }
    curveVertex(nose_bridge[nose_bridge.length - 1][0], nose_bridge[nose_bridge.length - 1][1] - nose_offset);
    endShape();
    //tip
    stroke(core_colour);
    strokeWeight(0.1);
    noFill();
    beginShape();
    curveVertex(nose_tip[0][0], nose_tip[0][1] - nose_offset);
    for (var i = 1; i < nose_tip.length - 1; i++) {
        curveVertex(nose_tip[i][0], nose_tip[i][1] - nose_offset);
    }
    curveVertex(nose_tip[nose_tip.length - 1][0], nose_tip[nose_tip.length - 1][1] - nose_offset);
    endShape();

    push();
    fill(0,20);
    noStroke();
    ellipse(nose_tip[1][0], nose_tip[1][1] - nose_offset,0.1,0.05);
    ellipse(nose_tip[nose_tip.length-2][0], nose_tip[nose_tip.length-2][1] - nose_offset,0.1,0.05);
    pop();

    push();
    ellipseMode(CENTER);
    noFill();
    stroke(core_colour);
    strokeWeight(0.05);
    translate(nose_tip[nose_tip.length-2][0], nose_tip[nose_tip.length-2][1] - nose_offset);
    //rotate(45);
    arc(0, 0, 0.3, 0.3, 315, 0);
    pop();

    push();
    ellipseMode(CENTER);
    noFill();
    stroke(core_colour);
    strokeWeight(0.05);
    translate(nose_tip[1][0], nose_tip[1][1] - nose_offset);
    //rotate(-45);
    arc(0, 0, 0.3, 0.3, 180, 235);
    pop();
}

function open_eye(pos, eye_size, eye_angle, eye_squint, eyelid_type, eye_colour, makeup) {
    push();
    translate(pos[0], pos[1]);
    noStroke();
    //eye background/tiredness - could be randomised
    fill(core_colour);
    ellipse(0, 0, eye_size * 1.2, eye_size * 1.2);

    push();
    fill(255, 100, 20, makeup);
    for (let i = 0; i < 20; i++) {
        ellipse(0, 0, eye_size * 1 + (0.025 * i), eye_size + 1 * (0.025 * i));
    }

    pop();

    //eye fill - solid black
    fill(0);
    ellipse(0, 0, eye_size, eye_size);
    push();
    colorMode(HSL);
    if(eye_colour > 0 && eye_colour< 360){
        fill(eye_colour, 100, 20);
        ellipse(0, 0, eye_size * 0.7, eye_size * 0.7);
    }
    pop();
    //white eye detail
    fill(255);
    ellipse(-eye_size / 7, -eye_size / 7, eye_size / 2.5, eye_size / 2.5);
    rotate(eye_angle);

    if (eyelid_type <= 1) {
        //none
    } else if (eyelid_type > 1 && eyelid_type <= 2) {
        //bttm rd
        eyelid_bottom_rd(eye_size, eye_squint);
    } else if (eyelid_type > 2 && eyelid_type <= 3) {
        //top rd
        eyelid_top_rd(eye_size, eye_squint);
    } else if (eyelid_type > 3 && eyelid_type <= 4) {
        //both rd   
        eyelid_top_rd(eye_size, eye_squint);
        eyelid_bottom_rd(eye_size, eye_squint);
    }
    pop();
}

function closed_eye(pos, eye_size, eye_angle) {
    push();
    translate(pos[0], pos[1]);
    rotate(eye_angle);
    stroke(0);
    strokeWeight(0.15);
    line(-eye_size / 2, 0, eye_size / 2, 0);
    pop();
}


function eyelid_top_rd(size, squint) {
    push();
    noStroke();
    fill(light_colour);
    translate(0, -size * squint / 2);
    scale(1.5);
    ellipse(0, 0, size, size / 2);
    pop();
}

function eyelid_bottom_rd(size, squint) {
    push();
    noStroke();
    fill(light_colour);
    translate(0, size * squint / 2);
    scale(1.5);
    ellipse(0, 0, size, size / 2);
    //highlight_colour.setAlpha(map(squint, 1.3, 1.9, 70, 0));
    stroke(255, 20);
    strokeWeight(0.05);
    noFill();
    arc(0, 0, size / 1, size / 2.5, 215, 325);
    //highlight_colour.setAlpha(70);
    pop();
}

function eyelid_top_sq(size, squint) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(light_colour);
    translate(0, -size * squint / 2);
    scale(1.5);
    rect(0, 0, size, size / 2);
    pop();
}

function eyelid_bottom_sq(size, squint) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(light_colour);
    translate(0, size * squint / 2);
    scale(1.5);
    rect(0, 0, size, size / 2);
    //highlight_colour.setAlpha(map(squint, 1.3, 1.9, 70, 0));
    stroke(255, 20);
    strokeWeight(0.05);
    noFill();
    //arc(0, 0, size / 1, size / 2.5, 215, 325);
    //highlight_colour.setAlpha(70);
    pop();
}

function eyebrows(eyebrow, width) {
    //eyebrow
    push();
    curveTightness(0);
    strokeJoin(ROUND);
    noFill();
    stroke(light_colour);
    strokeWeight(width * 1.7);
    beginShape();
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    for (var i = 1; i < eyebrow.length; i++) {
        curveVertex(eyebrow[i][0], eyebrow[i][1]);
    }
    curveVertex(eyebrow[eyebrow.length - 1][0], eyebrow[eyebrow.length - 1][1]);
    endShape();

    stroke(0, 200);
    strokeWeight(width);
    beginShape();
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    for (var i = 1; i < eyebrow.length; i++) {
        curveVertex(eyebrow[i][0], eyebrow[i][1]);
    }
    curveVertex(eyebrow[eyebrow.length - 1][0], eyebrow[eyebrow.length - 1][1]);
    endShape();

    pop();
}

function eyebrows_flow(eyebrow, width, colour) {
    //eyebrow
    push();
    fill(light_colour);
    stroke(light_colour);
    strokeWeight(width);
    beginShape();
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[1][0], eyebrow[1][1] - width / 2);
    curveVertex(eyebrow[2][0], eyebrow[2][1] - width / 2);
    curveVertex(eyebrow[3][0], eyebrow[3][1] - width / 2);
    curveVertex(eyebrow[4][0], eyebrow[4][1]);
    curveVertex(eyebrow[3][0], eyebrow[3][1] + width / 2)
    curveVertex(eyebrow[2][0], eyebrow[2][1] + width / 2);
    curveVertex(eyebrow[1][0], eyebrow[1][1] + width / 2);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    endShape();
    pop();
    push();
    noStroke();
    fill(colour);
    beginShape();
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[1][0], eyebrow[1][1] - width / 2);
    curveVertex(eyebrow[2][0], eyebrow[2][1] - width / 2);
    curveVertex(eyebrow[3][0], eyebrow[3][1] - width / 2);
    curveVertex(eyebrow[4][0], eyebrow[4][1]);
    curveVertex(eyebrow[3][0], eyebrow[3][1] + width / 2)
    curveVertex(eyebrow[2][0], eyebrow[2][1] + width / 2);
    curveVertex(eyebrow[1][0], eyebrow[1][1] + width / 2);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    endShape();
    pop();
    push();
    noStroke();
    fill(0, 20);
    beginShape();
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[1][0], eyebrow[1][1]);
    curveVertex(eyebrow[2][0], eyebrow[2][1]);
    curveVertex(eyebrow[3][0], eyebrow[3][1]);
    curveVertex(eyebrow[4][0], eyebrow[4][1]);
    curveVertex(eyebrow[3][0], eyebrow[3][1] + width / 2)
    curveVertex(eyebrow[2][0], eyebrow[2][1] + width / 2);
    curveVertex(eyebrow[1][0], eyebrow[1][1] + width / 2);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    curveVertex(eyebrow[0][0], eyebrow[0][1]);
    endShape();
    pop();
}

function cross_eye(pos, eye_size, eye_angle) {
    push();
    translate(pos[0], pos[1]);
    rotate(eye_angle);
    stroke(0);
    strokeWeight(0.15);
    eye_size = eye_size * 0.5;
    line(-eye_size / 2, eye_size / 2, eye_size / 2, -eye_size / 2);
    line(-eye_size / 2, -eye_size / 2, eye_size / 2, eye_size / 2);
    pop();
}

function classic_eye(pos, eye_size) {
    push();
    translate(pos[0], pos[1]);
    noStroke();
    fill(core_colour);
    eye_size = eye_size / 1.5;
    ellipse(0, 0, eye_size * 1.5, eye_size * 1.5);
    fill(0);
    ellipse(0, 0, eye_size, eye_size);
    pop();
}

function heart_eye(pos, eye_size, angle) {
    push();
    translate(pos[0], pos[1] - 0.2);
    rotate(angle)
    scale(0.9);
    noStroke();
    push();
    fill(139, 0, 0, 200);
    scale(1.2);
    beginShape();
    vertex(0, 0);
    bezierVertex(-eye_size / 2, -eye_size / 2, -eye_size, eye_size / 3, 0, eye_size);
    bezierVertex(eye_size, eye_size / 3, eye_size / 2, -eye_size / 2, 0, 0);
    endShape(CLOSE);
    pop();

    fill('#C91A09');
    beginShape();
    vertex(0, 0);
    bezierVertex(-eye_size / 2, -eye_size / 2, -eye_size, eye_size / 3, 0, eye_size);
    bezierVertex(eye_size, eye_size / 3, eye_size / 2, -eye_size / 2, 0, 0);
    endShape(CLOSE);

    push();
    noFill();
    strokeWeight(0.1);
    stroke(255, 150);
    arc(0, eye_size / 4, eye_size, eye_size / 2, 190, 210);
    pop();

    pop();
}

function eye_detail(pos, eye_size, angle, dir) {
    push();
    let detail_angle = 30;
    let line_num = 3;
    translate(pos[0], pos[1]);
    rotate(angle);
    stroke(core_colour);
    strokeWeight(0.07);
    //translate(eye_size / 2 * dir, 0);
    rotate(-detail_angle / 2);
    for (let i = 0; i < line_num; i++) {
        line(eye_size / 1.2 * dir, 0, eye_size * 1.2 * dir, 0);
        rotate(detail_angle / line_num);
    }
    pop();
}

function glasses(left_eye, right_eye, left_angle,right_angle,left_size,right_size) {
    push();
    stroke(0);
    strokeCap(SQUARE);
    rectMode(CENTER);
    noFill();
    strokeWeight(0.7);
    //line(0, 0, dir * eye_spacing / 2 - dir * eye_size * 1.7 / 2, 0);
    strokeWeight(0.12);
    push();
    translate(left_eye[0],left_eye[1]);
    rect(0, 0, left_size * 1.8, left_size * 1.3, 0.2, 0.2, 0.2, 0.2);
    pop();

    push();
    translate(right_eye[0],right_eye[1]);
    rect(0, 0, right_size * 1.8, right_size * 1.3, 0.2, 0.2, 0.2, 0.2);
    pop();
    pop();
}

function glasses_bridge(left_eye, right_eye, left_angle,right_angle,left_size,right_size,face_rotate) {
    push();
    stroke(0);
    strokeCap(SQUARE);
    rectMode(CENTER);
    noFill();
    translate(face_rotate, -0.5);
    strokeWeight(0.17);
    let y = (left_eye[1] + right_eye[1])/2 - 0.2;
    line(left_eye[0]+left_size*0.85 - face_rotate,y+0.5, right_eye[0]-right_size*0.85 - face_rotate,y+0.5);

    line(left_eye[0]-left_size*0.85 - face_rotate,y+0.5, -17*0.27/2,y+0.5);
    line(right_eye[0]+right_size*0.85 - face_rotate,y+0.5, 17*0.27/2,y+0.5);
    pop();
}
function classic_mouth(mouth_width, mouth_height, mouth_emotion) {
    push();
    noFill();
    strokeWeight(0.4);
    translate(0, mouth_height);
    stroke(0);
    arc(0, 0, mouth_width, 1, 0, 180);
    pop();
}

function open_mouth(top_lip, bottom_lip, teeth, lip_colour) {
    let offset = 0.5;

    push();
    noStroke();
    fill(0);
    scale(1.1);
    beginShape();
    vertex(bottom_lip[11][0], bottom_lip[11][1] - offset);
    vertex(bottom_lip[10][0], bottom_lip[10][1] - offset);
    vertex(bottom_lip[9][0], bottom_lip[9][1] - offset);
    vertex(bottom_lip[8][0], bottom_lip[8][1] - offset);
    vertex(top_lip[11][0], top_lip[11][1] - offset);
    vertex(top_lip[10][0], top_lip[10][1] - offset);
    vertex(top_lip[9][0], top_lip[9][1] - offset);
    vertex(top_lip[8][0], top_lip[8][1] - offset);
    vertex(top_lip[7][0], top_lip[7][1] - offset);
    endShape();
    pop();

    //let teeth_top = 0.15;
    let teeth_top = map(teeth, 0, 100, 0, 0.15);

    push();
    fill(255);
noStroke();
    beginShape();
        curveVertex(top_lip[11][0], top_lip[11][1] - offset);
    curveVertex(top_lip[11][0], top_lip[11][1] - offset);
    curveVertex(top_lip[10][0], top_lip[10][1] - offset);
    curveVertex(top_lip[9][0], top_lip[9][1] - offset);
    curveVertex(top_lip[8][0], top_lip[8][1] - offset);
    curveVertex(top_lip[7][0], top_lip[7][1] - offset);
    curveVertex(top_lip[8][0], top_lip[8][1] - offset + teeth_top);
    curveVertex(top_lip[9][0], top_lip[9][1] - offset + teeth_top);
    curveVertex(top_lip[10][0], top_lip[10][1] - offset + teeth_top);
    endShape(CLOSE);
    pop();

    //let teeth_bottom = 0.1;
    if (teeth >= 80) {
        let teeth_bottom = map(teeth, 80, 100, 0, 0.1);

        push();
        fill(255);
        noStroke();
        beginShape();
        curveVertex(bottom_lip[11][0], bottom_lip[11][1] - offset);
        curveVertex(bottom_lip[11][0], bottom_lip[11][1] - offset);
        curveVertex(bottom_lip[10][0], bottom_lip[10][1] - offset);
        curveVertex(bottom_lip[9][0], bottom_lip[9][1] - offset);
        curveVertex(bottom_lip[8][0], bottom_lip[8][1] - offset);
        curveVertex(bottom_lip[7][0], bottom_lip[7][1] - offset);
        curveVertex(bottom_lip[8][0], bottom_lip[8][1] - offset - teeth_bottom);
        curveVertex(bottom_lip[9][0], bottom_lip[9][1] - offset - teeth_bottom);
        curveVertex(bottom_lip[10][0], bottom_lip[10][1] - offset - teeth_bottom);
        endShape(CLOSE);
        pop();
    }

    push();
    noStroke();
    let c1 = color('#f0c80a');
    let c2 = color('#ffc694');
    let c3 = color('#ff9494');
    let c4 = color('#ff0000');
    let c5 = color('#690000');

    let lip_fill = color('#f0c80a')

    if (lip_colour <= 0.25) {
        lip_fill = lerpColor(c1, c2, map(lip_colour, 0, 0.25, 0, 1));
        fill(lip_fill);
    } else if (lip_colour <= 0.5) {
        lip_fill = lerpColor(c2, c3, map(lip_colour, 0.25, 0.5, 0, 1));
        fill(lip_fill);
    } else if (lip_colour <= 0.75) {
        lip_fill = lerpColor(c3, c4, map(lip_colour, 0.5, 0.75, 0, 1));
        fill(lip_fill);
    } else {
        lip_fill = lerpColor(c4, c5, map(lip_colour, 0.75, 1, 0, 1));
        fill(lip_fill);
    }

    beginShape();
    curveVertex(top_lip[0][0], top_lip[0][1] - offset);
    for (var i = 0; i < top_lip.length; i++) {
        curveVertex(top_lip[i][0], top_lip[i][1] - offset);
    }
    curveVertex(top_lip[top_lip.length - 1][0], top_lip[top_lip.length - 1][1] - offset);
    endShape(CLOSE);

    beginShape();
    curveVertex(bottom_lip[0][0], bottom_lip[0][1] - offset);
    for (var i = 0; i < bottom_lip.length; i++) {
        curveVertex(bottom_lip[i][0], bottom_lip[i][1] - offset);
    }
    curveVertex(bottom_lip[bottom_lip.length - 1][0], bottom_lip[bottom_lip.length - 1][1] - offset);
    endShape(CLOSE);
    pop();

    push();
    if (lip_colour <= 0.25) {
        fill(0, 15);
    } else {
        fill(0, 50);
    }
    noStroke();
    beginShape();
    vertex(bottom_lip[0][0], bottom_lip[0][1] - offset);
    vertex(bottom_lip[1][0], bottom_lip[1][1] - offset);
    vertex(bottom_lip[2][0], bottom_lip[2][1] - offset);
    vertex(bottom_lip[3][0], bottom_lip[3][1] - offset);
    vertex(bottom_lip[4][0], bottom_lip[4][1] - offset);
    vertex(bottom_lip[5][0], bottom_lip[5][1] - offset);
    vertex(bottom_lip[6][0], bottom_lip[6][1] - offset);
    vertex(bottom_lip[7][0], bottom_lip[7][1] - offset);
    vertex(bottom_lip[8][0], bottom_lip[8][1] - offset + 0.1);
    vertex(bottom_lip[9][0], bottom_lip[9][1] - offset + 0.1);
    vertex(bottom_lip[10][0], bottom_lip[10][1] - offset + 0.1);
    vertex(bottom_lip[11][0], bottom_lip[11][1] - offset + 0.1);
    endShape(CLOSE);

    beginShape();
    vertex(top_lip[0][0], top_lip[0][1] - offset);
    vertex(top_lip[1][0], top_lip[1][1] - offset + 0.1);
    vertex(top_lip[2][0], top_lip[2][1] - offset + 0.1);
    vertex(top_lip[3][0], top_lip[3][1] - offset + 0.1);
    vertex(top_lip[4][0], top_lip[4][1] - offset + 0.1);
    vertex(top_lip[5][0], top_lip[5][1] - offset + 0.1);
    vertex(top_lip[6][0], top_lip[6][1] - offset);
    vertex(top_lip[7][0], top_lip[7][1] - offset);
    vertex(top_lip[8][0], top_lip[8][1] - offset);
    vertex(top_lip[9][0], top_lip[9][1] - offset);
    vertex(top_lip[10][0], top_lip[10][1] - offset);
    vertex(top_lip[11][0], top_lip[11][1] - offset);
    endShape(CLOSE);
    pop();

    push();
    ellipseMode(CENTER);
    noFill();
    stroke(core_colour);
    strokeWeight(0.05);
    translate(top_lip[6][0], top_lip[6][1] - offset);
    arc(0, 0, 0.3, 0.3, 315, 45);
    pop();

    push();
    ellipseMode(CENTER);
    noFill();
    stroke(core_colour);
    strokeWeight(0.05);
    translate(top_lip[0][0], top_lip[0][1] - offset);
    arc(0, 0, 0.3, 0.3, 135, 235);
    pop();
}

function tongue_out(mouth_width, mouth_height, mouth_emotion) {
    push();
    noFill();
    strokeWeight(0.5);
    translate(0, mouth_height);
    stroke(0);
    arc(0, 0, mouth_width, 1, 0, 180);
    pop();
}

function line_mouth(mouth_width, mouth_height, mouth_emotion, dir) {
    push();
    noFill();
    strokeWeight(0.4);
    translate(dir * 0.5, mouth_height);
    stroke(0);
    //line(-mouth_width, 0, mouth_width, 0);
    curveTightness(0);
    beginShape();
    curveVertex(dir * -mouth_width / 1.5, -mouth_emotion / 4);
    curveVertex(dir * -mouth_width / 1.5, -mouth_emotion / 4);
    curveVertex(dir * mouth_width / 3 / 1.5, -mouth_emotion / 4);
    //curveVertex(mouth_width / 2, 0);
    curveVertex(dir * mouth_width / 1.5, mouth_emotion / 3);
    curveVertex(dir * mouth_width / 1.5, mouth_emotion / 3);
    endShape();

    strokeWeight(0.2);
    stroke('#B58800');
    if (dir > 0) {
        if (mouth_emotion > 0) {
            push();
            translate(dir * mouth_width / 1.5, mouth_emotion / 3);
            arc(0, 0, 1, 1, 0, 90);
            pop();
        } else {
            push();
            translate(dir * mouth_width / 1.5, mouth_emotion / 3);
            arc(0, 0, 1.2, 1.2, 270, 0);
            pop();
        }
    } else {
        if (mouth_emotion > 0) {
            push();
            translate(dir * mouth_width / 1.5, mouth_emotion / 3);
            arc(0, 0, 1, 1, 90, 180);
            pop();
        } else {
            push();
            translate(dir * mouth_width / 1.5, mouth_emotion / 3);
            arc(0, 0, 1.2, 1.2, 180, 270);
            pop();
        }
    }

    pop();
}

function butt_chin(mouth_width, mouth_height, mouth_emotion) {
    push();
    noFill();
    strokeWeight(0.4);
    translate(0, mouth_height);
    stroke(0);
    arc(0, 0, mouth_width * 2, mouth_emotion * 4, 0, 180);
    pop();
}