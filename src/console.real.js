;(function (console) {
'use strict';

if (typeof console.real !== 'undefined') {
	throw new Error('console.real cannot be run, as something else is occupying the `console.real` object.')
}

}(console));
