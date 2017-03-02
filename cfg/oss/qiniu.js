/**
 * Created by LXHFIGHT on 2017/3/2 1:01.
 * Email: lxhfight51@outlook.com
 * Description:
 *  Qiniu OSS configuration
 *  URL: https://developer.qiniu.com/kodo/sdk/nodejs
 */
const use_qiniu_oss = true;
const qiniu_oss_conf = {
    ACCESS_KEY: '',                                 // TODO 七牛云账号的accessKey
    SECRET_KEY: '',                                 // TODO 七牛云账号的accessKeySecret
    bucket: '',                                     // TODO 七牛云OSS对象存储桶名字
    prefix: 'http://*******.bkt.clouddn.com/'       // TODO 七牛云OSS外链前缀【结尾记得带上"/"】
};

module.exports = {
    use_qiniu_oss,
    qiniu_oss_conf
};