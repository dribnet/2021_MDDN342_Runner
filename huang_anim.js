function drawCrown() { //function to draw a crown
  var pineappleShade = color(237, 159, 0);
  var crownColor = color(230, 175, 11);
  fill(pineappleShade);
  triangle(width/2.05, height/5.5, width/1.98, height/7.3, width/1.93, height/5.5); //crown
  fill(crownColor);
  triangle(width/2.1, height/5.5, width/2.04, height/6.9, width/1.99, height/5.5);
  triangle(width/1.98, height/5.5, width/1.93, height/6.9, width/1.88, height/5.5);
}

function drawLine() { //function draws one rectangle for the fence
  fill(70);
  rect(width/100, height/2.02, width/120, height/8);
}

function drawClouds() { //draws clouds in the background
  var cloudColor = color(242, 242, 242);
  fill(cloudColor);
  ellipse(width/18, height/5.8, width/14, height/14);
  ellipse(width/10, height/6, width/12, height/9);
  ellipse(width/7, height/5.6, width/14, height/16);
  ellipse(width/5.8, height/5.3, width/18, height/30);
}


function drawpineLines() { //function draws pineapple lines
  var pineappleLines = color(227, 155, 0);
  push();
  stroke(pineappleLines);
  noFill();
  strokeWeight(width/100);
  line(width/5.4, height/4.6, width/3.99, height/3.1);
  line(width/7, height/3.97, width/4.19, height/2.45);
  line(width/7.62, height/3.03, width/5.09, height/2.25);

  line(width/5.1, height/4.6, width/7.62, height/3.05);
  line(width/4.23, height/4.03, width/6.87, height/2.4);
  line(width/3.99, height/3.05, width/5.4, height/2.25);
  pop();
}  

function drawLeaf() { //draws pineapple leaves
  var leafColor = color(73, 135, 37);
  var leafShade = color(63, 107, 21);
  push();
  stroke(leafColor); 
  strokeWeight(width/30);
  line(width/5.2, height/6.8, width/5.25, height/3);
  strokeWeight(width/60);
  line(width/5.2, height/8.5, width/5.25, height/3);

  stroke(leafShade);
  strokeWeight(width/30);
  line(width/6, height/5.3, width/5.25, height/3);
  strokeWeight(width/65);
  line(width/6.2, height/6.4, width/5.25, height/3);

  strokeWeight(width/30);
  line(width/4.6, height/5.3, width/5.25, height/3);
  strokeWeight(width/65);
  line(width/4.45, height/6.4, width/5.25, height/3);
  pop();
}


