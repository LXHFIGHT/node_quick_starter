/**
 * Created by LXHFIGHT on 2017/3/1 23:33.
 * Email: lxhfight51@outlook.com
 * Description:
 *  Redis tool
 */



let redis = require('redis');
let { redisConnInfo } = require('./../config');
let LogHelper = require('./LogHelper');
let db = {};

let client = redis.createClient(
    redisConnInfo.RDS_PORT,
    redisConnInfo.RDS_HOST,
    redisConnInfo.RDS_OPTS
);

client.auth(redisConnInfo.RDS_PWD, () => {
    console.log('>>> redis-3.2.8 database connect authorized');
});

client.on('connect', ()=>{
    console.log('ooo redis-3.2.8 database connect complete');
});

client.on('ready', (err) => {
    console.log('√√√ redis-3.2.8 database ready to edit');
});

// 监听错误信息
client.on('error', (err) => {
    LogHelper.error(err.stack);
});

/**
 * 添加string类型的数据
 * @param key 键
 * @param value 值
 * @param callback(err,result) 回调方法
 */
db.set = (key, value, callback) => {
    client.set(key, value, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        callback(null, result);
    });
};

/**
 * 获取string类型的数据
 * @param key 键
 * @param callback(err, result) 其中result为获取的值
 */
db.get = (key, callback) => {
    client.get(key, (err, result) => {
        if (err) {
            LogHelper.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

/**
 * 将一个对象保存以hash方式保存在redis
 * @param key  键
 * @param value  javascript对象
 * @param callback(err, result) 回调方法
 */
db.hmset = (key, value, callback) => {
    client.hmset(key, value, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

/**
 * 通过键获取指定的对象
 * @param key 键
 * @param callback(err, result) 回调方法
 */
db.hgetall = (key, callback) => {
    client.hgetall(key, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = db;


