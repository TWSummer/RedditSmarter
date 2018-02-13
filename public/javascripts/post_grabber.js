import snoowrap from 'snoowrap';
// import { setENVVars } from '../config';

class PostGrabber {
  constructor(target, limit) {
    // setENVVars();
    this.r = new snoowrap({
      userAgent:ENV['USER_AGENT'],
      clientId: ENV['CLIENT_ID'],
      clientSecret: ENV['CLIENT_SECRET'],
      username: ENV['USERNAME'],
      password: ENV['PASSWORD']
    });
    this.posts = [];
    this.targetSubreddit = target;
    this.paused = false;
    this.maxPosts = limit;
    let ignoreNewestHours = 36;
    this.endTime = Math.floor(Date.now()/1000 - (3600 * ignoreNewestHours));
    this.createTime = 0;
    this.r.getSubreddit(this.targetSubreddit).fetch().then(subInfo => {
      this.createTime = subInfo.created_utc;
      this.getPosts();
    });
  }

  getPosts() {
    this.r.getSubreddit(this.targetSubreddit)
      .search({query: `timestamp:${this.createTime}..${this.endTime}`, sort: "new", time: "all", syntax: "cloudsearch", limit: 100})
      .then( (results) =>{
        for (let i = 0; i < 100; i++) {
          if (results[i]) {
            this.posts.push(results[i]);
          }
        }
        console.log(this.posts);
        this.endTime = this.posts[this.posts.length - 1].created_utc;
        if (this.posts.length < this.maxPosts && !this.paused) {
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
}

export default PostGrabber;
