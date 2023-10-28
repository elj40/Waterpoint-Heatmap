const RED = [1.0,0.0,0.0,1.0];
const YELLOW = [1.0,1.0,0.0,1.0];
const BLUE = [0.0,0.0,1.0,1.0];

const RYB = RED.concat(YELLOW).concat(BLUE);
let HeatMap;

console.log(RYB);


function preload() {
  HeatMap = loadShader('shader.vert', 'shader.frag')
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);



}


function draw() {
  background(0);
  
  shader(HeatMap);

  HeatMap.setUniform("source", [0.5,0.5]);
  HeatMap.setUniform("fadeDistance", mouseX*2/width);
  rect(0,0,width,height);
  
  // for (let i = 0; i < 100; i++) {
  //   for (let j = 0; j < 100; j++) {
  //     //let v = 10/ ((i*i)+(j*j)) - 0.1;
  //     let d = sqrt((i*i)+(j*j));
  //     let v = A*pow(d,3) + B*d*d+1;
  //     stroke(v*255);
  //     point(s.x-i,s.y-j);
  //     point(s.x-i,s.y+j);
  //     point(s.x+i,s.y-j);
  //     point(s.x+i,s.y+j);
  //   }
  // }
}

function diffuse(x,y) {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //if (i==0 && j==0) continue;
        total += values[getI(x+i,y+j)];

    }
    
  }
  let index = getI(x,y);
  
  let avg = total/9;
  console.log(avg);
  nextValues[index] = avg;
  pixels[index*4+0] = avg*255; 
  pixels[index*4+1] = avg*255; 
  pixels[index*4+2] = avg*255; 
  pixels[index*4+3] = 255; 

}

function getI(x,y) {
  return y*width + x;
}