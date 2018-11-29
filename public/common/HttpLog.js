var log = require('log4js').getLogger('http')

module.exports = function (req, res, next) {
    var msg = "";
    req._startTime = new Date() // 获取时间 t1
    msg = req.connection.remoteAddress+" " ; //ip地址
    msg += req.method+" ";// 请求方式
    msg += req.originalUrl+" ";// 请求url
    msg += req.connection.remotePort+" ";// todo 请求端口
    msg += req.header('user-agent')+" ";//userAgent
    var ok = function () {
        msg +=  "200 ";//状态码
        msg +=  new Date() - req._startTime;// 响应时长
        log.trace(msg);
    }
    var fail = function () {
        msg += "500 ";//状态码
        msg +=  new Date() - req._startTime;// 响应时长
        log.trace(msg);
    }
    res.once('finish', ok);
    res.once('close', fail);

    return next();
};