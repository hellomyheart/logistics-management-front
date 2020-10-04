import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
},

{
  path: '/documentation',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/documentation/index'),
    name: 'Documentation',
    meta: {
      title: 'Documentation',
      icon: 'documentation',
      affix: true
    }
  }]
},
{
  path: '/guide',
  component: Layout,
  redirect: '/guide/index',
  children: [{
    path: 'index',
    component: () => import('@/views/guide/index'),
    name: 'Guide',
    meta: {
      title: 'Guide',
      icon: 'guide',
      noCache: true
    }
  }]
},
{
  path: '/profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [{
    path: 'index',
    component: () => import('@/views/profile/index'),
    name: 'Profile',
    meta: {
      title: 'Profile',
      icon: 'user',
      noCache: true
    }
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 票据管理
  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/billRelease',
    alwaysShow: true, // will always show the root menu
    name: 'bill',
    meta: {
      title: '票据管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'billRelease',
      component: () => import('@/views/permission/page'),
      name: 'BillRelease',
      meta: {
        title: '票据分发',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  // 货单管理
  {
    path: '/goodsBill',
    component: Layout,
    redirect: '/goodsBill/edit',
    alwaysShow: true, // will always show the root menu
    name: 'goodsBill',
    meta: {
      title: '货单管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'edit',
      component: () => import('@/views/permission/page'),
      name: 'goodsBillEdit',
      meta: {
        title: '填写接货单',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'show',
      component: () => import('@/views/permission/page'),
      name: 'goodsBillShow',
      meta: {
        title: '查询接货单',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 配车管理
  {
    path: '/vehicle',
    component: Layout,
    redirect: '/vehicle/edit',
    alwaysShow: true, // will always show the root menu
    name: 'vehicle',
    meta: {
      title: '配车管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'edit',
      component: () => import('@/views/permission/page'),
      name: 'vehicleEdit',
      meta: {
        title: '填写运输合同',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'show',
      component: () => import('@/views/permission/page'),
      name: 'vehicleShow',
      meta: {
        title: '查询运输合同',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 到货管理
  {
    path: '/getGoods',
    component: Layout,
    redirect: '/getGoods/callback',
    alwaysShow: true, // will always show the root menu
    name: 'vehicle',
    meta: {
      title: '到货管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'callback',
      component: () => import('@/views/permission/page'),
      name: 'getGoodsCallback',
      meta: {
        title: '到货回执',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'verify',
      component: () => import('@/views/permission/page'),
      name: 'getGoodsVerify',
      meta: {
        title: '到货验收',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 中转管理
  {
    path: '/pass',
    component: Layout,
    redirect: '/pass/company',
    alwaysShow: true, // will always show the root menu
    name: 'pass',
    meta: {
      title: '中转管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'company',
      component: () => import('@/views/permission/page'),
      name: 'passCompany',
      meta: {
        title: '中转公司',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'info',
      component: () => import('@/views/permission/page'),
      name: 'passInfo',
      meta: {
        title: '中转信息',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 结算管理
  {
    path: '/clear',
    component: Layout,
    redirect: '/clear/goodsBill',
    alwaysShow: true, // will always show the root menu
    name: 'clear',
    meta: {
      title: '结算管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'goodsBill',
      component: () => import('@/views/permission/page'),
      name: 'cleargoodsBill',
      meta: {
        title: '货运单结算',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'transport',
      component: () => import('@/views/permission/page'),
      name: 'clearTransport',
      meta: {
        title: '运输合同结算',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {

      path: 'wait',
      component: () => import('@/views/permission/page'),
      name: 'clearWait',
      meta: {
        title: '代收款结算',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'extra',
      component: () => import('@/views/permission/page'),
      name: 'clearExtra',
      meta: {
        title: '其他结算',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 客户服务
  {
    path: '/customerService',
    component: Layout,
    redirect: '/customerService/informGet',
    alwaysShow: true, // will always show the root menu
    name: 'customerService',
    meta: {
      title: '客户服务',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'informGet',
      component: () => import('@/views/permission/page'),
      name: 'customerServiceInformGet',
      meta: {
        title: '提货回告',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'arrive',
      component: () => import('@/views/permission/page'),
      name: 'customerServiceArrive',
      meta: {
        title: '到货回告',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {

      path: 'informPass',
      component: () => import('@/views/permission/page'),
      name: 'customerServiceInformPass',
      meta: {
        title: '中转回告',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'informGot',
      component: () => import('@/views/permission/page'),
      name: 'customerServiceInformGot',
      meta: {
        title: '已提回告',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 监控分析
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/goodsBill',
    alwaysShow: true, // will always show the root menu
    name: 'monitor',
    meta: {
      title: '监控分析',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'goodsBill',
      component: () => import('@/views/permission/page'),
      name: 'monitorGoodsBill',
      meta: {
        title: '运单监控',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'statistics',
      component: () => import('@/views/permission/page'),
      name: 'monitorStatistics',
      meta: {
        title: '统计报表',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 成本核算
  {
    path: '/check',
    component: Layout,
    redirect: '/check/income',
    alwaysShow: true, // will always show the root menu
    name: 'check',
    meta: {
      title: '成本核算',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'income',
      component: () => import('@/views/permission/page'),
      name: 'checkIncome',
      meta: {
        title: '收入录入',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'expend',
      component: () => import('@/views/permission/page'),
      name: 'checkExpend',
      meta: {
        title: '支出录入',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'cost',
      component: () => import('@/views/permission/page'),
      name: 'checkCost',
      meta: {
        title: '成本报表',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 应用管理
  {
    path: '/app',
    component: Layout,
    redirect: '/app/customer',
    alwaysShow: true, // will always show the root menu
    name: 'app',
    meta: {
      title: '应用管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'customer',
      component: () => import('@/views/permission/page'),
      name: 'appCustomer',
      meta: {
        title: '客户管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'driver',
      component: () => import('@/views/permission/page'),
      name: 'appDriver',
      meta: {
        title: '司机管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'route',
      component: () => import('@/views/permission/page'),
      name: 'appRoute',
      meta: {
        title: '线路管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {

      path: 'employee',
      component: () => import('@/views/permission/page'),
      name: 'appEmployee',
      meta: {
        title: '职员管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/userGroup',
    alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{

      path: 'userGroup',
      component: () => import('@/views/permission/page'),
      name: 'systemUserGroup',
      meta: {
        title: '用户组设置',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'modifyPassword',
      component: () => import('@/views/permission/page'),
      name: 'systemModifyPassword',
      meta: {
        title: '修改密码',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'PagePermission',
      meta: {
        title: 'Page Permission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'DirectivePermission',
      meta: {
        title: 'Directive Permission'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'role',
      component: () => import('@/views/permission/role'),
      name: 'RolePermission',
      meta: {
        title: 'Role Permission',
        roles: ['admin']
      }
    }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: {
        title: 'Icons',
        icon: 'icon',
        noCache: true
      }
    }]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'create',
      component: () => import('@/views/example/create'),
      name: 'CreateArticle',
      meta: {
        title: 'Create Article',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/example/edit'),
      name: 'EditArticle',
      meta: {
        title: 'Edit Article',
        noCache: true,
        activeMenu: '/example/list'
      },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/example/list'),
      name: 'ArticleList',
      meta: {
        title: 'Article List',
        icon: 'list'
      }
    }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/tab/index'),
      name: 'Tab',
      meta: {
        title: 'Tab',
        icon: 'tab'
      }
    }]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: () => import('@/views/error-page/401'),
      name: 'Page401',
      meta: {
        title: '401',
        noCache: true
      }
    },
    {
      path: '404',
      component: () => import('@/views/error-page/404'),
      name: 'Page404',
      meta: {
        title: '404',
        noCache: true
      }
    }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [{
      path: 'log',
      component: () => import('@/views/error-log/index'),
      name: 'ErrorLog',
      meta: {
        title: 'Error Log',
        icon: 'bug'
      }
    }]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [{
      path: 'export-excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'ExportExcel',
      meta: {
        title: 'Export Excel'
      }
    },
    {
      path: 'export-selected-excel',
      component: () => import('@/views/excel/select-excel'),
      name: 'SelectExcel',
      meta: {
        title: 'Export Selected'
      }
    },
    {
      path: 'export-merge-header',
      component: () => import('@/views/excel/merge-header'),
      name: 'MergeHeader',
      meta: {
        title: 'Merge Header'
      }
    },
    {
      path: 'upload-excel',
      component: () => import('@/views/excel/upload-excel'),
      name: 'UploadExcel',
      meta: {
        title: 'Upload Excel'
      }
    }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: {
      title: 'Zip',
      icon: 'zip'
    },
    children: [{
      path: 'download',
      component: () => import('@/views/zip/index'),
      name: 'ExportZip',
      meta: {
        title: 'Export Zip'
      }
    }]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [{
      path: 'index',
      component: () => import('@/views/pdf/index'),
      name: 'PDF',
      meta: {
        title: 'PDF',
        icon: 'pdf'
      }
    }]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/theme/index'),
      name: 'Theme',
      meta: {
        title: 'Theme',
        icon: 'theme'
      }
    }]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/clipboard/index'),
      name: 'ClipboardDemo',
      meta: {
        title: 'Clipboard',
        icon: 'clipboard'
      }
    }]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://github.com/PanJiaChen/vue-element-admin',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
