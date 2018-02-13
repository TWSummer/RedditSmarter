import SearchFeature from './search_feature';

let p;

document.addEventListener("DOMContentLoaded", () => {
  let searchFeature = new SearchFeature();
  let hw = document.createElement("P");
  hw.innerHTML = "Hello World";
  document.getElementsByTagName('body')[0].appendChild(hw);
});

// let gatherPosts = subredditName => {
//   p = new PostGrabber(subredditName, 2000);
// };
