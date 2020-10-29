

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


function JordanFace() {
  const bg_color = [0, 0, 0];
  const fg_color = [255, 255, 255];
  const stroke_color = [95, 52, 8];


  this.eyepaint_value = 2;
  this.mouth_value = 1;
  this.tilt_value = 0;
  this.colour2_value = 0;

  this.draw = function(positions) {
    rotate(this.tilt_value);
var eye1_pos = positions.left_eye;
var eye2_pos = positions.right_eye;
var toplip_pos = positions.top_lip;
var bottomlip_pos = positions.bottom_lip;
 

 // Here I set my colour variables for the face and eye paint colour

  if (this.colour_value === 1) {
var colour1 = color(240,10,10,120);
}
if (this.colour_value === 2) {
var colour1 = color(0,0,255,150);
}
if (this.colour_value === 3) {
var colour1 = color(255,255,255,120);
}

  if (this.colour2_value === 1) {
var colour2 = color(240,10,10,80);
}
if (this.colour2_value === 2) {
var colour2 = color(0,0,255,80);
}
if (this.colour2_value === 3) {
var colour2 = color(255,255,255,80);
}
if (this.colour2_value === 4) {
var colour2 = color(255,255,255,0);
}

    //face 
    // Here I use the points around the jaw and eyebrows to make a face shape that is filled
    // to provide a base for the face paint
    fill(colour2);
    noStroke();
    beginShape();
    for(var i=0; i<positions.chin.length;i++) {
      vertex(positions.chin[i][0], positions.chin[i][1]);
    }
    for(var i=positions.right_eyebrow.length-1; i>=0;i--) {
      vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1]);
    }
    for(var i=positions.left_eyebrow.length-1; i>=0;i--) {
      vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1]);
    }
    endShape(CLOSE);


    // eyes
   
    if (this.eyepaint_value === 1) {
     ;
      // This is my first variant of the eye make up that makes a curved triangle going down from the eye.
      fill(colour1);
    
      beginShape();
      vertex(eye1_pos[4][0]+.2 , eye1_pos[3][1]+.21);
      quadraticVertex(-1.5, -.2, eye1_pos[1][0] -.4 , 1.2); 
      quadraticVertex(-1.5, -.2, eye1_pos[0][0] , eye1_pos[3][1]+.25);  
      endShape(); 

      beginShape();
      vertex(eye2_pos[4][0]-.2 , eye2_pos[3][1]+.21);
      quadraticVertex(1.5, -.2, eye2_pos[1][0] +.4 , 1.2); 
      quadraticVertex(1.5, -.2, eye2_pos[3][0], eye2_pos[0][1]+.25);  
      endShape(); 
      noStroke(); 
      
    }
    if (this.eyepaint_value === 2) {
     ;
      // For my second eye make-up variant I've made a diamond shape mapped to the eye corners.
      fill(colour1);
      triangle(eye1_pos[3][0] +.2,eye1_pos[3][1],eye1_pos[0][0]-.25,eye1_pos[0][1],eye1_pos[2][0],-2.5);
      triangle(eye1_pos[3][0]+.2,eye1_pos[3][1],eye1_pos[0][0]-.25,eye1_pos[0][1],eye1_pos[1][0],.5);

      triangle(eye2_pos[3][0]+.25,eye2_pos[3][1],eye2_pos[0][0]-.2,eye2_pos[0][1],eye2_pos[1][0],-2.5);
      triangle(eye2_pos[3][0]+.25,eye2_pos[3][1],eye2_pos[0][0]-.2,eye2_pos[0][1],eye2_pos[2][0],.5);

    }
    if (this.eyepaint_value === 3) {
     ;
      // I've made a variant of the eye make up that is a stripe across the face
      // I didn't end up using this variant as it does not work well visually
      // However I've kept the code in place to show my process and so that it can be seen when changing the settings

      fill(colour1);
    
      rect(eye1_pos[0][0] -.25 ,eye1_pos[2][1] -.2,3,.6,.2);

    }
    // I've seperated the dark makeup around the eye from the other parts so I can turn it on and off independently. 
    // However I've left it on for all variants as it works best visually.
     if (this.eyeshadow_value === 1) {
             fill(0,0,0,120)
      bezier(eye1_pos[3][0]+.2 , eye1_pos[3][1], -1.6 , -1.9 , -1.8 , -.3, eye1_pos[3][0]+.2 , eye1_pos[3][1] );
      bezier(eye2_pos[0][0] -.2, eye2_pos[0][1], 1.6 , -1.9 , 1.8 , -.3, eye2_pos[0][0]-.2 , eye2_pos[0][1]);
      fill(255,0,0);
      fill(fg_color);
    }

    // mouth
    if (this.mouth_value === 1) {
    // My first mouth variant is a quad below the lip

    fill(0,0,0,120);
    quad(bottomlip_pos[2][0],bottomlip_pos[2][1],bottomlip_pos[4][0],bottomlip_pos[4][1],
      bottomlip_pos[4][0] +.1,bottomlip_pos[4][1]+.6,bottomlip_pos[2][0] -.1,bottomlip_pos[2][1]+.6,2);
  }
    
 if (this.mouth_value === 2) {
    // The second mouth variant is a kind of exaggerated lipstick that makes the mouth appear much larger.

    fill(0,0,0,120);
    bezier(toplip_pos[0][0]-.2, toplip_pos[0][1],0,toplip_pos[4][1]-.2,0,toplip_pos[4][1]-.2,toplip_pos[6][0]+.2,toplip_pos[6][1]);
    bezier(toplip_pos[0][0]-.2, toplip_pos[0][1],-.4,bottomlip_pos[3][1]+.3,.4,bottomlip_pos[3][1]+.3,toplip_pos[6][0]+.2,toplip_pos[6][1]);
  }
  }

  this.setProperties = function(settings) {
    this.eyepaint_value = int(map(settings[0], 0, 100, 1, 3));
    this.mouth_value = int(map(settings[1], 0, 100, 1, 2));
    this.colour_value = int(map(settings[3], 0, 100 ,1, 3));
    this.eyeshadow_value = int(map(settings[4], 0, 100 ,1, 2));
    this.colour2_value = int(map(settings[5], 0, 100 ,1, 3));
  }

    this.getProperties = function() {
     let settings = new Array(5);
    settings[0] = map(this.eyepaint_value, 1, 3, 0, 100);
    settings[1] = map(this.mouth_value, 1, 2, 0, 100);
    settings[3] = map(this.colour_value, 1, 3, 0, 100);
    settings[4] = map(this.eyeshadow_value, 1, 2, 0, 100);
    settings[5] = map(this.colour2_value, 1, 3, 0, 100);
    console.log(settings[5]);
    return settings;
  }
}
