import React, { Component } from 'react';
import '../index.less';
import Title from "../title/title";
import errPage from "./err.png"

class RecommendGood extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        document.title="错误页面";
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <Title name="页面错误"/>
                <div className={'errImg'}><img src={errPage} /></div>
                <div className={'errMsg'}>
                    您无权查看此页面
                    <p>了解详情，请联系管理员</p>
                </div>
            </div>
        )
    }
}

export default RecommendGood

