let noise_01 = 1;
let noise_02 = 1;
let noise_03 = 1;
let opacity = 1;
let smoothVal = 100;
const ease_ge = new p5.Ease();

function ge_draw_one_frame(cur_frac) {
  // draw the background every time
  drawBG();

  // initialize the values
  let blue = color(99, 176, 242);
  let purple = color('#D02E9D');
  let frame = floor(map(cur_frac, 0, 1, 0, 24)); // get an integer from 0 to 23 as integers (current frame)
  // set an array of 24 values going up and down
  let arr1 = linspace(0, 1, 12);
  let arr2 = (linspace(1, 0, 12));
  let arr = concat(arr1, arr2);

  // if not the debug view, draw the wallpaper
  if(!debugView) {
    strokeWeight(width*0.001);
    // initialize the values, and make sure they all fit in different size of canvas
    let die_size = width * 0.06; gap_y = height/4-die_size*2, gap_x = die_size*0.2;
    let set_width = die_size * 2 * 6 + gap_x * 6;
    let row = 0;

    // draw dice to fill the screen
    for (var y = die_size+gap_y*2; y <= height-die_size; y += die_size*2+gap_y) { // y position of the dice
      for (var i = 0; i < width/set_width; i++) { // how many sets will be drawn
        let gap = set_width / 6 + gap_x, x = die_size + i * (set_width+die_size+gap_x); // set the gap between die and x position
        if (row % 2 == 0) { x = die_size*2 + i * (set_width+die_size+gap_x);} // every line with even numbers will have an x offset
        drawD4(x+gap_x, y+getEaseValue(arr, 0+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD6(x+gap, y+getEaseValue(arr, 1+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD8(x+gap*2, y+getEaseValue(arr, 2+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD10(x+gap*3, y+getEaseValue(arr, 3+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD12(x+gap*4, y+getEaseValue(arr, 4+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD20(x+gap*5, y+getEaseValue(arr, 5+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
      }
      row++;
    }
  }

  // if debug view, draw only two set
  if (debugView) {
    strokeWeight(height*0.01);

    // here we draw three set of dice
    let die_size = width*0.07, gap_y = height*0.015, gap_x = width*0.005;
    let set_width = die_size * 2 * 6 + gap_x * 6;
    let row = 0;

    for (var y = die_size*1.5; y <= height-die_size; y += die_size*2+gap_y) {
      for (var i = 0; i < width/set_width; i++) {
        let gap = set_width / 6 + gap_x, x = die_size + i * (set_width+die_size+gap_x);
        if (row % 2 == 0) { x = die_size*2 + i * (set_width+die_size+gap_x);}
        drawD4(x+gap_x, y+getEaseValue(arr, 0+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD6(x+gap, y+getEaseValue(arr, 1+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD8(x+gap*2, y+getEaseValue(arr, 2+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD10(x+gap*3, y+getEaseValue(arr, 3+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD12(x+gap*4, y+getEaseValue(arr, 4+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
        drawD20(x+gap*5, y+getEaseValue(arr, 5+i*6, frame, die_size), die_size, cur_frac, blue, purple, i*row, true);
      }
      row++;
    }
  }
}

/* draw a die with 4 faces */
function drawD4(x, y, size, step, c1, c2, str, isGrad) {
  if(!checkWidBounds(x, size) || !checkHeightBounds(y, size)) return;
  arr = setNoise(x, y, c1, c2, step, "d4_0", str, isGrad);
  c1 = arr[0]; c2 = arr[1];
  let br = p5.Vector.fromAngle(radians(30), size*noise_01); // bottom right
  let bl = p5.Vector.fromAngle(radians(150), size*noise_02); // bottom left
  let t = p5.Vector.fromAngle(radians(270), size*noise_03); // top
  let cols = [color('#9C4F96'), color('#FF6355'), color('#FBA949'), color('#FAE442'), color('#8BD448'), color('#2AA8F2')];
  push();
    translate(x, y);
    gradientLine(0, 0, br.x, br.y, c1, c2, step);
    gradientLine(0, 0, bl.x, bl.y, c1, c2, step);
    gradientLine(0, 0, t.x, t.y, c1, c2, step);
    gradientLine(bl.x, bl.y, br.x, br.y, c1, c2, step);
    gradientLine(t.x, t.y, bl.x, bl.y, c1, c2, step);
    gradientLine(br.x, br.y, t.x, t.y, c1, c2, step);
  pop();
}

/* draw a die with 6 faces */
function drawD6(x, y, size, step, c1, c2, str, isGrad) {
  if(!checkWidBounds(x, size) || !checkHeightBounds(y, size)) return;
  setNoise(x, y, c1, c2, step, "d6_0", str, isGrad);
  let len = size * 0.92;
  let b = p5.Vector.fromAngle(radians(90), len*noise_01); // bottom
  let tl = p5.Vector.fromAngle(radians(210), len*noise_02); // top left
  let tr = p5.Vector.fromAngle(radians(-30), len*noise_03); // top right
  let t = p5.Vector.fromAngle(radians(-90), len*noise_02); // top
  let br = p5.Vector.fromAngle(radians(30), len*noise_01); // bottom right
  let bl = p5.Vector.fromAngle(radians(150), len*noise_03); // bottom left
  push();
    translate(x, y);
    // top face
    gradientLine(0, 0, tl.x, tl.y, c1, c2, step);
    gradientLine(0, 0, tr.x, tr.y, c1, c2, step);
    gradientLine(tl.x, tl.y, t.x, t.y, c1, c2, step);
    gradientLine(t.x, t.y, tr.x, tr.y, c1, c2, step);
    // right face
    gradientLine(0, 0, b.x, b.y, c1, c2, step);
    gradientLine(br.x, br.y, b.x, b.y, c1, c2, step);
    gradientLine(br.x, br.y, tr.x, tr.y, c1, c2, step);
    // left face
    gradientLine(tl.x, tl.y, bl.x, bl.y, c1, c2, step);
    gradientLine(b.x, b.y, bl.x, bl.y, c1, c2, step);
  pop();
}

/* draw a die with 8 faces */
function drawD8(x, y, size, step, c1, c2, str, isGrad) {
  if(!checkWidBounds(x, size) || !checkHeightBounds(y, size)) return;
  setNoise(x, y, c1, c2, step, "d8_0", str, isGrad);
  let wid = size / tan(radians(60));
  let len = wid / cos(radians(30));
  let r = p5.Vector.fromAngle(radians(0), wid*noise_01); // right
  let tr = p5.Vector.fromAngle(radians(-30), len*noise_02); // top right
  let t = p5.Vector.fromAngle(radians(-90), size*noise_03); // top
  let tl = p5.Vector.fromAngle(radians(-150), len*noise_03); // top left
  let l = p5.Vector.fromAngle(radians(180), wid*noise_02); // left
  let b = p5.Vector.fromAngle(radians(90), size*0.6*noise_01); // bottom
  push();
    translate(x, y);
    // front face
    gradientLine(t.x, t.y, r.x, r.y, c1, c2, step);
    gradientLine(t.x, t.y, l.x, l.y, c1, c2, step);
    gradientLine(l.x, l.y, r.x, r.y, c1, c2, step);
    // left face
    gradientLine(l.x, l.y, tl.x, tl.y, c1, c2, step);
    gradientLine(tl.x, tl.y, t.x, t.y, c1, c2, step);
    // right face
    gradientLine(tr.x, tr.y, r.x, r.y, c1, c2, step);
    gradientLine(tr.x, tr.y, t.x, t.y, c1, c2, step);
    // bottom face
    gradientLine(b.x, b.y, r.x, r.y, c1, c2, step);
    gradientLine(b.x, b.y, l.x, l.y, c1, c2, step);
  pop();
}

/* draw a die with 10 faces */
function drawD10(x, y, size, step, c1, c2, str, isGrad) {
  if(!checkWidBounds(x, size) || !checkHeightBounds(y, size)) return;
  setNoise(x, y, c1, c2, step, "d10_0", str, isGrad);
  let len = size * 0.92;
  let w = (len/2) / cos(radians(20));
  let mr = p5.Vector.fromAngle(radians(-20), w*noise_01); // middle right
  let r = p5.Vector.fromAngle(radians(0), len*noise_02); // right
  let t = p5.Vector.fromAngle(radians(-90), len*noise_03); // top
  let ml = p5.Vector.fromAngle(radians(-160), w*noise_03); // middle left
  let l = p5.Vector.fromAngle(radians(180), len*noise_02); // left
  let b = p5.Vector.fromAngle(radians(90), len*noise_01); // bottom
  push();
    translate(x, y);
    // front face
    gradientLine(t.x, t.y, ml.x, ml.y, c1, c2, step);
    gradientLine(ml.x, ml.y, 0, 0, c1, c2, step);
    gradientLine(mr.x, mr.y, 0, 0, c1, c2, step);
    gradientLine(mr.x, mr.y, t.x, t.y, c1, c2, step);
    // left face
    gradientLine(ml.x, ml.y, l.x, l.y, c1, c2, step);
    gradientLine(l.x, l.y, t.x, t.y, c1, c2, step);
    // right face
    gradientLine(mr.x, mr.y, r.x, r.y, c1, c2, step);
    gradientLine(r.x, r.y, t.x, t.y, c1, c2, step);
    // bottom faces
    gradientLine(b.x, b.y, l.x, l.y, c1, c2, step);
    gradientLine(b.x, b.y, r.x, r.y, c1, c2, step);
    gradientLine(b.x, b.y, 0, 0, c1, c2, step);
  pop();
}

/* draw a die with 12 faces */
function drawD12(x, y, size, step, c1, c2, str, isGrad) {
  if(!checkWidBounds(x, size) || !checkHeightBounds(y, size)) return;
  setNoise(x, y, c1, c2, step, "d12_0", str, isGrad);
  let middle_w = (size) / cos(radians(15));
  let inner_w = (size/2) / cos(radians(30));
  let ir =  p5.Vector.fromAngle(radians(30), inner_w * noise_01); // inner right
  let r =   p5.Vector.fromAngle(radians(-5),    size * noise_03); // right
  let mr =  p5.Vector.fromAngle(radians(15),middle_w * noise_02); // middle right
  let tr =  p5.Vector.fromAngle(radians(-70),   size * noise_01); // top right
  let ur =  p5.Vector.fromAngle(radians(-45),   size * noise_03); // upper right
  let br =  p5.Vector.fromAngle(radians(75),    size * noise_02); // bottom right
  let lr =  p5.Vector.fromAngle(radians(45),    size * noise_01); // lower right
  let mlr = p5.Vector.fromAngle(radians(15),    size * noise_03); // middle lower left

  let mt =  p5.Vector.fromAngle(radians(-90),inner_w * noise_02); // middle top

  let il =  p5.Vector.fromAngle(radians(150), inner_w * noise_01); // inner left
  let l =   p5.Vector.fromAngle(radians(185),    size * noise_03); // left
  let ml =  p5.Vector.fromAngle(radians(175),middle_w * noise_02); // middle left
  let tl =  p5.Vector.fromAngle(radians(-110),   size * noise_01); // top left
  let ul =  p5.Vector.fromAngle(radians(-135),   size * noise_03); // upper left
  let bl =  p5.Vector.fromAngle(radians(105),    size * noise_02); // bottom left
  let ll =  p5.Vector.fromAngle(radians(135),    size * noise_01); // lower left
  let mll = p5.Vector.fromAngle(radians(165),    size * noise_03); // middle lower left
  push();       
    translate(x, y);
    // front face
    gradientLine(0, 0, il.x, il.y, c1, c2, step);
    gradientLine(il.x, il.y, bl.x, bl.y, c1, c2, step);
    gradientLine(bl.x, bl.y, br.x, br.y, c1, c2, step);
    gradientLine(br.x, br.y, ir.x, ir.y, c1, c2, step);
    gradientLine(0, 0, ir.x, ir.y, c1, c2, step);
    // left face
    gradientLine(0, 0, mt.x, mt.y, c1, c2, step);
    gradientLine(mt.x, mt.y, ul.x, ul.y, c1, c2, step);
    gradientLine(l.x, l.y, ul.x, ul.y, c1, c2, step);
    gradientLine(l.x, l.y, il.x, il.y, c1, c2, step);
    // right face
    gradientLine(0, 0, ir.x, ir.y, c1, c2, step);
    gradientLine(ir.x, ir.y, r.x, r.y, c1, c2, step);
    gradientLine(r.x, r.y, ur.x, ur.y, c1, c2, step);
    gradientLine(mt.x, mt.y, ur.x, ur.y, c1, c2, step);
    // bottom faces
    gradientLine(bl.x, bl.y, ll.x, ll.y, c1, c2, step);
    gradientLine(ll.x, ll.y, mll.x, mll.y, c1, c2, step);
    gradientLine(l.x, l.y, mll.x, mll.y, c1, c2, step);
    gradientLine(br.x, br.y, lr.x, lr.y, c1, c2, step);
    gradientLine(lr.x, lr.y, mlr.x, mlr.y, c1, c2, step);
    gradientLine(r.x, r.y, mlr.x, mlr.y, c1, c2, step);
    // top face
    gradientLine(tr.x, tr.y, ur.x, ur.y, c1, c2, step);
    gradientLine(tl.x, tl.y, ul.x, ul.y, c1, c2, step);
    gradientLine(tl.x, tl.y, tr.x, tr.y, c1, c2, step);
  pop();
}

/* draw a die with 20 faces */
function drawD20(x, y, size, step, c1, c2, str, isGrad) {
  if(!checkWidBounds(x, size) || !checkHeightBounds(y, size)) return;
  setNoise(x, y, c1, c2, step, "d20_0", str, isGrad);
  let len = size * cos(radians(30)) * 1.1;
  let wid = size/2 * 1.1;
  let t =  p5.Vector.fromAngle(radians(-90),  len * noise_02); // top

  let tr = p5.Vector.fromAngle(radians(-30),  len * noise_02); // top right
  let mr = p5.Vector.fromAngle(radians(-35),  wid * noise_01); // middle right
  let lr = p5.Vector.fromAngle(radians(25),   len * noise_03); // lower right

  let tl = p5.Vector.fromAngle(radians(-150), len * noise_01); // top left
  let ml = p5.Vector.fromAngle(radians(-145), wid * noise_03); // middle left
  let ll = p5.Vector.fromAngle(radians(155),  len * noise_01); // lower left

  let lm = p5.Vector.fromAngle(radians(90),   wid * noise_02); // lower middle
  let b =  p5.Vector.fromAngle(radians(90),   len * noise_03); // bottom

  push();
    translate(x, y);
    // middle face
    gradientLine(mr.x, mr.y, ml.x, ml.y, c1, c2, step);
    gradientLine(mr.x, mr.y, lm.x, lm.y, c1, c2, step);
    gradientLine(lm.x, lm.y, ml.x, ml.y, c1, c2, step);
    // left faces
    gradientLine(lm.x, lm.y, ll.x, ll.y, c1, c2, step);
    gradientLine(ll.x, ll.y, ml.x, ml.y, c1, c2, step);
    gradientLine(tl.x, tl.y, ll.x, ll.y, c1, c2, step);
    gradientLine(tl.x, tl.y, ml.x, ml.y, c1, c2, step);
    // right faces
    gradientLine(lm.x, lm.y, lr.x, lr.y, c1, c2, step);
    gradientLine(lr.x, lr.y, mr.x, mr.y, c1, c2, step);
    gradientLine(tr.x, tr.y, lr.x, lr.y, c1, c2, step);
    gradientLine(tr.x, tr.y, mr.x, mr.y, c1, c2, step);
    // top faces
    gradientLine(tr.x, tr.y, t.x, t.y, c1, c2, step);
    gradientLine(mr.x, mr.y, t.x, t.y, c1, c2, step);
    gradientLine(tl.x, tl.y, t.x, t.y, c1, c2, step);
    gradientLine(ml.x, ml.y, t.x, t.y, c1, c2, step);
    // bottom faces
    gradientLine(lm.x, lm.y, b.x, b.y, c1, c2, step);
    gradientLine(ll.x, ll.y, b.x, b.y, c1, c2, step);
    gradientLine(lr.x, lr.y, b.x, b.y, c1, c2, step);
  pop();

}

/* draw a gradient line with colors flows */
function gradientLine(x0, y0, x1, y1, c1, c2, s) {
  let d = dist(x0, y0, x1, y1); // the length of the line
  let prevX = x0, prevY = y0;
  for (var i = 1; i < d; i++) {
    let step = map(i, 0, d, 0, 1); 
    let c, col_step;
    // getting the x1, y1 for the line fragment 
    let x = lerp(x0, x1, step);
    let y = lerp(y0, y1, step);
    // getting the color from the current frame and the lerp color
    if (step <= s) {
      col_step = map(step, 0, s, 0, 1);
      c = lerpColor(c1, c2, col_step);
    } else {
      col_step = map(step, s, 1, 0, 1);
      c = lerpColor(c1, c2, col_step);
    }
    stroke(c);
    line(prevX, prevY, x, y);
    prevX = x;
    prevY = y;
  }
}

/* check the width boundaries for die's x position */
function checkWidBounds(x, size) {
  if (x > width-size) { return false; }
  else { return true; }
}

/* check the height boundaries for die's y position */
function checkHeightBounds(y, size) {
  if (y > height) { return false; }
  else { return true; }
}

/* get average noise value for the global opacity */
function getOpacity(x, y, step){
  let opacity2 = getNoiseValue(x, y, step, "opacity", 50, 255, smoothVal);
  let opacity1 = getNoiseValue(x, y, 0, "opacity", 50, 255, smoothVal);
  return map(0.5, 0, 1, opacity2, opacity1);
}

/* get average noise value for dice's line's length size */
function getNoise(x, y, step, str){
  let noise2 = getNoiseValue(x, y, step, str, 0.9, 1.1, 300);
  let noise1 = getNoiseValue(x, y, 0, str, 0.9, 1.1, 300);
  return map(0.5, 0, 1, noise2, noise1);
}

/* set the noice and color value from the given conditions */
function setNoise(x, y, c1, c2, step, prefix, str, isGrad) {
  let arr = []; // array to store output colors
  if (isGrad) {
    opacity = getOpacity(x, y, step);
    c1.setAlpha(opacity); c2.setAlpha(opacity);
    noise_01 = getNoise(x, y, step, prefix+"1"+str);
    noise_02 = getNoise(x, y, step, prefix+"2"+str);
    noise_03 = getNoise(x, y, step, prefix+"3"+str);
  } else {
    noise_01 = 1; noise_02 = 1; noise_03 = 1; // is not gradient, don't change sizes
  }
  arr.push(c1);
  arr.push(c2);
  return arr;
}

/** return an array with size of the given number, 
 * with maximum(not included) and minimin provided, and evenly spaced
 * @param x --- minimum
 * @param y --- maximum
 * @num --- the size of the array
 */
function linspace(x, y, num) {
  let result = [];
  let step = (y-x)/num;
  for (let i = 0; i < num; i++) {
    result[i] = x + i * step;
  }
  return result;
}

/** get a value out of array, 
 * if the index is exceeding the array size, 
 * loop it from the start 
 */
function arrayAt(arr, index) {
  let len = arr.length;
  return arr[index % len];
}

/** get a easing value from the given number, and map it from 0 to maximum
 * @param arr --- the array that contains all the step values
 * @param index --- the starting position in the array
 * @param frame --- the current position in the array
 * @param max --- the maximum number of the output value
 */
function getEaseValue(arr, index, frame, max) {
  return map(ease_ge.quadraticInOut(arrayAt(arr, index+frame)), 0, 1, 0, max);
}

/* draw a background with a subtle brown color at the middle */
function drawBG() {
  let dark = color(97, 66, 47);
  let light = color(158, 108, 77);
  let gap = width * 0.03;
  fill(10);
  rect(0, 0, width, height);
  noStroke();
  for (let i = 1; i <= 15; i++) {
    let step = map(i, 1, 15, 0, 1);
    let col = lerpColor(dark, light, step);
    col.setAlpha(7);
    fill(col);
    ellipse(width/2, height/2, width-i*gap, height-i*gap);
  }
}

