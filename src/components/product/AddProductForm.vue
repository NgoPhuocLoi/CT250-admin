<script setup>
import { ref, onMounted } from "vue";

import ExpandIcon from "@/components/icons/ExpandIcon.vue";
import Spinner from "@/components/common/Spinner.vue";
import AddProductInfo from "@/components/product/AddProductInfo.vue";
import VariantList from "@/components/product/VariantList.vue";
import AddVariantModal from "@/components/product/AddVariantModal.vue";

const loading = ref(false);

onMounted(async () => {
  try {
    variantStore.setVariants([]);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <Form @submit="handleCreateProduct" :validation-schema="productSchema">
    <!-- product begin -->
    <div
      class="mb-8 p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
      <h5 class="mb-6 text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
        Thông tin sản phẩm
      </h5>
      <AddProductInfo />
    </div>
    <!-- product end -->

    <!-- variant begin -->
    <div
      class="p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
      <h5 class="mb-8 text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
        Thêm variant
      </h5>
      <VariantList />
      <div class="w-[80%] mt-3 flex justify-end">
        <button @click.prevent class="flex gap-2 border px-3 py-2 rounded hover:bg-blue-100"
          data-twe-toggle="modal" data-twe-target="#addVariantModal" data-twe-ripple-init data-twe-ripple-color="light">
          <ExpandIcon />
          Thêm variant
        </button>
      </div>
      <AddVariantModal />
      <!-- variant end -->

      <div
        class="mt-6 flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100">
        <button class="btn-basic px-6 py-2 mx-auto" type="submit">
          <Spinner v-if="loading" class="w-6 h-6" />
          <span v-else>Thêm sản phẩm</span>
        </button>
      </div>
    </div>

  </Form>
</template>
