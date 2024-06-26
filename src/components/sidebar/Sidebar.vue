<script setup>
import { useSidebarStore } from "@/stores/sidebar";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import SidebarItem from "./SidebarItem.vue";
import {
  DashBoardIcon,
  GiftIcon,
  OrderIcon,
  ProductCategoryIcon,
  ProductIcon,
  UserIcon,
} from "../icons";
import { useAccountStore } from "@/stores";
import { onMounted } from "vue";

const target = ref(null);
const accountStore = useAccountStore();
const sidebarStore = useSidebarStore();
const isAdmin = ref(false);

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false;
});

onMounted(() => {
  isAdmin.value = accountStore.account.roleId === 1;
});

const menuGroups = ref([
  {
    name: "Quản lý của admin",
    menuItems: [
      {
        icon: DashBoardIcon,
        label: "Dashboard",
        route: "#",
        children: [{ label: "eCommerce", route: "/" }],
      },
      {
        icon: UserIcon,
        label: "Người dùng",
        route: "/nguoi-dung",
      },
    ],
    roleIds: [1],
  },
  {
    name: "Quản lý của nhân viên",
    menuItems: [
      {
        icon: ProductCategoryIcon,
        label: "Danh mục sản phẩm",
        route: "/danh-muc-san-pham",
      },
      {
        icon: ProductIcon,
        label: "Sản phẩm",
        route: "/san-pham",
      },
      {
        icon: OrderIcon,
        label: "Đơn hàng",
        route: "/don-hang",
      },
      {
        icon: GiftIcon,
        label: "Mã giảm giá",
        route: "/ma-giam-gia",
      },
    ],
    roleIds: [1, 2],
  },
]);
</script>

<template>
  <aside
    class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
    :class="{
      'translate-x-0': sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen,
    }"
    ref="target"
  >
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
      <router-link to="/" class="flex w-full">
        <div class="w-[100px] mx-auto">
          <img class="w-full" src="@/assets/shop-logo.png" alt="" />
        </div>
      </router-link>

      <button
        class="block lg:hidden"
        @click="sidebarStore.isSidebarOpen = false"
      >
        <svg
          class="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill=""
          />
        </svg>
      </button>
    </div>
    <!-- SIDEBAR HEADER -->

    <div
      class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear"
    >
      <!-- Sidebar Menu -->
      <nav class="py-4 px-4 lg:px-6">
        <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <div v-if="menuGroup.roleIds.includes(accountStore.account.roleId)">
            <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">
              {{ menuGroup.name }}
            </h3>

            <ul class="mb-6 flex flex-col gap-1.5">
              <div v-for="(menuItem, index) in menuGroup.menuItems">
                <SidebarItem :item="menuItem" :key="index" :index="index" />
              </div>
            </ul>
          </div>
        </template>
      </nav>
      <!-- Sidebar Menu -->
    </div>
  </aside>
</template>
