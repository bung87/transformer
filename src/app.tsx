// MIT License

// Copyright (c) 2018 Neutralinojs

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { AppLib } from './app-core/lib';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import 'ace-builds';
import 'ace-builds/webpack-resolver';

import 'spectre.css/src/spectre-icons.scss';
import './mycss.scss';
import './mycss2.scss';

let appLib = new AppLib();

let myapp: any = {
    myfunction: function () {
        // document.getElementById('info').innerHTML = NL_NAME + " is running on port " +
        //     NL_PORT + " inside " + NL_OS + "<br/><br/>" + "<span>v" + NL_VERSION + "</span>";


        ReactDOM.render(
            <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
        );
        const input = document.getElementById('input');
        const output = document.getElementById('output')
        const editor = ace.edit(input)
        editor.setOptions({
            enableBasicAutocompletion: false,
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
        });
        editor.setTheme("ace/theme/tomorrow");
        // editor.setOptions({
        //     mode: "ace/mode/javascript"
        // });

        const editor2 = ace.edit(output);
        editor2.setTheme("ace/theme/tomorrow");
        editor2.setOptions({
            enableBasicAutocompletion: false,
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
        });
        // editor2.setOptions({
        //     mode: "ace/mode/javascript"
        // });
    }
};


Neutralino.init({
    load: function () {
        myapp.myfunction();
        // appLib.showSettings();
    },
    pingSuccessCallback: function () {

    },
    pingFailCallback: function () {

    }
});