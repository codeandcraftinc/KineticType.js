var KineticType = require('./kinetic-type').default;

/**
 * Attach the library to jQuery if it exists on the page.
 */
if (typeof jQuery !== 'undefined') {
  jQuery.fn.kineticType = function (el, text, opts) {
    var args = Array.prototype.slice.call(arguments)

    this.each(function (i, el) {
      jQuery(el).data('kineticType', new KineticType(el, el, text, opts))
    })
  }
}

/**
 *
 */
module.exports = KineticType;