function huang_draw_one_frame(cur_frac) {
  // note: to clear the screen draw a rectangle
  // that is width x height - like this
  noStroke();
  fill(156, 200, 255); //background colour
  rect(0, 0, width, height);

  // note: all shape sizes, line widths, etc. should be a
  // function of width and height
  let rect_width = height / 10.0;
  let half_width = rect_width / 2;

  // note: animation should progress depending on the 
  // value of cur_frac which goes from 0 to 1, and it
  // should loop seamlessly
  let cur_x = map(cur_frac, 0, 1, 0, width) - half_width;


  //colour variables
  var grassColor = color(69, 153, 74);
  var bushColor = color(21, 130, 27);
  var pillarColor = color(235, 231, 223);
  var pathColor = color(247, 201, 94);
  var castleColor = color(222, 212, 189);
  var castleShade = color(194, 187, 172);
  var castleShadeDark = color(156, 151, 142);
  var castleDoor = color(77, 64, 53);
  var pineappleColor = color(255, 174, 0);
  var pineappleLines = color(227, 155, 0);
  var pineappleShade = color(237, 159, 0);
  var leafColor = color(73, 135, 37);
  var leafShade = color(63, 107, 21);
  var crownColor = color(230, 175, 11);


  //mapping the clouds
  let cloudsMove;
  if (cur_frac > 0.5) { 
    cloudsMove = map(cur_frac, 0, 0.5, width/-16, width/-14);
  } else {
    cloudsMove = map(cur_frac, 0.5, 1, width/-14, width/-16);
  }

  let cloudsMoveLeft;
  if (cur_frac > 0.5) {
    cloudsMoveLeft = map(cur_frac, 0, 0.5, width/2.4, width/2.3);
  } else {
    cloudsMoveLeft = map(cur_frac, 0.5, 1, width/2.3, width/2.4);
  }

  let cloudsMoveRight;
  if (cur_frac > 0.5) {
    cloudsMoveRight = map(cur_frac, 0, 0.5, width/0.72, width/0.715);
  } else {
    cloudsMoveRight = map(cur_frac, 0.5, 1, width/0.715, width/0.72);
  }

  let cloudsRightSmall;
  if (cur_frac > 0.5) {
    cloudsRightSmall = map(cur_frac, 0, 0.5, width/0.535, width/0.54);
  } else {
    cloudsRightSmall = map(cur_frac, 0.5, 1, width/0.54, width/0.535);
  }

  //draws clouds
  push();
  scale(0.6);
  translate(cloudsMove, height/5);
  drawClouds();
  pop();

  push();
  scale(0.4);
  translate(cloudsMoveLeft, height/8);
  drawClouds();
  pop();

  push();
  scale(0.65);
  translate(cloudsMoveRight, height/5);
  drawClouds();
  pop();

  push();
  scale(0.4);
  translate(cloudsRightSmall, height/8);
  drawClouds();
  pop();


  //draws castle
  fill(castleShade);
  rect(width/2.5, height/30, height/12, height/12); //castle's top bricks
  rect(width/2.09, height/30, height/12, height/12);
  rect(width/1.8, height/30, height/12, height/12);
  fill(pillarColor);
  rect(width/2.5, height/30, height/12, height/100); //castle's top bricks (darker)
  rect(width/2.09, height/30, height/12, height/100);
  rect(width/1.8, height/30, height/12, height/100);
  fill(castleShadeDark);
  stroke(0, 100);
  strokeWeight(height/300);  
  rect(width/3.23, height/6, width/18, height/3);
  rect(width/1.57, height/6, width/18, height/3);
  noStroke();
  fill(pathColor);
  triangle(width/3.23, height/6, width/2.95, height/12, width/2.74, height/6);
  triangle(width/1.57, height/6, width/1.5, height/12, width/1.444, height/6);
  fill(castleShade);
  rect(width/4.05, height/3, width/1.98, height/4.5); //back wall
  fill(pillarColor);
  rect(width/4.05, height/3, width/1.98, height/100);
  fill(castleShade);
  rect(width/2.44, height/12, width/5.5, height/2.8);
  fill(castleColor);
  rect(width/2.32, height/2.8, width/7, height/4); //front door wall
  fill(castleShade);
  rect(width/2.32, height/2.8, width/7, height/100);
  stroke(0, 100);
  strokeWeight(height/300);
  rect(width/2.74, height/3.2, width/15, height/3);
  rect(width/1.75, height/3.2, width/15, height/3);
  noStroke();
  fill(pathColor);
  triangle(width/2.74, height/3.2, width/2.52, height/4.5, width/2.312, height/3.2);
  triangle(width/1.75, height/3.2, width/1.65, height/4.5, width/1.565, height/3.2);
  fill(castleDoor);
  stroke(30, 90);
  strokeWeight(height/140);
  ellipse(width/1.998, height/2, width/16, height/5); //castle door
  noStroke();
  fill(80);
  rect(width/2.157, height/12, width/280, height/8); //castle flag straps
  rect(width/1.87, height/12, width/280, height/8); 
  fill(pathColor);
  rect(width/2.245, height/8.6, width/8.8, height/4.6); //castle flag
  fill(pillarColor);
  rect(width/2.2, height/8.6, width/65, height/4.6); //flag stripes
  rect(width/1.874, height/8.6, width/65, height/4.6);
  fill(castleShadeDark);
  rect(width/2.82, height/2.7, width/45, height/50); //castle brick
  rect(width/2.82, height/2.4, width/45, height/50); 
  rect(width/2.82, height/2.17, width/45, height/50); 
  rect(width/1.596, height/2.7, width/45, height/50); //castle brick
  rect(width/1.596, height/2.4, width/45, height/50); 
  rect(width/1.596, height/2.17, width/45, height/50);
  fill(castleShadeDark);
  rect(width/2.45, height/7, width/55, height/60);
  rect(width/1.74, height/4.6, width/55, height/60);


  //draws pineapple on flag
  stroke(pineappleShade);
  strokeWeight(width/52);
  line(width/2.05, height/3.43, width/2.05, height/3.5); //leg
  line(width/1.935, height/3.43, width/1.935, height/3.5); 
  line(width/2.15, height/4.6, width/1.94, height/4); //hand
  line(width/1.9, height/4.35, width/1.85, height/4.6); 
  fill(pineappleColor);
  noStroke();
  rect(width/2.13, height/6, width/15, height/8, width/35); //head
  push();
  scale(0.5);
  translate(width/1.228, height/7.7);
  drawpineLines();
  pop();
  fill(30);
  ellipse(width/2.028, height/4.5, height/48); //eyes
  ellipse(width/1.95, height/4.5, height/48);
  arc(width/1.988, height/4.2, width/60, width/60, 0, PI, CHORD); //mouth
  push();
  translate(-1.5, -1);
  drawCrown(); //crown
  pop();
  stroke(30);
  strokeWeight(width/150);
  line(width/2.15, height/5.6, width/2.17, height/3.8); //staff stick
  line(width/1.855, height/5.6, width/1.833, height/3.8);
  noStroke();
  fill(leafShade);
  ellipse(width/2.15, height/5.6, height/30); //staff orb
  ellipse(width/1.855, height/5.6, height/30);
  fill(leafColor)
  ellipse(width/2.15, height/5.6, height/80);
  ellipse(width/1.855, height/5.6, height/80);


  //draws fence lines
  for (let i=0; i<7; i++) { //for loop to add more fence lines
    push();
    translate(width/8*(i-1.03)/1.5, 0);
    drawLine();
    pop();
  }

  for (let i=0; i<7; i++) {
    push();
    translate(width/8*(i-1.03)/1.5, 0);
    translate(width/1.545, 0);
    drawLine();
    pop();
  }

  //draws fence
  fill(60);
  rect(width/-50, height/2.05, width/2.21, height/100);
  rect(width/1.75, height/2.05, width/2.21, height/100);

  let lightOn; //mapping light size
  if (cur_frac < 0.5) {
    lightOn = map(cur_frac, 0, 0.5, height/35, height/18);
  } else {
    lightOn = map(cur_frac, 0.5, 1, height/18, height/35);
  }

  //draw glowing staff orb
  fill(63, 107, 21, 100);
  ellipse(width/1.855, height/5.6, lightOn);
  fill(73, 135, 37, 240);
  stroke(63, 107, 21, 150);
  strokeWeight(height/100);
  ellipse(width/1.855, height/5.6, height/35);
  noStroke();

  fill(63, 107, 21, 100);
  ellipse(width/2.15, height/5.6, lightOn);
  fill(73, 135, 37, 240);
  stroke(63, 107, 21, 150);
  strokeWeight(height/100);
  ellipse(width/2.15, height/5.6, height/35);
  noStroke();

  //draws grass
  fill(grassColor);
  stroke(leafShade);
  strokeWeight(1);
  rect(0, height/1.8, width, height/2);
  noStroke();

  //draws perspective path
  fill(pathColor);
  stroke(pineappleShade);
  strokeWeight(1);
  beginShape();
    vertex(width/2.1, height/1.798);
    vertex(width/1.905, height/1.798);
    vertex(width/1.5, height);
    vertex(width/2.77, height);
  endShape(CLOSE);
  noStroke();

  //draws pillars
  fill(pillarColor);
  stroke(170);
  strokeWeight(2);
  rect(width/7.2, height/1.8, width/10, height/2); //left side pillars
  noStroke();
  rect(width/7.2, height/2.02, width/10, height/50);
  fill(pathColor); //flag on pillar
  stroke(pineappleColor);
  strokeWeight(width/120);
  rect(width/6.45, height/1.8, width/15, height/3.5);
  noStroke();
  fill(220);
  rect(width/7.9, height/1.97, width/8, height/12);

  fill(pillarColor);
  stroke(170);
  strokeWeight(2);
  rect(width/1.312, height/1.8, width/10, height/2); //right side pillars
  noStroke();
  rect(width/1.312, height/2.02, width/10, height/50);
  fill(pathColor);
  stroke(pineappleColor);
  strokeWeight(width/120);
  rect(width/1.284, height/1.8, width/15, height/3.5);
  noStroke();
  fill(220);
  rect(width/1.335, height/1.97, width/8, height/12);

  push();
  scale(0.8);
  translate(width/-3.725, height/1.3); //draws crown on flag
  drawCrown();
  pop();

  push();
  scale(0.8);
  translate(width/1.953, height/1.3);
  drawCrown();
  pop();

  //draws bushes in the corners
  fill(bushColor);
  ellipse(width/30, height/1.2, width/6); //left side bushes
  ellipse(width/10, height/1.1, width/5);
  ellipse(width/4.5, height/1, width/8);
  ellipse(width/30, height/1, width/8);
  ellipse(width, height/1.08, width/4); //right side bushes
  ellipse(width/1.15, height/1.07, width/7);
  ellipse(width/1.25, height, width/8);

  //maps for the pineapple
  let leftLeg;
  if(cur_frac < 0.5) {
    leftLeg = map(cur_frac, 0, 0.5, height/3, height/2.73);
  } else {
    leftLeg = map(cur_frac, 0.5, 1, height/2.73, height/3);
  }

  let rightLeg;
    if(cur_frac > 0.5) {
    rightLeg = map(cur_frac, 0, 0.5, height/3.1, height/2.89);
  } else {
    rightLeg = map(cur_frac, 0.5, 1, height/2.89, height/3.1);
  }

  let eyesClose;
    if (cur_frac > 0.85) {
      eyesClose = map(cur_frac, 0, 1, width/45, width/500);
    }

  let headShake;
    if (cur_frac > 0.5) {
      headShake = map(cur_frac, 0, 0.5, height/4.3, height/4.6);
    } else {
      headShake = map(cur_frac, 0.5, 1, height/4.6, height/4.3);
    }

  let eyeShake;
    if (cur_frac > 0.5) {
      eyeShake = map(cur_frac, 0, 0.5, height/2.9, height/3.1);
    } else {
      eyeShake = map(cur_frac, 0.5, 1, height/3.1, height/2.9);
    }

  let mouthShake;
    if (cur_frac > 0.5) {
      mouthShake = map(cur_frac, 0, 0.5, height/2.7, height/2.85);
    } else {
      mouthShake = map(cur_frac, 0.5, 1, height/2.85, height/2.7);
    }

  let longHand;
    if (cur_frac > 0.5) {
      longHand = map(cur_frac, 0, 0.5, height/2.8, height/3.1);
    } else {
      longHand = map(cur_frac, 0.5, 1, height/3.1, height/2.8);
    }

  let pineLines;
    if(cur_frac < 0.5) {
      pineLines = map(cur_frac, 0, 0.5, width/-250, width/200);
    } else {
      pineLines = map(cur_frac, 0.5, 1, width/200, width/-250);
    }

  let pineLeaf;
    if (cur_frac < 0.5) {
      pineLeaf = map(cur_frac, 0, 0.5, 0, 10);
    } else {
      pineLeaf = map(cur_frac, 0.5, 1, 10, 0);
    }

  //draws pineapples
  push();
  translate(0, pineLeaf) //moves leaves with head
  drawLeaf(); //calls draw leaf function
  pop();

  push();
  translate(width/1.613, pineLeaf) 
  drawLeaf(); 
  pop();

  fill(pineappleShade);
  rect(width/6.7, leftLeg, width/29, height/7.5, width/8); //draws legs on left
  rect(width/5.1, rightLeg, width/29, height/7.5, width/8);

  rect(width/1.298, leftLeg, width/29, height/7.5, width/8); //draws legs on right
  rect(width/1.224, rightLeg, width/29, height/7.5, width/8);

  push();
  stroke(pineappleShade)
  strokeWeight(width/35);
  line(width/9.2, longHand, width/7, height/3.05); //draws hands on left
  line(width/4.2, height/3.05, width/3.66, longHand);
  pop();

  push();
  stroke(pineappleShade)
  strokeWeight(width/35);
  line(width/1.38, longHand, width/1.3, height/3.05); //draws hands on right
  line(width/1.19, height/3.05, width/1.119, longHand);
  pop();

  fill(pineappleColor);
  rect(width/7.9, headShake, width/7.8, height/4.1, width/18); //draws head on left
  rect(width/1.34, headShake, width/7.8, height/4.1, width/18); //draws head on right

  push();
  translate(0, pineLines); //moves lines with head
  drawpineLines(); //calls draw pineapple line function
  pop();

  push();
  translate(width/1.615, pineLines); 
  drawpineLines(); 
  pop();

  fill(40);
  ellipse(width/1.268, eyeShake, width/45, eyesClose); //draws eyes on left
  ellipse(width/1.203, eyeShake, width/45, eyesClose);

  ellipse(width/5.9, eyeShake, width/45, eyesClose); //draws eyes on right
  ellipse(width/4.7, eyeShake, width/45, eyesClose);

  angleMode(RADIANS);
  arc(width/5.23, mouthShake, width/35, width/35, 0, PI, CHORD); //draws mouth on left
  arc(width/1.233, mouthShake, width/35, width/35, 0, PI, CHORD); //draws mouth on right

  // note: you can draw optional things depending on "debugView"
  if (debugView) {
  }
}

