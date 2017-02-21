/**
 * Created by LXHFIGHT on 2017/2/15 16:50.
 * Email: lxhfight51@outlook.com
 * Description:
 *  用于处理各种授权信息
 */
let jwt = require('jsonwebtoken');
let moment = require('moment');
const { wechat_appid, wechat_secret, jwtSecret, tokenValidity, tokenValidityUnit } = require('./../config.js');
let ResponseHelper = require('./../helpers/ResponseHelper');
let LogHelper = require('./../helpers/LogHelper');

/**
 * 微信小程序：生成用户openid和sessionKey获取URL
 * @param code 客户端通过wx.login请求获取的js_code
 * @returns {*} 获取URL
 */
let generateWechatAuthUrl = (code) => {
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${wechat_appid}&secret=${wechat_secret}&js_code=${code}&grant_type=authorization_code`
};

/**
 * JWT 第三方token生成器
 * @param obj 用户ID
 * @returns {*} 生成的Token
 */
let generateToken = (obj) => {
    let exp = moment().add(tokenValidity, tokenValidityUnit).valueOf();
    let claims = obj;
    claims.exp = exp;
    return jwt.sign(claims, jwtSecret);
};

/**
 * json web token verify express middleware
 * @param req   http/https request object
 * @param res   node server response object
 * @param next  go next function
 */
let jwtauth = (req, res, next) => {
    let authorization = req.headers['authorization'];
    if (authorization) {
        let token = req.headers['authorization'].split(' ')[1];
        let msg = '';
        // verify a token symmetric
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                msg = ResponseHelper.WARNING_INVALID_TOKEN;
                LogHelper.error(msg);
                ResponseHelper.setResponseJSON(res, {result: 1, msg, data: -1}, 401);
            } else {
                LogHelper.log(`expTime: ${decoded.exp}  now: ${Date.now()} isExpired: ${decoded.exp < Date.now()}`);
                // 判断是否过期
                if (decoded.exp > Date.now()) {
                    LogHelper.success('authorized token');
                    next();
                } else {
                    msg = ResponseHelper.WARNING_EXPIRED_TOKEN;
                    LogHelper.error(msg);
                    ResponseHelper.setResponseJSON(res, {result: 1, msg, data: -1}, 401);
                }
            }
        });
    }
    // 如果没有带上token则定义为非授权
    else {
        let msg = ResponseHelper.WARNING_NO_TOKEN;
        LogHelper.error(msg);
        ResponseHelper.setResponseJSON(res, {result: 1, msg, data: -1}, 401);
    }
};

/**
 * 通过token获取信息
 * @param token 客户端请求所带的token
 * @param callback 解析成功后的回调方法
 * @return {*} 当返回值为对象说明成功解析并且获取到用户信息， 返回-1表示token过期，返回null表示token无效
 */
let getInfoFromToken = (token, callback) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            callback(err, null);
        } else {
            if (decoded.exp > Date.now()) {
                let data = decoded;
                delete data.exp;
                delete data.iat;
                callback(null, data);
            } else {
                callback(-1, null);
            }
        }
    });
};

module.exports = {
    generateWechatAuthUrl,
    generateToken,
    getInfoFromToken,
    jwtauth
};