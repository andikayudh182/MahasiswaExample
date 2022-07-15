<template>
  <div>
    <NavbarHome />
    <EmployeeTable>
      
    </EmployeeTable>
  </div>
</template>

<script>
import Vue from "vue";
import NavbarHome from "@/components/NavbarHome.vue";
import EmployeeTable from "@/components/EmployeeTable.vue";


export default Vue.extend({
  components: {
    NavbarHome,
    EmployeeTable,
  },
  name: "HomeView",

  data() {
  
  }
})
</script>
