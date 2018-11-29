import React, { Component } from 'react'
import {List} from 'antd-mobile';
import classNames from 'classnames'

class headRender extends Component {
    constructor(props) {
        super(props);
    }
    headerRender=(state)=>{
        if(!state){
            return `${this.props.title}信息`
        }else if(state===0){
            return `${this.props.title}信息`
        }else if(state===1){
            return `${this.props.title}信息(审核已拒绝！)`
        }else if(state===2){
            return `${this.props.title}信息(审核已通过！)`
        }
    };
    render() {
        const listClass = classNames({
            '':!this.props.approvalStatus,
            'head-normal': this.props.approvalStatus && this.props.approvalStatus == 0,
            'head-reject': this.props.approvalStatus && this.props.approvalStatus == 1,
            'head-resolve': this.props.approvalStatus && this.props.approvalStatus == 2
        });
        return (
            <List renderHeader={() => this.headerRender(this.props.approvalStatus)} className={listClass} />
        )
    }


}
export default headRender