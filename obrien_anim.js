function obrien_draw_one_frame(cur_frac) {

  // Define colors
  let b1 = color(8,10,22);
  let b2 = color(126,150,254);

  //Variables
  var w = width;
  var h = height;
  var starSizeBig = height/80;
  var starSizeMed = height/80;
  var starSizeSmall = height/150;
  var headSize = height/2.5;
  var moonSize = height/7;
  var moonSizeF = height/7;
  var earSize = height/10;
  // note: to clear the screen draw a rectangle
  // that is width x height - like this
  noStroke();
  fill(10);
  rect(0, 0, width, height);

  // note: all shape sizes, line widths, etc. should be a
  // function of width and height
  let rect_width = height / 10.0;
  let half_width = rect_width / 2;

  // note: animation should progress depending on the
  // value of cur_frac which goes from 0 to 1, and it
  // should loop seamlessly
  let cur_x = map(cur_frac, 0, 1, 0, width) - half_width;

  setGradient(0, 0, width, height, b1, b2, 1);
  stars(w,h,starSizeBig,starSizeMed,starSizeSmall,cur_frac);
  drawMoons(w,h,moonSize);
  drawCharacter(w,h,cur_frac,headSize,earSize,moonSizeF);
  drawHair(w,h,cur_frac);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);

  }
}

function stars(w,h,starSizeBig,starSizeMed,starSizeSmall,cur_frac){
  let cur_twinkle;
  let cur_twinkleMed;

  if(cur_frac < 0.5){
    cur_twinkle = map(cur_frac, 0, 0.5, 50, 180);
    cur_twinkleMed = map(cur_frac, 0, 0.5, 255, 100);
  }
  else{
    cur_twinkle = map(cur_frac, 0.5, 1, 180, 50);
    cur_twinkleMed = map(cur_frac, 0.5, 1, 100, 255);
  }
  noStroke();
  fill(255, cur_twinkle);
  //Small Stars
  ellipse(w/2,h/2,starSizeSmall);
  ellipse(w/3,h/3,starSizeSmall);
  ellipse(w/2,h/4,starSizeSmall);
  ellipse(w/4,h/5,starSizeSmall);
  ellipse(w/5,h/1.5,starSizeSmall);
  ellipse(w/1.3,h/1.3,starSizeSmall);
  ellipse(w/1.1,h/5,starSizeSmall);
  ellipse(w/1.3,h/3,starSizeSmall);
  ellipse(w/4,h/2,starSizeSmall);
  ellipse(w/8,h/8,starSizeSmall);
  ellipse(w/10,h/3,starSizeSmall);
  ellipse(w/1.6,h/1.2,starSizeSmall);
  ellipse(w/40,h/2,starSizeSmall);
  ellipse(w/43,h/20,starSizeSmall);
  ellipse(w/35,h/1.1,starSizeSmall);
  ellipse(w/20,h/1.5,starSizeSmall);
  ellipse(w/7,h/1.2,starSizeSmall);
  ellipse(w/1.05,h/2,starSizeSmall);
  ellipse(w/1.01,h/40,starSizeSmall);
  ellipse(w/4,h/40,starSizeSmall);
  ellipse(w/1.5,h/10,starSizeSmall);
  ellipse(w/2.2,h/20,starSizeSmall);
  ellipse(w/1.2,h/10,starSizeSmall);
  ellipse(w/1.2,h/1.5,starSizeSmall);
  ellipse(w/1.1,h/1.1,starSizeSmall);
  ellipse(w/1.05,h/1.2,starSizeSmall);
  ellipse(w/3,h/1.5,starSizeSmall);
  ellipse(w/1.5,h/1.5,starSizeSmall);
  ellipse(w/1.5,h/2.5,starSizeSmall);
  ellipse(w/1.3,h/1.8,starSizeSmall);

  //Medium Stars
  fill(255, cur_twinkleMed);
  ellipse(w/1.35,h/1.5,starSizeMed);
  ellipse(w/1.5,h/2.1,starSizeMed);
  ellipse(w/1.25,h/2.25,starSizeMed);
  ellipse(w/1.35,h/4.5,starSizeMed);
  ellipse(w/40,h/4.5,starSizeMed);
  ellipse(w/30,h/1.8,starSizeMed);
  ellipse(w/8,h/2.3,starSizeMed);
  ellipse(w/9,h/1.5,starSizeMed);
  ellipse(w/15,h/1.2,starSizeMed);
  ellipse(w/9,h/2,starSizeMed);
  ellipse(w/3,h/40,starSizeMed);
  ellipse(w/1.8,h/35,starSizeMed);
  ellipse(w/3.2,h/5,starSizeMed);
  ellipse(w/1.18,h/2.7,starSizeMed);
}

