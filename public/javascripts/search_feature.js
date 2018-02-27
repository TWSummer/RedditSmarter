import PostGrabber from './post_grabber';

class SearchFeature {
  constructor() {
    this.subredditSearchForm = document.getElementById("subreddit-search-form");
    this.subredditSearchForm.addEventListener("submit", this.submitEvent.bind(this));
    this.keywordSearch = document.getElementById("keyword-search");
    this.keywordSearch.addEventListener("keyup", this.changeKeywordEvent.bind(this));
  }

  submitEvent(e) {
    e.preventDefault();
    this.showDetails();
    if (this.postGrabber) {
      if (!this.postGrabber.paused) {
        this.pausePostLoad();
      }
      this.postGrabber.destroy();
    }
    this.gatherPosts(e.target[0].value);
    this.addPauseButton.bind(this)();
  }

  changeKeywordEvent(e) {
    if (this.postGrabber) {
      this.postGrabber.updateKeyword(e.target.value);
    }
  }

  addPauseButton() {
    if (!this.pauseButton) {
      this.pauseButton = document.createElement("button");
      this.pauseButton.innerHTML="Pause";
      this.pauseButton.setAttribute("id", "pause-button");
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
    this.postGrabber = new PostGrabber(subredditName, 25000);
  }

  showDetails() {
    let el = document.getElementById("posts-details");
    el.classList.add("active");
    let graphs = document.getElementsByClassName("graph-box");
    [].forEach.call(graphs, (graph) => {
      graph.classList.add("active");
    });
    el = document.getElementById("keyword-search");
    el.classList.add("active");
    el = document.getElementById("keywords-details");
    el.classList.add("active");
  }
}

export default SearchFeature;
