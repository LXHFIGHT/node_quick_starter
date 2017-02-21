/**
 * Created by LXHFIGHT on 2017/2/17 22:00.
 * Email: lxhfight51@outlook.com
 * Description:
 *   Aliyun OSS configuration
 *   URL:   https://www.aliyun.com/product/oss?spm=5176.8142029.388261.47.QASlTJ
 */
const use_oss = true;
const ali_oss_conf = {
    region: '',                             // OSS对象区域
    accessKeyId: '',                        // 阿里云账号的accessKey
    accessKeySecret: '',                    // 阿里云账号的accessKeySecret
    bucket: '',                             // 阿里云OSS对象存储桶名字
    endpoint: ''                            // 阿里云OSS的终端域名
};

module.exports = {
    use_oss,
    ali_oss_conf
};