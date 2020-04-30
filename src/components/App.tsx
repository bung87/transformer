import React, { useState, useRef } from "react";
import Dropdown from './Dropdown';
import 'ace-builds';
import 'ace-builds/webpack-resolver';
import * as transformers from '../transformers';
import Button from '@material-ui/core/Button';

const inputGroups = new Map<string, any[]>(
  [
      ["scripts", [{
          label: "coffeescript",
          value: "coffee",
          lang: "coffee",
      }, {
          label: "es5",
          value: "es5",
          lang: "javascript",
      }, {
          label: "es6",
          value: "es6",
          lang: "javascript",
      }
          , {
          label: "typescript",
          value: "typescript",
          lang: "typescript",
      }, {
          label: "javascript",
          value: "javascript",
          lang: "javascript",
      }]],
      ["styles", [{
          label: "scss",
          value: "scss",
          lang: "scss",
      },
      
      {
          label: "less",
          value: "less",
          lang: "less",
      },
      {
          label: "sass",
          value: "sass",
          lang: "sass",
      }]]
  ]
)

const outputGroups =  new Map<string, any[]>(
  [
      ["scripts", [ {
          label: "es5",
          value: "es5",
          lang: "javascript",
      }, {
          label: "es6",
          value: "es6",
          lang: "javascript",
      }, {
          label: "javascript",
          value: "javascript",
          lang: "javascript",
      }]],
      ["styles", [{
          label: "scss",
          value: "scss",
          lang: "scss",
      },
      {
          label: "css",
          value: "css",
          lang: "css",
      },
      {
          label: "less",
          value: "less",
          lang: "less",
      },
      {
          label: "sass",
          value: "sass",
          lang: "sass",
      }]]
  ]
)

function getInputEditor() {
  const input = document.getElementById('input') as HTMLTextAreaElement;
  const inputEditor = ace.edit(input);
  return inputEditor
}

function getOutputEditor() {
  const output = document.getElementById('output') as HTMLTextAreaElement;
  const outputEditor = ace.edit(output);
  return outputEditor
}

export default function App() {
  const [options, setState] = useState<{ input?: string, output?: string }>({ input: "scss", output: "css" });
  const setInput = (e, x) => {

    setState({ ...options, input: x.value });
    getInputEditor().setOptions({
      mode: `ace/mode/${x.lang}`
    });
  };
  const setOutput = (e, x) => {
    setState({ ...options, output: x.value });
    getOutputEditor().setOptions({
      mode: `ace/mode/${x.lang}`
    });
  }

  document.addEventListener("readystatechange", function () {
    getInputEditor().setOptions({
      mode: `ace/mode/${options.input}`
    });

    getOutputEditor().setOptions({
      mode: `ace/mode/${options.output}`
    });
  })

  const transform = function () {
    const outputEditor = getOutputEditor()
    const inputEditor = getInputEditor()
    const value = getInputEditor().getValue()
    const beautify = require("ace-builds/src-noconflict/ext-beautify.js");
    const transId = `${options.input}2${options.output}`;
    console.log(transId)
    switch (transId) {
      case 'sass2css':
      case 'scss2css':
        transformers[transId](value).then(x => {
          outputEditor.setValue(x);
          beautify.beautify(outputEditor.session);
        }).catch(e => {
          inputEditor.getSession().setAnnotations([
            { text: e.message, row: e.line - 1, column: e.column, type: "error" }
          ])
        })
        break;
      case 'less2css':
        transformers[transId](value).then(x => {
          outputEditor.setValue(x);
          beautify.beautify(outputEditor.session);
        }).catch(e => {
          console.log(e)
          inputEditor.getSession().setAnnotations([
            { text: e.message, row: e.line - 1, column: e.column, type: "error" }
          ])
        })
        break;
      case 'less2scss':
        {
          const result = transformers[transId].convert(value)
          outputEditor.setValue(result);
          beautify.beautify(outputEditor.session);
        }
        break;
      case 'coffeescript2javascript':
        {
          transformers[transId](value).then(x => {
            outputEditor.setValue(x);
            beautify.beautify(outputEditor.session);
          })
        }
        break;
        case 'typescript2javascript':
        {
          transformers[transId](value).then(x => {
            outputEditor.setValue(x);
            beautify.beautify(outputEditor.session);
          })
        }
        break;
        case 'es52es6':
          {
            transformers[transId](value).then(x => {
              outputEditor.setValue(x.code);
              if(x.warnings && x.warnings.length > 0){
                inputEditor.getSession().setAnnotations(x.warnings.map( e => ({ text: e.msg, row: e.line - 1, column: 0, type: "warning" }) ))
              }
              beautify.beautify(outputEditor.session);
            })
          }
          break;
          case 'es62es5':{
            transformers[transId](value).then(x => {
              outputEditor.setValue(x.code);
             
              beautify.beautify(outputEditor.session);
            })
          }
          break;
        default:
          {
            transformers[transId](value).then(x => {
              outputEditor.setValue(x);
              beautify.beautify(outputEditor.session);
            })
          }
        break;
    }

  }
  const ref = useRef();


  return (
    <React.Fragment>
      <div className="hero hero-sm">
        <div className="hero-body">

          <p>js,ts,css,less,scss,sass,es5,es6,coffee converter</p>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column col-5">
            <Dropdown selected={options.input} groups={inputGroups} onClick={setInput}></Dropdown>
            <div id="input">
            </div>
          </div>

          <div className="column col-2 middle-col">
            
            <Button ref={ref} id="main-btn" onClick={transform} className="btn btn-lg s-circle bg-primary text-light">
              <i className="icon icon-arrow-right"></i>
            </Button>
            
          </div>

          <div className="column col-5">
            <Dropdown selected={options.output} groups={outputGroups} onClick={setOutput}></Dropdown>
            <div id="output">
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}