var OracleOperater = require('../../dao/OracleOperater');
var oracledb = require('oracledb');
var op = new OracleOperater();
class ProcessService {
    // 提前采购（0）
    async updateSubmit(reqParam) {

        var sql = "BEGIN PMS_advance_Order.proc_pms_advanceOrder_audit(:serialNumber,:processId,:processType,:roleId,:approvalStatus,:opinion,:personId,:addCfo,:profitRate,:o); END;";
        var param = {
            serialNumber: reqParam.serialNumber,//申请单流水号
            processId: reqParam.processId,//审核流程表id
            processType: reqParam.processType,//流程类型
            roleId: reqParam.roleId,//审核角色
            approvalStatus: reqParam.approvalStatus,//审核状态
            opinion: reqParam.opinion,//审核意见
            personId: reqParam.personId,//审核人
            addCfo:reqParam.addCfo,//是否添加cfo节点
            profitRate:reqParam.profitRate,//利润率
            o:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
        };
        var data = await op.callProc1(sql, param);
        return data;
    }
    // 项目采购预算（1）
    // 采购合同（2）
    //请款管理（11）
    async updateBudget(reqParam) {
        var sql = "BEGIN pms_audit_common.proc_pms_submit_audit(:serialNumber,:processType,:roleId,:approvalStatus,:opinion,:personId,:processId,:o); END;";
        var param = {
            serialNumber: reqParam.serialNumber,//申请单流水号
            processType: reqParam.processType,//流程类型
            roleId: reqParam.roleId,//审核角色
            approvalStatus: reqParam.approvalStatus,//审核状态
            opinion: reqParam.opinion,//审核意见
            personId: reqParam.personId,//审核人
            processId: reqParam.processId,//审核流程表id
            o:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
        };
        var data = await op.callProc1(sql, param);
        return data;
    }
    // 请购单（又称代项目经理采购）（3）
    // 更改单A（4）
    // 更改单A（5）
    // 指定供货（6）
    // 设备借用租用（8）
    async updatePerform(reqParam) {
        var sql = "BEGIN PMS_AUDIT_COMMON.proc_pms_perform_audit(:serialNumber,:processType,:processId,:approvalStatus,:opinion,:personId,:isMarkApproval,:isBgApproval,:o); END;";
        var param = {
            serialNumber: reqParam.serialNumber,
            processType: reqParam.processType,
            processId: reqParam.processId,
            approvalStatus: reqParam.approvalStatus,
            opinion: reqParam.opinion,
            personId: reqParam.personId,
            isMarkApproval: reqParam.isMarkApproval,
            isBgApproval: reqParam.isBgApproval,
            o:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
        };
        var data = await op.callProc1(sql, param);
        return data;
    }
    //所有获取详情数据
    async getDetail(reqParam) {
        var sql = "BEGIN pms_audit_detail.getApprovalDetail(:serialNumber,:personId,:processId,:token,:o); END;";
        var param = {
            serialNumber:  reqParam.serialNumber,
            personId:  reqParam.personId,
            processId:  reqParam.processId,
            token: reqParam.token,
            o:  { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 32767}
        };
        var data = await op.callProc(sql, param);
        return data;
    }

}
module.exports=ProcessService;