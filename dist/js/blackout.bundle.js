/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module Blackout Window
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright Roman Zino 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _istransitionenabled = __webpack_require__(2);
	
	var _istransitionenabled2 = _interopRequireDefault(_istransitionenabled);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Blackout = function () {
		/**
	  * @constructor
	  * @param {object|null} $el - DOM Element
	  * @return {void}
	  */
	
		function Blackout() {
			var $el = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
			_classCallCheck(this, Blackout);
	
			this.classNameOpened = 'blackout--open';
			this.$body = $(document.body);
	
			if ($el) {
				this.$el = $el;
			}
		}
	
		/**
	  * Returns current element
	  * @return {object} DOM Element
	  */
	
	
		_createClass(Blackout, [{
			key: 'getElement',
			value: function getElement() {
				return this.$el;
			}
	
			/**
	   * Shows the screen
	   * @public
	   * @return {object} - DOM Element
	   */
	
		}, {
			key: 'show',
			value: function show() {
				var _this = this;
	
				this.$body.addClass('overflow-hidden');
				this.$el.addClass(this.classNameOpened);
	
				if ((0, _istransitionenabled2.default)(this.$el)) {
					//Wait for the transition
					this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
						_this.$el.trigger('kvak.el.shown');
					});
				} else {
					this.$el.trigger('kvak.el.shown');
				}
	
				return this.$el;
			}
	
			/**
	   * Hides the screen
	   * @public
	   * @return {object} - DOM Element
	   */
	
		}, {
			key: 'hide',
			value: function hide() {
				var _this2 = this;
	
				this.$el.removeClass(this.classNameOpened);
	
				if ((0, _istransitionenabled2.default)(this.$el)) {
					//Wait for the transition
					this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
						_this2.$body.removeClass('overflow-hidden');
						_this2.$el.trigger('kvak.el.hidden');
					});
				} else {
					this.$el.trigger('kvak.el.hidden');
				}
	
				return this.$el;
			}
		}]);
	
		return Blackout;
	}();
	
	window.Kvak = window.Kvak || {};
	Kvak.Blackout = Blackout;
	
	exports.default = Blackout;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks is transition enabled for current element
	 * @param  {object}  $el - DOM element
	 * @return {Boolean}
	 */
	function isTransitionEnabled($el) {
	  var transitionDuration = parseFloat($el.css('transition-duration'));
	
	  return transitionDuration > 0 ? true : false;
	}
	
	exports.default = isTransitionEnabled;

/***/ }
/******/ ]);
//# sourceMappingURL=blackout.bundle.js.map