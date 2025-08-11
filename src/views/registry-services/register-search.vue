<script>
import Pagination from "@/components/Pagination/index.vue";
import waves from "@/directive/waves";
import {fetchList} from "@/api/register_services_api";

const registerTypeOptions = [
  { key: 'companies', display_name: 'Companies' },
  { key: 'charitable_associations', display_name: 'Charitable Associations' },
  { key: 'business_names', display_name: 'Business Names' },
  { key: 'international_companies', display_name: 'International Companies' }
]

const registerTypeKeyValue = registerTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: "register-search",
  components: { Pagination },
  directives: { waves },
  filters: {
    registerTypeFilter(type) {
      return registerTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        companies: undefined,
        registerType: undefined,
      },
      registerTypeOptions,
      rules: {
        companies: [{ required: true, message: 'companies is required', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>

<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.companies" placeholder="Companies" style="width: 200px" class="filter-item" />
      <el-select v-model="listQuery.registerType" placeholder="Register" clearable style="width: 90px;margin-left: 10px" class="filter-item">
        <el-option v-for="item in registerTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" style="margin-left: 10px" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>

    <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
    >

      <el-table-column label="Companies" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companies }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Entity Status" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.entityStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Register Type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.registerType | registerTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Registered Date" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.registeredDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="De Registered Date" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.deRegisteredDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="Actions">
        <template slot-scope="scope">
          <router-link :to="'/registry-services/view-local-company/'+scope.row.id">
            <el-button type="primary" size="small" >
              View
            </el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<style scoped lang="scss">

</style>