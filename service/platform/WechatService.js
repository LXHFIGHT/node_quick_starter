/**
 * Created by lxhfight on 2017/5/22.
 * Email: lxhfight51@outlook.com
 * Description:
 *  用于处理来自微信服务器的请求，并做逻辑处理
 */

let config = require('../../config');
let ObjectHelper = require('./../../helpers/ObjectHelper');
let LogHelper = require('./../../helpers/LogHelper');

let activateServer = (req, res, next) => {

    LogHelper.log('handling');

    let { signature, timestamp, nonce, echostr } = req.query;
    let { Referer } = req.headers;
    let { token } = config.wechat_token;

    let sha1Str = ObjectHelper.encryptStr(`${nonce}${timestamp}${token}`, 'sha1');
    LogHelper.warn(' 微信请求的URL: ' + Referer);

    LogHelper.warn(' signature: ' + signature);
    LogHelper.warn(' sha1Str: ' + sha1Str);

    if (sha1Str === signature) {
        res.write(echostr);
        res.end();
    } else {
        res.write('error: request not from wechat server');
        res.end();
    }
};


module.exports = {
    activateServer
};