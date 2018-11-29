const crypto = require('crypto');
/**
 * aes加密
 * @param data
 * @param secretKey
 */
exports.encrypt = function(data, secretKey) {
    var cipher = crypto.createCipher('aes-128-ecb',secretKey);
    return cipher.update(data,'utf8','hex') + cipher.final('hex');
}

/**
 * aes解密
 * @param data
 * @param secretKey
 * @returns {*}
 */
exports.decrypt = function(data, secretKey) {
    var cipher = crypto.createDecipher('aes-128-ecb',secretKey);
    return cipher.update(data,'hex','utf8') + cipher.final('utf8');
}