import {requestClient} from '#/api/request';

export const tableConfigApi = () => {
  return {
    /**
     * 新增
     *
     * @param tableConfig 实体对象
     */
    addTableConfig: (tableConfig: CodeGenerator.TableConfig) => {
      return requestClient.post<CodeGenerator.TableConfig>(
        '/tableConfig/add',
        tableConfig,
      );
    },

    /**
     * 删除
     *
     * @param id 主键
     */
    deleteTableConfigById: (id: string) => {
      return requestClient.post<boolean>('/tableConfig/delete', {tableConfigId: id});
    },

    /**
     * 批量删除
     *
     * @param ids 主键s
     */
    batchDeleteTableConfigById: (ids: []) => {
      return requestClient.post<boolean>('/tableConfig/batchDelete', {tableConfigIds: ids});
    },

    /**
     * 编辑
     *
     * @param tableConfig 实体对象
     */
    editTableConfig: (tableConfig: CodeGenerator.TableConfig) => {
      return requestClient.post<CodeGenerator.TableConfig>(
        '/tableConfig/edit',
        tableConfig,
      );
    },

    /**
     * 详情
     *
     * @param id 主键
     */
    findDetailTableConfigById: (id: string) => {
      return requestClient.get<CodeGenerator.TableConfig>('/tableConfig/detail', {params: {tableConfigId: id}});
    },

    /**
     * 分页查询
     *
     * @param params 分页、排序、查询参数
     */
    findPageTableConfig: (params: object) => {
      return requestClient.get<BusinessCommon.PaginatingRecord<CodeGenerator.TableConfig>>(
        '/tableConfig/page',
        {params},
      );
    },
  };
};
