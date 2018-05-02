import deviceLog from "./debug-service";
import InMemoryAdapter from "./adapters/in-memory";

export default class ConsoleHooker {
    constructor() {
        this.hook = () => {
            deviceLog.init(new InMemoryAdapter(), {
                //Options (all optional):
                logToConsole: true,
                logRNErrors: true,
                maxNumberToRender: 2000,
                maxNumberToPersist: 2000 // 0 or undefined == unlimited
            }).then(() => {
                //When the deviceLog has been initialized we can clear it if we want to:
                //deviceLog.clear();
            });
            //The device-log contains a timer for measuring performance:
            deviceLog.startTimer('start-up');


            this.logT = console['trace'];
            this.logD = console['debug'];
            this.logI = console['info'];
            this.logW = console['warn'];
            this.logE = console['error'];
            this.logErrorOriginal = console['_errorOriginal'];
            console['log'] = (...params) => {
                this.logI(...params, '|hooked by consoleHooker');
                deviceLog.log(...params);
            };
            console['trace'] = (...params) => {
                this.logT(...params, '|hooked by consoleHooker');
            };
            console['debug'] = (...params) => {
                this.logD(...params, '|hooked by consoleHooker');
                deviceLog.debug(...params);
            };
            console['info'] = (...params) => {
                this.logI(...params, '|hooked by consoleHooker');
                deviceLog.info(...params);
            };
            console['warn'] = (...params) => {
                this.logW(...params, '|hooked by consoleHooker');
            };
            console['error'] = (...params) => {
                this.logE(...params, '|hooked by consoleHooker');
                deviceLog.error(...params);
            };
            console['_errorOriginal'] = (...params) => {
                this.logErrorOriginal(...params, '|hooked by consoleHooker');
            };
        };
    }
}
