/**
 * Created by LXHFIGHT on 2017/2/17 22:21.
 * Email: lxhfight51@outlook.com
 * Description:
 *  wechat platform appid and secret
 */

const activated = false;                             // 是否需要接入微信公众平台

const appid = "wxadca191d01a5da27";                  // 微信公众平台开发者唯一凭证 appid

const secret = "d5f97c023e86a72fcb31c56b1a25662a";   // 微信公众平台开发者唯一凭证秘钥 secret

const token = "wechatTest";                          // 微信基本配置中服务器配置 -> token 信息

module.exports = {
    activated,
    appid,
    secret,
    token
};