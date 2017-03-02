/**
 * Created by LXHFIGHT on 2017/2/17 22:15.
 * Email: lxhfight51@outlook.com
 * Description:
 *      云 OSS对象存储的帮助方法
 */


let co = require('co');
let AliyunOSS = require('ali-oss');
var qiniu = require("qiniu");
let LogHelper = require('./LogHelper');
const { oss_type, oss_conf, use_oss } = require('./../config');

let client = null;

if ( use_oss && oss_type === 'aliyun') {
    client = new AliyunOSS(oss_conf);
} else if ( use_oss && oss_type === 'qiniu') {
    //需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = oss_conf.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = oss_conf.SECRET_KEY;
}

/**
 * 七牛云文件上传工具方法
 * @param key
 * @param filePath
 * @param callback
 * @constructor
 */
let QiniuUploadFile = (key, filePath, callback) => {
    if( use_oss ){
        var putPolicy = new qiniu.rs.PutPolicy(oss_conf.bucket+":"+key);
        let token = putPolicy.token();
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(token, key, filePath, extra, (err, result) => {
            if(!err) {
                callback(null, { url: (oss_conf.prefix + result.key) });
            } else {
                LogHelper.error(err.stack);
                callback(err);
            }
        });
    } else {
        callback({
            errMsg: 'please switch the use_qiniu_oss param to true in  in /cfg/oss/qiniu.js file'
        })
    }
};

/**
 *  阿里云文件上传工具方法
 *  @param key          键 例如 “avatar/343728-3237218-2321.jpg”
 *  @param filePath     目录
 *  @param callback(err, result)     成功的回调方法
 */
let AliyunUploadFile = (key, filePath, callback) => {
    if (use_oss) {
        co(function* () {
            let result = yield client.put(key, filePath);
            LogHelper.success(result);
            callback(null, result);
        }).catch(function (err) {
            LogHelper.error(err);
            callback(err, null);
        });
    } else {
        let err = { errMsg: 'please switch the use_ali_oss param to true in /cfg/oss/aliyun.js' };
        callback(err, null);
    }
};

module.exports = {
    uploadFile: oss_type === 'aliyun' ? AliyunUploadFile : QiniuUploadFile
};
