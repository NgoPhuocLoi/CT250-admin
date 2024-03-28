<template>
    <DataTable :value="products" sortMode="multiple" paginator resizableColumns columnResizeMode="fit"
        tableStyle="min-width: 50rem"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} đến {last} trong tổng số {totalRecords}" :rows="5">
        <template #header>
            <div class="flex justify-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText placeholder="Nhập từ khóa tìm kiếm..." class="pl-10 font-normal" />
                </span>
            </div>
        </template>
        <Column v-for="column in props.columnList" :key="column" :sortable="column.sortable" :header="column.header">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
const products = ref(new Array(4));
const props = defineProps(["columnList"]);
</script>
