<script>
import {companyDetail} from "@/api/register_services_api";

export default {
  name: "Filings",
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
    <H3>Filings</H3>
    <el-descriptions :column="1" class="margin-top" border>
      <el-descriptions-item>
        <template slot="label">
          Submitted Date
        </template>
        {{ detail.submittedDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          Registerer Date
        </template>
        {{ detail.registererDate }}
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