/**
 * @author Zhonghao Wu
 * @date 2018/11/8 12:14
 * @Description fetch封装的ajax请求
 * @param
 */

import 'whatwg-fetch'
import set from 'lodash/set'

export async function fetchPost(url, params = {}) {
    let opt = {};
    set(opt, ['headers', 'Content-Type'], 'application/json');
    if (params === '') {
        opt.body = ''
    } else {
        opt.body = JSON.stringify(params)
    }
    opt.mode = 'cors';
    opt.method = 'POST';
    // opt.credentials = 'include';
    let uri = url;
    try {
        const res = await fetch(uri, opt);
        if (res.ok) {
            return res.json();
        } else {
            console.log('HTTP-POST-ERROR:', res);
            return Promise.reject(res);
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export async function fetchGet(url, params = {}) {
    let opt = {};
    set(opt, ['headers', 'Content-Type'], 'application/json');
    opt.mode = 'cors';
    opt.method = 'GET';
    // opt.credentials = 'include';
    let uri = url;
    try {
        const res = await fetch(uri, opt);
        if (res.ok) {
            return res.json();
        } else {
            console.log('HTTP-POST-ERROR:', res);
            return Promise.reject(res);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

window.$ajax = {
    get: fetchGet,
    post: fetchPost
};
