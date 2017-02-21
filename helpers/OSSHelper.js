/**
 * Created by LXHFIGHT on 2017/2/17 22:15.
 * Email: lxhfight51@outlook.com
 * Description:
 *      云 OSS对象存储的帮助方法
 */


let co = require('co');
let OSS = require('ali-oss');
let LogHelper = require('./LogHelper');
const { ali_oss_conf, use_oss } = require('./../config');

let client = null;

if ( use_oss ) {
   client = new OSS(ali_oss_conf);
}

/**
 *  文件上传工具
 *  @param key          键 例如 “avatar/343728-3237218-2321.jpg”
 *  @param filePath     目录
 *  @param callback(err, result)     成功的回调方法
 */
let uploadFile = (key, filePath, callback) => {
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
        let err = { msg: 'please switch the use_oss param to true in /cfg/oss/aliyun.js' };
        callback(err, null);
    }

};

module.exports = {
    uploadFile
};
