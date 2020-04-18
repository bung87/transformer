
const DEFAULT_INDENTATION = 2;
class SassToSCSS {
    spaces: number
    /**
     * relys formated spaces
     * @param spaces 
     */
    constructor(spaces = DEFAULT_INDENTATION) {
        this.spaces = spaces;
    }

    static count_leading_spaces(line: string) {
       
        return line.length - line.trimLeft().length
    }

    convert(src: string) {
        const sass_lines = src.split(/[\r\n]+/g)
        var cleaned:string[], line: string, outlines, re_css_rule: RegExp, re_import: RegExp, re_sass_include: RegExp, re_sass_mixin: RegExp, re_sass_variable: RegExp, result;
        outlines = [];
        cleaned = [];
        re_css_rule = /\s*[\w\-\d]+:/
        re_import = /@import/
        re_sass_mixin = /\=\w+/
        re_sass_include = /\+\w+/
        re_sass_variable = /\s*\$/
        for (var _pj_c = 0, _pj_a = sass_lines, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            line = _pj_a[_pj_c];

            line = line.replace("\n", "");
            if (re_import.test(line)) {
                if (line.indexOf('@import "') === -1) {
                    line = line.replace("@import ", "@import \"");
                    line += "\"";
                }
                line += ";";
            } else {
                if (line.search(re_sass_mixin)) {
                    line = line.replace("=", "@mixin ");
                } else {
                    if (line.search(re_sass_include)) {
                        line = line.replace("+", "@include ");
                        line += ";";
                    } else {
                        if (re_css_rule.test(line)) {
                            line += ";";
                        } else {
                            if (re_sass_variable.test(line)) {
                                line += ";";
                            }
                        }
                    }
                }
            }
            if ((line === "")) {
                continue;
            }
            cleaned.push(line);
        }
        cleaned.push("");

        var closed_indent, indent, insert, next_indent, prev_indent;
      
       
        cleaned.forEach( (line,i) =>{
            indent = SassToSCSS.count_leading_spaces(cleaned[i]);
            try {
                next_indent = SassToSCSS.count_leading_spaces(cleaned[i + 1])
            } catch (e) {
                next_indent = 0
            }

            try {
                prev_indent = SassToSCSS.count_leading_spaces(cleaned[i - 1])
            } catch (e) {
                prev_indent = 0
            }

            if (indent < next_indent) {
                line = line + ' ' + '{';
            }
            if (indent < prev_indent) {
                closed_indent = prev_indent;
                while (closed_indent >= next_indent && closed_indent !== 0) { 
                    insert = ' '.repeat(Math.max(closed_indent - this.spaces,0)) + '}';
                    outlines.push(insert);
                    closed_indent -= this.spaces;
                }
            }
            outlines.push(line);
        });


        outlines.pop();
        result = outlines.join("\n");
        return result;
    }
}
module.exports = SassToSCSS
// const expect = `
// $font-stack:    Helvetica, sans-serif;
// $primary-color: #333;

// body
//   font: 100% $font-stack
//   color: $primary-color

// nav
//   ul
//     margin: 0
//     padding: 0
//     list-style: none

//   li
//     display: inline-block

//   a
//     display: block
//     padding: 6px 12px
//     text-decoration: none
// `

// const ins = new SassToSCSS()
// console.log(ins.convert(expect))

