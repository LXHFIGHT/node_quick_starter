/**
 * Created by LXHFIGHT on 2017/3/30 9:09.
 * Email: lxhfight51@outlook.com
 * Description:
 *  阿里大于 SMS 短信平台服务所需配置
 */

// 开发环境所在项目需要阿里云OSS参数
const ali_sms_conf_dev = {
    clientInfo: {
        'appkey': '',                                         // 阿里大于账号对应的app_key
        'appsecret': '',                                      // 阿里大于账号对应的app_secret
        'REST_URL': 'http://gw.api.taobao.com/router/rest',   // 阿里大于发送短信验证的相关API接口位置
        'format': 'json'
    },
    // 模板列表
    templates: [
        {
            smsFreeSignName: '',                              // 短信签名  [阿里大于"管理中心" -> "配置管理" -> "验证码"]
            smsTemplateCode: '',                              // 短信模板代码 一般以 “SMS_{代码}” 的格式
            codeLength: 6                                     // 设置短信验证码的长度
        }
    ]
};

// 生产环境所在项目需要阿里云OSS参数
const ali_sms_conf_prod = {
    clientInfo: {
        'appkey': '',                                         // 阿里大于账号对应的app_key
        'appsecret': '',                                      // 阿里大于账号对应的app_secret
        'REST_URL': 'http://gw.api.taobao.com/router/rest',   // 阿里大于发送短信验证的相关API接口位置
        'format': 'json'
    },
    // 模板列表
    templates: [
        {
            smsFreeSignName: '',                              // 短信签名  [阿里大于"管理中心" -> "配置管理" -> "验证码"]
            smsTemplateCode: '',                              // 短信模板代码 一般以 “SMS_{代码}” 的格式
            codeLength: 6                                     // 设置短信验证码的长度
        }
    ]
};

module.exports = {
    ali_sms_conf: ( process.env.NODE_ENV ? ali_sms_conf_prod : ali_sms_conf_dev )
};
