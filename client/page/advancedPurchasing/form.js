import React, { Component } from 'react'
import { Toast, List, Button, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import getUrlMsg from "../../common/getUrlmsg";
import URL from "../ajaxUrl"
import HeadRender from "../headRender"
const Item = List.Item;


class BasicInputExample extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        //页面数据
        data:null,
        //人物id
        personId:"",
        //流程单号
        serialNumber:'',
        //流程类型
        processId:'',
        //审批状态
        approvalStatus:""

    };
    //获取url参数方法
    GetRequest() {
        let url = this.props.location.search;
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1).split("&");
            for (let i = 0; i < str.length; i++) {
                theRequest[str[i].split("=")[0]] = decodeURIComponent(str[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    //通过或者不通过操作
    approve = async (type)=>{
        let opinion =  this.props.form.getFieldValue("suggestion");
        if(type === "agree"){
            let response = await window.$ajax.post(URL.updateSubmit,{
                serialNumber:this.state.serialNumber,//url中获取
                processId:this.state.processId,//流程id detail
                processType:"0",//流程类型 detail
                roleId: this.state.data ? this.state.data.ROLE_ID: "",//角色ID detail
                approvalStatus: '2',//定死
                opinion: opinion, //原因
                personId: this.state.personId?this.state.personId:"",//approver --审核人的personId
                addCfo:"yes",//是否添加cfo节点
                profitRate: this.state.data ? this.state.data.PROFIT_RATE:"",//利润率 detail
            });
            if(response.returnCode === "PMS-00000"){
                Toast.success("审批通过！", 1,()=>{kara.closePage()});
            }else{
                Toast.offline('获取数据失败！', 1);
            }
        }else{
            if(opinion){
                let response = await window.$ajax.post(URL.updateSubmit,{
                    serialNumber:this.state.serialNumber,
                    processId:this.state.processId,
                    processType: "0",
                    roleId: this.state.data?this.state.data.ROLE_ID:"",
                    approvalStatus: '1',
                    opinion: opinion, 
                    personId: this.state.personId?this.state.personId:"",
                    addCfo:"no",
                    profitRate:this.state.data?this.state.data.PROFIT_RATE:"",
                });
                if(response.returnCode === "PMS-00000"){
                    Toast.success("审批已拒绝！", 1,()=>{kara.closePage()});
                }else{
                    Toast.offline('获取数据失败！', 1);
                }
            }else{
                Toast.fail("请填写审批意见！",1);
            }
        }
    };
    //页面初始化
    async componentDidMount() {
        Toast.loading("",0);
        // 单点登录集成获取token和用户Id
        await getUrlMsg();
        let token = window.sessionStorage.getItem("token");
        let id = window.sessionStorage.getItem("personId");
        //  获取url的参数
        const Request = this.GetRequest();
        const serialNumber = Request['serialNumber'];
        const processId = Request['processId'];
        // 存储数据
        await this.setState({
            serialNumber:serialNumber,
            processId:processId,
            personId:id
        });
        // 页面数据调取
        let response = await window.$ajax.post(URL.detail,{
            serialNumber:serialNumber,//url中获取
            personId:id,//单点登录集成获取
            processId:processId,//url中获取
            token:token
        });
        if(response.returnCode === "PMS-00000"){
            await this.setState({
                data:response.data[0],
                approvalStatus:response.data ? response.data[0].APPROVAL_STATUS : "",
            });
            Toast.hide();
        }else{
            console.log("获取数据失败！");
            Toast.hide();
        }

    };

    render() {
        const { getFieldProps} = this.props.form;
        return (
            <div>
                <HeadRender
                    approvalStatus = {this.state.approvalStatus}
                    title = {this.props.title}
                />
                <List>
                    <Item wrap={true} extra={this.state.data ? this.state.data.LAST_NAME : null}>申请人</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.SERIAL_NUMBER : null}>编号</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.PROJECT_CODE : null}>项目代码</Item>
                    <Item wrap={true} align={"top"} extra={this.state.data ? this.state.data.PROJECT_NAME : null}>项目名称</Item>
                    <Item wrap={true} align={"top"} extra={this.state.data ? this.state.data.ORDER_REASON : null}>提前采购原因</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.DISCOUNT_PRICE : null}>销售合同预计金额</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.SIGN_TIME : null}>预计签约时间</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.ORDER_ALL_COST : null}>预计采购总成本</Item>
                    <Item wrap={true} extra={this.state.data ? (this.state.data.PROFIT_RATE.toString().replace("%", "") + "%") : null}>预计项目利润率</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.PAY_TIME : null}>预计付款日期</Item>
                    <Item wrap={true} extra={this.state.data ? this.state.data.STOCK_BALANCE_AFTER : null}>库存总量</Item>
                </List>
                {this.state.approvalStatus ===0 ? <div>
                    <List renderHeader={() => '审批信息'} >
                        <TextareaItem
                            {...getFieldProps('suggestion')}
                            placeholder="审批意见 "
                            rows="2"
                            autoHeight
                        />
                    </List>
                    <div className="optionButton">
                        <Button type="default" style={{ display: 'block', width: "45%" }} className={'reject'} onClick={() => this.approve('reject')}>不通过</Button>
                        <Button type="primary" style={{ display: 'block', width: "45%" }} className={'agree'} onClick={() => this.approve('agree')}>通过</Button>
                    </div>
                </div> : ""}

            </div>
        );
    }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper