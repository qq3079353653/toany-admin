import type {
  AddReq,
  CreateCrudOptionsRet,
  DelReq,
  EditReq,
  UserPageQuery,
} from '@fast-crud/fast-crud';
import {tableConfigApi} from '#/api';

export default function createCrudOptions(): CreateCrudOptionsRet {
  const addRequest = async (req: AddReq<CodeGenerator.TableConfig>) => {
    const {form} = req as { form: CodeGenerator.TableConfig };
    return await tableConfigApi().addTableConfig({...form});
  };

  const delRequest = async (ctx: DelReq<CodeGenerator.TableConfig>) => {
    const {row} = ctx as { row: CodeGenerator.TableConfig };
    return await tableConfigApi().deleteTableConfigById(row.tableConfigId);
  };

  const infoRequest = async ({mode, row,}: { mode: string; row: CodeGenerator.TableConfig; }) => {
    if (mode === 'edit') {
      return await tableConfigApi().findDetailTableConfigById(row.tableConfigId);
    }
    return row;
  };

  const pageRequest = async (query: UserPageQuery) => {
    return await tableConfigApi().findPageTableConfig(query);
  };

  const editRequest = async (ctx: EditReq<CodeGenerator.TableConfig>) => {
    const {form} = ctx as { form: CodeGenerator.TableConfig };
    return await tableConfigApi().editTableConfig({...form});
  };

  return {
    crudOptions: {
      container: {
        is: 'fs-layout-card',
      },
      request: {
        addRequest,
        delRequest,
        infoRequest,
        pageRequest,
        editRequest,
      },
      form: {
        labelWidth: '100px',
        wrapper: {
          width: '520px',
        },
      },
      columns: {
        _index: {
          title: '序号',
          form: {show: false},
          column: {
            columnSetShow: false,
            align: 'center',
            width: '55px',
            formatter: (context) => {
              return (context.index ?? 0) + 1;
            },
          },
        },
        tableConfigId: {
          column: {
            show: false,
            columnSetShow: false,
          },
          form: {show: false},
        },
        tableName: {
          title: '表名',
          type: 'text',
          search: {show: true},
          column: {
            align: 'center',
          },
          form: {
            col: {span: 24},
            rules: [
              {required: true, trigger: 'change', message: '请输入表名'},
            ],
          },
        },
        tablePrefix: {
          title: '表前缀',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: {span: 24},
            rules: [
              {required: true, trigger: 'change', message: '请输入表前缀'},
            ],
          },
        },
        packageName: {
          title: '包名',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: {span: 24},
            rules: [
              {required: true, trigger: 'change', message: '请输入包名'},
            ],
          },
        },
        moduleName: {
          title: '模块名',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {
            col: {span: 24},
            rules: [
              {required: true, trigger: 'change', message: '请输入模块名'},
            ],
          },
        },
        description: {
          title: '描述',
          type: 'textarea',
          column: {
            align: 'center',
          },
          form: {
            col: {span: 24},
          },
        },
        createdTime: {
          title: '创建时间',
          type: 'text',
          column: {
            align: 'center',
          },
          form: {show: false},
        },
      },
    },
  };
}
