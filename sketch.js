let HeatMap;
let shaderCanvas;
let drawCanvas;

let sources = [];
let weights = [];

let river1 = [];
let river2 = [];
const RIVER_WIDTH = 40;

function preload() {
  HeatMap = loadShader('shader.vert', 'shader.frag')
}

function setup() {
  createCanvas(windowWidth*0.75,windowHeight*0.8);
  shaderCanvas = createGraphics(windowWidth*0.75,windowHeight*0.8, WEBGL);

  createRivers();
}

function draw() {
  background(0,255,0);
  
  shaderCanvas.shader(HeatMap);

  HeatMap.setUniform("sLength", weights.length);

  HeatMap.setUniform("sources", sources);
  HeatMap.setUniform("weights", weights);
  HeatMap.setUniform("fadeDistance", 0.5);
  shaderCanvas.rect(0,0,width,height);


  image(shaderCanvas, 0, 0);
  drawRivers();

}

function mousePressed() {
  sources = sources.concat([mouseX/width, mouseY/height]);
  weights.push(1);
  console.log(sources);
}

function createRivers() {

  const rw = RIVER_WIDTH/2;
  const NOISE_STRENGTH = 30;
  const WALK_SPEED = 60;
  //River 1;
  let walker = [100,-60];

  while (walker[1] < height) {
    
    weights.push(1);

    walker[0] += (noise(walker[0],walker[1])*2-1)*NOISE_STRENGTH;
    walker[1] += WALK_SPEED;

    river1.push([walker[0], walker[1]]);
    sources.push(walker[0]/width);
    sources.push(1-walker[1]/height);

  }

  walker = [width-100,-60];

  while (walker[1] < height) {
    
    weights.push(1);

    walker[0] += (noise(walker[0],walker[1])-1)*NOISE_STRENGTH;
    walker[1] += WALK_SPEED;

    river2.push([walker[0], walker[1]]);
    sources.push(walker[0]/width);
    sources.push(1-walker[1]/height);

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

