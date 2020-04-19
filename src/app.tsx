
import { AppLib } from './app-core/lib';
import main from './main';

let appLib = new AppLib();

Neutralino.init({
    load: function () {
        main.load()
        // appLib.showSettings();
    },
    pingSuccessCallback: function () {

    },
    pingFailCallback: function () {

    }
});