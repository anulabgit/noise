let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;
let flying = 0;
let terrain = [];

function preload(){
  img = loadImage("https://raw.githubusercontent.com/leeseokyun/2023-1-graphics/main/pngegg%20(2).png");//배 이미지 불러오기
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  flying -= 0.01;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -80, 80);
      xoff += 0.2;
      
    }
    yoff += 0.2;
  }
  
  background(133,199,236);
  fill(255);
  ellipse(270,-270,50,50);
  ellipse(230,-270,50,50);
  ellipse(200,-250,50,50);
  ellipse(260,-240,60,50);
  ellipse(230,-230,55,50);
  
  
  translate(0, 50);
  rotateX(PI / 3);
  noStroke();
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      fill(terrain[x][y]+30, terrain[x][y]+144, terrain[x][y]+255);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      
    }
    endShape();
  }
  
  push();
  translate(w/2, h/2);
  translate(mouseX - width / 2, mouseY - height / 2, terrain[floor(mouseX / scl)][floor(mouseY / scl)]);
  rotateX(PI / -3);
  translate(0, -100, 0);
  texture(img);
  plane(200);
  pop();
}
