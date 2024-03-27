<template>
    <DataTable :value="products" sortMode="multiple" paginator resizableColumns columnResizeMode="fit" showGridlines
        :rows="10" :rowsPerPageOptions="[5, 10, 15, 20]" tableStyle="min-width: 50rem">
        <Column field="id" header="Mã sản phẩm" sortable>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="name" header="Hình ảnh">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="category" header="Tên sản phẩm" sortable>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="quantity" header="Số lượng" sortable>
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column field="quantity" header="Trạng thái" sortable>
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
const products = ref(new Array(4));
</script>
