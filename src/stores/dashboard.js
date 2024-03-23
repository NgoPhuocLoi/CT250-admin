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

    const men = ref([]);
    const women = ref([]);
    const children = ref([]);
    const accounts = ref([]);
    const menPrices = ref([]);
    const womenPrices = ref([]);
    const childrenPrices = ref([]);
    const menQuantities = ref([]);
    const womenQuantities = ref([]);
    const childrenQuantities = ref([]);

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

        // total sale
        let totalSaleOfMen30Days = dateArray
            .map((date) => men.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.variant.product.price, 0)).reduce((prev1, current1) => prev1 + current1, 0);
        let totalSaleOfWomen30Days = dateArray
            .map((date) => women.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.variant.product.price, 0)).reduce((prev1, current1) => prev1 + current1, 0);
        let totalSaleOfChildren30Days = dateArray
            .map((date) => children.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.variant.product.price, 0)).reduce((prev1, current1) => prev1 + current1, 0);

        totalSaleOf30Days.value = totalSaleOfMen30Days + totalSaleOfWomen30Days + totalSaleOfChildren30Days;

        // total product
        let totalProductOfMen30Days = dateArray
            .map((date) => men.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.quantity, 0)).reduce((prev1, current1) => prev1 + current1, 0);
        let totalProductOfWomen30Days = dateArray
            .map((date) => women.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.quantity, 0)).reduce((prev1, current1) => prev1 + current1, 0);
        let totalProductOfChildren30Days = dateArray
            .map((date) => children.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.quantity, 0)).reduce((prev1, current1) => prev1 + current1, 0);

        totalProductOf30Days.value = totalProductOfMen30Days + totalProductOfWomen30Days + totalProductOfChildren30Days;

        totalUserOf30Days.value = dateArray
            .map((date) => accounts.value.filter((account) => checkDaysEqual(account.createdAt, date))
                .reduce((prev, current) => prev + 1, 0)).reduce((prev1, current1) => prev1 + current1, 0);

    };

    const totalPrice = computed(() => {
        switch (typeOptionIndex.value) {
            case 0:
                return menPrices.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + womenPrices.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + childrenPrices.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0);
            case 1:
                return menPrices.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + womenPrices.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + childrenPrices.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0);
            case 2:
                return menPrices.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0)
                    + womenPrices.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0)
                    + childrenPrices.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0);
        }
    });

    const totalQuantity = computed(() => {
        switch (typeOptionIndex.value) {
            case 0:
                return menQuantities.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + womenQuantities.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + childrenQuantities.value.slice(beginDateIndex.value, endDateIndex.value + 1).reduce((prev, current) => prev + current, 0);
            case 1:
                return menQuantities.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + womenQuantities.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0)
                    + childrenQuantities.value.slice(beginMonthIndex.value, endMonthIndex.value + 1).reduce((prev, current) => prev + current, 0);
            case 2:
                return menQuantities.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0)
                    + womenQuantities.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0)
                    + childrenQuantities.value.slice(beginYear.value - currentYear.value + 4, endYear.value - currentYear.value + 5).reduce((prev, current) => prev + current, 0);
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
        // prices
        menPrices.value = dates.value
            .map((date) => men.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        womenPrices.value = dates.value
            .map((date) => women.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        childrenPrices.value = dates.value
            .map((date) => children.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.variant.product.price, 0));

        // quantity
        menQuantities.value = dates.value
            .map((date) => men.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.quantity, 0));
        womenQuantities.value = dates.value
            .map((date) => women.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.quantity, 0));
        childrenQuantities.value = dates.value
            .map((date) => children.value.filter((item) => checkDaysEqual(item.order.createdAt, date))
                .reduce((prev, current) => prev + current.quantity, 0));
    };

    const getFinalPriceMonthly = () => {

        const monthArray1 = Array.from({ length: 5 }, (value, index) => index + 8);
        // price
        menPrices.value = monthArray1
            .map((month) => men.value.filter((item) => parseInt(item.order.createdAt.slice(5, 7)) == month && item.order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        womenPrices.value = monthArray1
            .map((month) => women.value.filter((item) => parseInt(item.order.createdAt.slice(5, 7)) == month && item.order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        childrenPrices.value = monthArray1
            .map((month) => children.value.filter((item) => parseInt(item.order.createdAt.slice(5, 7)) == month && item.order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.variant.product.price, 0));

        // quantity
        menQuantities.value = monthArray1
            .map((month) => men.value.filter((item) => parseInt(item.order.createdAt.slice(5, 7)) == month && item.order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.quantity, 0));
        womenQuantities.value = monthArray1
            .map((month) => women.value.filter((item) => parseInt(item.order.createdAt.slice(5, 7)) == month && item.order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.quantity, 0));
        childrenQuantities.value = monthArray1
            .map((month) => children.value.filter((item) => parseInt(item.order.createdAt.slice(5, 7)) == month && item.order.createdAt.slice(0, 4) == currentYear.value - 1)
                .reduce((prev, current) => prev + current.quantity, 0));

        const monthArray = Array.from({ length: 12 }, (value, index) => index + 1);
        // price
        menPrices.value = menPrices.value.concat(monthArray.map((month) => men.value.filter((item) => item.order.createdAt.slice(5, 7) == month && item.order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.variant.product.price, 0)));
        womenPrices.value = womenPrices.value.concat(monthArray.map((month) => women.value.filter((item) => item.order.createdAt.slice(5, 7) == month && item.order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.variant.product.price, 0)));
        childrenPrices.value = childrenPrices.value.concat(monthArray.map((month) => children.value.filter((item) => item.order.createdAt.slice(5, 7) == month && item.order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.variant.product.price, 0)));
        // quantity
        menQuantities.value = menQuantities.value.concat(monthArray.map((month) => men.value.filter((item) => item.order.createdAt.slice(5, 7) == month && item.order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.quantity, 0)));
        womenQuantities.value = womenQuantities.value.concat(monthArray.map((month) => women.value.filter((item) => item.order.createdAt.slice(5, 7) == month && item.order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.quantity, 0)));
        childrenQuantities.value = childrenQuantities.value.concat(monthArray.map((month) => children.value.filter((item) => item.order.createdAt.slice(5, 7) == month && item.order.createdAt.slice(0, 4) == currentYear.value).reduce((prev, current) => prev + current.quantity, 0)));
    };

    const getFinalPriceYearly = () => {
        const yearArray = Array.from({ length: 5 }, (value, index) => index + currentYear.value - 4);
        // price
        menPrices.value = yearArray
            .map((year) => men.value.filter((item) => item.order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        womenPrices.value = yearArray
            .map((year) => women.value.filter((item) => item.order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        childrenPrices.value = yearArray
            .map((year) => children.value.filter((item) => item.order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.variant.product.price, 0));
        // quantity
        menQuantities.value = yearArray
            .map((year) => men.value.filter((item) => item.order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.quantity, 0));
        womenQuantities.value = yearArray
            .map((year) => women.value.filter((item) => item.order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.quantity, 0));
        childrenQuantities.value = yearArray
            .map((year) => children.value.filter((item) => item.order.createdAt.slice(0, 4) == year)
                .reduce((prev, current) => prev + current.quantity, 0));
    };

    const fetchOrders = async () => {
        try {

            const res1 = await orderService.getMenForReport();
            men.value = res1.metadata;

            const res2 = await orderService.getWomenForReport();
            women.value = res2.metadata;

            const res3 = await orderService.getChildrenForReport();
            children.value = res3.metadata;

            const res4 = await accountService.getAllAccounts();
            accounts.value = res4.metadata;

            getYears();
            getMonths();
            getDates();
            getFinalPriceMonthly();
            getReportOf30Days();
            console.log("fetchOrders");
        } catch (error) {
            console.log(error);
        }
    }

    return {
        subjectIndex,
        typeOptionIndex,
        typeOptions,
        fetchOrders,
        menPrices,
        womenPrices,
        childrenPrices,
        menQuantities,
        womenQuantities,
        childrenQuantities,
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
