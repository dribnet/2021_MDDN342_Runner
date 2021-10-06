const ease_pal = new p5.Ease();

function palmer_draw_one_frame(cur_frac) {
  var addXSingle = width / 960;
  var addYSingle = height / 520;

  fill(255);
  rect(0, 0, width, height);

  //drawing the background gradient
  c1 = color(240, 254, 254); //very light blue
  c2 = color(154, 242, 245); //darker blue

  for (let yBG = 0; yBG < height + 1; yBG++) {
    n = map(yBG, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, yBG, width, yBG);
  }

  let cur_x = map(cur_frac, 0, 1, 0, width) //- half_width;


  //all of my colours to use when I call a leaf function!
  var longLeafFill1 = color(167, 212, 138);
  var longLeafFill2 = color(134, 181, 103);
  var longLeafStroke1 = color(108, 148, 99);
  var longLeafFill3 = color(92, 145, 84); //saturated dark green
  var longLeafStroke3 = color(92, 145, 84);
  var longLeafFill4 = color(49, 94, 89); //darkest green
  var longLeafStroke4 = color(49, 94, 89);
  var longLeafFill5 = color(83, 144, 111);
  var fatLeafFill = color(200, 231, 128);
  var darkBlueGreen = color(71, 125, 99);
  var teal = color(87, 141, 122);
  var slate_green = color(91, 151, 110);
  var dull_greren = color(109, 171, 94);
  var muted_green = color(102, 159, 90);
  var pale_olive_green = color(160, 213, 148);
  var pale_olive = color(173, 202, 151);
  var flower_fill = color(230, 251, 150);
  var medium_spring_bud = color(191, 225, 129);
  var oxley = color(105, 159, 132);
  var limed_spruce = color(57, 69, 83);
  var skinnyLongLeafCol = color(103, 142, 149);
  var secondFlowerLeaf = color(115, 166, 137);

  let randRoat = getNoiseValue(0, 0, cur_frac, "randRoat", -.3, .3, .1); //random jitter on the long leaf using noise

  push(); //fat leaf right at the back on the right
  translate(width / 1.23, height / 1);
  drawFatLeaf(70, 0.6, -1, darkBlueGreen);
  pop();

  push(); //fat leaf right at the back on the left
  translate(width * .16, height * 1.07);
  drawFatLeaf(-43, .8, -1, darkBlueGreen);
  pop();

  //leaves on the right behind the flowers
  push();
  translate(width / 1.4, height * 1.04);
  drawLongLeaf(0, 0, 1.2, 20, longLeafFill4, longLeafStroke4);
  pop();
  push();
  translate(width / 1.28, height * 1.1);
  drawLongLeaf(0, 0, 1.05, 23, longLeafFill3, longLeafStroke3);
  pop();
  push();
  translate(width / 1.45, height * 1.02);
  drawLongLeaf(0, 0, 1.05, 0, longLeafFill5, longLeafFill5);
  pop();


  //setting up the flowers to move back and forth
  let going_right = true;
  let amount_across = 0;
  if (cur_frac < 0.5) {
    going_right = true;
    amount_across = cur_frac * 2;
  } else {
    going_right = false;
    amount_across = (cur_frac - 0.5) * 2;
  }

  const ease_amount_across = ease_pal.doubleQuadraticSigmoid(amount_across);
  const ease_amount_across_fatLeaf = ease_pal.circularFillet(amount_across);
  const ease_amount_acrosslongLeaf = ease_pal.normalizedLogitSigmoid(amount_across);
  if (going_right) {

    flowerSway = map(ease_amount_across, 0, 0.5, addXSingle * 0, addXSingle * 2)
    flower2Sway = map(ease_amount_across, 0, 0.5, addXSingle * 0, addXSingle * .9)
    fLSway = map(ease_amount_across_fatLeaf, 0, 0.5, addXSingle * 0, addXSingle * 0.3)
    longLeafSway = map(ease_amount_acrosslongLeaf, 0, 0.5, addXSingle * 0, addXSingle * 0.2)
  } else {
    flowerSway = map(ease_amount_across, 0.5, 1, addXSingle * 2, addXSingle * 0)
    flower2Sway = map(ease_amount_across, 0.5, 1, addXSingle * .9, addXSingle * 0)
    fLSway = map(ease_amount_across_fatLeaf, 0.5, 1, addXSingle * 0.3, addXSingle * 0)
    longLeafSway = map(ease_amount_acrosslongLeaf, 0.5, 1, addXSingle * 0.2, addXSingle * 0)
  }
  //drawing long leaf with the jitter
  push();
  translate(width / 1.6, height / 1.02);
  rotate(0);
  drawLongLeaf(0, 0, 1.2, (randRoat / 3) + longLeafSway, longLeafFill1, longLeafStroke1);
  pop();


  //setting up the flowers
  var flower1StartX = width / 1.2 + flowerSway; //flower sway makes the flower bud AND the stalk move
  var flower1StartY = height / 4.9;

  var flower2StartX = width *.92 + flower2Sway;
  var flower2StartY = height *.33974;

  strokeWeight(width / 960 * 2);
  stroke(93, 107, 54);
  noFill();
  beginShape(); //flower 1 stalk
  curveVertex(flower1StartX, flower1StartY);
  curveVertex(flower1StartX, flower1StartY);
  curveVertex(width / 1.2, height *.6);
  curveVertex(width / 1.3, height*.89);
  curveVertex(width / 1.3, height*.89);
  endShape();

  //draw the actual flower (biggest one)
  push();
  translate(flower1StartX, flower1StartY);
  rotate(-25);
  scale(1.4);
  drawFlower(0, 0, flower_fill); //bigger top flower
  pop();

  //drawing leaves on the biggest flowerr
  push();
  translate(width / 1.196 + (flowerSway / 2), height / 2.3); //top down
  drawSkinnyLongLeaf(-40, .9, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.194 + (flowerSway / 2.2), height / 2.15);
  drawSkinnyLongLeaf(35, 1, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.196 + (flowerSway / 2.6), height / 2.05);
  drawSkinnyLongLeaf(-60, 1.1, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.194 + (flowerSway / 2.8), height / 1.9);
  drawSkinnyLongLeaf(55, 1.08, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.196 + (flowerSway / 2.9), height / 1.7);
  drawSkinnyLongLeaf(-57, 1.25, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.194 + (flowerSway / 2.8), height / 1.65);
  drawSkinnyLongLeaf(59, 1.25, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.215, height / 1.55);
  drawSkinnyLongLeaf(-50, 1.3, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.223, height / 1.4);
  drawSkinnyLongLeaf(-69, 1.5, skinnyLongLeafCol);
  pop();

  push();
  translate(width / 1.27, height / 1.21);
  drawSkinnyLongLeaf(-62, 1.5, skinnyLongLeafCol);
  pop();



  push(); ////////leaves in the middle of the screen///////
  translate(width * .49, height * 1.19);
  drawShortWavyLeaf(longLeafFill3, longLeafFill3, 13, 3);
  pop();

  push();
  translate(width * .604, height * 1.047);
  drawShortWavyLeaf(teal, oxley, -17, 2.7);
  pop();

  push();
  translate(width * .2, height * 1.1);
  drawShortWavyLeaf(longLeafFill2, longLeafFill2, -20, 3);
  pop();

  //second flower stalk
  strokeWeight(width / 960 * 2);
  stroke(93, 107, 54);
  noFill();
  beginShape(); //flower 2 stalk
  curveVertex(flower2StartX, flower2StartY);
  curveVertex(flower2StartX, flower2StartY);
  curveVertex(width *.896, height *.52);
  curveVertex(width / 1.3, height *.89);
  curveVertex(width / 1.3, height *.89);
  endShape();
  //second flower
  push();
  translate(flower2StartX, flower2StartY);
  rotate(25);
  scale(1);
  drawFlower(0, 0, flower_fill); //lower smaller flower
  pop();

  //ssecond flower leaves

  push();
  translate(width*.908 + (flower2Sway / 4), height / 2.18);
  drawSkinnyLongLeaf(-28, .84, secondFlowerLeaf);
  pop();

  push();
  translate(width *.906 + (flower2Sway / 2.8), height / 2.1);
  drawSkinnyLongLeaf(48, .87, secondFlowerLeaf);
  pop();

  push();
  translate(width / 1.13, height / 1.84);
  drawSkinnyLongLeaf(-21, 1, secondFlowerLeaf);
  pop();

  push();
  translate(width / 1.15, height / 1.69);
  drawSkinnyLongLeaf(70, 1.07, secondFlowerLeaf);
  pop();

  push();
  translate(width / 1.17, height / 1.55);
  drawSkinnyLongLeaf(-33, 1.2, secondFlowerLeaf);
  pop();

  push();
  translate(width / 1.2, height / 1.4);
  drawSkinnyLongLeaf(63, 1.3, secondFlowerLeaf);
  pop();

  //draw the two fat leaves in front of the flowers on the RIGHT
  push();
  translate(width / 1.29, height * 1.03);
  drawFatLeaf(45 + fLSway, 0.9, 1, fatLeafFill);
  pop();

  push();
  translate(width / 1.43, height * 1.1);
  drawFatLeaf(-15 + (fLSway * 4), 0.9, -1, fatLeafFill);
  pop();


  const ease_amount_across_fatLeaf2 = ease_pal.circularArcThroughAPoint(amount_across);
  const ease_amount_up_down = ease_pal.doubleQuadraticSigmoid(amount_across);
  if (going_right) {
    flowerSway3 = map(ease_amount_across, 0, 0.5, addXSingle * .5, addXSingle * 0);
    fatLeaf2Sway = map(ease_amount_across_fatLeaf2, 0, 0.5, addXSingle * 0.6, addXSingle * 0);
    branchupdown = map(ease_amount_up_down, 0, 0.5, addXSingle * 0.6, addXSingle * 0)
  } else {
    flowerSway3 = map(ease_amount_across, 0, 0.5, addXSingle * 0, addXSingle * .5);
    fatLeaf2Sway = map(ease_amount_across_fatLeaf2, 0, 0.5, addXSingle * 0, addXSingle * 0.6);
    branchupdown = map(ease_amount_up_down, 0.5, 1, addXSingle * 0, addXSingle * 0.6);
  }


  /////////behind shrt wavy leaves
  push();
  translate(width * .43, height * 1.04);
  drawLongLeaf(0, 0, 1.18, -23, limed_spruce, limed_spruce);
  pop();

  push();
  translate(width * .42, height * 1.03);
  drawLongLeaf(0, 0, 1.1, 1, longLeafFill4, longLeafStroke4);
  pop();

  push();
  translate(width * .30, height * 1.03);
  drawLongLeaf(0, 0, 1.2, -30 + longLeafSway / 2, longLeafFill4, longLeafStroke4);
  pop();

  push();
  translate(width * .37, height);
  drawLongLeaf(0, 0, 1, -30, longLeafFill2, longLeafStroke1);
  pop();


  //fly on the left
  let flyScale = 0.55;
  let flyX;
  //setting it up off-beat, so it grows starting at 0.3 cur frac and loops back to then (instead of 0-1)
  if (cur_frac >= 0.3) {
    flyScale = map(cur_frac, 0.3, 0.5, 0, 0.55);
  }
  if (cur_frac >= 0.5) {
    flyScale = map(cur_frac, 0.5, 1, 0.55, 0.55);
  }
  if (cur_frac <= 0.3) {
    flyScale = map(cur_frac, 0, 0.3, 0.55, 0);
  }

  if (cur_frac <= 0.3) { //this is for the flies movement
    flyX = map(cur_frac, 0, 0.3, addXSingle * 200, addXSingle * 250)
  } else if (cur_frac >= 0.3) {
    flyX = map(cur_frac, 0.3, 1, addXSingle * 100, addXSingle * 200)
  }
  push(); //draw the actual fly
  translate(width / 1.9 + flyX, height / 1.5); //centre of the screen
  drawFly(0, 0, cur_frac, flyScale,1);
  pop();


  //////////short wavy leaves stalk////////////
  stroke(52, 93, 88);
  strokeWeight(addXSingle * 3);
  noFill();
  var endOfBranchX = width * .12;
  var endOfBranchY = height / 3.9;
  var strokeColWavy1 = color(42, 86, 79);
  //main branch (going left)
  beginShape();
  curveVertex(width / 3, height / 1.7);
  curveVertex(width / 3, height / 1.7);
  curveVertex(width / 3.8, height / 4.4);
  curveVertex(endOfBranchX, endOfBranchY + branchupdown);
  curveVertex(endOfBranchX, endOfBranchY + branchupdown);
  endShape();

  //second branch going right
  beginShape();
  curveVertex(width * .31, height * .419);
  curveVertex(width * .31, height * .419);
  curveVertex(width * .34, height * .16);
  curveVertex(width * .41, height * .1);
  curveVertex(width * .41, height * .1);
  endShape();


  ////first brranch leaves
  push();
  translate(endOfBranchX, endOfBranchY + branchupdown);
  drawShortWavyLeaf(teal, strokeColWavy1, -80 - (branchupdown / 1.5), 1);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 6, endOfBranchY + addYSingle * -1 + branchupdown);
  drawShortWavyLeaf(slate_green, slate_green, -120 + (branchupdown / 1.3), .8);
  pop();


  push();
  translate(endOfBranchX + addXSingle * 20, endOfBranchY + addYSingle * -3 + (branchupdown / 1.2));
  drawShortWavyLeaf(teal, strokeColWavy1, -170, .8);
  pop();

  push(); //////behind  the other leaves
  translate(endOfBranchX + addXSingle * 167, endOfBranchY + addYSingle * 40);
  drawShortWavyLeaf(slate_green, slate_green, -80, 0.93);
  pop();

  push(); //////behind the other leaves on other branch
  translate(endOfBranchX + addXSingle * 157, endOfBranchY + addYSingle * 10);
  drawShortWavyLeaf(slate_green, slate_green, 19, 0.8);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 100, endOfBranchY + addYSingle * -25 + (branchupdown / 1.9));
  drawShortWavyLeaf(teal, strokeColWavy1, -20 - (branchupdown / 2), .75);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 48, endOfBranchY + addYSingle * -20 + (branchupdown / 1.5));
  drawShortWavyLeaf(teal, strokeColWavy1, -50 + (branchupdown / 1.8), .82);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 68, endOfBranchY + addYSingle * -20 + (branchupdown / 1.6));
  drawShortWavyLeaf(teal, strokeColWavy1, -200 + (branchupdown / 2), .93);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 118, endOfBranchY + addYSingle * -25);
  drawShortWavyLeaf(teal, strokeColWavy1, -180, .8);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 180, endOfBranchY + addYSingle * 90);
  drawShortWavyLeaf(teal, strokeColWavy1, -100, .94);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 190, endOfBranchY + addYSingle * 120);
  drawShortWavyLeaf(teal, strokeColWavy1, 40, 1.06);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 196, endOfBranchY + addYSingle * 150);
  drawShortWavyLeaf(teal, strokeColWavy1, -87, 1.1);
  pop();

  ///////////second branch (going right)
  push();
  translate(endOfBranchX + addXSingle * 187, endOfBranchY + addYSingle * 80);
  drawShortWavyLeaf(teal, strokeColWavy1, 60, .9);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 191, endOfBranchY + addYSingle * 40);
  drawShortWavyLeaf(teal, strokeColWavy1, 50, 1);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 201, endOfBranchY + addYSingle * -20);
  drawShortWavyLeaf(teal, strokeColWavy1, 70, .8);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 191, endOfBranchY + addYSingle * 20);
  drawShortWavyLeaf(teal, strokeColWavy1, -35, .86);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 207, endOfBranchY + addYSingle * -45);
  drawShortWavyLeaf(teal, strokeColWavy1, -45, .8);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 230, endOfBranchY + addYSingle * -71);
  drawShortWavyLeaf(teal, strokeColWavy1, -25, .70);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 260, endOfBranchY + addYSingle * -81);
  drawShortWavyLeaf(teal, strokeColWavy1, 5, .55);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 280, endOfBranchY + addYSingle * -84);
  drawShortWavyLeaf(teal, strokeColWavy1, 28, .5);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 280, endOfBranchY + addYSingle * -84);
  drawShortWavyLeaf(teal, strokeColWavy1, 80, .5);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 271, endOfBranchY + addYSingle * -80);
  drawShortWavyLeaf(teal, strokeColWavy1, -250, .5);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 271, endOfBranchY + addYSingle * -80);
  drawShortWavyLeaf(teal, strokeColWavy1, -250, .5);
  pop();

  push();
  translate(endOfBranchX + addXSingle * 238, endOfBranchY + addYSingle * -73);
  drawShortWavyLeaf(teal, strokeColWavy1, -250, .59);
  pop();


  //fly 1 (LEFT faster fly)///
  //this fly is moving 0-1
  flyScale = 0.6;
  if (cur_frac <= 0.3) {
    flyScale = map(cur_frac, 0, 0.3, 0, 0.6);
  } else if (cur_frac >= 0.7) {
    flyScale = map(cur_frac, 0.7, 1, 0.6, 0);
  }

  flyX = map(cur_frac, 0, 1, addXSingle * 300, addXSingle * 0)
  push();
  translate(width / 5 + flyX, height / 3.4);
  drawFly(0, 0, cur_frac, flyScale,-1);
  pop();


  //////in front of branches on the left

  push();
  translate(width * .45, height * 1.1);
  drawLongLeaf(0, 0, 1, -24, dull_greren, muted_green);
  pop();

  //short leaves  in front on the LEFT  //////////////////////////
  push();
  translate(width * .41, height * 1.1);
  drawFatLeaf(-20 + (fatLeaf2Sway / -10), 1, -1, pale_olive);
  pop();

  push();
  translate(width * .43, height * 1.1);
  drawFatLeaf(10 + (fatLeaf2Sway / 1.2), 0.9, 1, fatLeafFill);
  pop();

  push();
  translate(width * .37, height * 1.1);
  drawFatLeaf(-56 + (fatLeaf2Sway / 1.8), 0.9, -1, fatLeafFill);
  pop();


  ////////bottom left flowers
  let backFloStartX = width * .19 + (flowerSway3 / 2.6);
  let backFloStartY = height * .75;

  //stalk 4 back flower
  strokeWeight(addXSingle * 1.5);
  stroke(longLeafFill3);
  noFill();
  beginShape();
  curveVertex(backFloStartX - addXSingle * 16, backFloStartY);
  curveVertex(backFloStartX - addXSingle * 16, backFloStartY);
  curveVertex(width * .15, height * .88);
  curveVertex(width * .16, height);
  curveVertex(width * .16, height);
  endShape();


  push();
  translate(backFloStartX, backFloStartY);
  rotate(30);
  scale(1.3);
  drawFlower(0, 0, medium_spring_bud);
  pop();

  let bigFloStartX = width * .1 + flower2Sway;
  let bigFloStartY = height * .8;
  beginShape();
  curveVertex(bigFloStartX, bigFloStartY);
  curveVertex(bigFloStartX, bigFloStartY);
  curveVertex(width * .135, height * .91);
  curveVertex(width * .15, height);
  curveVertex(width * .15, height);
  endShape();


  push();
  translate(bigFloStartX, height * .8);
  rotate(-40);
  scale(1.3);
  drawFlower(0, 0, flower_fill);
  pop();


  var smolFloX = width * .2 + flowerSway / 4;
  var smolFloY = height * .85;

  beginShape();
  curveVertex(smolFloX, smolFloY);
  curveVertex(smolFloX, smolFloY);
  curveVertex(width * .17, height * .95);
  curveVertex(width * .172, height);
  curveVertex(width * .172, height);
  endShape();

  push();
  translate(smolFloX, smolFloY);
  rotate(10);
  scale(1);
  drawFlower(0, 0, flower_fill);
  pop();


}

