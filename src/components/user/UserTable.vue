<script setup>
import { onMounted, ref } from "vue";
import accountService from "@/services/account";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";

const accounts = ref([]);
const fetchingAccounts = ref(false);
const filters = ref({});
const selectedAccounts = ref([]);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
        active: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};

const clearFilter = () => {
    initFilters();
};

initFilters();

onMounted(async () => {
    await fetchAccounts();
});

const fetchAccounts = async () => {
    fetchingAccounts.value = true;
    try {
        const res = await accountService.getAllAccounts();

        let accountArray = res.metadata.map(async (account) => {
            return { ...account, active: account.active === true ? 'Hoạt động' : 'Bị khóa' }
        })

        accounts.value = await Promise.all(accountArray);
    } catch (error) {
        console.log(error);
    } finally {
        fetchingAccounts.value = false;
    }
};

const columnList = [{
    header: "Mã người dùng",
    sortable: true,
},
{
    header: "Hình ảnh",
    sortable: false,
},
{
    header: "Tên người dùng",
    sortable: true,
},
{
    header: "Email",
    sortable: true,
},
{
    header: "Số điện thoại",
    sortable: true,
},
{
    header: "Trạng thái",
    sortable: true,
},
];

</script>
<template>
    <div class="card">
        <TableSkeleton :columnList="columnList" v-if="fetchingAccounts" />
        <DataTable v-else v-model:selection="selectedAccounts" dataKey="id" stripedRows v-model:filters="filters"
            :value="accounts" filterDisplay="row" :loading="fetchingAccounts"
            :globalFilterFields="['id', 'fullName', 'email', 'phone']" sortMode="multiple" paginator resizableColumns
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
            <template #empty> Không có người dùng nào. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="id" header="Mã người dùng" sortable>
                <template #body="slotProps">
                    <RouterLink :to="`/nguoi-dung/${slotProps.data.id}`"
                        class="text-sm font-bold underline-offset-2 underline text-black mx-auto">
                        #{{ slotProps.data.id }}
                    </RouterLink>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Theo mã" />
                </template>
            </Column>
            <Column header="Hình ảnh">
                <template #body="slotProps">
                    <img class="w-[6rem] shadow-md rounded" :src="slotProps.data.avatar ? slotProps.data.avatar.path : 'https://media.fmplus.com.vn/defaults/user.png'" />
                </template>
            </Column>
            <Column field="fullName" header="Tên người dùng" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Tìm theo tên người dùng" />
                </template>
            </Column>
            <Column field="email" header="Email" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Tìm theo email" />
                </template>
            </Column>
            <Column field="phone" header="Số điện thoại" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Tìm theo số điện thoại" />
                </template>
            </Column>
            <Column field="active" header="Trạng thái" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.active"
                        :severity="slotProps.data.active === 'Hoạt động' ? 'success' : 'warning'" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()"
                        :options="['Hoạt động', 'Bị khóa']" placeholder="Chọn một" class="p-column-filter"
                        :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option"
                                :severity="slotProps.option === 'Hoạt động' ? 'success' : 'warning'" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
