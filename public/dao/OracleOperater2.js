var oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;//指定返回格式，[{"列名1":"value"，"列名2":"value",..},{"列名1":"value"，"列名2":"value",..},..]
var AES = require('../common/AESUtil');
var etcd = require('../common/Etcd');

var pool = oracledb.createPool({
    user: etcd.getSinglePro('/config/db/userName'),
    password: AES.decrypt(etcd.getSinglePro('/config/db/password'),etcd.getSinglePro('/config/encrypt/dbEncryptKey')),
    connectString: etcd.getSinglePro('/config/db/jdbcUrl')
});

var query=async function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};