<template>

  <el-container class="container-bg">

    <el-header style="padding: 0; height: 60px">
      <web-header />
    </el-header>

    <el-main style="padding: 0;">
      <div class="container main-inner">
        <app-main />
      </div>
    </el-main>
    <el-footer v-if="siteData.copyRight" class="footer-copy">
      <div v-html="siteData.copyRight" />
    </el-footer>
  </el-container>

</template>

<script>
import { mapGetters } from 'vuex'
import { AppMain, WebHeader } from './components'

export default {
  name: 'WebLayout',
  components: {
    AppMain,
    WebHeader
  },
  computed: {
    ...mapGetters([
      'siteData'
    ])
  }
}
</script>

<style scoped>

  ::v-deep .app-container{
    padding: 0;
  }

  /*页面背景*/
  .container-bg{
    background: #F7F9FC url("~@/assets/web/bg.png") no-repeat;
  }

  /*内容页面样式*/
  .app-main {
    min-height: calc(100vh - 190px);
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
  }

  ::v-deep .el-pagination{
    text-align: center;
  }

  ::v-deep .el-card__header{
    font-size: 14px;
    font-weight: 700;
  }
  ::v-deep .el-card__body{
    font-size: 14px;
    line-height: 24px;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #ECB507
  }

  ::v-deep .el-tabs__active-bar{
    background-color: #ECB507
  }

  .main-inner {
    margin-top: 20px;
    background: #fff;
    border-radius: 6px;
    padding: 20px;
  }

  ::v-deep a {
    color: #0a84ff;
  }

  ::v-deep a:hover{
    color: #ff0000;
  }

  .footer-copy{
    display:flex;
    align-items:center;
    justify-content: center;
    height: 50px !important;
    color: #A3A8B0;
    font-size: 16px;
    background: #333;
    margin-top: 20px;
  }

</style>

