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
 * 添加指定的数据模型
 * @param model  指定的数据模型
 * @param body  添加的内容
 * @param res  相应对象
 */
let addItem = (model, body, res) => {
    let resData = null;
    let item = model.build(body);
    item.save()
        .then((insertedData) => {
            resData = ResponseHelper.getResponseBundle({
                msg: `${ResponseHelper.SUCCESS_DATA_INSERTED}`,
                data: insertedData.dataValues
            });
            ResponseHelper.setResponseJSON(res, resData);
            return null;
        })
        .catch((err) => {
            LogHelper.error(err);
            resData = {
                msg: `${ResponseHelper.ERROR_DATA_INSERTED}`,
                data: err,
                result: 1
            };
            ResponseHelper.setResponseJSON(res, resData, 404);
        });
};

/**
 * 修改指定ID的数据模型
 * @param model  指定的数据模型
 * @param req    请求对象
 * @param res    响应对象
 */
let updateItem = (model, req, res) => {
    let id = req.params.id;
    let resData = null;
    model.update(req.body, { where: { id } })
        .then((data) => {
            resData = ResponseHelper.getResponseBundle({
                msg: data[0] === 0 ? ResponseHelper.WARNING_NO_DATA_FOUND : ResponseHelper.SUCCESS_DATA_UPDATED,
                data: data[0]
            });
            ResponseHelper.setResponseJSON(res, resData);
        })
        .catch((err) => {
            resData = { msg: ResponseHelper.ERROR_DATA_UPDATED, data: err, result: 1 };
            ResponseHelper.setResponseJSON(res, resData, 404);
        })
};

/**
 * 获取指定的数据模型列表 并作返回操作
 * @param model  指定的数据模型
 * @param query 请求搜索条件
 * @param res 响应对象
 */
let getList = (model, query, res) => {
    let searchBundle = RequestHelper.getSearchBundle(query);
    let pagesize = (query.pagesize) ? (parseInt(query.pagesize)) : 20 ;
    model.findAndCountAll(searchBundle)
        .then(function(result) {
            let resData = ResponseHelper.getResponseBundle({
                msg: ResponseHelper.SUCCESS_LIST_READ,
                data: {
                    total: result.count,
                    maxsize: Math.ceil(result.count / pagesize),
                    list: result.rows
                }
            });
            ResponseHelper.setResponseJSON(res,resData,200);
        })
        .catch((err) => {
            let resData = {
                msg: ResponseHelper.ERROR_LIST_READ,
                data: err,
                result: 1
            };
            ResponseHelper.setResponseJSON(res, resData, 404);
        });
};

/**
 * 获取指定ID的数据模型
 * @param model  指定的数据模型
 * @param id  指定的ID
 * @param res 响应对象
 */
let getItemById = (model, id, res) => {
    model.findById(id).then((data) => {
        let msg = (data === null) ? ResponseHelper.WARNING_NO_DATA_FOUND : ResponseHelper.SUCCESS_DATA_READ;
        let resData = ResponseHelper.getResponseBundle({ msg, data });
        ResponseHelper.setResponseJSON(res, resData, 200);
    }).catch((err) => {
        let resData = ResponseHelper.getResponseBundle({
            msg: ResponseHelper.ERROR_DATA_READ,
            data: err,
            result: 0
        });
        ResponseHelper.setResponseJSON(res, resData, 404);
    });
};

/**
 * 删除指定ID的数据模型
 * @param model  指定的数据模型
 * @param id  需要删除的数据的ID
 * @param res 响应对象
 */
let deleteItemById = (model, id, res) => {
    model.destroy({ where: { id: id } }).then((rowsDeleted) => {
        let resData = null;
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
    }).catch((err) => {
        let resData = ResponseHelper.getResponseBundle({
            msg: ResponseHelper.ERROR_DATA_DELETED,
            data: err
        });
        ResponseHelper.setResponseJSON(res, resData, 404);
    })
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


module.exports = {
    addItem,
    updateItem,
    getList,
    getItemById,
    deleteItemById,
    getWhereBundle
};