1.项目目录
├── package-lock.json
├── package.json
├── client  前端开发所属文件夹
│   └── entry.js  前端入口js
│   ├── common  框架公用文件目录（包含css,image,js等）
│        └── index.css  公用css文件
│   ├── compoment  业务公用组件存放目录
│   ├── page  业务页面相关文件目录
│        └── index.js  业务主页
│
├── public  后端开发所属文件夹
│   ├── client  前端文件打包后存放目录
│       ├── images  前端图片打包存放目录
│       ├── js 前端js打包存放目录
│   ├── config  后端配置文件目录
│       └── OracleConfig.js oracle数据库配置文件
│   ├── api  后端api接口目录
│   │  ├── example  api接口示例目录
│           └── Notify.js 示例api接口
│   ├── service  后端业务处理service层代码目录
│   │  ├── example  后端业务处理service示例目录
│           └── ProcesService.js service层代码示例
│   ├── dao  后端数据库处理dao层代码目录
│       └── OracleOperater.js oracle数据库操作示例文件
│   ├── test  后端测试性代码目录
│       └── OracleTest.js oracle数据库操作测试文件
│   ├── view  后端页面目录
│       └── index.ejs 后台服务器挂载前端页面入口
│
├── routes  后端路由文件目录
│   └── index.js  后端路由配置文件（包含自动生成api路由）
└── webpack.config.js  webpack打包配置文件
└── logConf.json  后端日志配置文件

2.项目使用
前端打包命令：npm run client-build
前端服务启动命令：npm run client （访问端口8080,前端为热加载模式，修改后页面直接体现）
后端服务热加载启动命令：npm start（访问端口3000，后端服务会自动挂载前端打包后的页面）
后端服务热加载debug模式启动命令：npm debug（访问端口3000，后端服务会自动挂载前端打包后的页面）

3.后端api接口开发规范（配合自动生成路由）
a>所有需要为前端提供接口的类目录必须为 public/api/版本号/模块名称/*.js
b>所有需要为前端提供接口的方法必须用exports关键字声明
c>接口方法名命名规则为get或post开头，具体按实际需要
d>所有api接口方法内必须定义handler (req, res) {}处理实际业务
e>前端调用时url路径为  /api/版本号/模块名称/方法名
f>示例见/api/v1.0.0/example/Process类

4.注意事项
需要预先安装oracleclient