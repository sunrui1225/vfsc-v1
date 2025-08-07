<template>
  <div class="header-badge" @click="toMsgList">
    <el-badge :value="unread" :max="99" :hidden="unread===0">
      <svg-icon class-name="badge-icon" icon-class="msg" />
    </el-badge>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'TaskMsg',
  data() {
    return {
      msgTimer: null,
      unread: 0
    }
  },
  computed: {
    ...mapGetters([
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
  mounted() {
    this.fetchMsg()
  },
  methods: {
    toMsgList() {
      this.$router.push({ name: 'MyMessage' })
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

<style lang="scss" scoped>
.header-badge {
  font-size: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;

  .badge-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
