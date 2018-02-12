import PostGrabber from './post_grabber';

let p = new PostGrabber("likeus", 2000);

document.addEventListener("DOMContentLoaded", () => {
  let hw = document.createElement("P");
  hw.innerHTML = "Hello World";
  document.getElementsByTagName('body')[0].appendChild(hw);
});
