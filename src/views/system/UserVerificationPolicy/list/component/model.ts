export interface UserVerificationPolicyTableColumns {    
    id:number;  // 表id    
    policyType:number;  // 策略类型    
    createdAt:string;  // 创建时间    
}


export interface UserVerificationPolicyInfoData {    
    id:number|undefined;        // 表id    
    policyType:number|undefined; // 策略类型    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface UserVerificationPolicyTableDataState {
    ids:any[];
    tableData: {
        data: Array<UserVerificationPolicyTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            policyType: number|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface UserVerificationPolicyEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:UserVerificationPolicyInfoData;
    rules: object;
}