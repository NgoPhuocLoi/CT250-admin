<script setup>
import ProductTable from "@/components/product//ProductTable.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
</script>
<template>
  <Breadcrumb page-title="Sản phẩm" />
  <div class="flex mb-3">
    <router-link to="/san-pham/them"
      class="ml-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:opacity-95 duration-75">
      Thêm sản phẩm
    </router-link>
  </div>
  <ProductTable />
</template>
