<script setup>
import { ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ReportView from "@/components/dashboard/ReportView.vue";
import MoneyIcon from "@/components/icons/MoneyIcon.vue";
import ClothIcon from "@/components/icons/ClothIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import DashboardNavItem from "@/components/dashboard/DashboardNavItem.vue";
import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();

const navItems = ref([
    {
        title: "Tổng doanh thu",
        icon: MoneyIcon,
    },
    {
        title: "Tổng sản phẩm đã bán",
        icon: ClothIcon,
    },
    {
        title: "Số người dùng",
        icon: UserIcon,
    },
]);

</script>
<template>
    <Breadcrumb page-title="Dashboard" />
    <div class="flex justify-between gap-14">
        <DashboardNavItem v-for="(item, index) in navItems" :key="index" :index="index" :item="item" />
    </div>
    <div class="mt-8">
        <ReportView />
    </div>
</template>
