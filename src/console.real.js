;(function (console) {
'use strict';

if (typeof console.real !== 'undefined') {
	throw new Error('console.real cannot be run, as something else is occupying the `console.real` object.')
}

console.real = {};

['log', 'info', 'error', 'warn'].forEach(function (consoleFunctionName) {
	console.real[consoleFunctionName] = function (/* arguments */) {
		if (arguments.length === 0) {
			console[consoleFunctionName]();
			return;
		}

		var args = Array.prototype.slice.call(arguments).map(function(argument) {
			return JSON.parse(JSON.stringify(argument));
		});

		console[consoleFunctionName].apply(console, args);
	};
});

}(console));
