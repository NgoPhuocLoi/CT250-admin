import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import orderService from "@/services/order";
import accountService from "@/services/account";

const useDashboardStore = defineStore("dashboard", () => {
    const subjectIndex = ref(0);
    const typeOptionIndex = ref(1);
    const typeOptions = ref([
        "Hàng ngày",
        "Hàng tháng",
        "Hàng năm"
    ]);

    const totalSaleOf30Days = ref(0);
    const totalProductOf30Days = ref(0);
    const totalUserOf30Days = ref(0);

    const orders = ref([]);
    const accounts = ref([]);
    const prices = ref([]);
    const quantities = ref([]);

    const currentYear = ref(new Date().getFullYear())
    const endYear = ref(currentYear.value);
    const beginYear = ref(endYear.value - 4);
    const years = ref([]);

    const currentMonthIndex = ref(new Date().getMonth());
    const beginMonthIndex = ref(currentMonthIndex.value);
    const endMonthIndex = ref(currentMonthIndex.value + 5);
    const months = ref([]);

    const currentDate = ref(new Date().toISOString());
    const beginDateIndex = ref(0);
    const endDateIndex = ref(14);
    const dates = ref([]);

    const getYears = () => {
        years.value = Array.from({ length: 5 }, (value, index) => `Năm ${index + currentYear.value - 4}`);
    }

    const getMonths = () => {
        const monthsInPreviousYear = Array.from({ length: 5 }, (value, index) => `Tháng ${index + 8} / ${currentYear.value - 1}`);
        months.value = monthsInPreviousYear.concat(Array.from({ length: 12 }, (value, index) => `Tháng ${index + 1} / ${currentYear.value}`));
    }

    const getDates = () => {
        let endDate = currentDate.value.slice(0, 10);
        let dateMove = new Date(endDate);
        for (let i = 0; i < 15; i++) {
            let strDate = dateMove.toISOString().slice(0, 10);
            dates.value.unshift(strDate);
            dateMove.setDate(dateMove.getDate() - 1);
        };
    };

    const checkDaysEqual = (date1, date2) => {
        return date1.slice(0, 4) == date2.slice(0, 4)
            && date1.slice(5, 7) == date2.slice(5, 7)
            && date1.slice(8, 10) == date2.slice(8, 10);
    }

    const getReportOf30Days = () => {
        let dateArray = [];
        let endDate = currentDate.value.slice(0, 10);
        let dateMove = new Date(endDate);
        for (let i = 0; i < 30; i++) {
            let strDate = dateMove.toISOString().slice(0, 10);
            dateArray.unshift(strDate);
            dateMove.setDate(dateMove.getDate() - 1);
        };

        totalSaleOf30Days.value = dateArray
            .map((date) => orders.value.filter((order) => checkDaysEqual(order.createdAt, date))
                .reduce((prev, current) => prev + current.finalPrice, 0)).reduce((prev1, current1) => prev1 + current1, 0);

        totalProductOf30Days.value = dateArray
            .map((date) => orders.value.filter((order) => checkDaysEqual(order.createdAt, date))
                .reduce((prev, current) => prev + current.OrderDetail.reduce((prev1, current1) => prev1 + current1.quantity, 0), 0)).reduce((prev2, current2) => prev2 + current2, 0);

        totalUserOf30Days.value = dateArray
            .map((date) => accounts.value.filter((account) => checkDaysEqual(account.createdAt, date))
                .reduce((prev, current) => prev + 1, 0)).reduce((prev1, current1) => prev1 + current1, 0);

    };

    const totalPrice = computed(() => {
        switch (typeOptionIndex.value) {
            case 0:
                return prices.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0);;
            case 1:
                return prices.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0);;
            case 2:
                return prices.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0);;
        }
    });

    const totalQuantity = computed(() => {
        switch (typeOptionIndex.value) {
            case 0:
                return quantities.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0);;
            case 1:
                return quantities.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0);;
            case 2:
                return quantities.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0);;
        }
    });

    watch(typeOptionIndex, () => {
        switch (typeOptionIndex.value) {
            case 0:
                getFinalPriceDaily();
                break;
            case 1:
                getFinalPriceMonthly();
                break;
            case 2:
                getFinalPriceYearly();
                break;
        }
    });

    const getFinalPriceDaily = () => {
        prices.value = dates.value
            .map((date) => orders.value.filter((order) => checkDaysEqual(order.createdAt, date))
                .reduce((prev, current) => prev + current.finalPrice, 0));


        quantities.value = dates.value
            .map((date) => orders.value.filter((order) => checkDaysEqual(order.createdAt, date))
                .reduce((prev, current) => prev + current.OrderDetail.reduce((prev1, current1) => prev1 + current1.quantity, 0), 0));
    };

    const getFinalPriceMonthly = () => {

        const monthArray1 = Array.from({ length: 5 }, (value, index) => index + 8);
        prices.value = monthArray1
            .map((month) => orders.value.filter((order) => parseInt(order.createdAt.slice(5, 7)) == month && order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.finalPrice, 0));
        quantities.value = monthArray1
            .map((month) => orders.value.filter((order) => parseInt(order.createdAt.slice(5, 7)) == month && order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.OrderDetail.reduce((prev1, current1) => prev1 + current1.quantity, 0), 0));

        const monthArray = Array.from({ length: 12 }, (value, index) => index + 1);
        prices.value = prices.value.concat(monthArray.map((month) => orders.value.filter((order) => order.createdAt.slice(5, 7) == month && order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.finalPrice, 0)));
        quantities.value = quantities.value.concat(monthArray.map((month) => orders.value.filter((order) => order.createdAt.slice(5, 7) == month && order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.OrderDetail.reduce((prev1, current1) => prev1 + current1.quantity, 0), 0)));
    };

    const getFinalPriceYearly = () => {
        const yearArray = Array.from({ length: 5 }, (value, index) => index + currentYear.value - 4);
        prices.value = yearArray
            .map((year) => orders.value.filter((order) => order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.finalPrice, 0));
        quantities.value = yearArray
            .map((year) => orders.value.filter((order) => order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.OrderDetail.reduce((prev1, current1) => prev1 + current1.quantity, 0), 0));
    };

    const fetchOrders = async () => {
        try {
            const res = await orderService.getAllForReport();
            orders.value = res.metadata;

            const res1 = await accountService.getAllAccounts();
            accounts.value = res1.metadata;

            getYears();
            getMonths();
            getDates();
            getFinalPriceMonthly();
            getReportOf30Days();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        subjectIndex,
        typeOptionIndex,
        typeOptions,
        fetchOrders,
        prices,
        quantities,
        months,
        totalPrice,
        totalQuantity,
        currentMonthIndex,
        beginMonthIndex,
        endMonthIndex,
        years,
        currentYear,
        beginYear,
        endYear,
        dates,
        beginDateIndex,
        endDateIndex,
        totalSaleOf30Days,
        totalProductOf30Days,
        totalUserOf30Days,
    };
});

export default useDashboardStore;
