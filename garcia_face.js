/*
 * FaceMap class - holds all information about one mapped
 * face and is able to draw itself.
 */
// remove this or set to false to enable full program
// var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 8;

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
function GarciaFace() {
  // these are state variables for a face
  this.gender = 1; // 1 or 2
  this.skin = 2; // 1, 2, 3
  this.hair = 1; // 1, 2, 3 or 4
  this.eyes = 3; // 1 or 2
  this.fringeType = 2; // 1, 2, 3 or 4
  this.earType = 1; // 1, 2, 3 or 4
  this.hairType = 1; // 1, 2 or 3
  this.features = 1; // 1 or 2


  /*Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */
  this.draw = function (positions) {
    angleMode(DEGREES);

    // get the width of the face from the chin positions
    let jaw_dist = positions.chin[16][0] - positions.chin[0][0];
    let faceWidth = map(jaw_dist, 3.2, 4.2, 3.5, 4.6, true);

    /**********MOUTH FUNCTION*********/
    function MOUTH(gender) {

      /***VARIABLES MAPPED TO POSITIONS***/
      // get the mouth opening from the bottom and top lip positions
      let mouth_height = positions.bottom_lip[8][1] - positions.top_lip[8][1];
      let mouthType;

      // draw closed mouth
      if (mouth_height < .1) {
        mouthType = 1
      }
      //draw open mouth and map the mouth opening
      else {
        mouthType = 2
      }

      // get the mouth position
      let mouth_pos = segment_average(positions.bottom_lip);

      // get the mouth width
      let mouth_width = positions.top_lip[6][0] - positions.top_lip[0][0];

      //mouth colours
      const mouthStokeColor = '#76051B';
      const mouthColor1 = '#EF9A9A';
      const mouthColor2 = '#EC8383';

      strokeWeight(.08);

      push();
      translate(mouth_pos[0], mouth_pos[1]);

      /*****CLOSED MOUTH*****/
      if (mouthType < 2) {
        // get the height of the bottom lip
        let bottom_lip_height = positions.bottom_lip[2][1] - positions.bottom_lip[7][1];

        //get the height of the top lip
        let top_lip_height = positions.top_lip[7][1] - positions.top_lip[2][1];

        // map top and bottom lip heights
        let bottomLip = map(bottom_lip_height, 0.07, 0.5, .5, 1, true);
        let topLip = map(top_lip_height, 0.18, 0.4, .6, 1, true);

        //lips for women
        if (gender < 2) {
          //bottom lip
          stroke(mouthStokeColor);
          fill(mouthColor1);
          arc(0, 0, mouth_width, bottomLip, 0, 180, OPEN);

          // top lip
          fill(mouthColor2);
          arc(0, 0, mouth_width, topLip, 180, 0, OPEN);

          // lip shine detail
          noStroke();
          fill(255);
          ellipse(-.38, .15, .25, .1);
          circle(-.1, .15, .1);
        }

        // lip middle line
        stroke(mouthStokeColor);
        line(positions.top_lip[6][0] + .15, 0, positions.top_lip[0][0] - .15, 0);
      }

      /*****OPEN MOUTH*****/
      else {
        let mouthHeight = map(mouth_height, .01, .3, .7, 1.7, true);
        let tongueHeight = map(mouthHeight, 1, 2, .25, .5);

        // mouth base
        stroke(mouthStokeColor);
        fill(mouthColor2);
        arc(0, -0.5, mouth_width, mouthHeight, 0, 180, CHORD);

        // tongue
        noStroke();
        fill(mouthStokeColor);
        ellipse(0, mouthHeight / 2 - tongueHeight - .4, mouth_width - .5, tongueHeight);
      }
      pop();
    };

    /**********HAIR FUNCTION*********/
    function HAIR(hairType, gender, faceWidth) {
      let hairStroke = .7;

      /******WOMEN HAIR*******/
      if (gender < 2) {

        /*****SPACE BUNS HAIR*****/
        if (hairType < 2) {
          // shadow
          push();
          noFill();
          stroke(0, 50);
          strokeWeight(hairStroke);
          circle(-2.25, -3, 2);
          circle(2.75, -3, 2);
          ellipse(.25, -.75, 6, 6);
          pop();

          // white outline
          push();
          noFill();
          stroke(255);
          strokeWeight(hairStroke);
          circle(-2.5, -3, 2); // left spacebun
          circle(2.5, -3, 2); //right spacebun
          ellipse(0, -.75, 6, 6); // hair base
          pop();

          // hair
          push();
          fill(hairColor);
          circle(-2.5, -3, 2); // left spacebun
          circle(2.5, -3, 2); //right spacebun
          circle(0, -.75, 6); // hair base
          pop();
        }

        /*****STRAIGHT HAIR*****/
        else {
          // shadow
          push();
          fill(0, 50);
          rectMode(CENTER);
          rect(.4, 1.6, 6.7, 3.8);
          arc(.4, -.3, 6.7, 6.7, 180, 0);
          pop();

          // White Outline
          push();
          fill(255);
          rectMode(CENTER);
          rect(0, 1.2, 6.7, 3.9);
          arc(0, -.7, 6.7, 6.7, 180, 0);
          pop();

          // hair shape
          push();
          fill(hairColor);
          rectMode(CENTER);
          rect(0, 1, 6, 3.6);
          arc(0, -.75, 6, 6, 180, 0);
          pop();

        }
      }

      /********MEN HAIR STYLE******/
      else {

        /*******ROUND HAIR*******/
        if (hairType < 2) {
          //shadow
          push();
          rectMode(CENTER);
          noFill();
          stroke(0, 50);
          strokeWeight(hairStroke);
          strokeCap(SQUARE);
          rect(.25, -1.5, faceWidth, 3);
          arc(.25, 0.1, faceWidth, 4.5, 0, 180, OPEN);
          pop();

          //white outline
          push();
          rectMode(CENTER);
          noFill();
          stroke(255);
          strokeWeight(hairStroke);
          rect(0, -1.75, faceWidth, 3);
          ellipse(0, -.25, faceWidth, 4.5);
          pop();

          //hair
          push();
          rectMode(CENTER);
          fill(hairColor);
          rect(0, -1.75, faceWidth, 3);
          pop();
        }
        /*********FLAT TOP*******/
        else {
          // shadow
          push();
          noFill();
          stroke(0, 50);
          strokeWeight(hairStroke);
          ellipse(0.25, 0, faceWidth, 4.5);
          ellipse(0.25, -0.75, 4.5, 4.25); // hair base
          pop();

          // white outline
          push();
          noFill();
          stroke(255);
          strokeWeight(hairStroke);
          ellipse(0, -.25, faceWidth, 4.5);
          ellipse(0, -1, 4.5, 4.25); // hair base
          pop();

          // hair
          fill(hairColor);
          ellipse(0, -1, 4.5, 4.25); // hair base
        }
      }
    };

    /**********FRINGE FUNCTION*********/
    function FRINGE(fringeType, faceWidth, gender, hair) {
      noStroke();
      fill(hairColor);

      /*****SIDE FRINGE*****/
      if (fringeType == 1) {
        push();
        translate(-1.25, -2.4);
        rotate(-25);
        arc(0, -.10, 4, 3, 20, 144);
        pop();

        /*******HAIR PINS*****/
        if (gender < 2) {
          let hairPin = random(1, 10); // randomise when there is an hair pin

          // draw a star hair pin if the earrings are not the star ones
          if (hairPin < 5) {
            // function to draw a star reference : https://p5js.org/examples/form-star.html
            function star(x, y) {
              const angle = 360 / 5;
              const halfAngle = angle / 2;
              beginShape();
              for (let a = 0; a < 360; a += angle) {
                let sx = x + cos(a) * .4;
                let sy = y + sin(a) * .4;
                vertex(sx, sy);
                sx = x + cos(a + halfAngle) * .18;
                sy = y + sin(a + halfAngle) * .18;
                vertex(sx, sy);
              }
              endShape(CLOSE);
            }

            noStroke();
            fill('#F4D525');
            star(-2.15, -1);
          }

          // draw a heart hair pin if the earrings are not the heart ones
          else if (hairPin > 8 && hair >= 2) {

            // function to draw a heart reference: https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
            function heart(x, y) {
              beginShape();
              vertex(x, y);
              bezierVertex(x - 1.5 / 2, y - 1.5 / 2, x - 1.5, y + 1.5 / 3, x, y + 1.5);
              bezierVertex(x + 1.5, y + 1.5 / 3, x + 1.5 / 2, y - 1.5 / 2, x, y);
              endShape(CLOSE);
            }

            push();
            translate(-2.15, -1.25);
            scale(.5);
            noStroke;
            fill('#D90368');
            heart(0, 0);
            pop();
          }
        }
      }

      /*****STRAIGHT FRINGE*****/
      else if (fringeType == 2) {
        arc(0, -1.25, faceWidth, 3.5, 180, 0);
      }

      /******CENTER HAIRLINE******/
      else {
        arc(0, -3, 3, 2.5, 30, 150);
      }
    };

    /**********EYES FUNCTION*********/
    function EYES(gender, eyes) {
      //Eyes colours
      const eyeColor1 = '#6BABEC';
      const eyeColor2 = '#BB85C9';
      let eyeColor;
      let pupil = random(.4, .9);

      // map colours to slider
      if (eyes < 2) {
        eyeColor = eyeColor1
      } else {
        eyeColor = eyeColor2
      }

      /*****EYES VARIABLES*****/
      const lashSize = .2;
      const lashGap = -.05;
      let lashNum = int(random(5, 12));
      const eyeHeight = .9;
      const eyeWidth = 1.2;
      const eyeStrokeWeight = .1;

      /*******EYES VARIABLES FROM POSITION*****/
      let left_eye_pos = segment_average(positions.left_eye);
      let right_eye_pos = segment_average(positions.right_eye);

      // get the right eye opening from the eye positions
      let right_eye_opening = positions.right_eye[5][1] - positions.right_eye[1][1];
      let rightEyeType;

      // closed eye
      if (right_eye_opening < 0.167) {
        rightEyeType = 1;
      }
      // half open eye
      else if (right_eye_opening >= 0.167 && right_eye_opening <= 0.18) {
        rightEyeType = 2;
      }
      // wide open eye
      else {
        rightEyeType = 3;
      }

      // get the left eye opening from the eye positions
      let left_eye_opening = positions.left_eye[4][1] - positions.left_eye[2][1];
      let leftEyeType;

      // closed eye
      if (left_eye_opening <= 0.18) {
        leftEyeType = 1;
      }
      // half open eye
      else if (left_eye_opening > 0.18 && left_eye_opening < 0.19) {
        leftEyeType = 2;
      }
      //wide open eye
      else {
        leftEyeType = 3;
      }


      /*****EYELASHES FUNCTION*****/
      function eyeLashes(num, radius, length, start, span) {
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        push();
        rotate(start);
        for (i = 0; i <= num; i++) {
          push();
          rotate(span / num * i)
          line(0, -radius, 0, -(radius + length))
          pop();
        };
        pop();
      }

      push();
      /*****LEFT EYE*****/
      // closed eye
      if (leftEyeType == 1) {
        //draw the left eye
        push();
        translate(left_eye_pos[0] - .25, left_eye_pos[1]); // translate to the center of the left eye
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        line(-.6, 0, .75, 0); // closed eye line

        //lashes
        if (gender < 2) {
          line(-.6, 0, -.9, .25);
          line(-.25, 0, -.5, .25);
        }
        pop();
      }
      // half open eye
      else if (leftEyeType == 2) {
        //draw the left eye
        push();
        translate(left_eye_pos[0] - .25, left_eye_pos[1]);

        // draw the eye base
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        fill(255);
        arc(0, 0, eyeWidth, eyeHeight, 0, 180, CHORD);

        // coloured pupil
        noStroke();
        fill(eyeColor);
        arc(0, 0, pupil * .75, pupil, 0, 180);

        // iris
        fill(0);
        arc(0, 0, pupil * .75 - .2, pupil - .2, 0, 180);

        // light detail
        fill(255);
        circle(-.25, .25, .2);

        if (gender < 2) {
          //lashes
          eyeLashes(lashNum / 2, eyeWidth / 2 + lashGap, lashSize, -90, -180);
        }
        pop();
      }
      // wide open eye
      else {
        //draw the left eye
        push();
        translate(left_eye_pos[0] - .25, left_eye_pos[1]); // translate to the center of the left eye

        //left eye base
        fill(255);
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        ellipse(0, 0, eyeWidth, eyeHeight);

        // coloured pupil
        noStroke();
        fill(eyeColor);
        ellipse(0, 0, pupil * .75, pupil);

        // iris
        fill(0);
        ellipse(0, 0, pupil * .75 - .2, pupil - .2);

        // light detail
        fill(255);
        circle(-.25, .2, .3);

        if (gender < 2) {
          //lashes
          eyeLashes(lashNum, eyeWidth / 2 + lashGap, lashSize, -90, 360);
        }

        pop();
      }

      /*****RIGHT EYE*****/
      // closed eye
      if (rightEyeType == 1) {
        push();
        translate(right_eye_pos[0] + .25, right_eye_pos[1]); // translate to the center of the right eye
        scale(-1, 1); // mirror the eye
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        // closed eye line
        line(-.6, 0, .75, 0);

        //lashes
        if (gender < 2) {
          line(-.6, 0, -.9, .25);
          line(-.25, 0, -.5, .25);
        }

        pop();
      }
      // half open eye
      else if (rightEyeType == 2) {
        push();
        translate(right_eye_pos[0] + .25, right_eye_pos[1]); // translate to the center of the right eye
        scale(-1, 1); // mirror the eye

        // draw the eye base
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        fill(255);
        arc(0, 0, eyeWidth, eyeHeight, 0, 180, CHORD);

        // coloured pupil
        noStroke();
        fill(eyeColor);
        arc(0, 0, pupil * .75, pupil, 0, 180);

        // iris
        fill(0);
        arc(0, 0, pupil * .75 - .2, pupil - .2, 0, 180);

        // light detail
        fill(255);
        circle(-.25, .25, .2);

        if (gender < 2) {
          //lashes
          eyeLashes(lashNum / 2, eyeWidth / 2 + lashGap, lashSize, -90, -180);
        }

        pop();
      }
      // wide open eye
      else {
        push();
        translate(right_eye_pos[0] + .25, right_eye_pos[1]); // translate to the center of the right eye
        scale(-1, 1); // mirror the eye

        //right eye base
        fill(255);
        stroke(0);
        strokeWeight(eyeStrokeWeight);
        ellipse(0, 0, eyeWidth, eyeHeight);

        // coloured pupil
        noStroke();
        fill(eyeColor);
        ellipse(0, 0, pupil * .75, pupil);

        // iris
        fill(0);
        ellipse(0, 0, pupil * .75 - .2, pupil - .2);

        // light detail
        fill(255);
        circle(.25, .2, .3);

        if (gender < 2) {
          //lashes
          eyeLashes(lashNum, eyeWidth / 2 + lashGap, lashSize, -90, 360);
        }

        pop();
      }
      pop();
    }

    /**********EAR FUNCTION*********/
    function EAR(earType, gender) {
      //ear variables
      const earWidth = .75;
      let nose_pos = segment_average(positions.nose_tip);
      let earX = (faceWidth / 2) + (earWidth / 3);
      let earY = nose_pos[1];

      // draw ear bases
      fill(skinColor);
      circle(earX, earY, earWidth); // right ear
      circle(-earX, earY, earWidth); // left ear

      /*********RIGHT EAR CROSS*********/
      push();
      stroke(0);
      strokeWeight(.07);
      translate(earX, earY);
      rotate(45);
      line(0, -.2, 0, .2);
      rotate(90);
      line(0, -.2, 0, .2);
      pop();

      /*********LEFT EAR CROSS*********/
      push();
      stroke(0);
      strokeWeight(.07);
      translate(-earX, earY);
      rotate(45);
      line(0, -.2, 0, .2);
      rotate(90);
      line(0, -.2, 0, .2);
      pop();

      /*********EARRINGS*********/
      if (gender < 2) { //if it is a woman

        /*****EAR LOOPs*****/
        if (earType < 2) {
          // right earring
          push();
          translate(earX, earY);
          noFill();
          stroke('#F4D525');
          strokeWeight(0.1);
          ellipse(0, 1.35, .5, 2);
          pop();

          // left earring
          push();
          translate(-earX, earY);

          noFill();
          stroke('#F4D525');
          strokeWeight(0.1);
          ellipse(0, 1.35, .5, 2);
          pop();
        }

        /*****PEARL EARRINGS*****/
        else if (earType >= 2 && earType < 3) {
          // right earring
          push();
          translate(earX, earY);
          noStroke();
          fill(255);
          circle(0, .55, .5);
          pop();

          // left earring
          push();
          translate(-earX, earY);
          noStroke();
          fill(255);
          circle(0, .55, .5);
          pop();
        }

        /*****STAR EARRINGS*****/
        else {
          // function to draw a star reference : https://p5js.org/examples/form-star.html
          function star(x, y) {
            const angle = 360 / 5;
            const halfAngle = angle / 2;
            beginShape();
            for (let a = 0; a < 360; a += angle) {
              let sx = x + cos(a) * .4;
              let sy = y + sin(a) * .4;
              vertex(sx, sy);
              sx = x + cos(a + halfAngle) * .18;
              sy = y + sin(a + halfAngle) * .18;
              vertex(sx, sy);
            }
            endShape(CLOSE);
          }

          // right earring
          push();
          translate(earX, earY);
          fill('#F4D525');
          star(0, .6);
          pop();

          // left earring
          push();
          translate(-earX, earY);
          scale(-1, 1);
          fill('#F4D525');
          star(0, .6);
          pop();
        }
      }

    };

    /**********FACE FEATURES FUNCTION*********/
    function FEATURES(features, gender, skin) {
      //Cheek colours
      const cheekColor1 = '#ffb4a2';
      const cheekColor2 = '#D36F83';
      let cheekColor;

      // map cheek colour to skin slider
      if (skin < 2) {
        cheekColor = cheekColor1
      } else {
        cheekColor = cheekColor2
      }

      // map the moustache to the top lip position
      let moustache_pos = segment_average(positions.top_lip);

      if (features < 2) {
        // cheeks for female
        if (gender < 2) {
          noStroke();
          fill(cheekColor);
          circle(-1.4, 0, .75);
          circle(1.4, 0, .75)
        }
        //moustache for male
        else {
          noStroke();
          fill(hairColor);

          push();
          rotate(20);
          ellipse(moustache_pos[0] + .7, moustache_pos[1] - .7, 1, .5);
          pop();

          push();
          scale(-1, 1);
          rotate(20);
          ellipse(moustache_pos[0] + .7, moustache_pos[1] - .7, 1, .5);
          pop();
        }
      }
    }

    noStroke();
    push();

    /************HAIR*****************/
    //hair colours
    const hairColor1 = '#D72483';
    const hairColor2 = '#7400b8';
    const hairColor3 = '#b7094c';

    let hairColor;

    if (this.hair < 2) {
      hairColor = hairColor1
    } else if (this.hair >= 2 && this.hair < 3) {
      hairColor = hairColor2
    } else {
      hairColor = hairColor3
    }

    HAIR(this.hairType, this.gender, faceWidth); // draw the hair


    /********HEAD*************/
    //skin colours
    const skinColor1 = '#FFDCC8';
    const skinColor2 = '#f2bda5';
    const skinColor3 = '#9a583c';

    let skinColor;

    if (this.skin < 2) {
      skinColor = skinColor1
    } else if (this.skin >= 2 && this.skin < 3) {
      skinColor = skinColor2
    } else {
      skinColor = skinColor3
    }

    //draw Head
    fill(skinColor);
    ellipse(0, -.25, faceWidth, 4.5); // head


    /*********EARS************/
    EAR(this.earType, this.gender);


    /************MOUTH***************/
    MOUTH(this.gender); //draw the mouth


    /******FACE FEATURES***********/
    FEATURES(this.features, this.gender, this.skin);


    /***********EYES************/
    EYES(this.gender, this.eyes); //draw the eyes


    /**************FRINGE***************/
    FRINGE(this.fringeType, faceWidth, this.gender, this.hair);

    pop();
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function (settings) {
    this.gender = map(settings[0], 0, 100, 1, 2);
    this.skin = map(settings[1], 0, 100, 1, 3);
    this.hair = map(settings[2], 0, 100, 1, 3);
    this.eyes = map(settings[3], 0, 100, 1, 2);
    this.fringeType = int(map(settings[4], 0, 100, 1, 3));
    this.earType = map(settings[5], 0, 100, 1, 3);
    this.hairType = map(settings[6], 0, 100, 1, 2);
    this.features = map(settings[7], 0, 100, 1, 2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function () {
    let settings = new Array(8);
    settings[0] = map(this.gender, 1, 2, 0, 100);
    settings[1] = map(this.skin, 1, 3, 0, 100);
    settings[2] = map(this.hair, 1, 3, 0, 100);
    settings[3] = map(this.eyes, 1, 2, 0, 100);
    settings[4] = map(this.fringeType, 1, 3, 0, 100);
    settings[5] = map(this.earType, 1, 3, 0, 100);
    settings[6] = map(this.hairType, 1, 2, 0, 100);
    settings[7] = map(this.features, 1, 2, 0, 100);
    return settings;
  }
}