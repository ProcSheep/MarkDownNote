# MUI&Ant
- Ant和MUI两个组件库(Ant Design/Material),更加适用于后台管理系统
- ==1.MUI组件库安装==
  - ==**支持emotion或styled-components两种方式,但是对于SSR渲染强烈建议用emotion**==
  - **emotion**: `npm install @mui/material @emotion/react @emotion/styled`
  - **styled-components**: `npm install @mui/material @mui/styled-engine-sc styled-components`
- ==MUI默认支持emotion,所以使用styled-components需要额外的配置==
- 在vite.config.js中添加别名
  ```js
     module.exports = {
        //...
      +  resolve: {
      +    alias: {
      +      '@mui/styled-engine': '@mui/styled-engine-sc'
      +    },
      +  },
      }
  ```
  > 接下来可以使用MUI了
- ==**额外的,官方提供的兼容包@mui/styled-engine-sc可能因为和@mui/material版本不兼容问题导致失效,所以可以下载@mui/system代替**==
- 删除vite.config.js中的别名和卸载掉`@mui/styled-engine-sc`包
- 下载: `npm i npm install @mui/system`
- 完成上述一般可以运行了,如果还不行可以把emotion相关文档也下载下来,反正推荐
- ==2.集成Ant Design== 
- 下载`npm i antd`,直接使用即可,额外的,现在antv5版本需要安装兼容包兼容r19,在v6版本将会适配
- 兼容包下载: `npm install @ant-design/v5-patch-for-react-19 --save`
- 项目入口main.js引入 `import '@ant-design/v5-patch-for-react-19';`
- ==目前下来,可以根据要用的组件库单独引入使用即可,复制文档的引入==
- 可能会用到的包: `npm i antd-style` (关于antd的样式)
- 如果使用图标: `npm install @ant-design/icons@5.x --save`