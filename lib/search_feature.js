import PostGrabber from './post_grabber';

class SearchFeature {
  constructor() {
    let subredditSearchForm = document.getElementById("subreddit-search-form");
    subredditSearchForm.addEventListener("submit", this.submitEvent.bind(this));
  }

  submitEvent(e) {
    e.preventDefault();
    this.gatherPosts(e.target[0].value);
  }

  gatherPosts (subredditName)
  {
    this.postGrabber = new PostGrabber(subredditName, 2000);
  }
}

export default SearchFeature;
