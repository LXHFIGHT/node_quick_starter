/**
 * Created by LXHFIGHT on 2017/2/17 21:49.
 * Email: lxhfight51@outlook.com
 * Description:
 *  mysql database connection configuration
 */
// TODO edit the database connection information
// database info for develop environment
const mysql_dev_conn_info = {
    database: '{databaseName}',    // replace the real database name with {databaseName} here
    username: '{userName}',               // replace the real user name with {userName} here
    password: '{password}',    // replace the real password with {password} here
    options: {
        host: 'localhost',          // hostname
        dialect: 'mysql',           // database SQL dialect
        timezone: '+08:00',         // database timezone ('+08:00 Beijing')
        pool: {
            max: 20,                // the maximum connect amount of the database
            min: 0,                 // the minimum connect amount of the database
            idle: 10000             // The maximum time, in milliseconds, that a connection can be idle before being released
        }
    }
};

// database info for production environment
const mysql_prod_conn_info = {
    database: '{databaseName}',     // replace the real database name with {databaseName} here
    username: '{userName}',         // replace the real user name with {userName} here
    password: '{password}',         // replace the real password with {password} here
    options: {
        host: 'localhost',          // hostname
        dialect: 'mysql',           // database SQL dialect
        timezone: '+08:00',         // database timezone ('+08:00 Beijing')
        pool: {
            max: 20,                // the maximum connect amount of the database
            min: 0,                 // the minimum connect amount of the database
            idle: 10000             // The maximum time, in milliseconds, that a connection can be idle before being released
        }
    }
};

module.exports = {
    mysqlConnInfo: ( process.env.NODE_ENV ? mysql_prod_conn_info : mysql_dev_conn_info )
};