function drawCharacter(w,h,cur_frac,headSize,earSize,moonSizeF){
  //back hair

  push();
    stroke(91,94,172);
    strokeWeight(w/10);
    line(w/1.83,h/3.4,w/1,h/0.8);
    line(w/2.2,h/3.4,w/100,h/0.8);
    noStroke();
    fill(91,94,172);
    rect(w/5.9,h/1.3,w/1.5,h/4);
    rect(w/3.5,h/1.8,w/2.4,h/4);

    let move;

    if(cur_frac < 0.5){
      move = map(cur_frac, 0, 0.5, 8.5, 10);
    }else{
      move = map(cur_frac, 0.5, 1, 10, 8.5);
    }
    ellipse(w/move,h/1,w/6,h/6);

      if(cur_frac < 0.5){
        move = map(cur_frac, 0, 0.5, 5.5, 6.5);
      }else{
        move = map(cur_frac, 0.5, 1, 6.5, 5.5);
      }
      ellipse(w/move,h/1.1,w/6,h/6);

        if(cur_frac < 0.5){
          move = map(cur_frac, 0, 0.5, 5.5, 5);
        }else{
          move = map(cur_frac, 0.5, 1, 5, 5.5);
        }
        ellipse(w/move,h/1.25,w/6,h/6);

          if(cur_frac < 0.5){
            move = map(cur_frac, 0, 0.5, 3.8, 4.2);
          }else{
            move = map(cur_frac, 0.5, 1, 4.2, 3.8);
          }
          ellipse(w/move,h/1.4,w/6,h/6);

            if(cur_frac < 0.5){
              move = map(cur_frac, 0, 0.5, 3.5, 4);
            }else{
              move = map(cur_frac, 0.5, 1, 4, 3.5);
            }
            ellipse(w/move,h/1.6,w/6,h/6);

              if(cur_frac < 0.5){
                move = map(cur_frac, 0, 0.5, 2.8, 3);
              }else{
                move = map(cur_frac, 0.5, 1, 3, 2.8);
              }
              ellipse(w/move,h/1.8,w/6,h/6);

                if(cur_frac < 0.5){
                  move = map(cur_frac, 0, 0.5, 2.5, 2.6);
                }else{
                  move = map(cur_frac, 0.5, 1, 2.6, 2.5);
                }
                ellipse(w/move,h/2.2,w/6,h/6);

                  if(cur_frac < 0.5){
                    move = map(cur_frac, 0, 0.5, 2.35, 2.4);
                  }else{
                    move = map(cur_frac, 0.5, 1, 2.4, 2.35);
                  }
                  ellipse(w/move,h/2.6,w/6,h/6);

                    if(cur_frac < 0.5){
                      move = map(cur_frac, 0, 0.5, 2.15, 2.2);
                    }else{
                      move = map(cur_frac, 0.5, 1, 2.2, 2.15);
                    }
                    ellipse(w/move,h/3,w/6,h/6);

    translate(w/0.99,0);

    if(cur_frac < 0.5){
      move = map(cur_frac, 0, 0.5, 8.5, 10);
    }else{
      move = map(cur_frac, 0.5, 1, 10, 8.5);
    }
    ellipse(w/-move,h/1,w/6,h/6);

      if(cur_frac < 0.5){
        move = map(cur_frac, 0, 0.5, 5.5, 6.5);
      }else{
        move = map(cur_frac, 0.5, 1, 6.5, 5.5);
      }
      ellipse(w/-move,h/1.1,w/6,h/6);

        if(cur_frac < 0.5){
          move = map(cur_frac, 0, 0.5, 5.5, 5);
        }else{
          move = map(cur_frac, 0.5, 1, 5, 5.5);
        }
        ellipse(w/-move,h/1.25,w/6,h/6);

          if(cur_frac < 0.5){
            move = map(cur_frac, 0, 0.5, 3.8, 4.2);
          }else{
            move = map(cur_frac, 0.5, 1, 4.2, 3.8);
          }
          ellipse(w/-move,h/1.4,w/6,h/6);

            if(cur_frac < 0.5){
              move = map(cur_frac, 0, 0.5, 3.5, 4);
            }else{
              move = map(cur_frac, 0.5, 1, 4, 3.5);
            }
            ellipse(w/-move,h/1.6,w/6,h/6);

              if(cur_frac < 0.5){
                move = map(cur_frac, 0, 0.5, 2.8, 3);
              }else{
                move = map(cur_frac, 0.5, 1, 3, 2.8);
              }
              ellipse(w/-move,h/1.8,w/6,h/6);

                if(cur_frac < 0.5){
                  move = map(cur_frac, 0, 0.5, 2.5, 2.6);
                }else{
                  move = map(cur_frac, 0.5, 1, 2.6, 2.5);
                }
                ellipse(w/-move,h/2.2,w/6,h/6);

                  if(cur_frac < 0.5){
                    move = map(cur_frac, 0, 0.5, 2.35, 2.4);
                  }else{
                    move = map(cur_frac, 0.5, 1, 2.4, 2.35);
                  }
                  ellipse(w/-move,h/2.6,w/6,h/6);

                    if(cur_frac < 0.5){
                      move = map(cur_frac, 0, 0.5, 2.15, 2.2);
                    }else{
                      move = map(cur_frac, 0.5, 1, 2.2, 2.15);
                    }
                    ellipse(w/-move,h/3,w/6,h/6);

  pop();

  //neck
  noFill();
  stroke(176,189,230);
  strokeWeight(w/20);

  push();
    angleMode(DEGREES);
    translate(w/2.1,h/1.62);
    scale(0.8);
    rotate(90);
    bezier(0,0,w/4.8,0,w/4.8,h/10.8,w/4.57,h/2.16);
  pop();

  push();
    angleMode(DEGREES);
    translate(w/1.9,h/1.62);
    rotate(90);
    scale(0.8);
    bezier(0,0,w/4.8,0,w/4.8,h/-10.8,w/4.57,h/-2.16);
  pop();

  push();
    noStroke();
    fill(176,189,230);
    rect(w/2.1,h/1.5,w/20,h/2);
    translate(0,h/40);
    if(h > 1080){
      ellipse(w/3.65,h/1.035,w/12,h/6);
    }else{
      ellipse(w/3.65,h/1.035,w/12,h/5.1);
    }
    translate(0,(-h/40));
    translate(w/2.21,h/40);
    if(h > 1080){
      ellipse(w/3.65,h/1.035,w/12,h/6);
    }else{
      ellipse(w/3.65,h/1.035,w/12,h/5.1);
    }
    translate(-w/2.21,-h/40);
    rect(w/3.3,h/1.08,w/2.6,h/10);
    rect(w/2.35,h/1.15,w/6.5,h/10);
    rect(w/2.2,h/1.2,w/10,h/10);
  pop();

  push();
    angleMode(DEGREES);
    //head
    translate(0,h/15);
    fill(196,206,236);
    noStroke();
    ellipse(w/2,h/3,headSize);
    bezier((w/2)-(0.5*headSize),(h/8)+(0.5*headSize),w/2.5,h/1.35,w/1.68,h/1.35,(w/2)+(0.5*headSize),(h/8)+(0.5*headSize));
    //ears
    rotate(-25);
    translate(w/-15,h/4.5);
    ellipse(w/3.15,h/2,earSize,earSize*1.3);
    rotate(25);
    translate(-w/-15,-h/5.5);
    ellipse(w/1.87,h/2.6,earSize,earSize*1.3);
  pop();

  angleMode(RADIANS);

  if(cur_frac < 0.5){
    move = map(cur_frac, 0, 0.5, 0.01, 0);
  }else{
    move = map(cur_frac, 0.5, 1, 0, 0.01);
  }

push();
  translate(0,h/-70);
  //eyes
  noStroke();
  fill(0);
  ellipse(w/2.2,h/(2+move),earSize*1.2,earSize);
  fill(196,206,236);
  ellipse(w/2.2,h/(2.03+move),earSize*1.6,earSize);

  push();
    translate(w/11,0);
    fill(0);
    ellipse(w/2.2,h/(2+move),earSize*1.2,earSize);
    fill(196,206,236);
    ellipse(w/2.2,h/(2.03+move),earSize*1.6,earSize);
  pop();

pop();

  //eyebrows
  stroke(91,94,172);
  strokeWeight(w/55);
  line(w/2.3,h/(2.25+move),w/2.2,h/(2.23+move));
  line(w/1.85,h/(2.23+move),w/1.78,h/(2.25+move));

  //nose
  push();
    stroke(169,183,223);
    strokeWeight(w/200);
    translate(w/23,h/7);
    line(w/2.25,h/(2.25+move),w/2.2,h/(2.23+move));
    translate(w/-12,0);
    line(w/1.85,h/(2.23+move),w/1.8,h/(2.25+move));
  pop();

push();
  //mouth
  fill(110,112,188);
  noStroke();
  ellipse(w/1.99,h/(1.55+move),moonSizeF/2.3,moonSizeF/3.3);
  stroke(92,94,177);
  strokeWeight(w/300);
  noFill();
  translate(w/2.1,h/(1.58+move));
  bezier(0,0,w/96,h/54,w/24,h/54,w/19.2,0);
pop();

push();
//Forehead moon
scale(0.65);
translate(w/3.75,h/3.5);
fill(91,94,172);
noStroke();
ellipse(w/2,h/3,moonSizeF);
fill(196,206,236);
ellipse(w/2,h/3.2,moonSizeF/1.2);

pop();

}

