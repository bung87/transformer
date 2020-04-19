// const isDevServer = process.env.WEBPACK_DEV_SERVER;
// if(isDevServer){
//     require('file-loader?esmodule=false!neutralino-client-library/dist/neutralino.js')
// }
export class AppLib {
    public showSettings(): void {
        Neutralino.settings.getSettings((d: any) => {
            // alert(JSON.stringify(d));
        }, () => {

        });
    }
}