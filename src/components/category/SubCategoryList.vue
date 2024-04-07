<script setup>
import { ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const expandedRowGroups = ref();
const props = defineProps(["categories"]);
const categories = ref(props.categories);
</script>
<template>
    <DataTable v-model:expandedRowGroups="expandedRowGroups" expandableRowGroups rowGroupMode="subheader"
        groupRowsBy="id" stripedRows :value="categories" sortMode="single" :sortOrder="1">
        <template #groupheader="slotProps">
            <span class="align-middle ml-2 font-bold leading-6 text-surface-700 dark:text-surface-0/80">{{
        slotProps.data.name }}</span>
        </template>
        <!-- danh muc con begin -->
        <Column field="children">
            <template #body="slotProps">
                <!-- subchild begin -->
                <DataTable stripedRows :value="slotProps.data.children">
                    <Column field="children">
                        <template #body="slotProps">
                            <span class="align-middle ml-2 font-bold leading-6 text-surface-700 dark:text-surface-0/80">
                                {{ slotProps.data.name }}</span>
                        </template>
                    </Column>
                </DataTable>
                <!-- subchild end -->
            </template>
        </Column>
        <!-- danh muc con end -->
    </DataTable>
</template>
