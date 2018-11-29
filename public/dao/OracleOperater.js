var oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;//指定返回格式，[{"列名1":"value"，"列名2":"value",..},{"列名1":"value"，"列名2":"value",..},..]
var AES = require('../common/AESUtil');
var etcd = require('../common/Etcd');
var log = require("log4js").getLogger('OracleOperater');
var oraclePool;//数据库线程池
class OracleOperater {

    constructor() {
        try{
            this.createPool();
        }catch (err) {
            log.error('OracleOperater constructor err',err)
        }
    }

    async createPool(){
        oracledb.createPool({
            user: await etcd.getSinglePro('/config/db/userName'),
            password: AES.decrypt(await etcd.getSinglePro('/config/db/password'),await etcd.getSinglePro('/config/encrypt/dbEncryptKey')),
            connectString: await etcd.getSinglePro('/config/db/jdbcUrl')
            // poolMin           : -5,
            // poolMax           : 5,
            // poolIncrement     : 1,
            // poolTimeout       : await etcd.getSinglePro('/config/db/jdbcUrl'),
            // stmtCacheSize     : 23
        },function (err,pool) {
            if(err){
                log.error('oracledb create pool err!!! ',err)
            } else {
                log.info('oracledb create pool success, pool status='+pool.status);
                oraclePool=pool;
            }
        })
    }
    async executeSql(sql) {
        var connection = await this.getConn();
        var data = await this.sql(connection, sql);
        return data;
    }

    async callProc(sql, param) {
        var connection = await this.getConn();
        var data = await this.proc(connection, sql, param);
        return data;
    }


    /**
     * ！！！该方法仅限于存储返回没有returnCode时调用
     * @param sql
     * @param bindvars
     * @param sync
     * @returns {string}
     */
    async callProc1(sql, param) {
        var connection = await this.getConn();
        var data = await this.proc1(connection, sql, param);
        return data;
    }

    async getConn() {
        var conn;
        return new Promise(function (resolve,reject) {
            try{
                oraclePool.getConnection(function (err, connection) {
                        conn = connection;
                        if (err) {
                            log.error("OracleOperater connect to DB ERROR!" + err.message);
                        }
                        resolve(conn)
                    });
            } catch (err) {
                log.error("OracleOperater connect to DB ERROR!" + err.message);
                resolve(conn);
            }

        })
    }

    sql(conn, sql) {
        return new Promise(function (resolve,reject) {
            var data = '';
            try {
                conn.execute(sql, function(err, results) {
                    if (err) {
                        log.error("OracleOperater execute sql ERROR"+err.message);
                        data={"returnCode":"PMS-11099","returnMessage":"FAIL"};
                        conn.close();
                        resolve(data);
                    } else {
                        data = JSON.stringify(results.rows);
                        log.info("OracleOperater execute sql="+sql+", result data=", data);
                        conn.close();
                        resolve(data);
                    }
                });
            } catch (err) {
                log.error("OracleOperater execute sql ERROR"+err.message);
                data={"returnCode":"PMS-11099","returnMessage":"FAIL"};
                resolve(data);
            }
        })
    }

    proc(conn, sql, bindvars) {
        return new Promise(function (resolve,reject) {
            var data = '';
            try {
                conn.execute(
                    sql,
                    bindvars,
                    function (err, result) {
                        if (err) {
                            conn.close();
                            data = {"returnCode": "PMS-11099", "returnMessage": "FAIL"};
                            log.error("OracleOperater call procedure ERROR!" + err.message + " SQL=" + sql);
                            resolve(data);
                        } else {
                            data = result.outBinds.o;
                            conn.close();
                            log.info("OracleOperater call procedure=" + sql + ", result data=", data);
                            resolve(data);
                        }
                    });
            } catch (err) {
                log.error("OracleOperater call procedure ERROR"+err.message);
                data={"returnCode":"PMS-11099","returnMessage":"FAIL"};
                resolve(data);
            }
        })
    }

    proc1(conn, sql, bindvars) {
        return new Promise(function (resolve,reject) {
            var data = '';
            try {
                conn.execute(
                    sql,
                    bindvars,
                    function (err, result) {
                        if (err) {
                            conn.close();
                            data = {"returnCode": "PMS-11099", "returnMessage": "FAIL"};
                            log.error("OracleOperater call procedure ERROR!" + err + " SQL=" + sql);
                            resolve(data);
                        } else {
                            data={"returnCode":"PMS-00000","returnMessage":"SUCCESS"};
                            data.result=result.outBinds.o;
                            conn.close();
                            log.info("OracleOperater call procedure=" + sql + ", result data=", data);
                            resolve(data);
                        }
                    });
            } catch (err) {
                log.error("OracleOperater call procedure ERROR"+err.message);
                data={"returnCode":"PMS-11099","returnMessage":"FAIL"};
                resolve(data);
            }
        })
    }
}
module.exports=OracleOperater;
