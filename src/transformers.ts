const Sass = require('sass.js/dist/sass.js');
require('sass.js/dist/sass.worker.js')
const sass = new Sass('/assets/sass.worker.js');
// const sass = new Sass(require.resolve('sass.js/dist/sass.worker.js'));


function sass2css(value: string) {
    return new Promise<string>(function (resolve, reject) {
        sass.compile(value, function (result) {
            if (result.status === 1) {
                reject(result)
            } else {
                resolve(result.text)
            }

        });
    });

}

function less2css(value: string) {
    const less = require('less/dist/less.js');
    return new Promise<string>(function (resolve, reject) {
        return less.render(value).then(v => resolve(v.css), e => reject(e));
    });

}

function coffeescript2javascript(value:string){
    const CoffeeScript = require('coffeescript')
    const result = CoffeeScript.compile(value,{bare:true});
    return Promise.resolve(result)
}

function typescript2javascript(value:string){
    const ts = require("typescript")
    let result = ts.transpileModule(value, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
    return Promise.resolve(result.outputText)
    
}

function scss2less(value:string){
    const sassToLess = require('./sass2less')
    const result = new sassToLess().process(value)
    return Promise.resolve(result)
}
// const scss2less = sass2less
const scss2css = sass2css
const less2scss = require('less2sass')

export {
    less2css,
    sass2css,
    scss2css,
    less2scss,
    scss2less,
    // sass2less,
    coffeescript2javascript,
    typescript2javascript
} 
