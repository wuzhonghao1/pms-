export default  function iosAndroid() {
    return new Promise(function (resolve,reject) {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            window.sessionStorage.setItem("isAndroid","true");
            resolve()
        }
        if(isiOS){
            window.sessionStorage.setItem("isAndroid","false");
            resolve()
        }
    })
}