/**
 * @module Blackout Window
 * @copyright Roman Zino 2016
 */

export default class Blackout {
	/**
	 * @constructor
	 * @param {object|null} $el - DOM Element
	 * @return {void}
	 */
	constructor($el = null) {
		this.classNameOpened = 'blackout--open';
		this.$body = $(document.body);

		if ($el) {
			this.$el = $el;	
		}
	}

	/**
	 * Shows the screen
	 * @public
	 * @return {void}
	 */
	show() {
		this.$body.addClass('overflow-hidden');
		this.$el.addClass(this.classNameOpened);
	}

	/**
	 * Hides the screen
	 * @public
	 * @return {object} - Promise
	 */
	hide() {
		let transitionEndPromise = new Promise((resolve, reject) => {
			this.$el.removeClass(this.classNameOpened);
			//Wait for the transition
			this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
				this.$body.removeClass('overflow-hidden');
				resolve();
			});
		});

		return transitionEndPromise;
	}
}