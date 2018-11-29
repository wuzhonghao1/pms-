var oraclepool;

//①定义线程池

var getnewpool = function (poolstats){
    oracledb.createPool({
        user: dbconfig.user,
        password: dbconfig.password,
        connectString: dbconfig.connectString
    },function (err,pool) {
        oraclepool = pool;//把创建的线程池转为全局变量
        console.log("connectpool establish!!");
        poolstats(err,null);
    })
}

//检查线程池存在与否

var checkpool = function (cb) {
    if(oraclepool == undefined){
        getnewpool(cb);
    }else{
        console.log("线程池创建过啦");
        cb(null);
    }
}

//连接线程池操作

var getpoolinfo = function(poolstats) {
    oraclepool.getConnection(function(err, connection) {
//这里记得返回一下poolstats
    });
}

//第一次执行sql

async.series([
    checkpool,
    getpoolinfo,
], function (err, result) {
    if(err) console.log(err);
});

//第二次执行(这里为了模拟用户操作同时避免同步造成创建多个线程池)
setTimeout(function () {
    async.series([
        checkpool,
        getpoolinfo
    ], function (err, result) {
        if(err) console.log(err);
        oraclepool.close();
        console.log("线程池已关闭");
    });
},2000);
