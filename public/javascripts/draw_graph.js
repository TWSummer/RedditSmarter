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
    console.log(this.myChart);
    this.myChart.config.data.datasets[0].data = data;
    this.myChart.update();
  }
}

export default DrawGraph;
