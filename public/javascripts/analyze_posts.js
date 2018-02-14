import DrawGraph from './draw_graph';

class AnalyzePosts {
  constructor() {
    this.totalKarmaChart = new DrawGraph({
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      elementId: "total-karma",
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      label: 'Total Karma'
    });
    this.averageKarmaChart = new DrawGraph({
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      elementId: "average-karma",
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      label: 'Average Karma'
    });
  }

  receivePosts(posts) {
    console.log(posts);
    this.createTotalKarmaGraph(posts);
    this.createAverageKarmaGraph(posts);
  }

  createTotalKarmaGraph(posts) {
    let data = this.sumTotalKarmaByTime(posts);
    this.totalKarmaChart.updateData(data);
  }

  sumTotalKarmaByTime(posts) {
    let result = [];
    for (let i = 0; i < 24; i++) {
      result.push(0);
    }
    for (let i = 0; i < posts.length; i++) {
      let date = new Date(posts[i].created_utc * 1000);
      result[date.getHours()] += posts[i].score;
    }
    return result;
  }

  createAverageKarmaGraph(posts) {
    let data = this.averageKarmaByTime(posts);
    this.averageKarmaChart.updateData(data);
  }

  averageKarmaByTime(posts) {
    let numPosts = [];
    let totalKarma = []
    for (let i = 0; i < 24; i++) {
      numPosts.push(0);
      totalKarma.push(0);
    }
    for (let i = 0; i < posts.length; i++) {
      let date = new Date(posts[i].created_utc * 1000);
      totalKarma[date.getHours()] += posts[i].score;
      numPosts[date.getHours()] += 1;
    }
    let result = [];
    for (let i = 0; i < 24; i++) {
      if (numPosts[i] === 0) {
        result.push(0);
      } else {
        result.push(totalKarma[i] / numPosts[i])
      }
    }
    return result;
  }
}

export default AnalyzePosts;
