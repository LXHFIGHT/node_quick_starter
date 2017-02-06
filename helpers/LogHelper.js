/**
 * Created by LXHFIGHT on 2017/1/12 16:34.
 * Email: lxhfight51@outlook.com
 * Description:
 *  log for console function
 */
let log = (obj) => {
    console.log('===============================================================');
    console.log(obj);
    console.log('===============================================================');
    console.log();
};

let error = (obj) => {
    console.log('***************************************************************');
    console.log(obj);
    console.log('***************************************************************');
    console.log();
};
let success = (obj) => {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(obj);
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log();
};

module.exports = {
    log, error, success
};