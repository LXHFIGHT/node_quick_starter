/**
 * Created by LXHFIGHT on 2017/2/17 22:35.
 * Email: lxhfight51@outlook.com
 * Description:
 *  this is the test file for the /helpers/AuthorizeHelper.js
 */
let AuthorizeHelper = require('./../../helpers/AuthorizeHelper');
let LogHelper = require('./../../helpers/LogHelper');
let ResponseHelper = require('./../../helpers/ResponseHelper');

// generateToken test
let token = AuthorizeHelper.generateToken({
    userId: '12345678',
    name: 'lxhfight',
    isWechatUser: false
});

// 加密后
LogHelper.success(token);

// 解密后
AuthorizeHelper.getInfoFromToken(token, (err, data) => {
    if(err){
        if ( err === -1) {
            LogHelper.log(ResponseHelper.WARNING_EXPIRED_TOKEN);
        } else {
            LogHelper.error(err);
        }
    } else {
        LogHelper.success(data);
    }
});

