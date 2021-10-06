const ease = new p5.Ease();

function plainBanana(x, y) {
  db = color(95, 76, 28); //Dark brown outline
  yb = color(249, 227, 98); //Yellow fill
  const lineWidth = 1; //stroke strokeWeight
  strokeWeight(lineWidth);

  stroke(db); //Banana outline
  fill(yb); //Drawing the banana shape
  beginShape();
  curveVertex(x, y);
  curveVertex(x - 15, y + 6);
  curveVertex(x - 18, y + 12);
  curveVertex(x - 5, y + 14);
  curveVertex(x + 10, y + 10);
  curveVertex(x + 23, y);
  curveVertex(x + 27, y - 10);
  curveVertex(x + 26, y - 20);
  curveVertex(x + 24, y - 27);
  curveVertex(x + 24, y - 30);
  curveVertex(x + 20, y - 30);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 12, y - 9);
  curveVertex(x, y);
  curveVertex(x - 15, y + 6);
  curveVertex(x - 18, y + 12);
  endShape();

  noFill(); //Detailed brown Stroke
  stroke(db);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 17, y + 10);
  quadraticVertex(x - 10, y + 10, x, y + 6);
  quadraticVertex(x + 10, y + 2, x + 17, y - 5, x + 15, y - 18);
  endShape();

  noFill(); //Detailed white stroke below the brown stroke
  stroke(255);
  strokeWeight(0.6);
  beginShape();
  vertex(x - 10, y + 10);
  quadraticVertex(x - 10, y + 10, x, y + 7);
  quadraticVertex(x + 10, y + 3, x + 17, y - 4, x + 15, y - 18);
  endShape();

  noFill(); //Small white stroke
  stroke(255);
  strokeWeight(0.7);
  beginShape();
  vertex(x + 20, y - 10);
  quadraticVertex(x + 22, y - 12, x + 23, y - 16);
  endShape();

  noFill(); //Detailed yellow stroke above the brown stroke. Making the brown outline thiner
  stroke(yb);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 10, y + 5);
  quadraticVertex(x - 10, y + 5, x, y + 0.3);
  quadraticVertex(x + 9, y - 4, x + 18, y - 14, x + 12, y - 11);
  endShape();

  stroke(yb); //Bottom yellow line used for making the brown outline thiner
  strokeWeight(1.9);
  beginShape();
  curveVertex(x - 2, y + 5);
  curveVertex(x - 3, y + 12);
  curveVertex(x + 10, y + 9);
  curveVertex(x + 21, y);
  curveVertex(x + 15, y - 2);
  endShape();

  fill(db); //Banana butt
  stroke(db);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 18, y + 9);
  quadraticVertex(x - 17, y + 10, x - 18, y + 12);
  endShape();
  //
  // strokeWeight(lineWidth); //Banana butt detail 1
  // fill(db);
  // beginShape();
  // curveVertex(x - 17, y + 8);
  // curveVertex(x - 17, y + 9);
  // curveVertex(x - 15, y + 12);
  // curveVertex(x - 14, y + 12);
  // curveVertex(x - 17, y + 12);
  // curveVertex(x - 19, y + 11);
  // endShape(CLOSE);

  stroke(db); //Banana tip
  strokeWeight(lineWidth);
  ellipse(x + 22, y - 30, 4, 2);
  stroke(yb); //Bottom yellow line used for shading

  strokeWeight(lineWidth); //Banana tip detail 1
  stroke(db);
  fill(db);
  beginShape();
  curveVertex(x + 20, y - 30);
  curveVertex(x + 23, y - 28);
  curveVertex(x + 24, y - 30);
  curveVertex(x + 22, y - 32);
  curveVertex(x + 20, y - 34);
  endShape(CLOSE);

  fill(db); //Banana tip detail 3
  beginShape();
  curveVertex(x + 20.9, y - 30);
  curveVertex(x + 23, y - 25);
  curveVertex(x + 21, y - 27);
  curveVertex(x + 21.3, y - 25);
  endShape(CLOSE);

  fill(db); //Brown banana detail 1
  beginShape();
  curveVertex(x + 22, y - 6);
  curveVertex(x + 23, y - 5);
  curveVertex(x + 22, y - 5);
  curveVertex(x + 24, y - 8);
  curveVertex(x + 21, y - 7);
  endShape(CLOSE);

  noStroke()
  fill(db); //Brown detail 3 on brown stroke
  beginShape();
  curveVertex(x, y + 6);
  curveVertex(x + 2, y + 4);
  curveVertex(x + 6, y + 4);
  curveVertex(x + 17, y - 6.4);
  curveVertex(x + 18, y - 5.5);
  curveVertex(x + 12, y);
  curveVertex(x + 6, y + 3);
  endShape(CLOSE);

  noStroke()
  fill(255); //White banana detail 4
  beginShape();
  curveVertex(x - 14, y + 10.4);
  curveVertex(x - 12, y + 12);
  curveVertex(x - 8, y + 12.5);
  curveVertex(x - 5, y + 11);
  curveVertex(x - 6, y + 10);
  curveVertex(x - 10, y + 9.8);
  endShape(CLOSE);

  noStroke()
  fill(db); //Brown banana detail 5
  beginShape();
  curveVertex(x - 15, y + 6);
  curveVertex(x - 15.3, y + 7);
  curveVertex(x - 14, y + 8);
  curveVertex(x - 12, y + 7);
  curveVertex(x - 10, y + 6);
  curveVertex(x - 7, y + 4.8);
  curveVertex(x - 7, y + 4);
  curveVertex(x - 12, y + 6);
  endShape(CLOSE);
}

