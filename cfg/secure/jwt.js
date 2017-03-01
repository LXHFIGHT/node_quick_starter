/**
 * Created by LXHFIGHT on 2017/2/17 22:05.
 * Email: lxhfight51@outlook.com
 * Description:
 *  json web token authorization configuration
 */

module.exports = {
    jwtSecret: 'edit_your_token_here',  // TODO edit the jwt authorize secret string here
    tokenValidity: 7,                   // edit the jwt validity(有效期) [单位：天]
    tokenValidityUnit: 'days'           // edit the jwt validity unit(有效期单位)
};