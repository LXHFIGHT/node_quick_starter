/**
 * Created by LXHFIGHT on 2016/12/27 18:30.
 * Email: lxhfight51@outlook.com
 * Description:
 *
 */
let RequestHelper = require('./RequestHelper');
let ResponseHelper = require('./ResponseHelper');
let LogHelper = require('./LogHelper');

/**
 * 2 添加指定的数据模型
 * @param model  指定的数据模型
 * @param body  添加的内容
 * @param res  相应对象
 */
let addItem = (model, body, res) => {
    let resData = null;
    model.add(
        body,
        (data) => {
            LogHelper.success('成功添加一个记录');
            // 当回调信息传入的值为字符串时，对应的情况是添加对象缺少重要参数或为空
            resData = ResponseHelper.getResponseBundle({
                msg: `${ResponseHelper.SUCCESS_DATA_INSERTED}`,
                data: data.dataValues,
                result: 0
            });
            ResponseHelper.setResponseJSON(res, resData, 200);
        },
        (err) => {
            LogHelper.error('插入记录失败，错误信息如下：');
            LogHelper.error(err);
            resData = {
                msg: `${ResponseHelper.ERROR_DATA_INSERTED}`,
                data: err,
                result: 1
            };
            ResponseHelper.setResponseJSON(res, resData, 404);
        }
    );
};

/**
 * 2 修改指定ID的数据模型
 * @param model  指定的数据模型
 * @param req    请求对象
 * @param res    响应对象
 */
let updateItem = (model, req, res) => {
    let bundle = {
        id: req.params.id,
        body: req.body
    };
    let resData = null;
    model.update(
        bundle,
        (data) => {
            resData = ResponseHelper.getResponseBundle({
                msg: data[0] === 0 ? ResponseHelper.WARNING_NO_DATA_FOUND : ResponseHelper.SUCCESS_DATA_UPDATED,
                data: data[0]
            });
            ResponseHelper.setResponseJSON(res, resData);
        },
        (err) => {
            resData = { msg: ResponseHelper.ERROR_DATA_UPDATED, data: err, result: 1 };
            ResponseHelper.setResponseJSON(res, resData, 404);
        }
    );
};

/**
 * 2获取指定的数据模型列表 并作返回操作
 * @param model  指定的数据模型
 * @param query 请求搜索条件
 * @param res 响应对象
 */
let getList = (model, query, res) => {
    model.list(
        query,
        (data) => {
            let resData = ResponseHelper.getResponseBundle({
                msg: ResponseHelper.SUCCESS_LIST_READ,
                data: data
            });
            ResponseHelper.setResponseJSON(res, resData, 200);
        },
        (err) => {
            let resData = { msg: ResponseHelper.ERROR_LIST_READ, data: err, result: 1 };
            ResponseHelper.setResponseJSON(res, resData, 404);
        }
    );
};

/**
 * 获取指定查询对象的数据模型的个数
 * @param model 指定的数据模型
 * @param query 查询条件
 * @param res HTTP响应对象
 */
let getNumber = (model, query, res) => {
    model.count(
        query,
        (err, data) => {
            if (err) {
                let resData = { msg: ResponseHelper.ERROR_LIST_READ, data: err, result: 1 };
                ResponseHelper.setResponseJSON(res, resData, 404);
            } else {
                let resData = ResponseHelper.getResponseBundle({
                    msg: ResponseHelper.SUCCESS_LIST_READ,
                    data: data,
                    result: 0
                });
                ResponseHelper.setResponseJSON(res, resData, 200);
            }
        }
    )
};

/**
 * 获取指定ID的数据模型
 * @param model  指定的数据模型
 * @param id  指定的ID
 * @param res 响应对象
 */
let getItemById = (model, id, res) => {
    model.get(
        id,
        (data) => {
            let msg = (data === null) ? ResponseHelper.WARNING_NO_DATA_FOUND : ResponseHelper.SUCCESS_DATA_READ;
            let resData = ResponseHelper.getResponseBundle({ msg, data });
            ResponseHelper.setResponseJSON(res, resData, 200);
        },
        (err) => {
            let resData = ResponseHelper.getResponseBundle({
                msg: ResponseHelper.ERROR_DATA_READ,
                data: err,
                result: 0
            });
            ResponseHelper.setResponseJSON(res, resData, 404);
        }
    );
};

/**
 * 删除指定ID的数据模型
 * @param model  指定的数据模型
 * @param id  需要删除的数据的ID
 * @param res 响应对象
 */
let deleteItemById = (model, id, res) => {
    let resData = null;
    model.del(
        id,
        (rowsDeleted) => {
            if (rowsDeleted === 0){
                resData =ResponseHelper.getResponseBundle({
                    msg:  ResponseHelper.WARNING_NO_DATA_FOUND,
                    data: rowsDeleted
                });
            } else {
                resData =ResponseHelper.getResponseBundle({
                    msg:  ResponseHelper.SUCCESS_DATA_DELETED,
                    data: rowsDeleted
                });
            }
            ResponseHelper.setResponseJSON(res, resData);
        },
        (err) => {
            let resData = ResponseHelper.getResponseBundle({
                msg: ResponseHelper.ERROR_DATA_DELETED,
                data: err
            });
            ResponseHelper.setResponseJSON(res, resData, 404);
        });
};

/**
 * 组织where查询语句
 * @param obj 对象
 * @returns {{}} 得到的SQL条件语句
 */
let getWhereBundle = (obj) => {
    let where = {};
    for(p in obj) {
        if ({}.hasOwnProperty.call(obj, p)) {
            if(!(p === 'page' || p === 'pagesize')){
                if ((p === 'id') || (p === 'resolution')) {
                    where[p] = obj[p];
                } else {
                    where[p] = {
                        like: '%' + obj[p] +  '%'
                    }
                }
            }
        }
    }
    LogHelper.log(where);
    return where;
};

/**
 * 删除符合指定搜索条件的数据模型 【限于带有delQuery方法的model】
 * @param model  指定的数据模型
 * @param query  需要删除的数据的查询条件
 * @param res 响应对象
 */
let deleteItemByQuery = (model, query, res) => {
    let resData = null;
    model.delQuery(
        query,
        (err, rowsDeleted) => {
            if (err) {
                let resData = ResponseHelper.getResponseBundle({
                    msg: ResponseHelper.ERROR_DATA_DELETED,
                    data: err
                });
                ResponseHelper.setResponseJSON(res, resData, 404);
            } else {
                if (rowsDeleted === 0){
                    resData =ResponseHelper.getResponseBundle({
                        msg:  ResponseHelper.WARNING_NO_DATA_FOUND,
                        data: rowsDeleted,
                        result: 1
                    });
                } else {
                    resData =ResponseHelper.getResponseBundle({
                        msg:  ResponseHelper.SUCCESS_DATA_DELETED,
                        data: rowsDeleted,
                        result: 0
                    });
                }
                ResponseHelper.setResponseJSON(res, resData);
            }
        });
};


module.exports = {
    addItem,
    updateItem,
    getNumber,
    getList,
    getItemById,
    deleteItemById,
    getWhereBundle,
    deleteItemByQuery
};