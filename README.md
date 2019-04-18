# 核心后台管理系统


## 环境部署


## 目录简介



	
	  ├── README.md
	  ├── build  # webpack 构建配置目录
	  ├── config  # webpack 构建设置目录
	  ├── dist    # webpack 打包后目录
	  ├── index.html
	  ├── package-lock.json
	  ├── package.json
	  ├── src
	  │   ├── App.vue
	  │   ├── assets
	  │   │   ├── css
	  │   │   │   ├── comm.css  # 公用样式
	  │   │   │   └── reset.css # 重新定义浏览器标签的默认样式
	  │   │   └── logo.ico
	  │   ├── components              # 所有与业务无关的组件
	  │   │   └── base
	  │   │       ├── BaseFooter.vue  # 页脚
	  │   │       ├── BaseHeader.vue  # 头部
	  │   │       ├── BaseLayout.vue  # 整体布局
	  │   │       └── BaseMenu.vue    # 左侧菜单
	  │   ├── config
	  │   │   ├── menu.js             # 路由和菜单的配置
	  │   │   ├── rule.js             # 表单校验的配置
	  │   │   └── validator.js        # 表单校验自定义校验器
	  │   ├── directives              # 自定义指令目录
	  │   │   ├── has.js
	  │   │   └── index.js
	  │   ├── filters                 # 自定义过滤器目录
	  │   │   └── index.js
	  │   ├── main.js                 # main.js
	  │   ├── mixin                   # 为每个组件中注入固定的元素
	  │   │   └── source.js
	  │   ├── pages                   # 所有的业务有关的组件
	  │   │   ├── comm                # 通用页面
	  │   │   │   ├── PageDefault.vue
	  │   │   │   └── PageLogin.vue
	  │   │   ├── index.js
	  │   │   └── test                # 每个模块一个文件夹
	  │   │       ├── TestSetting.vue
	  │   │       ├── TestUser.vue
	  │   │       └── TestUserEdit.vue
	  │   ├── router                  # 前端路由
	  │   │   └── index.js
	  │   └── tools                   # 工具箱
	  │       └── http.js
	  └── static
	

### 代码规范
- 开启 `Eslint` 插件
- 每个基础组件都应该以 `Base` 开头
- 每个业务页面组件都应该以 `Page` 开头