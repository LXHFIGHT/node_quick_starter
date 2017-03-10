/**
 * Created by LXHFIGHT on 2016/12/27 14:54.
 * Email: lxhfight51@outlook.com
 * Description:
 *  用于作各种对象封装
 */

/**
 * 封装响应参数JSON对象
 * @param options.msg 响应信息
 * @param options.data 响应数据主体
 * @param options.result 响应是否成功 0 为成功 其他书为失败
 * @return {*} 响应JSON数据
 */
let getResponseBundle = (options) => {
    let { msg, data, result } = options;
    (typeof result === 'undefined') &&  (result = (data !== -1) ? 0 : 1);
    let jsonData = { result, data, msg };
    return JSON.stringify(jsonData);
};

/**
 * 进行服务端响应处理
 * @param res 响应处理对象
 * @param data 响应数据
 * @param code 响应状态码
 */
let setResponseJSON = (res, data, code = 200) => {
    let responseData = data;
    if(typeof responseData !== 'string'){
        responseData = JSON.stringify(responseData);
    }
    // 设置响应头
    res.writeHead(code, {
        'charset': 'utf-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type,Content-Length, Authorization, Accept, X-Requested-With',
        'Content-Type': 'application/json, application/x-www-form-urlencoded'
    });
    res.write(responseData);
    res.end();
};

module.exports = {

    // 公共信息字符串

    // 成功字符串
    SUCCESS_DATA_INSERTED: 'data inserted successfully ',
    SUCCESS_DATA_READ: 'data read successfully',
    SUCCESS_DATA_DELETED: 'data deleted successfully ',
    SUCCESS_LIST_READ: 'fetch list info successfully',
    SUCCESS_DATA_UPDATED: 'data updated successfully',
    SUCCESS_FILE_UPLOADED: 'file uploaded successfully',
    SUCCESS_ACCESS_TOKEN_GOT: 'wechat access token fetch successfully, it will be expired in 2 hours',

    // 警告字符串
    WARNING_NO_TOKEN: 'without token',
    CODE_WARNING_NO_TOKEN: 401,
    WARNING_INVALID_TOKEN: 'invalid token',
    CODE_WARNING_INVALID_TOKEN: 402,
    WARNING_EXPIRED_TOKEN: 'expired token',
    CODE_WARNING_EXPIRED_TOKEN: 403,
    WARNING_NO_DATA_FOUND: 'can not found any data matched',
    CODE_WARNING_NO_DATA_FOUND: 404,
    WARNING_NO_DATA_DELETE: 'can not found any data matched to delete',
    WARNING_PARAM_REQUIRE_NOT_NULL: 'there are several params requires not null',

    // 错误字符串
    ERROR_DATA_INSERTED: 'data insert error',
    ERROR_DATA_UNIQUE: 'data insert error, require unique',
    ERROR_DATA_READ: 'data search error',
    ERROR_LIST_READ: 'list data search error, check the error stack',
    ERROR_DATA_DELETED: 'data delete unsuccessfully',
    ERROR_MISSING_IMPORTANT_PARAMS: 'lack of important params',
    ERROR_DATA_UPDATED: 'data update error',
    ERROR_FILE_UPLOAD: 'file upload failed',

    getResponseBundle,
    setResponseJSON
};
