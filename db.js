/**
 * Created by LXHFIGHT on 2016/12/27 10:30.
 * Email: lxhfight51@outlook.com
 * Description:
 *     A database manager of Sequelize
 */

let Sequelize = require('sequelize');
let { connInfo } = require('./config');

let sequelize = new Sequelize(
    connInfo.database,
    connInfo.username,
    connInfo.password,
    connInfo.options
);

module.exports = sequelize;