function drawShortWavyLeaf(fillCol, strokeColWavy, shortWavyRot, shortWavyScale) {
  //drawn on the upper left
  var addXSingle = width / 960;
  var addYSingle = height / 540;
  var shortWavyLeafX = 0;
  var shortWavyLeafY = 0;
  //
  fill(fillCol);
  push();
  scale(shortWavyScale);
  rotate(shortWavyRot);
  noStroke();

  beginShape();
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  curveVertex(shortWavyLeafX + addXSingle * -9, shortWavyLeafY + addYSingle * -10);
  curveVertex(shortWavyLeafX + addXSingle * -11, shortWavyLeafY + addYSingle * -18);
  curveVertex(shortWavyLeafX + addXSingle * -8, shortWavyLeafY + addYSingle * -28);
  curveVertex(shortWavyLeafX + addXSingle * -10, shortWavyLeafY + addYSingle * -40);
  curveVertex(shortWavyLeafX + addXSingle * -12, shortWavyLeafY + addYSingle * -47);
  curveVertex(shortWavyLeafX + addXSingle * -13, shortWavyLeafY + addYSingle * -55);
  curveVertex(shortWavyLeafX + addXSingle * -11.5, shortWavyLeafY + addYSingle * -60);
  curveVertex(shortWavyLeafX + addXSingle * -8, shortWavyLeafY + addYSingle * -65);
  curveVertex(shortWavyLeafX + addXSingle * -9.5, shortWavyLeafY + addYSingle * -73);
  curveVertex(shortWavyLeafX + addXSingle * -10, shortWavyLeafY + addYSingle * -80);
  curveVertex(shortWavyLeafX + addXSingle * -8, shortWavyLeafY + addYSingle * -83);
  curveVertex(shortWavyLeafX + addXSingle * -3, shortWavyLeafY + addYSingle * -88);
  curveVertex(shortWavyLeafX, shortWavyLeafY + addYSingle * -95);
  curveVertex(shortWavyLeafX + addXSingle * 2, shortWavyLeafY + addYSingle * -100);
  curveVertex(shortWavyLeafX + addXSingle * 5, shortWavyLeafY + addYSingle * -92);
  curveVertex(shortWavyLeafX + addXSingle * 10, shortWavyLeafY + addYSingle * -86);
  curveVertex(shortWavyLeafX + addXSingle * 16, shortWavyLeafY + addYSingle * -80);
  curveVertex(shortWavyLeafX + addXSingle * 17.5, shortWavyLeafY + addYSingle * -73);
  curveVertex(shortWavyLeafX + addXSingle * 16.5, shortWavyLeafY + addYSingle * -67);
  curveVertex(shortWavyLeafX + addXSingle * 15, shortWavyLeafY + addYSingle * -59);
  curveVertex(shortWavyLeafX + addXSingle * 18, shortWavyLeafY + addYSingle * -48);
  curveVertex(shortWavyLeafX + addXSingle * 16, shortWavyLeafY + addYSingle * -40);
  curveVertex(shortWavyLeafX + addXSingle * 13, shortWavyLeafY + addYSingle * -33);
  curveVertex(shortWavyLeafX + addXSingle * 15, shortWavyLeafY + addYSingle * -20);
  curveVertex(shortWavyLeafX + addXSingle * 13, shortWavyLeafY + addYSingle * -13);
  curveVertex(shortWavyLeafX + addXSingle * 5.5, shortWavyLeafY + addYSingle * -6);
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  endShape();

  fill(strokeColWavy);
  stroke(strokeColWavy);
  strokeWeight(addXSingle);

  beginShape();
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  curveVertex(shortWavyLeafX + addXSingle * -2, shortWavyLeafY + addYSingle * -17);
  curveVertex(shortWavyLeafX + addXSingle * 0, shortWavyLeafY + addYSingle * -28);
  curveVertex(shortWavyLeafX + addXSingle * -1.3, shortWavyLeafY + addYSingle * -39);
  curveVertex(shortWavyLeafX + addXSingle * .4, shortWavyLeafY + addYSingle * -50);
  curveVertex(shortWavyLeafX + addXSingle * -.7, shortWavyLeafY + addYSingle * -60);
  curveVertex(shortWavyLeafX + addXSingle * 1.7, shortWavyLeafY + addYSingle * -68);
  curveVertex(shortWavyLeafX + addXSingle * 1, shortWavyLeafY + addYSingle * -80);
  curveVertex(shortWavyLeafX + addXSingle * 1.6, shortWavyLeafY + addYSingle * -87);

  curveVertex(shortWavyLeafX + addXSingle * 3, shortWavyLeafY + addYSingle * -80);
  curveVertex(shortWavyLeafX + addXSingle * 4.5, shortWavyLeafY + addYSingle * -68);
  curveVertex(shortWavyLeafX + addXSingle * 3.5, shortWavyLeafY + addYSingle * -60);
  curveVertex(shortWavyLeafX + addXSingle * 5, shortWavyLeafY + addYSingle * -50);
  curveVertex(shortWavyLeafX + addXSingle * 2.3, shortWavyLeafY + addYSingle * -39);
  curveVertex(shortWavyLeafX + addXSingle * 3.5, shortWavyLeafY + addYSingle * -28);
  curveVertex(shortWavyLeafX + addXSingle * 1, shortWavyLeafY + addYSingle * -17);
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  curveVertex(shortWavyLeafX, shortWavyLeafY);
  endShape();
  pop();
}


