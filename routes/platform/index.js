/**
 * Created by lxhfight on 2017/5/22.
 * Email: lxhfight51@outlook.com
 * Description:
 *  router for the 3rd-party platform request
 */


let express = require('express');
let router = express.Router();
let wechat = require('./wechat');

router.use('/wechat', wechat);

module.exports =  router;
