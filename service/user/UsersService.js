/**
 * Created by LXHFIGHT on 2016/12/28 16:13.
 * Email: lxhfight51@outlook.com
 * Description:
 *   标签 CRUD和列表常规操作服务
 */

let model = require('./../../models/User');
let BaseDAO = require('./../../helpers/BaseDAO');
let ResponseHelper = require('./../../helpers/ResponseHelper');
let ObjectHelper = require('./../../helpers/ObjectHelper');
let LogHelper = require('./../../helpers/LogHelper');

//  修改记录
let updateItem = (req, res, next) => {
    BaseDAO.updateItem(model, req, res);
};

//  添加记录
let addItem = (req, res, next) => {
    const item = req.body;
    let test = ObjectHelper.notNullParams(item, ['deviceId', 'device']);
    // 如果添加的记录中不包括deviceId和device字段或其为空，则返回错误信息
    if (test) {
        LogHelper.error(test);
        ResponseHelper.setResponseJSON(res, { msg: test, result: 1, data: -1 });
    } else {
        LogHelper.success(item);
        BaseDAO.addItem(model, item, res);
    }
};

//  获取列表
let getList = (req, res, next) => {
    console.log(req.query);
    BaseDAO.getList(model, req.query, res);
};

//  获取统计数
let getNumber = (req, res, next) => {
    BaseDAO.getNumber(model, req.query, res);
};

//  根据id获取记录
let getItem = (req, res, next) => {
    let id = req.params.id;
    BaseDAO.getItemById(model, id, res);
};

//  删除
let deleteItem = (req, res, next) => {
    let id = req.params.id; // 如果是整数型ID的话需要使用 parseInt(req.params.id)
    BaseDAO.deleteItemById(model, id, res);
};

module.exports = {
    addItem,
    getNumber,
    updateItem,
    getList,
    getItem,
    deleteItem
};