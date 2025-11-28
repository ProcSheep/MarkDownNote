const contentChildren = [
  {
    path: 'aichat',
    name: 'AIChat',
    component: () => import('../views/Tsmm.vue'),
    children: [
      {
        path: 'conversation',
        name: 'conversation',
        component: () => import('../views/Conversations.vue'),
      },
      {
        path: 'character',
        name: 'character',
        component: () => import('../views/Characters.vue'),
      },
      {
        path: 'groups',
        name: 'groups',
        component: () => import('../views/Groups.vue'),
      },
      {
        path: 'prompt',
        name: 'prompt',
        component: () => import('../components/AIChat/Prompt.vue'),
      },
      {
        path: 'explore',
        name: 'explore',
        component: () => import('../views/Explore.vue'),
      },
      {
        path: 'push',
        name: 'push',
        component: () => import('../components/AIChat/Push.vue'),
      },
      {
        path: 'pushJson',
        name: 'worldInfo',
        component: () => import('../components/AIChat/PushJson.vue'),
      },
      {
        path: 'pushInfo',
        name: 'pushInfo',
        component: () => import('../components/AIChat/PushInfo.vue'),
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('../views/Config.vue'),
      }
    ],
  },
  {
    path: 'paramsdata',
    name: 'API Test Cases',
    component: () => import('../views/ParamsData.vue'),
  },
  {
    path: 'test',
    name: 'API Test Results',
    component: () => import('../views/Test.vue'),
  },
  {
    path: 'tsmm',
    name: 'API Tsmm',
    component: () => import('../views/Tsmm.vue'),
    children: [
      {
        path: 'service',
        name: 'Using Service',
        component: () => import('../components/Tsmm/UsingService.vue'),
      },
      {
        path: 'tools',
        name: 'Test Service',
        component: () => import('../components/Tsmm/ExecutionTool.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../components/Tsmm/OrderData.vue'),
      },
      {
        path: 'link',
        name: 'Using Link',
        component: () => import('../components/Tsmm/TestLink.vue'),
      },
      {
        path: 'AvailableServices',
        name: 'AvailableServices',
        component: () => import('../components/Tsmm/AvailableServices.vue'),
      },
    ],
  },

  {
    path: 'repost',
    name: 'Modify Repost Data',
    component: () => import('../views/RepostData.vue'),
    children: [
      {
        path: 'creator',
        name: 'Creator Data',
        component: () => import('../components/Repost/Creator.vue'),
      },
      {
        path: 'media',
        name: 'Media Data',
        component: () => import('../components/Repost/Media.vue'),
      },
    ],
  },

  {
    path: 'smmevent',
    name: 'Smm Events Data',
    component: () => import('../views/SmmEvents.vue'),
  },

  {
    path: 'mongoservice',
    name: 'Mongo Service Data',
    component: () => import('../views/MongoService.vue'),
  },
  {
    path: 'service',
    name: 'API Test Service',
    component: () => import('../views/TestService.vue'),
    children: [
      {
        path: 'alldata',
        name: 'All Service',
        component: () => import('../components/Test/ServiceData.vue'),
      },
      {
        path: 'refresh',
        name: 'Reresh Order',
        component: () => import('../components/Test/RefreshId.vue'),
      },
    ],
  },
  {
    path: 'orders',
    name: 'API Test Orders',
    component: () => import('../views/SelectOrders.vue'),
    children: [
      {
        path: 'monitor',
        name: 'Monitor Orders',
        component: () => import('../components/Test/MonitorOrders.vue'),
      },
      {
        path: 'follow',
        name: 'Orders Followers',
        component: () => import('../components/Test/UserFollow.vue'),
      },
      {
        path: 'select',
        name: 'Select Orders',
        component: () => import('../components/Test/SelectOrders.vue'),
      },
      {
        path: 'check',
        name: 'Check Orders',
        component: () => import('../components/Test/CheckOrder.vue'),
      }
    ],
  },
  {
    path: 'getappdata',
    name: 'App Data',
    component: () => import('../views/AppData.vue'),
  },
]
const jsonRoutesData = [
  {
    "name": "AIChat",
    "path": "/content/aichat",
    "icon": "el-icon-s-order",
    "children": [
      {
        "path": "/content/aichat/conversation",
        "name": "conversation",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/character",
        "name": "character",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/groups",
        "name": "groups",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/prompt",
        "name": "prompt",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/explore",
        "name": "explore",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/push",
        "name": "push",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/pushJson",
        "name": "worldInfo",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/pushInfo",
        "name": "pushInfo",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/aichat/config",
        "name": "config",
        "icon": "el-icon-tickets"
      }
    ]
  },
  {
    "name": "API Test Cases",
    "path": "/content/paramsdata",
    "icon": "el-icon-menu"
  },
  {
    "name": "API Test Results",
    "path": "/content/test",
    "icon": "el-icon-s-comment"
  },
  {
    "name": "API Tsmm",
    "path": "/content/tsmm",
    "icon": "el-icon-s-order",
    "children": [
      {
        "path": "/content/tsmm/orders",
        "name": "Orders",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/tsmm/AvailableServices",
        "name": "AvailableServices",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/tsmm/service",
        "name": "Using Service",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/tsmm/tools",
        "name": "Test Service",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/tsmm/link",
        "name": "Using Link",
        "icon": "el-icon-tickets"
      }
    ]
  },
  {
    "name": "Modify Repost Data",
    "icon": "el-icon-s-claim",
    "children": [
      {
        "path": "/content/repost/creator",
        "name": "Creator Data",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/repost/media",
        "name": "Media Data",
        "icon": "el-icon-edit-outline"
      }
    ]
  },
  {
    "name": "Smm Events Data",
    "path": "/content/smmevent",
    "icon": "el-icon-s-order"
  },
  {
    "name": "Mongo Service Data",
    "path": "/content/mongoservice",
    "icon": "el-icon-s-order"
  },
  {
    "name": "API Test Service",
    "icon": "el-icon-s-tools",
    "children": [
      {
        "path": "/content/service/alldata",
        "name": "All Service",
        "icon": "el-icon-tickets"
      },
      {
        "path": "/content/service/refresh",
        "name": "Reresh Order",
        "icon": "el-icon-edit-outline"
      }
    ]
  },
  {
    "name": "API Test Orders",
    "icon": "el-icon-s-order",
    "children": [
      {
        "path": "/content/orders/monitor",
        "name": "Monitor Orders",
        "icon": "el-icon-timer"
      },
      {
        "path": "/content/orders/follow",
        "name": "Orders Followers",
        "icon": "el-icon-user"
      },
      {
        "path": "/content/orders/select",
        "name": "Select Orders",
        "icon": "el-icon-search"
      },
      {
        "path": "/content/orders/check",
        "name": "Check Orders",
        "icon": "el-icon-document-checked"
      }
    ]
  },
  {
    "name": "App Data",
    "path": "/content/getappdata",
    "icon": "el-icon-s-grid"
  }
]


