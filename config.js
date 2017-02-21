/**
 * Created by LXHFIGHT on 2016/12/27 10:30.
 * Email: lxhfight51@outlook.com
 * Description:
 *    服务端项目配置信息
 */
const { redisConnInfo } = require('./cfg/database/redis');
const { mysqlConnInfo } = require('./cfg/database/mysql');
const { ali_oss_conf } = require('./cfg/oss/aliyun');
const { jwtSecret, tokenValidity, tokenValidityUnit } = require('./cfg/secure/jwt');
const wechatCfg = require('./cfg/platform/wechat');
const allowUploadTypes = ['feedback', 'avatar', 'cover'];  // 允许上传图片的业务场景: 反馈图片, 头像, 封面图片

module.exports = {
    // database connection configuration
    redisConnInfo,
    mysqlConnInfo,

    // oss connection configuration
    ali_oss_conf,
    allowUploadTypes,

    // api secure & authorization configuration
    jwtSecret,
    tokenValidity,
    tokenValidityUnit,

    // platform relative configuration
    wechat_appid: wechatCfg.appid,
    wechat_secret: wechatCfg.secret
};