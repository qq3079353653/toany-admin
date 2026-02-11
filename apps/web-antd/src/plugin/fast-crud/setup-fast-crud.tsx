import type {
  ColumnCompositionProps,
  PageQuery,
  PageRes,
  UserPageQuery,
} from '@fast-crud/fast-crud';

import type { App } from 'vue';

import { computed } from 'vue';

import { usePreferences } from '@vben-core/preferences';

import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import {
  FastCrud,
  registerMergeColumnPlugin,
  setLogger,
  useTypes,
} from '@fast-crud/fast-crud';
import ui from '@fast-crud/ui-antdv4';
import Antdv, { notification } from 'ant-design-vue';

import { requestClient } from '#/api/request';

import { useCrudPermission } from './setup-fast-crud-permission';

import '@fast-crud/fast-crud/dist/style.css';
import '@fast-crud/ui-antdv4/dist/style.css';
import '@fast-crud/fast-extends/dist/style.css';
import './setup-fast-crud.less';

export function registerFastCrud(app: App, options: any = {}) {
  app.use(Antdv);
  app.use(ui);
  // 设置日志级别
  setLogger({ level: 'error' });
  app.use(FastCrud, {
    i18n: options.i18n,
    logger: { off: { tableColumns: false } },
    async dictRequest({ url }: any) {
      return await requestClient.request(url, {});
    },
    commonOptions(props: any) {
      const { crudExpose } = props;
      const crudBinding = crudExpose?.crudBinding;
      const { isMobile } = usePreferences();

      const opts = {
        settings: {
          plugins: {
            mobile: {
              enabled: true,
              props: {
                isMobile,
              },
            },
          },
        },
        request: {
          transformQuery: ({ page, form, sort }: PageQuery): UserPageQuery => {
            const order = sort
              ? {
                  properties: [sort.prop],
                  direction: sort.asc ? 'ASC' : 'DESC',
                }
              : { direction: 'DESC', properties: ['createdTime'] };
            const pageNumber = page?.currentPage ?? 1;
            const pageSize = page?.pageSize ?? 15;
            return {
              pageNumber,
              pageSize,
              ...form,
              ...order,
            };
          },
          transformRes: ({
            res,
          }: {
            res: BusinessCommon.PaginatingRecord<any>;
          }): PageRes => {
            return {
              currentPage: res.pageNumber ?? 1,
              pageSize: res.pageSize ?? 15,
              total: res.total ?? 0,
              records: res.records ?? [],
            };
          },
        },
        form: {
          display: 'flex',
          wrapper: {
            is: 'a-drawer',
            saveRemind: false,
          },
          async afterSubmit({ mode }: { mode: any }) {
            if (mode === 'add') {
              notification.success({ message: '添加成功' });
            } else if (mode === 'edit') {
              notification.success({ message: '保存成功' });
            }
          },
          wrapperCol: { span: null },
          labelCol: {
            // 固定label宽度
            span: null,
            style: { minWidth: '110px' },
          },
          layout: computed(() => {
            return 'horizontal';
          }),
        },
        search: {
          buttons: {
            search: {
              style: 'marginLeft:-2px',
            },
          },
        },
        actionbar: {
          buttons: {
            add: {
              icon: 'akar-icons:circle-plus',
            },
          },
        },
        toolbar: {
          compact: false,
          buttons: {
            compact: { show: false },
            export: { show: false },
          },
        },
        container: {
          is: 'fs-layout-card',
        },
        table: {
          size: 'small',
          scroll: {
            // 需要设置它，否则滚动条拖动时，表头不会动
            fixed: false,
          },
          pagination: false,
          onResizeColumn: (w: number, col: any) => {
            if (
              crudBinding.value?.table?.columnsMap &&
              crudBinding.value?.table?.columnsMap[col.key]
            ) {
              crudBinding.value.table.columnsMap[col.key].width = w;
            }
          },
        },
        rowHandle: {
          width: 160,
          align: 'center',
          fixed: 'right',
          buttons: {
            view: { order: 1, size: 'small', type: 'link', icon: null },
            edit: { order: 2, size: 'small', type: 'link', icon: null },
            remove: {
              order: 3,
              size: 'small',
              type: 'link',
              icon: null,
              // 重写 render 默认的 confirm 没有 pop-confirm 操作友好
              render(scope: any) {
                function confirm() {
                  const { row, index } = scope;
                  crudExpose.doRemove({ row, index }, { noConfirm: true });
                }

                return (
                  <a-popconfirm
                    cancel-text="取消"
                    ok-text="确认删除"
                    onConfirm={confirm}
                    title={'确定要删除这条记录吗'}
                    v-slots={{
                      icon: () => (
                        <QuestionCircleOutlined style={{ color: 'red' }} />
                      ),
                    }}
                  >
                    <a-button class="ant-btn-sm" danger type="link">
                      删除
                    </a-button>
                  </a-popconfirm>
                );
              },
            },
          },
          dropdown: { more: { type: 'link' } },
        },
        pagination: {
          pageSize: 15,
          pageSizeOptions: ['15', '20', '25', '30'],
        },
      };
      const permission = props.context?.permission || null;
      const crudPermission = useCrudPermission({ permission });
      return crudPermission.merge(opts);
    },
  } as any);

  const { addTypes } = useTypes();

  // 此处演示自定义字段类型
  addTypes({
    IconPicker: {
      // 如果与官方字段类型同名，将会覆盖官方的字段类型
      form: { component: { name: 'IconPicker' } },
      column: { component: { name: 'a-input' } },
    },
  });

  // 默认宽度，支持自动拖动调整列宽
  registerMergeColumnPlugin({
    name: 'resize-column-plugin',
    order: 2,
    handle: (columnProps: ColumnCompositionProps) => {
      if (!columnProps.column) {
        columnProps.column = {};
      }
      if (columnProps.column.resizable === null) {
        columnProps.column.resizable = true;
        if (!columnProps.column.width) {
          columnProps.column.width = 100;
        }
      }
      return columnProps;
    },
  });
}
