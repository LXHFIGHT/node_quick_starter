/**
 * Created by LXHFIGHT on 2017/2/15 16:58.
 * Email: lxhfight51@outlook.com
 * Description:
 *      用于处理用户登录的相关内容
 */

let express = require('express');
let router = express.Router();
let ItemService = require('../service/login/LoginService');

// 获取列表路由必须置于获取单条记录之前
router.get('/wx', ItemService.wxLogin);

module.exports = router;