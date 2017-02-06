/**
 * Created by LXHFIGHT on 2016/12/28 16:13.
 * Email: lxhfight51@outlook.com
 * Description:
 *   标签 CRUD和列表常规操作服务
 */

let item = require('./../../models/User').model;
let BaseDAO = require('./../../helpers/BaseDAO');
let ResponseHelper = require('./../../helpers/ResponseHelper');
let ObjectHelper = require('./../../helpers/ObjectHelper');

//  修改记录
let updateItem = (req, res, next) => {
    BaseDAO.updateItem(item, req, res);
};

//  添加记录
let addItem = (req, res, next) => {
    const newItem = req.body;
    let test = ObjectHelper.notNullParams(newItem, ['deviceId', 'device']);
    // 如果添加的记录中不包括deviceId和device字段或其为空，则返回错误信息
    if (test) {
        ResponseHelper.setResponseJSON(res, { msg: test, result: 1, data: -1 });
    } else {
        BaseDAO.addItem(item, newItem, res);
    }
};

//  获取列表
let getList = (req, res, next) => {
    console.log(req.query);
    BaseDAO.getList(item, req.query, res);
};

//  根据id获取记录
let getItem = (req, res, next) => {
    let id = req.params.id;
    BaseDAO.getItemById(item, id, res);
};

//  删除
let deleteItem = (req, res, next) => {
    let id = parseInt(req.params.id);
    BaseDAO.deleteItemById(item, id, res);
};

module.exports = {
    addItem,
    updateItem,
    getList,
    getItem,
    deleteItem
};