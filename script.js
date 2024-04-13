// Generate data points for a given function
function generateDataPoints(func, from, to, step) {
    const dataPoints = [];
    for (let x = from; x <= to; x += step) {
        dataPoints.push({ x: x, y: func(x) });
    }
    return dataPoints;
}

const labelToId = {
    "O(log(n))": "cbLogN",
    "O(n)": "cbN",
    "O(n log(n))": "cbNLogN",
    "O(n^2)": "cbN2",
    "O(2^n)": "cb2pN",
};

// Define the functions to visualize
const functions = [
    { label: "O(n)", func: (x) => x },
    { label: "O(n^2)", func: (x) => x * x },
    { label: "O(n log(n))", func: (x) => x * Math.log(x) },
    { label: "O(log(n))", func: (x) => Math.log(x) },
    { label: "O(2^n)", func: (x) => Math.pow(2, x) },
];

// Generate data for each function
const datasets = functions.map((func) => ({
    label: func.label,
    data: generateDataPoints(func.func, 1, 10, 1),
    borderColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16), // Random color
    fill: false,
}));

// Function to update the chart with the new input size and step size
function updateChart() {
    const inputSize = parseInt(document.getElementById("inputSize").value);
    const stepSize = parseInt(document.getElementById("stepSize").value);

    // Filter functions based on checkbox state
    const checkedFunctions = functions.filter((func) => {
        const id = labelToId[func.label];
        return document.getElementById(id).checked;
    });

    // Generate data for checked functions
    const newData = checkedFunctions.map((func) => ({
        label: func.label,
        data: generateDataPoints(func.func, 1, inputSize, stepSize),
        borderColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16), // Random color
        fill: false,
    }));

    // Find the maximum y-value across all datasets
    const maxValues = newData.map((dataset) =>
        Math.max(...dataset.data.map((point) => point.y))
    );
    const maxY = Math.max(...maxValues);

    // Ensure options object exists
    if (!myChart.options) {
        myChart.options = {};
    }

    // Ensure scales object exists
    if (!myChart.options.scales) {
        myChart.options.scales = {};
    }

    // Update the chart data and y-axis scale
    myChart.data.datasets = newData;

    // Configure y-axis scale
    myChart.options.scales.y = {
        type: "linear",
        ticks: {
            stepSize: stepSize,
            max: maxY + 1, // Add some padding for better visualization
        },
        scaleLabel: {
            display: true,
            labelString: "Value of Function",
        },
    };

    myChart.update();
}

// Plotting
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
    type: "line",
    data: {
        datasets: datasets,
    },
    options: {
        scales: {
            x: {
                type: "linear",
                ticks: {
                    stepSize: 1,
                },
                scaleLabel: {
                    display: true,
                    labelString: "n",
                },
            },
            y: {
                scaleLabel: {
                    display: true,
                    labelString: "Value of Function",
                },
            },
        },
    },
});

// Add event listener to the update button
document.getElementById("updateButton").addEventListener("click", updateChart);

for (const label in labelToId) {
    const checkbox = document.getElementById(labelToId[label]);
    checkbox.addEventListener("change", updateChart);
}
