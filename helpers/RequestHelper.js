/**
 * Created by LXHFIGHT on 2016/12/27 17:16.
 * Email: lxhfight51@outlook.com
 * Description:
 *
 */

let ObjectHelper = require('./ObjectHelper');

let excludeParams = ['page', 'pagesize', 'maxsize', 'order'];   // 不列入合并搜索的字段名

/**
 * 根据请求参数获取Sequelize搜索条件对象
 * @param query
 * @returns {{where: {}, offset: (number|*), limit: *}}
 */
let getSearchBundle = (query) => {
    let { pagesize, page } = query, offset, limit, order;
    pagesize = (pagesize) ? (parseInt(pagesize)) : 20 ;
    page = page || 1;
    offset = pagesize * (page - 1);
    limit = pagesize;
    let where = {};
    for(p in query){
        if ({}.hasOwnProperty.call(query, p)) {
            if (!ObjectHelper.inArray(excludeParams, p)) {
                if (!((query[p] === '') || (query[p] === null ))) {
                    if (!isNaN(parseFloat(query[p])) || p === 'id') {
                        where[p] = query[p];
                    } else {
                        where[p] = {$like: `%${query[p]}%`};
                    }
                } else {
                    console.log('RequestHelper.js:  the param ' + p + ' is empty');
                }
            }
        }
    }
    if(query.order){
        order = `${query.order.key} ${query.order.type ? query.order.type : 'asc'}`;
    }else{
        order = 'createdAt DESC';
    }
    return { where,  order,  offset, limit };
};

module.exports = {
    getSearchBundle
};