function drawFatLeaf(fatLeafRot, fatLeafYScal, negative, fatLeafFill) {
  //drawn at the front of the screen normally, bright
  push();
  var addXSingle = width / 960 * negative;
  var addYSingle = height / 540;
  var fatLeafX = 0;
  var fatLeafY = 0;

  fill(fatLeafFill);
  noStroke();
  rotate(fatLeafRot);
  scale(fatLeafYScal)

  beginShape();
  curveVertex(fatLeafY, fatLeafY);
  curveVertex(fatLeafY, fatLeafY);
  curveVertex(fatLeafX + addXSingle * -70, fatLeafY + addYSingle * -50);
  curveVertex(fatLeafX + addXSingle * -80, fatLeafY + addYSingle * -90);
  curveVertex(fatLeafX + addXSingle * -70, fatLeafY + addYSingle * -120);
  curveVertex(fatLeafX + addXSingle * -60, fatLeafY + addYSingle * -140);
  curveVertex(fatLeafX + addXSingle * -50, fatLeafY + addYSingle * -170);
  curveVertex(fatLeafX + addXSingle * -57, fatLeafY + addYSingle * -200);
  curveVertex(fatLeafX + addXSingle * -45, fatLeafY + addYSingle * -230);
  curveVertex(fatLeafX + addXSingle * -4, fatLeafY + addYSingle * -260);
  curveVertex(fatLeafX, fatLeafY + addYSingle * -262);

  curveVertex(fatLeafX + addXSingle * 4, fatLeafY + addYSingle * -260);
  curveVertex(fatLeafX + addXSingle * 45, fatLeafY + addYSingle * -230);
  curveVertex(fatLeafX + addXSingle * 54, fatLeafY + addYSingle * -210);
  curveVertex(fatLeafX + addXSingle * 45, fatLeafY + addYSingle * -190);
  curveVertex(fatLeafX + addXSingle * 50, fatLeafY + addYSingle * -170);
  curveVertex(fatLeafX + addXSingle * 65, fatLeafY + addYSingle * -150);
  curveVertex(fatLeafX + addXSingle * 70, fatLeafY + addYSingle * -135);
  curveVertex(fatLeafX + addXSingle * 60, fatLeafY + addYSingle * -105);
  curveVertex(fatLeafX + addXSingle * 70, fatLeafY + addYSingle * -85);
  curveVertex(fatLeafX + addXSingle * 78, fatLeafY + addYSingle * -65);
  curveVertex(fatLeafX + addXSingle * 65, fatLeafY + addYSingle * -40);
  curveVertex(fatLeafX, fatLeafY);
  curveVertex(fatLeafX, fatLeafY);
  endShape();
  stroke(118, 154, 87);
  strokeWeight(height / 520 * 3);
  noFill();
  beginShape();
  curveVertex(fatLeafX, fatLeafY);
  curveVertex(fatLeafX, fatLeafY);
  curveVertex(fatLeafX + addXSingle * -1, fatLeafY + addYSingle * -35);
  curveVertex(fatLeafX + addXSingle * 4, fatLeafY + addYSingle * -75);
  curveVertex(fatLeafX + addXSingle * -5, fatLeafY + addYSingle * -115);
  curveVertex(fatLeafX + addXSingle * 3, fatLeafY + addYSingle * -150);
  curveVertex(fatLeafX + addXSingle * -4, fatLeafY + addYSingle * -175);
  curveVertex(fatLeafX + addXSingle * 3, fatLeafY + addYSingle * -195);
  curveVertex(fatLeafX + addXSingle * -2, fatLeafY + addYSingle * -210);
  curveVertex(fatLeafX + addXSingle * 1, fatLeafY + addYSingle * -225);
  //curveVertex(fatLeafX+addXSingle*1,fatLeafY+addYSingle*-225);
  curveVertex(fatLeafX + addXSingle * -1, fatLeafY + addYSingle * -240);
  curveVertex(fatLeafX + addXSingle, fatLeafY + addYSingle * -250);
  curveVertex(fatLeafX + addXSingle, fatLeafY + addYSingle * -250);
  endShape();
  pop();
}

