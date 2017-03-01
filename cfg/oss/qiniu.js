/**
 * Created by LXHFIGHT on 2017/3/2 1:01.
 * Email: lxhfight51@outlook.com
 * Description:
 *  Qiniu OSS configuration
 *  URL: https://developer.qiniu.com/kodo/sdk/nodejs
 */
/**
 * Created by LXHFIGHT on 2017/2/17 22:00.
 * Email: lxhfight51@outlook.com
 * Description:
 *   Aliyun OSS configuration
 *   URL:   https://www.aliyun.com/product/oss?spm=5176.8142029.388261.47.QASlTJ
 */
const use_qiniu_oss = true;
const qiniu_oss_conf = {
    ACCESS_KEY: '',                                 // 七牛云账号的accessKey
    SECRET_KEY: '',                                 // 七牛云账号的accessKeySecret
    bucket: '',                                     // 七牛云OSS对象存储桶名字
    prefix: 'http://*******.bkt.clouddn.com/'       // 七牛云OSS外链前缀【结尾记得带上"/"】
};

module.exports = {
    use_qiniu_oss,
    qiniu_oss_conf
};