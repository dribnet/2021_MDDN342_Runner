/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// other variables can be in here too
// these control the colors used
const truLip = "#E37D55";
const truWhite = "#E3CFB9";
const truShadow = "#A06644";
const truMouth = "#2B1C17";

function JoyFace() {
  // these are state variables for a face
  // (your variables may be different)
  this.wink_value = 1;//keep
  this.colour_value = 0.5;//keep
  this.hair_colour_value = 0.5;
  this.eye_colour_value = 0.5;
  this.brow_value = 0.5;

  /*
   * Draw a face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

  //Variables for face size and mouth status
  var faceWidth = positions.chin[16][0] - positions.chin[0][0];//right of face - left of face  = face width
  var faceHeight = positions.chin[16][1] - positions.chin[0][1];//bottom of face - top of face  = face height
  //variables to indicate which side the face tends toward
  var faceCenter = positions.chin[16][0] - faceWidth/2;//right of face - (face width/2) = center face position
  var faceAngle = map(positions.nose_tip[2][0], positions.chin[0][0], positions.chin[16][0], -1, 1);//map middle of nose value to face width from left face-right face to -1 - +1
  // print(faceAngle);
  //if above val is >0, nose is on right. if val < 0, nose is on left 
  if((positions.top_lip[9][1] - positions.top_lip[0][1])>0){
    var smile_Value = positions.top_lip[9][1] - positions.top_lip[0][1]
  }
  else{
    var smile_Value = positions.top_lip[9][1] - positions.top_lip[6][1]; //corners of mouth are above/below mid top lip
  }
  var smile_Value = 2*positions.top_lip[9][1] - positions.top_lip[6][1]- positions.top_lip[0][1];

  var mouthOpen_Value = positions.bottom_lip[9][1] - positions.top_lip[9][1]/*bottom of top lip*/; // distance between bottom middle of top lip and top middle of bottom lip
  
  if(smile_Value > 0){//if smile_value is positive, smiling, else not smiling
    var smile = true;
  }
  else{
    var smile = false;
  }

  if (mouthOpen_Value > 0.1){// if mouthOpen_value is small (close to 0), the mouth is closed, else it is open
    var mouthOpen = true;
  }
  else{
    var mouthOpen = false;
  }
  if(faceAngle < 0.05){
    var centerFaceDraw = positions.nose_tip[2][0] - faceCenter;
  }
  else if(faceAngle > 0.05){
    var centerFaceDraw = positions.nose_tip[2][0] - faceCenter*-1;
  }
  else{
    var centerFaceDraw = 0;
  }

  //face
  var truBase = color(241, 141, 83);
  var truBase2 = color(255, 199, 113);
  var curBaseColour = lerpColor(truBase2, truBase, this.colour_value);
  fill(curBaseColour);
  noStroke();
  beginShape();
  for(var i=0; i<positions.chin.length;i++) {
    vertex(positions.chin[i][0], positions.chin[i][1]);
  }
  for(var i=positions.right_eyebrow.length-1; i>=2;i--) {
    vertex(positions.right_eyebrow[i][0], positions.right_eyebrow[i][1] - 1);
  }
  for(var i=positions.left_eyebrow.length-3; i>=0;i--) {
    vertex(positions.left_eyebrow[i][0], positions.left_eyebrow[i][1] - 1);
  }
  endShape();

  //eye fake tan rims
  push();
  scale(0.03);
  noFill();
  var l = 0.5*509.0/255;
  strokeWeight(1.5);
  push();
  translate(-28, -32.5);
  for (var i = 1; i<225*4; i+=32) {
    stroke ( 255, 255, 240, 255-(i+200)/(l));
    ellipse(positions.left_eye[0][0], positions.left_eye[0][1], i, i);
  }
  pop();
  push();
  translate(28, -32.5);
  for (var i = 1; i<225*4; i+=32) {
    stroke ( 255, 255, 210, 255-(i+200)/(l));
    ellipse(positions.right_eye[0][0], positions.right_eye[0][1], i, i);
  }
  pop();
  noStroke()
  pop();

  //eyes
  //eye rim
  //R
  push();
  scale(1.2);
  translate(-0.1, 0.17);
  fill(truShadow);
  if (this.wink_value >= 0.5 ){
    beginShape();
    for(var i=0; i<positions.right_eye.length;i++) {
     vertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    }
   endShape();
  }
  else{
    beginShape();
   for(var i=0; i<positions.right_eye.length - 2;i++) {
      vertex(positions.right_eye[i][0], positions.right_eye[i][1]);
    }
    vertex(positions.right_eye[1][0] + (positions.right_eye[2][0] - positions.right_eye[1][0])/2 - 0.04, positions.right_eye[1][1] +0.03 );
    vertex(positions.right_eye[1][0] + (positions.right_eye[2][0] - positions.right_eye[1][0])/2 + 0.05, positions.right_eye[1][1] +0.02 );
    endShape();
  }
  pop();
  push()
  scale(1.2);
  translate(0.1, 0.17);
  //L
  fill(truShadow);
  beginShape();
   for(var i=0; i<positions.left_eye.length;i++) {
    vertex(positions.left_eye[i][0], positions.left_eye[i][1]);
  }
  endShape();
  pop();

  //eye whites
  //R
  fill(truWhite);
  if (this.wink_value >= 0.5 ){
  beginShape();
  for(var i=0; i<positions.right_eye.length;i++) {
    vertex(positions.right_eye[i][0], positions.right_eye[i][1]);
  }
  endShape();
}
  //L
  fill(truWhite);
  beginShape();
   for(var i=0; i<positions.left_eye.length;i++) {
    vertex(positions.left_eye[i][0], positions.left_eye[i][1]);
  }
  endShape();
  noStroke();

  //irises
  var truIris1 = color(136, 173, 150);
  var truIris2 =color(0, 47, 54);
  var truIris3 = color(163, 97, 10);
  var truIris4 =color(61, 33, 0);

  //setting eye colour

  if(this.eye_colour_value < 0.4){
    var truIris = lerpColor(truIris1, truIris2, this.eye_colour_value);
  }
  else if(this.eye_colour_value >= 0.4 && this.eye_colour_value < 0.6){
    var truIris = lerpColor(truIris2, truIris3, this.eye_colour_value);
  }
  else{
    var truIris = lerpColor(truIris3, truIris4, this.eye_colour_value);
  }
  fill(truIris);
  //R

  if (this.wink_value >= 0.5 ){
  beginShape();
  vertex(positions.right_eye[1][0], positions.right_eye[1][1]);
  vertex(positions.right_eye[2][0], positions.right_eye[2][1]);
  vertex(positions.right_eye[4][0], positions.right_eye[4][1]-0.03);
  vertex(positions.right_eye[5][0]+(positions.right_eye[4][0]-positions.right_eye[5][0])/2, positions.right_eye[4][1])
  vertex(positions.right_eye[5][0], positions.right_eye[5][1]-0.03);
  endShape();
  }
  //L
  beginShape();
  vertex(positions.left_eye[1][0], positions.left_eye[1][1]);
  vertex(positions.left_eye[2][0], positions.left_eye[2][1]);
  vertex(positions.left_eye[4][0], positions.left_eye[4][1]-0.03); 
  vertex(positions.left_eye[5][0]+(positions.left_eye[4][0]-positions.left_eye[5][0])/2, positions.left_eye[4][1])
  vertex(positions.left_eye[5][0], positions.left_eye[5][1]-0.03);
  endShape();

  let bottomLip5 = positions.bottom_lip[3];
  let topLip1 = positions.top_lip[0];
  let topLip4 = positions.top_lip[3];
  let topLip7 = positions.top_lip[6];

  //lips
  if (!smile && !mouthOpen){ //draw pucker
    push();
    translate (positions.nose_tip[2][0] - 3.1, positions.nose_tip[2][1] - 4.8);
    scale(0.008, 0.0089);
    fill(truLip);
    beginShape();
    vertex(390,571);
    vertex(375,565);
    vertex(367,570);
    vertex(351,595);
    vertex(334,623);
    vertex(327,629);
    vertex(331,634);
    vertex(344,675);
    vertex(366,703);
    vertex(396,707);
    vertex(417,698);
    vertex(433,677);
    vertex(442,644);
    vertex(439,630);
    vertex(445,627);
    vertex(435,618);
    vertex(427,594);
    vertex(416,573);
    vertex(405,565);
    endShape();
  
    //inside 
    fill(truMouth);
    push();
    scale(0.5);
    translate(390, 650);
    beginShape();
    vertex(387,591);
    vertex(369,597);
    vertex(362,613);
    vertex(356,625);
    vertex(363,649);
    vertex(387,653);
    vertex(413,644);
    vertex(418,623);
    vertex(412,610);
    vertex(404,589);
    endShape();
    pop();
    pop();
  }
  else if (!smile && mouthOpen){ //draw shouting mouth
    push();
    translate (positions.nose_tip[2][0] - 3.1, positions.nose_tip[2][1] - 4.8);
    scale(0.008, 0.0089);
    fill(truLip);
    beginShape();
    vertex(390,571);
    vertex(375,565);
    vertex(367,570);
    vertex(351,595);
    vertex(334,623);
    vertex(327,629);
    vertex(331,634);
    vertex(344,675);
    vertex(366,703);
    vertex(396,707);
    vertex(417,698);
    vertex(433,677);
    vertex(442,644);
    vertex(439,630);
    vertex(445,627);
    vertex(435,618);
    vertex(427,594);
    vertex(416,573);
    vertex(405,565);
    endShape();
  
    //inside 
    fill(truMouth);
    beginShape();
    vertex(387,591);
    vertex(369,597);
    vertex(362,613);
    vertex(356,625);
    vertex(363,649);
    vertex(387,653);
    vertex(413,644);
    vertex(418,623);
    vertex(412,610);
    vertex(404,589);
    endShape();
    //teeth1 
    fill(truWhite);
    beginShape();
    vertex(418,619);
    vertex(386,618);
    vertex(356,620);
    vertex(363,649);
    vertex(387,644);
    vertex(413,644);
    endShape();
    //teeth2
    beginShape();
    vertex(409,599);
    vertex(405,589);
    vertex(369,596);
    vertex(369,601);
    vertex(369,596);
    endShape();
    pop();
  }
  else if (smile && !mouthOpen){ //grumpy face
    push();
    translate (positions.nose_tip[2][0] - 3.1, positions.nose_tip[2][1] - 4.9);
    scale(0.008, 0.0089);
    fill(truLip);
    beginShape();
    vertex(390,617);//cupids bow
    vertex(375,617);//highest
    vertex(367,617);
    vertex(327,639);//left
    vertex(366,650);
    vertex(396,660);//lowest
    vertex(417,650);
    vertex(445,637);//right
    vertex(416,627);
    vertex(405,620);//highest2
    endShape();
  
    //inside 
    fill(truShadow);
    beginShape();
    vertex(387,630);//highest
    vertex(362,635);
    vertex(295,665);//left
    vertex(363,649);
    vertex(387,642);//lowest
    vertex(413,645);
    vertex(465,660);//right
    vertex(412,630);
    endShape();
    pop();
  }
  else if (smile && mouthOpen){ //normal smile
  //teeth
  noStroke();
  fill(truWhite);
  beginShape();
  vertex(topLip1[0], topLip1[1]);
  vertex(topLip4[0], topLip4[1]);
  vertex(topLip7[0], topLip7[1]);
  vertex(bottomLip5[0], bottomLip5[1]);
  vertex(topLip1[0], topLip1[1]);
  endShape();
  //lips
  noStroke();
  fill(truLip);
  beginShape();
  for(var i=0; i<positions.top_lip.length;i++) {
    vertex(positions.top_lip[i][0], positions.top_lip[i][1]);
  }
  endShape();

  beginShape();
  for(var i=0; i<positions.bottom_lip.length;i++) {
    vertex(positions.bottom_lip[i][0], positions.bottom_lip[i][1]);
  }
  endShape();

  //under-mouth shadow
  fill(truShadow);
  beginShape();
  if(faceAngle > -0.5){ //if not facing left
    vertex(positions.bottom_lip[3][0] - 0.4,positions.bottom_lip[3][1] + 0.1);
    vertex(positions.bottom_lip[3][0] - 0.3,positions.bottom_lip[3][1] + 0.08);
    vertex(positions.bottom_lip[3][0] - 0.3,positions.bottom_lip[3][1] + 0.07);
  }
  else{
    vertex(positions.bottom_lip[3][0] - 0,positions.bottom_lip[3][1] + 0.1);
    vertex(positions.bottom_lip[3][0] - 0.1,positions.bottom_lip[3][1] + 0.08);
    vertex(positions.bottom_lip[3][0] - 0.15,positions.bottom_lip[3][1] + 0.07);
  }
  vertex(positions.bottom_lip[3][0] - 0.03,positions.bottom_lip[3][1]);//bottom-most lip point
  
  if(faceAngle < 0.5){ // if not facing right
    vertex(positions.bottom_lip[3][0] + 0.2,positions.bottom_lip[3][1] + 0.03);
    vertex(positions.bottom_lip[3][0] + 0.3,positions.bottom_lip[3][1] + 0.07);
    vertex(positions.bottom_lip[3][0] + 0.3,positions.bottom_lip[3][1] + 0.08);
    vertex(positions.bottom_lip[3][0] + 0.4,positions.bottom_lip[3][1] + 0.1);
  }
  else{
    vertex(positions.bottom_lip[3][0] + 0.15,positions.bottom_lip[3][1] + 0.03);
    vertex(positions.bottom_lip[3][0] + 0.2,positions.bottom_lip[3][1] + 0.07);
    vertex(positions.bottom_lip[3][0] + 0.25,positions.bottom_lip[3][1] + 0.08);
    vertex(positions.bottom_lip[3][0] + 0.15,positions.bottom_lip[3][1] + 0.1);
  } 
  vertex(positions.bottom_lip[3][0],positions.bottom_lip[3][1] + 0.09);//mid bottom
  endShape();
  }
 
  //Nose
  let noseMidX = positions.nose_tip[2][0];
  let noseMidY = positions.nose_tip[2][1];
  let noseMLeftX = positions.nose_tip[1][0];
  let noseMLeftY = positions.nose_tip[1][1];
  let noseLeftX = positions.nose_tip[0][0];
  let noseLeftY = positions.nose_tip[0][1];
  let noseRightX = positions.nose_tip[4][0];
  let noseRightY = positions.nose_tip[4][1];
  let noseMRightX = positions.nose_tip[3][0];
  let noseMRightY = positions.nose_tip[3][1];

  fill(curBaseColour);
  beginShape();
  if(faceAngle <=-0.1){ // if face is pointed more toward the right
    vertex(noseLeftX + 0.2, noseLeftY - 0.5);//left high
    vertex(noseLeftX - 0.02, noseLeftY - 0.1);//left
    vertex(noseLeftX + 0.08, noseLeftY + 0.08);
  }
  vertex(noseMLeftX - 0.02 , noseMLeftY - 0.05);
  vertex(noseMLeftX + 0.05, noseMLeftY - 0.2);//left nostril
  vertex(noseMLeftX + 0.1, noseMLeftY + 0.05);//left tip
  vertex(noseMidX + 0.08, noseMidY - 0.08);//right tip
  vertex(noseMRightX, noseMRightY - 0.1);//right nostril
  vertex(noseMRightX + 0.05, noseMRightY + 0.05);
  vertex(noseRightX, noseRightY);
  
  if(faceAngle > 0.1){ //if face is pointed toward the left more
    vertex(noseRightX - 0.2, noseRightY-0.5);//right high
  }
  endShape();

  fill(truShadow);

  beginShape();
  if(faceAngle <=-0.1){ // if face is pointed more toward the right
    vertex(noseLeftX + 0.2, noseLeftY - 0.8);//left high
    vertex(noseLeftX - 0.02, noseLeftY - 0.1);//left
    vertex(noseLeftX + 0.08, noseLeftY + 0.08);
  }
  vertex(noseMLeftX - 0.02 , noseMLeftY - 0.05);
  vertex(noseMLeftX + 0.05, noseMLeftY - 0.2);//left nostril
  vertex(noseMLeftX + 0.1, noseMLeftY + 0.05);//left tip
  vertex(noseMidX + 0.08, noseMidY - 0.08);//right tip
  vertex(noseMRightX, noseMRightY - 0.1);//right nostril
  vertex(noseMRightX + 0.05, noseMRightY + 0.05);
  vertex(noseRightX, noseRightY);
  
  if(faceAngle > 0.1){ //if face is pointed toward the left more
    vertex(noseRightX - 0.2, noseRightY-0.8);//right high
  }

  vertex(noseMRightX + 0.25, noseMRightY - 0.05);
  vertex(noseMRightX + 0.03, noseMRightY + 0.1);
  vertex(noseMRightX - 0.05, noseMRightY + 0.1);
  vertex(noseMidX + 0.1, noseMidY + 0.04);
  vertex(noseMidX - 0.13, noseMidY + 0.05);
  vertex(noseMLeftX, noseMLeftY + 0.07);
  vertex(noseMLeftX - 0.09 , noseMLeftY + 0.08);
  vertex(noseLeftX - 0.02, noseLeftY + 0.1);
  vertex(noseLeftX - 0.1, noseLeftY + 0.0);

  endShape();

  //shadows

  //eyelids
  //R
  beginShape();
  vertex(positions.right_eye[0][0], positions.right_eye[0][1] - 0.12);
  vertex(positions.right_eye[1][0], positions.right_eye[1][1] - 0.1);
  vertex(positions.right_eye[2][0], positions.right_eye[2][1] - 0.1);
  vertex(positions.right_eye[3][0], positions.right_eye[3][1] - 0.12);
  vertex(positions.right_eye[2][0], positions.right_eye[2][1] - 0.15);
  vertex(positions.right_eye[1][0], positions.right_eye[1][1] - 0.15);
  endShape();

  beginShape();
  vertex(positions.left_eye[0][0], positions.left_eye[0][1] - 0.1);
  vertex(positions.left_eye[1][0], positions.left_eye[1][1] - 0.1);
  vertex(positions.left_eye[2][0], positions.left_eye[2][1] - 0.1);
  vertex(positions.left_eye[3][0], positions.left_eye[3][1] - 0.1);
  vertex(positions.left_eye[2][0], positions.left_eye[2][1] - 0.15);
  vertex(positions.left_eye[1][0], positions.left_eye[1][1] - 0.15);
  endShape();

  //Brows
  var truhair = color(255, 206, 10);
  var truhair2 = color(255, 246, 140);
  var curHairColour = lerpColor(truhair2, truhair, this.hair_colour_value);
  fill(curHairColour);
  var browArch = map(this.brow_value, 0, 1, -0.23, 0.17);
  //R
  push();
  beginShape();
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]);//left top
  vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1] + browArch);//middle top
  vertex(positions.right_eyebrow[4][0], positions.right_eyebrow[4][1]);//right top
  vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1]+0.2 + browArch);//middle bottom
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]+0.2);//left bottom
  
  endShape();
  pop();
  //L
  beginShape();
  vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1]);//left top
  vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]);//middle top
  vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]);//right top

  vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1]+0.2);
  vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1]+0.2);//middle bottom
  endShape();
  
  //Hair
  fill(curHairColour);
  if(faceAngle <= -0.6){ //looking to the left the most (extreme)
    push();
    translate (-2.8, -4.8);
    scale(0.008, 0.0089);
    beginShape();
    vertex(225,340);//corner
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(142,230);
    vertex(142,261);
    vertex(163,286);
    endShape();
    pop();
  beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0] - 0.5, positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.4);
  vertex(positions.left_eyebrow[0][0]+0.05, positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L
  vertex(positions.chin[1][0]-0.1, positions.chin[1][1]);
  //non-hairline
  vertex(positions.chin[1][0] - 0.05, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.2, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] - 0.1, positions.chin[0][1] - 1.4);
  vertex(positions.right_eyebrow[2][0]- 1.7, positions.right_eyebrow[2][1] - 1);
  vertex(positions.right_eyebrow[2][0]- 1.5, positions.right_eyebrow[2][1] - 1);
  vertex(positions.right_eyebrow[2][0]- 1, positions.right_eyebrow[2][1] - 1.5);
  
  vertex(positions.right_eyebrow[2][0] + 1, positions.right_eyebrow[2][1] - 1.3);
  vertex(positions.right_eyebrow[2][0] + 1.9, positions.right_eyebrow[2][1] - 0.7);
  vertex(positions.right_eyebrow[2][0] + 2, positions.right_eyebrow[2][1] - 0.4);

  endShape();
  }
  else if(faceAngle < -0.5  && faceAngle > -0.6){ //looking to the left the most
  push();
  translate (-2.8, -4.8);
  scale(0.008, 0.0089);
    beginShape();
    vertex(160,500);
    pop();
    push();
    vertex(positions.chin[1][0] + 180,positions.chin[1][1] + 490);//lowest left
    //scale(125, 112.35);
    vertex(positions.chin[0][0] + 180,positions.chin[0][1]+490);
    pop();
    push();
    translate (-2.8, -4.8);
    scale(0.008, 0.0089);
    vertex(210,335);//corner
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(150,337);
    vertex(145,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0] - 0.5, positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.4);
  vertex(positions.left_eyebrow[0][0]+0.05, positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L
  vertex(positions.chin[1][0]-0.1, positions.chin[1][1]);
  //non-hairline
  vertex(positions.chin[1][0] - 0.05, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.2, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] - 0.1, positions.chin[0][1] - 1.4);
  vertex(positions.right_eyebrow[2][0]- 2.35, positions.right_eyebrow[2][1] - 1);
  vertex(positions.right_eyebrow[2][0]- 1.5, positions.right_eyebrow[2][1] - 1.6);
  vertex(positions.right_eyebrow[2][0]- 1, positions.right_eyebrow[2][1] - 1.5);
  
  vertex(positions.right_eyebrow[2][0] + 1, positions.right_eyebrow[2][1] - 1.3);
  vertex(positions.right_eyebrow[2][0] + 1.9, positions.right_eyebrow[2][1] - 0.7);
  vertex(positions.right_eyebrow[2][0] + 2, positions.right_eyebrow[2][1] - 0.4);

  endShape();
  }
  else if(faceAngle < -0.14 && faceAngle > -0.35){ //looking to the left smaller amount
  push();
  translate (-2.9, -4.8);
  scale(0.008, 0.0089);
    beginShape();
    vertex(160,500);
    pop();
    push();
    vertex(positions.chin[1][0] + 180,positions.chin[1][1] + 490);//lowest left
    //scale(125, 112.35);
    vertex(positions.chin[0][0] + 180,positions.chin[0][1]+490);
    pop();
    push();
    translate (-2.9, -4.8);
    scale(0.008, 0.0089);
    vertex(210,335);//corner
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(150,337);
    vertex(145,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  //vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.4);
  vertex(positions.left_eyebrow[0][0]+0.05, positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L
  vertex(positions.chin[1][0]-0.1, positions.chin[1][1]);
  //non-hairline
  vertex(positions.chin[1][0] - 0.05, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.2, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] - 0.1, positions.chin[0][1] - 1.4);
  vertex(positions.right_eyebrow[2][0]- 2.35, positions.right_eyebrow[2][1] - 1);
  vertex(positions.right_eyebrow[2][0]- 1.5, positions.right_eyebrow[2][1] - 1.6);
  vertex(positions.right_eyebrow[2][0]- 1, positions.right_eyebrow[2][1] - 1.5);
  
  vertex(positions.right_eyebrow[2][0]+ 1, positions.right_eyebrow[2][1]-1);
  vertex(positions.right_eyebrow[2][0]+ 1.2, positions.right_eyebrow[2][1]- 0.5);

  endShape();
  }
  else if(faceAngle <= -0.35){ //looking to the left more
  push();
  translate (-2.6, -4.8);
  scale(0.008, 0.0089);
    beginShape();
    vertex(160,500);
    pop();
    push();
    vertex(positions.chin[1][0] + 180,positions.chin[1][1] + 490);//lowest left
    //scale(125, 112.35);
    vertex(positions.chin[0][0] + 180,positions.chin[0][1]+490);
    pop();
    push();
    translate (-2.7, -4.8);
    scale(0.008, 0.0089);
    vertex(210,335);//corner
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(150,337);
    vertex(145,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  //vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.4);
  vertex(positions.left_eyebrow[0][0]+0.05, positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L
  vertex(positions.chin[1][0]-0.1, positions.chin[1][1]);
  //non-hairline
  vertex(positions.chin[1][0] - 0.05, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.2, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] - 0.1, positions.chin[0][1] - 1.4);
  vertex(positions.right_eyebrow[2][0]- 2.35, positions.right_eyebrow[2][1] - 1);
  vertex(positions.right_eyebrow[2][0]- 1.5, positions.right_eyebrow[2][1] - 1.6);
  vertex(positions.right_eyebrow[2][0]- 1, positions.right_eyebrow[2][1] - 1.5);
  
  vertex(positions.right_eyebrow[2][0]+ 1.55, positions.right_eyebrow[2][1]-1);
  vertex(positions.right_eyebrow[2][0]+ 1.7, positions.right_eyebrow[2][1]- 0.5);

  endShape();
  }
  else if(faceAngle >= -0.14 && faceAngle <= 0.14){ //looking straight on
  push();
  translate (-3.25, -4.8);
  scale(0.0089);
    beginShape();
    vertex(160,500);
    vertex(188,507);
    vertex(190,407);
    vertex(210,335);
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(138,337);
    vertex(138,378);
    vertex(135,427);
    endShape();
    pop();
    beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.35);
  vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L

  //non-hairline
  vertex(positions.chin[1][0] - 0.15, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.25, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] + 0.2, positions.chin[0][1] - 1.3);

  vertex(positions.right_eyebrow[2][0]- 2.5, positions.right_eyebrow[2][1] - 1);
  vertex(positions.right_eyebrow[2][0]+ 0.6, positions.right_eyebrow[2][1] - 0.9);

  endShape();
  }

  else if (faceAngle > 0.12 && faceAngle <=0.35){ // looking to the right a small amount
    push();
  translate (-3.35, -4.8);
  scale(0.0087, 0.0089);
    beginShape();
    vertex(160,500);
    vertex(188,507);
    vertex(190,407);
    vertex(210,335);
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(138,337);
    vertex(138,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.35);
  vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L

  //non-hairline
  vertex(positions.chin[1][0] - 0.15, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.25, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] + 0.2, positions.chin[0][1] - 1.9);

  vertex(positions.right_eyebrow[2][0]- 2.5, positions.right_eyebrow[2][1] - 1.4);
  vertex(positions.right_eyebrow[2][0]+ 0.6, positions.right_eyebrow[2][1] - 0.9);

  endShape();
  }

  else if(faceAngle >= 0.35 && faceAngle < 0.5){ //looking to right more
    push();
    translate (-3.6, -4.8);
    scale(0.0087, 0.0089);
    beginShape();
    vertex(160,500);
    vertex(188,507);
    vertex(190,407);
    vertex(210,335);
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(138,337);
    vertex(138,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.35);
  vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L

  //non-hairline
  vertex(positions.chin[1][0] - 0.15, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.25, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] + 0.2, positions.chin[0][1] - 1.9);

  vertex(positions.right_eyebrow[2][0]- 2.5, positions.right_eyebrow[2][1] - 1.4);
  vertex(positions.right_eyebrow[2][0]+ 0.2, positions.right_eyebrow[2][1] - 0.5);

  endShape();
  }
  
  else if(faceAngle>0.5 && faceAngle<0.6){ // looking to the right most
    push();
    translate (-3.6, -4.8);
    scale(0.0087, 0.0089);
    beginShape();
    vertex(160,500);
    vertex(188,507);
    vertex(190,407);
    vertex(210,335);
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);
    vertex(549,462);
    vertex(561,482);
    vertex(578,493);
    vertex(600,454);
    vertex(587,420);
    vertex(591,382);
    vertex(596,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(138,337);
    vertex(138,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.35);
  vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L

  //non-hairline
  vertex(positions.chin[1][0] - 0.15, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.25, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] + 0.2, positions.chin[0][1] - 1.5);

  vertex(positions.right_eyebrow[2][0]- 2.5, positions.right_eyebrow[2][1] - 1.2);
  vertex(positions.right_eyebrow[2][0]+ 0.2, positions.right_eyebrow[2][1] - 0.5);

  endShape();
  }

  else { // looking to the right most (extreme)
    push();
    translate (-3.6, -4.8);
    scale(0.0087, 0.0089);
    beginShape();
    vertex(160,500);
    vertex(188,507);
    vertex(190,407);
    vertex(210,335);
    vertex(250,305);
    vertex(333,276);
    vertex(408,302);
    vertex(534,329);

    vertex(560,343);
    vertex(588,322);
    vertex(582,278);
    vertex(607,252);
    vertex(586,202);
    vertex(536,190);
    vertex(485,167);
    vertex(419,157);//R
    vertex(347,154);//highest
    vertex(266,174);//L
    vertex(198,199);
    vertex(132,230);
    vertex(132,261);
    vertex(153,286);
    vertex(141,308);
    vertex(138,337);
    vertex(138,378);
    vertex(135,427);
    endShape();
    pop();
  beginShape();
  //hairline
  vertex(positions.chin[15][0], positions.chin[15][1]);//face R
  vertex(positions.chin[16][0], positions.chin[16][1]); // Face R
  vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.4);
  vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[2][1] - 0.45);
  vertex(positions.right_eyebrow[0][0] - 0.7, positions.right_eyebrow[0][1] - 0.8);//mid forehead hair
  vertex(positions.left_eyebrow[3][0] - 0.4, positions.right_eyebrow[2][1] - 0.35);
  vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - 0.5);
  vertex(positions.chin[0][0], positions.chin[0][1]); //face L
  vertex(positions.chin[1][0], positions.chin[1][1]);//face L

  //non-hairline
  vertex(positions.chin[1][0] - 0.15, positions.chin[1][1] - 0.2);
  vertex(positions.chin[0][0] - 0.25, positions.chin[0][1] - 0.35);
  vertex(positions.chin[0][0] - 0.15, positions.chin[0][1] - 0.7);
  vertex(positions.chin[0][0] + 0.2, positions.chin[0][1] - 1.5);

  vertex(positions.right_eyebrow[2][0]- 2.5, positions.right_eyebrow[2][1] - 1.2);
  vertex(positions.right_eyebrow[2][0]+ 0.2, positions.right_eyebrow[2][1] - 0.5);

  endShape();
  }

  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.wink_value = map(settings[0], 0, 100, 0, 1);
    this.colour_value = map(settings[1], 0, 100, 0, 1);
    this.hair_colour_value = map(settings[2], 0, 100, 0, 1);
    this.eye_colour_value = map(settings[3], 0, 100, 0, 1);
    this.brow_value = map(settings[4], 0, 100, 0, 1);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(5);
    settings[0] = map(this.wink_value, 0, 1, 0, 100);
    settings[1] = map(this.colour_value, 0, 1, 0, 100);
    settings[2] = map(this.hair_colour_value, 0, 1, 0, 100);
    settings[3] = map(this.eye_colour_value, 0, 1, 0, 100);
    settings[4] = map(this.brow_value, 0, 1, 0, 100);
    
    return settings;
  }
}

// given an array of [x,y] points, return the average
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
