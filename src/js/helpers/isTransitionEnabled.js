/**
 * Checks is transition enabled for current element
 * @param  {object}  $el - DOM element
 * @return {Boolean}
 */
function isTransitionEnabled($el) {
	let transitionDuration = parseFloat($el.css('transition-duration'));

	return transitionDuration > 0 ? true : false
}


export default isTransitionEnabled;