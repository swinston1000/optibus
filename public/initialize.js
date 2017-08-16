var addNewChart = function(label) {
    var chartOptions = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: [],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    unit: 'hour',
                    unitStepSize: 1,
                    time: {
                        displayFormats: {
                            'hour': 'MMM D, hA'
                        }
                    },
                    // ticks: {
                    //     autoSkip: false,
                    //     callback: function(value, index, values) {
                    //         return new moment(value).format('MMM D, hA');
                    //     }
                    // }
                }]
            }
        }
    };
    return new Chart(document.getElementById("busChart").getContext('2d'), chartOptions);
}

var busChart = addNewChart("Number Of Buses Running");