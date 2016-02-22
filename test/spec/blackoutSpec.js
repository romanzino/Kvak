'use strict';

describe('Blackout module', function () {

	it('should know which class add to the opened window', function () {
		var blackoutWindow = new Kvak.Blackout();
		expect(blackoutWindow.classNameOpened).toBeDefined();
	});
	
});