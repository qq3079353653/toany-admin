import { useAccess } from '@vben/access';

import { merge } from 'lodash-es';

/**
 * 设置动作权限
 * @param {object} permission - 权限对象
 * @param {string} permission.permission - 权限名称
 * @param {string} permission.prefix - 权限前缀
 */
export function useCrudPermission({ permission }: any) {
  const { hasAccessByCodes } = useAccess();
  // 直接检查 permission 是否为对象，并获取 prefix
  const prefix =
    permission && typeof permission === 'object'
      ? permission.prefix
      : permission;

  // 根据权限显示按钮
  function hasActionPermission(action: any) {
    if (!prefix) {
      return true;
    }
    return hasAccessByCodes([`${prefix}:${action}`]);
  }

  function buildCrudPermission() {
    if (permission === null) {
      return {};
    }

    // 判断 permission 是否为对象并提取额外配置
    let extra = {};
    if (permission && typeof permission === 'object') {
      extra = permission.extra;
      if (typeof permission.extra === 'function') {
        extra = permission.extra({ hasActionPermission });
      }
    }

    return merge(
      {
        actionbar: {
          buttons: {
            add: { show: hasActionPermission('add') },
          },
        },
        rowHandle: {
          buttons: {
            edit: { show: hasActionPermission('edit') },
            remove: { show: hasActionPermission('remove') },
            // view: { show: hasActionPermission('view') },
          },
        },
        toolbar: {
          buttons: {
            export: {
              show: hasActionPermission('export'),
            },
          },
        },
      },
      extra,
    );
  }

  function _merge(userOptions: any) {
    const permissionOptions = buildCrudPermission();
    merge(permissionOptions, userOptions);
    return permissionOptions;
  }

  return { merge: _merge, buildCrudPermission, hasActionPermission };
}
