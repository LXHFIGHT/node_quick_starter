/**
 * Created by LXHFIGHT on 2017/1/18 21:10.
 * Email: lxhfight51@outlook.com
 * Description:
 *      initiating helpers write here
 */

let config  = require('./../config');
let redisdb = require('./../helpers/RedisHelper');
let LogHelper = require('./../helpers/LogHelper');
let { wechat_activated } = config;
let { requestAccessToken } = require('./../service/platform/WechatService');

module.exports = {

    /**
     * 每过 2个小时 将发起获取一次微信公众平台开发者凭证（AccessToken）操作
     */
    getWechatAccessTokenInterval: () => {
        if ( wechat_activated ) {
            redisdb.get('', (err, data) => {
                if(!err && data){
                    requestAccessToken();
                    setInterval(() => {
                        requestAccessToken();
                    }, 7200);
                } else {
                    if (!data) {
                        LogHelper.warn('还没完成公众号 -> 开发 -> 基本配置 -> 服务器配置');
                    }
                }
            });
        }
    }

};
