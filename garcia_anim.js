const ease_gar = new p5.Ease();

//Leafs variables
let leafCount = 8; // number of leafs to draw
let LEAFS = []; // leaf array

let first_draw = true;

function garcia_draw_one_frame(cur_frac) {

  if(first_draw) {
    first_draw = false;

    for (let leafFall = 0; leafFall < leafCount; leafFall++) {
      LEAFS.push({
        x1: random(-1, width / 3),
        x2: random(width / 1.5, width + width / 50),
        y: 0,
        variation: random(-width / 50, +width / 20),
        rotation: random(-20, 20),
        size: random(.15, .4)
      });
    }
  }

  angleMode(DEGREES);

  let sun_size = canvasHeight / 3.5;

  let halfWidth = width / 2;
  let thirdWidth = width / 3
  let quarterWidth = width / 4;
  let fifthWidth = width / 5;

  let halftHeight = height / 2;
  let thirdHeight = height / 3;
  let quarterHeight = height / 4;
  let fifthHeight = height / 5;

  let customStrokeWeight = width / 550;

  //set up colours
  let orange = '#E6703D';
  let darkOrange = '#ae473f';
  let brown = '#A87338';

  let yellow = '#ffc039';
  let darkYellow = '#f7a61e';

  let beige = '#faf8e6';
  let white = '#ffffff';

  let green = '#4c806c';

  let skyColor = '#F0B79E';
  let waterColor = '#ffedd9';

  let lightPink = '#FE95A1';
  let middlePink = '#FF8795';
  let darkPink = '#FF7181';
  let darkerPink = '#80163C';

  let magenta = '#dd455a';

  let purple = '#9e2754';
  let middlePurple = '#7b3759';
  let darkPurple = '#400522';


  /*********STAR FUNCTION************/
  // function to draw a star reference : https://p5js.org/examples/form-star.html
  function star(x, y, min, max, end) {
    const angle = 360 / 4;
    const halfAngle = angle / 2;
    const radius1 = width / 350;
    const radius2 = width / 90;
    let starSize;

    push();
    translate(x, y);

    //animate star in
    if (cur_frac < max && cur_frac >= min) {
      starSize = map(cur_frac, 0, max, 0, 1);
      scale(starSize);
      beginShape();
      for (let a = 0; a < 360; a += angle) {
        let sx = cos(a) * radius1;
        let sy = sin(a) * radius1;

        vertex(sx, sy);

        sx = cos(a + halfAngle) * radius2;
        sy = sin(a + halfAngle) * radius2;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
    // animate star out
    else if (cur_frac < end && cur_frac >= max) {
      starSize = map(cur_frac, max, end, 1, 0);
      scale(starSize);
      beginShape();
      for (let a = 0; a < 360; a += angle) {
        let sx = cos(a) * radius1;
        let sy = sin(a) * radius1;

        vertex(sx, sy);

        sx = cos(a + halfAngle) * radius2;
        sy = sin(a + halfAngle) * radius2;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
    pop();
  }


  /********FUNCTION TO ADD AN OFFSET TO ANIMATIONS*********/
  //function created by Hazel and modified by me
  function offsetAnimation(cur_frac, offsetAMT, number) {
    let newFrac;

    if (number == 1) {
      newFrac = ease_gar.maclaurinCosine(cur_frac); // bird animation
    } else if (number == 2) {
      newFrac = ease_gar.gompertz(cur_frac); // ripples animation
    } else if (number == 3) {
      newFrac = ease_gar.linear(cur_frac); // leafs animation
    }

    for (let i = 0; i <= offsetAMT; i += 0.01) {
      newFrac += 0.01;
      if (newFrac >= 1) {
        newFrac = 0;
      }
    }
    return newFrac;
  }


  /*****************SKY***************/
  noStroke();
  fill(skyColor);

  push();
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();


  /**********BIRDS FUNCTION*********/
  function bird(birdX, birdY, birdSize, animationOffset) {
    let birdWingY;
    let newFrac = offsetAnimation(cur_frac, animationOffset, 1); // add an offset

    stroke(white);
    noFill();
    strokeWeight(customStrokeWeight);

    //draw the bird
    push();
    translate(birdX, birdY);
    scale(birdSize); // add scale to change the bird size

    // animate the wings Y position
    if (newFrac < .5) {
      birdWingY = map(newFrac, 0, 0.5, height / 100, -height / 60);
    } else {
      birdWingY = map(newFrac, 0.5, 1, -height / 60, height / 100);
    }

    //draw birds
    beginShape();
    vertex(-width / 100, birdWingY);
    vertex(0, 0);
    vertex(width / 100, birdWingY);
    endShape();
    pop();
  }

  bird(width / 2.3, height / 4.5, 1.7, 0.5);

  bird(width / 2.5, height / 6, 1.3, 0.3);

  bird(width / 2.1, height / 5.5, 1.3, 0.4)

  bird(width / 1.95, height / 7, 1, 0.2);


  /*******************SUN********************/
  noStroke();
  fill(lightPink);
  ellipse(halfWidth, halftHeight - width / 35, sun_size + width / 15);

  fill(middlePink);
  ellipse(halfWidth, halftHeight - width / 35, sun_size + width / 30);

  fill(darkPink);
  ellipse(halfWidth, halftHeight - width / 35, sun_size);


  /*****************MOUNTAINS*************/
  //mountain back
  fill('#caa291');

  beginShape();
  curveVertex(-quarterWidth, height / 1.5); //left
  curveVertex(width / 1.5, height / 1.5); //right
  curveVertex(thirdWidth, height / 2.5); //top
  endShape(CLOSE);

  //shadow
  fill('#D4B0A0')
  beginShape();
  curveVertex(width / 1.5, height / 1.8); //right
  curveVertex(width / 2.5, height / 2.25); //top
  curveVertex(width / 3.5, height / 1.9); // middle
  curveVertex(width / 5, height / 1.8); // left
  curveVertex(width / 6, height / 1.5); // bottom
  endShape(CLOSE);

  // mountain front
  fill("#bd9384");

  beginShape();
  curveVertex(width * 1.25, height / 1.25); //right
  curveVertex(width / 6, height / 1.45); //left
  curveVertex(thirdWidth, height / 1.75) //top right
  curveVertex(width / 1.25, height / 2.75); //top
  endShape(CLOSE);

  //shadow
  fill('#B08778');

  beginShape();
  curveVertex(width / 6, height / 1.5); //left
  curveVertex(width / 3.5, height / 1.6) //top right
  curveVertex(width / 1.4, height / 2.45); //top
  curveVertex(width / 1.5, height / 1.5);
  endShape(CLOSE);


  /***************WATER**********************/
  fill(waterColor);
  noStroke();
  push();
  rectMode(CORNER);
  rect(0, height / 1.5, width, thirdHeight);
  pop();

  //sun reflection / ripples
  function ripples(x1, Y, x2, offset) {
    let waterChange;
    let newFrac = offsetAnimation(cur_frac, offset, 2);

    if (newFrac < 0.5) {
      waterChange = map(newFrac, 0, .5, 0, width / 150);
    } else {
      waterChange = map(newFrac, 0.5, 1, width / 150, 0);
    }

    stroke(lightPink);
    strokeWeight(width / 200);
    line(x1 - waterChange, Y, x2 - waterChange, Y);
  }

  //draw ripples
  ripples(width / 2 - width / 12, height / 1.45, width / 2 + width / 25, 0.5);

  ripples(width / 2 + width / 14, height / 1.45, width / 2 + width / 10, .2);

  ripples(width / 2 - width / 14, height / 1.4, width / 2 + width / 15, .5);
  ripples(width / 2 + width / 11, height / 1.4, width / 2 + width / 10, 0);

  ripples(width / 2 - width / 20, height / 1.35, width / 2 - width / 50, 0.8);
  ripples(width / 2, height / 1.35, width / 2 + width / 13, .9);

  ripples(width / 2 - width / 50, height / 1.3, width / 2 + width / 20.1, .4);

  //sparkles
  fill(white);
  noStroke();
  star(width / 2 + width / 50, height / 1.45, 0, .25, .5);
  star(width / 2 - width / 25, height / 1.4, .28, .6, .8);
  star(width / 2 + width / 20, height / 1.35, .15, .35, .7);


  /*********************BOAT***************/
  function boat() {
    // sails
    noStroke();
    fill(purple);
    triangle(width / 200, 0, 0, -height / 5, -width / 12, -height / 90);
    triangle(width / 100, 0, width / 300, -height / 5, width / 20, -height / 70);

    //boat base
    fill(magenta);
    push();
    rectMode(CORNER);
    rect(-width / 10.1, 0, width / 10, height / 20);
    arc(0, 0, width / 7, height / 10, 0, 90);
    rect(width / 15, -height / 90, width / 200, height / 80);
    pop();

    //boat wood detail
    noFill();
    stroke(middlePink);
    strokeWeight(customStrokeWeight);
    line(width / 14.5, height / 120, -width / 10.2, height / 120);
    line(width / 15, height / 120 + height / 120, -width / 10.2, height / 120 + height / 120);
    line(width / 16.5, height / 120 + (2 * height / 120), -width / 10.2, height / 120 + (2 * height / 120));
    line(width / 19.5, height / 120 + (3 * height / 120), -width / 10.2, height / 120 + (3 * height / 120));
    line(width / 22, height / 120 + (4 * height / 120), -width / 10.2, height / 120 + (4 * height / 120));

    // small windows
    strokeWeight(height / 300);
    fill(purple);
    circle(width / 50, height / 60, height / 80);
    circle(width / 50 + width / 80, height / 60, height / 80);
    circle(width / 50 + (2 * width / 80), height / 60, height / 80);

  }


  //draw boat
  push();
  translate(width / 3.25, height / 1.45);

  //animate the boat angle
  let boatAngle;
  let boatFAngleMovement = ease_gar.backInOut(cur_frac);

  if (cur_frac < .5) {
    boatAngle = map(boatFAngleMovement, 0, 0.5, 0, 2);
  } else {
    boatAngle = map(boatFAngleMovement, 0.5, 1, 2, 0);
  }

  rotate(boatAngle);

  //draw the boat
  boat();
  pop();

  //water in front of the boat to hide the bottom of the hull
  fill("#ffedd9");
  push();
  rectMode(CORNER);
  rect(width / 5, height / 1.37, width / 6, height / 20);
  pop();


  /***************LEFT FLOOR***********/
  noStroke();
  fill(middlePurple);

  beginShape();
  curveVertex(width - width / 10, height + height / 10); // right
  curveVertex(0, height); //left bottom
  curveVertex(-quarterWidth, height / 1.3); // left
  curveVertex(width / 10, height / 1.4); // top middle
  curveVertex(halfWidth, height / 1.1); //bottom middle
  endShape(CLOSE);


  /**************TREE FUNCTION*************/
  function tree(x, y) {
    fill(beige);
    rectMode(CENTER);

    //draw the base of the tree trunc
    rect(x, y, width / 20, halftHeight);
    arc(x, y + height / 4.015, width / 20, height / 40, 0, 180);

    // draw the circles
    stroke(green);
    strokeWeight(customStrokeWeight);
    ellipse(x, y + width / 150, width / 50, height / 20);
    ellipse(x, y + width / 150, width / 150, height / 45);

    // draw the stripes
    for (let i = 1; i < 5; i++) {
      noFill();
      arc(x, y + (height / 18) * i, width / 20.25, height / 40, 0, 180);
      arc(x, y - (height / 18) * i, width / 20.25, height / 40, 0, 180);
    }
  }


  /*********SMALL LEAF FUNCTION*********/
  function leaf(x, y, s, angle) {
    push();
    translate(x, y);
    scale(s);
    rotate(angle);
    bezier(0, 0, -width / 20, -height / 6, -width / 40, -height / 6, 0, -height / 4);
    bezier(0, 0, width / 20, -height / 6, width / 40, -height / 6, 0, -height / 4);
    pop();
  }


  /***********MOVING LEAF FUNCTION*******/
  function movingLeaf(Num) {
    let jvalue;
    let Value;
    let min = 0.1;

    // start the for loop at different values depending on the Num value to split the leafs from the left and the right of the screen
    if (Num == 1) {
      jvalue = 0;
      Value = LEAFS.length / 2; // half array
    } else {
      jvalue = 3;
      Value = LEAFS.length; // full array
    }

    for (let j = jvalue; j < Value; j++) {
      const leafs = LEAFS[j]; // assign the each value of the LEAFS array to a variable
      let leafX;
      let newFrac = offsetAnimation(cur_frac, min, 3); //offset the animation of the leafs
      let XValue;

      // assign different X value to the different side
      if (Num == 1) {
        XValue = leafs.x1
      } else {
        XValue = leafs.x2
      }

      // wiggle the leafs from left to right
      if (cur_frac < .25) {
        leafX = map(cur_frac, 0, .25, XValue, XValue + leafs.variation);
      } else if (cur_frac >= .25 && cur_frac <= .5) {
        leafX = map(cur_frac, .25, .5, XValue + leafs.variation, XValue);
      } else if (cur_frac > .5 && cur_frac < .75) {
        leafX = map(cur_frac, .5, .75, XValue, XValue - leafs.variation);
      } else {
        leafX = map(cur_frac, .75, 1, XValue - leafs.variation, XValue);
      }

      // animate the leafs from top to bottom
      let leafY = map(newFrac, 0, 1, height / 4, height + height / 10);

      // animate the rotation of the leafs
      let leafRotation = ease_gar.linear(cur_frac);
      let leafAngle;

      if (cur_frac < 0.25) {
        leafAngle = map(leafRotation, 0, .25, 0, 15);
      } else if (cur_frac >= 0.25 && leafRotation <= 0.5) {
        leafAngle = map(leafRotation, .25, .5, 15, 0);
      } else if (cur_frac > 0.5 && leafRotation < 0.75) {
        leafAngle = map(leafRotation, .5, .75, 0, -15);
      } else {
        leafAngle = map(leafRotation, .75, 1, -15, 0);
      }

      // draw the leafs
      push();
      translate(leafX, leafY);
      rotate(leafAngle);
      scale(leafs.size);

      fill(yellow);
      noStroke();

      bezier(0, 0, -width / 20, -height / 6, -width / 40, -height / 6, 0, -height / 4);
      bezier(0, 0, width / 20, -height / 6, width / 40, -height / 6, 0, -height / 4);
      pop();

      min += 0.3; // add more offset to each leaf
    }
  }


  /*************LEFT TREE************/
  //back leafs
  fill(darkYellow)
  push();
  ellipseMode(CORNER)
  ellipse(0 - width / 15, height / 3.25, width / 6, quarterHeight);
  ellipse(width / 6, height / 15, fifthWidth, thirdHeight);
  ellipse(width / 15, height / 4, width / 5.5, quarterHeight);
  pop();

  //tree base
  tree(width / 10, halftHeight);

  // moving leafs
  movingLeaf(1);

  //front leafs
  fill(yellow);
  noStroke();
  push();
  ellipseMode(CORNER);
  ellipse(0 - width / 12, 0 - height / 50, width / 5, height / 2.5);
  ellipse(width / 5, 0 - height / 20, width / 5, height / 5);
  ellipse(width / 30, 0 - height / 15, width / 5, height / 3);
  ellipse(width / 6, 0, width / 5, height / 3);
  pop();

  // small leaf detail
  fill(darkYellow);
  leaf(width / 4, height / 4, .25, 25);
  leaf(width / 8, height / 8, .2, -45);
  leaf(width / 3.5, height / 10, .15, 70);
  leaf(width / 15, height / 4.5, .35, -30);
  leaf(width / 5, height / 8, .4, 20);
  leaf(width / 18, height / 15, .2, 18);

  //floor front
  noStroke();
  fill(darkPurple);

  beginShape();
  curveVertex(0, height); // left
  curveVertex(width + width / 20, height); // right
  curveVertex(width / 1.005, height / 1.35); // right top
  curveVertex(width / 1.3, height / 1.4) // right middle
  curveVertex(width / 2.5, height / 1.1);
  endShape(CLOSE);

  /************TREE FOREGROUND********/
  //back leafs
  fill(darkYellow)
  push();
  ellipseMode(CORNER);
  ellipse(width - width / 9, thirdHeight, width / 6, height / 3.5); //bottom right
  ellipse(width / 1.5, height / 15, fifthWidth, thirdHeight);
  ellipse(width / 1.3, height / 3.5, width / 6, height / 3.5);
  pop();
  //tree base
  tree(width - width / 8, height / 2.05);

  //moving leafs
  movingLeaf(2);

  //front leafs
  fill(yellow);
  noStroke();
  push();
  ellipseMode(CORNER);
  ellipse(width / 1.18, 0 - height / 50, fifthWidth, height / 2.5);
  ellipse(width / 1.5, 0 - height / 20, fifthWidth, fifthHeight);
  ellipse(width / 1.4, 0 - height / 15, fifthWidth, thirdHeight);
  ellipse(width / 1.4, 0, fifthWidth, thirdHeight);
  pop();

  // small leaf detail
  fill(darkYellow);
  leaf(width - width / 5, height / 8, .25, 20);
  leaf(width - width / 4.5, height / 4, .2, -45);
  leaf(width - width / 8, height / 15, .15, -40);
  leaf(width - width / 15, height / 3, .35, 30);
  leaf(width - width / 3.5, height / 10, .38, -10);
  leaf(width - width / 18, height / 15, .2, 18);
  leaf(width - width / 9, height / 4.5, .4, 15);

  /********FOREGROUND BERRY BUSH*********/
  //berry function
  function berry(x, y, color, side) {
    if (color == 1) {
      fill(orange)
    } else if (color == 2) {
      fill(brown)
    } else {
      fill(darkOrange)
    }

    let w = width / 50;

    circle(x, y, w);

    //shine
    fill(lightPink);

    if (side == 1) {
      circle(x - width / 300, y - height / 300, w - width / 70);
    } else {
      circle(x + width / 300, y - height / 300, w - width / 70);
    }
  }

  //right leafs
  fill(darkerPink);
  leaf(width, height, 1, -10);
  leaf(width, height, 1, -80);
  leaf(width - width / 200, height, 1, -35);

  //right side berries
  berry(width - width / 25, height - height / 18, 1, 1);
  berry(width - width / 9.5, height - height / 9, 1, 1);
  berry(width - width / 8, height - height / 40, 1, 1);

  berry(width - width / 50, height - height / 20, 2, 1);
  berry(width - width / 30, height - height / 8, 2, 1);
  berry(width - width / 12, height - height / 10, 2, 1);
  berry(width - width / 11, height - height / 35, 2, 1);

  berry(width - width / 18, height - height / 10, 3, 1);
  berry(width - width / 12, height - height / 7, 3, 1);
  berry(width - width / 9, height - height / 15, 3, 1);
  berry(width - width / 23, height - height / 40, 3, 1);
  berry(width - width / 15, height - height / 20, 3, 1);
  berry(width - width / 70, height - height / 11, 3, 1);

  //left leafs
  fill(purple);
  leaf(width / 400, height, 1, 5);
  leaf(0, height, 1, 90);
  leaf(0, height, 1, 45);

  //left side
  berry(width / 9, height - height / 9, 1, 2);
  berry(width / 40, height - height / 14, 1, 2);
  berry(width / 8, height - height / 40, 1, 2);

  berry(width / 50, height - height / 20, 2, 2);
  berry(width / 25, height - height / 9, 2, 2);
  berry(width / 12, height - height / 10, 2, 2);
  berry(width / 11, height - height / 35, 2, 2);

  berry(width / 18, height - height / 10, 3, 2);
  berry(width / 12, height - height / 7, 3, 2);
  berry(width / 9, height - height / 15, 3, 2);
  berry(width / 25, height - height / 40, 3, 2);
  berry(width / 15, height - height / 20, 3, 2);
}