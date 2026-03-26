/** 代码生成 */
declare namespace CodeGenerator {
  /** 数据字典 */
  interface TableConfig {
    // 主键
    tableConfigId: string;
    // 表名
    tableName: string;
    // 表前缀
    tablePrefix: string;
    // 包名
    packageName: string;
    // 模块名
    moduleName: string;
    // 描述
    description?: string;
    // 创建人
    createdBy?: string;
    // 数据创建时间
    createdTime?: string;
    // 修改人
    updatedBy?: string;
    // 数据更新时间
    updatedTime?: string;
  }
}
