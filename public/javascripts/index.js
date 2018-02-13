import SearchFeature from './search_feature';
import Chart from 'chart.js';

let p;

document.addEventListener("DOMContentLoaded", () => {
  let searchFeature = new SearchFeature();

  var ctx = document.getElementById("total-karma").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
          datasets: [{
              label: 'Total Karma',
              data: [12, 19, 3, 5, 2, 3, 4, 9, 11, 5, 19, 3, 5, 2, 3, 4, 9, 11, 5, 17, 2, 14, 13, 18],
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

});

// let gatherPosts = subredditName => {
//   p = new PostGrabber(subredditName, 2000);
// };
