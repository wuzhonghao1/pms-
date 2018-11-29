var GATEWAY_URL = "https://xin-sandbox.asiainfo.com:16020";
export default function getUserMsg() {
    return new Promise(function (resolve, reject) {
        if (window.location.hash && window.location.hash.indexOf('access_token=') > -1) {
            window.sessionStorage.setItem('token', `Bearer ${window.location.hash.split('access_token=')[1].split('&')[0]}`);
        } else if(window.kara) {//ios
            getToken().then(result=>{
                var accountId = loader(result.token);
                return accountId
            }).then(accountId=> {
                var token = window.sessionStorage.getItem('token');
                perId(token, accountId);
                resolve()
            });
        } else {//安卓
            document.addEventListener('JSSDKReady',function(){
                getToken().then(result=>{
                    var accountId = loader(result.token);
                    return accountId
                }).then(accountId=> {
                    var token = window.sessionStorage.getItem('token');
                    perId(token, accountId);
                    resolve()
                });
            }, false);
        }
    })

}
function getToken() {
    return new Promise(function(resolve,reject) {
        window.kara.getToken({
            async: false,
            success: function (result) {
                sessionStorage.token = result.token;
                window.sessionStorage.setItem('token',result.token);
                resolve(result)
            }
        })//内置的ajax请求
    })

}
function  loader(token) {
    var xhr = new XMLHttpRequest();
    xhr.open(
        'GET',
        GATEWAY_URL + '/api/v1.0.0/account/getCurrentAccount',
        false
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
    var resJSon = JSON.parse(xhr.responseText);
    if (resJSon.resultCode === '000000') {
        // 打印用户信息
        var resJson = resJSon.data.accountId;
        return resJson
    } else {
        // 打印错误消息
        alert("resJSon" + resJSon.resultMessage)
    }
}
function  perId(token,accountId){
    var xhr = new XMLHttpRequest();
    xhr.open(
        'GET',
        GATEWAY_URL + '/api/v1.0.0/sdm/getAccountInfo/'+accountId,
        false
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
    var resJSon = JSON.parse(xhr.responseText);
    if (resJSon.resultCode === '000000') {
        // 打印用户信息
        var resJson = resJSon.accountInfo.personId;
        window.sessionStorage.setItem("personId",resJson)
    } else {
        // 打印错误消息
        alert("resJSon" + resJSon.resultMessage)
    }
}