function RipeBanana(x, y) {
  //In this function we draw the light brown banana
  db = color(95, 76, 28); //Dark brown
  yb = color(198, 178, 79); //Off yellow fill
  const lineWidth = 1; //stroke strokeWeight

  strokeWeight(lineWidth);
  stroke(db); //Banana outline
  fill(yb); //Drawing the banana shape
  beginShape();
  curveVertex(x, y);
  curveVertex(x - 15, y + 6);
  curveVertex(x - 18, y + 12);
  curveVertex(x - 5, y + 14);
  curveVertex(x + 10, y + 10);
  curveVertex(x + 23, y);
  curveVertex(x + 27, y - 10);
  curveVertex(x + 26, y - 20);
  curveVertex(x + 24, y - 27);
  curveVertex(x + 24, y - 30);
  curveVertex(x + 20, y - 30);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 12, y - 9);
  curveVertex(x, y);
  curveVertex(x - 15, y + 6);
  curveVertex(x - 18, y + 12);
  endShape();

  noFill(); //Detailed brown Stroke
  stroke(db);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 17, y + 10);
  quadraticVertex(x - 10, y + 10, x, y + 6);
  quadraticVertex(x + 10, y + 2, x + 17, y - 5, x + 15, y - 18);
  endShape();

  noFill(); //Detailed white stroke below the brown stroke
  stroke(255, 255, 255, 150);
  strokeWeight(0.6);
  beginShape();
  vertex(x - 10, y + 10);
  quadraticVertex(x - 10, y + 10, x, y + 7);
  quadraticVertex(x + 10, y + 3, x + 17, y - 4, x + 15, y - 18);
  endShape();

  noFill(); //Small white stroke
  stroke(255, 255, 255, 150);
  strokeWeight(0.7);
  beginShape();
  vertex(x + 20, y - 10);
  quadraticVertex(x + 22, y - 12, x + 23, y - 16);
  endShape();

  noFill(); //Detailed yellow stroke above the brown stroke. Making the brown outline thiner
  stroke(yb);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 10, y + 5);
  quadraticVertex(x - 10, y + 5, x, y + 0.3);
  quadraticVertex(x + 9, y - 4, x + 18, y - 14, x + 12, y - 11);
  endShape();

  stroke(yb); //Bottom yellow line used for making the brown outline thiner
  strokeWeight(1.9);
  beginShape();
  curveVertex(x - 2, y + 5);
  curveVertex(x - 3, y + 12);
  curveVertex(x + 10, y + 9);
  curveVertex(x + 21, y);
  curveVertex(x + 15, y - 2);
  endShape();

  fill(db); //Banana butt
  stroke(db);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 18, y + 9);
  quadraticVertex(x - 17, y + 10, x - 18, y + 12);
  endShape();

  strokeWeight(lineWidth); //Banana butt detail 1
  fill(db);
  beginShape();
  curveVertex(x - 17, y + 8);
  curveVertex(x - 17, y + 9);
  curveVertex(x - 15, y + 12);
  curveVertex(x - 14, y + 12);
  curveVertex(x - 17, y + 12);
  curveVertex(x - 19, y + 11);
  endShape(CLOSE);

  stroke(db); //Banana tip
  strokeWeight(lineWidth);
  ellipse(x + 22, y - 30, 4, 2);
  stroke(yb); //Bottom yellow line used for shading

  strokeWeight(lineWidth); //Banana tip detail 1
  stroke(db);
  fill(db);
  beginShape();
  curveVertex(x + 20, y - 30);
  curveVertex(x + 23, y - 28);
  curveVertex(x + 24, y - 30);
  curveVertex(x + 22, y - 32);
  curveVertex(x + 20, y - 34);
  endShape(CLOSE);

  fill(db); //Banana tip detail 2
  beginShape();
  curveVertex(x + 19, y - 19);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 22, y - 22);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 15, y - 20);
  endShape();

  fill(db); //Banana tip detail 3
  beginShape();
  curveVertex(x + 20.9, y - 30);
  curveVertex(x + 23, y - 25);
  curveVertex(x + 21, y - 27);
  curveVertex(x + 21.3, y - 25);
  endShape(CLOSE);

  fill(db); //Brown banana detail 1
  beginShape();
  curveVertex(x + 22, y - 6);
  curveVertex(x + 23, y - 5);
  curveVertex(x + 22, y - 5);
  curveVertex(x + 24, y - 8);
  curveVertex(x + 21, y - 7);
  endShape(CLOSE);

  noStroke()
  fill(db); //Brown detail 3 on brown stroke
  beginShape();
  curveVertex(x, y + 6);
  curveVertex(x + 2, y + 4);
  curveVertex(x + 6, y + 4);
  curveVertex(x + 17, y - 6.4);
  curveVertex(x + 18, y - 5.5);
  curveVertex(x + 12, y);
  curveVertex(x + 6, y + 3);
  endShape(CLOSE);

  noStroke()
  fill(255, 255, 255, 150); //White banana detail 4
  beginShape();
  curveVertex(x - 14, y + 10.4);
  curveVertex(x - 12, y + 12);
  curveVertex(x - 8, y + 12.5);
  curveVertex(x - 5, y + 11);
  curveVertex(x - 6, y + 10);
  curveVertex(x - 10, y + 9.8);
  endShape(CLOSE);

  noStroke()
  fill(db); //Brown banana detail 5
  beginShape();
  curveVertex(x - 15, y + 6);
  curveVertex(x - 15.3, y + 7);
  curveVertex(x - 14, y + 8);
  curveVertex(x - 12, y + 7);
  curveVertex(x - 10, y + 6);
  curveVertex(x - 7, y + 4.8);
  curveVertex(x - 7, y + 4);
  curveVertex(x - 12, y + 6);
  endShape(CLOSE);
}

