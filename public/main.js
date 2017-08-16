var addData = function(chart, label, data) {

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

var removeAllData = function(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
}

var renderChart = function() {

    if (this.status === 500) {
        console.log(JSON.parse(this.response).message)
        return;
    }

    var dataset = {};
    var hours = [];
    var busQuantities = [];

    //Create dataset from response array (every item is a bus)
    //The dataset will contain the number of buses running each hour
    JSON.parse(this.response).forEach(function(bus) {
        var start = moment(bus.startTime).startOf('hour');
        var end = moment(bus.endTime).startOf('hour');
        for (i = 0; i <= (end - start); i++) {
            var busTime = start.add(i, 'hours');
            if (!dataset[busTime]) {
                dataset[busTime] = 1
            } else {
                dataset[busTime]++
            }
        }
    })


    //map the dataset to the chart
    Object.keys(dataset).map(function(key) {
        var timeLabel = new Date(key)
        var quantity = dataset[key]
        addData(busChart, timeLabel, quantity)
    })

    //NOTE: may be better to "updateChart" here, but I think the animation looks messy...
}


var load = function() {
    if (busChart) {
        removeAllData(busChart)
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", renderChart);
    oReq.open("GET", "/buses");
    oReq.send();
}

load()