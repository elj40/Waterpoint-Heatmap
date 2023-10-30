const drawArea = document.getElementById("draw-area");
const root = document.querySelector(":root");

const wpWeight = document.getElementById("wp-weight");

drawArea.addEventListener("click", (e)=>{addWaterPoint(e)});
drawArea.addEventListener("contextmenu", (e)=>{removeWaterPoint(e)});

wpWeight.addEventListener("input", ()=> {
    root.style.setProperty("--waterpoint-area", (300*parseFloat(wpWeight.value)+"px"))
})

let num_points = 0;

function addWaterPoint(mouseEvent) {
    const waterpoint = document.createElement("div");

    waterpoint.style.left = (mouseEvent.offsetX) + "px";
    waterpoint.style.top = (mouseEvent.offsetY) + "px";

    waterpoint.innerHTML = '<div class="source"></div>'

    drawArea.appendChild(waterpoint);
    waterpoint.classList.add("source-area");


    num_points++;

    chart = new Chart("chart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                    label: "Animal Activity",
                    borderColor: "lightblue",
                    fill: false,
                    data: pressureData.slice(0,num_points+1),
                    tension: 0
                },
                {
                    label: "Capacity",
                    borderColor: "limegreen",
                    fill: false,
                    data: capacityData.slice(0,num_points+1),
                    tension: 0
                },
            ]
        }
    })
}

function removeWaterPoint(mouseEvent) {
    mouseEvent.preventDefault();
    drawArea.removeChild(drawArea.lastChild);
    num_points--;
    chart = new Chart("chart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                    label: "Animal Activity",
                    borderColor: "lightblue",
                    fill: false,
                    data: pressureData.slice(0,num_points+1),
                    tension: 0
                },
                {
                    label: "Capacity",
                    borderColor: "limegreen",
                    fill: false,
                    data: capacityData.slice(0,num_points+1),
                    tension: 0
                },
            ]
        }
    })

}

const pressureData = [0.4,0.5,0.9,1,0.6,0.4,0.3,0.3,0.3];
const capacityData = [0.7,0.7,0.7,0.7,0.3,0.3,0.3,0.3,0.3];

const xValues = [0,1,2,3,4,5,7,8,9]

let chart = new Chart("chart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
                label: "Animal Activity",
                borderColor: "lightblue",
                fill: false,
                data: [],
                tension: 0
            },
            {
                label: "Capacity",
                borderColor: "limegreen",
                fill: false,
                data: [],
                tension: 0
            },
        ]
    }
})