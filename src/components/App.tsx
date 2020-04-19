import React, { useState, useRef } from "react";
import Dropdown from './Dropdown';
import 'ace-builds';
import 'ace-builds/webpack-resolver';
import * as transformers from '../transformers';
import { useRipple } from 'react-use-ripple';

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
  const setInput = (e, value) => {

    setState({ ...options, input: value });
    getInputEditor().setOptions({
      mode: `ace/mode/${value}`
    });
  };
  const setOutput = (e, value) => {
    setState({ ...options, output: value });
    getOutputEditor().setOptions({
      mode: `ace/mode/${value}`
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
        transformers['less2css'](value).then(x => {
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
          const result = transformers['less2scss'].convert(value)
          outputEditor.setValue(result);
          beautify.beautify(outputEditor.session);
        }
        break;
      case 'coffeescript2javascript':
        {
          transformers['coffeescript2javascript'](value).then(x => {
            outputEditor.setValue(x);
            beautify.beautify(outputEditor.session);
          })
        }
        break;
        case 'typescript2javascript':
        {
          transformers['typescript2javascript'](value).then(x => {
            outputEditor.setValue(x);
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
  useRipple(ref);

  return (
    <React.Fragment>
      <div className="hero hero-sm">
        <div className="hero-body">

          <p>This is a hero example</p>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column col-5">
            <Dropdown selected={options.input} onClick={setInput}></Dropdown>
            <div id="input">
            </div>
          </div>

          <div className="column col-2 middle-col">
            <button ref={ref} id="main-btn" onClick={transform} className="btn btn-lg s-circle bg-primary text-light">
              <i className="icon icon-arrow-right"></i>
            </button>
          </div>

          <div className="column col-5">
            <Dropdown selected={options.output} onClick={setOutput}></Dropdown>
            <div id="output">
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}