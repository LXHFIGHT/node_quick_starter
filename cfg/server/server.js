/**
 * Created by LXHFIGHT on 2017/3/15 20:34.
 * Email: lxhfight51@outlook.com
 * Description:
 *      关于服务器设置
 */
const server_name = 'node_quick_starter';       // 服务器名

// 允许访问域
const Access_Control_Allow_Origin = ( process.env.NODE_ENV ? 'http://www.lxhfight.com' : '*'  ) ;

const logCfg = {
    maxLogSize: 1024 * 1024,                // 定义日志限制大小
    filename: `/var/log/${server_name}/`,   // 定义日志存储位置
    absolute: false                         // 定义日志存储位置是否绝对定位
};

module.exports = {
    Access_Control_Allow_Origin,
    server_name,
    logCfg
};