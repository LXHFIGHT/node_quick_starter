/**
 * Created by LXHFIGHT on 2017/2/17 22:00.
 * Email: lxhfight51@outlook.com
 * Description:
 *   Aliyun OSS configuration
 *   URL:   https://www.aliyun.com/product/oss?spm=5176.8142029.388261.47.QASlTJ
 */
const use_ali_oss = true;

// 开发环境所在项目需要阿里云OSS参数
const ali_oss_conf_dev = {
    region: '',                             // TODO OSS对象区域
    accessKeyId: '',                        // TODO 阿里云账号的accessKey
    accessKeySecret: '',                    // TODO 阿里云账号的accessKeySecret
    bucket: '',                             // TODO 阿里云OSS对象存储桶名字
    endpoint: ''                            // TODO 阿里云OSS的终端域名
};

// 生产环境所在项目需要阿里云OSS参数
const ali_oss_conf_prod = {
    region: '',                             // TODO OSS对象区域
    accessKeyId: '',                        // TODO 阿里云账号的accessKey
    accessKeySecret: '',                    // TODO 阿里云账号的accessKeySecret
    bucket: '',                             // TODO 阿里云OSS对象存储桶名字
    endpoint: ''                            // TODO 阿里云OSS的终端域名
};

module.exports = {
    use_ali_oss,
    ali_oss_conf: ( process.env.NODE_ENV ? ali_oss_conf_prod : ali_oss_conf_dev )
};