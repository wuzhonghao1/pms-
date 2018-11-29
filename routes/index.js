var express = require('express');
var path = require('path');
var log = require("log4js").getLogger('index');
const glob = require('glob');
const nameSpace = require('../public/config/NameSpaceConfig');
var router = express.Router();

function routeLoad() {
    var files = glob.sync(path.join(__dirname,'../public/api/**/**/*.js'));
    files.forEach(file => {
        const instance = require(file);
        // 生成 URL 路径，去掉 .js 去掉 ../public以及js文件类名
        var strArray = file.split('/');
        let classPath = '/api/'+strArray[strArray.length-3]+'/'+nameSpace.space+'/'+strArray[strArray.length-2];
        // 获取js中所有 exports 的方法
        const methods = Object.keys(instance);

        methods.forEach(method => {
            let urlPath="";
            let handler = instance[method];
            // 判断 Controller 中输出的类型
            switch (typeof handler) {
                case 'object':
                    if(handler.hasOwnProperty('params')) {
                        urlPath = classPath+`/${method}${handler.params.join('/')}`;
                    } else {
                        urlPath = classPath+`/${method}`;
                    }
                    handler = handler.handler;
                    break;
                case 'function':
                    break;
                default:
                    return;
            }
            if(method.startsWith('get')||method.startsWith('GET')) {
                router.get(urlPath, handler);
            } else {
                router.post(urlPath, handler);
            }
            log.info('动态添加路由，url='+urlPath);
        });
    });
}

routeLoad();

router.get('*', function (req, res){
    var filePath = path.resolve(__dirname, '../public/view/index.html');
    res.sendFile(filePath)
})
module.exports = router;
