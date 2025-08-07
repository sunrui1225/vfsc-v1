<template>

  <div>
    <el-row>

      <el-col :lg="16" :md="10" class="left hidden-sm-and-down">
        <img src="../../assets/web/images/login2.png" style="height: 45vh">
      </el-col>

      <el-col :lg="8" :md="14" class="right">

        <div class="box">

          <el-tabs v-model="activeName">
            <el-tab-pane label="账号登录" name="account">

              <el-form v-if="activeName === 'account'" ref="postForm" :model="postForm" :rules="loginRules" @keyup.enter.native="accountLogin">
                <el-form-item prop="username">
                  <el-input
                    v-model="postForm.username"
                    style="width: 100%"
                    placeholder="账号"
                    prefix-icon="el-icon-user"
                  />
                </el-form-item>

                <el-form-item prop="password">
                  <el-input
                    v-model="postForm.password"
                    style="width: 100%"
                    placeholder="密码"
                    type="password"
                    prefix-icon="el-icon-lock"
                    show-password
                  />
                </el-form-item>

<!--                <el-form-item prop="captchaValue">-->
<!--                  <yf-captcha ref="captcha" v-model="postForm" />-->
<!--                </el-form-item>-->

                <el-form-item>
                  <el-button
                    :loading="loading" type="primary"
                    style="width: 100%"
                    @click="accountLogin"
                  >登录</el-button>
                </el-form-item>

              </el-form>

            </el-tab-pane>
<!--            <el-tab-pane v-if="siteData.props.mobileLogin" label="手机登录" name="mobile">-->

<!--              <el-form v-if="activeName === 'mobile'" ref="postForm" :model="postForm" :rules="loginRules" @keyup.enter.native="mobileLogin">-->
<!--                <el-form-item prop="mobile">-->
<!--                  <el-input-->
<!--                    v-model="postForm.mobile"-->
<!--                    style="width: 100%"-->
<!--                    placeholder="手机号码"-->
<!--                    prefix-icon="el-icon-mobile"-->
<!--                  />-->
<!--                </el-form-item>-->

<!--                <el-form-item prop="smsCode">-->
<!--                  <sms-input ref="sms" v-model="postForm" :type="2" />-->
<!--                </el-form-item>-->

<!--                <el-form-item>-->
<!--                  <el-button-->
<!--                    :loading="loading"-->
<!--                    type="primary"-->
<!--                    style="width: 100%"-->
<!--                    @click="mobileLogin"-->
<!--                  >登录</el-button>-->
<!--                </el-form-item>-->

<!--              </el-form>-->
<!--            </el-tab-pane>-->

          </el-tabs>

<!--          <div style="text-align: right; line-height: 10px">-->
<!--            <el-link v-if="siteData.props.userReg" href="/register">立即注册</el-link>-->
<!--            <el-link v-if="siteData.props.mobileLogin" href="/forgot" style="margin-left: 10px">忘记密码？</el-link>-->
<!--          </div>-->

<!--          <demo-account v-if="isDemo" />-->

<!--          <div v-if="siteData.h5Host || siteData.mpCode" style="line-height: 35px; margin-top: 10px">-->
<!--            <div class="title-line">手机端</div>-->
<!--            <el-button v-if="siteData.h5Host" size="mini" type="primary" plain round @click="showH5Code">H5学员端</el-button>-->
<!--            <el-button v-if="siteData.mpCode" size="mini" type="primary" plain round @click="showMpCode">小程序学员端</el-button>-->
<!--          </div>-->

<!--          <third-login />-->

        </div>

      </el-col>

    </el-row>

    <el-dialog
      :visible.sync="h5Visible"
      width="340px"
      style="text-align: center"
    >
      <div class="code-tips">扫码进入H5学员端</div>
      <div style="width: 300px; border: #ddd 1px solid">
        <vue-qr
          :size="298"
          :logo-src="siteData.backLogo"
          :logo-scale="0.2"
          :text="siteData.h5Host"/>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="mpVisible"
      width="340px"
      style="text-align: center"
    >
      <div class="code-tips">扫码进入小程序学员端</div>
      <img :src="siteData.mpCode" style="width: 300px; border: #ddd 1px solid">
    </el-dialog>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import VueQr from 'vue-qr'
// import ThirdLogin from '@/views/login/components/ThirdLogin.vue'
// import DemoAccount from '@/views/login/components/DemoAccount.vue'

export default {
  // components: { DemoAccount, ThirdLogin, VueQr },
  components: {  VueQr },
  data() {
    return {
      isDemo: this.$isDemo,
      activeName: 'account',
      loading: false,
      h5Visible: false,
      mpVisible: false,
      wxVisible: false,
      postForm: {
        smsCode: '',
        captchaKey: '',
        captchaValue: ''
      },
      loginRules: {
        username: [{ required: true, message: '账号不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
        // captchaValue: [{ required: true, message: '验证码不能为空' }],
        smsCode: [{ required: true, message: '短信验证码不能为空' }],
        mobile: [{ required: true, message: '手机号不能为空' }]
      }
    }
  },

  computed: {
    ...mapGetters([
      'siteData'
    ])
  },


  methods: {

    showH5Code() {
      this.h5Visible = true
    },
    showMpCode() {
      this.mpVisible = true
    },

    async mobileLogin() {
      this.$refs.postForm.validate((valid) => {
        if (!valid) {
          return
        }

        this.loading = true
        this.$store.dispatch('user/mobileLogin', this.postForm)
          .then(() => {
            this.$router.push('/')
          }).catch(err => {
            if (err.message === '10010012') {
              this.$refs.captcha.changeCode()
            }
            console.log('错误信息为：', err)
            this.loading = false
          })
      })
    },

    accountLogin() {
      this.$refs.postForm.validate((valid) => {
        if (!valid) {
          return
        }

        console.info('33333333333333333333')

        this.loading = true
        // this.$store.dispatch('user/login', this.postForm)
        //   .then(() => {
        //     this.$router.push('/')
        //   })
        //   .catch(err => {
        //     if (err.message === '10010012') {
        //       this.$refs.captcha.changeCode()
        //     }
        //     this.loading = false
        //   })

        this.$router.push('/')
        this.loading = false
        console.info('4444444444444444')

      })
    }
  }
}
</script>
