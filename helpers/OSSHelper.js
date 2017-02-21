/**
 * Created by LXHFIGHT on 2017/2/17 22:15.
 * Email: lxhfight51@outlook.com
 * Description:
 *      云 OSS对象存储的帮助方法
 */


let co = require('co');
let OSS = require('ali-oss');
let LogHelper = require('./LogHelper');
const { ali_oss_conf } = require('./../config');

let client = new OSS(ali_oss_conf);

/**
 *  文件上传工具
 *  @param key          键 例如 “avatar/343728-3237218-2321.jpg”
 *  @param filePath     目录
 *  @param callback     成功的回调方法
 *  @param errCallback  错误的回调信息
 */
let uploadFile = (key, filePath, callback, errCallback) => {
    co(function* () {
        var result = yield client.put(key, filePath);
        LogHelper.success(result);
        callback(result);
    }).catch(function (err) {
        LogHelper.error(err);
        errCallback(err);
    });
};

module.exports = {
    uploadFile
};
