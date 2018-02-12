import PostGrabber from './post_grabber';



document.addEventListener("DOMContentLoaded", () => {
  let subredditSearchForm = document.getElementById("subreddit-search-form");
  subredditSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    gatherPosts(e.target[0].value);
  });
  let hw = document.createElement("P");
  hw.innerHTML = "Hello World";
  document.getElementsByTagName('body')[0].appendChild(hw);
});

let gatherPosts = subredditName => {
  let p = new PostGrabber(subredditName, 2000);
};
