/**
 * Created by LXHFIGHT on 2016/12/27 10:58.
 * Email: lxhfight51@outlook.com
 * Description:
 *      APP用户数据模型
 */

let Sequelize = require('sequelize');
let dbManager = require('./../db');
let User = dbManager.define('t_users', {
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

/*
    可以根据业务需要添加关于model的不同的回调方法
    例如：
        addItem(data, callback, errCallback) 回调方法
    模型可以通过User.model获取
 */
module.exports = {
    model: User
};