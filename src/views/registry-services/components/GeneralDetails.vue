<script>
import {companyDetail} from "@/api/register_services_api";

export default {
  name: "GeneralDetails",
  props: {
    type: {
      type: String,
    }
  },
  components: {},
  data() {
    return {
      detail: {}
    }
  },

  created() {
    let companyId = this.$route.params.id
    this.fetchData(companyId)
  },
  methods: {

    fetchData(companyId) {
      companyDetail(companyId).then(response => {
        this.detail = response.data
      })
    }
  }
}
</script>

<template>
  <div>
    <h3>Company Info</h3>
    <el-descriptions :column="3" class="margin-top" border>
      <el-descriptions-item>
        <template slot="label">
          Entity Type
        </template>
        {{ detail.entityType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Company Name
        </template>
        {{ detail.companies }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          Entity Status
        </template>
        {{ detail.entityStatus }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Register Type
        </template>
        {{ detail.registerType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Registered Date
        </template>
        {{ detail.registeredDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          De Registered Date
        </template>
        {{ detail.deRegisteredDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Company Id
        </template>
        {{ detail.id }}
      </el-descriptions-item>

    </el-descriptions>
    <H3>Business Activities</H3>
    <el-descriptions :column="3" class="margin-top" border>
      <el-descriptions-item>
        <template slot="label">
          Annual Return Filing Month
        </template>
        {{ detail.annualReturnFilingMonth }}
      </el-descriptions-item>
    </el-descriptions>
  </div>

</template>

<style scoped>

.stat-item{
  line-height: 38px;
  font-size: 14px;
  color: #333;
}

.stat-item span{
  color: #666;
}

/deep/
.el-descriptions-item__label{
  width: calc(100vw / 12)
}

/deep/
.el-descriptions-item__content{
  width: calc(100vw / 4);
}

</style>