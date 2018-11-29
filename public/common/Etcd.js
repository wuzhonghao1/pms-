const { Etcd3 } = require('etcd3');
const EtcdConfig = require('../config/EtcdConfig');
var log = require("log4js").getLogger('Etcd');

exports.getSinglePro = async function (prefix) {
    try {
        const client = new Etcd3({ hosts:EtcdConfig.url});
        var allPrefix = EtcdConfig.root;
        if(prefix != undefined && prefix.startsWith('/')) {
            allPrefix += prefix;
        } else if(prefix != undefined  && !prefix.startsWith('/')) {
            allPrefix += '/';
            allPrefix += prefix;
        }
        var data = await client.get(allPrefix);
        client.close();
        log.info('Etcd getSinglePro key='+allPrefix+" value="+data);
        return data;
    } catch (err) {
        log.error('Etcd getSinglePro err! key='+allPrefix+" err="+err);
        return '';
    }
}

exports.getAllPro = async function(prefix) {
    try {
        const client = new Etcd3({ hosts:EtcdConfig.url});
        var allPrefix = EtcdConfig.root;
        if(prefix != undefined && prefix.startsWith('/')) {
            allPrefix += prefix;
        } else if(prefix != undefined  && !prefix.startsWith('/')) {
            allPrefix += '/';
            allPrefix += prefix;
        }
        var data = await client.getAll().prefix(allPrefix);
        client.close();
        log.info('Etcd getAllPro key='+allPrefix+" value="+data);
        return data;
    } catch (err) {
        log.error('Etcd getAllPro err! key='+allPrefix+" err="+err);
        return '';
    }
}