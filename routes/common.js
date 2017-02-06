/**
 * Created by LXHFIGHT on 2017/1/16 10:48.
 * Email: lxhfight51@outlook.com
 * Description:
 *      通用请求接口
 */

let express = require('express');
let router = express.Router();
let UploadService = require('../service/common/UploadService');

// 上传图片通用接口
router.post('/upload/:type', UploadService.uploadImages);

module.exports = router;