function drawHair(w,h,cur_frac){

  push();
    noFill();
    stroke(110,112,188);
    strokeWeight(w/100);
    translate(w/1.99,h/3.7);

    beginShape();
    translate(0,h/12.5);
    bezier(w/9.5,0,w/13.71,-h/27,w/24,-h/27,0,0);
    bezier(-w/9,0,-w/13.71,-h/27,-w/24,-h/27,0,0);
    bezier(-w/9,0,-w/9,-h/4.9,w/9.5,-h/4.9,w/9.5,0);
    endShape();
  pop();


  push();
    noStroke();
    fill(110,112,188);
    rect(w/2.3,h/4.3,w/7,h/12);
    rect(w/2.1,h/3.32,w/20,h/25);
    rect(w/2.17,h/3.45,w/12,h/25);
    rect(w/2.54,h/3.43,w/4.7,h/25);
    rect(w/2.473,h/3.9,w/5.265,h/20);
    rect(w/2.42,h/4.15,w/5.8,h/20);
    rect(w/2.35,h/4.5,w/7,h/20);
    rect(w/2.22,h/4.9,w/10,h/20);
  pop();


  //hair waves
  fill(110,112,188);
  translate(0,h/-20);

  noStroke();
  let move;

  if(cur_frac < 0.5){
    move = map(cur_frac, 0, 0.5, 0, 0.05);
  }else{
    move = map(cur_frac, 0.5, 1, 0.05, 0);
  }
  ellipse(w/(2.7+(move*2)),h/1,w/15,h/7);
  ellipse(w/(2.4+(move*1.9)),h/0.96,w/15,h/7);
  ellipse(w/(2.5+(move*1.8)),h/1.09,w/10,h/7);
  ellipse(w/(2.6+(move*1.7)),h/1.22,w/15,h/7);
  ellipse(w/(2.6+(move*1.6)),h/1.35,w/12,h/7);
  ellipse(w/(2.6+(move*1.5)),h/1.5,w/15,h/7);
  ellipse(w/(2.35+(move*1.4)),h/1.2,w/15,h/7);
  ellipse(w/(2.4+(move*1.3)),h/1.4,w/15,h/7);
  ellipse(w/(2.45+(move*1.2)),h/1.6,w/20,h/10);
  ellipse(w/(2.6+(move*1.1)),h/1.7,w/20,h/10);
  ellipse(w/(2.45+move),h/1.75,w/20,h/15);
  ellipse(w/(2.6+move),h/1.95,w/20,h/10);
  ellipse(w/(2.6+move),h/2.1,w/30,h/15);
  ellipse(w/(2.45+move),h/1.9,w/30,h/15);
  ellipse(w/(2.45+move),h/2.1,w/38,h/15);
  ellipse(w/(2.55+(move/4)),h/2.3,w/30,h/15);
  ellipse(w/2.52,h/2.5,w/30,h/15);


  push();
    translate(w/0.99,0);
    ellipse(w/(-2.7+(move*2)),h/1,w/15,h/7);
    ellipse(w/(-2.4+(move*1.9)),h/0.96,w/15,h/7);
    ellipse(w/(-2.5+(move*1.8)),h/1.09,w/10,h/7);
    ellipse(w/(-2.6+(move*1.7)),h/1.22,w/15,h/7);
    ellipse(w/(-2.6+(move*1.6)),h/1.35,w/12,h/7);
    ellipse(w/(-2.6+(move*1.5)),h/1.5,w/15,h/7);
    ellipse(w/(-2.35+(move*1.4)),h/1.2,w/15,h/7);
    ellipse(w/(-2.4+(move*1.3)),h/1.4,w/15,h/7);
    ellipse(w/(-2.45+(move*1.2)),h/1.6,w/20,h/10);
    ellipse(w/(-2.6+(move*1.1)),h/1.7,w/20,h/10);
    ellipse(w/(-2.45+move),h/1.75,w/20,h/15);
    ellipse(w/(-2.6+move),h/1.95,w/20,h/10);
    ellipse(w/(-2.6+move),h/2.1,w/30,h/15);
    ellipse(w/(-2.45+move),h/1.9,w/30,h/15);
    ellipse(w/(-2.45+move),h/2.1,w/38,h/15);
    ellipse(w/(-2.55+(move/4)),h/2.3,w/30,h/15);
    ellipse(w/-2.52,h/2.5,w/30,h/15);
  pop();

  stroke(196,206,236);
  strokeWeight(w/500);
  line(w/1.99,h/4.15,w/1.99,h/2.3);
}

