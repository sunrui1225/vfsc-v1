<script>
import GeneralDetails from "@/views/registry-services/components/GeneralDetails.vue";
import Address from "@/views/registry-services/components/Address.vue";
import Shareholders from "@/views/registry-services/components/Shareholders.vue";
import Filings from "@/views/registry-services/components/Filings.vue";

export default {
  name: 'View-Local-company',
  components: {Address, GeneralDetails, Shareholders, Filings},
  data() {
    return {
      tabMapOptions: [
        { label: 'General Details', key: 'generalDetails' },
        { label: 'Addresses', key: 'addresses' },
        { label: 'Directors', key: 'directors' },
        { label: 'Shares & Shareholders', key: 'shareholders' },
        { label: 'Share Allocations', key: 'shareAllocations' },
        { label: 'Filings', key: 'filings' },
      ],
      activeName: 'generalDetails',
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  computed: {
    currentComponent() {
      const componentMap = {
        generalDetails: 'GeneralDetails',
        addresses: 'Address',
        directors: 'Directors',
        shareholders: 'Shareholders',
        shareAllocations: 'ShareAllocations',
        filings: 'Filings'
      }
      return componentMap[this.activeName] || 'div'
    }
  },
  methods: {

  }
}
</script>

<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <component
              :is="currentComponent"
              :type="activeName"
              v-if="activeName === item.key"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<style scoped lang="scss">

</style>