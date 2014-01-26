;(function (console) {
'use strict';

if (typeof console.real !== 'undefined') {
	throw new Error('console.real cannot be run, as something else is occupying the `console.real` object.')
}

console.real = {};

console.real.log = function (/* arguments */) {
	if (arguments.length === 0) {
		console.log();
	}

	var args = Array.prototype.slice.call(arguments).map(function(argument) {
		return JSON.parse(JSON.stringify(argument));
	});

	console.log.call(console, args);
};

}(console));
