/**
 * Created by LXHFIGHT on 2017/2/17 21:49.
 * Email: lxhfight51@outlook.com
 * Description:
 *      redis database connection configuration
 */

const redis_dev_conn_info = {
    RDS_PORT: 6379,             // config your redis-server's port here in the development env [default value is 6379]
    RDS_HOST: '127.0.0.1',      // config your redis-server's hostname here in the development env, [default value is 127.0.0.1]
    RDS_PWD: '',                // config your redis-server's authorization code(requirepass) here in the development env
    RDS_OPTS: {}                // config your redis-server's extra options in the development env
};

const redis_prod_conn_info = {
    RDS_PORT: 6379,             // config your redis-server's port here in the production env [default value is 6379]
    RDS_HOST: '127.0.0.1',      // config your redis-server's hostname here in the production env, [default value is 127.0.0.1]
    RDS_PWD: '',                // config your redis-server's authorization code(requirepass) here in the production env
    RDS_OPTS: {}                // config your redis-server's extra options in the production env
};

module.exports = {
    redisConnInfo: ( process.env.NODE_ENV ? redis_prod_conn_info : redis_dev_conn_info )
};
