// const riverWeightEl = document.getElementById("river-weight");
// const waterPWeightEl = document.getElementById("waterpoint-weight");
const generalWeightEl = document.getElementById("general-weight");

const pressureChartC = document.getElementById("pressure");
const capacityChartC = document.getElementById("capacity");


document.body.addEventListener("contextmenu",(e)=>{e.preventDefault();});


let pressure = new Chart(pressureChartC, {
  type: 'line',
  data: {
    labels: ["","","","","","Water Holes Added","","","","","",""],
    scales: {y: {
      max: 1,
      min: 0,
      ticks: {
        stepSize: 0.5
    }
    }},
    datasets: [{
      label: 'Environment Pressure',
      data: [0.5,0.52,0.48,0.52,0.48,0.75,1,0.6,0.32,0.35,0.32,0.35],
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3 
    }]
  }}) 

let capacity = new Chart(capacityChartC, {
  type: 'line',
  data: {
    labels: ["","","","","Water Holes Added","","","","","","",""],
    scales: {y: {
      max: 1,
      min: 0,
    }},
    datasets: [{
      label: 'Environment Capacity',
      data: [0.5,0.5,0.5,0.5,0.45,0.4,0.3,0.25,0.2,0.2,0.2,0.2],
      fill: true,
      borderColor: 'rgb(75, 192, 0)',
      tension: 0.3 
    }]
  }
})


// riverWeightEl.addEventListener("input", (e)=> {
//   console.log(e.target.value, sourceSize, size)
//   updateWeights(e.target.value, sourceSize);
// })

// waterPWeightEl.addEventListener("input", (e)=> {
//   updateWeights(e.target.value, sourceSize, true);
// })

generalWeightEl.addEventListener("input", (e)=> {
  masterWeight = float(e.target.value);
  drawCanvas();
})


function updateWeights(v,i,waterP = false) {
    let start = 0 ,end = i;
    if (waterP) start = i, end = size;

    console.log(weights, float(v));
  
    for (let index = start; index<end-1; i++) {
      //weights[i] = float(v);
    }

    drawCanvas();
  }
