/**
 * @author Zhonghao Wu
 * @date 2018/11/12 10:44
 * @Description 项目正式预算（变更）（1）
 * @param
 */
import React, { Component } from 'react';
import {WhiteSpace } from 'antd-mobile';

import BasicInputExampleWrapper from "./form";
import '../index.less';
import Title from "../title/title";

class RecommendGood extends Component {
    constructor(props) {
        super(props);
    }
    state={
        isAndroid:"",
        name:'项目正式预算'
    };
    async componentDidMount() {
        document.title = this.state.name;

    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <Title name={this.state.name}/>
                <BasicInputExampleWrapper {...this.props} title={this.state.name}/>
                <WhiteSpace size="sm" />
            </div>
        )
    }
}

export default RecommendGood