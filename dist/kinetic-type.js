(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["KineticType"] = factory();
	else
		root["KineticType"] = factory();
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

	var KineticType = __webpack_require__(1).default;

	/**
	 * Attach the library to jQuery if it exists on the page.
	 */
	if (typeof jQuery !== 'undefined') {
	  jQuery.fn.kineticType = function (el, text, opts) {
	    var args = Array.prototype.slice.call(arguments);

	    this.each(function (i, el) {
	      jQuery(el).data('kineticType', new KineticType(el, el, text, opts));
	    });
	  };
	}

	/**
	 *
	 */
	module.exports = KineticType;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(2);

	var _events2 = _interopRequireDefault(_events);

	var _loglevel = __webpack_require__(3);

	var _loglevel2 = _interopRequireDefault(_loglevel);

	var _promiscuous = __webpack_require__(4);

	var _promiscuous2 = _interopRequireDefault(_promiscuous);

	var _utils = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @todo
	 */
	var DEFAULTS = {
	  run: false,
	  typeDelay: 4000,
	  typeSpeedRange: [10, 250],
	  backspaceDelay: 500,
	  backspaceSpeedRange: [10, 180]
	};

	/**
	 *
	 */

	var KineticType = (function (_EventEmitter) {
	  _inherits(KineticType, _EventEmitter);

	  /**
	   * Construct a new instance of KineticType
	   *
	   * @param {!Object} el - The target DOM element.
	   * @param {!(string|string[])} text - The content to display kinetically.
	   * @param {?Object} [opts] - Options to alter library behavior.
	   * @param {boolean} [opts.run=false] - Executes `start` on instantiation.
	   */

	  function KineticType(el, text, opts) {
	    _classCallCheck(this, KineticType);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KineticType).call(this));

	    if (!el.nodeName) {
	      throw new Error('a valid DOM element is required');
	    }

	    if (el.children.length) {
	      _loglevel2.default.warn('DOM element contains children, this can cause issues');
	    }

	    _this._el = el;
	    _this._text = Array.isArray(text) ? text : [text];
	    _this._text = _this._text.filter(function (v) {
	      return [null, undefined].indexOf(v) < 0;
	    });
	    _this._opts = (0, _utils.merge)({}, DEFAULTS, opts);

	    _this._running = false;
	    _this._promise = null;

	    if (_this._opts.run) {
	      _this.start();
	    }
	    return _this;
	  }

	  /**
	   * Get the DOM element's current text content
	   *
	   * @return {string} - The current text content.
	   */

	  _createClass(KineticType, [{
	    key: '_getText',
	    value: function _getText() {
	      return this._el.textContent;
	    }

	    /**
	     * Set the DOM element's text content
	     *
	     * @param {string} text - A string value to set.
	     * @return {undefined}
	     */

	  }, {
	    key: '_setText',
	    value: function _setText(text) {
	      this._el.textContent = text;
	    }

	    /**
	     * Retrieve the next item in the text list
	     *
	     * @return {string|undefined} - The next string to print, `undefined` if text array is empty.
	     */

	  }, {
	    key: '_getNextText',
	    value: function _getNextText() {
	      var text = this._getText();
	      var curr = this._text.indexOf(text);
	      var next = curr === this._text.length - 1 ? 0 : curr + 1;

	      return this._text[next];
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_getHeight',
	    value: function _getHeight() {
	      return this._el.style.height;
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_setHeight',
	    value: function _setHeight() {
	      this._el.style.height = this._el.offsetHeight + 'px';
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_resetHeight',
	    value: function _resetHeight() {
	      this._el.style.height = '';
	    }

	    /**
	     *
	     */

	  }, {
	    key: '_isStartable',
	    value: function _isStartable() {
	      return !(this._promise || this._running);
	    }

	    /**
	     * Verify that the instance is in a "stoppable" state
	     *
	     * Both the `_promise` and `_running` properties MUST be truthy for the
	     * instance to be considered "stoppable". If one is falsey the instance is
	     * already in the process of stopping, if both are falsey the instance has
	     * yet to be started.
	     *
	     * @return {boolean} - `true` if the instance is "stoppable".
	     */

	  }, {
	    key: '_isStoppable',
	    value: function _isStoppable() {
	      return this._promise && this._running;
	    }

	    /**
	     * "Backspace" the DOM element's text content
	     *
	     * @todo
	     * @emits {backspacing}
	     * @emits {backspaced}
	     * @return {Promise<undefined>}
	     */

	  }, {
	    key: '_backspace',
	    value: function _backspace(cb) {
	      var _this2 = this;

	      cb = cb || _utils.noop;
	      this.emit('backspacing');
	      return new _promiscuous2.default(function (resolve, reject) {
	        (function loop() {
	          var text = this._getText();

	          if (text && text.length) {
	            if (text.length === 1) {
	              this._setHeight();
	            }

	            this._setText(text.slice(0, -1));
	            setTimeout(loop.bind(this), _utils.random.apply(null, this._opts.backspaceSpeedRange));
	          } else {
	            resolve();
	          }
	        }).call(_this2);
	      }).then((0, _utils.delay)(this._opts.backspaceDelay)).then(function () {
	        _this2.emit('backspaced');
	        cb();
	      });
	    }

	    /**
	     * "Type" the given text
	     *
	     * This will "backspace" first if the DOM element isn't empty.
	     *
	     * @emits {typing}
	     * @emits {typed}
	     * @return {Promise<undefined>}
	     */

	  }, {
	    key: '_type',
	    value: function _type(next, cb) {
	      var _this3 = this;

	      cb = cb || _utils.noop;
	      this.emit('typing', next);
	      return this._backspace().then(function () {
	        return new _promiscuous2.default(function (resolve, reject) {
	          (function loop() {
	            var text = this._getText();
	            var diff = next.replace(text, '');

	            if (this._getHeight() !== '') {
	              this._resetHeight();
	            }

	            if (diff && diff.length) {
	              this._setText(text + diff.slice(0, 1));
	              setTimeout(loop.bind(this), _utils.random.apply(null, this._opts.typeSpeedRange));
	            } else {
	              resolve();
	            }
	          }).call(_this3);
	        });
	      }).then(function () {
	        _this3.emit('typed', next);
	        cb(undefined, next);
	      });
	    }

	    /**
	     * Skip typing falsey values and re-typing the current value e.g. in the
	     * instance of a single element array.
	     *
	     * @todo
	     * @emits {starting}
	     * @emits {started}
	     * @return {Promise<undefined>}
	     */

	  }, {
	    key: 'start',
	    value: function start(cb) {
	      var _this4 = this;

	      cb = cb || _utils.noop;

	      if (!this._isStartable()) {
	        _loglevel2.default.warn('not in a startable state');
	        return _promiscuous2.default.resolve();
	      }

	      this.emit('starting');

	      var delayFn = (0, _utils.delay)(this._opts.typeDelay);

	      this._running = true;
	      this._promise = (0, _utils.promiseFor)(function (state) {
	        return state._running;
	      }, function (state) {
	        var text = state._getNextText();

	        if (!text || text === _this4._getText()) {
	          return delayFn().then(function () {
	            return state;
	          });
	        }

	        // delay here to allow event
	        // listeners time to attach
	        return (0, _utils.delay)(0)().then(function () {
	          return state._type(text);
	        }).then(delayFn).then(function () {
	          return state;
	        });
	      }, this);

	      return _promiscuous2.default.resolve().then(function () {
	        _this4.emit('started');
	        cb();
	      });
	    }

	    /**
	     *
	     *
	     * @todo
	     * @emits {stopping}
	     * @emits {stopped}
	     * @return {Promise<undefined>}
	     */

	  }, {
	    key: 'stop',
	    value: function stop(cb) {
	      var _this5 = this;

	      cb = cb || _utils.noop;

	      if (!this._isStoppable()) {
	        _loglevel2.default.warn('not in a stoppable state');
	        return _promiscuous2.default.resolve();
	      }

	      this.emit('stopping');
	      this._running = false;

	      return this._promise.then(function () {
	        _this5._promise = null;
	        _this5.emit('stopped');
	        cb();
	        return _promiscuous2.default.resolve();
	      });
	    }

	    /**
	     * @todo
	     */

	  }, {
	    key: 'backspace',
	    value: function backspace() {
	      if (!this._isStartable()) {
	        _loglevel2.default.warn('using the `backspace` method while in a "started" state can cause issues');
	      }

	      return this._backspace.apply(this, arguments);
	    }

	    /**
	     * @todo
	     */

	  }, {
	    key: 'type',
	    value: function type() {
	      if (!this._isStartable()) {
	        _loglevel2.default.warn('using the `type` method while in a "started" state can cause issues');
	      }

	      return this._type.apply(this, arguments);
	    }
	  }]);

	  return KineticType;
	})(_events2.default);

	exports.default = KineticType;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (typeof module === 'object' && module.exports && "function" === 'function') {
	        module.exports = definition();
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.log = definition();
	    }
	}(this, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";

	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }

	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // these private functions always need `this` to be set properly

	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = (i < level) ?
	                noop :
	                this.methodFactory(methodName, level, loggerName);
	        }
	    }

	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];

	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }

	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }

	      function getPersistedLevel() {
	          var storedLevel;

	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}

	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }

	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }

	          return storedLevel;
	      }

	      /*
	       *
	       * Public API
	       *
	       */

	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};

	      self.methodFactory = factory || defaultMethodFactory;

	      self.getLevel = function () {
	          return currentLevel;
	      };

	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };

	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };

	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };

	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };

	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Package-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    return defaultLogger;
	}));


