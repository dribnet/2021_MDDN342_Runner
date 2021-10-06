function sapsford_draw_one_frame(cur_frac) {
    rectMode(RADIUS);
    ellipseMode(RADIUS);
    colorMode(RGB);
    angleMode(DEGREES);

  // note: to clear the screen draw a rectangle
  // that is width x height - like this
  noStroke();
  let bg1 = color(60, 21, 59)
  let bg2 = color(91, 32, 89)
  let interpForward = lerpColor(bg1, bg2, cur_frac)
  let interpBack = lerpColor(bg2, bg1, cur_frac)
  if(cur_frac < 0.5){
      fill(interpForward)
    } else{
      fill(interpBack)
    }

  rect(0, 0, width, height);
  angleMode(DEGREES);
  colorMode(RGB)

  let half_width = width / 2;

  //Main centre arc variables
  let base_scale = width*0.9
  let base_angle = 180
  let steps = 5;
  let cur_scale = map(cur_frac,0,1,0,base_scale);
  let cur_deg = map(cur_frac,0,1,0,base_angle);
  let opacEle =  map(cur_frac,0,1,0.1,0.25)

  fill('rgba(220,171,107,0.2)');

  //I have added line breaks between arguments for these shapes for readability purposes
  //arc begins as a circle and eventually collapses on itself. size increases proportionate to cur_frac
  for(let i=0; i<steps; i++){
    arc(
      width/2, //x pos
      width/10, //y pos
      cur_scale/steps+(base_scale/steps+1)*i, //width
      cur_scale/steps+(base_scale/steps+1)*i, //height
      270+(cur_deg/steps+(base_angle/steps)*i), //arc start
      270-(cur_deg/steps+(base_angle/steps)*i) //arc stop
    )
  }

  //(cor)ner arcs
  let cor_deg = map(cur_frac,0,1,0,360); //corner angle variable
  let ref = -cor_deg //inverse used for the one on the other side
  let cor_height = width * 0.60 //proportionate to width to scale properly
  let cor_width = width * 1

  for(let i=0; i<4; i++){
    arc(-50,-50,cor_height,cor_width,
      cor_deg/i,
      cor_deg+(90/i) //staggeres the stop, creating a 'chasing' effect
    )
    arc(width+50,-50,cor_height,cor_width,
      (ref-(90/i))-180,
      (ref/i)-180
    )

  }

  //(cir)cle variables
  let cir_basescale = width*0.10 //cir(cle) scale variable
  let cir_offset = width*0.10 //the origin point for the smallest circles
  let cur_x = map(cur_frac,0,1,0,width/2); // (cur)rent x for individual circles
  let cir_y = map(cur_frac*cur_frac,0,1,0,height); //y value for each row, based on the steps
  let cir_scale = map(cur_frac,0,1,0,cir_basescale)
  let steps2 = 5 //outermost channels of circles
  let steps3 = 4
  let steps4 = 3 //centremost channel of circles

//left, left-centre, centre, right-centre, right channels of circles, respectively
  for(let i=0; i<steps2; i++){
    circle(
      (cur_x/steps2+(width/2/steps2+1)*i)+width/2,
      (cir_y/steps2+(height/steps2)*i)+cir_offset,
      cir_scale/steps2+(cir_basescale/steps2)*i
    )
  }
  for(let i=0; i<steps3; i++){
    circle(
      ((cur_x/2)/steps3+(width/4/steps3+1)*i)+width/2,
      (cir_y/steps3+(height/steps3)*i)+cir_offset,
      cir_scale/steps3+(cir_basescale/steps3)*i
    )
  }
  for(let i=0; i<steps4; i++){
    circle(
      width/2,
      (cir_y/steps4+(height/steps4)*i)+cir_offset,
      cir_scale/steps4+(cir_basescale/steps4)*i
    )
  }
  for(let i=0; i<steps3; i++){
    circle(
      -((cur_x/2)/steps3+(width/4/steps3+1)*i)+width/2,
      (cir_y/steps3+(height/steps3)*i)+cir_offset,
      cir_scale/steps3+(cir_basescale/steps3)*i
    )
  }
  for(let i=0; i<steps2; i++){
    circle(
      -(cur_x/steps2+(width/2/steps2+1)*i)+width/2,
      (cir_y/steps2+(height/steps2)*i)+cir_offset,
      cir_scale/steps2+(cir_basescale/steps2)*i
    )
  }





  // note: you can draw optional things depending on "debugView"
  if (debugView) {
    // we'll draw our "keyframes"
    noFill();
    stroke(255, 0, 0);
    strokeWeight(height/100);
    // here we "plug in" the values when cur_frac is 0
    rect(-half_width, 0, rect_width, height);
    rect( width - half_width, 0, rect_width, height);
    rect(-width - half_width, 0, rect_width, height);
  }

    rectMode(CORNER);
    ellipseMode(CENTER);
    // colorMode(RGB);
    // angleMode(RADIANS);
}
