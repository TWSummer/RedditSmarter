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
    this.paused = false;
    this.maxPosts = limit;
    let ignoreNewestHours = 36;
    this.endTime = Math.floor(Date.now()/1000 - (3600 * ignoreNewestHours));
    this.createTime = 0;
    this.analyze = new AnalyzePosts;
    this.r.getSubreddit(this.targetSubreddit).fetch().then(subInfo => {
      this.createTime = subInfo.created_utc;
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
        this.analyze.receivePosts(this.posts);
        this.endTime = this.posts[this.posts.length - 1].created_utc;
        if (this.posts.length < this.maxPosts && !this.paused && startLength !== this.posts.length) {
          this.getPosts();
        }
      }
    );
  }

  pause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.getPosts();
    }
  }

  destroy() {
    this.analyze.destroy();
  }
}

export default PostGrabber;