function offsetAnimation(curFrac, offsetAMT) {
  //In this function we create the offset time for the different bananas
  let newFrac = curFrac;

  for (let i = 0; i <= offsetAMT; i += 0.01) {
    newFrac += 0.01;
    if (newFrac >= 1) {
      newFrac = 0;
    }
  }
  return newFrac;
}

function banana(x, y, curFrac) {
  //In this function we draw the banana that chnages colours
  //Basic varables
  colorMode(RGB);
  var strokeColor;
  var whiteShine = color(255, 255, 255, 70);
  const lineWidth = 1; //stroke strokeWeight

  //Variables for lerp colours
  let from = color(249, 227, 98); //Light brown
  let to = color(124, 92, 41); //Dark Brown
  let strokeFrom = color(81, 64, 24); //Light brown
  let strokeTo = color(95, 76, 28); //Dark Brown

  //Creating the lerp color for the banana peel
  if (curFrac < 0.1) {
    bananaColor = lerpColor(from, to, curFrac*2);
    strokeColor = lerpColor(strokeTo, strokeFrom, curFrac);
  } else {
    bananaColor = lerpColor(to, from, curFrac);
    strokeColor = lerpColor(strokeFrom, strokeTo, curFrac);
  }

  //Drawing the bananas
  strokeWeight(lineWidth);
  stroke(strokeColor); //Banana outline
  fill(bananaColor); //Drawing the banana shape
  beginShape();
  curveVertex(x, y);
  curveVertex(x - 15, y + 6);
  curveVertex(x - 18, y + 12);
  curveVertex(x - 5, y + 14);
  curveVertex(x + 10, y + 10);
  curveVertex(x + 23, y);
  curveVertex(x + 27, y - 10);
  curveVertex(x + 26, y - 20);
  curveVertex(x + 24, y - 27);
  curveVertex(x + 24, y - 30);
  curveVertex(x + 20, y - 30);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 12, y - 9);
  curveVertex(x, y);
  curveVertex(x - 15, y + 6);
  curveVertex(x - 18, y + 12);
  endShape();

  noFill(); //Detailed brown Stroke
  stroke(strokeColor);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 17, y + 10);
  quadraticVertex(x - 10, y + 10, x, y + 6);
  quadraticVertex(x + 10, y + 2, x + 17, y - 5, x + 15, y - 18);
  endShape();

  noFill(); //Detailed white stroke below the brown stroke
  stroke(whiteShine);
  strokeWeight(0.6);
  beginShape();
  vertex(x - 10, y + 10);
  quadraticVertex(x - 10, y + 10, x, y + 7);
  quadraticVertex(x + 10, y + 3, x + 17, y - 4, x + 15, y - 18);
  endShape();

  noFill(); //Small white stroke
  stroke(whiteShine);
  strokeWeight(0.7);
  beginShape();
  vertex(x + 20, y - 10);
  quadraticVertex(x + 22, y - 12, x + 23, y - 16);
  endShape();

  noFill(); //Detailed yellow stroke above the brown stroke. Making the brown outline thiner
  stroke(bananaColor);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 10, y + 5);
  quadraticVertex(x - 10, y + 5, x, y + 0.3);
  quadraticVertex(x + 9, y - 4, x + 18, y - 14, x + 12, y - 11);
  endShape();

  stroke(bananaColor); //Bottom yellow line used for making the brown outline thiner
  strokeWeight(1.9);
  beginShape();
  curveVertex(x - 2, y + 5);
  curveVertex(x - 3, y + 12);
  curveVertex(x + 10, y + 9);
  curveVertex(x + 21, y);
  curveVertex(x + 15, y - 2);
  endShape();

  fill(strokeColor); //Banana butt
  stroke(strokeColor);
  strokeWeight(lineWidth);
  beginShape();
  vertex(x - 18, y + 9);
  quadraticVertex(x - 17, y + 10, x - 18, y + 12);
  endShape();

  strokeWeight(lineWidth); //Banana butt detail 1
  fill(strokeColor);
  beginShape();
  curveVertex(x - 17, y + 8);
  curveVertex(x - 17, y + 9);
  curveVertex(x - 15, y + 12);
  curveVertex(x - 14, y + 12);
  curveVertex(x - 17, y + 12);
  curveVertex(x - 19, y + 11);
  endShape(CLOSE);

  stroke(strokeColor); //Banana tip
  strokeWeight(lineWidth);
  ellipse(x + 22, y - 30, 4, 2);
  stroke(bananaColor); //Bottom yellow line used for shading

  strokeWeight(lineWidth); //Banana tip detail 1
  stroke(strokeColor);
  fill(strokeColor);
  beginShape();
  curveVertex(x + 20, y - 30);
  curveVertex(x + 23, y - 28);
  curveVertex(x + 24, y - 30);
  curveVertex(x + 22, y - 32);
  curveVertex(x + 20, y - 34);
  endShape(CLOSE);

  fill(strokeColor); //Banana tip detail 2
  beginShape();
  curveVertex(x + 19, y - 19);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 22, y - 22);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 21, y - 25);
  curveVertex(x + 20, y - 20);
  curveVertex(x + 15, y - 20);
  endShape();

  fill(strokeColor); //Banana tip detail 3
  beginShape();
  curveVertex(x + 20.9, y - 30);
  curveVertex(x + 23, y - 25);
  curveVertex(x + 21, y - 27);
  curveVertex(x + 21.3, y - 25);
  endShape(CLOSE);

  fill(strokeColor); //Brown banana detail 1
  beginShape();
  curveVertex(x + 22, y - 6);
  curveVertex(x + 23, y - 5);
  curveVertex(x + 22, y - 5);
  curveVertex(x + 24, y - 8);
  curveVertex(x + 21, y - 7);
  endShape(CLOSE);

  fill(strokeColor); //Brown banana detail 2
  beginShape();
  curveVertex(x + 13, y + 4);
  curveVertex(x + 14, y + 3);
  curveVertex(x + 14, y + 4);
  curveVertex(x + 13, y + 4);
  endShape(CLOSE);

  noStroke()
  fill(strokeColor); //Brown detail 3 on brown stroke
  beginShape();
  curveVertex(x, y + 6);
  curveVertex(x + 2, y + 4);
  curveVertex(x + 6, y + 4);
  curveVertex(x + 17, y - 6.4);
  curveVertex(x + 18, y - 5.5);
  curveVertex(x + 12, y);
  curveVertex(x + 6, y + 3);
  endShape(CLOSE);

  noStroke()
  fill(whiteShine); //White banana detail 4
  beginShape();
  curveVertex(x - 14, y + 10.4);
  curveVertex(x - 12, y + 12);
  curveVertex(x - 8, y + 12.5);
  curveVertex(x - 5, y + 11);
  curveVertex(x - 6, y + 10);
  curveVertex(x - 10, y + 9.8);
  endShape(CLOSE);

  noStroke()
  fill(strokeColor); //Brown banana detail 5
  beginShape();
  curveVertex(x - 15, y + 6);
  curveVertex(x - 15.3, y + 7);
  curveVertex(x - 14, y + 8);
  curveVertex(x - 12, y + 7); //Play with this one
  curveVertex(x - 10, y + 6);
  curveVertex(x - 7, y + 4.8);
  curveVertex(x - 7, y + 4);
  curveVertex(x - 12, y + 6);
  endShape(CLOSE);
}

