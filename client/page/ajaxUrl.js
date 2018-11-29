function getNginxPathUrl() {
    var nginxPathUrl = window.sessionStorage.getItem("nginxPathUrl");
    if(nginxPathUrl==null) {
        nginxPathUrl = process.env['NGINX_PATH_URL'];
        if(nginxPathUrl==undefined) {
            nginxPathUrl = '';
        }
        window.sessionStorage.setItem("nginxPathUrl",nginxPathUrl);
    }
    return nginxPathUrl;
}

const URL = {
    /* 详情 */
    detail:getNginxPathUrl()+'/api/v1.0.0/pms/notify/detail',
    /* 提前采购（0）*/
    updateSubmit:getNginxPathUrl()+"/api/v1.0.0/pms/notify/updateSubmit",
    /* 项目采购预算（1） 采购合同（2）请款管理（11）*/
    updateBudget:getNginxPathUrl()+"/api/v1.0.0/pms/notify/updateBudget",
    /* 请购单（又称代项目经理采购）（3） 更改单A（4） 更改单A（5） 指定供货（6） 设备借用租用（8） 保函(9)*/
    updatePerform:getNginxPathUrl()+"/api/v1.0.0/pms/notify/updatePerform"
};

export default URL