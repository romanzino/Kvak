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

	module.exports = __webpack_require__(4);


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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _blackout = __webpack_require__(1);
	
	var _blackout2 = _interopRequireDefault(_blackout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LoadingScreen = new _blackout2.default($('[data-el="loading-screen"]')); /**
	                                                                              * @module Loading Window
	                                                                              * @copyright Roman Zino 2016
	                                                                              */
	
	window.Kvak = window.Kvak || {};
	Kvak.LoadingScreen = LoadingScreen;
	
	exports.default = LoadingScreen;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _loadingscreen = __webpack_require__(3);
	
	var _loadingscreen2 = _interopRequireDefault(_loadingscreen);
	
	var _blackout = __webpack_require__(1);
	
	var _blackout2 = _interopRequireDefault(_blackout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module Modal Window
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Roman Zino 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Modal = function (_Blackout) {
	    _inherits(Modal, _Blackout);
	
	    /**
	     * @constructor
	     * @param {object|string} parameter
	     * @return {void}
	     */
	
	    function Modal(parameter) {
	        var open = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	        _classCallCheck(this, Modal);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this));
	
	        var typeofParameter = typeof parameter === 'undefined' ? 'undefined' : _typeof(parameter);
	
	        if (typeofParameter === 'object') {
	            _this.$el = parameter;
	
	            _this._initializeModal(open);
	        } else if (typeofParameter === 'string') {
	            var loadPromise = _this._loadModal(parameter);
	
	            _loadingscreen2.default.show();
	
	            loadPromise.success(function (modalHTML) {
	                _this.$el = _this._addModal(modalHTML);
	
	                _loadingscreen2.default.getElement().on('kvak.el.hidden', function () {
	                    return _this._initializeModal(open);
	                });
	                _loadingscreen2.default.hide();
	            }).error(function () {
	                throw new Error('An error occurred while loading modal from ' + parameter);
	            });
	        } else {
	            throw new Error('Wrong parameter for the Modal');
	        }
	        return _this;
	    }
	
	    /**
	     * Opens the modal
	     * @public
	     * @return {void}
	     */
	
	
	    _createClass(Modal, [{
	        key: 'openModal',
	        value: function openModal() {
	            _get(Object.getPrototypeOf(Modal.prototype), 'show', this).call(this);
	        }
	
	        /**
	         * Closes the modal
	         * @public
	         * @return {void}
	         */
	
	    }, {
	        key: 'closeModal',
	        value: function closeModal() {
	            _get(Object.getPrototypeOf(Modal.prototype), 'hide', this).call(this);
	        }
	
	        /**
	         * Initializes the modal
	         * @private
	         * @param  {boolean} open
	         * @return {void}
	         */
	
	    }, {
	        key: '_initializeModal',
	        value: function _initializeModal(open) {
	            if (open) {
	                this.openModal();
	            }
	
	            this._addEventListeners();
	        }
	
	        /**
	         * Event listeners
	         * @private
	         * @return {void}
	         */
	
	    }, {
	        key: '_addEventListeners',
	        value: function _addEventListeners() {
	            var _this2 = this;
	
	            var $closeToggle = this.$el.find('[data-close*="modal"]');
	            var $target = undefined;
	
	            //Close the modal when user clicking on the close button
	            $closeToggle.click(function (event) {
	                _this2.closeModal();
	                event.preventDefault();
	            });
	
	            //Close the modal when user clicking on the background
	            this.$el.click(function (event) {
	                $target = $(event.target);
	
	                if (!$target.is('[data-modal-el="dialog"]') && !$target.closest('[data-modal-el="dialog"]').length) {
	                    _this2.closeModal();
	                }
	
	                event.preventDefault();
	            });
	        }
	
	        /**
	         * Get the last modal ID
	         * @private
	         * @return {number}
	         */
	
	    }, {
	        key: '_getLastModalID',
	        value: function _getLastModalID() {
	            var lastModalID = $('[data-modal*="modal"]').last().attr('data-modal').match(/\d/).join();
	
	            return parseInt(lastModalID);
	        }
	
	        /**
	         * Creates the new modal ID
	         * @private
	         * @param  {number} lastModalID
	         * @return {number}
	         */
	
	    }, {
	        key: '_createModalID',
	        value: function _createModalID(lastModalID) {
	            return lastModalID + 1;
	        }
	    }, {
	        key: '_setModalID',
	        value: function _setModalID($modal, modalID) {
	            return $modal.attr('data-el', 'modal-' + modalID);
	        }
	
	        /**
	         * Loads the modal from remote url
	         * @private
	         * @param  {string} url
	         * @return {object}
	         */
	
	    }, {
	        key: '_loadModal',
	        value: function _loadModal(url) {
	            return $.ajax({
	                url: url,
	                type: 'GET',
	                timeout: 10000
	            });
	        }
	
	        /**
	         * Adds the loaded modal to DOM
	         * @private
	         * @param {object} modal
	         * @return {object}
	         */
	
	    }, {
	        key: '_addModal',
	        value: function _addModal(modalHTML) {
	            var $modal = $(modalHTML);
	            var lastModalID = this._getLastModalID();
	            var modalID = this._createModalID(lastModalID);
	
	            $modal = this._setModalID($modal, modalID);
	
	            return $modal.appendTo(this.$body);
	        }
	    }]);
	
	    return Modal;
	}(_blackout2.default);
	
	{
	    (function () {
	
	        /**
	         * Gets modal's ID in the DOM
	         * @param  {object} target
	         * @return {string}
	         */
	
	        var getModalID = function getModalID(target) {
	            var $target = $(target);
	            var modalID = $target.attr('data-open');
	
	            return modalID;
	        };
	
	        /**
	         * Creates the new modal
	         * @param  {string} modalID
	         * @param  {object} $modal
	         * @return {object}
	         */
	
	
	        var initializeModal = function initializeModal(modalID, $modal) {
	            var modal = new Modal($modal);
	
	            return initializedModals.set(modalID, modal);
	        };
	
	        var initializedModals = new Map();
	
	        /**
	         * Open the modal when user clicking on the modal toggle
	         */
	        $('[data-open*="modal"]').click(function (event) {
	            var modalID = getModalID(event.target);
	            var initializedModal = initializedModals.get(modalID);
	
	            if (!initializedModal) {
	                /**
	                 * The modal we should open
	                 * @type {object}
	                 */
	                var $modal = $('[data-modal="' + modalID + '"]');
	
	                if ($modal.length > 1) {
	                    throw new Error('There is a couple modals with the same ID = ' + modalID + ' !');
	                } else if ($modal.length < 1) {
	                    console.info('There is no the modal with the ID = ' + modalID + ' !');
	                } else {
	                    initializeModal(modalID, $modal);
	                }
	            } else {
	                initializedModal.openModal();
	            }
	
	            event.preventDefault();
	        });
	    })();
	}
	
	window.Kvak = window.Kvak || {};
	Kvak.Modal = Modal;
	
	exports.default = Modal;

/***/ }
/******/ ]);
//# sourceMappingURL=modal.bundle.js.map