function drawMoons(w,h,moonSize){
  noFill();
  stroke(255);
  strokeWeight(h/220);
  //end moons
  ellipse(w/15,h/7,moonSize);
  ellipse(w/1.075,h/7,moonSize);

  //cresent
  //left
  fill(255);
  push();
  beginShape();
    translate(w/12.5, h/45);
    vertex(w/20.16, h/20);
    bezierVertex(w/7.56, h/31.5, w/7.56, h/5, w/20.16, h/5);
    bezierVertex(w/12.096, h/6.8, w/12.6, h/10, w/20.16, h/20);
  endShape();

  //right
  beginShape();
    translate(w/1.19, h/1200);
    vertex(-w/20.16, h/20);
    bezierVertex(-w/7.56, h/31.5, -w/7.56, h/5, -w/20.16, h/5);
    bezierVertex(-w/12.096, h/6.8, -w/12.6, h/10, -w/20.16, h/20);
  endShape();
  pop();

  //half moon
  push();
    rotate(-1.57);
    translate(-w/7.6,h/3.4);
    arc(w/19.2, h/10.8, w/12, h/6.75, 0, PI, CHORD);
  pop();

  //half moon
  push();
    rotate(1.57);
    if(h > 1080){ //not sure why this does not work without the if
          translate(w/36,-h/0.645);
    }else{
        translate(w/36,-h/0.6725);
    }
    arc(w/19.2, h/10.8, w/12.5, h/6.75, 0, PI, CHORD);
  pop();

  //nearly full
  ellipse(w/3.15,h/7,moonSize/1.2,moonSize);
  ellipse(w/1.47,h/7,moonSize/1.2,moonSize);
}
