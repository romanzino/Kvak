/**
 * THE MODAL
 */

const Modal = (() => {

    /**
     * Default modal class name
     * @type {String}
     */
    const classNameDefault = 'modal';
    /**
     * Modifier for the modal when it is open
     * @return {String}
     */
    const classNameOpened = (() => classNameDefault + '--open')();
    /**
     * @type {Object}
     */
    const $body = $('body');

    class Modal {
        /**
         * @param  {object} DOMElement
         * @param  {string} remoteURL
         * @return {void}
         */
        constructor({DOMElement, remoteURL}) {
            if (DOMElement) {
                this.$el = $(DOMElement);
            }
            else {
                //todo
            }

            this.open();
            this._listenForClose();
        }

        /**
         * Opens the modal
         * @return {void}
         */
        open() {
            $body.addClass('overflow-hidden');
            this.$el.addClass(classNameOpened);
        }

        /**
         * Closes the modal
         * @return {void}
         */
        close() {
            $body.removeClass('overflow-hidden');
            this.$el.removeClass(classNameOpened);
        }

        /**
         * Listens some actions and closes the modal
         * @return {void}
         */
        _listenForClose() {
            let $closeToggle = this.$el.find('[data-close*="modal"]');
            let $target;


            $closeToggle.click((event) => {
                this.close();
                event.preventDefault();
            });

            //Close the modal when user clicking on the background
            this.$el.click((event) => {
                $target = $(event.target);
                
                if (!($target.is('[data-el="modal-dialog"]')) && !($target.closest('[data-el="modal-dialog"]').length)) {
                   this.close(); 
                }

                event.preventDefault();
            });
        }
    }

    /**
     * Open the modal when user clicking on the modal toggle
     */
    $('[data-open*="modal"]').click((event) => {
        let $toggle = $(event.target);
        /**
         * The modal's identifier in the DOM
         * @type {number}
         */
        let targetID = $toggle.attr('data-open');
        let $target = $(`[data-el="${targetID}"]`);

        if ($target.length > 1) {
            throw new Error(`There is a couple modals with the same ID = ${targetID} !`);
        }
        else if ($target.length < 1) {
            console.info(`There isn't the modal with the ID = ${targetID} !`)
        }
        else {
            new Modal({
                DOMElement: $target
            });
        }

        event.preventDefault();
    });

    return Modal;

})();