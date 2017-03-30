/**
 * Created by LXHFIGHT on 2017/3/30 14:37.
 * Email: lxhfight51@outlook.com
 * Description:
 *
 */
let SmsHelper = require('./../../helpers/SMSHelper');
let LogHelper = require('./../../helpers/LogHelper');

SmsHelper.sendValidCode({
    name: '',
    cellphone: '13570977460'
}, (err, data) => {
    if (!err) {
        LogHelper.log(data);
    } else {
        LogHelper.log(err);
    }
});