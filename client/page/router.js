/**
 * @author Zhonghao Wu
 * @date 2018/11/8 12:17
 * @Description 路由配置
 * @param
 */

import React, { Component } from 'react';
import { Route, Switch, Router,HashRouter} from 'react-router-dom';
import AdvancedPurchasing from "./advancedPurchasing/advancedPurchasing"
import ProjectBudget from "./projectBudget/projectBudget"
import BuyRequisition from "./buyRequisition/buyRequisition"
import PactPurchase from "./pactPurchase/pactPurchase"
import EquipmentChangeA from "./equipmentChangeA/equipmentChangeA"
import EquipmentChangeB from "./equipmentChangeB/equipmentChangeB"
import AppointSupply from "./appointSupply/appointSupply"
import EquipRental from "./equipRental/equipRental"
import Guarantee from "./guarantee/guarantee"
import PaymentAudit from "./paymentAudit/paymentAudit"
import ErrorPage from "./errorPage/errorPage"

class SystemRoute extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <HashRouter>
                <Switch>
                    {/* 提前采购 */}
                    <Route exact path="/notify0" component={AdvancedPurchasing} />
                    {/* 项目采购预算 */}
                    <Route exact path="/notify1" component={ProjectBudget} />
                    {/* 采购合同 */}
                    <Route path="/notify2" component={PactPurchase} />
                    {/* 请购单 */}
                    <Route path="/notify3" component={BuyRequisition} />
                    {/* 更改单A */}
                    <Route path="/notify4" component={EquipmentChangeA} />
                    {/* 更改单B */}
                    <Route path="/notify5" component={EquipmentChangeB} />
                    {/* 推荐供应商 */}
                    <Route path="/notify6" component={AppointSupply} />
                    {/* 设备借用/租用 */}
                    <Route path="/notify8" component={EquipRental} />
                    {/* 保函 */}
                    <Route path="/notify9" component={Guarantee} />
                    {/* 请款管理 */}
                    <Route path="/notify11" component={PaymentAudit} />
                    {/* 错误信息 */}
                    <Route path="/errorPage" component={ErrorPage} />
                </Switch>
            </HashRouter>
        )
    }
}
export default SystemRoute