/**
 * @author Xuhao Zhu
 * @date 2018/11/12 10:42
 * @Description 合同申请（2）
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
        name:'请款'
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