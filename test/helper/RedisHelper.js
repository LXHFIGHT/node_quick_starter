/**
 * Created by LXHFIGHT on 2017/3/1 11:35.
 * Email: lxhfight51@outlook.com
 * Description:
 *     测试 redis 数据库操作
 */

let redisDB = require('../../redisdb');

redisDB.set('yahoo', 'good', (err, result) =>{
   if (err === null){
       console.log(result);
   }
});