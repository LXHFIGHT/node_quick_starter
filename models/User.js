/**
 * Created by LXHFIGHT on 2016/12/27 10:58.
 * Email: lxhfight51@outlook.com
 * Description:
 *      APP用户数据模型
 */

let Sequelize = require('sequelize');
let dbManager = require('./../db');
let LogHelper = require('./../helpers/LogHelper');
let ObjectHelper = require('./../helpers/ObjectHelper');
let RequestHelper = require('./../helpers/RequestHelper');
let ResponseHelper = require('./../helpers/ResponseHelper');

let chartName = 't_users'; // 关联数据表名

//  ORM模型定义 define后带着关联数据表名
let model = dbManager.define(chartName, {
    id:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    deviceId: {
        type: Sequelize.STRING(255),
        field: 'device_id'
    },
    device: {
        type: Sequelize.STRING(120)
    },
    // APP用户设备类型 1 表示Android， 2表示iOS， 0表示未知
    deviceType: {
        type: Sequelize.INTEGER,
        field: 'device_type',
        defaultValue: 0
    },
    resolution: {
        type: Sequelize.STRING(60)
    },
    // APP用户性别 其中 2 表示女生 1 表示男生 0表示未知
    sex: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

/**
 * 根据元素唯一标识获取元素信息
 * @param id 元素唯一标识
 * @param callback 获取成功回调方法
 * @param errCallback 获取失败回调方法
 */
let get = (id, callback, errCallback) => {
    model.findById(id)
        .then((data) => {
            LogHelper.success(chartName + ' ' + ResponseHelper.SUCCESS_DATA_READ);
            callback(data);
        }).catch((err) => {
            LogHelper.error(err);
            errCallback(err.stack);
        });
};

/**
 * 添加元素
 * @param item 元素内容
 * @param callback 添加成功回调方法
 * @param errCallback 添加失败回调方法
 */
let add = (item, callback, errCallback) => {
    let bundle = model.build(item);
    bundle
        .save()
        .then((data) => {
            LogHelper.success(chartName + ' ' + ResponseHelper.SUCCESS_DATA_INSERTED);
            callback(data);
        })
        .catch((err) => {
            LogHelper.error(err);
            errCallback(err.stack);
        });
};

/**
 * 修改指定ID的元素
 * @param item 元素内容
 * @param item.id 元素的唯一标识符
 * @param item.body 元素修改内容
 * @param callback 修改成功回调方法
 * @param errCallback 修改失败回调方法
 */
let update = (item, callback, errCallback) => {
    model.update(item.body, { where: { id: item.id } })
        .then((data) => {
            LogHelper.success(chartName + ' ' + ResponseHelper.SUCCESS_DATA_UPDATED);
            callback(data);
        })
        .catch((err) => {
            LogHelper.error(err);
            errCallback(err.stack);
        });
};

/**
 * 获取指定查询条件下的元素列表
 * @param query 查询条件
 * @param callback
 * @param errCallback
 */
let list = (query, callback, errCallback) => {
    (query.pagesize) ? (query.pagesize = parseInt(query.pagesize)) : (query.pagesize = 9999);
    (query.page) ? (query.page = parseInt(query.page)) : (query.page = 1);
    let searchBundle = RequestHelper.getSearchBundle(query);
    model
        .findAndCountAll(searchBundle)
        .then(function(result) {
            LogHelper.success(chartName + ' ' + ResponseHelper.SUCCESS_LIST_READ);
            let data = {
                total: result.count,
                maxsize: Math.ceil(result.count / query.pagesize),
                list: result.rows
            };
            callback(data);
        })
        .catch((err) => {
            LogHelper.error(err);
            errCallback(err.stack);
        });
};

/**
 * 删除指定的元素
 * @param id 指定删除元素的唯一标识
 * @param callback 删除成功回调方法
 * @param errCallback 删除失败回调方法
 */
let del = (id, callback, errCallback) => {
    model.destroy({ where: { id } })
        .then((rowsDeleted) => {
            LogHelper.success(chartName + ' ' + ResponseHelper.SUCCESS_DATA_UPDATED);
            callback(rowsDeleted);
        }).catch((err) => {
            LogHelper.error(err);
            errCallback(err.stack);
        })
}

/*
    可以根据业务需要添加关于model的不同的回调方法
    例如：
        addItem(data, callback, errCallback) 回调方法
    模型可以通过User.model获取
 */
module.exports = {
    model,
    get,
    add,
    update,
    list,
    del
};