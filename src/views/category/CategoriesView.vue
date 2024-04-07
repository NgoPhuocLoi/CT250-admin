<script setup>
// import CategoryTable from "@/components/category/CategoryTable.vue";
import CategoryTable from "@/components/category/CategoryTable.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
</script>
<template>
  <Breadcrumb page-title="Danh mục sản phẩm" />
  <div class="flex mb-3">
    <router-link
      to="/danh-muc-san-pham/them"
      class="ml-auto py-2 px-4 bg-blue-500 text-white rounded-md hover:opacity-95 duration-75"
    >
      Thêm danh mục
    </router-link>
  </div>
  <CategoryTable />
</template>
