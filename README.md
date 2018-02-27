# [Reddit Smarter](https://reddit-smarter.herokuapp.com/)

## Background and Overview

Reddit Smarter is a data analytics tool for Reddit users to gain useful insight into trends on the social media platform's many communities (called 'subreddits').

When a user types the name of a subreddit into the search feature, Reddit Smarter pulls the most recent posts to that subreddit and plots the the average karma received on each post by time of day posted, the total karma awarded by time of day, the average karma a post receives by the length of the title, and it allows users to query for certain keywords in post titles to see how posts with those keywords in the title perform compared to posts without the keywords.

Reddit limits the rate at which requests can be made to their API and the size of the requests that can be made, but Reddit Smarter gathers post information at the maximum rate allowed by the Reddit API, and displays the results dynamically changing as more information is received received.

## Features

* Collection of posts by Subreddit ordered by time posted (newest to oldest) through Reddit API using Cloudsearch
* Analysis of average karma by time of day posted (in Reddit Smarter user's local timezone)
* Analysis of average karma by post title length and by inclusion of keyword
* Visual display powered by Graph.js

### Post Collection

Access to Reddit's API was achieved using the [snoowrap](https://github.com/not-an-aardvark/snoowrap) JavaScript package. To eliminate the need for users to authenticate with Reddit Smarter in order to use the site and avoid the need to store and track users' authentication tokens on the backend, Reddit Smarter runs as a Reddit Script, using its own API access keys to interact with Reddit's API.

Reddit does not allow more than 1000 search results to be collected from a single search using any of their methods of search, and the ability to limit search results by time posted is only available using cloudsearch, so Reddit Smarter takes advantage of this feature.

```js
getPosts() {
  let startLength = this.posts.length;
  this.r.getSubreddit(this.targetSubreddit)
    .search({query: `timestamp:${this.createTime}..${this.endTime}`,
             sort: "new", time: "all", syntax: "cloudsearch", limit: 100})
    .then( (results) =>{
      for (let i = 0; i < 100; i++) {
        if (results[i]) {
          this.posts.push(results[i]);
        }
      }
      this.assignPostDetails();
      this.analyze.receivePosts(this.posts);
      this.endTime = this.posts[this.posts.length - 1].created - 1;
      if (this.posts.length < this.maxPosts &&
          !this.paused &&
          startLength !== this.posts.length) {
        this.getPosts();
      } else if (this.posts.length >= this.maxPosts ||
                 startLength == this.posts.length) {
        this.assignCompleteStatus();
      }
    }
  );
}
```

The above code demonstrates the collection of posts. First the targeted subreddit is selected, and a search is conducted on the subreddit, collecting 100 posts that were posted between the time the subreddit was created and the value in the `endTime` variable, which starts out set to the current time minus 36 hours (to avoid posts that are new and will still gain much more karma from skewing the results). Finally, the search also requests that the results be sorted with the newest posts coming first.

This is important for the next step, which will push any results received into the array of results that is being tracked. The next two commands `this.assignPostDetails()` and `this.analyze.receivePosts(this.posts)` will update the header info on the page and update the graphs on the page with the new information that has been collected. Next, the value of `endTime` is set to the time at which the oldest post we have collected was posted (minus 1ms).

Next, function decides whether it should call itself again. If we have not reached the maximum number of posts that Reddit Smarter allows (25,000) and if some posts were collected by the last search (meaning we haven't reached the end of all the posts on the subreddit), and the search has not been paused, then the getPosts method will call itself again to continue collecting more posts (but this time the range of times being searched will exclude the times at which the posts we have collected were posted, because the value of `endTime` has been changed). If the end of the posts have been reached, it will let users know that the search is complete by changing the status to "Complete".
