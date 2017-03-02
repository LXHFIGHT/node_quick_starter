/**
 * Created by LXHFIGHT on 2017/3/2 0:47.
 * Email: lxhfight51@outlook.com
 * Description:
 *  a test for qiniu oss
 */

var OSSHelper = require("./../../helpers/OSSHelper");

//上传到七牛后保存的文件名
key = 'static/image.png';

//要上传文件的本地路径
filePath = './chj-2.jpg';


//调用uploadFile上传
uploadFile(key, filePath, (err, result) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log(result.url);
    }
}) ;
