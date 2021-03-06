/**
 * Created by lxhfight on 2017/5/22.
 */


let express = require('express');
let router = express.Router();
let WechatService = require('./../../service/platform/WechatService');

router.get('/activate', WechatService.activateServer);

router.get('/login-xcx', WechatService.wxxcxLogin);

module.exports = router;