export interface ExceptionFilePolicyTableColumns {    
    id:number;  // 表id    
    fileName:string;  // 文件名称    
    fileMd5:string;  // 文件特征    
    action:number;  // 状态    
    operator:string;  // 操作员    
    createdAt:string;  // 创建时间    
}


export interface ExceptionFilePolicyInfoData {    
    id:number|undefined;        // 表id    
    fileName:string|undefined; // 文件名称    
    fileMd5:string|undefined; // 文件特征    
    action:number|undefined; // 状态    
    operator:string|undefined; // 操作员    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface ExceptionFilePolicyTableDataState {
    ids:any[];
    tableData: {
        data: Array<ExceptionFilePolicyTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            fileName: string|undefined;            
            fileMd5: string|undefined;            
            action: number|undefined;            
            operator: string|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface ExceptionFilePolicyEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:ExceptionFilePolicyInfoData;
    rules: object;
}