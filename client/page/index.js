
import React, { Component } from 'react';
import "./theme.less"
import SystemRoute from './router';
import "../common/httpRequest"
import FastClick from 'fastclick'
import IosAndroid from  "../common/iosAndroid"
IosAndroid();
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
if(!window.Promise) {
    require('es6-promise').polyfill();
    require('es6-promise/auto');
}

class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <SystemRoute />
            </div>
        )
    }
};
export default Index