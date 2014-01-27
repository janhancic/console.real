;(function (console, JSON) {
'use strict';

// code based on https://github.com/pvorb/node-clone
var clone = (function () {
	var cloneUtil = {
		isArray: function (ar) {
			return Array.isArray(ar) || (typeof ar === 'object' && Object.prototype.toString.call(ar) === '[object Array]');
		},
		isDate: function (d) {
			return typeof d === 'object' && Object.prototype.toString.call(d) === '[object Date]';
		},
		isRegExp: function (re) {
			return typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]';
		},
		getRegExpFlags: function (re) {
			var flags = '';
			re.global && (flags += 'g');
			re.ignoreCase && (flags += 'i');
			re.multiline && (flags += 'm');
			return flags;
		}
	};

	function clone(parent) {
		var useBuffer = typeof Buffer !== 'undefined',
			circularParent = {},
			circularResolved = {},
			circularReplace = [];

		function _clone(parent, context, child, cIndex) {
			var i;
			if (typeof parent == 'object') {
				if (parent == null) {
					return parent;
				}

				for (i in circularParent) {
					if (circularParent[i] === parent) {
						circularReplace.push({'resolveTo': i, 'child': child, 'i': cIndex});
						return null;
					}
				}

				circularParent[context] = parent;
				if (cloneUtil.isArray(parent)) {
					child = [];
					for(i in parent) {
						child[i] = _clone(parent[i], context + '[' + i + ']', child, i);
					}
				} else if (cloneUtil.isDate(parent)) {
					child = new Date(parent.getTime());
				} else if (cloneUtil.isRegExp(parent)) {
					child = new RegExp(parent.source, cloneUtil.getRegExpFlags(parent));
					if (parent.lastIndex) {
						child.lastIndex = parent.lastIndex;
					}
				} else if (useBuffer && Buffer.isBuffer(parent)) {
					child = new Buffer(parent.length);
					parent.copy(child);
				} else {
					child = {};
					child.__proto__ = parent.__proto__;
					for(i in parent) {
						child[i] = _clone(parent[i], context + '[' + i + ']', child, i);
					}
				}

				circularResolved[context] = child;
			} else {
				child = parent;
			}

			return child;
		}

		var i,
			cloned = _clone(parent, '*');

		for (i in circularReplace) {
			var c = circularReplace[i];
			if (c && c.child && c.i in c.child) {
				c.child[c.i] = circularResolved[c.resolveTo];
			}
		}

		return cloned;
	}

	return clone;
}());

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

		var args = Array.prototype.slice.call(arguments).map(clone);

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
