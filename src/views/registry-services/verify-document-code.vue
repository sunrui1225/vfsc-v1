<script>
// import { fetchDetailForUpdate, saveData } from '@/api/course/course'
// import LiveList from '@/views/admin/course/live'
// import DirList from '@/views/admin/course/file/dir'
// import { mapGetters } from 'vuex'
// import moment from 'moment'
// import DateTimePicker from '@/components/DateTimePicker/index.vue'
export default {
  name: 'verify-document-code',

  data() {
    return {
      excludes: [],
      curIndex: 0,
      postForm: {
        documentCode: '',
        companyNumber: '',
      },

      loading: false,
      rules: {
        documentCode: [
          { required: true, message: 'Document Code must be entered.' }
        ],
        companyNumber: [
          { required: true, message: 'Company Number must be entered.' }
        ],
      }
    }
  },



  methods: {



  }
}
</script>

<template>
  <div style="padding-left: 30px;padding-top: 30px">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-position="left" label-width="120px">

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Document Code" prop="title" style="width: 500px;white-space: nowrap;">
            <el-input v-model="postForm.documentCode" size="small" maxlength="26" style="width: 500px;" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Company Number"   style="width: 500px !important;white-space: nowrap;">
            <el-input v-model="postForm.companyNumber" size="small" maxlength="26" style="width: 500px;" />
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin-top: 20px">
        <el-button type="primary" @click="submitForm">Verify</el-button>
        <el-button type="info" @click="onCancel">Cancel</el-button>
      </div>

    </el-form>
  </div>


</template>

<style scoped>
.el-tab-pane{
  padding-left: 10px;
  padding-right: 20px;
}
</style>