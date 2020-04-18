//port of https://github.com/mediafreakch/less-plugin-sass2less
let fs = require('fs')
let path = require('path')
let _ = require('lodash')
let dir = __dirname + '/replacements/'

let replacements = function () {
  let filenames = fs.readdirSync(dir)

  let results = filenames.filter( x=> path.basename(x) !== 'index.js').map(function (filename) {
    return `require('./${ filename}')`
  })

  return _.sortBy(results, 'order')
}
fs.writeFileSync(dir + "index.js",`module.exports = [${replacements() }]` )