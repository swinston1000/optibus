var addData = function(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
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

    //convert dataset to array of objects
    var dataset = Object.keys(dataset).map(function(key) {
        return { label: new Date(key), quantity: dataset[key] }
    })

    var compare = function(a, b) {
        if (a.label < b.label) {
            return -1;
        } else {
            return 1;
        }
    }

    dataset.sort(compare).forEach(function(data) {
        addData(busChart, data.label, data.quantity)
    })

    busChart.update();

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