// 对外暴露路由配置(常量路由)
export const constantRoute = [
  {
    //登录
    path: '/login',
    name: 'login', //命名路由
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', //菜单需要的标题
      hidden: true //代表路由标题在菜单中是否隐藏 true代表不显示在菜单中
    }
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout', //菜单需要的标题
      hidden: false
    },
    redirect: '/home', //重定向到home页面
    children: [
      {
        path: '/home',
        // name: 'home', //命名路由
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', //菜单需要的标题
          hidden: false,
          icon: 'HomeFilled' //菜单需要的图标
        }
      }
    ]
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen', //命名路由
    meta: {
      title: '数据大屏', //菜单需要的标题
      hidden: false,
      icon: 'DataBoard' //菜单需要的图标
    }
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl', //命名路由
    meta: {
      title: '权限管理', //菜单需要的标题
      hidden: false,
      icon: 'Lock' //菜单需要的图标
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User', //命名路由
        meta: {
          title: '用户管理', //菜单需要的标题
          hidden: false,
          icon: 'User' //菜单需要的图标
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role', //命名路由
        meta: {
          title: '角色管理', //菜单需要的标题
          hidden: false,
          icon: 'UserFilled' //菜单需要的图标
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission', //命名路由
        meta: {
          title: '菜单管理', //菜单需要的标题
          hidden: false,
          icon: 'Menu' //菜单需要的图标
        }
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product', //命名路由
    meta: {
      title: '商品管理', //菜单需要的标题
      hidden: false,
      icon: 'Goods' //菜单需要的图标
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark', //命名路由
        meta: {
          title: '品牌管理', //菜单需要的标题
          hidden: false,
          icon: 'ShoppingCartFull' //菜单需要的图标
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr', //命名路由
        meta: {
          title: '属性管理', //菜单需要的标题
          hidden: false,
          icon: 'ChromeFilled' //菜单需要的图标
        }
      },

      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu', //命名路由
        meta: {
          title: 'SPU管理', //菜单需要的标题
          hidden: false,
          icon: 'Calendar' //菜单需要的图标
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'sku', //命名路由
        meta: {
          title: 'SKU管理', //菜单需要的标题
          hidden: false,
          icon: 'Orange' //菜单需要的图标
        }
      }
    ]
  },
  {
    //404页面路由
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404', //菜单需要的标题
      hidden: true
    }
  },
  {
    //任意路径路由
    path: '/:pathMatch(.*)*', //匹配任意路径
    name: 'Any',
    redirect: '/404',
    meta: {
      title: '任意路由', //菜单需要的标题
      hidden: true
    }
  }
]
