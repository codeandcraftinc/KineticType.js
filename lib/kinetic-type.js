import EventEmitter from 'events'
import log from 'loglevel'
import Promise from 'promiscuous'
import { delay, merge, noop, promiseFor, random } from './utils'

/**
 * @todo
 */
const DEFAULTS = {
  run: false,
  typeDelay: 4000,
  typeSpeedRange: [10, 250],
  backspaceDelay: 500,
  backspaceSpeedRange: [10, 180]
}

/**
 *
 */
export default class KineticType extends EventEmitter {

  /**
   * Construct a new instance of KineticType
   *
   * @param {!Object} el - The target DOM element.
   * @param {!(string|string[])} text - The content to display kinetically.
   * @param {?Object} [opts] - Options to alter library behavior.
   * @param {boolean} [opts.run=false] - Executes `start` on instantiation.
   */
  constructor(el, text, opts) {
    super()

    if (!el.nodeName) {
      throw new Error('a valid DOM element is required')
    }

    if (el.children.length) {
      log.warn('DOM element contains children, this can cause issues')
    }

    this._el = el
    this._text = Array.isArray(text) ? text : [text]
    this._text = this._text.filter((v) => [null, undefined].indexOf(v) < 0)
    this._opts = merge({}, DEFAULTS, opts)

    this._running = false
    this._promise = null

    if (this._opts.run) {
      this.start()
    }
  }

  /**
   * Get the DOM element's current text content
   *
   * @return {string} - The current text content.
   */
  _getText() {
    return this._el.textContent
  }

  /**
   * Set the DOM element's text content
   *
   * @param {string} text - A string value to set.
   * @return {undefined}
   */
  _setText(text) {
    this._el.textContent = text
  }

  /**
   * Retrieve the next item in the text list
   *
   * @return {string|undefined} - The next string to print, `undefined` if text array is empty.
   */
  _getNextText() {
    let text = this._getText()
    let curr = this._text.indexOf(text)
    let next = (curr === (this._text.length - 1)) ? 0 : curr + 1

    return this._text[next]
  }

  /**
   *
   */
  _getHeight() {
    return this._el.style.height
  }

  /**
   *
   */
  _setHeight() {
    this._el.style.height = `${this._el.offsetHeight}px`
  }

  /**
   *
   */
  _resetHeight() {
    this._el.style.height = ''
  }

  /**
   *
   */
  _isStartable() {
    return !(this._promise || this._running)
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
  _isStoppable() {
    return this._promise && this._running
  }

  /**
   * "Backspace" the DOM element's text content
   *
   * @todo
   * @emits {backspacing}
   * @emits {backspaced}
   * @return {Promise<undefined>}
   */
  _backspace(cb) {
    cb = cb || noop
    this.emit('backspacing')
    return new Promise((resolve, reject) => {
      (function loop() {
        let text = this._getText()

        if (text && text.length) {
          if (text.length === 1) {
            this._setHeight()
          }

          this._setText(text.slice(0, -1))
          setTimeout(loop.bind(this), random.apply(null, this._opts.backspaceSpeedRange))
        } else {
          resolve()
        }
      }.call(this))
    }).then(delay(this._opts.backspaceDelay)).then(() => {
      this.emit('backspaced')
      cb()
    })
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
  _type(next, cb) {
    cb = cb || noop
    this.emit('typing', next)
    return this._backspace().then(() => {
      return new Promise((resolve, reject) => {
        (function loop() {
          let text = this._getText()
          let diff = next.replace(text, '')

          if (this._getHeight() !== '') {
            this._resetHeight()
          }

          if (diff && diff.length) {
            this._setText(text + diff.slice(0, 1))
            setTimeout(loop.bind(this), random.apply(null, this._opts.typeSpeedRange))
          } else {
            resolve()
          }
        }.call(this))
      })
    }).then(() => {
      this.emit('typed', next)
      cb(undefined, next)
    })
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
  start(cb) {
    cb = cb || noop

    if (!this._isStartable()) {
      log.warn('not in a startable state')
      return Promise.resolve()
    }

    this.emit('starting')

    let delayFn = delay(this._opts.typeDelay)

    this._running = true
    this._promise = promiseFor((state) => {
      return state._running
    }, (state) => {
      let text = state._getNextText()

      if (!text || text === this._getText()) {
        return delayFn().then(() => state)
      }

      // delay here to allow event
      // listeners time to attach
      return delay(0)()
        .then(() => state._type(text))
        .then(delayFn)
        .then(() => state)
    }, this)

    return Promise.resolve().then(() => {
      this.emit('started')
      cb()
    })
  }

  /**
   *
   *
   * @todo
   * @emits {stopping}
   * @emits {stopped}
   * @return {Promise<undefined>}
   */
  stop(cb) {
    cb = cb || noop

    if (!this._isStoppable()) {
      log.warn('not in a stoppable state')
      return Promise.resolve()
    }

    this.emit('stopping')
    this._running = false

    return this._promise.then(() => {
      this._promise = null
      this.emit('stopped')
      cb()
      return Promise.resolve()
    })
  }

  /**
   * @todo
   */
  backspace() {
    if (!this._isStartable()) {
      log.warn('using the `backspace` method while in a "started" state can cause issues')
    }

    return this._backspace.apply(this, arguments)
  }

  /**
   * @todo
   */
  type() {
    if (!this._isStartable()) {
      log.warn('using the `type` method while in a "started" state can cause issues')
    }

    return this._type.apply(this, arguments)
  }
}
