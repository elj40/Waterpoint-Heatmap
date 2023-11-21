document.body.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
})

const intensityInput = document.getElementById("intensity");
const resInput = document.getElementById("resolution");

var pressure_data = []
var effect_data = [];

var pressureGraph = new CanvasJS.Chart("pressure", {
  title: {
    text: "Pressure on environment"
  },
  data: [{
    type: "spline",
    lineColor: "blue",
    dataPoints: pressure_data
  }]
})

pressureGraph.render();

var effectGraph = new CanvasJS.Chart("effect", {
  title: {
    text: "Capacity after X years"
  },
  data: [{
    type: "spline",
    lineColor: "green",
    markerSize: 0,
    dataPoints: effect_data
  }]
})

effectGraph.render()

intensityInput.addEventListener("input",(e)=>{
  PRESSURE = BASE_PRESSURE;
  INTENSITY = float(intensityInput.value);
  drawCanvas()
  resetGraphs();
  updateGraphs();
});

resInput.addEventListener("input",()=> {
  exportEnabled = true;
  PRESSURE = BASE_PRESSURE;
  RESOLUTION = int(resInput.value);
  SCALE = width/RESOLUTION;
  sources = []
  createRivers();
  drawCanvas();
  resetGraphs();
  updateGraphs();

});

function updateGraphs() {
  pressure_data.push({y: PRESSURE})
  pressureGraph.render();

  effect_data.push({y: 2/PRESSURE});
  effectGraph.render();
}

function resetGraphs() {

  pressure_data = []
  effect_data = [];

  pressureGraph = new CanvasJS.Chart("pressure", {
    title: {
      text: "Pressure on environment"
    },
    data: [{
      type: "spline",
      lineColor: "blue",
      dataPoints: pressure_data
    }]
  })
  
  pressureGraph.render();
  
  effectGraph = new CanvasJS.Chart("effect", {
    title: {
      text: "Capacity after X years"
    },
    data: [{
      type: "spline",
      lineColor: "green",
      markerSize: 0,
      dataPoints: effect_data
    }]
  })
}