/**
 * Created by LXHFIGHT on 2017/3/5 16:28.
 * Email: lxhfight51@outlook.com
 * Description:
 *
 */

let log4js = require('log4js');

log4js.loadAppender('file');

log4js.addAppender(log4js.appenders.file('logs/cheese.log'), 'cheese');


let logger = log4js.getLogger('cheese');
logger.setLevel('ERROR');


let  user = {
    name: 'LXHFIGHT',
    password: '123456',
    dept: 'IT'
};

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');