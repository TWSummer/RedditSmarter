import snoowrap from 'snoowrap';
import AnalyzePosts from './analyze_posts';


class PostGrabber {
  constructor(target, limit) {
    this.r = new snoowrap({
      userAgent: "Reddit Smarter is a tool for providing insight into karma patterns by subreddit",
      clientId: "L1P4DbaMoN1kqA",
      clientSecret: "f89SF6w8jHhLdrlBIJOekEMSXyA",
      username: "RedditSmarterBot1",
      password: "UseRedditSmarter"
    });
    this.posts = [];
    this.targetSubreddit = target;
    this.assignSubreddit();
    this.paused = false;
    this.assignStatus();
    this.maxPosts = limit;
    let ignoreNewestHours = 36;
    this.endTime = Math.floor(Date.now()/1000 - (3600 * ignoreNewestHours));
    this.createTime = 0;
    this.analyze = new AnalyzePosts;
    this.r.getSubreddit(this.targetSubreddit).fetch().then(subInfo => {
      this.createTime = subInfo.created_utc;
      this.assignCreateTime();
      this.getPosts();
    });
  }

  getPosts() {
    let startLength = this.posts.length;
    this.r.getSubreddit(this.targetSubreddit)
      .search({query: `timestamp:${this.createTime}..${this.endTime}`, sort: "new", time: "all", syntax: "cloudsearch", limit: 100})
      .then( (results) =>{
        for (let i = 0; i < 100; i++) {
          if (results[i]) {
            this.posts.push(results[i]);
          }
        }
        this.assignPostDetails();
        this.analyze.receivePosts(this.posts);
        this.endTime = this.posts[this.posts.length - 1].created - 1;
        if (this.posts.length < this.maxPosts && !this.paused && startLength !== this.posts.length) {
          this.getPosts();
        }
      }
    );
  }

  pause() {
    this.paused = !this.paused;
    this.assignStatus();
    if (!this.paused) {
      this.getPosts();
    }
  }

  destroy() {
    this.analyze.destroy();
  }

  assignSubreddit() {
    let el = document.getElementById("subreddit-name");
    el.innerHTML = this.targetSubreddit;
  }

  assignCreateTime() {
    let el = document.getElementById("created-at");
    let createTime = new Date(this.createTime * 1000);
    el.innerHTML = createTime.toLocaleString();
  }

  assignStatus() {
    let el = document.getElementById("search-status");
    if (this.paused) {
      el.innerHTML = "Paused";
    } else {
      el.innerHTML = "Running";
    }
  }

  assignPostDetails() {
    let el = document.getElementById("total-post-count");
    el.innerHTML = this.posts.length;
    el  = document.getElementById("most-recent");
    let mostRecent = new Date(this.posts[0].created * 1000);
    el.innerHTML = mostRecent.toLocaleString();
    el  = document.getElementById("oldest-post");
    let oldestPost = new Date(this.posts[this.posts.length -1].created * 1000);
    el.innerHTML = oldestPost.toLocaleString();
  }
}

export default PostGrabber;
