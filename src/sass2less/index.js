
const replacements = require('./replacements')

let sassToLess = function() {}

sassToLess.prototype = {
  process: function(src) {
 
    // process file
    return [src].concat(replacements).reduce(function(source, item) {
      return source.replace(item.pattern, item.replacement)
    })
  }
}

module.exports = sassToLess