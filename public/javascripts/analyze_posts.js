class AnalyzePosts {
  constructor() {

  }

  receivePosts(posts) {
    console.log(posts);
    this.createTotalKarmaGraph(posts);
  }

  createTotalKarmaGraph(posts) {
    let data = this.sumTotalKarmaByTime(posts);
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
  }
}

export default AnalyzePosts;
