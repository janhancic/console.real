# console.real
A simple augmentation of the built-in `console` object in the browser. Console.real will log objects as they ware at 
the time of logging and not as they are at the time you inspect the log line in the console. See my blog post 
[console.log() is not a log](http://hancic.info/console-log-is-not-a-log) for details.

# Usage
Include the `build/console.real.min.js` file into your web page. Then you can call the following methods on the 
`console.real` object in the same way as regular `console` methods: log, info, warn, error.

You can also call `console.real.install()` which will replace the console methods with the augmented ones.

# Notes
Arguments are cloned with the JSON stringify/parse "trick", which means that it will not log methods.
The performance will obviously also degrade, so use with caution.

# Browser support
Should work in ES5 compliant browsers that have: console, JSON, Array#forEach and Array#map objects/methods.

## License
Licensed under MIT. See `LICENSE.md` file for details.