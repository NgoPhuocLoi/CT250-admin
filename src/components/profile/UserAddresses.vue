<script setup>
import { useWindowSizeStore } from "@/stores";
import Breadcrumb from "../common/Breadcrumb.vue";
import AddressList from "./AddressList.vue";

const breadcrumb = [
  { name: "Tài khoản", slug: "tai-khoan" },
  { name: "Sổ địa chỉ" },
];

const windowSizeStore = useWindowSizeStore();
</script>
<template>
  <Breadcrumb v-if="windowSizeStore.isSmallScreen" :breadcrumb="breadcrumb" />
  <div class="w-full lg:w-3/4 lg:ml-4">
    <div
      class="rounded shadow-md lg:border-[0.5px] border-gray-300 p-3 mb-6 w-full h-full"
    >
      <div
        class="text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-6 lg:mt-3"
      >
        Sổ địa chỉ
      </div>

      <AddressList />
    </div>
  </div>
</template>