/**
 * 筛选路由数组，只保留在 JSON 路由配置中存在的路由（按 name 匹配）
 * 保留路由所有原始字段（component、meta、children 等），仅过滤路由是否存在
 * @param {Array} jsRoutes - JS文件中的路由数组（contentChildren）
 * @param {Array} jsonRoutes - JSON文件中的路由数组
 * @returns {Array} 筛选后的新路由数组（保留所有原始字段）
 */
function filterRoutesByJson(jsRoutes, jsonRoutes) {
  // 1. 递归收集JSON中所有路由的name（包括所有层级子路由）
  const collectJsonNames = (routes) => {
    const nameSet = new Set();
    const traverse = (routeList) => {
      routeList.forEach(route => {
        // 确保JSON路由有name字段才收集（容错处理）
        if (route.name) {
          nameSet.add(route.name);
        }
        // 递归处理子路由
        if (route.children && route.children.length) {
          traverse(route.children);
        }
      });
    };
    traverse(routes);
    return nameSet;
  };

  // 获取JSON中所有有效name的集合（查询高效）
  const jsonValidNames = collectJsonNames(jsonRoutes);

  // 2. 递归筛选JS路由：保留name在JSON中存在的路由，且保留所有原始字段
  const filterValidRoutes = (routes) => {
    return routes
      .filter(route => {
        // 只保留：JS路由有name，且该name在JSON中存在
        return route.name && jsonValidNames.has(route.name);
      })
      .map(route => {
        // 深拷贝路由对象（避免修改原数组），递归处理子路由
        const newRoute = { ...route }; // 保留所有原始字段（component、meta等）
        if (newRoute.children && newRoute.children.length) {
          // 子路由同样需要筛选，且保留所有字段
          newRoute.children = filterValidRoutes(newRoute.children);
        }
        return newRoute;
      });
  };

  // 执行筛选并返回新数组（原数组完全不变）
  return filterValidRoutes(jsRoutes);
}

/**
 * 步骤2：将筛选后的路由，添加为 Content 路由的子路由
 * @param {Router} router - Vue Router 实例（如 import router from './router'）
 * @param {Array} filteredRoutes - 筛选后的JS路由数组
 */
function addFilteredRoutesToContent(router, filteredRoutes) {
  // 1. 找到已存在的 Content 路由（通过 name 匹配）
  const contentRoute = router.getRoutes().find(route => route.name === "Content");

  if (!contentRoute) {
    console.error("未找到 name 为 Content 的路由，请先确保该路由已添加！");
    return;
  }

  // 2. 循环添加筛选后的路由作为 Content 的子路由
  filteredRoutes.forEach(childRoute => {
    // 关键：addRoute 的第一个参数传父路由 name，表示添加为子路由
    router.addRoute("Content", childRoute);

    // 可选：打印添加日志（验证是否成功）
    console.log(`已添加子路由：${contentRoute.path}/${childRoute.path}（name: ${childRoute.name}）`);
  });

  // 可选：验证所有子路由是否添加成功（打印 Content 路由的完整结构）
  const updatedContentRoute = router.getRoutes().find(route => route.name === "Content");
  console.log("Content 路由的所有子路由：", updatedContentRoute.children);
}

/**
 * 步骤3：使用示例（完整流程）
 */
// 假设你已有的变量：
// import router from './router'  // Vue Router 实例
// import { contentChildren } from './你的路由文件'  // JS原始路由数组
// import jsonRoutesData from './routes.json'  // JSON路由数据

// 1. 执行筛选
const filteredRoutes = filterRoutesByJson(contentChildren, jsonRoutesData);

// 2. 将筛选后的路由添加为 Content 的子路由
addFilteredRoutesToContent(router, filteredRoutes);

/**
  {
    path: 'home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: 'data',
    name: 'data',
    component: () => import('../views/Data.vue'),
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('../views/Users.vue'),
    meta: {
      requiresAdmin: true,
      permission: [],
    },
  },
  {
    path: 'cronjob',
    name: 'cronjob',
    component: () => import('../views/CronJob.vue'),
  },
 */