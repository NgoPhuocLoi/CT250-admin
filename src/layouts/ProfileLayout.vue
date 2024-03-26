<template>
  <div class="text-lg lg:mt-6 xl:container mb-8 lg:mx-10 xl:mx-auto text-black">
    <div>
      <div class="hidden lg:block text-4xl font-bold text-center mb-8">
        TÀI KHOẢN
      </div>
      <div class="lg:flex">
        <LeftSideBar v-if="!(windowSizeStore.isSmallScreen && route.matched.length === 3)" />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import LeftSideBar from "@/components/profile/LeftSideBar.vue";
import { useWindowSizeStore } from "@/stores";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const windowSizeStore = useWindowSizeStore();

onMounted(() => {
  if (windowSizeStore.windowSize.width > 1024 && route.path === "/tai-khoan") {
    router.replace("/tai-khoan/thong-tin-ca-nhan");
  }
});
</script>
<style></style>
