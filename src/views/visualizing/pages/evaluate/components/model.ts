export interface EvaluationMgrTableColumns {    
    id:number;  // 序号    
    name:string;  // 名称    
    deduction:number;  // 推演任务    
    linkedDeduction?:LinkedEvaluationMgrDeductionMgr; // 推演任务    
    target:number;  // 评估指标    
    linkedTarget?:LinkedEvaluationMgrEvaluationTargetMgr; // 评估指标    
    algorithm:number;  // 评估算法    
    result:string;  // 评估结果    
    status:number;  // 状态    
    note:string;  // 描述    
    operator:string;  // 操作员    
    createdAt:string;  // 创建时间    
    linkedEvaluationMgrDeductionMgr:LinkedEvaluationMgrDeductionMgr;    
    linkedEvaluationMgrEvaluationTargetMgr:LinkedEvaluationMgrEvaluationTargetMgr;    
}


export interface EvaluationMgrInfoData {    
    id:number|undefined;        // 序号    
    name:string|undefined; // 名称    
    deduction:number|undefined; // 推演任务    
    linkedDeduction?:LinkedEvaluationMgrDeductionMgr; // 推演任务    
    target:number|undefined; // 评估指标    
    linkedTarget?:LinkedEvaluationMgrEvaluationTargetMgr; // 评估指标    
    algorithm:number|undefined; // 评估算法    
    result:string|undefined; // 评估结果    
    status:boolean; // 状态    
    note:string|undefined; // 描述    
    operator:string|undefined; // 操作员    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
    linkedEvaluationMgrDeductionMgr?:LinkedEvaluationMgrDeductionMgr;    
    linkedEvaluationMgrEvaluationTargetMgr?:LinkedEvaluationMgrEvaluationTargetMgr;    
}


export interface LinkedEvaluationMgrDeductionMgr {	
    id:number|undefined;    // 序号	
    name:string|undefined;    // 任务名称	
}


export interface LinkedEvaluationMgrEvaluationTargetMgr {	
    id:number|undefined;    // 序号	
    name:string|undefined;    // 指标名称	
}


export interface EvaluationMgrTableDataState {
    ids:any[];
    tableData: {
        data: Array<EvaluationMgrTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            name: string|undefined;            
            deduction: number|undefined;            
            target: number|undefined;            
            algorithm: number|undefined;            
            result: string|undefined;            
            status: number|undefined;            
            note: string|undefined;            
            operator: string|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface EvaluationMgrEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:EvaluationMgrInfoData;
    rules: object;
}