function drawSkinnyLongLeaf(skinnyLongLeafRot, skinnyLongLeafScale, skinnyLongLeafCol) {
  //leaves on the rose branches
  var addXSingle = width / 960;
  var addYSingle = height / 540;
  var skinnyLongLeafX = 0;
  var skinnyLongLeafY = 0;


  push();
  rotate(skinnyLongLeafRot);
  scale(skinnyLongLeafScale);
  fill(skinnyLongLeafCol);
  noStroke();

  beginShape();
  curveVertex(skinnyLongLeafX, skinnyLongLeafY);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY);
  curveVertex(skinnyLongLeafX - addXSingle * 7, skinnyLongLeafY - addYSingle * 51);
  curveVertex(skinnyLongLeafX - addXSingle * 1, skinnyLongLeafY - addYSingle * 100);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY - addYSingle * 105);
  curveVertex(skinnyLongLeafX + addXSingle * 1, skinnyLongLeafY - addYSingle * 100);
  curveVertex(skinnyLongLeafX + addXSingle * 8, skinnyLongLeafY - addYSingle * 49);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY);
  endShape();

  stroke(45, 78, 109);
  noFill();
  strokeWeight(addXSingle * .7);

  beginShape();
  curveVertex(skinnyLongLeafX, skinnyLongLeafY - addYSingle * 21);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY - addYSingle * 21);
  curveVertex(skinnyLongLeafX + addXSingle * 1, skinnyLongLeafY - addYSingle * 49);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY - addYSingle * 80);
  curveVertex(skinnyLongLeafX, skinnyLongLeafY - addYSingle * 80);
  endShape();

  pop();
}


