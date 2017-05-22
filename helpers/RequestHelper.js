/**
 * Created by LXHFIGHT on 2016/12/27 17:16.
 * Email: lxhfight51@outlook.com
 * Description:
 *
 */
let ObjectHelper = require('./ObjectHelper');
let LogHelper = require('./LogHelper');
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


let requestUrl = (url, callback) => {
    let data = '';
    let requestModule = null;
    let Req = null;

    if (url.indexOf('https') === 0) {
        requestModule = require('https');
    } else {
        requestModule =  require('http');
    }

    Req = requestModule.get(url, (httpsRes) => {
        httpsRes.setEncoding('utf8');
        httpsRes.on('data', (chunk) => {
            data += chunk;
        });
        httpsRes.on('end', () => {
            callback(null, data);
        });
    });

    Req.on('error', (err) => {
        LogHelper.error('访问路径： ' + url + ' 获取参数失败');
        LogHelper.error(err);
        callback(err, null);
    });

    Req.end();
};

module.exports = {
    getSearchBundle,
    requestUrl
};