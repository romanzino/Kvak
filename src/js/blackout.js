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
	 * @return {object} - DOM Element
	 */
	show() {
		this.$body.addClass('overflow-hidden');
		this.$el.addClass(this.classNameOpened);
		
		//Wait for the transition
		this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
			this.$el.trigger('kvak.el.shown');
		});

		return this.$el;
	}

	/**
	 * Hides the screen
	 * @public
	 * @return {object} - DOM Element
	 */
	hide() {
		this.$el.removeClass(this.classNameOpened);
		
		//Wait for the transition
		this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
			this.$body.removeClass('overflow-hidden');
			this.$el.trigger('kvak.el.hidden');
		});

		return this.$el;
	}
}