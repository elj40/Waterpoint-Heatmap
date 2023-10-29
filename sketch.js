let HeatMap;
let shaderCanvas;

const SOURCE_SPACE = 30;

let sources = new Array(SOURCE_SPACE*2);
let weights = new Array(SOURCE_SPACE);
let size = 0;
let sourceSize = 0;

let river1 = [];
let river2 = [];
const RIVER_WIDTH = 80;
const WATERPOINT_WIDTH = 30;

let masterWeight = 0.5;

function preload() {
  HeatMap = loadShader('shader.vert', 'shader.frag')
}

function setup() {

  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  canvas = createCanvas(windowWidth,windowWidth);
  shaderCanvas = createGraphics(windowWidth,windowWidth, WEBGL);

  for (let i = 0; i < SOURCE_SPACE; i++) {
    sources[i*2] = 0;
    sources[i*2+1] = 0;
    weights[i] = 1;
  }
  createRivers();
  drawCanvas();
}

function mousePressed() {
  if (mouseX>width/20 && mouseX<width/20*19 && mouseY>height/20 && mouseY<height/20*19 && mouseButton==LEFT) {
    sources[size*2] = mouseX/width;
    sources[size*2+1] = 1-mouseY/height;
    weights[size] = 2;
    size++;

    drawCanvas();
  }
  if (mouseButton == RIGHT) {
    removeWaterPoint();
  }
}

function drawCanvas() {
  background(0,255,0);
  
  shaderCanvas.shader(HeatMap);

  HeatMap.setUniform("sLength", size);

  HeatMap.setUniform("sources", sources.map((s)=>{return s}));
  HeatMap.setUniform("weights", weights.map((w)=>{return w}));
  HeatMap.setUniform("fadeDistance", masterWeight);
  shaderCanvas.rect(0,0,width,height);

  image(shaderCanvas, 0, 0);

  push();
  noStroke();
  fill(100,100,255);
  for (let i = sourceSize; i < SOURCE_SPACE; i++) {
    let sx = sources[i*2], sy = 1-sources[i*2+1];
    circle(sx*width,sy*height,WATERPOINT_WIDTH);
  }
  pop();
  drawRivers();
}

function removeWaterPoint() {
  weights[size-1] = 1;
  sources[size*2-2] = 0;
  sources[size*2-1] = 0;

  size--;
  sourceSize = min(sourceSize, size);

  drawCanvas();
}

function createRivers() {

  const rw = RIVER_WIDTH/2;
  const NOISE_STRENGTH = 30;
  const WALK_SPEED = height/10;
  //River 1;
  let walker = [100,-WALK_SPEED];

  while (walker[1] < windowHeight+WALK_SPEED) {
    
    weights[size] = 1;

    walker[0] += (noise(walker[0],walker[1])*2-1)*NOISE_STRENGTH;
    walker[1] += WALK_SPEED;

    river1.push([walker[0], walker[1]]);
    sources[size*2] = walker[0]/width;
    sources[size*2+1] = 1-walker[1]/height;
    size++;
    sourceSize++;
  }
  //River 2
  walker = [width-100,-WALK_SPEED];

  while (walker[1] < windowHeight+WALK_SPEED) {
    
    weights[size] = 1;

    walker[0] += (noise(walker[0],walker[1])-1)*NOISE_STRENGTH;
    walker[1] += WALK_SPEED;

    river2.push([walker[0], walker[1]]);
    sources[size*2] = walker[0]/width;
    sources[size*2+1] = 1-walker[1]/height;
    size++;
    sourceSize++;
  }

}

function drawRivers() {
  noFill();
  strokeWeight(RIVER_WIDTH);
  stroke(100,100,255);
  beginShape()
    river1.forEach((k)=> {
      vertex(k[0], k[1]);
      circle(k[0],k[1]);
    })
  endShape();

  beginShape()
    river2.forEach((k)=> {
      vertex(k[0], k[1]);
      circle(k[0],k[1]);
    })
  endShape();
  strokeWeight(1);
  stroke(0);
  fill(255);
}

