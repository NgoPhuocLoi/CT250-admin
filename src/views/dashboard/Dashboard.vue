<script setup>
import { ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import SaleReport from "@/components/dashboard/SaleReport.vue";
import MoneyIcon from "@/components/icons/MoneyIcon.vue";
import ClothIcon from "@/components/icons/ClothIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import DashboardNavItem from "@/components/dashboard/DashboardNavItem.vue";

const navItems = ref([
    {
        title: "Tổng doanh thu",
        icon: MoneyIcon,
        value: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(2000000),
    },
    {
        title: "Tổng sản phẩm đã bán",
        icon: ClothIcon,
        value: 124,
    },
    {
        title: "Số người dùng",
        icon: UserIcon,
        value: 54,
    },
]);

const subjectIndex = ref(0);

</script>
<template>
    <Breadcrumb page-title="Dashboard" />
    <div class="flex justify-between gap-14">
        <DashboardNavItem v-for="(item, index) in navItems" :key="index" :item="item" @click="subjectIndex = index" />
    </div>
    <div class="mt-8">
        <SaleReport v-if="subjectIndex == 0" />
    </div>
</template>
