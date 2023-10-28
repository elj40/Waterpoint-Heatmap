let s;

const A = 0.000001, B = -0.00019, D = 1;

function setup() {
  createCanvas(windowWidth,windowHeight);


  s = createVector(0,0);
  stroke(255);
  point(s.x,s.y);


}


function draw() {
  background(0);
  translate(width/2,height/2);

  s.set(mouseX-width/2, mouseY-height/2);
  
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      //let v = 10/ ((i*i)+(j*j)) - 0.1;
      let d = sqrt((i*i)+(j*j));
      let v = A*pow(d,3) + B*d*d+1;
      stroke(v*255);
      point(s.x-i,s.y-j);
      point(s.x-i,s.y+j);
      point(s.x+i,s.y-j);
      point(s.x+i,s.y+j);
    }
  }
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