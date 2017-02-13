/**
 * Created by LXHFIGHT on 2016/12/27 10:30.
 * Email: lxhfight51@outlook.com
 * Description:
 *    服务端项目配置信息
 */

const dev_cloud_storage_prefix = 'public';
const prod_cloud_storage_prefix = 'public';

const allowUploadTypes = ['feedback', 'avatar', 'cover'];  // 允许上传图片的业务场景: 反馈图片, 头像, 封面图片

// database info for develop environment
const dev_conn_info = {
    database: 'shengxin_server',   // replace the real database name with {databaseName} here
    username: 'root',       // replace the real user name with {userName} here
    password: 'liuxuhao7502280',       // replace the real password with {password} here
    options: {
        host: 'localhost',        // hostname
        dialect: 'mysql',         // database SQL dialect
        timezone: '+08:00',       // database timezone ('+08:00 Beijing')
        pool: {
            max: 20,              // the maximum connect amount of the database
            min: 0,               // the minimum connect amount of the database
            idle: 10000           // The maximum time, in milliseconds, that a connection can be idle before being released
        }
    }
};

// database info for production environment
const prod_conn_info = {
    database: '{databaseName}',   // replace the real database name with {databaseName} here
    username: '{userName}',       // replace the real user name with {userName} here
    password: '{password}',       // replace the real password with {password} here
    options: {
        host: 'localhost',        // hostname
        dialect: 'mysql',         // database SQL dialect
        timezone: '+08:00',       // database timezone ('+08:00 Beijing')
        pool: {
            max: 20,              // the maximum connect amount of the database
            min: 0,               // the minimum connect amount of the database
            idle: 10000           // The maximum time, in milliseconds, that a connection can be idle before being released
        }
    }
};

module.exports = {
    allowUploadTypes,
    connInfo: ( process.env.NODE_ENV ? prod_conn_info : dev_conn_info ),
    cloudStoragePrefix: ( process.env.NODE_ENV ? prod_cloud_storage_prefix : dev_cloud_storage_prefix )
};