function drawFly(flyX, flyY, cur_frac, flyScale,negative) {
  let wingMove; //set up animated wing variable
  var addXSingle = width / 960 * negative;
  var addYSingle = height / 540;
  var flyBodyCol = color(74, 77, 76);
  var flyWingCol = color(166, 237, 234, 180);


  //setting it up so the flies wings can flap more tha once a second
  var wingFlapNum = 360 * 5 //how many times the wing flaps per second , multiples of 360
  var flapAmmount = round(sin(map(cur_frac, 0, 1, 1, wingFlapNum)));
  var flapAmmountSmooth = sin(map(cur_frac, 0, 1, 1, wingFlapNum));
  if (flapAmmount == 0) {
    wingMove = map(flapAmmountSmooth, 0, -1, 0, 10);
  } else if (flapAmmount == -1) {
    wingMove = map(flapAmmountSmooth, -1, 0, 10, 0);
  }
  noStroke();
  fill(flyBodyCol);

  scale(flyScale);
  ellipse(flyX + addXSingle * 15, flyY, addXSingle * 17, addYSingle * 17); //head
  ellipse(flyX, flyY, addXSingle * 30, addYSingle * 22); //body
  rect(flyX + addXSingle * 21, flyY + addYSingle * 1, addXSingle * 8, -addYSingle * 4); //snout
  ellipse(flyX + addXSingle * 30, flyY - addYSingle * 1, addXSingle * 4, addYSingle * 7) //end of snout
  //wings!
  fill(flyWingCol);
  push();
  rotate(35*negative + wingMove);
  ellipse(flyX - addXSingle * 6, flyY - addYSingle * 1, addXSingle * 20, addYSingle * 10);
  rotate(40*negative + wingMove);
  ellipse(flyX - addXSingle * 11, flyY - addYSingle * 3, addXSingle * 30, addYSingle * 15);
  pop();

}

