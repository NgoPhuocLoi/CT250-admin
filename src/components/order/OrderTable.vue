<script setup>
import moment from "moment";
import orderService from "@/services/order";
import paymentService from "@/services/payment";
import { onMounted, ref } from "vue";
import OrderStatus from "./OrderStatus.vue";
import PaymentStatus from "./PaymentStatus.vue";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";

const props = defineProps(["orders"]);
const orderStatuses = ref([]);
const paymentStatuses = ref([]);
const fetchingOrders = ref(false);
const filters = ref({});
const selectedOrders = ref([]);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // rootCategory: { value: null, matchMode: FilterMatchMode.EQUALS },
        // price: { value: null, matchMode: FilterMatchMode.EQUALS },
        // quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
        // visibility: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
};

const clearFilter = () => {
    initFilters();
};

initFilters();

onMounted(async () => {
  await Promise.all([fetchAllOrderStatuses(), fetAllPaymentStatuses()]);
});

async function fetchAllOrderStatuses() {
  fetchingOrders.value = true;
  try {
    const res = await orderService.getAllOrderStatus();
    orderStatuses.value = res.metadata;
  } catch (error) {
    console.log(error);
  } finally {
    fetchingOrders.value = false;
  }
}

async function fetAllPaymentStatuses() {
  try {
    const res = await paymentService.getAllPaymentStatuses();
    paymentStatuses.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>

  <div class="card">
    <TableSkeleton :columnList="columnList" v-if="fetchingOrders" />
    <DataTable v-else v-model:selection="selectedOrders" dataKey="id" stripedRows v-model:filters="filters"
      :value="orders" filterDisplay="row" :loading="fetchingOrders"
      :globalFilterFields="['id', 'status']" sortMode="multiple" paginator resizableColumns
      columnResizeMode="fit"
      paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="{first} đến {last} trong tổng số {totalRecords}" :rows="5"
      :rowsPerPageOptions="[5, 10, 15, 20]" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex justify-between">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
          <span class="relative">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
            <InputText v-model="filters['global'].value" placeholder="Nhập từ khóa tìm kiếm..."
              class="pl-10 font-normal" />
          </span>
        </div>
      </template>
      <template #empty> Không có đơn hàng nào. </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="id" header="Mã đơn hàng" sortable>
        <template #body="slotProps">
          <RouterLink :to="`/don-hang/${slotProps.data.id}`"
            class="text-sm font-bold underline-offset-2 underline text-black mx-auto">
            #{{ slotProps.data.id }}
          </RouterLink>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
            placeholder="Theo mã" />
        </template>
      </Column>
      <Column header="Ngày đặt hàng">
        <template #body="slotProps">
          <img class="w-[6rem] shadow-md rounded" :src="slotProps.createdAt" />
        </template>
      </Column>
      <Column field="name" header="Email khách hàng" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
            placeholder="Tìm theo email khách hàng" />
        </template>
      </Column>
      <!-- <Column field="rootCategory" header="Danh mục" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="['Nam', 'Nữ', 'Trẻ em']"
            placeholder="Chọn một" class="p-column-filter" :showClear="true">
            <template #option="slotProps">
              <Tag :value="slotProps.option"
                :severity="slotProps.option === 'Nam' ? 'info' : slotProps.option === 'Nữ' ? 'danger' : 'warning'" />
            </template>
          </Dropdown>
        </template>
      </Column> -->
    </DataTable>
  </div>




  <!-- <div class="rounded-sm border border-stroke bg-white shadow-default">
    <div style="grid-template-columns: repeat(20, minmax(0, 1fr))" class="grid border-t border-stroke py-4.5 px-4">
      <div class="col-span-3 flex">
        <div class="flex items-center mt-8 mr-4">
          <input id="checkbox-table-search-1" type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        </div>

        <div class="flex flex-col items-center justify-center gap-2">
          <p class="font-medium">Mã đơn hàng</p>
          <input type="text" class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
            placeholder="Mã sản phẩm" />
        </div>
      </div>

      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Ngày đặt hàng</p>
        <input type="text" class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
          placeholder="Ngày đặt hàng" />
      </div>
      <div class="col-span-5 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Email khách hàng</p>
        <input type="text" class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]"
          placeholder="Email khách hàng" />
      </div>
      <div class="col-span-3 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Trạng thái đơn hàng</p>
        <select class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%] bg-white">
          <option value="0" selected disabled>Chọn trạng thái đơn</option>
          <option v-for="orderStatus of orderStatuses" :key="orderStatus.id" :value="orderStatus.id">
            {{ orderStatus.name }}
          </option>
        </select>
      </div>
      <div class="col-span-3 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Trạng thái giao dịch</p>
        <select class="px-3 border h-[40px] bg-white rounded-md py-2 outline-none w-[90%]">
          <option value="0" selected disabled>Chọn trạng thái giao dịch</option>
          <option v-for="paymentStatus of paymentStatuses" :key="paymentStatus.id" :value="paymentStatus.id">
            {{ paymentStatus.name }}
          </option>
        </select>
      </div>
      <div class="col-span-4 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Tổng tiền</p>
        <div class="flex gap-1 px-1">
          <input type="text" class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]" placeholder="Từ" />
          <input type="text" class="px-3 border h-[40px] rounded-md py-2 outline-none w-[90%]" placeholder="Đến" />
        </div>
      </div>
    </div>

    <div v-for="order in props.orders" :key="order.id">
      <div style="grid-template-columns: repeat(20, minmax(0, 1fr))" class="grid border-t border-stroke py-4.5 px-4">
        <div class="col-span-3">
          <div class="flex items-center">
            <div class="flex items-center justify-items-start">
              <input id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
            <RouterLink :to="`/don-hang/${order.id}`"
              class="text-sm font-bold underline-offset-2 underline text-black mx-auto">
              #{{ order.id }}
            </RouterLink>
          </div>
        </div>

        <div class="col-span-2 flex">
          <p class="text-sm font-medium text-black mx-auto">
            {{ moment(order.createdAt).format("DD-MM-YYYY") }}
          </p>
        </div>

        <div class="col-span-5 flex">
          <p class="text-sm font-medium text-black ml-7">
            {{ order.buyer.email }}
          </p>
        </div>

        <div class="col-span-3 flex">
          <OrderStatus :order-status="order.currentStatus" />
        </div>

        <div class="col-span-3 flex">
          <PaymentStatus :payment-status="order.Payment.paymentStatus" />
        </div>

        <div class="col-span-4 flex">
          <p class="text-sm font-medium text-black mx-auto">
            {{
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(order.finalPrice)
    }}
          </p>
        </div>
      </div>
    </div>
  </div> -->
</template>
