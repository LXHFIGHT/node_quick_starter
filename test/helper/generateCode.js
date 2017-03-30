/**
 * Created by LXHFIGHT on 2017/3/30 9:56.
 * Email: lxhfight51@outlook.com
 * Description:
 *
 */
let ObjectHelper = require('./../../helpers/ObjectHelper');

let generateCode = (number) => {
    let result = "";
    for (let i = 0; i < number; i++) {
        let word = '' +ObjectHelper.randomNumber({from: 0, to: 10});
        result += word;
    }
    console.log(result);
    return result;
};

generateCode(6);
generateCode(6);
generateCode(6);
generateCode(6);
generateCode(6);