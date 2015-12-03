(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Kinetic"] = factory();
	else
		root["Kinetic"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promiscuous = __webpack_require__(2);

	var _promiscuous2 = _interopRequireDefault(_promiscuous);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Example:
	 *
	 *   kinetic(document.getElementById('example'), ['one', 'two', 'three'])
	 */

	var Kinetic = (function () {

	  /**
	   * @param {!Object} el - The target DOM element.
	   * @param {!(string|string[])} text - The content to display kinetically.
	   * @param {?Object} [opts] - Options to alter library behavior.
	   * @param {boolean} [opts.loop=true] - Iterate over content infinitely.
	   */

	  function Kinetic(el, text, opts) {
	    _classCallCheck(this, Kinetic);

	    this.el = el;
	    this.text = Array.isArray(text) ? text : [text];
	    this.opts = (0, _utils.merge)({}, Kinetic.defaults, opts);

	    this.run();
	  }

	  /**
	   *
	   */

	  _createClass(Kinetic, [{
	    key: 'run',
	    value: function run() {
	      var _this = this;

	      return this.type(this.getNextText()).then(function () {
	        if (_this.text.length > 1) {
	          setTimeout(_this.run.bind(_this), 4000);
	        }

	        return _this;
	      });
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'hasText',
	    value: function hasText() {
	      var text = this.getText();
	      return text && text.length > 0;
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'getText',
	    value: function getText() {
	      return this.el.textContent;
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'setText',
	    value: function setText(text) {
	      this.el.textContent = text;
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'getNextText',
	    value: function getNextText() {
	      var text = this.getText();
	      var curr = this.text.indexOf(text);
	      var next = curr === this.text.length - 1 ? 0 : curr + 1;

	      return this.text[next];
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'getHeight',
	    value: function getHeight() {
	      return this.el.style.height;
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'setHeight',
	    value: function setHeight() {
	      this.el.style.height = this.el.offsetHeight + 'px';
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'resetHeight',
	    value: function resetHeight() {
	      this.el.style.height = '';
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'backspace',
	    value: function backspace() {
	      var _this2 = this;

	      return new _promiscuous2.default(function (resolve, reject) {
	        (function loop() {
	          var text = this.getText();

	          if (text && text.length) {
	            if (text.length === 1) {
	              this.setHeight();
	            }

	            this.setText(text.slice(0, -1));
	            setTimeout(loop.bind(this), (0, _utils.random)(10, 180));
	          } else {
	            resolve();
	          }
	        }).call(_this2);
	      });
	    }

	    /**
	     *
	     */

	  }, {
	    key: 'type',
	    value: function type(next) {
	      var _this3 = this;

	      return this.backspace().then(function () {
	        return new _promiscuous2.default(function (resolve, reject) {
	          return setTimeout(resolve, 500);
	        });
	      }).then(function () {
	        return new _promiscuous2.default(function (resolve, reject) {
	          (function loop() {
	            var text = this.getText();
	            var diff = next.replace(text, '');

	            if (this.getHeight() !== '') {
	              this.resetHeight();
	            }

	            if (diff && diff.length) {
	              this.setText(text + diff.slice(0, 1));
	              setTimeout(loop.bind(this), (0, _utils.random)(10, 250));
	            } else {
	              resolve();
	            }
	          }).call(_this3);
	        });
	      });
	    }
	  }]);

	  return Kinetic;
	})();

	/**
	 *
	 */

	exports.default = Kinetic;
	Kinetic.defaults = {
	  loop: true
	};

	/**
	 *
	 */
	Kinetic.Kinetic = function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return new (Function.prototype.bind.apply(Kinetic, [null].concat(args)))();
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {/**@license MIT-promiscuous-©Ruben Verborgh*/
	(function (func, obj) {
	  // Type checking utility function
	  function is(type, item) { return (typeof item)[0] == type; }

	  // Creates a promise, calling callback(resolve, reject), ignoring other parameters.
	  function Promise(callback, handler) {
	    // The `handler` variable points to the function that will
	    // 1) handle a .then(resolved, rejected) call
	    // 2) handle a resolve or reject call (if the first argument === `is`)
	    // Before 2), `handler` holds a queue of callbacks.
	    // After 2), `handler` is a finalized .then handler.
	    handler = function pendingHandler(resolved, rejected, value, queue, then, i) {
	      queue = pendingHandler.q;

	      // Case 1) handle a .then(resolved, rejected) call
	      if (resolved != is) {
	        return Promise(function (resolve, reject) {
	          queue.push({ p: this, r: resolve, j: reject, 1: resolved, 0: rejected });
	        });
	      }

	      // Case 2) handle a resolve or reject call
	      // (`resolved` === `is` acts as a sentinel)
	      // The actual function signature is
	      // .re[ject|solve](<is>, success, value)

	      // Check if the value is a promise and try to obtain its `then` method
	      if (value && (is(func, value) | is(obj, value))) {
	        try { then = value.then; }
	        catch (reason) { rejected = 0; value = reason; }
	      }
	      // If the value is a promise, take over its state
	      if (is(func, then)) {
	        function valueHandler(resolved) {
	          return function (value) { then && (then = 0, pendingHandler(is, resolved, value)); };
	        }
	        try { then.call(value, valueHandler(1), rejected = valueHandler(0)); }
	        catch (reason) { rejected(reason); }
	      }
	      // The value is not a promise; handle resolve/reject
	      else {
	        // Replace this handler with a finalized resolved/rejected handler
	        handler = function (Resolved, Rejected) {
	          // If the Resolved or Rejected parameter is not a function,
	          // return the original promise (now stored in the `callback` variable)
	          if (!is(func, (Resolved = rejected ? Resolved : Rejected)))
	            return callback;
	          // Otherwise, return a finalized promise, transforming the value with the function
	          return Promise(function (resolve, reject) { finalize(this, resolve, reject, value, Resolved); });
	        };
	        // Resolve/reject pending callbacks
	        i = 0;
	        while (i < queue.length) {
	          then = queue[i++];
	          // If no callback, just resolve/reject the promise
	          if (!is(func, resolved = then[rejected]))
	            (rejected ? then.r : then.j)(value);
	          // Otherwise, resolve/reject the promise with the result of the callback
	          else
	            finalize(then.p, then.r, then.j, value, resolved);
	        }
	      }
	    };
	    // The queue of pending callbacks; garbage-collected when handler is resolved/rejected
	    handler.q = [];

	    // Create and return the promise (reusing the callback variable)
	    callback.call(callback = { then:  function (resolved, rejected) { return handler(resolved, rejected); },
	                               catch: function (rejected)           { return handler(0,        rejected); } },
	                  function (value)  { handler(is, 1,  value); },
	                  function (reason) { handler(is, 0, reason); });
	    return callback;
	  }

	  // Finalizes the promise by resolving/rejecting it with the transformed value
	  function finalize(promise, resolve, reject, value, transform) {
	    setImmediate(function () {
	      try {
	        // Transform the value through and check whether it's a promise
	        value = transform(value);
	        transform = value && (is(obj, value) | is(func, value)) && value.then;
	        // Return the result if it's not a promise
	        if (!is(func, transform))
	          resolve(value);
	        // If it's a promise, make sure it's not circular
	        else if (value == promise)
	          reject(TypeError());
	        // Take over the promise's state
	        else
	          transform.call(value, resolve, reject);
	      }
	      catch (error) { reject(error); }
	    });
	  }

	  // Export the main module
	  module.exports = Promise;

	  // Creates a resolved promise
	  Promise.resolve = ResolvedPromise;
	  function ResolvedPromise(value) { return Promise(function (resolve) { resolve(value); }); }

	  // Creates a rejected promise
	  Promise.reject = function (reason) { return Promise(function (resolve, reject) { reject(reason); }); };

	  // Transforms an array of promises into a promise for an array
	  Promise.all = function (promises) {
	    return Promise(function (resolve, reject, count, values) {
	      // Array of collected values
	      values = [];
	      // Resolve immediately if there are no promises
	      count = promises.length || resolve(values);
	      // Transform all elements (`map` is shorter than `forEach`)
	      promises.map(function (promise, index) {
	        ResolvedPromise(promise).then(
	          // Store the value and resolve if it was the last
	          function (value) {
	            values[index] = value;
	            --count || resolve(values);
	          },
	          // Reject if one element fails
	          reject);
	      });
	    });
	  };
	})('f', 'o');

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(4).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate, __webpack_require__(3).clearImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.random = random;
	exports.merge = merge;

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * Simple random integer generation.
	 *
	 * @link http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	 */
	function random(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * @link https://gist.github.com/svlasov-gists/2383751
	 */
	function merge(target, source) {
	  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	    target = {};
	  }

	  for (var property in source) {
	    if (source.hasOwnProperty(property)) {
	      var sourceProperty = source[property];

	      if ((typeof sourceProperty === 'undefined' ? 'undefined' : _typeof(sourceProperty)) === 'object') {
	        target[property] = merge(target[property], sourceProperty);
	        continue;
	      }

	      target[property] = sourceProperty;
	    }
	  }

	  for (var a = 2, l = arguments.length; a < l; a++) {
	    merge(target, arguments[a]);
	  }

	  return target;
	}

/***/ }
/******/ ])
});
;