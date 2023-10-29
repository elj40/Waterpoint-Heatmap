const riverWeightEl = document.getElementById("river-weight");
const waterPWeightEl = document.getElementById("waterpoint-weight");

riverWeightEl.addEventListener("input", (e)=> {
    updateWeights(e.target.value, sourceSize);
})

riverWeightEl.addEventListener("input", (e)=> {
    updateWeights(e.target.value, sourceSize, true);
})

function updateWeights(v,i,waterP = false) {
    let start = 0 ,end = i;
    if (waterP) start = i, end = size;
  
    for (let index = start; index<end-1; i++) {
      weights[i] = v;
    }
  
    drawCanvas();
  }