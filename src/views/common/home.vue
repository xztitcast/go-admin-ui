<template>
  <div class="mod-home">
    <h3>项目介绍</h3>
    <ul>
      <li>基于vue、element-ui构建开发</li>
      <li>前后端分离，通过token进行数据交互，可独立部署</li>
      <li>后端采用shiro进行权限管理,分布式架构可集群部署,减轻高并发压力</li>
      <li>动态菜单，通过菜单管理统一管理访问路由</li>
      <li>数据切换，通过mock配置对接口数据／mock模拟数据进行切换</li>
      <li>发布时，可动态配置CDN静态资源／切换新旧版本</li>  
    </ul>
    <h3>获取帮助</h3>
    <ul>
      <li>如需帮助请在码云看板留言</li>
      <li>关于系统管理模块中404情况,当前架子提供主要的骨架</li>
      <li>具体场景需要根据自己实际业务来实现,根据当前的模板照着写即可</li>
      <li>具体业务需要的组件请参照element-ui官网即可</li>
      <li>element-ui官网: <a href="https://element.eleme.cn/#/zh-CN" target="_blank">https://element.eleme.cn/#/zh-CN</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>