/***/ },
/* 4 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.random = random;
	exports.merge = merge;
	exports.promiseFor = promiseFor;
	exports.delay = delay;
	exports.noop = noop;

	var _promiscuous = __webpack_require__(4);

	var _promiscuous2 = _interopRequireDefault(_promiscuous);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * Simple random integer generation.
	 *
	 * @todo
	 * @link http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	 */
	function random(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * @todo
	 * @link https://gist.github.com/svlasov-gists/2383751
	 */
	function merge(target, source) {
	  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	    target = {};
	  }

	  for (var property in source) {
	    if (source.hasOwnProperty(property)) {
	      var sourceProperty = source[property];

	      if ((typeof sourceProperty === 'undefined' ? 'undefined' : _typeof(sourceProperty)) === 'object' && !Array.isArray(sourceProperty)) {
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

	/**
	 * @todo
	 */
	function promiseFor(predicate, fn, state) {
	  if (!predicate(state)) {
	    return _promiscuous2.default.resolve(state);
	  }

	  return fn(state).then(promiseFor.bind(null, predicate, fn));
	}

	/**
	 * @todo
	 */
	function delay(ms) {
	  return function (value) {
	    return new _promiscuous2.default(function (resolve, reject) {
	      setTimeout(resolve.bind(null, value), ms || 0);
	    });
	  };
	}

	/**
	 *
	 */
	function noop() {}

/***/ }
/******/ ])
});
;