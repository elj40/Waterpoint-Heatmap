let HeatMap;
let shaderCanvas;

const SOURCE_SPACE = 30;

let sources = new Array(SOURCE_SPACE*2);
let weights = new Array(SOURCE_SPACE);
let size = 0;
let sourceSize = 0;

let river1 = [];
let river2 = [];
const RIVER_WIDTH = 40;

function preload() {
  HeatMap = loadShader('shader.vert', 'shader.frag')
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shaderCanvas = createGraphics(windowWidth,windowHeight, WEBGL);

  for (let i = 0; i < SOURCE_SPACE; i++) {
    sources[i*2] = 0;
    sources[i*2+1] = 0;
    weights[i] = 1;
  }
  createRivers();
  drawCanvas();
}

function draw() {
  
  //drawCanvas();
}

function mousePressed() {
  if (mouseX>width/20 && mouseX<width/20*19 && mouseY>height/20 && mouseY<height/20*19) {
    sources[size*2] = mouseX/width;
    sources[size*2+1] = 1-mouseY/height;
    weights[size] = 2;
    size++;

    HeatMap.setUniform("sources", sources);
    console.log(sources);

    drawCanvas();
  }
}

function drawCanvas() {
  background(0,255,0);
  
  shaderCanvas.shader(HeatMap);

  HeatMap.setUniform("sLength", size);

  HeatMap.setUniform("sources", sources.map((s)=>{return s}));
  HeatMap.setUniform("weights", weights.map((w)=>{return w}));
  HeatMap.setUniform("fadeDistance", 0.5);
  shaderCanvas.rect(0,0,width,height);


  image(shaderCanvas, 0, 0);
  drawRivers();
}

function createRivers() {

  const rw = RIVER_WIDTH/2;
  const NOISE_STRENGTH = 30;
  const WALK_SPEED = height/10;
  //River 1;
  let walker = [100,-WALK_SPEED];

  while (walker[1] < height) {
    
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

  while (walker[1] < height) {
    
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

