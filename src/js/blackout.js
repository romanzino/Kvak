/**
 * @module Blackout Window
 * @copyright Roman Zino 2016
 */

import isTransitionEnabled from './helpers/istransitionenabled';

class Blackout {
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
	 * Returns current element
	 * @return {object} DOM Element
	 */
	getElement() {
		return this.$el;
	}

	/**
	 * Shows the screen
	 * @public
	 * @return {object} - DOM Element
	 */
	show() {
		this.$body.addClass('overflow-hidden');
		this.$el.addClass(this.classNameOpened);
		
		if (isTransitionEnabled(this.$el)) {
			//Wait for the transition
			this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
				this.$el.trigger('kvak.el.shown');
			});
		}
		else {
			this.$el.trigger('kvak.el.shown');
		}

		return this.$el;
	}

	/**
	 * Hides the screen
	 * @public
	 * @return {object} - DOM Element
	 */
	hide() {
		this.$el.removeClass(this.classNameOpened);
		
		if (isTransitionEnabled(this.$el)) {
			//Wait for the transition
			this.$el.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', () => {
				this.$body.removeClass('overflow-hidden');
				this.$el.trigger('kvak.el.hidden');
			});
		}
		else {
			this.$el.trigger('kvak.el.hidden');
		}

		return this.$el;
	}
}

window.Kvak = window.Kvak || {};
Kvak.Blackout = Blackout;

export default Blackout;