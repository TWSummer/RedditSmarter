import Chart from 'chart.js';

class DrawGraph {
  constructor(params) {
    let ctx = document.getElementById(params.elementId).getContext('2d');
    this.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: params.labels,
            datasets: [{
                label: params.label,
                data: params.data,
                backgroundColor: '#0080ff',
                borderColor: '#000',
                borderWidth: 3
            }]
        },
        options: {
            legend: {
              display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  updateData(data) {
    this.myChart.config.data.datasets[0].data = data;
    this.myChart.update();
  }

  updateLabels(labels) {
    this.myChart.config.data.labels = labels;
    this.myChart.update();
  }
}

export default DrawGraph;
