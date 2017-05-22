/**
 * Created by lxhfight on 2017/5/22.
 * Email:
 * Description:
 *
 */


let RequestHelper = require('./../../helpers/RequestHelper');
let LogHelper = require('./../../helpers/LogHelper');

RequestHelper.requestUrl('http://www.baidu.com', (err, data) => {
    !err && LogHelper.log(data);
});