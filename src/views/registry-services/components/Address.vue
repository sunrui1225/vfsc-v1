<script>
import {companyDetail} from "@/api/register_services_api";

export default {
  name: "Address",
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
    <h3>Registered Office Address</h3>
    <el-descriptions :column="1" class="margin-top" border>
      <el-descriptions-item>
        <template slot="label">
          Effective Date
        </template>
        {{ detail.officeEffectiveDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Registered Office Address
        </template>
        {{ detail.registeredOfficeAddress }}
      </el-descriptions-item>
    </el-descriptions>
    <H3>Postal Address</H3>
    <el-descriptions :column="1" class="margin-top" border>
      <el-descriptions-item>
        <template slot="label">
          Effective Date
        </template>
        {{ detail.postalEffectiveDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Postal Address
        </template>
        {{ detail.postalAddress }}
      </el-descriptions-item>
    </el-descriptions>
    <H3>Email Address</H3>
    <el-descriptions :column="1" class="margin-top" border>
      <el-descriptions-item>
        <template slot="label">
          Email
        </template>
        {{ detail.email }}
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