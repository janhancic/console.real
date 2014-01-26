;(function (console, JSON) {
'use strict';

if (typeof console.real !== 'undefined') {
	throw new Error('console.real cannot be run, as something else is occupying the `console.real` object.')
}

console.real = {};

var originalConsoleFunctions = {},
	consoleFunctionNames = ['log', 'info', 'error', 'warn'];

consoleFunctionNames.forEach(function (consoleFunctionName) {
	originalConsoleFunctions[consoleFunctionName] = console[consoleFunctionName];

	console.real[consoleFunctionName] = function (/* arguments */) {
		if (arguments.length === 0) {
			originalConsoleFunctions[consoleFunctionName]();
			return;
		}

		var args = Array.prototype.slice.call(arguments).map(function(argument) {
			return JSON.parse(JSON.stringify(argument));
		});

		originalConsoleFunctions[consoleFunctionName].apply(console, args);
	};
});

/**
 * "Installs" the augmented console functions into the `console` object, replacing the originals.
 */
console.real.install = function () {
	consoleFunctionNames.forEach(function(consoleFunctionName) {
		console[consoleFunctionName] = console.real[consoleFunctionName];
	});
};

}(console, JSON));
