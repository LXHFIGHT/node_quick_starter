/**
 * Created by LXHFIGHT on 2017/1/3 16:25.
 * Email: lxhfight51@outlook.com
 * Description:
 *  导入原图服务
 */
let fs = require('fs');
let uuidV4 = require('uuid/v4');
let ResponseHelper = require('../../helpers/ResponseHelper');
let ObjectHelper = require('../../helpers/ObjectHelper');
let OSSHelper = require('../../helpers/OSSHelper');
let multiparty = require('multiparty');
let { allowUploadTypes } = require('../../config');

//  批量导入图片操作
let uploadImages = (req, res, next) => {
    let type = req.params.type;

    if(typeof  type === 'undefined'){
        next();
    }

    if (ObjectHelper.inArray(allowUploadTypes, type)) {
        let form = new multiparty.Form({uploadDir: `public/img/${type}/`});
        let images = [], resData;
        form.encoding = 'utf-8';
        form.keepExtensions = true;     // 保留之前后缀
        form.on('error', (err) => {
            console.log('Error parsing form: ' + err);
        });
        form.parse(req, (err, fields, files) => {
            if(files.images){
                files.images.forEach((file) => {
                    const id = uuidV4();
                    // const size = parseInt(file.size / 1024);    // 获取文件大小
                    let dstPath      = `public/img/${type}/${id}.jpg`;
                    let dstPathUrl   = `/img/${type}/${id}.jpg`;
                    let uploadedPath = file.path;
                    // 重命名图片
                    fs.renameSync(uploadedPath, dstPath);
                    // 缓存上传图片信息 包括默认值originId为-1,
                    images.push(dstPathUrl);
                    if(images.length === files.images.length){
                        resData = ResponseHelper.getResponseBundle({
                            msg: `${ResponseHelper.SUCCESS_FILE_UPLOADED}`,
                            data: images,
                            result: 0
                        });
                        ResponseHelper.setResponseJSON(res, resData, 200);
                    }
                });
            } else {
                resData = ResponseHelper.getResponseBundle({
                    msg: `${ResponseHelper.ERROR_FILE_UPLOAD}`,
                    data: err,
                    result: 1
                });
                ResponseHelper.setResponseJSON(res, resData, 200);
            }
        });
    } else {
        let resData = ResponseHelper.getResponseBundle({
            msg: `${ResponseHelper.ERROR_FILE_UPLOAD}`,
            data: '请查看接口是否出错，上传图片页面类型不包括：' + type + ' 类型',
            result: 1
        });
        ResponseHelper.setResponseJSON(res, resData, 404);
    }
};

//  批量导入图片操作
let uploadImageCloud = (req, res, next) => {
    let type = req.params.type;
    if(typeof  type === 'undefined'){
        next();
    }
    if (ObjectHelper.inArray(allowUploadTypes, type)) {
        let form = new multiparty.Form({uploadDir: `public/img/`});
        let resData;
        form.encoding = 'utf-8';
        form.keepExtensions = true;     // 保留之前后缀
        form.on('error', (err) => {
            console.log('Error parsing form: ' + err);
        });
        form.parse(req, (err, fields, files) => {
            if(files.image){
                let file = files.image[0];
                const id = uuidV4();
                let key = type + '/' + id + '.jpg';
                // const size = parseInt(file.size / 1024);    // 获取文件大小
                let dstPath      = `public/img/${id}.jpg`;
                let uploadedPath = file.path;
                // 重命名图片
                fs.renameSync(uploadedPath, dstPath);
                // 缓存上传图片信息 包括默认值originId为-1,
                OSSHelper.uploadFile(key, dstPath, (err, result) => {
                    if ( err ) {
                        resData = ResponseHelper.getResponseBundle({
                            msg: `${ResponseHelper.ERROR_FILE_UPLOAD}`,
                            data: err,
                            result: 400
                        });
                        ResponseHelper.setResponseJSON(res, resData, 404);
                    } else {
                        fs.unlinkSync(dstPath); // 删除本地图片文件
                        resData = ResponseHelper.getResponseBundle({
                            msg: `${ResponseHelper.SUCCESS_FILE_UPLOADED}`,
                            data: { url: result.url, name: result.name },
                            result: 0
                        });
                        ResponseHelper.setResponseJSON(res, resData, 200);
                    }
                });
            } else {
                resData = ResponseHelper.getResponseBundle({
                    msg: `${ResponseHelper.ERROR_FILE_UPLOAD}`,
                    data: '请确保FormData中图片对应的参数名为image',
                    result: 1
                });
                ResponseHelper.setResponseJSON(res, resData, 404);
            }
        });
    } else {
        let resData = ResponseHelper.getResponseBundle({
            msg: `${ResponseHelper.ERROR_FILE_UPLOAD}`,
            data: '请查看接口是否出错，上传图片页面类型不包括：' + type + ' 类型',
            result: 1
        });
        ResponseHelper.setResponseJSON(res, resData, 404);
    }
};

module.exports = {
    uploadImages,
    uploadImageCloud
};