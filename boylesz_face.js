/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
// var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used
// const bg_color_boy = [225, 206, 187];
// const fg_color = [151, 102, 52];
// const stroke_color = [95, 52, 8];

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

function BoylesFace() {

  this.line_color = 0; // can be either 0 (purple = masculine) or 1 (blue = feminine)
  this.line_colors_arr = [[146, 9, 173], [64, 245, 233]];
  this.face_color = 100; // range is 80 to 230
  this.eye_color = 0; // range is 0 to 1 (darkness of hair)

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge,
   */
  this.draw = function(positions) {
    // Draw mask backing
    fill(this.face_color);
    noStroke();
    beginShape();
    vertex(-2, -1);
    bezierVertex(
      -2, 1,
      -1, 2,
      0, 2
    );
    bezierVertex(
      1, 2,
      2, 1,
      2, -1
    );
    bezierVertex(
      2, -2,
      1.7, -3,
      0, -3
    );
    bezierVertex(
      -1.7, -3,
      -2, -2,
      -2, -1
    );
    endShape(CLOSE);

    // Draw eyes
    fill(20);
    noStroke();
    for (let i = -1; i <= 1; i += 2) {
      push();
      scale(1.15);
      beginShape();
      vertex(i * 0.35, -0.8);
      bezierVertex(
        i * 0.32, -0.8,
        i * 0.48, -1.08,
        i * 0.69, -1.17
      );
      bezierVertex(
        i * 0.9, -1.25,
        i * 1.2, -1.19,
        i * 1.25, -1.1
      );
      bezierVertex(
        i * 1.27, -1.04,
        i * 1.16, -0.92,
        i * 1.13, -0.89
      );
      bezierVertex(
        i * 0.86, -0.65,
        i * 0.36, -0.78,
        i * 0.35, -0.8
      );
      endShape();
      pop();
    }
    // Pupils
    let pupilColor = lerpColor(color(255), color(148, 15, 6), this.eye_color);
    fill(pupilColor);
    noStroke();
    ellipse(0.9, -1.1, 0.3);
    ellipse(-0.9, -1.1, 0.3);
    // Irises
    fill(0);
    ellipse(0.9, -1.1, 0.15);
    ellipse(-0.9, -1.1, 0.15);

    // Draw lines
    noFill()
    let centre = this.calcBezierPoint([2, -1], [2, 1], [1, 2], [0, 2], 0.9);
    let topSide = this.calcBezierPoint([0, -3], [-1.7, -3], [-2, -2], [-2, -1], 0.27);
    let bottomSide = this.calcBezierPoint([-2, -1], [-2, 1], [-1, 2], [0, 2], 0.47);

    let mouthOpeness = positions.bottom_lip[3][1] - positions.top_lip[3][1];
    let lineBrightness = int(map(mouthOpeness, 0.3, 0.7, 2, 5));
    let c = this.line_colors_arr[this.line_color];

    for (let j = lineBrightness + 1; j > -1; j--) {
      if (j == 0) {
        stroke(c[0], c[1], c[2]);
        strokeWeight(0.03);
      } else if (j > lineBrightness) {
        stroke(20);
        strokeWeight(0.05);
      } else {
        stroke(c[0], c[1], c[2], 100 - 15 * j);
        strokeWeight(0.05 + j * 0.03);
      }
      line(0, -3, 0, -2.25);
      for (let i = -1; i <= 1; i += 2) {
        // Centre lines
        beginShape();
        vertex(0, -2.25);
        vertex(i * 0.17, -2);
        vertex(i * 0.17, -0.3);
        vertex(i * 0.5, -0.4);
        vertex(i * 0.5, 0);
        vertex(i * 0.17, 0.1);
        vertex(i * centre.x, 0.4);
        vertex(i * centre.x, centre.y);
        endShape();

        // Top side lines
        beginShape();
        vertex(i * topSide.x, topSide.y);
        vertex(i * topSide.x, -1.85);
        vertex(i * -1.65, -1.55);
        vertex(i * -1.65, -1);
        endShape();
        let p = p5.Vector.lerp(createVector(i * topSide.x, -1.85), createVector(i * -1.65, -1.55), 0.6);
        line(p.x, p.y, p.x, -2.2);

        // Bottom side lines
        beginShape();
        vertex(i * bottomSide.x, bottomSide.y);
        vertex(i * topSide.x, 1);
        vertex(i * topSide.x, 0.3);
        vertex(i * -1.65, 0);
        endShape();
      }
    }
  }

  // This function returns a point along a cubic bezier curve
  this.calcBezierPoint = function(p0, p1, p2, p3, t) {
    p0 = createVector(p0[0], p0[1]);
    p1 = createVector(p1[0], p1[1]);
    p2 = createVector(p2[0], p2[1]);
    p3 = createVector(p3[0], p3[1]);

    p0.mult(-1 * pow(t, 3) + 3 * pow(t, 2) - 3 * t + 1);
    p1.mult(3 * pow(t, 3) - 6 * pow(t, 2) + 3 * t);
    p2.mult(-3 * pow(t, 3) + 3 * pow(t, 2));
    p3.mult(pow(t, 3));
    return p0.add(p1.add(p2.add(p3)));
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.line_color = int(map(settings[0], 0, 100, 0, 1));
    this.face_color = map(settings[1], 0, 100, 80, 230);
    this.eye_color = map(settings[2], 0, 100, 0, 1);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.line_color, 0, 1, 0, 100);
    settings[1] = map(this.face_color, 80, 230, 0, 100);
    settings[2] = map(this.eye_color, 0, 1, 0, 100);
    return settings;
  }
}
