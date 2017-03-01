/**
 * Created by LXHFIGHT on 2017/3/2 0:47.
 * Email: lxhfight51@outlook.com
 * Description:
 *  a test for qiniu oss
 */

var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'PVVFQCp59YGoAK4EWhjbmTux7cZxZGu3LHNkK3kb';
qiniu.conf.SECRET_KEY = 'dC6shr7eoJ65VFSAMV2cXhiRL7r8VLNuZJmXxCCA';

//要上传的空间
bucket = 'lxhfight';
//上传到七牛后保存的文件名
key = 'static/image.png';


//要上传文件的本地路径
filePath = './chj-2.jpg';

//构造上传函数
let uploadFile = (key, localFile) => {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    let token = putPolicy.token();
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, localFile, extra, (err, result) => {
        if(!err) {
            console.dir(result);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

//调用uploadFile上传
uploadFile(key, filePath);
