import React, { Component } from 'react'
import {Icon, NavBar} from 'antd-mobile';

class Title extends Component {
    constructor(props) {
        super(props);
    }
    state={
        paddingAdjust:null
    };
    close=()=>{
        if(window.kara) {
            window.kara.closePage()
        }else{
            document.addEventListener('JSSDKReady', function(){
                window.kara.closePage()
            }, false);
        }
    };
    async componentDidMount() {
        let padding = window.sessionStorage.getItem("isAndroid")==='true' ? 0 : 22;
        await this.setState({
            paddingAdjust:padding
        });
    }

    render(){
        return(
            <div style={{ height: (this.state.paddingAdjust + 45 + 'px')}}>
                <NavBar
                    style={{ position: "fixed", width: '100%', top: "0px", zIndex: "10", height: "45px",paddingTop: (this.state.paddingAdjust + 'px') }}
                    mode="light"
                    icon={<Icon type="left" onClick={this.close} />}
                >{this.props.name}</NavBar>
            </div>
        )
    }


}
export default Title

