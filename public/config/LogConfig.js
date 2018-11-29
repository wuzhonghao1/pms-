var path = require('path');

function logConfig(log4js){
    var logHome = process.env['LOGS_PATH'];
    if(logHome==undefined) {
        logHome = path.join(__dirname,'../../logs');
    }
    var hostName = process.env['HOSTNAME'];
    log4js.configure({
        appenders: {
            console: {
                type: 'console'
            },
            trace: {
                type: 'file',
                filename: logHome+'/access-'+hostName+'.log',
                layout: {
                    type:'pattern',
                    pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} %m'
                },
                maxLogSize : 2048*1024
            },
            http: {
                type: 'logLevelFilter',
                appender: 'trace',
                level: 'trace',
                maxLevel: 'trace'
            },
            info: {
                type: 'dateFile',
                filename: logHome+'/applog-'+hostName+'.log',
                pattern: '.yyyy-MM-dd',
                layout: {
                    type:'pattern',
                    pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} %5p %c  %m'
                },
                maxLogSize: 2048 * 1024,
                compress: true
            },
            maxInfo: {
                type: "logLevelFilter",
                appender: "info",
                level: "debug",
                maxLevel: "info"
            },
            error: {
                type: 'dateFile',
                filename: logHome+'/applog-'+hostName+'.log',
                pattern: '.yyyy-MM-dd',
                layout: {
                    type: 'pattern',
                    pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} %5p %c %m'
                },
                maxLogSize: 2048 * 1024,
                compress: true
            },
            errorFilter: {
                type: "logLevelFilter",
                appender: "error",
                level: "error"
            }
        },
        categories: {
            default: {
                appenders: [
                    'console',
                    'http',
                    'maxInfo',
                    'errorFilter'
                ],
                level: 'all'
            }
        }
    });
}
module.exports  =  logConfig;