function drawFlower(flowerBaseX, flowerBaseY, flowerFill) {
  noStroke();
  var addXSingle = width / 960; //1
  var addYSingle = height / 540;

  fill(flowerFill);
  arc(flowerBaseX, flowerBaseY, addXSingle * 80, addYSingle * 70, 0, 180);

  stroke(144, 179, 118);
  strokeWeight(addXSingle);

  beginShape();
  curveVertex(flowerBaseX - addXSingle * 35, flowerBaseY);
  curveVertex(flowerBaseX - addXSingle * 35, flowerBaseY);
  curveVertex(flowerBaseX - addXSingle * 28, flowerBaseY - addYSingle * 18);
  curveVertex(flowerBaseX - addXSingle * 24, flowerBaseY - addYSingle * 20);
  curveVertex(flowerBaseX - addXSingle * 21, flowerBaseY - addYSingle * 19);
  curveVertex(flowerBaseX - addXSingle * 17, flowerBaseY - addYSingle * 23);
  curveVertex(flowerBaseX - addXSingle * 12, flowerBaseY - addYSingle * 25);
  curveVertex(flowerBaseX - addXSingle * 6, flowerBaseY - addYSingle * 22);
  curveVertex(flowerBaseX - addXSingle * 1, flowerBaseY - addYSingle * 27);
  curveVertex(flowerBaseX + addXSingle * 2, flowerBaseY - addYSingle * 28);
  curveVertex(flowerBaseX + addXSingle * 5, flowerBaseY - addYSingle * 27);
  curveVertex(flowerBaseX + addXSingle * 10, flowerBaseY - addYSingle * 21);
  curveVertex(flowerBaseX + addXSingle * 17, flowerBaseY - addYSingle * 23);
  curveVertex(flowerBaseX + addXSingle * 20, flowerBaseY - addYSingle * 20);
  curveVertex(flowerBaseX + addXSingle * 26, flowerBaseY - addYSingle * 21);
  curveVertex(flowerBaseX + addXSingle * 30, flowerBaseY - addYSingle * 18);
  curveVertex(flowerBaseX + addXSingle * 34, flowerBaseY);
  curveVertex(flowerBaseX + addXSingle * 34, flowerBaseY);
  endShape();

  beginShape();
  curveVertex(flowerBaseX - addXSingle * 4, flowerBaseY);
  curveVertex(flowerBaseX - addXSingle * 4, flowerBaseY);
  curveVertex(flowerBaseX + addXSingle * 3, flowerBaseY - addYSingle * 12);
  curveVertex(flowerBaseX + addXSingle * 9, flowerBaseY - addYSingle * 14);
  curveVertex(flowerBaseX + addXSingle * 15, flowerBaseY - addYSingle * 10);
  curveVertex(flowerBaseX + addXSingle * 20, flowerBaseY - addYSingle * 14);
  curveVertex(flowerBaseX + addXSingle * 24, flowerBaseY - addYSingle * 15);
  curveVertex(flowerBaseX + addXSingle * 29, flowerBaseY - addYSingle * 11);
  curveVertex(flowerBaseX + addXSingle * 34, flowerBaseY - addYSingle * 15);
  curveVertex(flowerBaseX + addXSingle * 38, flowerBaseY - addYSingle * 11);
  curveVertex(flowerBaseX + addXSingle * 40, flowerBaseY);
  curveVertex(flowerBaseX + addXSingle * 40, flowerBaseY);
  endShape();

  beginShape();
  curveVertex(flowerBaseX - addXSingle * 40, flowerBaseY);
  curveVertex(flowerBaseX - addXSingle * 40, flowerBaseY);
  curveVertex(flowerBaseX - addXSingle * 38, flowerBaseY - addYSingle * 10);
  curveVertex(flowerBaseX - addXSingle * 32, flowerBaseY - addYSingle * 14);
  curveVertex(flowerBaseX - addXSingle * 27, flowerBaseY - addYSingle * 10);
  curveVertex(flowerBaseX - addXSingle * 20, flowerBaseY - addYSingle * 16);
  curveVertex(flowerBaseX - addXSingle * 14, flowerBaseY - addYSingle * 12);
  curveVertex(flowerBaseX - addXSingle * 10, flowerBaseY - addYSingle * 15);
  curveVertex(flowerBaseX - addXSingle * 4, flowerBaseY - addYSingle * 11);
  curveVertex(flowerBaseX - addXSingle * 2, flowerBaseY - addYSingle * 6);
  curveVertex(flowerBaseX + addXSingle * 1, flowerBaseY - addYSingle * 7.5)
  curveVertex(flowerBaseX + addXSingle * 6, flowerBaseY - addYSingle * 8);
  curveVertex(flowerBaseX + addXSingle * 9, flowerBaseY - addYSingle * 6)
  curveVertex(flowerBaseX + addXSingle * 11, flowerBaseY - addYSingle * 1);
  curveVertex(flowerBaseX + addXSingle * 17, flowerBaseY - addYSingle * 2);
  curveVertex(flowerBaseX + addXSingle * 22, flowerBaseY + addYSingle * 3);
  curveVertex(flowerBaseX + addXSingle * 28, flowerBaseY + addYSingle * 3);
  curveVertex(flowerBaseX + addXSingle * 36, flowerBaseY + addYSingle * 11);
  curveVertex(flowerBaseX + addXSingle * 36, flowerBaseY + addYSingle * 11);
  endShape();





}


