let config = require('../../config');

/**
 * Created by lxhfight on 2017/5/22.
 * Email: lxhfight51@outlook.com
 * Description:
 *  用于处理来自微信服务器的请求，并做逻辑处理
 */

let https = require('https');
let ObjectHelper = require('./../../helpers/ObjectHelper');
let LogHelper = require('./../../helpers/LogHelper');
let AuthorizeHelper = require('./../../helpers/AuthorizeHelper');
let ResponseHelper = require('./../../helpers/ResponseHelper');
let redisdb = require('./../../helpers/RedisHelper');

let wechatKeys = {  // 微信相关缓存在redis中参数的键
    IS_WECHAT_SERVER_ACTIVATED: 'is_wechat_server_activated',
    WECHAT_ACCESS_TOKEN: 'wechat_access_token'
};


//  微信小程序登录接口处理方法 【面向微信小程序请求】
let wxxcxLogin = (req, res, next) => {
    let { code } = req.query, httpsReq;   // 获取前端发送的js_code
    let url = AuthorizeHelper.generateWechatAuthUrl(code);
    let data = '';
    LogHelper.log(url);
    httpsReq = https.get(url, function (httpsRes) {
        httpsRes.setEncoding('utf8');
        httpsRes.on('data', function (chunk) {
            data += chunk;
        });
        httpsRes.on('end', () => {
            let { openid } = JSON.parse(data);  // 此处暂时没有用 session_key
            let token = AuthorizeHelper.generateToken({ openid, isWechatUser:true });
            // 将token和openid以键值的形式保存在redis中
            redisdb.set(token, openid, (err, result) => {
                if (err) {
                    ResponseHelper.setResponseJSON(res, {
                        result: 1,
                        msg: 'data store error occur, please try again',
                        data: -1
                    });
                } else {
                    ResponseHelper.setResponseJSON(res, {
                        result: 0,
                        msg: 'login complete! store this token in the frontend cache carefully',
                        data: {
                            token: token
                        }
                    });
                }
            });
        });

    });

    httpsReq.on('error', function (err) {
        console.log('problem with request: ' + err.message);
        ResponseHelper.setResponseJSON(res, {
            result: 0,
            msg: 'login error!',
            data: err.stack
        });
    });

    httpsReq.end();
};

//  微信公众号基本配置 -> 服务器配置 启用服务器接口 【面向微信服务器请求】
let activateServer = (req, res, next) => {
    let { signature, timestamp, nonce, echostr } = req.query;
    let { token } = config.wechat_token;

    let sha1Str = ObjectHelper.encryptStr(`${nonce}${timestamp}${token}`, 'sha1');

    LogHelper.warn('wechat sending timestamp: ' + timestamp);
    LogHelper.warn('wechat sending nonce: ' + nonce);
    LogHelper.warn('wechat sending echostr: ' + echostr);
    LogHelper.warn('wechat sending signature: ' + signature);
    LogHelper.warn('encryted sha1Str: ' + sha1Str);

    if (sha1Str === signature) {
        redisdb.set(wechatKeys.IS_WECHAT_SERVER_ACTIVATED, 1, (err, data) => {
            if (!err) {
                LogHelper.warn('成功认证该服务器并启用');
                res.write(echostr);
                res.end();
            } else {
                LogHelper.error('redis保存微信是否认证该服务器出错');
                LogHelper.error(err);
                res.write('error: redis storage occured a problom');
                res.end();
            }
        });
    } else {
        res.write('error: request not from wechat server');
        res.end();
    }
};



let requestAccessToken = () => {
    let httpsReq,
        data = '',
        url = ` https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.wechat_appid}&secret=${config.wechat_secret}`;
    LogHelper.warn('请求获取Token信息');
    httpsReq = https.get(url, (httpsRes) => {
        httpsRes.setEncoding('utf8');
        httpsRes.on('data', (chunk) => {
            data += chunk;
        });
        httpsRes.on('end', () => {
            let json = JSON.parse(data);
            redisdb.set(wechatKeys.WECHAT_ACCESS_TOKEN, json.access_token, (err, data) => {
                if (!err) {
                    // 设置成功 并将access_token缓存在redis中
                    LogHelper.warn('微信access-token设置状态： 成功! 并将access_token缓存在redis中');
                    LogHelper.warn('微信access-token为：' + json.access_token);
                } else {
                    LogHelper.warn('redis保存微信access-token是出错');
                }
            })
        });
    });

    httpsReq.on('error', (err) => {
        LogHelper.error('获取微信access-token失败， 路径为： ' + url);
        LogHelper.error(err);
    });

    httpsReq.end();
};

module.exports = {
    activateServer,
    wxxcxLogin,
    requestAccessToken
};