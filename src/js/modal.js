/**
 * @module Modal Window
 * @copyright Roman Zino 2016
 */

import LoadingScreen from './loadingscreen';
import Blackout from './blackout';

class Modal extends Blackout {

    /**
     * @constructor
     * @param {object|string} parameter
     * @return {void}
     */
    constructor(parameter, open = true) {
        super();

        let typeofParameter = typeof parameter;

        if (typeofParameter === 'object') {
            this.$el = parameter;

            this._initializeModal(open);
        }
        else if (typeofParameter === 'string') {
            let loadPromise = this._loadModal(parameter);
            
            LoadingScreen.show();

            loadPromise.then((modalHTML) => {
                
                setTimeout(() => {
                    this.$el = this._addModal(modalHTML);
                    let loadingScreenPromise = LoadingScreen.hide();

                    loadingScreenPromise.then(() => this._initializeModal(open));
                }, 10000);

            }, () => {
                throw new Error(`An error occurred while loading modal from ${parameter}`);
            });
        }
        else {
            throw new Error('Wrong parameter for the Modal');
        }
    }

    /**
     * Opens the modal
     * @public
     * @return {void}
     */
    openModal() {
        super.show();
    }

    /**
     * Closes the modal
     * @public
     * @return {void}
     */
    closeModal() {
        super.hide();
    }

    /**
     * Initializes the modal
     * @private
     * @param  {boolean} open
     * @return {void}
     */
    _initializeModal(open) {
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
    _addEventListeners() {
        let $closeToggle = this.$el.find('[data-close*="modal"]');
        let $target;

        //Close the modal when user clicking on the close button
        $closeToggle.click((event) => {
            this.closeModal();
            event.preventDefault();
        });

        //Close the modal when user clicking on the background
        this.$el.click((event) => {
            $target = $(event.target);
            
            if (!($target.is('[data-modal-el="dialog"]')) && !($target.closest('[data-modal-el="dialog"]').length)) {
               this.closeModal(); 
            }

            event.preventDefault();
        });
    }

    /**
     * Get the last modal ID
     * @private
     * @return {number}
     */
    _getLastModalID() {
        let lastModalID = $('[data-modal*="modal"]')
            .last()
                .attr('data-modal')
                    .match(/\d/)
                    .join()

        return parseInt(lastModalID);
    }

    /**
     * Creates the new modal ID
     * @private
     * @param  {number} lastModalID
     * @return {number}
     */
    _createModalID(lastModalID) {
        return lastModalID + 1;
    }

    _setModalID($modal, modalID) {
        return $modal.attr('data-el', `modal-${modalID}`);
    }

    /**
     * Loads the modal from remote url
     * @private
     * @param  {string} url
     * @return {object}
     */
    _loadModal(url) {
        let loadPromise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'GET',
                timeout: 10000,
                success: (data) => {
                    resolve(data);
                },
                error: () => {
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
    _addModal(modalHTML) {
        let $modal = $(modalHTML);
        let lastModalID = this._getLastModalID();
        let modalID = this._createModalID(lastModalID);

        $modal = this._setModalID($modal, modalID);

        return $modal.appendTo(this.$body);
    }
}

(function () {
    let initializedModals = new Map();

    /**
     * Open the modal when user clicking on the modal toggle
     */
    $('[data-open*="modal"]').click((event) => {
        let modalID = getModalID(event.target);
        let initializedModal = initializedModals.get(modalID);

        if (!initializedModal) {
            /**
             * The modal we should open
             * @type {object}
             */
            let $modal = $(`[data-modal="${modalID}"]`);

            if ($modal.length > 1) {
                throw new Error(`There is a couple modals with the same ID = ${modalID} !`);
            }
            else if ($modal.length < 1) {
                console.info(`There is no the modal with the ID = ${modalID} !`)
            }
            else {
                initializeModal(modalID, $modal);
            }
        }
        else {
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
        let $target = $(target);
        let modalID = $target.attr('data-open');

        return modalID;
    }

    /**
     * Creates the new modal
     * @param  {string} modalID
     * @param  {object} $modal
     * @return {object}
     */
    function initializeModal(modalID, $modal) {
        let modal = new Modal($modal);
        
        return initializedModals.set(modalID, modal);
    }

})();

window.Kvak = window.Kvak || {};
Kvak.Modal = Modal;