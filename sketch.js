let values = [];
let nextValues = [];

let source;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(230);

  loadPixels();

  for (let i = 0; i < pixels.length/4; i++) {
    values[i] = 0;
    nextValues[i] = 0;
    pixels[i*4+0] = 0;
    pixels[i*4+1] = 0;
    pixels[i*4+2] = 0;
    pixels[i*4+3] = 255;
  }


  updatePixels();

  background(0);
  fill(255);
  noStroke();
  rect(0,0, 30);

  loadPixels();

  for (let i = 0; i < pixels.length/4; i++) {
    values[i] = (pixels[i+0]+pixels[i+1]+pixels[i+2])/255/3;
  }
  
  let dy = 0, dx = 0, dw = 100, dh = 120;
  for (let y = dy+1; y < dy+dh-1; y++) {
    for (let x = dx+1; x < dx+dw-1; x++) {
      let i = getI(x,y);
      diffuse(x,y);
      //console.log(nextValues[getI(x,y)]);
    }
  }
  updatePixels(dx,dy,dw,dh);



  fill(255)
  text(frameRate(), 20, height-20);

}


function draw() {
  

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