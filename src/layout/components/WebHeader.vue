<template>
  <div class="header-bg">
    <div class="header-inner container">
      <div class="col-logo">
        <div v-if="siteData.frontLogo">
          <img :src="siteData.frontLogo" :alt="siteData.siteName" style="height: 40px;">
        </div>
        <div v-else class="site-tt">
          {{ siteData.siteName }}
        </div>
      </div>
      <div class="col-menu">
        <el-menu :router="true" :default-active="activeIndex" mode="horizontal" background-color="#4377fb" text-color="#fff" active-text-color="#FFD550">
          <el-submenu v-if="siteData.props.moduleCourse || siteData.props.moduleExam" index="1">
            <template #title>
              在线学习
            </template>
            <el-menu-item v-if="siteData.props.moduleCourse" class="module-course" index="/web/course">
              课程学习
            </el-menu-item>
            <el-menu-item v-if="siteData.props.moduleExam" class="module-exam" index="/web/repo">
              题库训练
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-if="siteData.props.moduleExam" index="/web/index" class="module-exam">
            在线考试
          </el-menu-item>
          <el-menu-item index="/web/notice">
            系统公告
          </el-menu-item>
          <el-menu-item index="/web/uc">
            用户中心
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-user">
        <el-badge :value="unread" :max="99" :hidden="unread===0">
          <div class="top-avatar" @click="msgClick">
            <img v-if="avatar" :src="avatar"> <img v-else src="@/assets/web/avatar.png">
          </div>
        </el-badge>
        <div>
          {{ realName }}
        </div><a v-if="roleType===2" class="alink" @click="toAdmin">管理</a> <a @click="logout">退出</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {

  data() {
    return {
      activeIndex: '/web/index',
      msgTimer: null,
      unread: 0
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'realName',
      'siteData',
      'roleType',
      'unreadMsg'
    ])
  },
  watch: {
    unreadMsg: {
      handler(val) {
        this.unread = val
      }
    }
  },
  created() {
    this.focusMenu()
    this.fetchMsg()
  },

  methods: {

    // 选定菜单
    focusMenu() {
      const activeMenu = this.$route.meta.activeMenu

      if (activeMenu) {
        this.activeIndex = activeMenu
        return
      }
      const path = this.$route.path.split('/')
      const prefix = path[0] + '/' + path[1] + '/' + path[2]
      console.log(prefix)
      this.activeIndex = prefix
    },

    isActive(url) {
      if (this.activeIndex === url) {
        return 'nav active'
      }
      return 'nav'
    },

    msgClick() {
      // 指定消息
      localStorage.setItem('uc:tab:active', 'msg')
      this.activeIndex = '/web/uc'
      this.$router.push('/web/uc?to=msg')
    },

    async logout() {
      const that = this

      this.$confirm('确实要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        that.$store.dispatch('user/logout').then(() => {
          that.$router.push('/login')
        })
      }).catch(() => {

      })
    },

    toAdmin() {
      // 获取管理首页
      const index = store.getters.index
      this.$router.push({ path: index })
    },

    // 获取消息
    fetchMsg() {
      // 清理
      if (this.msgTimer) {
        clearInterval(this.msgTimer)
      }
      // 30秒读取一次消息
      this.msgTimer = setInterval(() => {
        store.dispatch('user/fetchMsg')
      }, 30000)

      // 立即读取一次
      store.dispatch('user/fetchMsg')
    }
  }
}
</script>
<style scoped>
.header-bg {
  height: 60px;
  background: #4377fb;
  display: flex;
  justify-content: center
}

.header-inner{
  display: flex;
  align-items: center;
}

.right-user {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  line-height: 60px;
  align-items: center;
  max-width: 240px;
}

.site-tt {
  font-weight: 700;
  font-size: 22px;
  color: #eee;
  text-align: left;
}

.right-user a, .right-user div {
  color: #efefef;
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
}

.right-user a:last-child {
  margin-right: 0 !important;
}

.right-user a:hover {
  color: #ffd550;
}

/deep/
.alink {
  color: #FFD550 !important;
}

/deep/
.alink:hover {
  color: #F94E3E !important;
}

.nav {
  color: #fff;
  border: none;
  background: transparent;
  font-weight: 700;
  font-size: 16px;
  padding: 5px 10px 5px 10px;
}

.active {
  color: #000055;
  background: #FFD550;
}

.nav:hover {
  color: #000055;
  background: #FFD550;
}

.col-logo {
  display: flex;
  align-items: center;
  height: 60px;
  max-width: 250px;
}

.col-menu {
  display: flex;
  flex-grow: 1;
  align-items: center;
  text-align: center;
  justify-content: center;
}

/deep/
.top-avatar {
  text-align: right;
  display: flex;
  align-items: center;
  margin-right: 5px !important;
  cursor: pointer;
}

/deep/
.top-avatar div {
  display: flex;
  align-items: center;
  margin-right: -10px !important;
}

/deep/
.top-avatar img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
  font-weight: 700;
  font-size: 16px;
}

::v-deep .el-menu--horizontal > .el-menu-item{
  font-size: 16px;
  font-weight: 700;
}

@media (max-width: 1200px) {
  ::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
    font-weight: 700;
    font-size: 16px;
    padding: 0 5px;
  }

  ::v-deep .el-menu--horizontal > .el-menu-item{
    font-size: 16px;
    font-weight: 700;
    padding: 0 5px;
  }
}

/*::v-deep .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {*/
/*  background-color: transparent;*/
/*}*/

/*::v-deep .el-menu--horizontal .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {*/
/*  outline: none;*/
/*  color: #FFD550;*/
/*}*/

/*::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title:hover {*/
/*  background: transparent;*/
/*  color: #FFD550;*/
/*}*/

</style>
