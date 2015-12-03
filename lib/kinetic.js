import Promise from 'promiscuous'
import { merge, random } from './utils'

/**
 * Example:
 *
 *   kinetic(document.getElementById('example'), ['one', 'two', 'three'])
 */
export default class Kinetic {

  /**
   * @param {!Object} el - The target DOM element.
   * @param {!(string|string[])} text - The content to display kinetically.
   * @param {?Object} [opts] - Options to alter library behavior.
   * @param {boolean} [opts.loop=true] - Iterate over content infinitely.
   */
  constructor(el, text, opts) {
    this.el = el
    this.text = Array.isArray(text) ? text : [text]
    this.opts = merge({}, Kinetic.defaults, opts)

    this.run()
  }

  /**
   *
   */
  run() {
    return this.type(this.getNextText()).then(() => {
      if (this.text.length > 1) {
        setTimeout(this.run.bind(this), 4000)
      }

      return this
    })
  }

  /**
   *
   */
  hasText() {
    let text = this.getText()
    return text && (text.length > 0)
  }

  /**
   *
   */
  getText() {
    return this.el.textContent
  }

  /**
   *
   */
  setText(text) {
    this.el.textContent = text
  }

  /**
   *
   */
  getNextText() {
    let text = this.getText()
    let curr = this.text.indexOf(text)
    let next = (curr === (this.text.length - 1)) ? 0 : curr + 1

    return this.text[next]
  }

  /**
   *
   */
  getHeight() {
    return this.el.style.height
  }

  /**
   *
   */
  setHeight() {
    this.el.style.height = `${this.el.offsetHeight}px`
  }

  /**
   *
   */
  resetHeight() {
    this.el.style.height = ''
  }

  /**
   *
   */
  backspace() {
    return new Promise((resolve, reject) => {
      (function loop() {
        let text = this.getText()

        if (text && text.length) {
          if (text.length === 1) {
            this.setHeight()
          }

          this.setText(text.slice(0, -1))
          setTimeout(loop.bind(this), random(10, 180))
        } else {
          resolve()
        }
      }.call(this))
    })
  }

  /**
   *
   */
  type(next) {
    return this.backspace().then(() => {
      return new Promise((resolve, reject) => setTimeout(resolve, 500))
    }).then(() => {
      return new Promise((resolve, reject) => {
        (function loop() {
          let text = this.getText()
          let diff = next.replace(text, '')

          if (this.getHeight() !== '') {
            this.resetHeight()
          }

          if (diff && diff.length) {
            this.setText(text + diff.slice(0, 1))
            setTimeout(loop.bind(this), random(10, 250))
          } else {
            resolve()
          }
        }.call(this))
      })
    })
  }
}

/**
 *
 */
Kinetic.defaults = {
  loop: true
}

/**
 *
 */
Kinetic.Kinetic = function (...args) {
  return new Kinetic(...args)
}
