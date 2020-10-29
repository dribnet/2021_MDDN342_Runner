/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
//var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
// var NUM_SLIDERS = 6;

// other variables can be in here too
// here's some examples for colors used

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


function TualaFace() {
 // faceColor values
  const light_shade = color(232,198,153); 
  const medium_shade = color(241,194,125);
  const tan_shade = color(198,134,66);
  const dark_shade = color(141,85,36);
 // eyeColor values
  const light_blue = color(161,202,241);
  const green_eye = color(108,165,128);
 // hairColor values
  const dark_tone = color(69,24,0); 
  const light_tone = color(235,215,141);
  const medium_tone = color(132,97,39); 
  // lip_color values
  const neutral_lip = color(227,158,116);
  const pink_lip = color(240,157,151);
  const dark_lip = color(148,82,80);
  const red_lip = color(255,0,0);
  
  /* THE RANGE OF MY VALUES BELOW:
  *faceColor,eyeColor,hairColor,lip_color = 0-3
  *headShape = eyeSize = 0-10
  *mouth_open1 = 0-5
  */

  this.faceColor = 0;
  this.eyeColor = 0;
  this.hair_change = 0;
  this.hairColor = 0;
  this.eyeSize = 10;
  this.lip_color = 0;
  this.mouth_open1 = 0;
  this.nose_shade = 0;
 
   /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */   
    this.draw = function(positions) {
   
    /*--------------------------------------------------------------
    //HAIR
	* HAIR SHADES MAPPED TO SLIDER 5
	* HAIR STYLE CHANGE MAPPED TO SLIDER 4
	* Hair changes style based on gender; female = longer hair, male = shorter hair. 
	-------------------------------------------------------------- */
    noStroke();
    if(this.hairColor == 0) {
      fill(0);
    }
    else if (this.hairColor==1) {
      fill(dark_tone);
    }
    else if (this.hairColor==2) {
      fill(medium_tone);
    }
    else {
      fill(light_tone);
    }
	//longer hair
	if (this.hair_change == 0) {
	   beginShape();
        curveVertex(positions.chin[0][0]+1, positions.chin[0][1]);
        curveVertex(positions.chin[16][0]+0.5, positions.chin[16][1]);
        curveVertex(2.5, -2);
        curveVertex(1, -3);
        curveVertex(0, -3);
        curveVertex(-0.5, -3);
        curveVertex(-2, -2.2);
        curveVertex(positions.chin[0][0]-0.8, positions.chin[0][1]+2);
        curveVertex(positions.left_eyebrow[2][0]-1.5,positions.left_eyebrow[2][0]+3.5);
        curveVertex(0,2);
        curveVertex(positions.right_eyebrow[2][0]+2.2,positions.right_eyebrow[2][1]+3.5);
	    curveVertex(positions.chin[16][0]+0.6, positions.chin[16][1]-0.5);
        curveVertex(positions.chin[16][0], positions.chin[16][1]);
       endShape();
	}
	else { //shorter hair
         beginShape();
        curveVertex(positions.chin[0][0]+1, positions.chin[0][1]);
        curveVertex(positions.chin[16][0]+0.5, positions.chin[16][1]);
        curveVertex(+2.2, -2);
        curveVertex(+1, -3);
        curveVertex(0, -3);
        curveVertex(-1, -3);
        curveVertex(-1.5, -2);
        curveVertex(positions.chin[0][0], positions.chin[0][1]);
        curveVertex(positions.left_eyebrow[2][0],positions.left_eyebrow[2][0]+1);
        curveVertex(0,1);
        curveVertex(positions.right_eyebrow[2][0],positions.right_eyebrow[2][1]+1);
        curveVertex(positions.chin[11][5], positions.chin[16][1]);
        curveVertex(positions.chin[11][5], positions.chin[16][1]);
       endShape();
	}

    //--------------------------------------------------------------
    // FACE - SKIN TONE MAPPED TO SLIDER 2
	//--------------------------------------------------------------
	
    //stroke(235,177,92);
	//strokeWeight(0.03);
	noStroke();
    if(this.faceColor == 0) {
      fill(light_shade);
    }
    else if (this.faceColor==1) {
      fill(medium_shade);
    }
    else if (this.faceColor==2) {
      fill(tan_shade);
    }
    else {
      fill(dark_shade);
    }
	
	beginShape();
    for(let i = 0; i < positions.chin.length; i++) {
      curveVertex(positions.chin[i][0], positions.chin[i][1]);
      curveVertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(let i = 4; i >= 0; i--) {
      curveVertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]-0.4);
    }
    for(let i = 4; i >= 0; i--) {
      curveVertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]-0.4);
    }
    curveVertex(positions.chin[1][0], positions.chin[0][1]);
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    curveVertex(positions.chin[0][0], positions.chin[0][1]);
    endShape();
	
	//--------------------------------------------------------------
	//MOUTH - this.mouth_open1 MAPPED TO SLIDER 1 - DOES NOT WORK YET
	// I copied this code from a student but I have adjusted it to suit my own face.
    //--------------------------------------------------------------	
	
	//white back (teeth) inside mouth
	noStroke();
	fill(255);
      beginShape();
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]);
      curveVertex(positions.top_lip[1][0], positions.top_lip[1][1]);
      curveVertex(positions.top_lip[2][0], positions.top_lip[2][1]);
      curveVertex(positions.top_lip[3][0], positions.top_lip[3][1]);
      curveVertex(positions.top_lip[4][0], positions.top_lip[4][1]);
      curveVertex(positions.top_lip[5][0], positions.top_lip[5][1]);
      curveVertex(positions.top_lip[6][0], positions.top_lip[6][1]);

      curveVertex(positions.bottom_lip[7][0], positions.bottom_lip[6][1]);
      curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]);
      curveVertex(positions.bottom_lip[9][0], positions.bottom_lip[9][1]);
      curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);

      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]);
      curveVertex(positions.bottom_lip[7][0], positions.bottom_lip[7][1]);
      endShape();
	
	//LIPS - MAPPED TO SLIDER 6
	 if (this.lip_color == 0){
	  fill(neutral_lip);
	} 
	else if (this.lip_color == 1) {
	  fill(pink_lip);
	}	
	else if (this.lip_color == 2) {
	  fill(dark_lip);
	}	
	else {
	  fill(red_lip);
	}	
	
	   beginShape();
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]+0.05);
      curveVertex(positions.top_lip[2][0], positions.top_lip[2][1]-0.03);
      curveVertex(positions.top_lip[3][0], positions.top_lip[3][1]);
      curveVertex(positions.top_lip[4][0], positions.top_lip[4][1]);
      curveVertex(positions.top_lip[6][0], positions.top_lip[6][1]+0.05);
      curveVertex(positions.top_lip[8][0], positions.top_lip[8][1]+0.05);
      curveVertex(positions.top_lip[10][0], positions.top_lip[10][1]+0.05);
      curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]+0.05);
      curveVertex(positions.top_lip[2][0], positions.top_lip[2][1]-0.03);
      curveVertex(positions.top_lip[3][0], positions.top_lip[3][1]);
      endShape();
	
      beginShape();
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      curveVertex(positions.bottom_lip[1][0], positions.bottom_lip[1][1]);
      curveVertex(positions.bottom_lip[2][0], positions.bottom_lip[2][1]);
      curveVertex(positions.bottom_lip[3][0], positions.bottom_lip[3][1]);
      curveVertex(positions.bottom_lip[5][0], positions.bottom_lip[5][1]);
      curveVertex(positions.bottom_lip[6][0], positions.bottom_lip[6][1]);
      curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]);
      curveVertex(positions.bottom_lip[9][0], positions.bottom_lip[9][1]);
      curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
      curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]);
      curveVertex(positions.bottom_lip[1][0], positions.bottom_lip[1][1]);
      curveVertex(positions.bottom_lip[3][0], positions.bottom_lip[3][1]);
      endShape();

    //--------------------------------------------------------------
    //EYES
	//--------------------------------------------------------------
	
	//EYE POSITIONS
    noStroke();
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye); 	
	//EYE BACKGROUND
	fill(255);
	noStroke();
	ellipse(left_eye_pos[0], left_eye_pos[1], 0.58, 0.37);
    ellipse(right_eye_pos[0], right_eye_pos[1], 0.58, 0.37);
	
    //EYE COLOR - COLORS MAPPED TO SLIDER 3
  noStroke();
    if(this.eyeColor == 0) {
      fill('#A87A51');
    }
    else if (this.eyeColor==1) {
      fill(light_blue);
	}
    else {
      fill(green_eye);
    } 
    ellipse(left_eye_pos[0], left_eye_pos[1], this.eyeSize/30);
    ellipse(right_eye_pos[0], right_eye_pos[1],this.eyeSize/30);
  
    //EYE PUPILS 
    fill(50);
    ellipse(left_eye_pos[0], left_eye_pos[1], 0.18);
    ellipse(right_eye_pos[0], right_eye_pos[1],0.18); 
    //EYE REFLECTION	 
    fill(255);
    ellipse(left_eye_pos[0]+0.1, left_eye_pos[1]-0.1, 0.1);
    ellipse(right_eye_pos[0]+0.1, right_eye_pos[1]-0.1,0.1);
	
	//--------------------------------------------------------------
	//EYEBROWS
	//--------------------------------------------------------------
	
	fill(50);
    stroke(50);
    strokeWeight(0.07);
    // LEFT EYEBROW
    beginShape();
    for(let i = 1; i < positions.left_eyebrow.length; i++) {
      curveVertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
      curveVertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }  
    endShape();
    // RIGHT EYEBROW
    beginShape();
    for(let i = 0; i < 4; i++) {
      curveVertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
      curveVertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    endShape();
 	
    //--------------------------------------------------------------
	//NOSE 
	//--------------------------------------------------------------
	
    let nose_top = positions.nose_bridge[0];
    let nose_bottom = positions.nose_bridge[3];
	
    noFill();
    stroke(145,97,60);
    strokeWeight(0.07);
    //NOSE ARROW
    beginShape();
    vertex(positions.nose_tip[0][0], positions.nose_tip[0][1])
    vertex(positions.nose_tip[1][0], positions.nose_tip[1][1])
    vertex(positions.nose_tip[1][0], positions.nose_tip[1][1])
    vertex(positions.nose_tip[2][0], positions.nose_tip[2][1])
    vertex(positions.nose_tip[2][0], positions.nose_tip[2][1])
    vertex(positions.nose_tip[3][0], positions.nose_tip[3][1])
    vertex(positions.nose_tip[3][0], positions.nose_tip[3][1])
    vertex(positions.nose_tip[4][0], positions.nose_tip[4][1])
    endShape();
    //NOSE LINE
	stroke(145,97,60);
    beginShape();
    vertex(positions.nose_bridge[0][0], positions.nose_bridge[0][1])
    vertex(positions.nose_bridge[1][0], positions.nose_bridge[1][1])
    vertex(positions.nose_bridge[1][0], positions.nose_bridge[1][1])
    vertex(positions.nose_bridge[2][0], positions.nose_bridge[2][1])
    vertex(positions.nose_bridge[2][0], positions.nose_bridge[2][1])
    vertex(positions.nose_bridge[3][0], positions.nose_bridge[3][1])
    vertex(positions.nose_bridge[3][0], positions.nose_bridge[3][1])
    vertex(positions.nose_tip[2][0], positions.nose_tip[2][1])
    endShape();
	
	
}

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    //this.mouthRadius = map(settings[0], 0, 100, 0.7, 2);
	this.mouth_open1 = map(settings[0], 0, 100, 0, 5);
    this.faceColor = int(map(settings[1], 0, 100, 0,3));
    this.eyeColor = int(map(settings[2], 0, 100, 0, 2));
	this.hair_change = int(map(settings[3], 0, 100, 0, 2));
	this.hairColor = int(map(settings[4], 0, 100, 0, 3));	
	this.lip_color = int(map(settings[5], 0, 100, 0, 3));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    //settings[0] = map(this.mouthRadius, 0.7, 2, 0, 100);
	settings[0] = map(this.mouth_open1, 0, 5, 0, 100);
    settings[1] = map(this.faceColor, 0, 3, 0, 100);
    settings[2] = map(this.eyeColor, 0, 2, 0, 100);
	settings[3] = map(this.hair_change, 0, 2, 0, 100);
	settings[4] = map(this.hairColor, 0, 3, 0, 100);
	settings[5] = map(this.lip_color, 0, 3, 0, 100);
    return settings;
  }
}
