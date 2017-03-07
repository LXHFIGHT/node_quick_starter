/**
 * Created by LXHFIGHT on 2016/12/28 16:13.
 * Email: lxhfight51@outlook.com
 * Description:
 *   标签 CRUD和列表常规操作服务
 */

let https = require('https');
let redisdb = require('./../../helpers/RedisHelper');
let AuthorizeHelper = require('./../../helpers/AuthorizeHelper');
let ResponseHelper = require('./../../helpers/ResponseHelper');
let LogHelper = require('./../../helpers/LogHelper');

//  添加新的记录
let wxLogin = (req, res, next) => {
    let { code } = req.query, httpsReq;   // 获取前端发送的js_code

    LogHelper.log(code);

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

module.exports = {
    wxLogin
};