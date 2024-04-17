const graphElem = document.getElementById("myChart");
const myChart = echarts.init(graphElem, null, {
    width: 800,
    height: 600,
});

const functions = [
    { label: "O(n)", func: (x) => x },
    { label: "O(n^2)", func: (x) => x * x },
    { label: "O(n log(n))", func: (x) => x * Math.log(x) },
    { label: "O(log(n))", func: (x) => Math.log(x) },
    { label: "O(2^n)", func: (x) => Math.pow(2, x) },
];

const labelToId = {
    "O(log(n))": "cbLogN",
    "O(n)": "cbN",
    "O(n log(n))": "cbNLogN",
    "O(n^2)": "cbN2",
    "O(2^n)": "cb2pN",
};

const generateData = (func, start, end, step) => {
    const data = [];
    for (let x = start; x <= end; x += step) {
        data.push(func(x));
    }

    return data;
};

const updateChart = () => {
    const inputSize = parseInt(document.getElementById("inputSize").value);
    const stepSize = parseInt(document.getElementById("stepSize").value);

    // Filter functions based on checkbox state
    const checkedFunctions = functions.filter((func) => {
        const id = labelToId[func.label];
        return document.getElementById(id).checked;
    });

    const seriesData = [];

    checkedFunctions.forEach((func) =>
        seriesData.push({
            type: "line",
            smooth: true,
            data: generateData(func.func, 1, inputSize, stepSize),
            stack: "x",
        })
    );

    const xPoints = [];
    for (let i = 1; i <= inputSize; ++i) {
        xPoints.push(i);
    }

    const options = {
        tooltip: {
            // order: "valueDesc",
            trigger: "axis",
        },
        xAxis: {
            data: xPoints,
        },
        yAxis: {},
        series: seriesData,
        animationEasing: "quarticIn",
    };

    myChart.setOption(options);
    myChart.resize();
};

updateChart();

document.getElementById("updateButton").addEventListener("click", updateChart);

for (const label in labelToId) {
    const checkbox = document.getElementById(labelToId[label]);
    checkbox.addEventListener("change", updateChart);
}
