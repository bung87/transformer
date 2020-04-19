import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import 'ace-builds';
import 'ace-builds/webpack-resolver';

import 'spectre.css/src/spectre-icons.scss';
import './mycss.scss';
import './mycss2.scss';
export default {
    load: function () {
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
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
        });
        // editor2.setOptions({
        //     mode: "ace/mode/javascript"
        // });
    }
};