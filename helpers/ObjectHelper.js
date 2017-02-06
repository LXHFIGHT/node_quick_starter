/**
 * Created by LXHFIGHT on 2016/12/27 14:54.
 * Email: lxhfight51@outlook.com
 * Description:
 *  function for dealing some Object
 */

let crypto = require('crypto');                         // for encrypt the string
let Shuffle = require('knuth-shuffle').knuthShuffle;    // for shuffling the array

/**
 * 判断该对象是否为数组
 * @param obj 待判断对象
 * @returns {boolean} 判断结果 true为是 false为否
 */
let isArray = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * 对数据进行洗牌操作
 * @param arr
 * @returns {*}
 */
let randomArray = (arr) => {
    if (isArray(arr)) {
        return Shuffle(arr);
    } else {
        return null;
    }
};

/**
 * 生成随机数
 * @param options 随机生成对象
 * @param options.from 区间下限（包括）
 * @param options.to   区间上限（不包括）
 */
let randomNumber = (options) => {
    if(Object.prototype.toString.call(options) === '[object Number]'){
        return Math.floor(Math.random() * options);
    }else{
        return options.from + Math.floor(Math.random() * Math.abs(options.to - options.from));
    }
};

/**
 * 判断该对象中arr数组内的参数名对应的值是否为空，打印判断结果并且返回json
 * @param obj 带判断的结果 例如：
 *          { a: 123, b: null, c: 'hello world' }
 * @param arr 不能为空的参数名列表 例如：
 *          [ 'b', 'foo' ]
 * @return  判断结果 根据上面两个例子会返回：
 *           b, foo 等参数不能为空
 */
let notNullParams = (obj, arr) => {
    let errArr = [];
    arr.forEach((v) => {
        if(typeof obj[v] === 'undefined' || obj[v] === null){
            errArr.push(v);
        }
    });
    if(errArr.length !== 0){
       return `${errArr.join(',')} ${ errArr.length === 1 ? '' : '等' }参数不能为空`;
    }
    return null;
};

/**
 * 判断一个值是否在一个数组中
 * @param arr 遍历的数组
 * @param content 该值
 * @returns {*} 判断结果 true是 false否
 */
let inArray = (arr, content) => {
    let isMatch = false;
    if (!isArray(arr)) {
        console.log('inArray function: arr param is not an array');
        return null;
    } else {
        arr.forEach((v) => {
            if (content === v) {
                console.log('inArray function: content match: ' + content);
                isMatch = true;
            }
        });
        return isMatch;
    }
};

/**
 * 获取指定字符串MD5加密后的密文
 * @param str 明文
 * @returns {*} 密文
 */
let encryptByMD5 = (str) =>  {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

let getDateFormatData = (num) => {
    if(num < 10){
        return '0' + num;
    }else{
        return num;
    }
};

/**
 * 获取当前日期
 * 格式为 2017-1-1 01:01:01
 */
let getNow = () => {
    let date = new Date();
    return `${date.getFullYear()}-${getDateFormatData(date.getMonth() + 1)}-${getDateFormatData(date.getDate())} ${getDateFormatData(date.getHours())}:${getDateFormatData(date.getMinutes())}:${getDateFormatData(date.getSeconds())}`
};

/**
 * 获取指定日期的指定格式
 * @param date 指定的日期对象或者时间戳
 * @returns {*}
 */
let getDateFormat = (date) => {
    let content = date;
    if(typeof content === 'number'){
        content = new Date(content);
    }
    return `${content.getFullYear()}-${getDateFormatData(content.getMonth() + 1)}-${getDateFormatData(content.getDate())} ${getDateFormatData(content.getHours())}:${getDateFormatData(content.getMinutes())}:${getDateFormatData(content.getSeconds())}`
};

// exporting functions
module.exports = {
    isArray,
    inArray,
    notNullParams,
    randomArray,
    encryptByMD5,
    randomNumber,
    getNow,
    getDateFormat
};