function bananaPeel(x, y, transparency, newFrac) {
  //In this function we draw the banana peel.
  var bananaColor1 = color(249, 227, 98, transparency); //Light brown outside
  var bananaColor2 = color(95, 76, 28, transparency); //Light fill
  var bananaColor3 = color(155, 120, 49, transparency); //Dark brown
  var bananaInside = color(248, 236, 166, transparency);
  const lineWidth2 = 0.3; //stroke strokeWeight

  strokeWeight(lineWidth2);
  stroke(bananaColor2);
  fill(bananaColor3);

  //Changing varaibles for the scaling of the banana peels
  var scaleStart = 0;
  var scalePreMid = 1.5;
  var scaleMid = 3;
  var scalePreEnd = 2;
  var scaleEnd = 0;
  let scalePeel;

  //Scaling according to the time
  if (newFrac <= 0.2) {
    scalePeel = map(newFrac, 0, 0.2, scaleStart, scaleMid);
  } else if (newFrac <= 0.8) {
    scalePeel = map(newFrac, 0.2, 0.8, scaleMid, scalePreEnd);
  } else {
    scalePeel = map(newFrac, 0.8, 1, scalePreEnd, scaleEnd);
  }

  scale(scalePeel);

  //Left side of banana peel
  beginShape();
  curveVertex(x - 3, y - 1);
  curveVertex(x - 3, y - 1);
  curveVertex(x - 5, y);
  curveVertex(x - 4, y + 2);
  curveVertex(x, y - 1);
  endShape(CLOSE);

  //Right side of banana peel
  beginShape();
  curveVertex(x + 2, y - 1);
  curveVertex(x + 2, y - 1);
  curveVertex(x + 3, y);
  curveVertex(x + 4, y + 2);
  curveVertex(x + 4, y + 3);
  curveVertex(x + 7, y + 2);
  curveVertex(x + 6, y);
  endShape(CLOSE);

  //Inside of the banana peel
  push();
  //Left side of the inside of banana peel
  fill(bananaInside);
  stroke(bananaColor2);
  strokeWeight(0.3);
  beginShape();
  curveVertex(x - 3, y - 1);
  curveVertex(x - 3, y - 1);
  curveVertex(x - 5, y);
  curveVertex(x - 4, y + 1);
  curveVertex(x, y - 1);
  endShape(CLOSE);

  //Right side of the inside of banana peel
  beginShape();
  curveVertex(x + 2, y - 1);
  curveVertex(x + 2, y - 1);
  curveVertex(x + 3, y);
  curveVertex(x + 4.5, y + 1);
  curveVertex(x + 5, y + 2.9);
  curveVertex(x + 7, y + 2);
  curveVertex(x + 6, y);
  endShape(CLOSE);

  //Middle the inside of banana peel
  beginShape();
  curveVertex(x, y - 1);
  curveVertex(x, y - 1);
  curveVertex(x - 2, y);
  curveVertex(x - 1, y + 2.5);
  curveVertex(x + 2, y + 2);
  curveVertex(x + 3, y);
  curveVertex(x + 2, y - 1);
  endShape(CLOSE);
  pop();
}

