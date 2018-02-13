/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 152);
/******/ })
/************************************************************************/
/******/ ({

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _search_feature = __webpack_require__(153);

var _search_feature2 = _interopRequireDefault(_search_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var p = void 0;

document.addEventListener("DOMContentLoaded", function () {
  var searchFeature = new _search_feature2.default();
  var hw = document.createElement("P");
  hw.innerHTML = "Hello World";
  document.getElementsByTagName('body')[0].appendChild(hw);
});

// let gatherPosts = subredditName => {
//   p = new PostGrabber(subredditName, 2000);
// };

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _post_grabber = __webpack_require__(154);

var _post_grabber2 = _interopRequireDefault(_post_grabber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchFeature = function () {
  function SearchFeature() {
    _classCallCheck(this, SearchFeature);

    this.subredditSearchForm = document.getElementById("subreddit-search-form");
    this.subredditSearchForm.addEventListener("submit", this.submitEvent.bind(this));
  }

  _createClass(SearchFeature, [{
    key: "submitEvent",
    value: function submitEvent(e) {
      e.preventDefault();
      if (this.postGrabber && !this.postGrabber.paused) {
        this.pausePostLoad();
      }
      this.gatherPosts(e.target[0].value);
      this.addPauseButton.bind(this)();
    }
  }, {
    key: "addPauseButton",
    value: function addPauseButton() {
      if (!this.pauseButton) {
        this.pauseButton = document.createElement("button");
        this.pauseButton.innerHTML = "Pause/Resume";
        this.pauseButton.addEventListener("click", this.pausePostLoad.bind(this));
        var header = document.getElementById("search-header");
        header.appendChild(this.pauseButton);
      }
    }
  }, {
    key: "pausePostLoad",
    value: function pausePostLoad() {
      this.postGrabber.pause();
    }
  }, {
    key: "gatherPosts",
    value: function gatherPosts(subredditName) {
      this.postGrabber = new _post_grabber2.default(subredditName, 2000);
    }
  }]);

  return SearchFeature;
}();

exports.default = SearchFeature;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token (16:8)\n\n\u001b[0m \u001b[90m 14 | \u001b[39m  \u001b[90m//     password: process.env.PASSWORD\u001b[39m\n \u001b[90m 15 | \u001b[39m  \u001b[90m//   });\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 16 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mposts \u001b[33m=\u001b[39m []\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 17 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mtargetSubreddit \u001b[33m=\u001b[39m target\u001b[33m;\u001b[39m\n \u001b[90m 18 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mpaused \u001b[33m=\u001b[39m \u001b[36mfalse\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 19 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mmaxPosts \u001b[33m=\u001b[39m limit\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map