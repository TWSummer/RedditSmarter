import DrawGraph from './draw_graph';

class AnalyzePosts {
  constructor() {
    this.totalKarmaChart = new DrawGraph({
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      elementId: "total-karma",
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      label: 'Total Karma By Time of Day'
    });
    this.averageKarmaChart = new DrawGraph({
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      elementId: "average-karma",
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      label: 'Average Karma By Time of Day'
    });
    this.karmaByTitleLength = new DrawGraph({
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      elementId: "post-length-average",
      labels: ["0-19 chars", "20-39 chars", "40-59 chars", "60-79 chars", "80-99 chars","100-119 chars","120-139 chars","140-159 chars","160-179 chars","180-199 chars","200-219 chars","220-239 chars", "240-259 chars","260-279 chars","280-299 chars"],
      label: 'Average Karma By Length of Title'
    });
    this.keywordGraph = new DrawGraph({
      data: [0,0],
      elementId: "keyword-karma",
      labels: [`Titles including ""`, `Titles without ""`],
      label: 'Average Karma By Keyword'
    });
    this.keyword = "";
  }

  receivePosts(posts) {
    console.log(posts);
    this.posts = posts;

    if (this.totalKarmaChart.myChart.canvas) {
      this.createTotalKarmaGraph(posts);
      this.createAverageKarmaGraph(posts);
      this.createKarmaByTitleLength(posts);
      this.createKeywordGraph(posts);
    }
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

  createKarmaByTitleLength(posts) {
    let data = this.averageKarmaByTitleLength(posts);
    this.karmaByTitleLength.updateData(data);
  }

  averageKarmaByTitleLength(posts) {
    let numPosts = [];
    let totalKarma = []
    for (let i = 0; i < 15; i++) {
      numPosts.push(0);
      totalKarma.push(0);
    }
    for (let i = 0; i < posts.length; i++) {
      let titleLengthBin = Math.floor(posts[i].title.length / 20)
      totalKarma[titleLengthBin] += posts[i].score;
      numPosts[titleLengthBin] += 1;
    }
    let result = [];
    for (let i = 0; i < 15; i++) {
      if (numPosts[i] < 15) {
        result.push(0);
      } else {
        result.push(totalKarma[i] / numPosts[i])
      }
    }
    return result;
  }

  createKeywordGraph(posts) {
    if (this.keyword === undefined) {
      this.keyword = "";
    }
    let data = this.averageKarmaByKeyword(posts);
    this.keywordGraph.updateData(data);
  }

  averageKarmaByKeyword(posts) {
    let numPosts = [0,0];
    let totalKarma = [0,0];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].title.toLowerCase().includes(this.keyword.toLowerCase())) {
        totalKarma[0] += posts[i].score;
        numPosts[0] += 1;
      } else {
        totalKarma[1] += posts[i].score;
        numPosts[1] += 1;
      }
    }
    let result = [];
    for (let i = 0; i < 2; i++) {
      if (numPosts[i] === 0) {
        result.push(0);
      } else {
        result.push(totalKarma[i] / numPosts[i])
      }
    }
    return result;

  }

  updateKeyword(keyword) {
    this.keyword = keyword;
    this.createKeywordGraph(this.posts);
    let labels = [`Titles Including "${this.keyword}"`, `Titles without "${this.keyword}"`]
    this.keywordGraph.updateLabels(labels);

  }

  destroy() {
    this.totalKarmaChart.myChart.destroy();
    this.averageKarmaChart.myChart.destroy();
    this.karmaByTitleLength.myChart.destroy();
    this.keywordGraph.myChart.destroy();
  }
}

export default AnalyzePosts;
