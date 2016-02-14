'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * THE MODAL
 */

var Modal = function () {

    /**
     * Default modal class name
     * @type {String}
     */
    var classNameDefault = 'modal';
    /**
     * Modifier for the modal when it is open
     * @return {String}
     */
    var classNameOpened = function () {
        return classNameDefault + '--open';
    }();
    /**
     * @type {Object}
     */
    var $body = $('body');

    var Modal = function () {
        /**
         * @param  {object} DOMElement
         * @param  {string} remoteURL
         * @return {void}
         */

        function Modal(_ref) {
            var DOMElement = _ref.DOMElement;
            var remoteURL = _ref.remoteURL;

            _classCallCheck(this, Modal);

            if (DOMElement) {
                this.$el = $(DOMElement);
            } else {
                //todo
            }

            this.open();
            this._listenForClose();
        }

        /**
         * Opens the modal
         * @return {void}
         */


        _createClass(Modal, [{
            key: 'open',
            value: function open() {
                $body.addClass('overflow-hidden');
                this.$el.addClass(classNameOpened);
            }

            /**
             * Closes the modal
             * @return {void}
             */

        }, {
            key: 'close',
            value: function close() {
                $body.removeClass('overflow-hidden');
                this.$el.removeClass(classNameOpened);
            }

            /**
             * Listens some actions and closes the modal
             * @return {void}
             */

        }, {
            key: '_listenForClose',
            value: function _listenForClose() {
                var _this = this;

                var $closeToggle = this.$el.find('[data-close*="modal"]');
                var $target = undefined;

                $closeToggle.click(function (event) {
                    _this.close();
                    event.preventDefault();
                });

                //Close the modal when user clicking on the background
                this.$el.click(function (event) {
                    $target = $(event.target);

                    if (!$target.is('[data-el="modal-dialog"]') && !$target.closest('[data-el="modal-dialog"]').length) {
                        _this.close();
                    }

                    event.preventDefault();
                });
            }
        }]);

        return Modal;
    }();

    /**
     * Open the modal when user clicking on the modal toggle
     */


    $('[data-open*="modal"]').click(function (event) {
        var $toggle = $(event.target);
        /**
         * The modal's identifier in the DOM
         * @type {number}
         */
        var targetID = $toggle.attr('data-open');
        var $target = $('[data-el="' + targetID + '"]');

        if ($target.length > 1) {
            throw new Error('There is a couple modals with the same ID = ' + targetID + ' !');
        } else if ($target.length < 1) {
            console.info('There isn\'t the modal with the ID = ' + targetID + ' !');
        } else {
            new Modal({
                DOMElement: $target
            });
        }

        event.preventDefault();
    });

    return Modal;
}();