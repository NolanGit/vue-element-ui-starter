/**
 * 菜单资源，每个菜单资源有一个唯一的名称（name）
 *
 * 用户可以访问的菜单、接口、特殊权限标记等统称为资源
 *
 * 图标：https://fontawesome.com/v4.7.0/icons/
 */

// 页面布局框架
import Layout from '@/views/layout';


// 菜单资源，用于生成路由和左侧菜单树
// 菜单 name 命名方式为 x.x.x，对应 views 文件夹下的文件名，如 name: 'welcome.index' 对应 @views/welcome/index.vue 组件
const menu = [
  {
    name: 'welcome',
    path: '/',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: '首页',
      icon: 'fa fa-yx-home',
    },
    children: [
      {
        name: 'welcome.index',
        path: 'welcome',
        component: () => import('@/views/welcome'),
        meta: {
          title: '首页',
          icon: 'fa fa-yx-home',
        },
      },
    ],
  },
  {
    name: 'test',
    path: '/',
    component: Layout,
    redirect: '/test',
    meta: {
      title: '首页',
      icon: 'fa fa-yx-home',
    },
    children: [
      {
        name: 'test.index',
        path: 'test',
        component: () => import('@/views/test'),
        meta: {
          title: '测试',
          icon: 'fa fa-yx-home',
        },
      },
    ],
  },
];

export default menu;
