/**
 * Created by lxhfight on 2017/5/22.
 * Email:
 * Description:
 *
 */


let ObjectHelper = require('./../../helpers/ObjectHelper');

let timeStamp = '1495454992';
let nonce = '762754465';
let token = 'wechatTest';
let signature = '8cdef9f272e47724f1982d80201075934d2a4def';

// let arr = [timeStamp, nonce, token];
// arr.sort();
//
// console.log(signature);
// let str = arr.join('');
// console.log(ObjectHelper.encryptStr(str,'sha1'));
// console.log(signature);
console.log(ObjectHelper.randomString(60));