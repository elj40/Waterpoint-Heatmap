let river1 = [], river2 = []; 
let sources = []

let pointranges = [
  0,
  0,
  0.2,
  1,
  1
];

let colors = [];
const RIVER_WIDTH = 50;

var RESOLUTION = 150;
var SCALE;

var INTENSITY = 0.005;

var BASE_PRESSURE = 1;
var PRESSURE = BASE_PRESSURE;

function setup() {
  createCanvas(windowWidth/3*2,windowHeight);
  noStroke()
  colors = [
    color(0,255,0),
    color(0,255,0),
    color(255,255,0),
    color(255,0,0),
    color(255,0,0)
  ]

  SCALE = width/RESOLUTION;
  createRivers()
  drawCanvas()

  updateGraphs();
}

function drawCanvas() {
  background(39)
  PRESSURE = BASE_PRESSURE;

  noStroke()
  let max = sqrt(width*width+height*height) 
  for (let x = 0; x <= width; x+= SCALE) {
    for (let y = 0; y <= height; y+=SCALE) {
      let h = getHeat(x,y,max);
      PRESSURE += h*h*0.001;
      fill(getHeatForPixel(h));
      rect(x,y,SCALE+1,SCALE+1);
    }
  }

  drawRivers()

}

//From ericalbers' unity heatmap shader
function getHeatForPixel(weight)
{
  if (weight <= pointranges[0])
  {
    return colors[0];
  }
  if (weight >= pointranges[4])
  {
    return colors[4];
  }
  for (let i = 1; i < 5; i++)
  {
    if (weight < pointranges[i]) //if weight is between this point and the point before its range
    {
      let dist_from_lower_point = weight - pointranges[i - 1];
      let size_of_point_range = pointranges[i] - pointranges[i - 1];

      let ratio_over_lower_point = dist_from_lower_point / size_of_point_range;

      //now with ratio or percentage (0-1) into the point range, multiply color ranges to get color


      let new_color = lerpColor(colors[i-1],colors[i], ratio_over_lower_point);
      return new_color;

    }
  }
  return colors[0];
}


function getHeat(x,y,max) {
  let gp = xyToGrid(x,y);

  //let max = sqrt(width*width+height*height)
  let shortest = max;
  sources.forEach((sp)=>{
    let d = sqrt(pow(gp[0]-sp[0],2)+pow(sp[1]-gp[1],2))
    shortest = d < shortest ? d : shortest;
  })
  
  heat = min(1,INTENSITY/(shortest/max));
  return heat;
}

function mousePressed() {
  if (mouseX>width||mouseX<0||mouseY>height||mouseY<0) return

  if (mouseButton == LEFT) sources.push(xyToGrid(mouseX,mouseY))
  if (mouseButton == RIGHT) sources.pop()

  updateGraphs()
  drawCanvas()
}
function createRivers() {
  const NOISE_STRENGTH = 30;
  const WALK_SPEED = height/10;
  //River 1;
  let walker = [100,-WALK_SPEED];

  while (walker[1] < windowHeight+WALK_SPEED) {
    

    walker[0] += (noise(walker[0],walker[1])*2-1)*NOISE_STRENGTH;
    walker[1] += WALK_SPEED;

    river1.push([walker[0], walker[1]]);
    sources.push(xyToGrid(walker[0], walker[1]));
  }
  //River 2
  walker = [width-100,-WALK_SPEED];

  while (walker[1] < windowHeight+WALK_SPEED) {
    
    walker[0] += (noise(walker[0],walker[1])*1.5-1)*NOISE_STRENGTH;
    walker[1] += WALK_SPEED;

    river2.push([walker[0], walker[1]]);
    sources.push(xyToGrid(walker[0], walker[1]));

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

