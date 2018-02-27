# [Reddit Smarter](https://reddit-smarter.herokuapp.com/)

### Background and Overview

Reddit Smarter is a data analytics tool for Reddit users to gain useful insight into trends on the social media platform's many communities (called 'subreddits').

When a user types the name of a subreddit into the search feature, Reddit Smarter pulls the most recent posts to that subreddit and plots the the average karma received on each post by time of day posted, the total karma awarded by time of day, the average karma a post receives by the length of the title, and it allows users to query for certain keywords in post titles to see how posts with those keywords in the title perform compared to posts without the keywords.

Reddit limits the rate at which requests can be made to their API and the size of the requests that can be made, but Reddit Smarter gathers post information at the maximum rate allowed by the Reddit API, and displays the results dynamically changing as more information is received received.

### Features

* Post history collection by Subreddit through Reddit API using Cloudsearch
* Analysis of average karma by time of day posted (in Reddit Smarter user's local timezone)
* Analysis of average karma by post title length and by inclusion of keyword
* Visual display powered by Graph.js
