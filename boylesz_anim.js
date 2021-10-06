function Boyles_draw_one_frame(cur_frac) {
  angleMode(DEGREES);

  // Background
  noStroke();
  fill(45, 93, 94);
  rect(0, 0, width, height);

  // Moon
  fill(226, 252, 249);
  noStroke();
  ellipse(760, 100, 170);

  // Bottom wave
  fill(25, 67, 55);
  stroke(16, 43, 36);
  strokeWeight(3)
  beginShape();
  vertex(width + 10, height - height / 5);
  vertex(width + 10, height + 10);
  vertex(-10, height + 10);
  vertex(-10, height - height / 5);
  for (let i = 0; i < width; i++) {
    let phase = cur_frac * 360 + 100;
    let y = 5 * sin(i + phase) + 4 * sin(i);
    vertex(i, height - height / 5 + y);
  }
  endShape(CLOSE);

  // Trees
  let treeKeyFrames = [
    -0.45 * width,
    0.0 * width,
    0.45 * width,
    0.9 * width,
    1.35 * width
  ];
  for (let i = 0; i < treeKeyFrames.length - 1; i++) {
    let curTreeX = map(cur_frac, 0, 1, treeKeyFrames[i + 1], treeKeyFrames[i]);
    tree(curTreeX, height - height / 8, height);
  }

  fill(25, 67, 55);
  noStroke();
  beginShape();
  vertex(width + 10, height - height / 5);
  vertex(width + 10, height + 10);
  vertex(-10, height + 10);
  vertex(-10, height - height / 5);
  for (let i = 0; i < width; i++) {
    let phase = cur_frac * 360 + 100;
    let y = 5 * sin(i + phase) + 4 * sin(i * 1.5);
    vertex(i, height - height / 7 + y);
  }
  endShape(CLOSE);

  // Top wave
  fill(47, 84, 97, 150);
  noStroke();
  beginShape();
  vertex(width + 10, height / 15);
  vertex(width + 10, -10);
  vertex(-10, -10);
  vertex(-10, height / 15);
  for (let i = 0; i < width; i++) {
    let phase = cur_frac * 360;
    let y = 10 * sin(i + phase) + 4 * sin(i * 2.5 + 70);
    vertex(i, height / 2 + y);
  }
  endShape(CLOSE);
  beginShape();
  vertex(width + 10, height / 15);
  vertex(width + 10, -10);
  vertex(-10, -10);
  vertex(-10, height / 15);
  for (let i = 0; i < width; i++) {
    let phase = cur_frac * 360;
    let y = 10 * sin(i + phase + 140) + 4 * sin(i * 3.5 + 70);
    vertex(i, height / 5 + y);
  }
  endShape(CLOSE);

  // Mist
  fill(210, 10);
  noStroke();
  for (let i = 0; i < 20; i++) {
    rect(0, height - 110 - 5 * i, width, 100);
  }
}

function tree(x, y, ch) {
  let th = ch / 1.3;
  push();
  translate(x, y);
  // Trunk
  stroke(12, 30, 40);
  strokeWeight(th / 15);
  line(0, 0, -th / 7, -th / 4);
  strokeWeight(th / 17);
  line(-th / 7, -th / 4, -th / 10, -3 * th / 5);
  strokeWeight(th / 19);
  line(-th / 10, -3 * th / 5, th / 6, -7 * th / 9);
  branch(th / 6, -7 * th / 9, 3 * th / 10, -th, th, 21);
  // Left branch
  strokeWeight(th / 23);
  line(-th / 10, -3 * th / 5, -th / 4, -5 * th / 7);
  branch(-th / 4, -5 * th / 7, -3 * th / 8, -4.5 * th / 8, th, 25);
  strokeWeight(th / 25);
  line(-th / 4, -5 * th / 7, -3 * th / 10, -7 * th / 8);
  strokeWeight(th / 27);
  line(-3 * th / 10, -7 * th / 8, -th / 6, -th);
  branch(-3 * th / 10, -7 * th / 8, -4.7 * th / 10, -7.4 * th / 8, th, 27);
  branch(-th / 6, -th, -th / 30, -19 * th / 20, th, 29);
  strokeWeight(th / 25);
  line(th / 6, -7 * th / 9, 3.5 * th / 10, -5.5 * th / 8);
  strokeWeight(th / 27);
  branch(3.5 * th / 10, -5.5 * th / 8, 4 * th / 10, -th / 2, th, 27);
  pop();
}

function branch(x1, y1, x2, y2, th, startW) {
  let start = createVector(x1, y1);
  let end = createVector(x2, y2);
  let p1, p2;
  for (let i = 0; i < 10; i++) {
      p1 = p5.Vector.lerp(start, end, i * 0.1);
      p2 = p5.Vector.lerp(start, end, (i + 1) * 0.1);
      strokeWeight(th / (startW + i * 3));
      line(p1.x, p1.y, p2.x, p2.y);
  }
}