function drawLongLeaf(longLeafBaseX, longLeafBaseY, longLeafScale, longLLeafRotation, longLeafFill, longLeafStrokeCol) {
  //kelp looking leaf
  noStroke();
  angleMode(DEGREES);
  push();
  rotate(longLLeafRotation);

  var longLeafAddXSingle = width / 960; //1
  var longLeafAddYSingle = height / 540; // 1
  scale(longLeafScale);


  fill(longLeafFill);

  beginShape();
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 40), longLeafBaseY - longLeafAddYSingle * 5);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 40), longLeafBaseY - longLeafAddYSingle * 5);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 50), longLeafBaseY - longLeafAddYSingle * 45);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 36), longLeafBaseY - longLeafAddYSingle * 80);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 41), longLeafBaseY - longLeafAddYSingle * 125);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 27), longLeafBaseY - longLeafAddYSingle * 156);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 31), longLeafBaseY - longLeafAddYSingle * 200);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 18), longLeafBaseY - longLeafAddYSingle * 235);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 22), longLeafBaseY - longLeafAddYSingle * 270);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 13), longLeafBaseY - longLeafAddYSingle * 295);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 11), longLeafBaseY - longLeafAddYSingle * 325);
  curveVertex(longLeafBaseX - (longLeafAddXSingle * 2), longLeafBaseY - longLeafAddYSingle * 340);
  curveVertex(longLeafBaseX, longLeafBaseY - longLeafAddYSingle * 355);
  vertex(longLeafBaseX + (longLeafAddXSingle * 14), longLeafBaseY - longLeafAddYSingle * 379);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 26), longLeafBaseY - longLeafAddYSingle * 365);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 24), longLeafBaseY - longLeafAddYSingle * 345);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 28), longLeafBaseY - longLeafAddYSingle * 330);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 25), longLeafBaseY - longLeafAddYSingle * 310);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 35), longLeafBaseY - longLeafAddYSingle * 285);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 30), longLeafBaseY - longLeafAddYSingle * 255);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 40), longLeafBaseY - longLeafAddYSingle * 228);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 36), longLeafBaseY - longLeafAddYSingle * 200);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 45), longLeafBaseY - longLeafAddYSingle * 165);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 40), longLeafBaseY - longLeafAddYSingle * 132);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 49), longLeafBaseY - longLeafAddYSingle * 95);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 41), longLeafBaseY - longLeafAddYSingle * 57);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 50), longLeafBaseY - longLeafAddYSingle * 25);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 40), longLeafBaseY + longLeafAddYSingle * 12);
  curveVertex(longLeafBaseX + (longLeafAddXSingle * 40), longLeafBaseY + longLeafAddYSingle * 12);
  endShape();

  stroke(longLeafStrokeCol);

  noFill();

  strokeWeight(longLeafAddXSingle * 4.5);
  beginShape();
  curveVertex(longLeafBaseX, longLeafBaseY + longLeafAddYSingle * 5);
  curveVertex(longLeafBaseX, longLeafBaseY + longLeafAddYSingle * 5);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 25);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 54);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 6, longLeafBaseY - longLeafAddYSingle * 85);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 2, longLeafBaseY - longLeafAddYSingle * 118);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 152);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 4, longLeafBaseY - longLeafAddYSingle * 185);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 7, longLeafBaseY - longLeafAddYSingle * 211);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 3, longLeafBaseY - longLeafAddYSingle * 238);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 11, longLeafBaseY - longLeafAddYSingle * 265);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 289);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 313);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 335);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 12, longLeafBaseY - longLeafAddYSingle * 351);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 12, longLeafBaseY - longLeafAddYSingle * 351);
  endShape();
  noFill();

  strokeWeight(longLeafAddXSingle * 3);
  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 2, longLeafBaseY - longLeafAddYSingle * 5);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 2, longLeafBaseY - longLeafAddYSingle * 5);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 15);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 30, longLeafBaseY - longLeafAddYSingle * 20);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 30, longLeafBaseY - longLeafAddYSingle * 20);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 20);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 20);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 33);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 30, longLeafBaseY - longLeafAddYSingle * 40);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 30, longLeafBaseY - longLeafAddYSingle * 40);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 3, longLeafBaseY - longLeafAddYSingle * 78);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 3, longLeafBaseY - longLeafAddYSingle * 78);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 13, longLeafBaseY - longLeafAddYSingle * 85);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 33, longLeafBaseY - longLeafAddYSingle * 89);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 33, longLeafBaseY - longLeafAddYSingle * 89);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX, longLeafBaseY - longLeafAddYSingle * 105);
  curveVertex(longLeafBaseX, longLeafBaseY - longLeafAddYSingle * 105);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 13, longLeafBaseY - longLeafAddYSingle * 120);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 24, longLeafBaseY - longLeafAddYSingle * 122);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 24, longLeafBaseY - longLeafAddYSingle * 122);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 149);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 5, longLeafBaseY - longLeafAddYSingle * 149);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 14, longLeafBaseY - longLeafAddYSingle * 155);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 30, longLeafBaseY - longLeafAddYSingle * 158);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 30, longLeafBaseY - longLeafAddYSingle * 158);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX - longLeafAddXSingle * 4, longLeafBaseY - longLeafAddYSingle * 185);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 4, longLeafBaseY - longLeafAddYSingle * 185);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 192);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 19, longLeafBaseY - longLeafAddYSingle * 195);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 19, longLeafBaseY - longLeafAddYSingle * 195);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 7, longLeafBaseY - longLeafAddYSingle * 210);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 7, longLeafBaseY - longLeafAddYSingle * 210);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 14, longLeafBaseY - longLeafAddYSingle * 219);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 26, longLeafBaseY - longLeafAddYSingle * 225);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 26, longLeafBaseY - longLeafAddYSingle * 225);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 8, longLeafBaseY - longLeafAddYSingle * 255);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 8, longLeafBaseY - longLeafAddYSingle * 255);
  curveVertex(longLeafBaseX, longLeafBaseY - longLeafAddYSingle * 262);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 265);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 10, longLeafBaseY - longLeafAddYSingle * 265);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 275);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 275);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 18, longLeafBaseY - longLeafAddYSingle * 280);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 24, longLeafBaseY - longLeafAddYSingle * 282);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 24, longLeafBaseY - longLeafAddYSingle * 282);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 311);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 311);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 3, longLeafBaseY - longLeafAddYSingle * 317);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 3, longLeafBaseY - longLeafAddYSingle * 319);
  curveVertex(longLeafBaseX - longLeafAddXSingle * 3, longLeafBaseY - longLeafAddYSingle * 319);
  endShape();

  beginShape();
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 327);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 9, longLeafBaseY - longLeafAddYSingle * 327);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 15, longLeafBaseY - longLeafAddYSingle * 332);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 19, longLeafBaseY - longLeafAddYSingle * 334);
  curveVertex(longLeafBaseX + longLeafAddXSingle * 19, longLeafBaseY - longLeafAddYSingle * 334);
  endShape();

  translate(width / 4, height / 4 * 3);
  pop();
}
