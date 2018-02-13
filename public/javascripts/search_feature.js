import PostGrabber from './post_grabber';

class SearchFeature {
  constructor() {
    this.subredditSearchForm = document.getElementById("subreddit-search-form");
    this.subredditSearchForm.addEventListener("submit", this.submitEvent.bind(this));
  }

  submitEvent(e) {
    e.preventDefault();
    if (this.postGrabber && !this.postGrabber.paused) {
      this.pausePostLoad();
    }
    this.gatherPosts(e.target[0].value);
    this.addPauseButton.bind(this)();
  }

  addPauseButton() {
    if (!this.pauseButton) {
      this.pauseButton = document.createElement("button");
      this.pauseButton.innerHTML="Pause/Resume";
      this.pauseButton.addEventListener("click", this.pausePostLoad.bind(this));
      let header = document.getElementById("search-header");
      header.appendChild(this.pauseButton);
    }
  }

  pausePostLoad() {
    this.postGrabber.pause();
  }

  gatherPosts (subredditName)
  {
    this.postGrabber = new PostGrabber(subredditName, 2000);
  }
}

export default SearchFeature;
