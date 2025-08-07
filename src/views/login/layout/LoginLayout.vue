<template>

  <div class="login-container">

    <div class="top">
      <div v-if="siteData.frontLogo">
        <img :src="siteData.frontLogo">
      </div>
      <div v-else class="site-tt">
        {{ siteData.siteName }}
      </div>
    </div>

    <div class="content">
      <app-main />
    </div>

    <div class="footer">
      <div class="footer-inner">
        <div v-html="siteData.copyRight" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMain from '@/layout/components/AppMain'

export default {
  name: 'LoginLayout',
  components: { AppMain },

  data() {
    return {
      activeIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'siteData'
    ])
  },
  methods: {
    isActive(url) {
      if (this.activeIndex === url) {
        return 'nav active'
      }
      return 'nav'
    }
  }
}
</script>

<style scoped>
@import "../../../styles/login.css";

 ::v-deep
 .app-main {
   min-height: 84vh;
   width: calc(100vw / 24 * 22);
 }

.site-tt {
  font-weight: 700;
  font-size: 22px;
  color: #eee;
  text-align: left;
}

</style>
