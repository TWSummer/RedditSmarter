# Reddit Smarter

### Background and Overview

Reddit Smarter is a data analytics tool for Reddit users to gain useful insight into trends on the social media platform's many communities (called 'subreddits').

When a user types the name of a subreddit into the search feature, Reddit Smarter will pull the most recent posts to that subreddit and plot the number of posts made by time of day, the average karma received on each post by time of day posted, and will allow users to query for certain keywords in post titles to see how posts with those keywords in the title perform compared to posts without the keywords.

Reddit limits the rate at which requests can be made to their API and the size of the requests that can be made, so Reddit Smarter will gather post information at the maximum rate allowed by the Reddit API, and will display the results as they are being received.

### Functionality and MVP

With Reddit Smarter, users will be able to:

* Enter a subreddit to search
* Enter a maximum number of posts to pull
* Pause the API from pulling additional posts
* View the results of the API pulls as they are happening

### Wireframes

![Index](https://i.imgur.com/qKYmVfA.png)

### Architecture and Technologies

The project will be implemented using the following technologies:

* Vanilla JavaScript for overall structure and logic
* `D3.js` for data visualization
* `snoowrap` for interacting with Reddit's API
* Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, the following scripts will be created for this project:

### Implementation Timeline

##### Over the Weekend

- [ ] Complete project proposal
- [ ] Get familiar with snoowrap and D3 libraries

##### Day 1

- [ ] Set up project file structure
- [ ] Get webpack serving files to index.html
- [ ] Create search component
- [ ] Get snoowrap to begin pulling data from Reddit

##### Day 2

- [ ] Add ability to limit search to a certain number of posts
- [ ] Add ability to pause search
- [ ] Write logic to group posts by time of day and both sum and average the total karma
- [ ] Render total karma by time of day graph
- [ ] Render average karma by time of day graph

##### Day 3

- [ ] Add component to enter keywords for further analysis of post titles
- [ ] Write logic to group posts based upon whether they contain the keywords
- [ ] Render graph showing difference in average karma for posts with/without keywords

##### Day 4

- [ ] Display margin of error bars on graphs
- [ ] CSS styling
- [ ] Begin work on bonus features

### Bonus Features

- [ ] Add graph showing how number of characters in post title impacts average karma
- [ ] Allow users to search for a username rather than a subreddit. For that username show graphs of number of posts by subreddit, average karma per post by subreddit (where the user has made at least a certain number of posts), average karma by time of day, and total karma over time.
