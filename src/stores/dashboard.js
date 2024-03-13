import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import orderService from "@/services/order";

const useDashboardStore = defineStore("dashboard", () => {
    const typeOptionIndex = ref(1);
    const currentMonthIndex = ref(new Date().getMonth());
    const currentYear = ref(new Date().getFullYear())
    const beginMonthIndex = ref(currentMonthIndex.value);
    const endMonthIndex = ref(currentMonthIndex.value + 5);

    const endYear = ref(currentYear.value);
    const beginYear = ref(endYear.value - 4);

    const orders = ref([]);

    const totalPrice = computed(() => {
        switch (typeOptionIndex.value) {
            case 1:
                return prices.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0);;
            case 2:
                return prices.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0);;
        }
    });

    const typeOptions = ref([
        "Hàng ngày",
        "Hàng tháng",
        "Hàng năm"
    ]);

    const monthsInPreviousYear = Array.from({ length: 5 }, (value, index) => `Tháng ${index + 8} / ${currentYear.value - 1}`);
    const months = monthsInPreviousYear.concat(Array.from({ length: 12 }, (value, index) => `Tháng ${index + 1} / ${currentYear.value}`));

    const years = Array.from({ length: 5 }, (value, index) => `Năm ${index + currentYear.value - 4}`);

    const prices = ref([]);

    watch(typeOptionIndex, () => {
        switch (typeOptionIndex.value) {
            case 1:
                getFinalPriceMonthly();
                break;
            case 2:
                getFinalPriceYearly();
                totalPrice.value = prices.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0);;
                break;

        }
    });

    const getFinalPriceMonthly = () => {

        const monthArray1 = Array.from({ length: 5 }, (value, index) => index + 8);
        prices.value = monthArray1
            .map((month) => orders.value.filter((order) => parseInt(order.createdAt.slice(5, 7)) == month && order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.finalPrice, 0));

        const monthArray = Array.from({ length: 12 }, (value, index) => index + 1);
        prices.value = prices.value.concat(monthArray.map((month) => orders.value.filter((order) => order.createdAt.slice(5, 7) == month && order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.finalPrice, 0)));
    };

    const getFinalPriceYearly = () => {
        const yearArray = Array.from({ length: 5 }, (value, index) => index + currentYear.value - 4);
        prices.value = yearArray
            .map((year) => orders.value.filter((order) => order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.finalPrice, 0));
    };

    const fetchOrders = async () => {
        try {
            const res = await orderService.getAllPrice();
            orders.value = res.metadata;
            getFinalPriceMonthly();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        typeOptionIndex,
        typeOptions,
        fetchOrders,
        prices,
        months,
        totalPrice,
        currentMonthIndex,
        beginMonthIndex,
        endMonthIndex,
        years,
        currentYear,
        beginYear,
        endYear,
    };
});

export default useDashboardStore;
