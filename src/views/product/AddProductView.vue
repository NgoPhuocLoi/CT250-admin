<script setup>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import AddProductForm from "@/components/product/AddProductForm.vue";
</script>

<template>
  <div class="flex items-center">
    <router-link to="/san-pham" class="w-10 h-10 border p-1 rounded-[5px] mr-3 mb-6">
      <svg class="text-icon" viewBox="0 0 20 20" focusable="false" aria-hidden="true">
        <path
          d="M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z">
        </path>
      </svg>
    </router-link>
    <Breadcrumb class="flex w-full" page-title="Thêm sản phẩm mới" />
  </div>
  <AddProductForm />
</template>
