/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used



function SalazarFace() {
  const bg_color = [225, 206, 187];
  const fg_color = "#A19588";
  const stroke_color = [95, 52, 8];

  // these are state variables for a face
  // (your variables may be different)
  this.eye_value = 0;
  this.mouth_value = 0;
  this.eyebrow_value = 0;
  this.nose_value = 0;
  this.outline_value = 0;
   this.skin_tone = [
    "#FDEFD6", "#F7DABD", "#EDBC9B", "#D6A37E", "#BD836D","#87563F"
  ]
  this.hair_tone = [
    "#edbc9b", "#edbc9b", "#e9858f", "#ed9ba3", "#f1b1b7", "#f5c6cb"
  ]
  

  

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
    
    
  this.draw = function(positions) {
      
      
      let pos_leftcheek = positions.chin[2];
      let pos_rightcheek = positions.chin[15];
      let pos_bottomcheek = positions.chin[7];
      let pos_bottomcheek2 = positions.chin[9];
      
    let pos_lefteye = average_point(positions.left_eye);
    let pos_righteye = average_point(positions.right_eye);

    let pos_lefteyeline = positions.left_eye[0];
    let pos_lefteyeline2 = positions.left_eye[2];
    let pos_lefteyeline3 = positions.left_eye[3];

    let pos_righteyeline = positions.right_eye[0];
    let pos_righteyeline2 = positions.right_eye[2];
    let pos_righteyeline3 = positions.right_eye[3];
        
      let pos_rightbrow = positions.right_eyebrow[1];
      let pos_rightbrow2 = positions.right_eyebrow[4];
      let pos_rightbrow3 = positions.right_eyebrow[2];
      
      
      
      let pos_leftbrow = positions.left_eyebrow[2];
      let pos_leftbrow2 = positions.left_eyebrow[4];
      
      // let pos_bottomlip = average_point(positions.bottom_lip)
      // let pos_toplip = average_point(positions.top_lip)


    let pos_bottomleftlip = positions.bottom_lip[6];
    let pos_bottomleftlip2 = positions.bottom_lip[6];
    let pos_bottommidlip = positions.bottom_lip[3];
    let pos_bottomrightlip = positions.bottom_lip[0];
    let pos_bottomrightlip2 = positions.bottom_lip[11];


    let pos_topleftlip = positions.top_lip[0];
    let pos_topleftlip2 = positions.top_lip[0];
    let pos_topmidlip = positions.top_lip[4];
    let pos_topmidlip2 = positions.top_lip[2];
    let pos_topmidlip3 = positions.top_lip[3];
    let pos_toprightlip = positions.top_lip[6];
    let pos_toprightlip2 = positions.top_lip[7];

 
      let pos_nosetip = positions.nose_tip[0];
      let pos_nosetip2 = positions.nose_tip[3];
      let pos_nosebridge = positions.nose_bridge[4];
      
      
  //FACE

      push();
      fill(this.skin_tone[this.skin_tone_value]);
      noStroke()  
      beginShape();
            vertex(0, -3)
            quadraticVertex(2, -3, 2, 0);
            quadraticVertex(2, 2, 0, 2);
            quadraticVertex(-2, 2, -2,0);
            quadraticVertex(-2, -3, 0, -3);
       endShape();
       pop();
      
       //FACE OUTLINE
      push();
      scale(1.1);
      noFill();
      translate(0.2,0.1);
      strokeWeight(this.outline_value);
      stroke(this.hair_tone[this.hair_tone_value]);
      beginShape();
            vertex(0, -3)
            quadraticVertex(2, -3, 2, 0);
            quadraticVertex(2, 2, 0, 2);
            quadraticVertex(-2, 2, -2,0);
            quadraticVertex(-2, -3, 0, -3);
       endShape();
      pop();
  
    
  //NOSE
    push();
    noFill();
    stroke(0);
    strokeWeight(0.1);

  //EYEBROW
      beginShape();
              vertex(pos_nosetip[0],pos_nosetip[1]);
              bezierVertex(pos_nosetip2[0],0.7+this.nose_value,pos_nosetip2[1]-0.5, pos_rightbrow3[1]-this.eyebrow_value-1,pos_rightbrow2[0], pos_rightbrow2[1]);
      endShape();
      pop();
      

//MOUTH
beginShape();
    fill(0);
    vertex(pos_topleftlip[0], pos_topleftlip[1]);
      quadraticVertex(pos_topmidlip[0], pos_topmidlip[1]+0.3, pos_toprightlip[0], pos_toprightlip[1]);
      quadraticVertex(pos_topmidlip[0], pos_topmidlip[1], pos_topmidlip3[0], pos_topmidlip3[1]);
      quadraticVertex(pos_topmidlip2[0], pos_topmidlip2[1], pos_topleftlip[0], pos_topleftlip[1]);
  endShape();

    beginShape();
    fill(0);
    vertex(pos_bottomleftlip[0], pos_bottomleftlip[1] );
    quadraticVertex(pos_bottommidlip[0], pos_bottommidlip[1] +0.5 + this.mouth_value, pos_bottomrightlip[0], pos_bottomrightlip[1]);
    quadraticVertex(pos_bottommidlip[0], pos_bottommidlip[1] -0.2 + this.mouth_value, pos_bottomleftlip2[0], pos_bottomleftlip2[1]);
  endShape();


    //EYES 
    
      push();
           fill(0);
           noStroke();
           arc(pos_lefteye[0], pos_lefteye[1]-0.02, 0.5+this.eye_value, 0.5+this.eye_value, 360, 180);
           arc(pos_righteye[0],pos_righteye[1]-0.02, 0.5+this.eye_value, 0.5+this.eye_value, 360, 180);
      pop();


      push();
      noFill();
      stroke(0);
      strokeWeight(0.1);

      beginShape();
      vertex(pos_lefteyeline[0],pos_lefteyeline[1]);
      quadraticVertex(pos_lefteyeline2[0],pos_lefteyeline2[1],pos_lefteyeline3[0],pos_lefteyeline3[1]);
      endShape();

      beginShape();
      vertex(pos_righteyeline[0],pos_righteyeline[1]);
      quadraticVertex(pos_righteyeline2[0],pos_righteyeline2[1],pos_righteyeline3[0],pos_righteyeline3[1]);
      endShape();
      pop();

      
      
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    // print(settings);
      
    this.eye_value = map(settings[0], 0, 100, -0.3, 0.3);  
    this.eyebrow_value = map(settings[1],0,100,-0.7, 0.7);
    this.mouth_value = map(settings[2], 0, 100, -0.5, 0.5);
    this.nose_value = map(settings[3],0,100,-0.5,0.5);
    this.outline_value = map(settings[4],0,100,0,0.3);
    this.skin_tone_value = int(map(settings[5], 0, 100, 0, 5));
    this.hair_tone_value = int(map(settings[6], 0, 100,0, 5));

  
          
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
   let settings = new Array(5);
    settings[0] = map( this.eye_value,  -0.3, 0.3, 0, 100);
    settings[1] = map( this.eyebrow_value,  -0.7, 0.7, 0, 100);
    settings[2] = map( this.mouth_value,  -0.5, 0.5, 0, 100);
    settings[3] = map( this.nose_value,  -0.5,0.5, 0, 100);
    settings[4] = map( this.outline_value,  0,0.3, 0, 100);
    settings[5] = map(this.skin_tone_value, 0,5,0,100);
    settings[6] = map(this.hair_tone_value, 0, 5, 0, 100);

    return settings;
  }
}


function average_point(list) {
  var sum_x = 0;
  var sum_y = 0;
  var num_points = 0;
  for(var i=0; i<list.length; i++) {
    sum_x += list[i][0];
    sum_y += list[i][1];
    num_points += 1; 
  }
  return [sum_x / num_points, sum_y / num_points];
}