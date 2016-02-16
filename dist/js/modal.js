'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* THE MODAL
*/

var Modal = function () {

    /**
     * @constructor
     * @param {object|string} parameter
     * @return {void}
     */

    function Modal(parameter) {
        var _this = this;

        var open = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        _classCallCheck(this, Modal);

        var typeofParameter = typeof parameter === 'undefined' ? 'undefined' : _typeof(parameter);
        this.$body = $(document.body);

        if (typeofParameter === 'object') {
            this.$el = $(parameter);
            this._initializeModal(open);
        } else if (typeofParameter === 'string') {
            var loadPromise = this._loadModal(parameter);

            loadPromise.then(function (modalHTML) {
                _this.$el = _this._addModal(modalHTML);
                _this._initializeModal(open);
            }, function () {
                throw new Error('An error occurred while loading modal from ' + parameter);
            });

            return;
        } else {
            throw new Error('Wrong parameter for the Modal');
        }
    }

    /**
    * Modifier for the modal when it is open
    * @type {String}
    */


    _createClass(Modal, [{
        key: 'openModal',


        /**
         * Opens the modal
         * @public
         * @return {void}
         */
        value: function openModal() {
            this.$body.addClass('overflow-hidden');
            this.$el.addClass(Modal.classNameOpened);
        }

        /**
         * Closes the modal
         * @public
         * @return {void}
         */

    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.$body.removeClass('overflow-hidden');
            this.$el.removeClass(Modal.classNameOpened);
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

                if (!$target.is('[data-el="modal-dialog"]') && !$target.closest('[data-el="modal-dialog"]').length) {
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
            var loadPromise = new Promise(function (resolve, reject) {
                $.ajax({
                    url: url,
                    type: 'GET',
                    timeout: 10000,
                    success: function success(data) {
                        resolve(data);
                    },
                    error: function error() {
                        reject();
                    }
                });
            });

            return loadPromise;
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
    }], [{
        key: 'classNameOpened',
        get: function get() {
            return 'modal--open';
        }
    }]);

    return Modal;
}();

(function () {
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
                console.info('There isn\'t the modal with the ID = ' + modalID + ' !');
            } else {
                initializeModal(modalID, $modal);
            }
        } else {
            initializedModal.openModal();
        }

        event.preventDefault();
    });

    /**
     * Gets modal's ID in the DOM
     * @param  {object} target
     * @return {string}
     */
    function getModalID(target) {
        var $target = $(target);
        var modalID = $target.attr('data-open');

        return modalID;
    }

    /**
     * Creates the new modal
     * @param  {string} modalID
     * @param  {object} $modal
     * @return {object}
     */
    function initializeModal(modalID, $modal) {
        var modal = new Modal($modal);

        return initializedModals.set(modalID, modal);
    }
})();
//# sourceMappingURL=modal.js.map
