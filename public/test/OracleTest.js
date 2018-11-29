var oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
var dbConfig = require('../config/OracleConfig.js');

async function run() {
    let connection;
    try {

        let sql,result;

        connection = oracledb.getConnection(  {
            user          : dbConfig.myMaster.user,
            password      : dbConfig.myMaster.password,
            connectString : dbConfig.myMaster.connectString
        });

        sql = `SELECT * FROM mytab`;

        result = await connection.execute(sql);

        console.log("Query results: ");
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

var OracleOperater = require('../dao/OracleOperater');

async function run111() {
    var count=0;
    var cos = 0;
    while(count<100) {
        count++;
        var start = new Date();
        var executeSql = new OracleOperater();
        var data = await executeSql.executeSql("SELECT * FROM A");
        cos += new Date()-start;
        console.log('   *****   '+ (new Date()-start));
    }
    console.log('avg=' +cos/count);
}
run111();