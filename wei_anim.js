const ease_wei = new p5.Ease();

 function wei_draw_one_frame(cur_frac) {

  // blur
  noStroke();
  fill(240);
  rect(0, 0, width, height);
  fill(0);
  let num_cols = 99;
  let num_rows = 55;
  let cell_height = height / num_rows;
  let cell_width = width / num_cols;

  let size_smoothness = 1;

  for(let col=0; col<num_cols; col++) {
    let cur_x = col * cell_width;
    for(let row=0; row<num_rows; row++) {
      let cur_y = row * cell_height;
      let brightness = getNoiseValue(cur_x, cur_y, cur_frac, "brightness", 0, 255, size_smoothness);
      let fill_color = int(brightness);
   fill(fill_color-10,fill_color+50,fill_color-30);
      rect(cur_x, cur_y, cell_width-1, cell_height-1);
    }
  }
 
push();
translate(-80,10);
  push()
   angleMode(DEGREES);
   //head left 
   // noStroke();
   // fill(171, 132, 103);
   // rect(0, 0, width, height);
   fill(158, 156, 153);
   rect(250, 120, 150, 100);
   fill(135, 133, 128);
   beginShape();
   vertex(250, 120);
   vertex(225, 145);
   vertex(225, 200);
   vertex(250, 220);
   endShape(CLOSE);
   fill(126)
   beginShape();
   vertex(230, 150);
   vertex(225, 145);
   vertex(225, 200);
   vertex(230, 220);
   endShape(CLOSE);

   stroke(126);
   strokeWeight(4)
   line(248,140,248,180);
   
   //eye left
   fill(207, 203, 198);
   noStroke();
   ellipse(280, 170, 30);
   ellipse(370, 170, 30);
   
   //airball
  let nudgeRight = getNoiseValue(0,0,cur_frac,"nudgeRight",0,70,1);
   let nudgeRight2 = getNoiseValue(0,0,cur_frac,"nudgeRight",0,6,1);
  push();
  stroke(255);
  strokeWeight(3);
  beginShape();
  curveVertex(450+nudgeRight, 150);//right
   curveVertex(460+nudgeRight, 200); 
  curveVertex(430+nudgeRight, 250); //left
  curveVertex(440+nudgeRight, 300); //top
  endShape();
   pop();

   push();
   fill(247, 97, 87);
   rotate(15);
   
   ellipse(500+nudgeRight,30, 70,90);
   pop();


  //body
  push();
  translate(300,320);
   rotate(10+nudgeRight/5);
   fill(158, 156, 153);
   rectMode(CENTER);
   rect(0, 0, 180, 100);
   pop();

   //hand 
    push();
  translate(300,320);
   rotate(10+nudgeRight2);
   fill(158, 156, 153);
   rectMode(CENTER);
   rect(100, -80, 30, 30);
   pop();

//lege 
    push();
  translate(300,320);
   rotate(10);
   fill(158, 156, 153);
   rectMode(CENTER);
   rect(100, 80, 30, 30);
   pop();

 push();
  translate(210,320);
   rotate(-10);
   fill(158, 156, 153);
   rectMode(CENTER);
   rect(0, 80, 30, 30);
   pop();
   
   pop()

   // robot2
   //easing 
   let amount_across = 0;
   amount_across = cur_frac * 2;
    const ease_amount_across = ease_wei.circularInOut(amount_across);
    const left_x = int(0.15 * width);
   const right_x = int(0.85 * width);
   let ellipse_radius = int(0.08*height);
    cur_x1 = map(amount_across, 0, 1, 0.03*left_x, 0.03*right_x);
    cur_x2 = map(ease_amount_across, 0, 1, 0.1*left_x, 0.1*right_x);
    let ellipse_y1 = int(0.25 * height);
    let ellipse_y2 = int(0.75 * height);
    fill(cur_x2+10,200-cur_x1,10*cur_x1)
    ellipse(-cur_x1+850, ellipse_y1-40, ellipse_radius-10);
    ellipse(cur_x2+620, ellipse_y1+230, ellipse_radius-10);

   push();
   translate(210,360);
   fill(255);
   rotate(-15);
   ellipse(550,cur_x1-20, 150,250);
   fill(150);
   ellipse(545,cur_x1-50, 120,70);
   fill(120);
   ellipse(520,cur_x1-50,10);
   ellipse(570,cur_x1-50,10);
   pop();
pop();
}