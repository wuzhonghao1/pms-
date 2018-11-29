/**
 * @author Zhonghao Wu
 * @date 2018/11/8 12:17
 * @Description 前端入口文件
 * @param
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import 'url-search-params-polyfill';
import Index from './page/index';
import "./common/index.less"
import registerServiceWorker from './common/registerServiceWorker';

ReactDOM.render(<Index />,
    document.getElementById('root')
);


registerServiceWorker();