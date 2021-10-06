/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 8;

// other variables can be in here too

// const fg_color = [255];

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
function GamblesFace() {

  // these are state variables for a face
  // (your variables should be different!)

  this.eye_type = .2; // changes between different styles range is 0 to 1 with 3 different styles of eye
  this.right_eyeBrow_height = .5; // Low, Middle, or High range is 0 to 1 with 3 different positions
  this.left_eyeBrow_height = .5; // Low, Middle, or High range is 0 to 1 with 3 different positions
  this.mouth_type = .2; // changes between different styles range is 0 to 1 with 5 different positions
  this.bridge_direction = .2; // left or right range is 0 to 1 with 2 different positions

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function (segment, do_loop) {
    for (let i = 0; i < segment.length; i++) {
      let px = segment[i][0];
      let py = segment[i][1];

      if (i < segment.length - 1) {
        let nx = segment[i + 1][0];
        let ny = segment[i + 1][1];
        ellipse(px, py, .1)

        line(px, py, nx, ny);
      } else if (do_loop) {
        let nx = segment[0][0];
        let ny = segment[0][1];
        line(px, py, nx, ny);
      }
    }
  };

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */
  this.draw = function (positions) {

    rectMode(CENTER);

    noStroke()

    // average the location of some of the facepart to be used to determine if they are in one or another

    let nose_tip_pos = segment_average(positions.nose_tip);
    let top_lip_pos = segment_average(positions.top_lip);
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    // size and number of cells in the grid

    var gridSize = 3;
    var cellSize = .75;

    /*** TOM ADDED THIS LOOP #1 to "color in" the face ***/
    // this is a lookup table that keeps track of previous cells
    for (let y = -gridSize; y < gridSize; y += cellSize) {
      // each row we'll draw one line from left_x to right_x
      let left_x = null;
      let right_x = null;
      for (let x = -gridSize; x < gridSize; x += cellSize) {
        let lastX = null;
        let lastY = null;
        for (let i = 0; i < positions.chin.length; i++) {
          if (positions.chin[i][0] > (x - cellSize / 2) && positions.chin[i][0] < (x + cellSize / 2) && positions.chin[i][1] > (y - cellSize / 2) && positions.chin[i][1] < (y + cellSize / 2)) {
            if (x != lastX && y != lastY) {
              lastX = x;
              lastY = y;
              // first check if this is the first one
              if (left_x == null) {
                // just record this for both left and right
                left_x = x;
                right_x = x;
              } else if (x < left_x) {
                // new left_x
                left_x = x;
              } else if (x > right_x) {
                right_x = x;
              }
            }
          }
        }
      }
      if (left_x != null) {
        // now draw the line (series of cells)
        for (let j = left_x; j <= right_x; j += cellSize) {
          let selectFill = random(0, 1)
          if (selectFill >= 0 && selectFill < .33) {
            gridGradient(j, y);
          } else if (selectFill >= .33 && selectFill < .66) {
            circles(j, y)
          } else if (selectFill >= .66 && selectFill < 1) {
            triangles(j, y);
          }
        }
      }
    }
    /*** END OF TOM'S ADDITONS ***/


    // Main loop, logic gates that check if the given point of the facial feature is within the bounds of a cell, if it is then go through another set of logic gates to determine which 'style' of that facepart to draw

    for (let x = -gridSize; x < gridSize; x += cellSize) {
      for (let y = -gridSize; y < gridSize; y += cellSize) {
        if (left_eye_pos[0] > (x - cellSize / 2) && left_eye_pos[0] < (x + cellSize / 2) && left_eye_pos[1] > (y - cellSize / 2) && left_eye_pos[1] < (y + cellSize / 2)) {
          if (this.eye_type >= 0 && this.eye_type <= .33) {
            eye1(x, y);
          } else if (this.eye_type > .33 && this.eye_type <= .66) {
            eye2(x, y);
          } else if (this.eye_type > .66 && this.eye_type <= 1) {
            eye3(x, y);
          }
        } else if (right_eye_pos[0] > (x - cellSize / 2) && right_eye_pos[0] < (x + cellSize / 2) && right_eye_pos[1] > (y - cellSize / 2) && right_eye_pos[1] < (y + cellSize / 2)) {
          if (this.eye_type >= 0 && this.eye_type <= .33) {
            eye1(x, y);
          } else if (this.eye_type > .33 && this.eye_type <= .66) {
            eye2(x, y);
          } else if (this.eye_type > .66 && this.eye_type <= 1) {
            eye3(x, y);
          }
        } else if (positions.nose_bridge[3][0] > (x - cellSize / 2) && positions.nose_bridge[3][0] < (x + cellSize / 2) && positions.nose_bridge[3][1] > (y - cellSize / 2) && positions.nose_bridge[3][1] < (y + cellSize / 2)) {
          noseTip(x, y)
        } else if (positions.nose_bridge[0][0] > (x - cellSize / 2) && positions.nose_bridge[0][0] < (x + cellSize / 2) && positions.nose_bridge[0][1] > (y - cellSize / 2) && positions.nose_bridge[0][1] < (y + cellSize / 2)) {
          if (this.bridge_direction >= 0 && this.bridge_direction <= .5) {
            noseBridge1(x,y);
          } else if (this.bridge_direction > .5 && this.bridge_direction <= 1) {
            noseBridge2(x,y);
          }
        } else if (top_lip_pos[0] > (x - cellSize / 2) && top_lip_pos[0] < (x + cellSize / 2) && top_lip_pos[1] > (y - cellSize / 2) && top_lip_pos[1] < (y + cellSize / 2)) {
          if (this.mouth_type >= 0 && this.mouth_type <=.2) {
            mouth1(x, y);
          } else if (this.mouth_type > .2 && this.mouth_type <=.4) {
            mouth2(x, y);
          } else if (this.mouth_type > .4 && this.mouth_type <=.6) {
            mouth3(x, y);
          } else if (this.mouth_type > .6 && this.mouth_type <=.8) {
            mouth4(x, y);
          } else if (this.mouth_type > .8 && this.mouth_type <=1) {
            mouth5(x, y);
          }
        } else if (positions.left_eyebrow[3][0] > (x - cellSize / 2) && positions.left_eyebrow[3][0] < (x + cellSize / 2) && positions.left_eyebrow[3][1] > (y - cellSize / 2) && positions.left_eyebrow[3][1] < (y + cellSize / 2)) {
          if (this.left_eyeBrow_height >= 0 && this.left_eyeBrow_height <= .33) {
            eyebrowLow(x, y);
          } else if (this.left_eyeBrow_height > .33 && this.left_eyeBrow_height <= .66) {
            eyebrowMiddle(x, y);
          } else if (this.left_eyeBrow_height > .66 && this.left_eyeBrow_height <= 1) {
            eyebrowHigh(x, y);
          }
        } else if (positions.left_eyebrow[1][0] > (x - cellSize / 2) && positions.left_eyebrow[1][0] < (x + cellSize / 2) && positions.left_eyebrow[1][1] > (y - cellSize / 2) && positions.left_eyebrow[1][1] < (y + cellSize / 2)) {
          if (this.left_eyeBrow_height >= 0 && this.left_eyeBrow_height <= .33) {
            eyebrowLow(x, y);
          } else if (this.left_eyeBrow_height > .33 && this.left_eyeBrow_height <= .66) {
            eyebrowMiddle(x, y);
          } else if (this.left_eyeBrow_height > .66 && this.left_eyeBrow_height <= 1) {
            eyebrowHigh(x, y);
          } 
        } else if (positions.right_eyebrow[1][0] > (x - cellSize / 2) && positions.right_eyebrow[1][0] < (x + cellSize / 2) && positions.right_eyebrow[1][1] > (y - cellSize / 2) && positions.right_eyebrow[1][1] < (y + cellSize / 2)) {
          if (this.right_eyeBrow_height >= 0 && this.right_eyeBrow_height <= .33) {
            eyebrowLow(x, y);
          } else if (this.right_eyeBrow_height > .33 && this.right_eyeBrow_height <= .66) {
            eyebrowMiddle(x, y);
          } else if (this.right_eyeBrow_height > .66 && this.right_eyeBrow_height <= 1) {
            eyebrowHigh(x, y);
          } 
        } else if (positions.right_eyebrow[3][0] > (x - cellSize / 2) && positions.right_eyebrow[3][0] < (x + cellSize / 2) && positions.right_eyebrow[3][1] > (y - cellSize / 2) && positions.right_eyebrow[3][1] < (y + cellSize / 2)) {
          if (this.right_eyeBrow_height >= 0 && this.right_eyeBrow_height <= .33) {
            eyebrowLow(x, y);
          } else if (this.right_eyeBrow_height > .33 && this.right_eyeBrow_height <= .66) {
            eyebrowMiddle(x, y);
          } else if (this.right_eyeBrow_height > .66 && this.right_eyeBrow_height <= 1) {
            eyebrowHigh(x, y);
          }
        }
      }
    }


    // eye type 1

    function eye1(x, y) {

      fill(128, 155, 194);

      rect(x, y, cellSize, cellSize);

      fill(255);

      beginShape();
      vertex(x - cellSize / 2, y);
      bezierVertex(x - cellSize / 4, y, x - cellSize / 4, y + cellSize / 4, x, y + cellSize / 4);
      bezierVertex(x + cellSize / 4, y + cellSize / 4, x + cellSize / 4, y, x + cellSize / 2, y);
      bezierVertex(x + cellSize / 4, y, x + cellSize / 4, y - cellSize / 4, x, y - cellSize / 4);
      bezierVertex(x - cellSize / 4, y - cellSize / 4, x - cellSize / 4, y, x - cellSize / 2, y);
      endShape();

      fill(0)

      ellipse(x, y, cellSize / 4)

    }

    // eye type 2

    function eye2(x, y) {

      fill(128, 155, 194);

      rect(x, y, cellSize, cellSize);

      fill(255);

      ellipse(x, y, cellSize / 2);

      fill(0);

      ellipse(x, y, cellSize / 4);

    }

    // eye type 3

    function eye3(x, y) {

      fill(128, 155, 194);

      rect(x, y, cellSize, cellSize);

      fill(108, 135, 174);

      arc(x, y, cellSize / 2, cellSize / 2, 180, 360, PIE);

      fill(255);

      arc(x, y, cellSize / 2, cellSize / 2, 0, 180, PIE);

      fill(0)

      arc(x, y, cellSize / 4, cellSize / 4, 0, 180, PIE);

    }

    // nose bridge with shadow to the left

    function noseBridge1(x, y) {

      fill(128, 155, 194)

      rect(x - cellSize / 4, y, cellSize / 2, cellSize);

      fill(108, 135, 174);
      rect(x + cellSize / 4, y, cellSize / 2, cellSize);

    }

    // nose bridge with shadow to the right

    function noseBridge2(x, y) {


      fill(108, 135, 174);

      rect(x - cellSize / 4, y, cellSize / 2, cellSize);

      fill(128, 155, 194);
      rect(x + cellSize / 4, y, cellSize / 2, cellSize);

    }

    // nose tile, only one style

    function noseTip(x, y) {

      fill(128, 155, 194);
      rect(x, y, cellSize, cellSize);

      fill(108, 135, 174);

      ellipse(x - cellSize / 6, y + cellSize/6, cellSize / 4, cellSize / 4);
      ellipse(x + cellSize / 6, y + cellSize/6, cellSize / 4, cellSize / 4);

    }

    // mouth style 1

    function mouth1(x, y) {

      fill(0);

      rect(x,y,cellSize,cellSize)

      fill(255)
      rect(x, y - cellSize / 2 + cellSize/8, cellSize, cellSize / 4);
    }

    // mouth style 2

    function mouth2(x, y) {

      fill(0);

      rect(x, y, cellSize, cellSize);

      fill(255)
      rect(x, y - cellSize / 2 + cellSize / 8, cellSize, cellSize / 4);

      rect(x, y + cellSize / 2 - cellSize / 8, cellSize, cellSize / 4);
    }

    // mouth style 3

    function mouth3(x, y) {

      fill(0);

      rect(x, y + cellSize/8, cellSize, cellSize/4);

      fill(108, 135, 174);
      rect(x, y - cellSize/2 + cellSize / 8, cellSize, cellSize / 4);

      fill(255);
      rect(x, y - cellSize / 8, cellSize, cellSize / 4);

      fill(128, 155, 194);
      rect(x, y + cellSize / 2 - cellSize / 8, cellSize, cellSize / 4);
    }

    // mouth style 4

    function mouth4(x, y) {

      fill(0);

      rect(x, y + cellSize/8, cellSize, cellSize/4);

      fill(108, 135, 174);
      rect(x, y - cellSize / 2 + cellSize / 4, cellSize, cellSize / 2);

      fill(128, 155, 194);
      rect(x, y + cellSize / 2 - cellSize / 8, cellSize, cellSize / 4);
    }

    // mouth style 5

    function mouth5(x, y) {

      fill(108, 135, 174);
      rect(x, y - cellSize / 2 + cellSize / 4, cellSize, cellSize / 2);

      fill(128, 155, 194);
      rect(x, y + cellSize / 2 - cellSize / 4, cellSize, cellSize / 2);

      fill(108, 135, 174);
      rect(x, y + cellSize / 2 - cellSize / 8, cellSize, cellSize / 4);
    }

    // eyebrow middle

    function eyebrowMiddle(x, y) {

      fill(128, 155, 194);
      rect(x, y, cellSize, cellSize);
      fill(108, 135, 174)
      rect(x, y, cellSize, cellSize / 4);
    }

    // eyebrow high

    function eyebrowHigh(x, y) {

      fill(128, 155, 194);

      rect(x, y, cellSize, cellSize);

      fill(108, 135, 174)

      rect(x, y - cellSize / 2 + cellSize / 8, cellSize, cellSize / 4);
    }

    // eyebrow low

    function eyebrowLow(x, y) {

      fill(128, 155, 194);

      rect(x, y, cellSize, cellSize);

      fill(108, 135, 174)

      rect(x, y + cellSize / 2 - cellSize / 8, cellSize, cellSize / 4);
    }

    // grid gradient tile, includes the various different directions that can be drawn

    function gridGradient(x, y) {

      fill(128, 155, 194);
      rect(x, y, cellSize, cellSize)

      // size and number of cells within each gradient cell. (gradient is made of a grid of squares)

      var gradientGridSize = gridSize / 8;
      var gradientCellSize = gradientGridSize / 15;

      // variable to pick a random direction for the gradient to be drawn in (left, right, up, or down)

      let directionSwitch = random(0, 1);

      // draws the grid

      for (let cellX = -gradientGridSize; cellX < gradientGridSize; cellX += gradientCellSize) {
        for (let cellY = -gradientGridSize; cellY < gradientGridSize; cellY += gradientCellSize) {

          // logic gates for the direction

          if (directionSwitch >= 0 && directionSwitch < .25) {

            // as Y or X value changes increase or decrease the chance for the cell to change colour

            if (cellY + random(-.4, .4) < 0) {
              fill(108, 135, 174)
            } else {
              fill(128, 155, 194)
            }
          } else if (directionSwitch >= .25 && directionSwitch < .5) {
            if (cellY + random(-.4, .4) > 0) {
              fill(108, 135, 174)
            } else {
              fill(128, 155, 194)
            }
          } else if (directionSwitch >= .5 && directionSwitch < .75) {
            if (cellX + random(-.4, .4) > 0) {
              fill(108, 135, 174)
            } else {
              fill(128, 155, 194)
            }
          } else if (directionSwitch >= .75 && directionSwitch < 1) {
            if (cellX + random(-.4, .4) < 0) {
              fill(108, 135, 174)
            } else {
              fill(128, 155, 194)
            }
          }

          // draws the cell

          beginShape()
          vertex(x + cellX, y + cellY);
          vertex(x + cellX + gradientCellSize, y + cellY);
          vertex(x + cellX + gradientCellSize, y + cellY + gradientCellSize);
          vertex(x + cellX, y + cellY + gradientCellSize);
          endShape(CLOSE);
        }
      }
    }

    // circles cell style, includes the two versions with inverted colours

    function circles(x, y) {

      // size of circle

      let circleSize = 4;

      // variable to randomise the colours

      let circleColourSwitch = random(0, 1);

      // logic gate for the fill

      if (circleColourSwitch < .5) {
        fill(128, 155, 194);
      } else {
        fill(108, 135, 174);
      }

      rect(x, y, cellSize, cellSize);

      if (circleColourSwitch < .5) {
        fill(108, 135, 174);
      } else {

        fill(128, 155, 194);
      }

      // arcs are drawn in the corner and on the sides of the cell so that they don't overlap with the edges

      arc(x - cellSize / 2, y - cellSize / 2, cellSize / circleSize, cellSize / circleSize, 0, 90, PIE);
      arc(x - cellSize / 6, y - cellSize / 2, cellSize / circleSize, cellSize / circleSize, 0, 180, PIE);
      arc(x + cellSize / 6, y - cellSize / 2, cellSize / circleSize, cellSize / circleSize, 0, 180, PIE);
      arc(x + cellSize / 2, y - cellSize / 2, cellSize / circleSize, cellSize / circleSize, 90, 180, PIE);
      arc(x + cellSize / 2, y - cellSize / 6, cellSize / circleSize, cellSize / circleSize, 90, 270, PIE);
      arc(x + cellSize / 2, y + cellSize / 6, cellSize / circleSize, cellSize / circleSize, 90, 270, PIE);
      arc(x + cellSize / 2, y + cellSize / 2, cellSize / circleSize, cellSize / circleSize, 180, 270, PIE);
      arc(x - cellSize / 6, y + cellSize / 2, cellSize / circleSize, cellSize / circleSize, 180, 360, PIE);
      arc(x + cellSize / 6, y + cellSize / 2, cellSize / circleSize, cellSize / circleSize, 180, 360, PIE);
      arc(x - cellSize / 2, y + cellSize / 2, cellSize / circleSize, cellSize / circleSize, 270, 360, PIE);
      arc(x - cellSize / 2, y - cellSize / 6, cellSize / circleSize, cellSize / circleSize, 270, 450, PIE);
      arc(x - cellSize / 2, y + cellSize / 6, cellSize / circleSize, cellSize / circleSize, 270, 450, PIE);

      // ellipses in the centre

      ellipse(x - cellSize / 6, y - cellSize / 6, cellSize / circleSize, cellSize / circleSize);
      ellipse(x + cellSize / 6, y - cellSize / 6, cellSize / circleSize, cellSize / circleSize);
      ellipse(x + cellSize / 6, y + cellSize / 6, cellSize / circleSize, cellSize / circleSize);
      ellipse(x - cellSize / 6, y + cellSize / 6, cellSize / circleSize, cellSize / circleSize);
    }

    // draws the triangular styled cell in its two inverted variants

    function triangles(x, y) {

      // same as the other functions, randomises the two variants

      let triangleColourSwitch = random(0, 1);

      // logic gates for fill

      if (triangleColourSwitch < .5) {
        fill(128, 155, 194);
      } else {
        fill(108, 135, 174);
      }
      rect(x, y, cellSize, cellSize);

      if (triangleColourSwitch < .5) {
        
        fill(108, 135, 174);
      } else {
        fill(128, 155, 194);
      }

      // draw the triangles using a custom shape

      beginShape();
      vertex(x - cellSize / 2, y + cellSize / 2);
      vertex(x - cellSize / 2, y - cellSize / 2);
      vertex(x, y + cellSize / 2);
      vertex(x, y - cellSize / 2);
      vertex(x + cellSize / 2, y + cellSize / 2);
      endShape(CLOSE)
    }
  }


  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function (settings) {
    this.eye_type = map(settings[0], 0, 100, 0, 1);
    this.right_eyeBrow_height = map(settings[1], 0, 100, 0, 1);
    this.left_eyeBrow_height = map(settings[2], 0, 100, 0, 1);
    this.mouth_type = map(settings[3], 0, 100, 0, 1);
    this.bridge_direction = map(settings[4], 0, 100, 0, 1);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function () {
    let settings = new Array(3);
    settings[0] = map(this.eye_type, 0, 1, 0, 100);
    settings[1] = map(this.right_eyeBrow_height, 0, 1, 0, 100);
    settings[2] = map(this.left_eyeBrow_height, 0, 1, 0, 100);
    settings[3] = map(this.mouth_type, 0, 1, 0, 100);
    settings[4] = map(this.bridge_direction, 0, 1, 0, 100);
    return settings;
  }
}