import snoowrap from 'snoowrap';
import AnalyzePosts from './analyze_posts';
import $ from 'jquery';


class PostGrabber {
  constructor(target, limit) {
    this.r = this.constructSnoowrap();
    this.posts = [];
    this.targetSubreddit = target;
    this.assignSubreddit();
    this.paused = false;
    this.assignStatus();
    this.maxPosts = limit;
    let ignoreNewestHours = 24 * 40;
    this.endTime = Math.floor(Date.now()/1000 - (3600 * ignoreNewestHours));
    this.createTime = 0;
    this.analyze = new AnalyzePosts;
    this.r.getSubreddit(this.targetSubreddit).fetch().then(subInfo => {
      this.createTime = subInfo.created_utc;
      this.assignCreateTime();
      this.getPosts();
    });
  }

  // {query: `timestamp:${this.createTime}..${this.endTime}`,
  //   sort: "new",
  //   time: "all",
  //   syntax: "cloudsearch",
  //   limit: 100}

  getPosts() {
    let startLength = this.posts.length;

    $.ajax({
      method: 'GET',
      url: `https://api.pushshift.io/reddit/search/submission/?subreddit=${this.targetSubreddit}&size=200&before=${this.endTime}`
    })
    .then( (response) =>{
      let results = response.data;
      console.log(results);
      for (let i = 0; i < 200; i++) {
        if (results[i] && results[i].author !== "[deleted]") {
          this.posts.push(results[i]);
        }
      }
      this.assignPostDetails();
      this.analyze.receivePosts(this.posts);
      this.endTime = this.posts[this.posts.length - 1].created_utc - 1;
      if (this.posts.length < this.maxPosts && !this.paused && startLength !== this.posts.length) {
        this.getPosts();
      } else if (this.posts.length >= this.maxPosts || startLength == this.posts.length) {
        this.assignCompleteStatus();
      }
    }
  );


    // this.r.getSubreddit(this.targetSubreddit)
    //   .search({query: `timestamp:${this.createTime}..${this.endTime}`,
    //            sort: "new",
    //            time: "all",
    //            syntax: "cloudsearch",
    //            limit: 100})
    //   .then( (results) =>{
    //     for (let i = 0; i < 100; i++) {
    //       if (results[i]) {
    //         this.posts.push(results[i]);
    //       }
    //     }
    //     this.assignPostDetails();
    //     this.analyze.receivePosts(this.posts);
    //     this.endTime = this.posts[this.posts.length - 1].created - 1;
    //     if (this.posts.length < this.maxPosts && !this.paused && startLength !== this.posts.length) {
    //       this.getPosts();
    //     } else if (this.posts.length >= this.maxPosts || startLength == this.posts.length) {
    //       this.assignCompleteStatus();
    //     }
    //   }
    // );
  }

  pause() {
    this.paused = !this.paused;
    this.assignStatus();
    if (!this.paused) {
      this.getPosts();
      let pauseButton = document.getElementById("pause-button");
      pauseButton.innerHTML = "Pause";
    } else {
      let pauseButton = document.getElementById("pause-button");
      pauseButton.innerHTML = "Resume";
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

  assignCompleteStatus() {
    let el = document.getElementById("search-status");
    el.innerHTML = "Complete";
  }

  assignPostDetails() {
    let el = document.getElementById("total-post-count");
    el.innerHTML = this.posts.length;
    el  = document.getElementById("most-recent");
    let mostRecent = new Date(this.posts[0].created_utc * 1000);
    el.innerHTML = mostRecent.toLocaleString();
    el  = document.getElementById("oldest-post");
    let oldestPost = new Date(this.posts[this.posts.length -1].created_utc * 1000);
    el.innerHTML = oldestPost.toLocaleString();
  }

  updateKeyword(keyword) {
    this.analyze.updateKeyword(keyword);
  }

  constructSnoowrap() {
    let credentials = [
      {
        userAgent: "Reddit Smarter is a tool for providing insight into karma patterns by subreddit",
        clientId: "L1P4DbaMoN1kqA",
        clientSecret: "f89SF6w8jHhLdrlBIJOekEMSXyA",
        username: "RedditSmarterBot1",
        password: "UseRedditSmarter"
      },
      {
        userAgent: "A bot to help people improve the quality of their posts on Reddit.",
        clientId: "HBC2OGQ6A40jMQ",
        clientSecret: "-5AwD-_E9oWAxp8bcSSErg1JFKM",
        username: "RedditSmarterBot2",
        password: "UseRedditSmarter"
      }
    ];

    return new snoowrap(credentials[Math.floor(Math.random() * credentials.length)]);
  }
}

export default PostGrabber;
