var log = require("log4js").getLogger('Nofity');

var NofityService = require('../../../service/notify/NotifyService');
var nofityService = new NofityService();

/**
 * 对业务端api接口updateSubmit
 * post
 * @type {{handler: (function(*, *))}}
 */
exports.updateSubmit={
    async handler (req, res) {
        log.info("updateSubmit recive data:", req.body);
        var data = await nofityService.updateSubmit(req.body);
        if(data=="") {
            data = {"retData":[],"code":10001,"msg":"获取数据失败,请重试."};
        }
        log.info("updateSubmit return data:"+data);
        res.send(data);
    }
};

exports.updateBudget={
    async handler (req, res) {
        log.info("updateSubmit recive data:", req.body);
        var data = await nofityService.updateBudget(req.body);
        if(data=="") {
            data = {"retData":[],"code":10001,"msg":"获取数据失败,请重试."};
        }
        log.info("updateSubmit return data:"+data);
        res.send(data);
    }
};
exports.updatePerform={
    async handler (req, res) {
        log.info("updatePerform recive data:", req.body);
        var data = await nofityService.updatePerform(req.body);
        if(data=="") {
            data = {"retData":[],"code":10001,"msg":"获取数据失败,请重试."};
        }
        log.info("updatePerform return data:"+data);
        res.send(data);
    }
};

/**
 * 对业务端api接口getDetail
 * get
 * @type {{handler: (function(*, *))}}
 */
exports.detail = {
    async handler (req, res) {
        log.info("detail recive data:", req.body);
        var data = await nofityService.getDetail(req.body);
        if(data=="") {
            data = {"retData":[],"code":10001,"msg":"获取数据失败,请重试."};
        }
        log.info("detail return data:"+data);
        res.send(data);
    }
};