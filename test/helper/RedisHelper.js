/**
 * Created by LXHFIGHT on 2017/3/1 11:35.
 * Email: lxhfight51@outlook.com
 * Description:
 *     测试 redis 数据库操作
 */

let redisDB = require('../../helpers/RedisHelper');

let user = {
    name: 'LXHFIGHT',
    password: 'linux harry',
    dept: 'IT21',
    position: 'frontend engineer'
};

redisDB.hmset('user', user, (err, result) =>{
   if (err === null) {
       console.log(result);
       redisDB.hgetall('user', (err, result) => {
            if (err === null) {
                console.log(result);
            }else{
                console.log(err);
            }
       });
   } else {
       console.log(err);
   }
});

redisDB.set('link',  'https://www.lxhfight.com', (err, result) => {
    if (err) {
        console.log(err);
    } else{
        console.log(result);
        redisDB.get('link', (err, result) => {
            if (err === null) {
                console.log(result);
            }else{
                console.log(err);
            }
        });
    }
});