function bananaAnimation(newFrac, transparency) {
  //In the function we animate the banana peel we drew in function bananaPeel().
  //Declaring variables for the animation of the peel.
  fill(100, 120, 200);
  angleMode(DEGREES);

  //Adding easy ease
  const easeAmount = ease.doubleCircularOgee(newFrac, 0.5);

  //The start, mid and end points for the banana peel
  let startX = 25;
  let startY = -32;
  let midX = 6;
  let midY = 2;
  let endX = -22;
  let endY = 11;

  //Rotation variables
  rot1 = 0;
  rot2 = 15;
  rot3 = 45;

  //Changing varaibles of the peels
  let curX;
  let curY;
  let rotation;

  //Creating transparency variables for the banana peel
  var transpStart = 70;
  var transpMid = 255;
  var transpEnd = 150;
  var transparency;

  //Creating the animationn of the banana peel
  if (newFrac < 0.5) {
    curX = map(newFrac, 0, 0.5, startX, midX);
    curY = map(newFrac, 0, 0.5, startY, midY);
    rotation = map(easeAmount, 0, 0.5, rot1, rot2);
    transparency = map(easeAmount, 0, 0.5, transpStart, transpMid);
  } else {
    curX = map(newFrac, 0.5, 1, midX, endX);
    curY = map(newFrac, 0.5, 1, midY, endY);
    rotation = map(easeAmount, 0.5, 1, rot2, rot3);
    transparency = map(easeAmount, 0.5, 1, transpMid, transpEnd);
  }

  //Calling the bananaPeel function and translating it
  push();
  translate(curX, curY);
  rotate(rotation);
  bananaPeel(0, 0, transparency, newFrac);
  pop();
}

