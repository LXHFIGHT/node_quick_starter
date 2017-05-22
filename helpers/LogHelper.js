/**
 * Created by LXHFIGHT on 2017/1/12 16:34.
 * Email: lxhfight51@outlook.com
 * Description:
 *  log for console function
 */

let log4js = require('log4js');
let type = 'dateFile', absolute = true,
    filename = (process.env.NODE_ENV ? '/var/log/node_server/' :  '../../log/node-server/'),
    maxLogSize = 1024 * 1024;

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'development'
        },
        // DEBUG 级别日志
        {
            type,
            filename,
            absolute,
            maxLogSize,
            pattern: 'debug/debug日志-yyyy年MM月dd日hh时.txt',
            alwaysIncludePattern: true,
            backups: 3,
            category: 'debugMode'
        },
        // INFO 级别日志
        {
            type,
            filename,
            absolute,
            maxLogSize,
            pattern: 'info/info日志-yyyy年MM月dd日hh时.txt',
            alwaysIncludePattern: true,
            backups: 3,
            category: 'infoMode'
        },
        // WARN 级别日志
        {
            type,
            filename,
            absolute,
            maxLogSize,
            pattern: 'warn/warn日志-yyyy年MM月dd日hh时.txt',
            alwaysIncludePattern: true,
            backups: 3,
            category: 'warnMode'
        },
        // ERROR 级别日志
        {
            type,
            filename,
            absolute,
            maxLogSize,
            pattern: 'error/error日志-yyyy年MM月dd日hh时.txt',
            alwaysIncludePattern: true,
            backups: 3,
            category: 'errorMode'
        },
        // FATAL 级别日志
        {
            type,
            filename,
            absolute,
            maxLogSize,
            pattern: 'fatal/fatal日志-yyyy年MM月dd日hh时.txt',
            alwaysIncludePattern: true,
            backups: 3,
            category: 'fatalMode'
        }
    ],
    levels: {
        development: 'DEBUG'
    },
    replaceConsole: true // 将所有console输出到日志中 以 [INFO] console 代替 console 默认样式
});

let debugLogger = ( process.env.NODE_ENV ? log4js.getLogger('debugMode') : log4js.getLogger('development'));
let infoLogger  = ( process.env.NODE_ENV ? log4js.getLogger('infoMode')  : log4js.getLogger('development'));
let warnLogger  = ( process.env.NODE_ENV ? log4js.getLogger('warnMode')  : log4js.getLogger('development'));
let errorLogger = ( process.env.NODE_ENV ? log4js.getLogger('errorMode') : log4js.getLogger('development'));
let fatalLogger = ( process.env.NODE_ENV ? log4js.getLogger('fatalMode') : log4js.getLogger('development'));

//  兼容老版本 LogHelper
let log = (obj) => {
    debugLogger.debug(obj);
};
//  兼容老版本 LogHelper
let success = (obj) => {
    infoLogger.info(obj);
};

let debug = (obj) => {
    debugLogger.debug(obj);
};
let info = (obj) => {
    infoLogger.info(obj);
};
let warn = (obj) => {
    warnLogger.warn(obj);
};
let error = (obj) => {
    errorLogger.error(obj);
};
let fatal = (obj) => {
    fatalLogger.fatal(obj);
};

module.exports = {
    log, success, debug, info, warn, error, fatal
};