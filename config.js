/**
 * Created by LXHFIGHT on 2016/12/27 10:30.
 * Email: lxhfight51@outlook.com
 * Description:
 *    服务端项目配置信息
 */
let LogHelper = require('./helpers/LogHelper');

const { redisConnInfo } = require('./cfg/database/redis');
const { mysqlConnInfo } = require('./cfg/database/mysql');
const { ali_oss_conf, use_ali_oss } = require('./cfg/oss/aliyun');
const { qiniu_oss_conf, use_qiniu_oss } = require('./cfg/oss/qiniu');
const { jwtSecret, tokenValidity, tokenValidityUnit } = require('./cfg/secure/jwt');
const { logCfg } = require('./cfg/server/server');
const wechatCfg = require('./cfg/platform/wechat');
const aliSmsConf = require('./cfg/sms/alidayu');
const allowUploadTypes = ['feedback', 'avatar', 'cover'];  // 允许上传图片的业务场景: 反馈图片, 头像, 封面图片

const oss_type = '';        // 选择使用对象存储的类型 目前仅包含 阿里云对象存储 'aliyun' 和 七牛云对象存储 'qiniu'
let use_oss, oss_conf;
switch (oss_type) {
    case 'aliyun':
        use_oss = use_ali_oss;
        oss_conf = ali_oss_conf;
        break;
    case 'qiniu':
        use_oss = use_qiniu_oss;
        oss_conf = qiniu_oss_conf;
        break;
    default:
        LogHelper.error('没有合适的要云对象存储选项 只能在aliyun和qiniu中选一个');
        break;
}

module.exports = {
    // database connection configuration
    redisConnInfo,
    mysqlConnInfo,

    // oss connection configuration
    oss_type,
    use_oss,
    oss_conf,
    allowUploadTypes,

    // api secure & authorization configuration
    jwtSecret,
    tokenValidity,
    tokenValidityUnit,

    // platform relative configuration
    wechat_appid: wechatCfg.appid,
    wechat_secret: wechatCfg.secret,

    // sms config file
    smsCfg: aliSmsConf.ali_sms_conf,

    // server config
    logCfg

};