function bruwer_draw_one_frame(curFrac) {
  //In this function we draw everything accroding to the 1 second time frame
  noStroke();

  //Background
  fill(159, 215, 212);
  rect(0, 0, width, height);
  angleMode(DEGREES);

  //Size of the banana in the grid
  let bananaScale = height / 320;

  //Variables for the grid
  let numRows = 5;
  let numCols = 8;
  let cellWidth = width / (numCols + 1);
  let cellHeight = height / (numRows + 1);

  //Variables for the noise
  let smoothness = 5;
  let maxCycleOffset = 0.3;
  let scaledOffsety = cellHeight / bananaScale;
  let scaledOffsetx = cellWidth / bananaScale;
  let b1_y = 0.55 * height;
  let b2_y = 0.65 * height;
  let b1_size = height / 12;
  let b2_size = height / 6;

  //Vataibles for the difference in peeling times
  let offsetArray = [0, 0.5, 0.3, 0.9, 0.7, 0.6, 0.1, 0.4]
  let newFrac;

  //The grid of bananas
  for (let j = 0; j < numRows; j++) {
    let curY = (j + 1.1) * cellHeight;
    for (let i = 0; i < numCols; i++) {
      let curX = (i + 0.9) * cellWidth;

      //Noises
      let nudgeLeft = getNoiseValue(curX, curY, curFrac, "nudgeRight", 0, -2, smoothness);
      let nudgeDown = getNoiseValue(curX, curY, curFrac, "nudgeDown", 0, 2, smoothness);
      let cycle_offset = getNoiseValue(curX, curY, curFrac, "peelOffset", 0, maxCycleOffset, smoothness);
      let movement = getNoiseValue(curX, curY, curFrac, "Wiggles", -b1_size * 0.75, b1_size * 0.75, 100);

      //The if statement determines the grid layout of the 3 different bananas
      if ((i + j) % 3 == 0) {
        push();
        translate(curX, curY + movement / 9);
        scale(bananaScale);
        plainBanana(0, 0);
        pop();
      } else if ((i + j) % 3 == 1) {
        push();
        translate(curX + nudgeLeft, curY + nudgeDown);
        scale(bananaScale);
        RipeBanana(0, 0)
        pop();
      } else {
        push();
        translate(curX + nudgeLeft, curY + nudgeDown);
        scale(bananaScale);
        banana(0, 0, curFrac);

        // console.log(newFrac);

        newFrac = offsetAnimation(curFrac, offsetArray[i]);
        cycleFrac = (newFrac + cycle_offset) % 1.0;
        bananaAnimation(newFrac, cycleFrac);
        pop();
      }
    }
  }
}
