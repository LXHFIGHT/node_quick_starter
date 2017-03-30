/**
 * Created by LXHFIGHT on 2017/3/30 8:58.
 * Email: lxhfight51@outlook.com
 * Description:
 *     用户请求发送短信的接口方法
 *     需要使用RedisHelper作为验证码缓存机制
 */
let RedisHelper = require('./RedisHelper');
let ObjectHelper = require('./ObjectHelper');
let LogHelper = require('./LogHelper');
let { smsCfg, redisConnInfo } = require('./../config');
let TopClient = require( './alidayu/topClient' ).TopClient;
let client = new TopClient(smsCfg.clientInfo);

let generateCode = (number) => {
    let result = "";
    for (let i = 0; i < number; i++) {
        result += '' +ObjectHelper.randomNumber({from: 0, to: 10});
    }
    return result;
};

/**
 * 发送验证短信的方法
 * @param options 需要参数
 * @param options.templateIndex 模板名
 * @param options.name 发送的用户名（不填时默认为 “用户 ” ）
 * @param options.cellphone 发送的用户手机号码
 * @param callback 回调方法
 */
let sendValidCode = (options, callback) => {
    const cellphone = options.cellphone;
    const name = options.name || '用户';
    const templateInfo = smsCfg.templates[options.templateIndex || 0];
    const code = generateCode(templateInfo.codeLength || 6);
    //  需要发送的参数
    let param = { name, code };
    let cellRegExp = /^1[3|5|7|8][0-9]{9}$/;
    if(!cellRegExp.test(cellphone)){
        let err = { msg: "cellphone style 's not match" };
        callback(err, null);
    } else if ( redisConnInfo.RDS_PWD === '' ) {
        let err = { msg: 'sendValidCode： 发送验证码方法需要用到RedisHelper 请先完善redis的相关配置（/cfg/database/redis.js）'};
        callback(err, null);
    } else {
        // 缓存redis
        RedisHelper.set(options.cellphone, code, (redisErr, redisData) => {
            if(!redisErr){
                client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
                    'extend': '' ,
                    'sms_type': 'normal' ,
                    'sms_free_sign_name' : templateInfo.smsFreeSignName,
                    'sms_param': JSON.stringify(param),
                    'rec_num': options.cellphone,
                    'sms_template_code' : templateInfo.smsTemplateCode
                }, function(err, response) {
                    if (err) {
                        LogHelper.error('发送验证短信失败, 错误信息为:');
                        LogHelper.error(err);
                        callback(err, null);
                    } else {
                        callback(null, response);
                    }
                });
            } else {
                callback(redisErr, null);
            }
        });
    }
};


module.exports = {
    sendValidCode
};




