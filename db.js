/**
 * Created by LXHFIGHT on 2016/12/27 10:30.
 * Email: lxhfight51@outlook.com
 * Description:
 *     A database manager of Sequelize
 */

let Sequelize = require('sequelize');
let { mysqlConnInfo } = require('./config');

let sequelize = new Sequelize(
    mysqlConnInfo.database,
    mysqlConnInfo.username,
    mysqlConnInfo.password,
    mysqlConnInfo.options
);

module.exports = sequelize;